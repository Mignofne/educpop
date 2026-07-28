import { NextResponse } from "next/server"
import { isAdminAuthenticated, getAdminSecret } from "@/lib/admin/auth"
import { downloadLeadsToCsv, getDownloadLeads } from "@/lib/admin/download-leads"

export async function GET() {
  if (!getAdminSecret() || !(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const rows = await getDownloadLeads()
  const csv = downloadLeadsToCsv(rows)
  const filename = `educpop-telechargements-${new Date().toISOString().slice(0, 10)}.csv`

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
