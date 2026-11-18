-- Apply with npm run migrate. This schema is independent of Waline tables.
BEGIN;
CREATE TABLE IF NOT EXISTS academic_comments (
  seq BIGSERIAL UNIQUE NOT NULL,
  comment_id UUID PRIMARY KEY,
  page_path TEXT NOT NULL CHECK (length(page_path) <= 1000),
  parent_id UUID REFERENCES academic_comments(comment_id),
  root_id UUID NOT NULL,
  depth INTEGER NOT NULL DEFAULT 0 CHECK (depth BETWEEN 0 AND 12),
  nickname TEXT NOT NULL CHECK (length(nickname) BETWEEN 1 AND 60),
  content TEXT NOT NULL CHECK (length(content) BETWEEN 1 AND 5000),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  anchor_type TEXT NOT NULL CHECK (anchor_type IN ('text','paragraph','document')),
  section_id TEXT NOT NULL DEFAULT '',
  paragraph_id TEXT NOT NULL DEFAULT '',
  exact TEXT NOT NULL DEFAULT '',
  prefix TEXT NOT NULL DEFAULT '',
  suffix TEXT NOT NULL DEFAULT '',
  start_offset INTEGER NOT NULL DEFAULT 0 CHECK (start_offset >= 0),
  end_offset INTEGER NOT NULL DEFAULT 0 CHECK (end_offset >= start_offset),
  visitor_hash TEXT NOT NULL,
  request_id UUID NOT NULL,
  request_hash TEXT NOT NULL,
  challenge_hash TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (visitor_hash, request_id),
  CHECK (anchor_type = 'document' OR (length(exact) BETWEEN 1 AND 8000 AND end_offset > start_offset))
);
CREATE INDEX IF NOT EXISTS academic_comments_page ON academic_comments(page_path, seq);
CREATE INDEX IF NOT EXISTS academic_comments_parent ON academic_comments(parent_id);
CREATE INDEX IF NOT EXISTS academic_comments_pending ON academic_comments(status, seq);
CREATE TABLE IF NOT EXISTS academic_rate_limits (
  bucket TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE TABLE IF NOT EXISTS academic_moderation_log (
  id BIGSERIAL PRIMARY KEY,
  comment_id UUID NOT NULL REFERENCES academic_comments(comment_id),
  previous_status TEXT NOT NULL,
  next_status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMIT;
