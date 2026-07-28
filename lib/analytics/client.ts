"use client"

import type { AnalyticsEventPayload, AnalyticsEventType } from "./types"

const SESSION_KEY = "educpop_sid"

export function getAnalyticsSessionId(): string {
  if (typeof window === "undefined") return "server"
  try {
    let sid = localStorage.getItem(SESSION_KEY)
    if (!sid) {
      sid = crypto.randomUUID()
      localStorage.setItem(SESSION_KEY, sid)
    }
    return sid
  } catch {
    return "anonymous"
  }
}

export function trackEvent(
  eventType: AnalyticsEventType,
  properties?: AnalyticsEventPayload["properties"],
) {
  const sessionId = getAnalyticsSessionId()
  const path = typeof window !== "undefined" ? window.location.pathname : undefined

  const body: AnalyticsEventPayload = {
    eventType,
    sessionId,
    path,
    properties,
  }

  try {
    void fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    })
  } catch {
    // Analytics must not break UX
  }
}

export function trackPageView(path?: string) {
  trackEvent("page_view", { path: path ?? (typeof window !== "undefined" ? window.location.pathname : "/") })
}
