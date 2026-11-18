import { DatabaseConfigurationError } from './database-config.mjs';

const dns = new Set(['ENOTFOUND', 'EAI_AGAIN', 'EAI_FAIL']);
const timeout = new Set(['ETIMEDOUT', 'ESOCKETTIMEDOUT', '57014']);
const auth = new Set(['28P01', '28000']);
const tls = new Set(['EPROTO', 'ERR_TLS_CERT_ALTNAME_INVALID', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'SELF_SIGNED_CERT_IN_CHAIN', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'UNABLE_TO_GET_ISSUER_CERT', 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY', 'ERR_SSL_WRONG_VERSION_NUMBER', 'ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR', 'ERR_SSL_TLSV1_ALERT_UNKNOWN_CA', 'ENOENT', 'EACCES']);
const unavailable = new Set(['ECONNREFUSED', 'ECONNRESET', 'EPIPE', 'EHOSTUNREACH', 'ENETUNREACH', '57P01', '57P02', '57P03', '53300', '08000', '08001', '08003', '08004', '08006', '08007', '08P01', '3D000']);
const schema = new Set(['42P01', '42703', '3F000']);
const constraints = new Set(['23505', '23503', '23502', '23514']);
const known = new Set([...dns, ...timeout, ...auth, ...tls, ...unavailable, ...schema, ...constraints, 'EINVAL', '42501', '42601']);
const messages = {
  'dns-resolution': 'Database hostname could not be resolved. Check the Neon hostname and Render network/DNS access.',
  'connection-timeout': 'The database operation timed out. Check Neon compute availability, network access and connect_timeout.',
  authentication: 'Database authentication failed. Reset the exposed password in Neon, copy the new full connection string, and update DATABASE_URL in Render.',
  'tls-certificate': 'Secure database TLS validation failed. Check the provider hostname, CA/certificate configuration and runtime trust store. Keep certificate verification enabled.',
  'database-unavailable': 'The database is unavailable. Check the selected Neon branch/database, compute status, connection limits and network access.',
  'missing-schema': 'The database schema is missing or incomplete. Run node src/migrate.mjs successfully before starting src/main.mjs.',
  permissions: 'The database role lacks required permissions. Check its access to the selected database and academic_* tables.',
  'database-query': 'The database operation failed. Check the migration or application query using the safe error code.',
  'malformed-connection-string': 'Invalid database connection configuration. Check the complete DATABASE_URL in Render; use a TCP PostgreSQL URL.'
};
export class DatabaseError extends Error {
  constructor(category, code) {
    super(messages[category]);
    this.name = 'DatabaseError';
    this.category = category;
    this.code = code;
  }
}
export function databaseFailure(error) {
  if (error instanceof DatabaseConfigurationError || error instanceof DatabaseError) return error;
  let source = error;
  for (let n = 0; n < 3 && source; n++) {
    if (known.has(source.code)) break;
    source = source.cause || source.errors?.[0];
  }
  const code = source && known.has(source.code) ? source.code : 'UNKNOWN';
  let category = 'database-unavailable';
  if (dns.has(code)) category = 'dns-resolution';
  else if (auth.has(code)) category = 'authentication';
  else if (tls.has(code)) category = 'tls-certificate';
  else if (schema.has(code)) category = 'missing-schema';
  else if (code === '42501') category = 'permissions';
  else if (code === '42601' || constraints.has(code)) category = 'database-query';
  else if (code === 'EINVAL') category = 'malformed-connection-string';
  else if (/^(the server does not support ssl connections|there was an error establishing an ssl connection)/i.test(error?.message || '')) category = 'tls-certificate';
  else if (/^(sasl:|sasl authentication|password authentication failed)/i.test(error?.message || '')) category = 'authentication';
  else if (timeout.has(code) || ['TimeoutError', 'AbortError'].includes(error?.name) || /^(timeout exceeded when trying to connect|connection terminated due to connection timeout|connection timeout)/i.test(error?.message || '')) category = 'connection-timeout';
  // Do not retain a cause, detail, hint, URL, role, hostname or upstream stack.
  return new DatabaseError(category, code);
}
export function reportDatabaseFailure(error, phase = 'operation', log = console.error) {
  const safe = databaseFailure(error);
  const stage = ['migration', 'startup', 'request', 'pool', 'shutdown'].includes(phase) ? phase : 'operation';
  log(`PostgreSQL ${stage} failed [category=${safe.category}, code=${safe.code}].\n${safe.message}`);
}
