"use server"

import { getDb } from "@/lib/db"
import { downloadLead } from "@/lib/db/schema"
import { getSession } from "@/lib/auth"
import { recordAnalyticsEvent } from "@/lib/analytics/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function registerDownload(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const activitySlug = String(formData.get("activitySlug") ?? "").trim()
  const ageBand = String(formData.get("ageBand") ?? "").trim() || null
  const newsletterOptIn = formData.get("newsletterOptIn") === "1"

  if (!EMAIL_RE.test(email)) {
    return { ok: false as const, error: "Merci d'entrer une adresse email valide." }
  }
  if (!activitySlug) {
    return { ok: false as const, error: "Activité inconnue." }
  }

  const session = await getSession()
  const userId = session?.user?.id ?? null

  const db = getDb()
  if (db) {
    try {
      await db.insert(downloadLead).values({
        email,
        activitySlug,
        ageBand,
        newsletterOptIn,
        userId,
      })
    } catch {
      // Allow download even if lead storage fails (e.g. DB not configured yet)
    }
  }

  await recordAnalyticsEvent({
    eventType: "download",
    sessionId: String(formData.get("sessionId") ?? "server"),
    path: `/activites/${activitySlug}`,
    properties: { activitySlug, ageBand, newsletterOptIn },
  })

  return { ok: true as const }
}
