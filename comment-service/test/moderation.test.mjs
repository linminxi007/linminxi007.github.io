import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { testService, post, headers, moderate, visitor } from './helpers.mjs';
import { config } from '../src/server.mjs';
import { documentAnchor } from '../src/validation.mjs';
const page='/notes/test.html', stranger='another-anonymous-capability-'.repeat(2);
const payload=(extra={})=>({request_id:randomUUID(),page_path:page,parent_id:null,nickname:'',content:'A verified anonymous comment.',anchor:documentAnchor(),turnstile_token:randomUUID(),...extra});
const list=async(s,who=stranger)=>{const r=await fetch(s.base+'/v1/comments?page='+encodeURIComponent(page),{headers:headers(who)});assert.equal(r.status,200);return (await r.json()).comments;};

test('COMMENT_MODERATION defaults to manual, accepts auto/manual and rejects invalid values',()=>{
  const env={DATABASE_URL:'postgresql://fixture:fixture@db.example/notes',ADMIN_TOKEN:'a'.repeat(40),RATE_SECRET:'b'.repeat(40),TURNSTILE_SECRET:'test-private',TURNSTILE_SITE_KEY:'test-public',ALLOWED_ORIGINS:'https://linminxi007.github.io'};
  assert.equal(config(env).moderation,'manual');
  for(const mode of ['auto','manual'])assert.equal(config({...env,COMMENT_MODERATION:mode}).moderation,mode);
  for(const mode of ['','AUTO','approve',' auto '])assert.throws(()=>config({...env,COMMENT_MODERATION:mode}),/COMMENT_MODERATION must be auto or manual/);
});
for(const mode of ['manual','auto']){
  test(`${mode}: server-controlled status, anonymous replies, repeat reads and administrator rejection`,async()=>{
    const s=await testService({settings:{moderation:mode}});
    try{
      const cfg=await (await fetch(s.base+'/v1/config')).json();assert.equal(cfg.moderation,mode);
      const data=payload({status:mode==='auto'?'pending':'approved',moderation:mode==='auto'?'manual':'auto'});
      const created=await post(s.base,data);assert.equal(created.status,201);
      const root=created.body.comment,expected=mode==='auto'?'approved':'pending';assert.equal(root.status,expected);
      assert.equal(root.nickname,'Anonymous');
      assert.equal((await list(s)).length,mode==='auto'?1:0);
      assert.equal((await list(s)).length,mode==='auto'?1:0,'fresh reads do not depend on the submitting browser');
      const replyData=payload({parent_id:root.comment_id,status:'approved',content:'Anonymous reply.'});
      const reply=await post(s.base,replyData,mode==='auto'?stranger:visitor);assert.equal(reply.status,201);
      assert.equal(reply.body.comment.status,expected);assert.equal(reply.body.comment.root_id,root.comment_id);assert.deepEqual(reply.body.comment.anchor,root.anchor);
      if(mode==='manual'){
        assert.equal((await list(s)).length,0);
        await moderate(s.base,root.comment_id);await moderate(s.base,reply.body.comment.comment_id);
      }
      const publicRecords=await list(s);assert.equal(publicRecords.length,2);
      assert.deepEqual(publicRecords.map(r=>r.comment_id),[root.comment_id,reply.body.comment.comment_id]);
      await moderate(s.base,root.comment_id,'rejected');assert.equal((await list(s)).length,0);
      const stored=await s.engine.query('SELECT content FROM academic_comments WHERE comment_id=$1',[root.comment_id]);assert.equal(stored.rows[0].content,data.content);
    }finally{await s.close();}
  });
  test(`${mode}: failed verification and input validation never insert a comment`,async()=>{
    const s=await testService({settings:{moderation:mode}});try{
      assert.equal((await post(s.base,payload({turnstile_token:'bad',status:'approved',moderation:'auto'}))).status,403);
      assert.equal((await post(s.base,payload({content:'x'.repeat(5001),status:'approved'}))).status,400);
      assert.equal((await post(s.base,payload({content:' ',status:'approved'}))).status,400);
      const count=await s.engine.query('SELECT count(*)::integer AS n FROM academic_comments');assert.equal(count.rows[0].n,0);
    }finally{await s.close();}
  });
}
test('auto: IP/visitor limits and one-use verification still block extra publications',async()=>{
  const s=await testService({settings:{moderation:'auto',postLimit:2}});try{
    const input=payload(),first=await post(s.base,input);assert.equal(first.body.comment.status,'approved');
    assert.equal((await post(s.base,payload({turnstile_token:input.turnstile_token}))).status,409);
    assert.equal((await post(s.base,payload(),stranger)).status,429);
    const rows=await s.engine.query('SELECT status FROM academic_comments');assert.deepEqual(rows.rows.map(r=>r.status),['approved']);
  }finally{await s.close();}
});
test('auto: visitor rate limit remains effective across different trusted proxy addresses',async()=>{
  const s=await testService({settings:{moderation:'auto',postLimit:1,trustProxy:true}});try{
    for(const [index,ip] of ['198.51.100.10','198.51.100.11'].entries()){
      const response=await fetch(s.base+'/v1/comments',{method:'POST',headers:{...headers(),'X-Forwarded-For':ip},body:JSON.stringify(payload())});
      assert.equal(response.status,index===0?201:429);
    }
    const count=await s.engine.query('SELECT count(*)::integer AS n FROM academic_comments');assert.equal(count.rows[0].n,1);
  }finally{await s.close();}
});
test('switching to auto preserves old pending/approved records, retries and persistence across service restart',async()=>{
  const directory=await mkdtemp(join(tmpdir(),'academic-moderation-'));let s=await testService({directory,settings:{moderation:'manual'}});
  try{
    const oldPendingInput=payload({content:'An older pending comment.'});const pending=(await post(s.base,oldPendingInput)).body.comment;
    const approved=(await post(s.base,payload({content:'An older approved comment.'}))).body.comment;await moderate(s.base,approved.comment_id);
    const before=await s.engine.query('SELECT comment_id,content,status,exact,created_at FROM academic_comments ORDER BY seq');
    await s.close();s=await testService({directory,settings:{moderation:'auto'}});
    const retry=await post(s.base,oldPendingInput);assert.equal(retry.body.comment.comment_id,pending.comment_id);assert.equal(retry.body.comment.status,'pending');
    const after=await s.engine.query('SELECT comment_id,content,status,exact,created_at FROM academic_comments ORDER BY seq');assert.deepEqual(after.rows,before.rows);
    assert.equal((await post(s.base,payload({parent_id:pending.comment_id}))).status,409,'auto must not claim an invisible reply in an old pending thread was published');
    const fresh=(await post(s.base,payload({content:'New auto-published comment.'}))).body.comment;assert.equal(fresh.status,'approved');
    const visible=await list(s);assert.deepEqual(visible.map(r=>r.comment_id),[approved.comment_id,fresh.comment_id]);
    await s.close();s=await testService({directory,settings:{moderation:'auto'}});
    assert.deepEqual((await list(s)).map(r=>r.comment_id),[approved.comment_id,fresh.comment_id]);
    const pendingAfter=await s.engine.query('SELECT status FROM academic_comments WHERE comment_id=$1',[pending.comment_id]);assert.equal(pendingAfter.rows[0].status,'pending');
  }finally{await s.close();assert(resolve(directory).startsWith(resolve(tmpdir())+sep));await rm(directory,{recursive:true,force:true});}
});
