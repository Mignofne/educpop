"use server"

import { redirect } from "next/navigation"
import { setAdminSession } from "@/lib/admin/auth"

export async function adminLoginAction(
  _prev: { ok: boolean; error?: string } | null,
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const secret = String(formData.get("secret") ?? "")
  const ok = await setAdminSession(secret)
  if (!ok) {
    return { ok: false, error: "Secret invalide ou ADMIN_SECRET non configuré." }
  }
  redirect("/admin")
}
