import { getPool, isDatabaseUrlConfigured } from "@/lib/db"

/**
 * Idempotent schema setup for Neon / Postgres.
 * Safe to call from admin (authenticated) — no PowerShell required.
 */
export async function ensureAppSchema(): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isDatabaseUrlConfigured()) {
    return { ok: false, error: "DATABASE_URL non configuré sur Vercel." }
  }

  const pool = getPool()
  if (!pool) {
    return { ok: false, error: "Impossible de se connecter à la base." }
  }

  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        "emailVerified" BOOLEAN NOT NULL DEFAULT false,
        image TEXT,
        "isSubscribed" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS session (
        id TEXT PRIMARY KEY,
        "expiresAt" TIMESTAMP NOT NULL,
        token TEXT NOT NULL UNIQUE,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "ipAddress" TEXT,
        "userAgent" TEXT,
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS account (
        id TEXT PRIMARY KEY,
        "accountId" TEXT NOT NULL,
        "providerId" TEXT NOT NULL,
        "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        "accessToken" TEXT,
        "refreshToken" TEXT,
        "idToken" TEXT,
        "accessTokenExpiresAt" TIMESTAMP,
        "refreshTokenExpiresAt" TIMESTAMP,
        scope TEXT,
        password TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS verification (
        id TEXT PRIMARY KEY,
        identifier TEXT NOT NULL,
        value TEXT NOT NULL,
        "expiresAt" TIMESTAMP NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `)

    const cols = await client.query<{ column_name: string }>(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'analytics_event'
    `)
    const names = new Set(cols.rows.map((r) => r.column_name))

    // Missing table, or old unquoted columns (eventtype) without camelCase "eventType"
    if (cols.rows.length === 0 || !names.has("eventType")) {
      await client.query(`DROP TABLE IF EXISTS analytics_event CASCADE`)
      await client.query(`
        CREATE TABLE analytics_event (
          id SERIAL PRIMARY KEY,
          "eventType" TEXT NOT NULL,
          "sessionId" TEXT NOT NULL,
          path TEXT,
          properties JSONB,
          "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `)
    }

    await client.query(`
      CREATE TABLE IF NOT EXISTS download_lead (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        "activitySlug" TEXT NOT NULL,
        "userId" TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `)

    await client.query(`
      ALTER TABLE download_lead
        ADD COLUMN IF NOT EXISTS "ageBand" TEXT,
        ADD COLUMN IF NOT EXISTS "newsletterOptIn" BOOLEAN NOT NULL DEFAULT false
    `)

    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { ok: false, error: message }
  } finally {
    client.release()
  }
}
