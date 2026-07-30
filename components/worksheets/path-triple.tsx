import type { ComponentType, SVGProps } from "react"
import { letterBubbles } from "@/lib/worksheets/letter-bubbles"
import type { AgeGroup } from "@/lib/activities"

type OutlinePicto = ComponentType<SVGProps<SVGSVGElement> & { mode?: "color" | "outline"; className?: string }>

const PATHS = {
  easy: "M40 100 C120 40, 200 160, 280 90 S 400 50, 480 100",
  medium: "M40 110 C100 30, 180 170, 260 60 S 340 150, 420 50 S 500 130, 560 100",
  hard: "M40 120 C80 20, 140 180, 200 50 S 280 160, 340 40 S 400 170, 460 60 S 520 150, 560 100",
} as const

export function PathTriple({
  From,
  To,
  bubbleWord,
  age = "4-5",
}: {
  From: OutlinePicto
  To: OutlinePicto
  bubbleWord?: string
  age?: AgeGroup
}) {
  const hard = age === "6-7" || age === "8-10"
  const withBubbles = bubbleWord && age !== "2-3"
  const target = bubbleWord?.toUpperCase() ?? ""
  const bubbles = withBubbles ? letterBubbles(target, { shuffle: true, max: hard ? 14 : 12 }) : []

  const levels: { key: keyof typeof PATHS; label: string; dash: string; width: number }[] = [
    { key: "easy", label: "Facile", dash: "14 12", width: 5 },
    { key: "medium", label: "Moyen", dash: "10 10", width: 4 },
    { key: "hard", label: "Défi", dash: "8 8", width: hard ? 3.5 : 4 },
  ]

  return (
    <div className="flex flex-col gap-5">
      {levels.map(({ key, label, dash, width }) => (
        <div key={key}>
          <p className="mb-2 font-display text-xs font-bold uppercase tracking-wide text-ink/55">{label}</p>
          <div className="relative h-36 w-full overflow-hidden rounded-2xl border-[3px] border-ink bg-[#fffdf7] sm:h-40">
            <svg viewBox="0 0 600 200" className="absolute inset-0 h-full w-full text-ink" aria-hidden="true">
              <path
                d={PATHS[key]}
                fill="none"
                stroke="currentColor"
                strokeWidth={width}
                strokeDasharray={dash}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink bg-sun shadow-[2px_2px_0_0_var(--ink)] sm:h-16 sm:w-16">
                <From mode="color" className="h-10 w-10 sm:h-11 sm:w-11" />
              </div>
            </div>
            <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink bg-sky shadow-[2px_2px_0_0_var(--ink)] sm:h-16 sm:w-16">
                <To mode="color" className="h-10 w-10 sm:h-11 sm:w-11" />
              </div>
            </div>
          </div>
        </div>
      ))}

      {withBubbles ? (
        <div>
          <p className="mb-3 font-display text-sm font-bold">
            Colorie les bulles du mot&nbsp;: <span className="tracking-widest">{target.split("").join("-")}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {bubbles.map((l, i) => (
              <span
                key={`${l}-${i}`}
                className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-ink bg-white font-display text-lg font-bold shadow-[2px_2px_0_0_var(--ink)]"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <p className="text-center text-xs font-semibold text-ink/50">
        Trace du plus facile au plus difficile. Puis colorie les bonnes bulles.
      </p>
    </div>
  )
}
