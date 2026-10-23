import postgres from 'postgres';

/*
 * Answer cache and per-visitor daily limits for the free tools.
 * Lives in the site's Postgres (DATABASE_URL). Without a database, e.g. on a
 * laptop, it falls back to process memory so the tools still run.
 *
 * The database is a serverless Neon instance that sleeps when idle and can take
 * 10-20s to wake, so every call here is capped at DB_TIMEOUT_MS: a slow or
 * failing database never holds up a tool, it just skips the cache or the limit.
 */

const DB_TIMEOUT_MS = 2500;

let sql: ReturnType<typeof postgres> | null = null;
let schemaPromise: Promise<void> | null = null;

function getSql(): ReturnType<typeof postgres> | null {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;
  if (!sql) {
    sql = postgres(url, { max: 3, idle_timeout: 20, connect_timeout: 10 });
  }
  return sql;
}

async function ensureTables(client: ReturnType<typeof postgres>): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = client`
      CREATE TABLE IF NOT EXISTS tool_cache (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL
      )
    `
      .then(
        () => client`
          CREATE TABLE IF NOT EXISTS tool_usage (
            key TEXT PRIMARY KEY,
            count INTEGER NOT NULL DEFAULT 0,
            day DATE NOT NULL DEFAULT CURRENT_DATE
          )
        `
      )
      .then(() => undefined)
      .catch((e) => {
        schemaPromise = null;
        throw e;
      });
  }
  await schemaPromise;
}

/** Runs a database call, giving up with `fallback` if it errors or takes longer than DB_TIMEOUT_MS. */
async function withDb<T>(label: string, fallback: T, run: (client: ReturnType<typeof postgres>) => Promise<T>): Promise<T> {
  const client = getSql();
  if (!client) return fallback;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<T>((resolve) => {
    timer = setTimeout(() => {
      console.warn(`tools ${label}: database slower than ${DB_TIMEOUT_MS}ms, skipped`);
      resolve(fallback);
    }, DB_TIMEOUT_MS);
  });
  const work = (async () => {
    await ensureTables(client);
    return run(client);
  })().catch((e) => {
    console.error(`tools ${label}`, e);
    return fallback;
  });
  try {
    return await Promise.race([work, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

const memoryCache = new Map<string, { value: unknown; expiresAt: number }>();
const memoryUsage = new Map<string, number>();

const DAY_MS = 24 * 60 * 60 * 1000;

/** Looks up several cache keys in one round trip; misses come back as null, in order. */
export async function cacheGetMany<T>(keys: string[]): Promise<(T | null)[]> {
  if (!getSql()) {
    return keys.map((k) => {
      const hit = memoryCache.get(k);
      return hit && hit.expiresAt >= Date.now() ? (hit.value as T) : null;
    });
  }
  const found = await withDb('cacheGet', new Map<string, T>(), async (client) => {
    const rows = await client<{ key: string; value: T }[]>`
      SELECT key, value FROM tool_cache WHERE key = ANY(${keys}) AND expires_at > now()
    `;
    return new Map(rows.map((r) => [r.key, r.value]));
  });
  return keys.map((k) => found.get(k) ?? null);
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  return (await cacheGetMany<T>([key]))[0];
}

export async function cacheSet(key: string, value: unknown, ttlMs = DAY_MS): Promise<void> {
  if (!getSql()) {
    memoryCache.set(key, { value, expiresAt: Date.now() + ttlMs });
    return;
  }
  await withDb('cacheSet', undefined, async (client) => {
    const expires = new Date(Date.now() + ttlMs);
    await client`
      INSERT INTO tool_cache (key, value, expires_at)
      VALUES (${key}, ${client.json(value as postgres.JSONValue)}, ${expires})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, expires_at = EXCLUDED.expires_at
    `;
    // Housekeeping on roughly one write in fifty keeps both tables small.
    if (Math.random() < 0.02) {
      await client`DELETE FROM tool_cache WHERE expires_at < now()`;
      await client`DELETE FROM tool_usage WHERE day < CURRENT_DATE`;
    }
  });
}

/**
 * Counts one use of `bucket` by `ip` today and reports whether it is still
 * within `limit`. The count resets at midnight UTC.
 */
export async function takeDailyQuota(bucket: string, ip: string, limit: number): Promise<boolean> {
  const day = new Date().toISOString().slice(0, 10);
  const key = `${bucket}:${ip}:${day}`;
  if (!getSql()) {
    const used = (memoryUsage.get(key) ?? 0) + 1;
    memoryUsage.set(key, used);
    return used <= limit;
  }
  return withDb('takeDailyQuota', true, async (client) => {
    const rows = await client<{ count: number }[]>`
      INSERT INTO tool_usage (key, count, day)
      VALUES (${key}, 1, ${day})
      ON CONFLICT (key) DO UPDATE SET count = tool_usage.count + 1
      RETURNING count
    `;
    return (rows[0]?.count ?? 1) <= limit;
  });
}
