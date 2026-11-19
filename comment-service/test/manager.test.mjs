import { test } from 'node:test';import assert from 'node:assert/strict';import { randomUUID,createHmac } from 'node:crypto';
import { testService,post,headers,moderate,cfg } from './helpers.mjs';import { documentAnchor } from '../src/validation.mjs';
const payload=(extra={})=>({request_id:randomUUID(),page_path:'/notes/test.html',content:'Manage me',nickname:'',anchor:documentAnchor(),turnstile_token:randomUUID(),...extra});
const req=async(s,path,method='GET',data,token)=>{const r=await fetch(s.base+path,{method,headers:{...headers(),...(token?{Authorization:'Bearer '+token}:{})},...(data?{body:JSON.stringify(data)}:{})});return {status:r.status,body:await r.json()};};
test('manager: PIN login, private all-status listing, authenticated physical deletion and public removal',async()=>{
 const s=await testService({settings:{managerPin:'1234',moderation:'auto'}});try{
  assert.equal((await req(s,'/manager/v1/comments')).status,401);
  assert.equal((await req(s,'/manager/v1/session','POST',{pin:'0000'})).status,401);
  const login=await req(s,'/manager/v1/session','POST',{pin:'1234'});assert.equal(login.status,200);const token=login.body.token;assert(token);assert(!JSON.stringify(login.body).includes('1234'));
  const root=(await post(s.base,payload())).body.comment;const reply=(await post(s.base,payload({parent_id:root.comment_id}))).body.comment;
  const keep=(await post(s.base,payload({content:'Keep me'}))).body.comment;await moderate(s.base,root.comment_id,'pending');await moderate(s.base,reply.comment_id,'rejected');
  const all=await req(s,'/manager/v1/comments','GET',null,token);assert.equal(all.body.comments.length,3);assert(!JSON.stringify(all.body).includes('visitor_hash'));
  assert.equal((await req(s,'/manager/v1/comments/'+root.comment_id,'DELETE')).status,401);
  assert.equal((await req(s,'/manager/v1/comments/'+root.comment_id,'DELETE',null,token+'x')).status,401);
  const deleted=await req(s,'/manager/v1/comments/'+root.comment_id,'DELETE',null,token);assert.equal(deleted.status,200);assert.deepEqual(new Set(deleted.body.deleted_ids),new Set([root.comment_id,reply.comment_id]));
  assert.equal((await req(s,'/manager/v1/comments/'+root.comment_id,'DELETE',null,token)).status,200,'retry safe');
  const rows=await s.engine.query('SELECT comment_id FROM academic_comments');assert.deepEqual(rows.rows.map(r=>r.comment_id),[keep.comment_id]);
  const publicView=await fetch(s.base+'/v1/comments?page=/notes/test.html');assert.deepEqual((await publicView.json()).comments.map(r=>r.comment_id),[keep.comment_id]);
  const part=Buffer.from(JSON.stringify({exp:Date.now()-1,nonce:'x'})).toString('base64url'),sig=createHmac('sha256',cfg.adminToken).update('comment-manager:1234:'+part).digest('base64url');assert.equal((await req(s,'/manager/v1/comments','GET',null,part+'.'+sig)).status,401);
 }finally{await s.close();}
});
test('manager: login attempts are rate limited; unset PIN disables manager',async()=>{
 const s=await testService({settings:{managerPin:'1234'}});try{for(let i=0;i<5;i++)assert.equal((await req(s,'/manager/v1/session','POST',{pin:'1111'})).status,401);assert.equal((await req(s,'/manager/v1/session','POST',{pin:'1234'})).status,429);}finally{await s.close();}
 const disabled=await testService();try{assert.equal((await req(disabled,'/manager/v1/session','POST',{pin:'1234'})).status,503);}finally{await disabled.close();}
});
