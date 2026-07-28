"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import type { DownloadLeadRow } from "@/lib/admin/download-leads"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type SortKey = "email" | "packTitle" | "ageLabel" | "newsletterOptIn" | "createdAt"
type SortDir = "asc" | "desc"

function fmtDate(d: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(d)
}

export function DownloadLeadsTable({ rows }: { rows: DownloadLeadRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("createdAt")
  const [sortDir, setSortDir] = useState<SortDir>("desc")

  const sorted = useMemo(() => {
    const copy = [...rows]
    copy.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case "email":
          cmp = a.email.localeCompare(b.email, "fr")
          break
        case "packTitle":
          cmp = a.packTitle.localeCompare(b.packTitle, "fr")
          break
        case "ageLabel":
          cmp = (a.ageLabel ?? "").localeCompare(b.ageLabel ?? "", "fr")
          break
        case "newsletterOptIn":
          cmp = Number(a.newsletterOptIn) - Number(b.newsletterOptIn)
          break
        case "createdAt":
          cmp = a.createdAt.getTime() - b.createdAt.getTime()
          break
      }
      return sortDir === "asc" ? cmp : -cmp
    })
    return copy
  }, [rows, sortKey, sortDir])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir(key === "createdAt" ? "desc" : "asc")
    }
  }

  const SortHeader = ({ label, col }: { label: string; col: SortKey }) => (
    <th className="pb-2 font-semibold">
      <button
        type="button"
        onClick={() => toggleSort(col)}
        className={cn(
          "inline-flex items-center gap-1 hover:text-foreground",
          sortKey === col ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
        {sortKey === col && <span aria-hidden>{sortDir === "asc" ? "↑" : "↓"}</span>}
      </button>
    </th>
  )

  return (
    <Card className="rounded-3xl border-4 border-ink shadow-[4px_4px_0_0_var(--ink)]">
      <CardContent className="overflow-x-auto pt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-ink/20 text-left">
              <SortHeader label="Email" col="email" />
              <SortHeader label="Pack" col="packTitle" />
              <SortHeader label="Âge" col="ageLabel" />
              <SortHeader label="Opt-in newsletter" col="newsletterOptIn" />
              <SortHeader label="Date" col="createdAt" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.id} className="border-b border-ink/10">
                <td className="py-2 font-mono text-xs">{row.email}</td>
                <td className="py-2">
                  <Link href={`/activites/${row.activitySlug}`} className="font-semibold text-berry hover:underline">
                    {row.packTitle}
                  </Link>
                  <span className="ml-2 text-xs text-muted-foreground">{row.activitySlug}</span>
                </td>
                <td className="py-2">{row.ageLabel ?? "—"}</td>
                <td className="py-2">
                  {row.newsletterOptIn ? (
                    <span className="rounded-full bg-leaf/20 px-2 py-0.5 text-xs font-bold text-leaf">Oui</span>
                  ) : (
                    <span className="text-muted-foreground">Non</span>
                  )}
                </td>
                <td className="py-2 whitespace-nowrap text-muted-foreground">{fmtDate(row.createdAt)}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted-foreground">
                  Aucun téléchargement enregistré pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
