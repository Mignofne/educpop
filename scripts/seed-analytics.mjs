/**
 * Seed first-party analytics events for local dashboard testing.
 * Usage: node scripts/seed-analytics.mjs
 * Requires DATABASE_URL in environment (.env loaded manually if needed).
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

const themes = ["animaux", "saisons", "lecture", "continents", "botanique"]
const seasons = ["printemps", "ete", "automne", "hiver", "toute-annee"]
const ages = ["1-2", "2-3", "4-5", "6-7", "8-10"]
const activities = [
  "pack-papillon-4-5",
  "pack-saisons-4-5",
  "pack-abeilles-6-7",
  "pack-tournesols-2-3",
  "pack-continents-8-10",
]
const pages = ["/", "/bibliotheque", "/abonnement", "/generer", "/blog"]

const pool = new pg.Pool({ connectionString: url })

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function daysAgo(n: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60), 0, 0)
  return d
}

async function main() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS analytics_event (
        id SERIAL PRIMARY KEY,
        eventType TEXT NOT NULL,
        sessionId TEXT NOT NULL,
        path TEXT,
        properties JSONB,
        createdAt TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `)

    const events = []
    for (let day = 0; day < 30; day++) {
      const sessions = 15 + Math.floor(Math.random() * 20)
      for (let s = 0; s < sessions; s++) {
        const sessionId = `seed-${day}-${s}`
        const pageCount = Math.random() < 0.35 ? 1 : 2 + Math.floor(Math.random() * 4)
        for (let p = 0; p < pageCount; p++) {
          const path =
            Math.random() < 0.4
              ? `/activites/${rand(activities)}`
              : rand(pages)
          events.push({
            eventType: "page_view",
            sessionId,
            path,
            properties: { path },
            createdAt: daysAgo(day),
          })
        }
        if (Math.random() < 0.25) {
          events.push({
            eventType: "filter_use",
            sessionId,
            path: "/bibliotheque",
            properties: { filterType: "theme", value: rand(themes) },
            createdAt: daysAgo(day),
          })
        }
        if (Math.random() < 0.2) {
          events.push({
            eventType: "filter_use",
            sessionId,
            path: "/bibliotheque",
            properties: { filterType: "age", value: rand(ages) },
            createdAt: daysAgo(day),
          })
        }
        if (Math.random() < 0.15) {
          events.push({
            eventType: "filter_use",
            sessionId,
            path: "/bibliotheque",
            properties: { filterType: "season", value: rand(seasons) },
            createdAt: daysAgo(day),
          })
        }
        if (Math.random() < 0.12) {
          const slug = rand(activities)
          events.push({
            eventType: "download",
            sessionId,
            path: `/activites/${slug}`,
            properties: { activitySlug: slug },
            createdAt: daysAgo(day),
          })
        }
        if (Math.random() < 0.05) {
          events.push({
            eventType: "signup",
            sessionId,
            path: "/sign-up",
            properties: {},
            createdAt: daysAgo(day),
          })
        }
      }
    }

    for (const e of events) {
      await client.query(
        `INSERT INTO analytics_event (eventType, sessionId, path, properties, createdAt)
         VALUES ($1, $2, $3, $4, $5)`,
        [e.eventType, e.sessionId, e.path, JSON.stringify(e.properties), e.createdAt],
      )
    }

    console.log(`Seeded ${events.length} analytics events`)
  } finally {
    client.release()
    await pool.end()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
