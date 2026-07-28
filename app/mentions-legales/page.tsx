import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: true, follow: true },
}

export default function MentionsLegalesPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12 prose-neutral">
        <h1 className="font-display text-4xl font-bold text-foreground">Mentions légales</h1>
        <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Éditeur</h2>
            <p className="mt-2">
              Le site <strong className="text-foreground">educpop</strong> (educpop.fr) est édité à titre
              personnel / associatif. Les informations d&apos;éditeur (raison sociale, siège, contact) seront
              complétées avant la mise en production publique.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Hébergement</h2>
            <p className="mt-2">
              Site hébergé par Vercel Inc. Contenu CMS (Strapi) hébergé séparément (Railway / Strapi Cloud —
              à confirmer).
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Propriété intellectuelle</h2>
            <p className="mt-2">
              Les fiches et contenus proposés sur educpop sont destinés à un usage familial / pédagogique
              privé (impression à domicile). Toute redistribution commerciale sans autorisation est
              interdite.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
