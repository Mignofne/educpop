import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Squiggle } from "@/components/decor"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Idées d'activités par âge et par saison, et coulisses d'educpop — pour grandir et faire grandir en famille.",
}

const POSTS = [
  {
    slug: "activites-printemps-5-ans",
    title: "10 activités printemps pour un enfant de 5 ans",
    excerpt:
      "Botanique, observation et petites fiches à imprimer pour profiter du renouveau avec douceur.",
    date: "2026-03-15",
    tag: "Saisons",
  },
  {
    slug: "nomenclature-montessori-maison",
    title: "Les cartes de nomenclature à la maison",
    excerpt:
      "Comment utiliser les cartes image + mot pour enrichir le vocabulaire sans pression.",
    date: "2026-02-20",
    tag: "Lecture",
  },
  {
    slug: "apprendre-moment-joyeux",
    title: "Apprendre en partageant un moment agréable",
    excerpt:
      "Grandir et faire grandir, ce n'est pas une checklist — c'est un temps ensemble, coloré et vivant.",
    date: "2026-01-10",
    tag: "Famille",
  },
]

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10">
          <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">Le blog</h1>
          <Squiggle color="sky" className="mt-2 h-4 w-40" />
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Idées d&apos;activités et inspirations pour des moments pédagogiques joyeux.
            Les articles complets arriveront avec le back-office Strapi.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-3xl border-4 border-ink bg-card p-6 shadow-[5px_5px_0_0_var(--ink)]"
            >
              <span className="w-fit rounded-full border-2 border-ink bg-accent px-3 py-0.5 text-xs font-bold">
                {post.tag}
              </span>
              <h2 className="mt-3 font-display text-xl font-bold text-foreground text-balance">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <time
                dateTime={post.date}
                className="mt-4 text-xs font-semibold text-muted-foreground"
              >
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <p className="mt-3 text-sm font-bold text-berry">Bientôt en ligne</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-muted-foreground">
          En attendant,{" "}
          <Link href="/bibliotheque" className="font-bold text-berry underline-offset-4 hover:underline">
            explorez la bibliothèque
          </Link>{" "}
          d&apos;activités gratuites.
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
