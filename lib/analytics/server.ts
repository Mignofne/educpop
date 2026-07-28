import { getDb } from "@/lib/db"
import { analyticsEvent } from "@/lib/db/schema"
import type { AnalyticsEventPayload } from "./types"
import { ANALYTICS_EVENT_TYPES } from "./types"

export function isValidEventType(value: string): value is AnalyticsEventPayload["eventType"] {
  return (ANALYTICS_EVENT_TYPES as readonly string[]).includes(value)
}

export async function recordAnalyticsEvent(payload: AnalyticsEventPayload) {
  const db = getDb()
  if (!db) return false

  try {
    await db.insert(analyticsEvent).values({
      eventType: payload.eventType,
      sessionId: payload.sessionId.slice(0, 64),
      path: payload.path?.slice(0, 512) ?? null,
      properties: payload.properties ?? null,
    })
    return true
  } catch {
    return false
  }
}
