import { readFile } from 'node:fs/promises';
import { postgres } from './postgres.mjs';
if(!process.env.DATABASE_URL)throw new Error('DATABASE_URL is required.');
const db=postgres(process.env.DATABASE_URL);
try{await db.query(await readFile(new URL('../schema.sql',import.meta.url),'utf8'));console.log('Annotation schema ready.');}finally{await db.close();}
