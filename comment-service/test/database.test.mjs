import { test } from 'node:test';
import assert from 'node:assert/strict';
import pg from 'pg';
import { EventEmitter } from 'node:events';
import { spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { validateDatabaseUrl, postgresOptions, DatabaseConfigurationError } from '../src/database-config.mjs';
import { databaseFailure, reportDatabaseFailure } from '../src/database-errors.mjs';
import { postgres } from '../src/postgres.mjs';
import { migrate } from '../src/migrate.mjs';
import { startService } from '../src/main.mjs';
import { Store, ServiceError } from '../src/store.mjs';
import { createHandler } from '../src/server.mjs';
import { documentAnchor } from '../src/validation.mjs';

// Synthetic fixtures only. Never read a real DATABASE_URL in this test file.
const role = 'fixture_role', password = 'fixture_password';
const valid = `postgresql://${role}:${password}@db.example/notes?sslmode=require&channel_binding=require`;
const invalidValues = [undefined, null, '', '   ', `//${role}:${password}@db.example/notes`, '/tmp/postgres',
  `postgresql:/${role}:${password}@db.example/notes`, `https://${role}:${password}@db.example/notes`,
  `postgresql://${role}:${password}@/notes`, 'postgresql://db.example/notes', `postgresql://${role}@db.example/notes`,
  `postgresql://${role}:@db.example/notes`, `postgresql://${role}:${password}@db.example/`,
  `postgresql://${role}:${password}@db.example:0/notes`, `postgresql://${role}:${password}@db.example:99999/notes`,
  `postgresql://${role}:bad%ZZ@db.example/notes`, valid+'#fragment',
  valid+'&host=%2Ftmp%2Fpostgres', valid+'&hostaddr=127.0.0.1', valid+'&user=override', valid+'&password=override',
  valid+'&port=1234', valid+'&database=other', valid+'&sslmode=verify-full',
  valid+'&uselibpqcompat=true', valid+'&options=%ZZ', `postgresql://${role}:${password}@%2Ftmp/notes`,
  `postgresql://${role}:${password}@db.example/two/names`, '"'+valid+'"', ' '+valid,
  ...['disable','prefer','allow','no-verify','verify-ca'].map(mode=>valid.replace('sslmode=require','sslmode='+mode)),
  ...['false','0','no-verify'].map(option=>valid+'&ssl='+option)
];
test('valid PostgreSQL URLs support both schemes, encoded credentials, TCP and provider SSL parameters', () => {
  for (const value of [valid,valid.replace('postgresql:','postgres:'),valid.replace('db.example','127.0.0.1'),valid.replace('db.example','[::1]'),valid.replace('sslmode=require','sslmode=verify-full')]) {
    const normalized = new URL(validateDatabaseUrl(value));
    assert.equal(normalized.searchParams.get('sslmode'),'verify-full');
    assert.equal(normalized.searchParams.get('channel_binding'),'require');
  }
  const encoded = validateDatabaseUrl('postgres://fixture%40role:fixture%3Apass%2Fword@db.example/notes');
  assert.equal(decodeURIComponent(new URL(encoded).password),'fixture:pass/word');
  assert.equal(postgresOptions(valid+'&connect_timeout=30').connectionTimeoutMillis,30000);
  assert.equal(postgresOptions(valid).enableChannelBinding,true);
});
test('malformed, missing and socket-like values fail before Pool construction, without leaking input', () => {
  // Reproduce the old parser decision without opening a socket or using real credentials.
  assert.equal(new pg.Client({connectionString:`//${role}:${password}@db.example/notes`}).connectionParameters.isDomainSocket,true);
  let constructed=0;class NeverConnect {constructor(){constructed++;throw new Error('Pool should not be constructed');}}
  for (const value of invalidValues) {
    let error;try {postgres(value,{Pool:NeverConnect});}catch(e){error=e;}
    assert(error instanceof DatabaseConfigurationError);
    const exposed=[error.message,error.stack,JSON.stringify(error)].join('\n');
    assert(!exposed.includes(role));assert(!exposed.includes(password));
    assert(exposed.includes('Render'));assert(exposed.includes('DATABASE_URL'));
    assert.equal(error.cause,undefined);assert.equal(error.input,undefined);
  }
  assert.equal(constructed,0);
  assert.throws(()=>validateDatabaseUrl(`//${role}:${password}@db.example/notes`),/beginning with postgresql:\/\/ or postgres:\/\//);
});
test('Pool receives TCP fields and certificate-verified TLS, with no reparsing or environment downgrade', async () => {
  let captured;class Pool extends EventEmitter{constructor(options){super();captured=options;}async end(){}}
  const prior=process.env.PGSSLMODE;process.env.PGSSLMODE='no-verify';
  try {
    const db=postgres(valid,{Pool});
    assert.equal(captured.host,'db.example');assert.equal(captured.database,'notes');assert.equal(captured.port,5432);
    assert.equal(captured.ssl.rejectUnauthorized,true);assert.equal(captured.ssl.checkServerIdentity,undefined);
    assert.equal(captured.connectionString,undefined);assert.equal(captured.enableChannelBinding,true);
    const parsed=new pg.Client(captured).connectionParameters;
    assert.equal(parsed.isDomainSocket,false);assert.equal(parsed.ssl.rejectUnauthorized,true);
    await db.close();
  }finally{if(prior===undefined)delete process.env.PGSSLMODE;else process.env.PGSSLMODE=prior;}
  const dir=await mkdtemp(join(tmpdir(),'academic-db-ca-'));
  try{
    const certificate=join(dir,'provider-ca.pem');await writeFile(certificate,'PUBLIC TEST CA DATA');
    const db=postgres(valid+'&sslrootcert='+encodeURIComponent(certificate),{Pool});
    assert.equal(captured.ssl.ca,'PUBLIC TEST CA DATA');assert.equal(captured.ssl.rejectUnauthorized,true);await db.close();
  }finally{assert(resolve(dir).startsWith(resolve(tmpdir())+sep));await rm(dir,{recursive:true,force:true});}
});
test('database failures are categorized and logged using safe codes, never raw details or credentials', () => {
  const cases=[['ENOTFOUND','dns-resolution'],['EAI_AGAIN','dns-resolution'],['ETIMEDOUT','connection-timeout'],['28P01','authentication'],['ERR_TLS_CERT_ALTNAME_INVALID','tls-certificate'],['CERT_HAS_EXPIRED','tls-certificate'],['ECONNREFUSED','database-unavailable'],['57P03','database-unavailable'],['3D000','database-unavailable'],['42P01','missing-schema'],['42703','missing-schema'],['42501','permissions'],['EINVAL','malformed-connection-string']];
  for (const [code,category] of cases) {
    const raw=Object.assign(new Error('PRIVATE '+role+' '+password+' '+valid),{code,detail:password,hint:role,hostname:valid});
    const safe=databaseFailure(raw),logs=[];reportDatabaseFailure(raw,'migration',text=>logs.push(text));
    assert.equal(safe.category,category);assert.equal(safe.code,code);
    const exposed=String(safe)+'\n'+safe.stack+'\n'+JSON.stringify(safe)+'\n'+logs.join('\n');
    assert(!exposed.includes(role));assert(!exposed.includes(password));assert(!exposed.includes(valid));assert.equal(safe.cause,undefined);
  }
  const unknown=databaseFailure({code:password,name:role,message:valid});assert.equal(unknown.code,'UNKNOWN');
  assert.equal(databaseFailure(new Error('timeout exceeded when trying to connect')).category,'connection-timeout');
  assert.equal(databaseFailure({cause:{code:'ECONNRESET'}}).category,'database-unavailable');
});
test('adapter sanitizes query/pool/transaction errors and preserves application errors', async () => {
  const raw=Object.assign(new Error(valid),{code:'28P01'});let pool, released=0;const statements=[];
  class Pool extends EventEmitter{
    constructor(){super();pool=this;}
    async query(){throw raw;}
    async connect(){return {query:async sql=>{statements.push(sql);if(sql==='BAD')throw raw;return {rows:[]};},release(){released++;}};}
    async end(){}
  }
  const db=postgres(valid,{Pool}),logs=[],saved=console.error;console.error=text=>logs.push(text);
  try{
    pool.emit('error',raw);assert(logs[0].includes('authentication'));assert(!logs[0].includes(password));
    await assert.rejects(db.query('anything'),error=>error.category==='authentication'&&!error.message.includes(password));
    const application=new ServiceError(409,'Deliberate application conflict.');
    await assert.rejects(db.transaction(()=>{throw application;}),error=>error===application);
    await assert.rejects(db.transaction(tx=>tx.query('BAD')),error=>error.category==='authentication');
    assert.equal(released,2);assert.equal(statements.filter(x=>x==='ROLLBACK').length,2);
  }finally{console.error=saved;await db.close();}
});
test('HTTP request errors never expose database diagnostics or arbitrary upstream error codes', async () => {
  const logs=[],saved=console.error;console.error=text=>logs.push(text);
  try{
    for(const failure of [databaseFailure(Object.assign(new Error(valid),{code:'28P01'})),{message:valid,name:role,code:password}]){
      let body,status;
      const response={setHeader(){},set statusCode(value){status=value;},end(value){body=value;}};
      const handler=createHandler({rate:async()=>{throw failure;}},{origins:['https://linminxi007.github.io'],rateSecret:'test-only-secret-for-request-diagnostics',readLimit:120});
      await handler({headers:{origin:'https://linminxi007.github.io'},method:'GET',url:'/health',socket:{remoteAddress:'127.0.0.1'}},response);
      assert([500,503].includes(status));assert(!body.includes('Render'));assert(!body.includes(password));assert(!body.includes(role));
    }
    assert(logs.every(line=>!line.includes(password)&&!line.includes(role)&&!line.includes(valid)));
    assert(logs.some(line=>line.includes('code=UNKNOWN')));
  }finally{console.error=saved;}
});
test('sanitized PostgreSQL constraint codes preserve existing comment replay handling', async () => {
  class Pool extends EventEmitter{
    async connect(){return {query:async sql=>{
      if(sql.startsWith('INSERT INTO academic_comments'))throw Object.assign(new Error(valid),{code:'23505',detail:password});
      return {rows:[]};
    },release(){}};}
    async end(){}
  }
  const db=postgres(valid,{Pool});
  try{
    await assert.rejects(new Store(db).create({page_path:'/notes/test.html',request_id:randomUUID(),parent_id:null,nickname:'Anonymous',content:'Synthetic duplicate-token submission.',anchor:documentAnchor()},'test-owner','test-request','test-challenge'),error=>error instanceof ServiceError&&error.status===409&&!error.message.includes(password));
  }finally{await db.close();}
});
test('migration is idempotent, preserves existing comments, and starts the real HTTP API afterward', async () => {
  // pg uses its simple-query protocol for the unparameterized migration script;
  // PGlite exposes that same multi-statement execution mode as exec().
  const engine=new PGlite(),adapter={query:(sql,params)=>params===undefined&&sql.includes('CREATE TABLE IF NOT EXISTS')?engine.exec(sql):engine.query(sql,params),transaction:fn=>engine.transaction(fn),close:async()=>{}};
  const connect=()=>adapter,log=()=>{};let service;
  try{
    await migrate(valid,{connect,log});
    const record=await new Store(adapter).create({page_path:'/notes/test.html',request_id:randomUUID(),parent_id:null,nickname:'Anonymous',content:'Preserve this existing comment.',anchor:documentAnchor()},'test-owner','test-request','test-challenge');
    await migrate(valid,{connect,log});
    const row=await engine.query('SELECT content FROM academic_comments WHERE comment_id=$1',[record.comment_id]);assert.equal(row.rows[0].content,'Preserve this existing comment.');
    service=await startService({connect,log,env:{DATABASE_URL:valid,ADMIN_TOKEN:'a'.repeat(40),RATE_SECRET:'b'.repeat(40),TURNSTILE_SECRET:'test-only-private-placeholder',TURNSTILE_SITE_KEY:'test-only-public-placeholder',ALLOWED_ORIGINS:'https://linminxi007.github.io',PORT:'0'}});
    const response=await fetch('http://127.0.0.1:'+service.server.address().port+'/health');assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true});
  }finally{if(service)await service.close();await engine.close();}
});
test('invalid migration and startup commands exit immediately with useful, sanitized stderr', () => {
  for (const entry of ['migrate.mjs','main.mjs']) {
    for (const value of ['',`//${role}:${password}@db.example/notes`]) {
      const env={...process.env,DATABASE_URL:value};
      const result=spawnSync(process.execPath,['src/'+entry],{encoding:'utf8',timeout:5000,env});
      assert.equal(result.status,1);assert.equal(result.error,undefined);
      const output=result.stdout+result.stderr;assert(output.includes('Invalid DATABASE_URL'));assert(output.includes('Render'));assert(!output.includes(password));assert(!output.includes(role));assert(!output.includes('.s.PGSQL'));assert(!output.includes('at file:'));
    }
  }
});
test('Docker retains migration-before-start using the exact exec-form shell command', async () => {
  const dockerfile=await readFile(new URL('../Dockerfile',import.meta.url),'utf8');
  assert(dockerfile.includes('CMD ["sh", "-c", "node src/migrate.mjs && exec node src/main.mjs"]'));
});
