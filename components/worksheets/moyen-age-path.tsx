import { letterBubbles } from "@/lib/worksheets/letter-bubbles"
import { WorksheetFrame } from "./worksheet-frame"
import { PictoCastle, PictoKnight } from "./art/pictos-moyen-age"

const WORD = "CHATEAU"

/** Chemin chevalier → château */
export function MoyenAgePath({ hard = false }: { hard?: boolean }) {
  const letters = WORD.split("")
  const bubbles = letterBubbles(WORD, { shuffle: hard, max: 12 })

  return (
    <WorksheetFrame
      title="Aide le chevalier à rejoindre le château"
      instructions={
        hard
          ? "Trace le chemin zigzag. Colorie ensuite les bulles du mot CHATEAU."
          : "Trace le chemin en pointillés. Colorie les bulles du mot CHATEAU."
      }
      footerNote="Tracés · Moyen Âge"
      accent="berry"
    >
      <div className="flex flex-col gap-6">
        <div className={`relative w-full overflow-hidden rounded-2xl border-[3px] border-ink bg-[#fffdf7] ${hard ? "h-64" : "h-52"}`}>
          <svg viewBox="0 0 600 200" className="absolute inset-0 h-full w-full text-ink" aria-hidden="true">
            <path
              d={
                hard
                  ? "M80 110 C 140 30, 200 170, 270 60 S 360 160, 430 50 S 500 150, 540 100"
                  : "M80 100 C 180 40, 280 160, 380 90 S 500 40, 540 100"
              }
              fill="none"
              stroke="currentColor"
              strokeWidth={hard ? 3.5 : 5}
              strokeDasharray={hard ? "8 8" : "14 12"}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-ink bg-sun shadow-[3px_3px_0_0_var(--ink)]">
              <PictoKnight mode="color" className="h-14 w-14" />
            </div>
          </div>
          <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-ink bg-sky shadow-[3px_3px_0_0_var(--ink)]">
              <PictoCastle mode="color" className="h-14 w-14" />
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 font-display text-sm font-bold">
            Colorie les bulles&nbsp;: <span className="tracking-widest">{letters.join("-")}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {bubbles.map((l, i) => {
              const hit = WORD.includes(l)
              return (
                <span
                  key={`${l}-${i}`}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-[3px] font-display text-lg font-bold ${
                    hard || hit
                      ? "border-ink bg-white shadow-[2px_2px_0_0_var(--ink)]"
                      : "border-ink/30 bg-transparent text-ink/35"
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
