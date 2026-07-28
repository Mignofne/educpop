import { NextResponse } from "next/server"
import { recordAnalyticsEvent, isValidEventType } from "@/lib/analytics/server"
import type { AnalyticsEventPayload } from "@/lib/analytics/types"

export async function POST(request: Request) {
  let body: Partial<AnalyticsEventPayload>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  const eventType = body.eventType
  const sessionId = body.sessionId

  if (!eventType || !isValidEventType(eventType)) {
    return NextResponse.json({ ok: false, error: "Invalid eventType" }, { status: 400 })
  }
  if (!sessionId || typeof sessionId !== "string" || sessionId.length > 64) {
    return NextResponse.json({ ok: false, error: "Invalid sessionId" }, { status: 400 })
  }

  const path = typeof body.path === "string" ? body.path.slice(0, 512) : undefined
  const properties =
    body.properties && typeof body.properties === "object" && !Array.isArray(body.properties)
      ? (body.properties as AnalyticsEventPayload["properties"])
      : undefined

  await recordAnalyticsEvent({ eventType, sessionId, path, properties })

  return NextResponse.json({ ok: true })
}
