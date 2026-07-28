import Link from "next/link"
import { getSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"

export async function SiteHeader() {
  const session = await getSession()

  return (
    <header className="no-print sticky top-0 z-50 border-b-4 border-ink bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-sun font-display text-lg font-bold text-ink">
            e
          </span>
          <span className="font-display text-lg font-bold leading-tight text-foreground sm:text-xl">
            educ<span className="text-berry">pop</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="/bibliotheque">Bibliothèque</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/generer">Générer avec l&apos;IA</NavLink>
          <NavLink href="/abonnement">Tarifs</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <UserMenu name={session.user.name} isSubscribed={(session.user as { isSubscribed?: boolean }).isSubscribed} />
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden font-semibold sm:inline-flex">
                <Link href="/sign-in">Connexion</Link>
              </Button>
              <Button
                asChild
                className="rounded-full border-2 border-ink bg-berry font-bold text-primary-foreground shadow-[3px_3px_0_0_var(--ink)] hover:bg-berry/90"
              >
                <Link href="/sign-up">Créer un compte</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-4 py-2 font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {children}
    </Link>
  )
}
