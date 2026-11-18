import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config, createHandler } from './server.mjs';
import { postgres } from './postgres.mjs';
import { Store } from './store.mjs';
import { validateDatabaseUrl, DatabaseConfigurationError } from './database-config.mjs';
import { DatabaseError, reportDatabaseFailure } from './database-errors.mjs';

export async function startService({ env = process.env, connect = postgres, log = console.log } = {}) {
  const url = validateDatabaseUrl(env.DATABASE_URL);
  const cfg = config(env), db = connect(url);
  let server;
  try {
    await db.query('SELECT comment_id FROM academic_comments LIMIT 0');
    server = createServer(createHandler(new Store(db), cfg));
    server.requestTimeout = 15000; server.headersTimeout = 10000;
    await new Promise((ready, reject) => {
      server.once('error', reject);
      server.listen(Number(env.PORT || 8080), '0.0.0.0', () => { server.off('error', reject); ready(); });
    });
  } catch (error) { await db.close(); throw error; }
  log('Annotation service listening. Moderation is required.');
  return {
    server,
    async close() { await new Promise(done => server.close(done)); await db.close(); }
  };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const service = await startService();
    for (const signal of ['SIGTERM', 'SIGINT']) process.once(signal, async () => {
      try { await service.close(); process.exitCode = 0; }
      catch (error) { reportDatabaseFailure(error, 'shutdown'); process.exitCode = 1; }
    });
  } catch (error) {
    if (error instanceof DatabaseError || error instanceof DatabaseConfigurationError) reportDatabaseFailure(error, 'startup');
    else console.error('Comment service startup failed [category=configuration, code=SERVICE_CONFIGURATION]. Check the required Render environment variables and PORT.');
    process.exitCode = 1;
  }
}
