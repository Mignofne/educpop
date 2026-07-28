/**
 * Create / migrate analytics, download_lead, and Better Auth tables.
 * Usage: pnpm db:setup
 *        node scripts/create-analytics-table.mjs
 */
import pg from "pg"
import { readFileSync, existsSync } from "fs"
import { resolve } from "path"

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env")
  if (!existsSync(envPath)) return
  const content = readFileSync(envPath, "utf8")
  for (const line of content.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m && !process.env[m[1].trim()]) {
      process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "")
    }
  }
}

loadEnv()

const url = process.env.DATABASE_URL
if (!url) {
  console.error("DATABASE_URL required")
  process.exit(1)
}

const needsSsl =
  url.includes("sslmode=require") || /\.neon\.tech|\.supabase\.co/i.test(url)

const pool = new pg.Pool({
  connectionString: url,
  ...(needsSsl ? { ssl: { rejectUnauthorized: false } } : {}),
})

async function main() {
  // ---- Better Auth (required once DATABASE_URL is set — SiteHeader calls getSession) ----
  await pool.query(`
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
  console.log("user table ready")

  await pool.query(`
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
  console.log("session table ready")

  await pool.query(`
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
  console.log("account table ready")

  await pool.query(`
    CREATE TABLE IF NOT EXISTS verification (
      id TEXT PRIMARY KEY,
      identifier TEXT NOT NULL,
      value TEXT NOT NULL,
      "expiresAt" TIMESTAMP NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `)
  console.log("verification table ready")

  // ---- App analytics (quoted camelCase to match Drizzle schema) ----
  // Recreate if an older run created lowercase unquoted columns
  await pool.query(`DROP TABLE IF EXISTS analytics_event CASCADE`)
  await pool.query(`
    CREATE TABLE analytics_event (
      id SERIAL PRIMARY KEY,
      "eventType" TEXT NOT NULL,
      "sessionId" TEXT NOT NULL,
      path TEXT,
      properties JSONB,
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `)
  console.log("analytics_event table ready")

  await pool.query(`
    CREATE TABLE IF NOT EXISTS download_lead (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      "activitySlug" TEXT NOT NULL,
      "userId" TEXT,
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `)
  console.log("download_lead table ready")

  await pool.query(`
    ALTER TABLE download_lead
      ADD COLUMN IF NOT EXISTS "ageBand" TEXT,
      ADD COLUMN IF NOT EXISTS "newsletterOptIn" BOOLEAN NOT NULL DEFAULT false
  `)
  console.log("download_lead columns ageBand + newsletterOptIn ready")

  await pool.end()
  console.log("db:setup OK — relancez pnpm db:setup puis Redeploy Vercel")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
