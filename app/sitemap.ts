import type { MetadataRoute } from "next"
import { activities } from "@/lib/activities"

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://educpop.fr"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/bibliotheque`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/generer`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/abonnement`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ]

  const activityPages: MetadataRoute.Sitemap = activities.map((a) => ({
    url: `${BASE}/activites/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...activityPages]
}
