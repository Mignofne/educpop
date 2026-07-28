import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Blob, Squiggle } from "@/components/decor"

export const metadata: Metadata = {
  title: "Générer un pack avec l'IA",
  description:
    "Créez un pack pédagogique sur-mesure (5–8 activités) : 2 € le pack, ou crédits. Observer, nommer, manipuler — adapté à l'âge.",
}

export default function GenererPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden">
        <Blob color="sun" className="pointer-events-none absolute -left-20 top-10 h-72 w-72 opacity-30" />
        <Blob color="berry" className="pointer-events-none absolute -right-16 top-40 h-64 w-64 opacity-30" />

        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <span className="inline-flex rounded-full border-2 border-ink bg-accent px-4 py-1.5 text-sm font-bold">
            2&nbsp;€ le pack · ou crédits
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold text-foreground sm:text-5xl text-balance">
            Votre thème, votre pack, en un clin d&apos;œil
          </h1>
          <Squiggle color="berry" className="mx-auto mt-3 h-5 w-56" />
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            « Je veux travailler les tournesols avec mon enfant de 5 ans » — et hop : un pack
            (anatomie, vocabulaire, tracés, écriture…) adapté à son âge, prêt à imprimer.
            Pas d&apos;abonnement obligatoire : vous payez le pack généré.
          </p>

          <div className="mx-auto mt-10 rounded-[2rem] border-4 border-dashed border-ink/40 bg-card p-8 text-left shadow-[5px_5px_0_0_var(--ink)]">
            <label className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Thème à explorer
            </label>
            <input
              disabled
              placeholder="Ex. les abeilles, le Japon, l'automne…"
              className="mt-2 w-full rounded-xl border-2 border-ink bg-muted/50 px-4 py-3 font-semibold text-foreground opacity-70"
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Âge de l&apos;enfant
                </label>
                <select
                  disabled
                  className="mt-2 w-full rounded-xl border-2 border-ink bg-muted/50 px-4 py-3 font-semibold opacity-70"
                >
                  <option>4-5 ans</option>
                </select>
              </div>
              <div>
                <label className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Type de fiche
                </label>
                <select
                  disabled
                  className="mt-2 w-full rounded-xl border-2 border-ink bg-muted/50 px-4 py-3 font-semibold opacity-70"
                >
                  <option>Pack complet (5–8 activités)</option>
                </select>
              </div>
            </div>
            <div className="mt-5 rounded-xl border-2 border-ink/15 bg-muted/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">Tarif prévu</p>
              <ul className="mt-1 list-inside list-disc space-y-0.5 font-medium">
                <li>
                  <strong className="text-foreground">2&nbsp;€</strong> = 1 pack généré
                </li>
                <li>
                  <strong className="text-foreground">8&nbsp;€</strong> = 5 crédits (1,60&nbsp;€ / pack)
                </li>
              </ul>
              <p className="mt-2 text-xs">
                Un pack sur-mesure autour de votre thème, pensé pour l&apos;âge de votre enfant —
                des activités joyeuses, prêtes à imprimer à la maison.
              </p>
            </div>
            <p className="mt-4 text-center text-sm font-semibold text-muted-foreground">
              La génération IA arrive bientôt. En attendant, explorez la bibliothèque gratuite.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full border-2 border-ink bg-berry font-bold text-primary-foreground shadow-[4px_4px_0_0_var(--ink)] hover:bg-berry/90"
            >
              <Link href="/abonnement">Voir les tarifs</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-ink font-bold shadow-[4px_4px_0_0_var(--ink)]"
            >
              <Link href="/bibliotheque">Voir les fiches gratuites</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
