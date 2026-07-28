import type { DashboardStats } from "./dashboard-stats"

/** Demo metrics for local dev when DB is empty or unavailable. */
export function getDemoDashboardStats(): DashboardStats {
  const today = new Date()
  const daily = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (13 - i))
    const base = 80 + Math.round(Math.sin(i * 0.8) * 25)
    return {
      date: d.toISOString().slice(0, 10),
      pageViews: base + i * 3,
      visitors: Math.round(base * 0.65),
      downloads: Math.round(base * 0.12),
    }
  })

  return {
    isDemo: true,
    period: { days7: true, days30: true },
    kpis: {
      visitors7d: 412,
      visitors30d: 1840,
      sessions7d: 498,
      sessions30d: 2210,
      pageViews7d: 2840,
      pageViews30d: 11250,
      bounceRate7d: 0.38,
      bounceRate30d: 0.41,
      conversionSignup7d: 0.048,
      conversionSignup30d: 0.042,
      conversionDownload7d: 0.156,
      conversionDownload30d: 0.138,
      downloads7d: 78,
      downloads30d: 312,
      impressions7d: 420,
      impressions30d: 1680,
      activeSubscribers: 24,
      newSignups7d: 19,
      newSignups30d: 76,
    },
    topFilters: {
      themes: [
        { label: "Animaux", value: "animaux", count: 186 },
        { label: "Saisons", value: "saisons", count: 142 },
        { label: "Lecture & écriture", value: "lecture", count: 98 },
        { label: "Continents", value: "continents", count: 76 },
        { label: "Botanique", value: "botanique", count: 54 },
      ],
      seasons: [
        { label: "Printemps", value: "printemps", count: 88 },
        { label: "Toute l'année", value: "toute-annee", count: 72 },
        { label: "Automne", value: "automne", count: 61 },
        { label: "Hiver", value: "hiver", count: 45 },
      ],
    },
    topAges: [
      { label: "4-5 ans", value: "4-5", count: 210 },
      { label: "6-7 ans", value: "6-7", count: 178 },
      { label: "2-3 ans", value: "2-3", count: 134 },
      { label: "8-10 ans", value: "8-10", count: 112 },
      { label: "1-2 ans", value: "1-2", count: 48 },
    ],
    topActivities: [
      { slug: "pack-papillon-4-5", title: "Le papillon", downloads: 42, views: 186 },
      { slug: "pack-saisons-4-5", title: "Les saisons", downloads: 38, views: 172 },
      { slug: "pack-abeilles-6-7", title: "Les abeilles", downloads: 31, views: 145 },
      { slug: "pack-tournesols-2-3", title: "Les tournesols", downloads: 28, views: 128 },
      { slug: "pack-continents-8-10", title: "Les continents", downloads: 24, views: 118 },
    ],
    topPages: [
      { path: "/bibliotheque", views: 892 },
      { path: "/", views: 640 },
      { path: "/activites/pack-papillon-4-5", views: 186 },
      { path: "/abonnement", views: 124 },
      { path: "/generer", views: 98 },
    ],
    dailyTrend: daily,
    vercelAnalytics: {
      enabled: process.env.NODE_ENV === "production",
      note: "Vercel Analytics actif en production (pages vues agrégées côté Vercel). Ce tableau utilise les événements first-party.",
    },
  }
}
