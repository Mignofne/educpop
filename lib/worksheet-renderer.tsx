import { ActivityWorksheet } from "@/components/worksheets/activity-worksheet"
import { getActivity } from "@/lib/activities"

/** Rendu worksheet par slug catalogue — packs uniquement. */
export function WorksheetRenderer({ slug }: { slug: string; type?: "pack" }) {
  const activity = getActivity(slug)
  if (!activity) return null
  return <ActivityWorksheet activity={activity} />
}
