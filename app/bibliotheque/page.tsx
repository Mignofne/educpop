import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LibraryBrowser } from "@/components/library-browser"
import { Squiggle } from "@/components/decor"

export const metadata = {
  title: "Bibliothèque d'activités",
  description:
    "Fiches pédagogiques à imprimer, filtrables par âge, thème et saison. Anatomie, saisons, vocabulaire, tracés, syllabes, drapeaux et packs thématiques.",
}

export default function LibraryPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-8">
          <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">La bibliothèque</h1>
          <Squiggle color="sun" className="mt-2 h-4 w-52" />
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Observer, nommer, manipuler — des fiches à faire ensemble. Filtrez par âge, thème et saison
            pour trouver l&apos;activité du jour.
          </p>
        </header>

        <Suspense fallback={<p className="text-muted-foreground">Chargement…</p>}>
          <LibraryBrowser />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
