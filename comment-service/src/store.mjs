import { randomUUID } from 'node:crypto';

export const publicRecord = row => ({
  comment_id: row.comment_id, page_path: row.page_path, parent_id: row.parent_id,
  root_id: row.root_id, nickname: row.nickname, content: row.content, status: row.status,
  created_at: new Date(row.created_at).toISOString(),
  anchor: Object.fromEntries(['anchor_type','section_id','paragraph_id','exact','prefix','suffix','start_offset','end_offset'].map(k => [k, row[k]]))
});
export class ServiceError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
export class Store {
  // db exposes query(sql, params) and transaction(async transactionClient => ...).
  constructor(db) { this.db = db; }
  async rate(bucket, max, seconds) {
    const { rows } = await this.db.query(`INSERT INTO academic_rate_limits(bucket,count,expires_at)
      VALUES ($1,1,CURRENT_TIMESTAMP + ($2::integer * INTERVAL '1 second'))
      ON CONFLICT (bucket) DO UPDATE SET
      count=CASE WHEN academic_rate_limits.expires_at<CURRENT_TIMESTAMP THEN 1 ELSE academic_rate_limits.count+1 END,
      expires_at=CASE WHEN academic_rate_limits.expires_at<CURRENT_TIMESTAMP THEN EXCLUDED.expires_at ELSE academic_rate_limits.expires_at END
      RETURNING count`, [bucket, seconds]);
    if (rows[0].count > max) throw new ServiceError(429, 'Too many requests. Please try again later.');
    // Rate buckets contain HMACs, not IPs. Bound their lifetime in every worker.
    await this.db.query('DELETE FROM academic_rate_limits WHERE expires_at<CURRENT_TIMESTAMP');
  }
  async existing(visitor, id, hash, client = this.db) {
    const deleted=await client.query('SELECT 1 FROM academic_deleted_requests WHERE visitor_hash=$1 AND request_id=$2',[visitor,id]);
    if(deleted.rows.length)throw new ServiceError(410,'This comment was deleted.');
    const { rows } = await client.query('SELECT * FROM academic_comments WHERE visitor_hash=$1 AND request_id=$2', [visitor, id]);
    if (!rows.length) return null;
    if (rows[0].request_hash !== hash) throw new ServiceError(409, 'This submission ID was already used for different text.');
    return publicRecord(rows[0]);
  }
  async create(data, visitor, requestHash, challengeHash, moderation = 'manual') {
    const status = moderation === 'auto' ? 'approved' : 'pending';
    return this.db.transaction(async tx => {
      await tx.query("SELECT pg_advisory_xact_lock_shared(hashtextextended('academic-comment-deletion',0))" );
      // Serialize concurrent retries across service instances, before reading the key.
      await tx.query('SELECT pg_advisory_xact_lock(hashtextextended($1,0))', [visitor + ':' + data.request_id]);
      const prior = await this.existing(visitor, data.request_id, requestHash, tx);
      if (prior) return prior;
      const used=await tx.query('SELECT 1 FROM academic_deleted_requests WHERE challenge_hash=$1',[challengeHash]);
      if(used.rows.length)throw new ServiceError(409,'Verification token already used. Complete a new verification.');
      const id = randomUUID();
      let anchor = data.anchor, root = id, depth = 0;
      if (data.parent_id) {
        const { rows } = await tx.query('SELECT * FROM academic_comments WHERE comment_id=$1 AND page_path=$2 FOR SHARE', [data.parent_id, data.page_path]);
        const parent = rows[0];
        if (!parent || !(await this.visibleParent(tx, data.parent_id, visitor))) throw new ServiceError(404, 'Reply target is unavailable.');
        // Do not publish a new reply into an older private pending thread.
        // Existing pending records are never implicitly approved by auto mode.
        if (moderation === 'auto' && !(await this.visibleParent(tx, data.parent_id, ''))) throw new ServiceError(409, 'This thread is not public yet. Reply after its parent is approved.');
        if (parent.depth >= 12) throw new ServiceError(400, 'Maximum reply depth reached.');
        anchor = publicRecord(parent).anchor; root = parent.root_id; depth = parent.depth + 1;
      }
      const keys = ['comment_id','page_path','parent_id','root_id','depth','nickname','content','status','visitor_hash','request_id','request_hash','challenge_hash', ...Object.keys(anchor)];
      const values = [id,data.page_path,data.parent_id,root,depth,data.nickname,data.content,status,visitor,data.request_id,requestHash,challengeHash,...Object.values(anchor)];
      try {
        const { rows } = await tx.query(`INSERT INTO academic_comments (${keys.join(',')}) VALUES (${values.map((_,i)=>'$'+(i+1)).join(',')}) RETURNING *`, values);
        return publicRecord(rows[0]);
      } catch (error) {
        if (error.code === '23505') throw new ServiceError(409, 'Verification token already used. Complete a new verification.');
        throw error;
      }
    });
  }
  async visibleParent(tx, id, visitor) {
    const { rows } = await tx.query(`WITH RECURSIVE ancestry AS (
      SELECT * FROM academic_comments WHERE comment_id=$1
      UNION ALL SELECT p.* FROM academic_comments p JOIN ancestry c ON c.parent_id=p.comment_id
    ) SELECT count(*)::integer AS hidden FROM ancestry
    WHERE NOT (status='approved' OR (visitor_hash=$2 AND status='pending'))`, [id,visitor]);
    return rows[0].hidden === 0;
  }
  async list(page, visitor, cursor = 0) {
    const { rows } = await this.db.query(`WITH RECURSIVE visible AS (
      SELECT * FROM academic_comments WHERE page_path=$1 AND parent_id IS NULL
        AND (status='approved' OR (visitor_hash=$2 AND status IN ('pending','rejected')))
      UNION ALL SELECT c.* FROM academic_comments c JOIN visible p ON c.parent_id=p.comment_id
        WHERE c.page_path=$1 AND (c.status='approved' OR (c.visitor_hash=$2 AND c.status IN ('pending','rejected')))
    ) SELECT * FROM visible WHERE seq>$3 ORDER BY seq ASC LIMIT 201`, [page,visitor,cursor]);
    const batch = rows.slice(0,200);
    return { comments: batch.map(publicRecord), next_cursor: rows.length > 200 ? String(batch.at(-1).seq) : null };
  }
  async managerList(cursor=0) {
    const {rows}=await this.db.query('SELECT * FROM academic_comments WHERE seq>$1 ORDER BY seq LIMIT 201',[cursor]);
    return {comments:rows.slice(0,200).map(publicRecord),next_cursor:rows.length>200?String(rows[199].seq):null};
  }
  async remove(id) {
    return this.db.transaction(async tx=>{
      // Block new replies and serialize deletion with comment creation/moderation.
      await tx.query("SELECT pg_advisory_xact_lock(hashtextextended('academic-comment-deletion',0))" );
      const {rows}=await tx.query('WITH RECURSIVE subtree AS (SELECT comment_id FROM academic_comments WHERE comment_id=$1 UNION ALL SELECT c.comment_id FROM academic_comments c JOIN subtree p ON c.parent_id=p.comment_id) SELECT comment_id FROM subtree',[id]);
      const ids=rows.map(r=>r.comment_id);
      if(!ids.length)return {deleted_ids:[]};
      await tx.query('SELECT comment_id FROM academic_comments WHERE comment_id=ANY($1::uuid[]) ORDER BY comment_id FOR UPDATE',[ids]);
      await tx.query('INSERT INTO academic_deleted_requests(visitor_hash,request_id,challenge_hash) SELECT visitor_hash,request_id,challenge_hash FROM academic_comments WHERE comment_id=ANY($1::uuid[]) ON CONFLICT DO NOTHING',[ids]);
      await tx.query('DELETE FROM academic_moderation_log WHERE comment_id=ANY($1::uuid[])',[ids]);
      await tx.query('DELETE FROM academic_comments WHERE comment_id=ANY($1::uuid[])',[ids]);
      return {deleted_ids:ids};
    });
  }
  async adminList(status, cursor = 0) {
    const { rows } = await this.db.query('SELECT * FROM academic_comments WHERE status=$1 AND seq>$2 ORDER BY seq LIMIT 200', [status,cursor]);
    return { comments: rows.map(publicRecord), next_cursor: rows.length === 200 ? String(rows.at(-1).seq) : null };
  }
  async moderate(id, status) {
    return this.db.transaction(async tx => {
      const prior = await tx.query('SELECT status FROM academic_comments WHERE comment_id=$1 FOR UPDATE', [id]);
      if (!prior.rows.length) throw new ServiceError(404, 'Comment not found.');
      const { rows } = await tx.query('UPDATE academic_comments SET status=$2 WHERE comment_id=$1 RETURNING *', [id,status]);
      await tx.query('INSERT INTO academic_moderation_log(comment_id,previous_status,next_status) VALUES ($1,$2,$3)', [id,prior.rows[0].status,status]);
      return publicRecord(rows[0]);
    });
  }
}
