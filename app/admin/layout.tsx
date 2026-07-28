export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-background">
      <header className="border-b-4 border-ink bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="font-display text-lg font-bold">
            educ<span className="text-berry">pop</span> — BO
          </span>
          <nav className="flex gap-4 text-sm font-semibold">
            <a href="/admin" className="text-berry hover:underline">Dashboard</a>
            <a href="/admin/login" className="text-muted-foreground hover:text-foreground">Connexion</a>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  )
}
