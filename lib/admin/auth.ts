import { cookies } from "next/headers"

const ADMIN_COOKIE = "educpop_admin"

export function getAdminSecret(): string | null {
  return process.env.ADMIN_SECRET ?? null
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = getAdminSecret()
  if (!secret) return false
  const cookieStore = await cookies()
  return cookieStore.get(ADMIN_COOKIE)?.value === secret
}

export async function setAdminSession(secret: string): Promise<boolean> {
  const expected = getAdminSecret()
  if (!expected || secret !== expected) return false
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, secret, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return true
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE)
}
