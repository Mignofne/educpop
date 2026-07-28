import { letterBubbles } from "@/lib/worksheets/letter-bubbles"
import { WorksheetFrame } from "./worksheet-frame"
import { PictoBamboo, PictoPanda } from "./art/pictos"

type PathDef = {
  label: string
  hint: string
  d: string
  strokeWidth: number
  dash: string
}

const WORD = "PANDA"

const PATHS: PathDef[] = [
  {
    label: "Chemin 1 — doux",
    hint: "Gros trait, grandes vagues",
    d: "M70 100 C 160 40, 260 160, 360 100 S 500 50, 540 100",
    strokeWidth: 5,
    dash: "14 12",
  },
  {
    label: "Chemin 2 — zigzag",
    hint: "Monte et descends avec soin",
    d: "M70 100 C 120 30, 170 170, 230 60 S 320 160, 380 50 S 470 150, 540 100",
    strokeWidth: 4,
    dash: "10 10",
  },
  {
    label: "Chemin 3 — secret",
    hint: "Petits pointillés, parcours plus long",
    d: "M70 110 C 110 20, 150 180, 200 70 S 260 40, 300 140 S 360 20, 420 120 S 480 60, 540 100",
    strokeWidth: 3.25,
    dash: "7 8",
  },
]

/**
 * Plusieurs tracés panda (facile → difficile) + lettres PANDA.
 * hard (6+) : bulles mêlées stables, leurres indistincts.
 */
export function PandaPath({ hard = false }: { hard?: boolean } = {}) {
  const letters = WORD.split("")
  const bubbles = letterBubbles(WORD, { shuffle: hard, max: 12 })

  return (
    <WorksheetFrame
      title="Aide le panda à rejoindre le bambou"
      instructions={
        hard
          ? "Trace chaque chemin. Puis colorie SEULEMENT les bulles du mot PANDA (il y a des pièges)."
          : "Trace chaque chemin en suivant les pointillés (du plus facile au plus difficile). Puis colorie les bulles du mot PANDA."
      }
      footerNote="Tracés · pandas"
      accent="sky"
    >
      <div className="flex flex-col gap-6">
        {PATHS.map((path) => (
          <div key={path.label}>
            <p className="mb-1 font-display text-sm font-bold">{path.label}</p>
            <p className="mb-2 text-xs font-medium text-ink/50">{path.hint}</p>
            <div className="relative h-40 w-full overflow-hidden rounded-2xl border-[3px] border-ink bg-[#fffdf7] sm:h-44">
              <svg viewBox="0 0 600 200" className="h-full w-full text-ink" aria-hidden="true">
                <path
                  d={path.d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={path.strokeWidth}
                  strokeDasharray={path.dash}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-ink bg-white shadow-[2px_2px_0_0_var(--ink)]">
                  <PictoPanda mode="color" className="h-12 w-12" />
                </div>
              </div>
              <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-ink bg-leaf shadow-[2px_2px_0_0_var(--ink)]">
                  <PictoBamboo mode="color" className="h-12 w-12" />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div>
          <p className="mb-3 font-display text-sm font-bold">
            Colorie les bulles du mot&nbsp;: <span className="tracking-widest">{letters.join("-")}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {bubbles.map((l, i) => {
              const hit = WORD.includes(l)
              return (
                <span
                  key={`${l}-${i}`}
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-[3px] font-display text-xl font-bold shadow-[2px_2px_0_0_var(--ink)] ${
                    hard || hit
                      ? "border-ink bg-white"
                      : "border-ink/30 bg-transparent text-ink/35 shadow-none"
                  }`}
                >
                  {l}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </WorksheetFrame>
  )
}
