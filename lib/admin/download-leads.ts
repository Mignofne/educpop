import { desc } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { downloadLead } from "@/lib/db/schema"
import { AGE_LABELS, activities, type AgeGroup } from "@/lib/activities"

export type DownloadLeadRow = {
  id: number
  email: string
  activitySlug: string
  packTitle: string
  ageBand: string | null
  ageLabel: string | null
  newsletterOptIn: boolean
  createdAt: Date
}

function packTitle(slug: string): string {
  return activities.find((a) => a.slug === slug)?.title ?? slug
}

function ageLabel(band: string | null): string | null {
  if (!band) return null
  return AGE_LABELS[band as AgeGroup] ?? band
}

export async function getDownloadLeads(): Promise<DownloadLeadRow[]> {
  const db = getDb()
  if (!db) return []

  const rows = await db
    .select()
    .from(downloadLead)
    .orderBy(desc(downloadLead.createdAt))

  return rows.map((row) => ({
    id: row.id,
    email: row.email,
    activitySlug: row.activitySlug,
    packTitle: packTitle(row.activitySlug),
    ageBand: row.ageBand,
    ageLabel: ageLabel(row.ageBand),
    newsletterOptIn: row.newsletterOptIn,
    createdAt: row.createdAt,
  }))
}

export function downloadLeadsToCsv(rows: DownloadLeadRow[]): string {
  const header = ["Email", "Pack", "Slug", "Âge", "Opt-in newsletter", "Date"]
  const lines = rows.map((row) => [
    row.email,
    row.packTitle,
    row.activitySlug,
    row.ageLabel ?? row.ageBand ?? "",
    row.newsletterOptIn ? "oui" : "non",
    row.createdAt.toISOString(),
  ])

  const escape = (value: string) => {
    if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`
    return value
  }

  return [header, ...lines].map((line) => line.map(escape).join(",")).join("\n")
}
