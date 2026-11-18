import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { postgres } from './postgres.mjs';
import { validateDatabaseUrl } from './database-config.mjs';
import { reportDatabaseFailure } from './database-errors.mjs';

export async function migrate(url, { connect = postgres, log = console.log } = {}) {
  const validated = validateDatabaseUrl(url);
  const db = connect(validated);
  try {
    await db.query(await readFile(new URL('../schema.sql', import.meta.url), 'utf8'));
    log('Annotation schema ready.');
  } finally { await db.close(); }
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { await migrate(process.env.DATABASE_URL); }
  catch (error) { reportDatabaseFailure(error, 'migration'); process.exitCode = 1; }
}
