import type { DailyTrend, DashboardStats } from "./dashboard-stats"

function buildEmptyDailyTrend(days: number): DailyTrend[] {
  const result: DailyTrend[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    result.push({
      date: d.toISOString().slice(0, 10),
      pageViews: 0,
      visitors: 0,
      downloads: 0,
    })
  }
  return result
}

const emptyKpis = {
  visitors7d: 0,
  visitors30d: 0,
  sessions7d: 0,
  sessions30d: 0,
  pageViews7d: 0,
  pageViews30d: 0,
  bounceRate7d: 0,
  bounceRate30d: 0,
  conversionSignup7d: 0,
  conversionSignup30d: 0,
  conversionDownload7d: 0,
  conversionDownload30d: 0,
  downloads7d: 0,
  downloads30d: 0,
  impressions7d: 0,
  impressions30d: 0,
  activeSubscribers: 0,
  newSignups7d: 0,
  newSignups30d: 0,
}

/** Real zeros when DATABASE_URL is set but no events collected yet. */
export function getEmptyDashboardStats(): DashboardStats {
  return {
    isDemo: false,
    setupState: "empty",
    period: { days7: true, days30: true },
    kpis: emptyKpis,
    topFilters: { themes: [], seasons: [] },
    topAges: [],
    topActivities: [],
    topPages: [],
    dailyTrend: buildEmptyDailyTrend(14),
    vercelAnalytics: {
      enabled: process.env.NODE_ENV === "production",
      note: "Vercel Analytics actif en production. Ce tableau agrège les événements first-party (filtres, téléchargements, pages).",
    },
  }
}

/** DATABASE_URL set but analytics tables not created yet. */
export function getNeedsMigrationDashboardStats(): DashboardStats {
  return {
    ...getEmptyDashboardStats(),
    setupState: "needs_migration",
  }
}
