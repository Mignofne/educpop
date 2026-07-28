import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DownloadGate } from "@/components/download-gate"
import { ActivityWorksheet } from "@/components/worksheets/activity-worksheet"
import { Button } from "@/components/ui/button"
import {
  AGE_LABELS,
  SEASON_LABELS,
  THEME_LABELS,
  activities,
  getActivity,
} from "@/lib/activities"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const activity = getActivity(slug)
  if (!activity) return { title: "Activité introuvable" }

  return {
    title: activity.title,
    description: activity.description,
    openGraph: {
      title: `${activity.title} | educpop`,
      description: activity.description,
    },
  }
}

export default async function ActivityPage({ params }: Props) {
  const { slug } = await params
  const activity = getActivity(slug)
  if (!activity) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: activity.title,
    description: activity.description,
    learningResourceType: "Worksheet",
    educationalLevel: activity.ages.map((a) => AGE_LABELS[a]).join(", "),
    inLanguage: "fr",
    isAccessibleForFree: activity.emojiFree,
    provider: {
      "@type": "Organization",
      name: "educpop",
      url: "https://educpop.fr",
    },
  }

  return (
    <>
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="no-print mx-auto max-w-6xl px-4 py-10">
          <nav className="mb-4 text-sm font-semibold text-muted-foreground">
            <Link href="/bibliotheque" className="hover:text-berry hover:underline">
              Bibliothèque
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{activity.title}</span>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-sm font-bold uppercase tracking-wide text-berry">
                {activity.subtitle}
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl text-balance">
                {activity.title}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {activity.description}
              </p>
              {activity.pageCount ? (
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {activity.pageCount} pages à imprimer
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2">
                {activity.ages.map((age) => (
                  <span
                    key={age}
                    className="rounded-full border-2 border-ink bg-accent px-3 py-1 text-xs font-bold text-accent-foreground"
                  >
                    {AGE_LABELS[age]}
                  </span>
                ))}
                {activity.themes.map((theme) => (
                  <Link
                    key={theme}
                    href={`/bibliotheque?theme=${theme}`}
                    className="rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    {THEME_LABELS[theme]}
                  </Link>
                ))}
                {activity.season !== "toute-annee" ? (
                  <span className="rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold text-foreground">
                    {SEASON_LABELS[activity.season]}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3">
              <DownloadGate activitySlug={activity.slug} />
              <Button
                asChild
                variant="outline"
                className="rounded-full border-2 border-ink font-bold shadow-[3px_3px_0_0_var(--ink)]"
              >
                <Link href="/bibliotheque">← Retour à la bibliothèque</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <ActivityWorksheet activity={activity} />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
