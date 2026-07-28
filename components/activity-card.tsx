import Link from "next/link"
import { type Activity, AGE_LABELS, THEME_LABELS } from "@/lib/activities"
import { cn } from "@/lib/utils"

const COLOR_BG = {
  berry: "bg-berry",
  sun: "bg-sun",
  sky: "bg-sky",
  leaf: "bg-leaf",
  tangerine: "bg-tangerine",
} as const

const COLOR_TEXT = {
  berry: "text-primary-foreground",
  sun: "text-ink",
  sky: "text-ink",
  leaf: "text-ink",
  tangerine: "text-ink",
} as const

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Link
      href={`/activites/${activity.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border-4 border-ink bg-card shadow-[5px_5px_0_0_var(--ink)] transition-transform hover:-translate-y-1 hover:shadow-[7px_7px_0_0_var(--ink)]"
    >
      <div className={cn("relative flex h-36 items-center justify-center overflow-hidden", COLOR_BG[activity.color])}>
        <span className={cn("px-4 text-center font-display text-xl font-bold leading-tight", COLOR_TEXT[activity.color])}>
          {activity.subtitle}
        </span>
        {activity.emojiFree && (
          <span className="absolute right-3 top-3 rounded-full border-2 border-ink bg-background px-2 py-0.5 text-xs font-bold text-foreground">
            Gratuit
          </span>
        )}
        <span className="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-background/20" />
        <span className="pointer-events-none absolute -right-4 -top-6 h-16 w-16 rounded-full bg-background/20" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold leading-tight text-foreground text-balance">
          {activity.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{activity.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {activity.ages.map((age) => (
            <span
              key={age}
              className="rounded-full border-2 border-ink bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground"
            >
              {AGE_LABELS[age]}
            </span>
          ))}
          {activity.themes.slice(0, 1).map((theme) => (
            <span
              key={theme}
              className="rounded-full border-2 border-ink px-2 py-0.5 text-xs font-semibold text-foreground"
            >
              {THEME_LABELS[theme]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
