"use client"

import { useMemo, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ActivityCard } from "@/components/activity-card"
import {
  activities,
  AGE_LABELS,
  THEME_LABELS,
  SEASON_LABELS,
  type AgeGroup,
  type Theme,
  type Season,
} from "@/lib/activities"
import { cn } from "@/lib/utils"
import { trackEvent } from "@/lib/analytics/client"

type Filters = {
  age: AgeGroup | "all"
  theme: Theme | "all"
  season: Season | "all"
}

export function LibraryBrowser() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<Filters>({ age: "all", theme: "all", season: "all" })

  // Sync theme from URL (e.g. from home page theme grid)
  useEffect(() => {
    const t = searchParams.get("theme") as Theme | null
    if (t && t in THEME_LABELS) {
      setFilters((f) => ({ ...f, theme: t }))
    }
  }, [searchParams])

  const setFilter = (filterType: "age" | "theme" | "season", value: string) => {
    if (value !== "all") {
      trackEvent("filter_use", { filterType, value })
      if (filterType === "age") trackEvent("age_select", { age: value })
    }
    setFilters((f) => ({
      ...f,
      [filterType]: value as Filters[typeof filterType],
    }))
  }

  const results = useMemo(() => {
    return activities.filter((a) => {
      if (filters.age !== "all" && !a.ages.includes(filters.age)) return false
      if (filters.theme !== "all" && !a.themes.includes(filters.theme)) return false
      // Exact match only: "toute-annee" must not appear under Printemps/Été/etc.
      if (filters.season !== "all" && a.season !== filters.season) return false
      return true
    })
  }, [filters])

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-3xl border-4 border-ink bg-card p-5 shadow-[5px_5px_0_0_var(--ink)]">
        <FilterRow label="Âge">
          <Chip active={filters.age === "all"} onClick={() => setFilter("age", "all")}>
            Tous
          </Chip>
          {(Object.keys(AGE_LABELS) as AgeGroup[]).map((age) => (
            <Chip key={age} active={filters.age === age} onClick={() => setFilter("age", age)}>
              {AGE_LABELS[age]}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Thème">
          <Chip active={filters.theme === "all"} onClick={() => setFilter("theme", "all")}>
            Tous
          </Chip>
          {(Object.keys(THEME_LABELS) as Theme[]).map((theme) => (
            <Chip key={theme} active={filters.theme === theme} onClick={() => setFilter("theme", theme)}>
              {THEME_LABELS[theme]}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Saison">
          <Chip active={filters.season === "all"} onClick={() => setFilter("season", "all")}>
            Toutes
          </Chip>
          {(Object.keys(SEASON_LABELS) as Season[]).map((season) => (
            <Chip
              key={season}
              active={filters.season === season}
              onClick={() => setFilter("season", season)}
            >
              {SEASON_LABELS[season]}
            </Chip>
          ))}
        </FilterRow>
      </div>

      <p className="mt-6 font-semibold text-muted-foreground">
        {results.length} activité{results.length > 1 ? "s" : ""} trouvée{results.length > 1 ? "s" : ""}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((activity) => (
            <ActivityCard key={activity.slug} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-3xl border-4 border-dashed border-ink/40 p-12 text-center">
          <p className="font-display text-lg font-bold text-foreground">Aucune fiche pour cette combinaison</p>
          <p className="mt-1 text-muted-foreground">
            Essayez d&apos;élargir les filtres, ou générez une fiche sur-mesure avec l&apos;IA.
          </p>
        </div>
      )}
    </div>
  )
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="w-20 shrink-0 font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border-2 border-ink px-3 py-1 text-sm font-bold transition-colors",
        active ? "bg-berry text-primary-foreground" : "bg-background text-foreground hover:bg-accent",
      )}
    >
      {children}
    </button>
  )
}
