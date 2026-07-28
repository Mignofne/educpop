import { and, count, desc, eq, gte, sql } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { analyticsEvent, downloadLead, user } from "@/lib/db/schema"
import {
  AGE_LABELS,
  THEME_LABELS,
  SEASON_LABELS,
  activities,
  type AgeGroup,
} from "@/lib/activities"
import { getDemoDashboardStats } from "./demo-stats"
import { getEmptyDashboardStats, getNeedsMigrationDashboardStats } from "./empty-stats"

function isMissingTableError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false
  const code = "code" in err ? String((err as { code: unknown }).code) : ""
  if (code === "42P01") return true
  const message = err instanceof Error ? err.message : String(err)
  return /relation .* does not exist/i.test(message)
}

export type RankedItem = { label: string; value: string; count: number }

export type TopActivity = {
  slug: string
  title: string
  downloads: number
  views: number
}

export type DailyTrend = {
  date: string
  pageViews: number
  visitors: number
  downloads: number
}

export type DashboardSetupState = "demo" | "needs_migration" | "empty" | "live"

export type DashboardStats = {
  isDemo: boolean
  /** demo = no DATABASE_URL; needs_migration = tables missing; empty = connected, no events yet; live = real data */
  setupState: DashboardSetupState
  period: { days7: boolean; days30: boolean }
  kpis: {
    visitors7d: number
    visitors30d: number
    sessions7d: number
    sessions30d: number
    pageViews7d: number
    pageViews30d: number
    bounceRate7d: number
    bounceRate30d: number
    conversionSignup7d: number
    conversionSignup30d: number
    conversionDownload7d: number
    conversionDownload30d: number
    downloads7d: number
    downloads30d: number
    impressions7d: number
    impressions30d: number
    activeSubscribers: number
    newSignups7d: number
    newSignups30d: number
  }
  topFilters: {
    themes: RankedItem[]
    seasons: RankedItem[]
  }
  topAges: RankedItem[]
  topActivities: TopActivity[]
  topPages: { path: string; views: number }[]
  dailyTrend: DailyTrend[]
  vercelAnalytics: {
    enabled: boolean
    note: string
  }
}

function daysAgo(n: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(0, 0, 0, 0)
  return d
}

function activityTitle(slug: string): string {
  const a = activities.find((x) => x.slug === slug)
  return a?.title ?? slug
}

async function countEventsSince(eventType: string, since: Date): Promise<number> {
  const row = await getDb()!
    .select({ n: count() })
    .from(analyticsEvent)
    .where(and(eq(analyticsEvent.eventType, eventType), gte(analyticsEvent.createdAt, since)))
  return Number(row[0]?.n ?? 0)
}

async function countDistinctSessionsSince(since: Date): Promise<number> {
  const row = await getDb()!
    .select({ n: sql<number>`count(distinct ${analyticsEvent.sessionId})` })
    .from(analyticsEvent)
    .where(and(eq(analyticsEvent.eventType, "page_view"), gte(analyticsEvent.createdAt, since)))
  return Number(row[0]?.n ?? 0)
}

async function bounceRateSince(since: Date): Promise<number> {
  const rows = await getDb()!
    .select({
      sessionId: analyticsEvent.sessionId,
      views: count(),
    })
    .from(analyticsEvent)
    .where(and(eq(analyticsEvent.eventType, "page_view"), gte(analyticsEvent.createdAt, since)))
    .groupBy(analyticsEvent.sessionId)

  if (rows.length === 0) return 0
  const bounced = rows.filter((r) => Number(r.views) === 1).length
  return bounced / rows.length
}

async function topFilterValues(
  filterType: string,
  since: Date,
  labelMap: Record<string, string>,
): Promise<RankedItem[]> {
  const rows = await getDb()!
    .select({
      value: sql<string>`${analyticsEvent.properties}->>'value'`,
      n: count(),
    })
    .from(analyticsEvent)
    .where(
      and(
        eq(analyticsEvent.eventType, "filter_use"),
        gte(analyticsEvent.createdAt, since),
        sql`${analyticsEvent.properties}->>'filterType' = ${filterType}`,
      ),
    )
    .groupBy(sql`${analyticsEvent.properties}->>'value'`)
    .orderBy(desc(count()))
    .limit(8)

  return rows
    .filter((r) => r.value)
    .map((r) => ({
      label: labelMap[r.value] ?? r.value,
      value: r.value,
      count: Number(r.n),
    }))
}

async function topAgesSince(since: Date): Promise<RankedItem[]> {
  const fromFilter = await getDb()!
    .select({
      value: sql<string>`${analyticsEvent.properties}->>'value'`,
      n: count(),
    })
    .from(analyticsEvent)
    .where(
      and(
        eq(analyticsEvent.eventType, "filter_use"),
        gte(analyticsEvent.createdAt, since),
        sql`${analyticsEvent.properties}->>'filterType' = 'age'`,
      ),
    )
    .groupBy(sql`${analyticsEvent.properties}->>'value'`)

  const fromAgeSelect = await getDb()!
    .select({
      value: sql<string>`${analyticsEvent.properties}->>'age'`,
      n: count(),
    })
    .from(analyticsEvent)
    .where(and(eq(analyticsEvent.eventType, "age_select"), gte(analyticsEvent.createdAt, since)))
    .groupBy(sql`${analyticsEvent.properties}->>'age'`)

  const merged = new Map<string, number>()
  for (const row of [...fromFilter, ...fromAgeSelect]) {
    if (!row.value) continue
    merged.set(row.value, (merged.get(row.value) ?? 0) + Number(row.n))
  }

  return [...merged.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([value, count]) => ({
      label: AGE_LABELS[value as AgeGroup] ?? value,
      value,
      count,
    }))
}

async function topActivityStats(since: Date): Promise<TopActivity[]> {
  const downloadRows = await getDb()!
    .select({
      slug: sql<string>`${analyticsEvent.properties}->>'activitySlug'`,
      n: count(),
    })
    .from(analyticsEvent)
    .where(and(eq(analyticsEvent.eventType, "download"), gte(analyticsEvent.createdAt, since)))
    .groupBy(sql`${analyticsEvent.properties}->>'activitySlug'`)
    .orderBy(desc(count()))
    .limit(10)

  const viewRows = await getDb()!
    .select({
      slug: sql<string>`replace(${analyticsEvent.path}, '/activites/', '')`,
      n: count(),
    })
    .from(analyticsEvent)
    .where(
      and(
        eq(analyticsEvent.eventType, "page_view"),
        gte(analyticsEvent.createdAt, since),
        sql`${analyticsEvent.path} like '/activites/%'`,
      ),
    )
    .groupBy(sql`replace(${analyticsEvent.path}, '/activites/', '')`)
    .orderBy(desc(count()))
    .limit(10)

  const viewsMap = new Map<string, number>()
  for (const r of viewRows) {
    const slug = r.slug?.replace(/^\/activites\//, "") ?? ""
    if (slug) viewsMap.set(slug, Number(r.n))
  }

  const slugs = new Set<string>()
  downloadRows.forEach((r) => r.slug && slugs.add(r.slug))
  viewsMap.forEach((_, slug) => slugs.add(slug))

  const downloadsMap = new Map(downloadRows.map((r) => [r.slug, Number(r.n)]))

  return [...slugs]
    .map((slug) => ({
      slug,
      title: activityTitle(slug),
      downloads: downloadsMap.get(slug) ?? 0,
      views: viewsMap.get(slug) ?? 0,
    }))
    .sort((a, b) => b.downloads + b.views - (a.downloads + a.views))
    .slice(0, 8)
}

async function topPagesSince(since: Date): Promise<{ path: string; views: number }[]> {
  const rows = await getDb()!
    .select({
      path: analyticsEvent.path,
      n: count(),
    })
    .from(analyticsEvent)
    .where(and(eq(analyticsEvent.eventType, "page_view"), gte(analyticsEvent.createdAt, since)))
    .groupBy(analyticsEvent.path)
    .orderBy(desc(count()))
    .limit(8)

  return rows
    .filter((r) => r.path)
    .map((r) => ({ path: r.path!, views: Number(r.n) }))
}

async function dailyTrendSince(days: number): Promise<DailyTrend[]> {
  const since = daysAgo(days)
  const pageRows = await getDb()!
    .select({
      date: sql<string>`to_char(${analyticsEvent.createdAt}, 'YYYY-MM-DD')`,
      n: count(),
    })
    .from(analyticsEvent)
    .where(and(eq(analyticsEvent.eventType, "page_view"), gte(analyticsEvent.createdAt, since)))
    .groupBy(sql`to_char(${analyticsEvent.createdAt}, 'YYYY-MM-DD')`)

  const visitorRows = await getDb()!
    .select({
      date: sql<string>`to_char(${analyticsEvent.createdAt}, 'YYYY-MM-DD')`,
      n: sql<number>`count(distinct ${analyticsEvent.sessionId})`,
    })
    .from(analyticsEvent)
    .where(and(eq(analyticsEvent.eventType, "page_view"), gte(analyticsEvent.createdAt, since)))
    .groupBy(sql`to_char(${analyticsEvent.createdAt}, 'YYYY-MM-DD')`)

  const downloadRows = await getDb()!
    .select({
      date: sql<string>`to_char(${analyticsEvent.createdAt}, 'YYYY-MM-DD')`,
      n: count(),
    })
    .from(analyticsEvent)
    .where(and(eq(analyticsEvent.eventType, "download"), gte(analyticsEvent.createdAt, since)))
    .groupBy(sql`to_char(${analyticsEvent.createdAt}, 'YYYY-MM-DD')`)

  const map = new Map<string, DailyTrend>()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    map.set(key, { date: key, pageViews: 0, visitors: 0, downloads: 0 })
  }

  for (const r of pageRows) {
    const entry = map.get(r.date)
    if (entry) entry.pageViews = Number(r.n)
  }
  for (const r of visitorRows) {
    const entry = map.get(r.date)
    if (entry) entry.visitors = Number(r.n)
  }
  for (const r of downloadRows) {
    const entry = map.get(r.date)
    if (entry) entry.downloads = Number(r.n)
  }

  return [...map.values()]
}

async function downloadLeadsSince(since: Date): Promise<number> {
  const row = await getDb()!
    .select({ n: count() })
    .from(downloadLead)
    .where(gte(downloadLead.createdAt, since))
  return Number(row[0]?.n ?? 0)
}

async function safeUserCounts(
  db: NonNullable<ReturnType<typeof getDb>>,
  since7: Date,
  since30: Date,
): Promise<{ subscribers: number; users7d: number; users30d: number }> {
  try {
    const [subscribers, users7d, users30d] = await Promise.all([
      db.select({ n: count() }).from(user).where(eq(user.isSubscribed, true)),
      db.select({ n: count() }).from(user).where(gte(user.createdAt, since7)),
      db.select({ n: count() }).from(user).where(gte(user.createdAt, since30)),
    ])
    return {
      subscribers: Number(subscribers[0]?.n ?? 0),
      users7d: Number(users7d[0]?.n ?? 0),
      users30d: Number(users30d[0]?.n ?? 0),
    }
  } catch (err) {
    if (isMissingTableError(err)) return { subscribers: 0, users7d: 0, users30d: 0 }
    throw err
  }
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const db = getDb()
  if (!db) return getDemoDashboardStats()

  try {
    const [totalEvents, totalLeads] = await Promise.all([
      db.select({ n: count() }).from(analyticsEvent),
      db.select({ n: count() }).from(downloadLead),
    ])

    const hasEvents =
      Number(totalEvents[0]?.n ?? 0) > 0 || Number(totalLeads[0]?.n ?? 0) > 0
    if (!hasEvents) return getEmptyDashboardStats()

    const since7 = daysAgo(7)
    const since30 = daysAgo(30)

    const [
      pageViews7d,
      pageViews30d,
      visitors7d,
      visitors30d,
      downloads7dEvents,
      downloads30dEvents,
      bounce7d,
      bounce30d,
      signups7d,
      signups30d,
      themes,
      seasons,
      topAges,
      topActivities,
      topPages,
      dailyTrend,
      leads7d,
      leads30d,
      userCounts,
    ] = await Promise.all([
      countEventsSince("page_view", since7),
      countEventsSince("page_view", since30),
      countDistinctSessionsSince(since7),
      countDistinctSessionsSince(since30),
      countEventsSince("download", since7),
      countEventsSince("download", since30),
      bounceRateSince(since7),
      bounceRateSince(since30),
      countEventsSince("signup", since7),
      countEventsSince("signup", since30),
      topFilterValues("theme", since30, THEME_LABELS as Record<string, string>),
      topFilterValues("season", since30, SEASON_LABELS as Record<string, string>),
      topAgesSince(since30),
      topActivityStats(since30),
      topPagesSince(since30),
      dailyTrendSince(14),
      downloadLeadsSince(since7),
      downloadLeadsSince(since30),
      safeUserCounts(db, since7, since30),
    ])

    const downloads7d = Math.max(downloads7dEvents, leads7d)
    const downloads30d = Math.max(downloads30dEvents, leads30d)
    const newSignups7d = Math.max(signups7d, userCounts.users7d)
    const newSignups30d = Math.max(signups30d, userCounts.users30d)

    return {
      isDemo: false,
      setupState: "live",
      period: { days7: true, days30: true },
      kpis: {
        visitors7d,
        visitors30d,
        sessions7d: visitors7d,
        sessions30d: visitors30d,
        pageViews7d,
        pageViews30d,
        bounceRate7d: bounce7d,
        bounceRate30d: bounce30d,
        conversionSignup7d: visitors7d > 0 ? newSignups7d / visitors7d : 0,
        conversionSignup30d: visitors30d > 0 ? newSignups30d / visitors30d : 0,
        conversionDownload7d: visitors7d > 0 ? downloads7d / visitors7d : 0,
        conversionDownload30d: visitors30d > 0 ? downloads30d / visitors30d : 0,
        downloads7d,
        downloads30d,
        impressions7d: pageViews7d,
        impressions30d: pageViews30d,
        activeSubscribers: userCounts.subscribers,
        newSignups7d,
        newSignups30d,
      },
      topFilters: { themes, seasons },
      topAges,
      topActivities,
      topPages,
      dailyTrend,
      vercelAnalytics: {
        enabled: process.env.NODE_ENV === "production",
        note: "Vercel Analytics actif en production. Ce tableau agrège les événements first-party (filtres, téléchargements, pages).",
      },
    }
  } catch (err) {
    if (isMissingTableError(err)) return getNeedsMigrationDashboardStats()
    console.error("[admin] getDashboardStats failed:", err)
    return getNeedsMigrationDashboardStats()
  }
}
