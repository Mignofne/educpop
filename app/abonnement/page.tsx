import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Squiggle } from "@/components/decor"

export const metadata: Metadata = {
  title: "Tarifs — packs IA",
  description:
    "Générez des packs pédagogiques à la demande : 2 € le pack, ou packs de crédits. La bibliothèque reste gratuite.",
}

const CREDIT_FEATURES = [
  "1 crédit = 1 pack généré (5–8 activités + couverture)",
  "Adaptation à l'âge (2–10 ans) et au thème choisi",
  "Activités illustrées, prêtes à imprimer en famille",
  "Réimpression illimitée du pack acheté",
  "Crédits sans date d'expiration (à venir)",
]

export default function AbonnementPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl text-balance">
            Payez le pack, pas un abo inutile
          </h1>
          <Squiggle color="sun" className="mx-auto mt-3 h-5 w-52" />
          <p className="mt-4 text-lg text-muted-foreground">
            La bibliothèque reste gratuite. Pour un thème sur-mesure (« les châteaux », « les abeilles »…),
            vous achetez un pack — ou des crédits si vous en faites plusieurs.
          </p>
        </header>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          <PlanCard
            title="Gratuit"
            price="0 €"
            period="pour toujours"
            cta="Explorer la bibliothèque"
            href="/bibliotheque"
            features={["Fiches curatées à imprimer", "Filtres âge / thème / saison", "Email pour télécharger"]}
          />
          <PlanCard
            title="1 pack"
            price="2 €"
            period="le pack"
            highlighted
            cta="Bientôt — générer"
            href="/generer"
            features={[
              "Pack complet adapté à l'âge",
              "5 à 8 activités + couverture",
              "Idéal pour un thème ponctuel",
            ]}
          />
          <PlanCard
            title="5 crédits"
            price="8 €"
            period="soit 1,60 € / pack"
            cta="Bientôt disponible"
            href="/generer"
            features={CREDIT_FEATURES}
          />
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-[1.5rem] border-2 border-dashed border-ink/30 bg-card/60 px-6 py-5 text-sm leading-relaxed text-muted-foreground">
          <p className="font-display text-base font-bold text-foreground">Pourquoi 2 € et pas un abo illimité ?</p>
          <p className="mt-2">
            Souvent, une famille crée 1 à 4 packs par mois — pas vingt. Vous ne payez que ce dont
            vous avez besoin, quand vous en avez besoin. Un abonnement « Famille » avec un petit
            quota mensuel pourra arriver plus tard pour les plus gourmands.
          </p>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
          Paiement sécurisé via Stripe (à venir). Pas de prélèvement mensuel sur l&apos;offre pack / crédits.
          Les fiches gratuites restent accessibles sans carte bancaire.
        </p>
      </main>
      <SiteFooter />
    </>
  )
}

function PlanCard({
  title,
  price,
  period,
  features,
  cta,
  href,
  highlighted,
}: {
  title: string
  price: string
  period: string
  features: string[]
  cta: string
  href: string
  highlighted?: boolean
}) {
  return (
    <div
      className={`flex flex-col rounded-[2rem] border-4 border-ink p-8 shadow-[6px_6px_0_0_var(--ink)] ${
        highlighted ? "bg-berry text-primary-foreground" : "bg-card text-foreground"
      }`}
    >
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <p className="mt-2 font-display text-4xl font-bold">
        {price}{" "}
        <span className={`text-base font-semibold ${highlighted ? "opacity-90" : "text-muted-foreground"}`}>
          {period}
        </span>
      </p>
      <ul className="mt-6 flex flex-1 flex-col gap-2">
        {features.map((f) => (
          <li key={f} className="flex gap-2 text-sm font-semibold leading-relaxed">
            <span aria-hidden="true">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Button
        asChild
        size="lg"
        className={`mt-8 rounded-full border-2 border-ink font-bold shadow-[3px_3px_0_0_var(--ink)] ${
          highlighted
            ? "bg-background text-foreground hover:bg-background/90"
            : "bg-berry text-primary-foreground hover:bg-berry/90"
        }`}
      >
        <Link href={href}>{cta}</Link>
      </Button>
    </div>
  )
}
