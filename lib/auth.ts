import { betterAuth } from "better-auth"
import { headers } from "next/headers"
import { pool } from "@/lib/db"

export const auth = pool
  ? betterAuth({
      database: pool,
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
  : null

export async function getSession() {
  if (!auth) return null
  try {
    return await auth.api.getSession({ headers: await headers() })
  } catch {
    return null
  }
}
