import { readFile,writeFile } from 'node:fs/promises';
const html=await readFile(new URL('../../_site/index.html',import.meta.url),'utf8');
const match=html.match(/<script id="site-catalog" type="application\/json">([\s\S]*?)<\/script>/);
if(!match)throw new Error('Render the Quarto site before generating the note allowlist.');
const paths=[...new Set(JSON.parse(match[1]).notes.map(n=>'/'+n.path))].sort();
if(!paths.length)throw new Error('No public notes found.');
await writeFile(new URL('../note-paths.json',import.meta.url),JSON.stringify(paths,null,2)+'\n');
console.log('Generated allowlist for '+paths.length+' research note pages.');
