import { isIP } from 'node:net';

const destination = 'Check Render → Environment → DATABASE_URL. Copy the complete connection string from Neon, including postgresql://. Do not include a psql command or surrounding quotes.';
export class DatabaseConfigurationError extends Error {
  constructor(reason) {
    super(`Invalid DATABASE_URL: ${reason}\n${destination}`);
    this.name = 'DatabaseConfigurationError';
    this.code = 'DATABASE_URL_INVALID';
    this.category = 'malformed-connection-string';
  }
}
const invalid = reason => { throw new DatabaseConfigurationError(reason); };
const allowedParameters = new Set([
  'sslmode', 'ssl', 'sslrootcert', 'sslcert', 'sslkey', 'sslnegotiation',
  'channel_binding', 'uselibpqcompat', 'application_name', 'connect_timeout',
  'options', 'client_encoding', 'target_session_attrs'
]);
function decode(value, field) {
  let result;
  try { result = decodeURIComponent(value); } catch { invalid(`The ${field} contains invalid percent-encoding.`); }
  if (!result.length || /[\u0000-\u001f\u007f]/.test(result)) invalid(`A nonempty ${field} without control characters is required.`);
  return result;
}
/** Validate before constructing a Pool. Returned URL is private; never log it. */
export function validateDatabaseUrl(value) {
  if (typeof value !== 'string' || !value.trim()) invalid('A nonempty PostgreSQL connection URL is required.');
  if (!/^postgres(?:ql)?:\/\//i.test(value)) invalid('Expected a PostgreSQL connection URL beginning with postgresql:// or postgres://.');
  if (value !== value.trim() || /[\s\u0000-\u001f\u007f]/u.test(value)) invalid('Remove surrounding whitespace; percent-encode reserved characters in credentials.');
  try { decodeURI(value); } catch { invalid('The URL contains invalid percent-encoding.'); }
  let url;
  try { url = new URL(value); } catch { invalid('The PostgreSQL URL is malformed. Check its hostname and numeric port.'); }
  if (!['postgresql:', 'postgres:'].includes(url.protocol)) invalid('Expected postgresql:// or postgres://.');
  const host = url.hostname.replace(/^\[|\]$/g, '');
  const labels = host.replace(/\.$/, '').split('.');
  if (!host || host.length > 253 || (!isIP(host) && !labels.every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label)))) {
    invalid('A TCP hostname or IP address is required. Unix socket paths are not supported.');
  }
  if (url.port && (!/^\d+$/.test(url.port) || Number(url.port) < 1 || Number(url.port) > 65535)) invalid('The port must be between 1 and 65535.');
  decode(url.username, 'username');
  decode(url.password, 'password');
  const database = decode(url.pathname.slice(1), 'database name');
  if (database.includes('/') || database.includes('\\')) invalid('Use one database name in the URL path, not a filesystem path.');
  if (url.hash) invalid('URL fragments are not allowed; percent-encode reserved characters in credentials.');
  const seen = new Set();
  for (const [key, parameter] of url.searchParams) {
    // pg-connection-string otherwise allows query parameters to override host,
    // port and credentials, even when the URL authority looks valid.
    if (!allowedParameters.has(key) || seen.has(key)) invalid('Unsupported or duplicate URL parameters. Use Neon connection details for Node.js (pg), without host or credential overrides.');
    seen.add(key);
    if (!parameter || /[\u0000-\u001f\u007f]/.test(parameter)) invalid('URL parameters must be nonempty and must not contain control characters.');
  }
  const mode = url.searchParams.get('sslmode');
  if (mode && !['require', 'verify-full'].includes(mode)) invalid('Use sslmode=require or sslmode=verify-full. Disabling encryption or certificate verification is not supported.');
  const ssl = url.searchParams.get('ssl');
  if (ssl && !['true', '1'].includes(ssl)) invalid('TLS must remain enabled. Remove the SSL-disable or no-verification option.');
  const compat = url.searchParams.get('uselibpqcompat');
  if (compat && compat !== 'false') invalid('Remove the libpq compatibility override; certificate and hostname verification must remain enabled.');
  const negotiation = url.searchParams.get('sslnegotiation');
  if (negotiation && !['postgres', 'direct'].includes(negotiation)) invalid('Use a supported PostgreSQL SSL negotiation mode.');
  const binding = url.searchParams.get('channel_binding');
  if (binding && !['require', 'prefer', 'disable'].includes(binding)) invalid('Invalid channel_binding option. Copy the complete provider URL.');
  const timeout = url.searchParams.get('connect_timeout');
  if (timeout && (!/^\d+$/.test(timeout) || Number(timeout) < 1 || Number(timeout) > 120)) invalid('connect_timeout must be an integer from 1 to 120 seconds.');
  // pg parses SSL parameters from connectionString after the outer ssl object.
  // Pin verify-full IN the URL, preserving provider CA/cert/key parameters.
  // This also keeps require secure across future pg/libpq compatibility changes.
  url.searchParams.set('sslmode', 'verify-full');
  return url.toString();
}
export function postgresOptions(value) {
  const connectionString = validateDatabaseUrl(value);
  const url = new URL(connectionString);
  return {
    connectionString,
    max: 5,
    connectionTimeoutMillis: Number(url.searchParams.get('connect_timeout') || 10) * 1000,
    idleTimeoutMillis: 30000,
    statement_timeout: 10000,
    enableChannelBinding: url.searchParams.get('channel_binding') !== 'disable'
  };
}
