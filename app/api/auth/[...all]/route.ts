import { getAuth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"
import { NextResponse } from "next/server"

function authHandler() {
  const auth = getAuth()
  return auth ? toNextJsHandler(auth.handler) : null
}

export const GET =
  ((...args: Parameters<NonNullable<ReturnType<typeof authHandler>>["GET"]>) => {
    const handler = authHandler()
    return handler?.GET ? handler.GET(...args) : NextResponse.json({ error: "Auth not configured" }, { status: 503 })
  }) as NonNullable<ReturnType<typeof authHandler>>["GET"]

export const POST =
  ((...args: Parameters<NonNullable<ReturnType<typeof authHandler>>["POST"]>) => {
    const handler = authHandler()
    return handler?.POST ? handler.POST(...args) : NextResponse.json({ error: "Auth not configured" }, { status: 503 })
  }) as NonNullable<ReturnType<typeof authHandler>>["POST"]
