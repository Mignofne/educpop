"use server"

import { db } from "@/lib/db"
import { downloadLead } from "@/lib/db/schema"
import { getSession } from "@/lib/auth"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function registerDownload(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const activitySlug = String(formData.get("activitySlug") ?? "").trim()

  if (!EMAIL_RE.test(email)) {
    return { ok: false as const, error: "Merci d'entrer une adresse email valide." }
  }
  if (!activitySlug) {
    return { ok: false as const, error: "Activité inconnue." }
  }

  const session = await getSession()
  const userId = session?.user?.id ?? null

  if (db) {
    try {
      await db.insert(downloadLead).values({ email, activitySlug, userId })
    } catch {
      // Allow download even if lead storage fails (e.g. DB not configured yet)
    }
  }

  return { ok: true as const }
}
