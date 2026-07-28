import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="no-print mt-24 border-t-4 border-ink bg-ink text-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sun font-display font-bold text-ink">
              e
            </span>
            <span className="font-display font-bold">educpop</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-background/70">
            Grandir et faire grandir, un moment joyeux à la fois. Activités pédagogiques à imprimer, à vivre ensemble.
          </p>
        </div>

        <FooterCol title="Explorer">
          <FooterLink href="/bibliotheque">Bibliothèque</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/generer">Générer avec l&apos;IA</FooterLink>
          <FooterLink href="/abonnement">Tarifs</FooterLink>
        </FooterCol>

        <FooterCol title="Thèmes">
          <FooterLink href="/bibliotheque?theme=saisons">Saisons</FooterLink>
          <FooterLink href="/bibliotheque?theme=animaux">Animaux</FooterLink>
          <FooterLink href="/bibliotheque?theme=botanique">Botanique</FooterLink>
          <FooterLink href="/bibliotheque?theme=lecture">Lecture</FooterLink>
        </FooterCol>

        <FooterCol title="Compte">
          <FooterLink href="/sign-up">Créer un compte</FooterLink>
          <FooterLink href="/sign-in">Connexion</FooterLink>
        </FooterCol>
      </div>
      <div className="flex flex-col items-center gap-2 border-t border-background/20 px-4 py-4 text-center text-xs text-background/60 sm:flex-row sm:justify-center sm:gap-4">
        <span>© {new Date().getFullYear()} educpop — Fait avec joie pour apprendre en famille.</span>
        <span className="hidden sm:inline" aria-hidden="true">
          ·
        </span>
        <Link href="/mentions-legales" className="hover:text-background">
          Mentions légales
        </Link>
        <Link href="/confidentialite" className="hover:text-background">
          Confidentialité
        </Link>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-sun">{title}</h3>
      <ul className="mt-3 flex flex-col gap-2">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-background/80 transition-colors hover:text-background">
        {children}
      </Link>
    </li>
  )
}
