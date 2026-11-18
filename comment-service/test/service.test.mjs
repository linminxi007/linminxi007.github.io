import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdtemp,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { testService,post,headers,moderate,visitor } from './helpers.mjs';
import { documentAnchor } from '../src/validation.mjs';
import { config,verifyTurnstile } from '../src/server.mjs';
const page='/notes/test.html';
const payload=(extra={})=>({page_path:page,request_id:randomUUID(),nickname:'',content:'A test comment <img src=x onerror=alert(1)>',anchor:{anchor_type:'text',section_id:'section',paragraph_id:'stable-p',exact:'水合层 water',prefix:'Before ',suffix:' after',start_offset:7,end_offset:16},turnstile_token:randomUUID(),...extra});
const listing=async(s,who)=>{const r=await fetch(s.base+'/v1/comments?page='+encodeURIComponent(page),{headers:headers(who)});return {status:r.status,body:await r.json()};};

test('anonymous post, moderation, replies, consistent IDs, real PostgreSQL persistence and no public secrets',async()=>{
  const directory=await mkdtemp(join(tmpdir(),'academic-pg-'));let s=await testService({directory});
  try {
    const input=payload(),created=await post(s.base,input);assert.equal(created.status,201,JSON.stringify(created));
    const r=created.body.comment;assert.equal(r.nickname,'Anonymous');assert.equal(r.status,'pending');assert.equal(r.anchor.exact,input.anchor.exact);
    assert.equal((await listing(s,visitor)).body.comments[0].comment_id,r.comment_id);
    assert.equal((await listing(s,'another-visitor-'.repeat(4))).body.comments.length,0);
    assert.equal((await post(s.base,input)).body.comment.comment_id,r.comment_id,'retry uses canonical ID');
    assert.equal((await post(s.base,{...input,content:'changed'})).status,409);
    assert.equal((await post(s.base,payload({turnstile_token:input.turnstile_token}))).status,409,'CAPTCHA replay rejected');
    const concurrent=payload();const dup=await Promise.all([post(s.base,concurrent),post(s.base,concurrent)]);assert.equal(dup[0].body.comment.comment_id,dup[1].body.comment.comment_id);
    assert.equal((await moderate(s.base,r.comment_id)).status,200);
    const publicData=(await listing(s,'another-visitor-'.repeat(4))).body;
    assert.equal(publicData.comments.length,1);assert.equal(publicData.comments[0].comment_id,r.comment_id);
    assert(!/visitor_hash|request_hash|challenge_hash|user.agent|ip_address/.test(JSON.stringify(publicData)));
    const reply=await post(s.base,payload({parent_id:r.comment_id,anchor:documentAnchor(),content:'A reply'}));assert.equal(reply.status,201);
    assert.deepEqual(reply.body.comment.anchor,r.anchor,'server inherits anchor; client cannot redirect a reply');
    assert.equal(reply.body.comment.root_id,r.comment_id);
    await moderate(s.base,reply.body.comment.comment_id);
    assert.equal((await listing(s,'another-visitor-'.repeat(4))).body.comments.length,2);
    await s.close();s=await testService({directory});
    assert.equal((await listing(s,'another-visitor-'.repeat(4))).body.comments.length,2,'survives DB engine/service restart');
    await moderate(s.base,r.comment_id,'rejected');
    assert.equal((await listing(s,'another-visitor-'.repeat(4))).body.comments.length,0,'moderating parent hides descendants');
    const logs=await s.engine.query('SELECT * FROM academic_moderation_log');assert.equal(logs.rows.length,3);
  }finally{await s.close();await rm(directory,{recursive:true,force:true});}
});
test('validation, CORS, administrator isolation, page/reply authorization and bot verification',async()=>{
  const s=await testService();try {
    assert.equal((await post(s.base,payload({content:' '}))).status,400);
    assert.equal((await post(s.base,payload({nickname:'n'.repeat(61)}))).status,400);
    assert.equal((await post(s.base,payload({content:'x'.repeat(5001)}))).status,400);
    assert.equal((await post(s.base,payload({page_path:'/about.html'}))).status,400);
    assert.equal((await post(s.base,payload({page_path:'/notes/%2e%2e/about.html'}))).status,400);
    assert.equal((await post(s.base,payload({anchor:{...documentAnchor(),anchor_type:'text'}}))).status,400);
    assert.equal((await post(s.base,payload({turnstile_token:'bad'}))).status,403);
    const denied=await fetch(s.base+'/v1/config',{headers:{Origin:'https://attacker.invalid'}});assert.equal(denied.status,403);assert.equal(denied.headers.get('Access-Control-Allow-Origin'),null);
    assert.equal((await fetch(s.base+'/admin/v1/comments')).status,401);
    assert.equal((await post(s.base,payload({parent_id:randomUUID()}))).status,404);
    const pending=(await post(s.base,payload())).body.comment;
    assert.equal((await post(s.base,payload({parent_id:pending.comment_id}),'stranger-capability-'.repeat(3))).status,404);
    await moderate(s.base,pending.comment_id);
    assert.equal((await post(s.base,payload({parent_id:pending.comment_id,page_path:'/notes/other.html'}))).status,404);
    const huge=await fetch(s.base+'/v1/comments',{method:'POST',headers:headers(),body:JSON.stringify({s:'x'.repeat(40000)})});assert.equal(huge.status,413);
  }finally{await s.close();}
});
test('rate limiting is persistent and does not trust spoofed proxy headers by default',async()=>{
  const s=await testService({settings:{postLimit:2}});try{
    for(let n=0;n<2;n++)assert.equal((await post(s.base,payload())).status,201);
    assert.equal((await post(s.base,payload(),'new-visitor-'.repeat(4))).status,429);
    const r=await s.engine.query('SELECT bucket FROM academic_rate_limits');assert(r.rows.every(x=>!x.bucket.includes('127.0.0.1')));
  }finally{await s.close();}
});
test('published-note allowlist excludes syntactically valid but unknown note pages',async()=>{
  const s=await testService({settings:{allowedPages:new Set([page])}});try{
    assert.equal((await post(s.base,payload({page_path:'/notes/unknown.html'}))).status,404);
    assert.equal((await post(s.base,payload({anchor:documentAnchor(),content:'An article-level comment.'}))).status,201);
    const r=await listing(s,visitor);assert.equal(r.body.comments[0].anchor.anchor_type,'document');
  }finally{await s.close();}
});
test('production configuration fails closed; Turnstile response checks hostname and action',async()=>{
  assert.throws(()=>config({}),/Missing/);
  const saved=globalThis.fetch;
  try {
    globalThis.fetch=async()=>({ok:true,json:async()=>({success:true,hostname:'attacker.invalid',action:'academic-comment'})});
    await assert.rejects(verifyTurnstile('token','https://example.com',randomUUID(),{turnstileSecret:'secret'}),/Verification failed/);
    globalThis.fetch=async()=>({ok:true,json:async()=>({success:true,hostname:'example.com',action:'login'})});
    await assert.rejects(verifyTurnstile('token','https://example.com',randomUUID(),{turnstileSecret:'secret'}),/Verification failed/);
  }finally{globalThis.fetch=saved;}
});
