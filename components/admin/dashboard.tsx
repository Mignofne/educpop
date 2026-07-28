import Link from "next/link"
import type { DashboardStats, RankedItem } from "@/lib/admin/dashboard-stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function pct(n: number): string {
  return `${(n * 100).toFixed(1)} %`
}

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n)
}

export function AdminDashboard({ stats }: { stats: DashboardStats }) {
  const maxTrend = Math.max(...stats.dailyTrend.map((d) => d.pageViews), 1)

  return (
    <div className="space-y-8">
      {stats.isDemo && (
        <div className="rounded-2xl border-4 border-dashed border-tangerine bg-tangerine/10 px-4 py-3 text-sm font-semibold text-foreground">
          Mode démo — configurez <code className="rounded bg-background px-1">DATABASE_URL</code> sur Vercel
          et exécutez{" "}
          <code className="rounded bg-background px-1">node scripts/create-analytics-table.mjs</code>{" "}
          pour activer les stats de production. Les données affichées sont fictives.
        </div>
      )}

      <section>
        <h2 className="font-display text-lg font-bold text-foreground">Indicateurs clés</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Visiteurs uniques" value7={fmt(stats.kpis.visitors7d)} value30={fmt(stats.kpis.visitors30d)} />
          <KpiCard title="Pages vues" value7={fmt(stats.kpis.pageViews7d)} value30={fmt(stats.kpis.pageViews30d)} />
          <KpiCard
            title="Taux de rebond"
            value7={pct(stats.kpis.bounceRate7d)}
            value30={pct(stats.kpis.bounceRate30d)}
            invert
          />
          <KpiCard
            title="Téléchargements"
            value7={fmt(stats.kpis.downloads7d)}
            value30={fmt(stats.kpis.downloads30d)}
          />
          <KpiCard
            title="Conv. inscription"
            value7={pct(stats.kpis.conversionSignup7d)}
            value30={pct(stats.kpis.conversionSignup30d)}
            hint="visite → compte"
          />
          <KpiCard
            title="Conv. téléchargement"
            value7={pct(stats.kpis.conversionDownload7d)}
            value30={pct(stats.kpis.conversionDownload30d)}
            hint="visite → fiche"
          />
          <KpiCard title="Nouveaux comptes" value7={fmt(stats.kpis.newSignups7d)} value30={fmt(stats.kpis.newSignups30d)} />
          <KpiCard
            title="Abonnés actifs"
            value7={fmt(stats.kpis.activeSubscribers)}
            value30={fmt(stats.kpis.activeSubscribers)}
            single
          />
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-foreground">Évolution (14 jours)</h2>
        <Card className="mt-4 rounded-3xl border-4 border-ink shadow-[4px_4px_0_0_var(--ink)]">
          <CardContent className="pt-4">
            <div className="flex h-40 items-end gap-1">
              {stats.dailyTrend.map((d) => (
                <div key={d.date} className="group flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-sky transition-all group-hover:bg-berry"
                    style={{ height: `${(d.pageViews / maxTrend) * 100}%`, minHeight: d.pageViews > 0 ? "4px" : "0" }}
                    title={`${d.date}: ${d.pageViews} vues`}
                  />
                  <span className="hidden text-[10px] text-muted-foreground sm:block">
                    {d.date.slice(5)}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Barres = pages vues par jour</p>
          </CardContent>
        </Card>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <RankedList title="Filtres thème (30 j)" items={stats.topFilters.themes} />
        <RankedList title="Filtres saison (30 j)" items={stats.topFilters.seasons} />
        <RankedList title="Tranches d'âge (30 j)" items={stats.topAges} />
        <TopPagesTable pages={stats.topPages} />
      </div>

      <section>
        <h2 className="font-display text-lg font-bold text-foreground">Top packs / livrets (30 j)</h2>
        <Card className="mt-4 rounded-3xl border-4 border-ink shadow-[4px_4px_0_0_var(--ink)]">
          <CardContent className="overflow-x-auto pt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-ink/20 text-left text-muted-foreground">
                  <th className="pb-2 font-semibold">Pack</th>
                  <th className="pb-2 font-semibold">Vues</th>
                  <th className="pb-2 font-semibold">Téléchargements</th>
                </tr>
              </thead>
              <tbody>
                {stats.topActivities.map((a) => (
                  <tr key={a.slug} className="border-b border-ink/10">
                    <td className="py-2">
                      <Link href={`/activites/${a.slug}`} className="font-semibold text-berry hover:underline">
                        {a.title}
                      </Link>
                      <span className="ml-2 text-xs text-muted-foreground">{a.slug}</span>
                    </td>
                    <td className="py-2">{fmt(a.views)}</td>
                    <td className="py-2 font-bold">{fmt(a.downloads)}</td>
                  </tr>
                ))}
                {stats.topActivities.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-4 text-muted-foreground">Aucune donnée</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <p className="text-xs text-muted-foreground">{stats.vercelAnalytics.note}</p>
    </div>
  )
}

function KpiCard({
  title,
  value7,
  value30,
  hint,
  invert,
  single,
}: {
  title: string
  value7: string
  value30: string
  hint?: string
  invert?: boolean
  single?: boolean
}) {
  return (
    <Card className="rounded-2xl border-4 border-ink shadow-[3px_3px_0_0_var(--ink)]">
      <CardHeader className="pb-0">
        <CardTitle className="font-display text-sm font-bold text-muted-foreground">{title}</CardTitle>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </CardHeader>
      <CardContent>
        {single ? (
          <p className="font-display text-3xl font-bold text-foreground">{value7}</p>
        ) : (
          <div className="flex gap-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">7 j</p>
              <p className={cn("font-display text-2xl font-bold", invert && "text-tangerine")}>{value7}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground">30 j</p>
              <p className={cn("font-display text-2xl font-bold text-foreground", invert && "text-tangerine")}>
                {value30}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function RankedList({ title, items }: { title: string; items: RankedItem[] }) {
  const max = Math.max(...items.map((i) => i.count), 1)
  return (
    <Card className="rounded-3xl border-4 border-ink shadow-[4px_4px_0_0_var(--ink)]">
      <CardHeader>
        <CardTitle className="font-display font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune donnée</p>
        ) : (
          items.map((item) => (
            <div key={item.value}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{item.label}</span>
                <span className="text-muted-foreground">{fmt(item.count)}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-leaf"
                  style={{ width: `${(item.count / max) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

function TopPagesTable({ pages }: { pages: { path: string; views: number }[] }) {
  return (
    <Card className="rounded-3xl border-4 border-ink shadow-[4px_4px_0_0_var(--ink)]">
      <CardHeader>
        <CardTitle className="font-display font-bold">Top pages (30 j)</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {pages.map((p) => (
            <li key={p.path} className="flex justify-between gap-2">
              <span className="truncate font-mono text-xs">{p.path}</span>
              <span className="shrink-0 font-bold">{fmt(p.views)}</span>
            </li>
          ))}
          {pages.length === 0 && <li className="text-muted-foreground">Aucune donnée</li>}
        </ul>
      </CardContent>
    </Card>
  )
}
