import { betterAuth } from "better-auth"
import { headers } from "next/headers"
import { getPool } from "@/lib/db"

type AuthInstance = ReturnType<typeof betterAuth>

let cachedAuth: AuthInstance | null | undefined

function getAuth(): AuthInstance | null {
  if (cachedAuth !== undefined) return cachedAuth

  const pool = getPool()
  const secret = process.env.BETTER_AUTH_SECRET?.trim()
  if (!pool || !secret) {
    cachedAuth = null
    return null
  }

  try {
    cachedAuth = betterAuth({
      database: pool,
      secret,
      baseURL:
        process.env.BETTER_AUTH_URL ??
        (process.env.VERCEL_PROJECT_PRODUCTION_URL
          ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
          : process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
      emailAndPassword: {
        enabled: true,
        autoSignIn: true,
      },
      trustedOrigins: [
        ...(process.env.NEXT_PUBLIC_SITE_URL ? [process.env.NEXT_PUBLIC_SITE_URL] : []),
        ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
        ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
          ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
          : []),
        "http://localhost:3000",
      ],
      session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
      },
      ...(process.env.NODE_ENV === "development"
        ? {
            advanced: {
              defaultCookieAttributes: {
                sameSite: "none" as const,
                secure: true,
              },
            },
          }
        : {}),
    })
  } catch (err) {
    console.error("[auth] betterAuth init failed:", err)
    cachedAuth = null
  }

  return cachedAuth
}

/** @deprecated Prefer getAuth() — null when DATABASE_URL missing. */
export const auth = null as AuthInstance | null

export { getAuth }

export async function getSession() {
  const authInstance = getAuth()
  if (!authInstance) return null
  try {
    return await authInstance.api.getSession({ headers: await headers() })
  } catch {
    return null
  }
}
