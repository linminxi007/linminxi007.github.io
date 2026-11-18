import pg from 'pg';
import { postgresOptions } from './database-config.mjs';
import { databaseFailure, reportDatabaseFailure } from './database-errors.mjs';

export function postgres(url, { Pool = pg.Pool } = {}) {
  const supplied = postgresOptions(url); // Reject malformed/socket values before Pool or network access.
  let pool;
  try {
    // Use the installed pg parser (including provider certificate files), without
    // opening a connection. Do not pass connectionString to Pool a second time:
    // its SSL parameters would overwrite the explicit verification setting.
    const parsed = new pg.Client(supplied).connectionParameters;
    const { connectionString, ...limits } = supplied;
    pool = new Pool({
      ...limits,
      host: parsed.host, port: parsed.port, user: parsed.user,
      password: parsed.password, database: parsed.database,
      options: parsed.options, client_encoding: parsed.client_encoding,
      application_name: parsed.application_name, sslnegotiation: parsed.sslnegotiation,
      ssl: { ...(typeof parsed.ssl === 'object' ? parsed.ssl : {}), rejectUnauthorized: true }
    });
  } catch (error) { throw databaseFailure(error); }
  pool.on('error', error => reportDatabaseFailure(error, 'pool'));
  const safely = async operation => { try { return await operation(); } catch (error) { throw databaseFailure(error); } };
  return {
    query: (sql, params) => safely(() => pool.query(sql, params)),
    async transaction(fn) {
      const client = await safely(() => pool.connect());
      const tx = { query: (sql, params) => safely(() => client.query(sql, params)) };
      try {
        await tx.query('BEGIN');
        const result = await fn(tx);
        await tx.query('COMMIT');
        return result;
      } catch (error) {
        try { await client.query('ROLLBACK'); } catch { /* Keep the original, already sanitized database or application error. */ }
        throw error;
      } finally { client.release(); }
    },
    close: () => safely(() => pool.end())
  };
}
