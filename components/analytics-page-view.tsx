"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackPageView } from "@/lib/analytics/client"

/** Tracks page views on route changes (first-party analytics). */
export function AnalyticsPageView() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith("/admin")) return
    trackPageView(pathname)
  }, [pathname])

  return null
}
