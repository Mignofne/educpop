import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminAuthenticated, getAdminSecret } from "@/lib/admin/auth"
import { AdminDashboard } from "@/components/admin/dashboard"
import { getDashboardStats } from "@/lib/admin/dashboard-stats"

export const metadata = {
  title: "Tableau de bord",
  robots: { index: false, follow: false },
}

export default async function AdminDashboardPage() {
  if (!getAdminSecret()) {
    return (
      <div className="rounded-2xl border-4 border-dashed border-ink p-6">
        <p className="font-display text-lg font-bold">ADMIN_SECRET non configuré</p>
        <p className="mt-2 text-muted-foreground">
          Ajoutez <code>ADMIN_SECRET</code> dans votre fichier <code>.env</code> pour protéger le back-office.
        </p>
      </div>
    )
  }

  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  const stats = await getDashboardStats()

  return (
  <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Performance du site</h1>
          <p className="mt-1 text-muted-foreground">
            Conversion, catalogue, téléchargements et engagement
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border-2 border-ink px-4 py-2 text-sm font-bold shadow-[3px_3px_0_0_var(--ink)] hover:bg-muted"
        >
          Voir le site
        </Link>
      </div>
      <AdminDashboard stats={stats} />
    </>
  )
}
