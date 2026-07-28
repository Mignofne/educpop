import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

export type AppDatabase = NodePgDatabase<typeof schema>

/** True when DATABASE_URL is set (trimmed). Never log or return the URL itself. */
export function isDatabaseUrlConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim())
}

function buildPool(connectionString: string): Pool {
  const needsSsl =
    connectionString.includes("sslmode=require") ||
    /\.neon\.tech|\.supabase\.co/i.test(connectionString)

  return new Pool({
    connectionString,
    // Neon / Supabase: TLS required. Explicit ssl helps when URL omits sslmode.
    ...(needsSsl ? { ssl: { rejectUnauthorized: false } } : {}),
    max: 1,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 8_000,
  })
}

let cachedPool: Pool | null = null
let cachedDb: AppDatabase | null | undefined

/**
 * Lazy init so Vercel runtime env is read on first request (not frozen at build).
 * Returns null only when DATABASE_URL is missing/blank.
 */
export function getDb(): AppDatabase | null {
  if (cachedDb !== undefined) return cachedDb

  if (!isDatabaseUrlConfigured()) {
    cachedDb = null
    return null
  }

  const connectionString = process.env.DATABASE_URL!.trim()
  cachedPool = buildPool(connectionString)
  cachedDb = drizzle(cachedPool, { schema })
  return cachedDb
}

/** @deprecated Prefer getDb() — null when DATABASE_URL missing. */
export const db = null as AppDatabase | null

/** Access the pool after getDb() has been called (tests / scripts). */
export function getPool(): Pool | null {
  getDb()
  return cachedPool
}
