import pg from 'pg';
export function postgres(url) {
  // Use provider-supplied TLS settings; never disable certificate validation globally.
  const pool = new pg.Pool({connectionString:url,max:5,connectionTimeoutMillis:10000,idleTimeoutMillis:30000,statement_timeout:10000});
  pool.on('error',error=>console.error('PostgreSQL pool error:',error.code||error.name));
  return {
    query:(sql,params)=>pool.query(sql,params),
    async transaction(fn) {
      const client=await pool.connect();
      try {await client.query('BEGIN');const result=await fn(client);await client.query('COMMIT');return result;}
      catch(error){await client.query('ROLLBACK');throw error;}
      finally{client.release();}
    },
    close:()=>pool.end()
  };
}
