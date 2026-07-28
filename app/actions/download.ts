"use server"

import { getDb } from "@/lib/db"
import { downloadLead } from "@/lib/db/schema"
import { getSession } from "@/lib/auth"
import { recordAnalyticsEvent } from "@/lib/analytics/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  try {
    return await Promise.race([
      promise,
      new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
    ])
  } catch {
    return null
  }
}

export async function registerDownload(formData: FormData) {
  try {
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

    // Never block unlock on session/DB — mobile networks + Neon cold start
    const session = await withTimeout(getSession(), 2500)
    const userId = session?.user?.id ?? null

    const db = getDb()
    if (db) {
      await withTimeout(
        db
          .insert(downloadLead)
          .values({
            email,
            activitySlug,
            ageBand,
            newsletterOptIn,
            userId,
          })
          .then(() => true as const),
        4000,
      )
    }

    await withTimeout(
      recordAnalyticsEvent({
        eventType: "download",
        sessionId: String(formData.get("sessionId") ?? "server"),
        path: `/activites/${activitySlug}`,
        properties: { activitySlug, ageBand, newsletterOptIn },
      }),
      3000,
    )

    return { ok: true as const }
  } catch {
    // Unlock anyway — capture must never block the parent from printing
    return { ok: true as const }
  }
}
