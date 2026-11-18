import { readFile,readdir } from 'node:fs/promises';
import { resolve,join,dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const repo=resolve(fileURLToPath(new URL('../..',import.meta.url))),site=join(repo,'_site');let notes=0,pages=0;
async function scan(dir){for(const e of await readdir(dir,{withFileTypes:true})){
  const file=join(dir,e.name);if(e.isDirectory()){await scan(file);continue;}
  if(!file.endsWith('.html'))continue;const html=await readFile(file,'utf8');
  if(!html.includes('data-version="3.1"')||!html.includes('<body'))continue;pages++;
  const note=/<body class="[^"]*reading-page/.test(html);
  const matches=[...html.matchAll(/(?:src|href)="([^"]*assets\/inline-comments[^"?]*)(?:\?[^"]*)?"/g)];
  assert.equal(matches.length,note?3:0,file);
  if(note){notes++;for(const match of matches){const dest=resolve(dirname(file),match[1]);const content=await readFile(dest);assert.deepEqual(content,await readFile(join(repo,'assets',dest.split(/[\\/]/).at(-1))),file);}}
}}
await scan(site);
const home=await readFile(join(site,'index.html'),'utf8');
const catalog=JSON.parse(home.match(/<script id="site-catalog" type="application\/json">([\s\S]*?)<\/script>/)[1]);
assert(notes>0);assert.equal(notes,catalog.notes.length);assert(pages>notes);
const configuration=JSON.parse(await readFile(join(repo,'assets/inline-comments-config.json'),'utf8'));
assert.equal(typeof configuration.apiBase,'string');if(configuration.apiBase)assert.equal(new URL(configuration.apiBase).protocol,'https:');
assert.deepEqual(await readFile(join(site,'assets/inline-comments-config.json')),await readFile(join(repo,'assets/inline-comments-config.json')));
console.log(`PASS: ${notes} notes conditionally load 3 annotation assets; non-note pages are unchanged; all rendered assets and public configuration match source.`);
