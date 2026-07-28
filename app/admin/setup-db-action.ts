"use server"

import { revalidatePath } from "next/cache"
import { isAdminAuthenticated } from "@/lib/admin/auth"
import { ensureAppSchema } from "@/lib/db/ensure-schema"

export async function setupDatabaseFromAdmin() {
  if (!(await isAdminAuthenticated())) {
    return { ok: false as const, error: "Non autorisé." }
  }

  const result = await ensureAppSchema()
  if (!result.ok) return result

  revalidatePath("/admin")
  revalidatePath("/admin/telechargements")
  return { ok: true as const }
}
