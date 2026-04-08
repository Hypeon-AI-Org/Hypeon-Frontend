import postgres from 'postgres';

let sql: ReturnType<typeof postgres> | null = null;
let schemaPromise: Promise<void> | null = null;

function getConnectionString(): string | undefined {
  return process.env.DATABASE_URL?.trim();
}

function getSql(): ReturnType<typeof postgres> {
  const url = getConnectionString();
  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }
  if (!sql) {
    sql = postgres(url, {
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }
  return sql;
}

async function ensureUnsubscribesTable(): Promise<void> {
  if (!schemaPromise) {
    const client = getSql();
    schemaPromise = client`
      CREATE TABLE IF NOT EXISTS unsubscribes (
        email TEXT PRIMARY KEY,
        unsubscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `.then(() =>
      client`
        CREATE INDEX IF NOT EXISTS idx_unsubscribes_unsubscribed_at
          ON unsubscribes (unsubscribed_at DESC)
      `
    ) as Promise<void>;
  }
  await schemaPromise;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(getConnectionString());
}

/**
 * Idempotent: inserts or no-ops if email already unsubscribed.
 */
export async function recordUnsubscribe(normalizedEmail: string): Promise<void> {
  await ensureUnsubscribesTable();
  const client = getSql();
  await client`
    INSERT INTO unsubscribes (email)
    VALUES (${normalizedEmail})
    ON CONFLICT (email) DO NOTHING
  `;
}
