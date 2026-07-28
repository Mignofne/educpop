import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: true, follow: true },
}

export default function ConfidentialitePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-foreground">
          Politique de confidentialité
        </h1>
        <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Données collectées</h2>
            <p className="mt-2">
              Pour télécharger une fiche gratuite, nous demandons une adresse email. Si vous créez un
              compte, nous stockons aussi votre prénom et un mot de passe hashé.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Finalités</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Débloquer le téléchargement / l&apos;impression des fiches</li>
              <li>Vous informer des nouvelles fiches (désinscription en un clic)</li>
              <li>Gérer l&apos;abonnement et la génération IA (si souscrit)</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Base légale</h2>
            <p className="mt-2">
              Consentement (email pour téléchargement / newsletter) et exécution du contrat
              (abonnement). Conformité RGPD : droit d&apos;accès, de rectification et de suppression sur
              demande.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Conservation</h2>
            <p className="mt-2">
              Les emails de téléchargement sont conservés tant que vous ne vous désinscrivez pas, ou
              jusqu&apos;à une demande de suppression.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
