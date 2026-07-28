import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"
import { NextResponse } from "next/server"

const handler = auth ? toNextJsHandler(auth.handler) : null

export const GET = handler?.GET ?? (() => NextResponse.json({ error: "Auth not configured" }, { status: 503 }))
export const POST = handler?.POST ?? (() => NextResponse.json({ error: "Auth not configured" }, { status: 503 }))
