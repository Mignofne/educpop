import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ActivityCard } from "@/components/activity-card"
import { HeroCollage } from "@/components/hero-collage"
import { Button } from "@/components/ui/button"
import { Blob, Dots, Squiggle } from "@/components/decor"
import { activities, THEME_LABELS, type Theme } from "@/lib/activities"

const THEME_EMOJI_COLORS: Record<Theme, string> = {
  saisons: "bg-sun",
  animaux: "bg-berry text-primary-foreground",
  botanique: "bg-leaf",
  continents: "bg-sky",
  histoire: "bg-tangerine",
  lecture: "bg-accent",
  animes: "bg-berry text-primary-foreground",
  asie: "bg-leaf",
}

export default function HomePage() {
  const featured = activities.slice(0, 4)

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <Blob color="sky" className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 opacity-40" />
          <Blob color="sun" className="pointer-events-none absolute -right-24 top-24 h-80 w-80 opacity-40" />
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
                educpop — apprendre ensemble, en joie
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-foreground text-balance sm:text-5xl lg:text-6xl">
                Grandir <span className="text-berry">et</span> faire grandir,
                <br />
                un moment <span className="text-sky">joyeux</span> à la fois.
              </h1>
              <Squiggle color="berry" className="mt-3 h-5 w-64" />
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
                Observer, nommer, manipuler — des fiches joyeuses à imprimer, déclinées par âge. Filtrez par
                thème, ou générez un pack sur-mesure grâce à l&apos;IA.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full border-2 border-ink bg-berry text-base font-bold text-primary-foreground shadow-[4px_4px_0_0_var(--ink)] hover:bg-berry/90"
                >
                  <Link href="/bibliotheque">Explorer les activités</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-ink bg-card text-base font-bold text-foreground shadow-[4px_4px_0_0_var(--ink)] hover:bg-muted"
                >
                  <Link href="/generer">Générer un thème</Link>
                </Button>
              </div>
              <p className="mt-4 text-sm font-semibold text-muted-foreground">
                Fiches gratuites • Aucune carte bancaire pour télécharger
              </p>
            </div>

            <div className="relative">
              <HeroCollage />
              <Dots color="berry" className="absolute -bottom-6 -left-6 h-14 w-40" />
            </div>
          </div>
        </section>

        {/* Themes */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Explorer par thème</h2>
            <Link href="/bibliotheque" className="font-semibold text-berry underline-offset-4 hover:underline">
              Tout voir
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {(Object.keys(THEME_LABELS) as Theme[]).map((theme) => (
              <Link
                key={theme}
                href={`/bibliotheque?theme=${theme}`}
                className={`flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl border-4 border-ink p-3 text-center font-display font-bold text-ink shadow-[4px_4px_0_0_var(--ink)] transition-transform hover:-translate-y-1 ${THEME_EMOJI_COLORS[theme]}`}
              >
                <span className="text-balance leading-tight">{THEME_LABELS[theme]}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Nos fiches préférées</h2>
          <p className="mt-1 text-muted-foreground">À imprimer et à faire dès aujourd&apos;hui, gratuitement.</p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((activity) => (
              <ActivityCard key={activity.slug} activity={activity} />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-[2rem] border-4 border-ink bg-card p-8 shadow-[6px_6px_0_0_var(--ink)] md:p-12">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Comment ça marche ?</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <Step n="1" color="sun" title="Choisissez un thème">
                Filtrez la bibliothèque par âge, par saison et par thème pour trouver l&apos;activité parfaite.
              </Step>
              <Step n="2" color="sky" title="Téléchargez gratuitement">
                Laissez votre email et imprimez la fiche. Simple, joyeux, prêt en deux minutes.
              </Step>
              <Step n="3" color="berry" title="Générez sur-mesure">
                Avec l&apos;abonnement, créez des fiches à la volée sur n&apos;importe quel thème grâce à l&apos;IA.
              </Step>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-ink bg-berry p-10 text-center text-primary-foreground shadow-[6px_6px_0_0_var(--ink)]">
            <Dots color="sun" className="absolute left-6 top-6 h-10 w-32 opacity-80" />
            <h2 className="font-display text-3xl font-bold text-balance">Envie de créer un thème sur-mesure ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
              « Je veux travailler les tournesols avec mon enfant de 5 ans » — et hop, une fiche complète adaptée à son
              âge, prête à imprimer.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 rounded-full border-2 border-ink bg-background text-base font-bold text-foreground shadow-[4px_4px_0_0_var(--ink)] hover:bg-background/90"
            >
              <Link href="/abonnement">Découvrir l&apos;abonnement</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

function Step({
  n,
  color,
  title,
  children,
}: {
  n: string
  color: "sun" | "sky" | "berry"
  title: string
  children: React.ReactNode
}) {
  const bg = { sun: "bg-sun text-ink", sky: "bg-sky text-ink", berry: "bg-berry text-primary-foreground" }[color]
  return (
    <div>
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink font-display text-xl font-bold ${bg}`}
      >
        {n}
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-foreground">{title}</h3>
      <p className="mt-1 leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}
