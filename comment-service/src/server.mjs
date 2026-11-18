import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { ServiceError } from './store.mjs';
import { validate, pagePath, uuid } from './validation.mjs';
import { DatabaseError, reportDatabaseFailure } from './database-errors.mjs';
const digest = value => createHash('sha256').update(value).digest('hex');
export function config(env = process.env) {
  for (const key of ['DATABASE_URL','ADMIN_TOKEN','RATE_SECRET','TURNSTILE_SECRET','TURNSTILE_SITE_KEY','ALLOWED_ORIGINS']) if (!env[key]) throw new Error('Missing environment variable: '+key);
  if (env.ADMIN_TOKEN.length < 32 || env.RATE_SECRET.length < 32) throw new Error('ADMIN_TOKEN and RATE_SECRET must each contain at least 32 characters.');
  const origins = env.ALLOWED_ORIGINS.split(',').map(s=>s.trim());
  for (const value of origins) { const u = new URL(value); if (u.origin !== value || u.protocol !== 'https:') throw new Error('Production origins must be exact HTTPS origins.'); }
  const moderation = env.COMMENT_MODERATION ?? 'manual';
  if (!['auto','manual'].includes(moderation)) throw new Error('COMMENT_MODERATION must be auto or manual.');
  const paths=JSON.parse(readFileSync(new URL('../note-paths.json',import.meta.url),'utf8'));
  if(!Array.isArray(paths)||!paths.length)throw new Error('Generate note-paths.json before deploying.');
  return {origins,moderation,allowedPages:new Set(paths.map(pagePath)),adminToken:env.ADMIN_TOKEN,rateSecret:env.RATE_SECRET,turnstileSecret:env.TURNSTILE_SECRET,siteKey:env.TURNSTILE_SITE_KEY,trustProxy:env.TRUST_PROXY === 'one',postLimit:6,readLimit:120};
}
export async function verifyTurnstile(token, origin, requestID, cfg) {
  if (typeof token !== 'string' || !token.length || token.length > 2048) throw new ServiceError(400,'Complete the anti-bot verification.');
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(10000),
    body:JSON.stringify({secret:cfg.turnstileSecret,response:token,idempotency_key:requestID})
  });
  if (!response.ok) throw new ServiceError(503,'Verification service unavailable. Please retry.');
  const result = await response.json();
  if (!result.success || result.hostname !== new URL(origin).hostname || result.action !== 'academic-comment') throw new ServiceError(403,'Verification failed or expired. Please verify again.');
}
async function jsonBody(req) {
  if (!req.headers['content-type']?.startsWith('application/json')) throw new ServiceError(415,'Use application/json.');
  let size = 0, body = '';
  for await (const chunk of req) { size += chunk.length; if (size>32768) throw new ServiceError(413,'Submission is too large.'); body+=chunk; }
  try { return JSON.parse(body); } catch { throw new ServiceError(400,'Invalid JSON.'); }
}
export function createHandler(store,cfg,{verify = verifyTurnstile} = {}) {
  // This immutable policy comes only from server configuration, never POST JSON.
  const moderation = cfg.moderation === 'auto' ? 'auto' : 'manual';
  const keyed = value => createHmac('sha256',cfg.rateSecret).update(value).digest('hex');
  return async (req,res) => {
    const origin = req.headers.origin;
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('Cache-Control','no-store');
    res.setHeader('Content-Security-Policy',"default-src 'none'; frame-ancestors 'none'");
    res.setHeader('Referrer-Policy','no-referrer');
    res.setHeader('Vary','Origin');
    const send = (code,value) => { res.statusCode=code;res.end(JSON.stringify(value)); };
    try {
      if (origin && !cfg.origins.includes(origin)) throw new ServiceError(403,'Origin is not allowed.');
      if (origin) res.setHeader('Access-Control-Allow-Origin',origin);
      res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers','Content-Type, X-Visitor-Key, Authorization');
      if (req.method === 'OPTIONS') {res.statusCode=204;res.end();return;}
      const u = new URL(req.url,'http://internal.invalid');
      // Never trust arbitrary proxy headers. Enable only behind one controlled reverse proxy.
      const ip = cfg.trustProxy ? String(req.headers['x-forwarded-for']||req.socket.remoteAddress).split(',').at(-1).trim() : req.socket.remoteAddress;
      const ipHash = keyed('ip:'+ip);
      await store.rate('read:'+ipHash,cfg.readLimit,60);
      if (u.pathname === '/health' && req.method === 'GET') {send(200,{ok:true});return;}
      if (u.pathname === '/v1/config' && req.method === 'GET') {send(200,{turnstile_site_key:cfg.siteKey,max_length:5000,moderation});return;}
      if (u.pathname.startsWith('/admin/')) {
        const expected = Buffer.from('Bearer '+cfg.adminToken), actual = Buffer.from(req.headers.authorization||'');
        if (actual.length!==expected.length || !timingSafeEqual(actual,expected)) throw new ServiceError(401,'Administrator authorization required.');
        await store.rate('admin:'+ipHash,60,60);
        if (u.pathname==='/admin/v1/comments' && req.method==='GET') {
          const state=u.searchParams.get('status')||'pending';
          if (!['pending','approved','rejected'].includes(state)) throw new ServiceError(400,'Invalid moderation state.');
          send(200,await store.adminList(state,cursor(u)));return;
        }
        const match=u.pathname.match(/^\/admin\/v1\/comments\/([^/]+)$/);
        if (match && req.method==='PATCH') {
          if (!uuid.test(match[1])) throw new ServiceError(400,'Invalid comment ID.');
          const {status}=await jsonBody(req);
          if (!['pending','approved','rejected'].includes(status)) throw new ServiceError(400,'Invalid moderation state.');
          send(200,{comment:await store.moderate(match[1],status)});return;
        }
        throw new ServiceError(404,'Unknown admin endpoint.');
      }
      const key = req.headers['x-visitor-key']||'';
      if (key && !/^[A-Za-z0-9_-]{32,128}$/.test(key)) throw new ServiceError(400,'Invalid visitor key.');
      const visitor = key ? keyed('visitor:'+key) : '';
      if (u.pathname==='/v1/comments' && req.method==='GET') {const page=pagePath(u.searchParams.get('page'));if(cfg.allowedPages&&!cfg.allowedPages.has(page))throw new ServiceError(404,'Research note not found.');send(200,await store.list(page,visitor,cursor(u)));return;}
      if (u.pathname==='/v1/comments' && req.method==='POST') {
        if (!origin || !visitor) throw new ServiceError(403,'A site origin and anonymous visitor key are required.');
        const input=await jsonBody(req),data=validate(input),hash=digest(JSON.stringify(data));
        if(cfg.allowedPages&&!cfg.allowedPages.has(data.page_path))throw new ServiceError(404,'Research note not found.');
        // Lost responses are safe to retry even after the one-use CAPTCHA expires.
        const prior=await store.existing(visitor,data.request_id,hash);
        if (prior) {send(200,{comment:prior});return;}
        await store.rate('post:'+ipHash,cfg.postLimit,600);
        await store.rate('visitor:'+visitor,cfg.postLimit,600);
        await verify(input.turnstile_token,origin,data.request_id,cfg);
        const saved=await store.create(data,visitor,hash,digest(input.turnstile_token),moderation);
        send(201,{comment:saved});return;
      }
      throw new ServiceError(404,'Unknown endpoint.');
    } catch (error) {
      if (error instanceof DatabaseError) {
        reportDatabaseFailure(error, 'request');
        send(503, {error:'Comment service unavailable. Your text has not been discarded.'});
        return;
      }
      if (error.status===429) res.setHeader('Retry-After','60');
      const status=error.status || (error.name==='TimeoutError' ? 503 : 500);
      if (!error.status) console.error('Comment service error [category=internal, code=UNKNOWN].'); // No text, tokens, IP, UA or DB URL.
      send(status,{error:error.status ? error.message : 'Comment service unavailable. Your text has not been discarded.'});
    }
  };
}
function cursor(url) { const s=url.searchParams.get('cursor')||'0';if(!/^\d{1,15}$/.test(s))throw new ServiceError(400,'Invalid cursor.');return s; }
