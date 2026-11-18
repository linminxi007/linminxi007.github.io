import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { Store } from '../src/store.mjs';
import { createHandler } from '../src/server.mjs';
export const origin='http://127.0.0.1:8911';
export const adminToken='test-admin-token-'+ 'a'.repeat(40);
export const cfg={origins:[origin],adminToken,rateSecret:'test-rate-secret-'+ 'b'.repeat(40),siteKey:'test-public-site-key',turnstileSecret:'not-a-real-secret',readLimit:10000,postLimit:10000,trustProxy:false};
export async function testService({directory,port=0,verify=async token=>{if(!token||token==='bad')throw Object.assign(new Error('Verification failed.'),{status:403});},settings={}}={}) {
  const engine=new PGlite(directory);
  await engine.exec(await readFile(new URL('../schema.sql',import.meta.url),'utf8'));
  const db={query:(...args)=>engine.query(...args),transaction:fn=>engine.transaction(fn)};
  const store=new Store(db),server=createServer(createHandler(store,{...cfg,...settings},{verify}));
  await new Promise(resolve=>server.listen(port,'127.0.0.1',resolve));
  return {engine,store,server,base:'http://127.0.0.1:'+server.address().port,async close(){await new Promise(resolve=>server.close(resolve));await engine.close();}};
}
export const visitor='visitor-capability-'.repeat(3);
export function headers(who=visitor){return {Origin:origin,'X-Visitor-Key':who,'Content-Type':'application/json'};}
export async function post(base,body,who=visitor) {const r=await fetch(base+'/v1/comments',{method:'POST',headers:headers(who),body:JSON.stringify(body)});return {status:r.status,body:await r.json()};}
export async function moderate(base,id,status='approved'){const r=await fetch(base+'/admin/v1/comments/'+id,{method:'PATCH',headers:{Authorization:'Bearer '+adminToken,'Content-Type':'application/json'},body:JSON.stringify({status})});return {status:r.status,body:await r.json()};}
