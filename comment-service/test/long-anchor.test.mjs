import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { testService,post,headers } from './helpers.mjs';
import { validate } from '../src/validation.mjs';
test('long Quarto heading IDs publish and retain their original anchors across replies and public reads',async()=>{
 const section='summary-'+ 'schmicklers-derivation-'.repeat(28),anchor={anchor_type:'text',section_id:section,paragraph_id:section+':p:hash:0:of1',exact:'TESTTEST',prefix:'',suffix:'',start_offset:0,end_offset:8};
 const input={request_id:randomUUID(),page_path:'/notes/test.html',nickname:'TEST',content:'TESTTEST',anchor,turnstile_token:randomUUID()};
 assert(section.length>592);assert.deepEqual(validate(input).anchor,anchor);
 for(const [field,max] of [['section_id',2048],['paragraph_id',2304]])assert.throws(()=>validate({...input,anchor:{...anchor,[field]:'x'.repeat(max+1)}}),/Invalid .* ID/);
 assert.throws(()=>validate({...input,anchor:{...anchor,section_id:'bad\u0000id'}}),/Invalid section ID/);
 const s=await testService({settings:{moderation:'auto'}});try{
  const created=await post(s.base,input);assert.equal(created.status,201);assert.equal(created.body.comment.status,'approved');assert.deepEqual(created.body.comment.anchor,anchor);
  const reply=await post(s.base,{...input,request_id:randomUUID(),turnstile_token:randomUUID(),parent_id:created.body.comment.comment_id});assert.equal(reply.status,201);assert.deepEqual(reply.body.comment.anchor,anchor);
  const read=await fetch(s.base+'/v1/comments?page=/notes/test.html',{headers:headers('different-anonymous-visitor-'.repeat(2))});const data=await read.json();assert.equal(data.comments.length,2);for(const record of data.comments)assert.deepEqual(record.anchor,anchor);
 }finally{await s.close();}
});
