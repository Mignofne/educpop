/**
 * Create analytics_event table (no seed data).
 * Usage: node scripts/create-analytics-table.mjs
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

const pool = new pg.Pool({ connectionString: url })

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS analytics_event (
      id SERIAL PRIMARY KEY,
      eventType TEXT NOT NULL,
      sessionId TEXT NOT NULL,
      path TEXT,
      properties JSONB,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `)
  console.log("analytics_event table ready")
  await pool.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
