export const ANALYTICS_EVENT_TYPES = [
  "page_view",
  "filter_use",
  "age_select",
  "download",
  "signup",
  "purchase",
] as const

export type AnalyticsEventType = (typeof ANALYTICS_EVENT_TYPES)[number]

export type AnalyticsEventPayload = {
  eventType: AnalyticsEventType
  sessionId: string
  path?: string
  properties?: Record<string, string | number | boolean | null>
}
