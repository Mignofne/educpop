import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-ink bg-sun font-display text-2xl font-bold">
          ?
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold text-foreground">Page introuvable</h1>
        <p className="mt-2 text-muted-foreground">
          Cette page n&apos;existe pas (ou plus). Retrouvez nos fiches dans la bibliothèque.
        </p>
        <Button
          asChild
          className="mt-8 rounded-full border-2 border-ink bg-berry font-bold text-primary-foreground shadow-[3px_3px_0_0_var(--ink)]"
        >
          <Link href="/bibliotheque">Aller à la bibliothèque</Link>
        </Button>
      </main>
      <SiteFooter />
    </>
  )
}
