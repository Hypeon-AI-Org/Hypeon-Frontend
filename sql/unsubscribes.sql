-- Run once in your Postgres console (Neon, Supabase, etc.)
-- The API also ensures this table exists on first use.

CREATE TABLE IF NOT EXISTS unsubscribes (
  email TEXT PRIMARY KEY,
  unsubscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_unsubscribes_unsubscribed_at
  ON unsubscribes (unsubscribed_at DESC);
