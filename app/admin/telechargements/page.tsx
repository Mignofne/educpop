import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminAuthenticated, getAdminSecret } from "@/lib/admin/auth"
import { getDownloadLeads } from "@/lib/admin/download-leads"
import { DownloadLeadsTable } from "@/components/admin/download-leads-table"

export const metadata = {
  title: "Téléchargements",
  robots: { index: false, follow: false },
}

export default async function AdminDownloadsPage() {
  if (!getAdminSecret()) {
    return (
      <div className="rounded-2xl border-4 border-dashed border-ink p-6">
        <p className="font-display text-lg font-bold">ADMIN_SECRET non configuré</p>
      </div>
    )
  }

  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  const leads = await getDownloadLeads()
  const newsletterCount = leads.filter((l) => l.newsletterOptIn).length

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Téléchargements</h1>
          <p className="mt-1 text-muted-foreground">
            {leads.length} lead{leads.length !== 1 ? "s" : ""} · {newsletterCount} opt-in newsletter
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/admin/telechargements/export"
            className="inline-flex items-center justify-center rounded-full border-2 border-ink bg-leaf px-4 py-2 text-sm font-bold text-primary-foreground shadow-[3px_3px_0_0_var(--ink)] hover:bg-leaf/90"
          >
            Exporter CSV
          </a>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-full border-2 border-ink px-4 py-2 text-sm font-bold shadow-[3px_3px_0_0_var(--ink)] hover:bg-muted"
          >
            ← Dashboard
          </Link>
        </div>
      </div>

      {!process.env.DATABASE_URL && (
        <div className="mb-6 rounded-2xl border-4 border-dashed border-tangerine bg-tangerine/10 px-4 py-3 text-sm font-semibold">
          DATABASE_URL non configuré — aucune donnée de production disponible.
        </div>
      )}

      <DownloadLeadsTable rows={leads} />
    </>
  )
}
