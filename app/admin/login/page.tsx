import Link from "next/link"
import { AdminLoginForm } from "./admin-login-form"

export const metadata = {
  title: "Connexion admin",
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-[2rem] border-4 border-ink bg-card p-8 shadow-[6px_6px_0_0_var(--ink)]">
        <Link href="/" className="mb-4 font-display text-xl font-bold text-foreground">
          educ<span className="text-berry">pop</span> admin
        </Link>
        <h1 className="font-display text-2xl font-bold">Tableau de bord</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Connexion via le secret défini dans <code className="text-xs">ADMIN_SECRET</code>.
        </p>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  )
}
