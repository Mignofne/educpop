import type { AgeGroup } from "@/lib/activities"
import { letterBubbles } from "@/lib/worksheets/letter-bubbles"
import { WorksheetFrame } from "./worksheet-frame"
import { PictoBee, PictoSunflower } from "./art/pictos"

const WORD = "ABEILLE"

export function BeePath({ age = "4-5" }: { age?: AgeGroup }) {
  const letters = WORD.split("")
  const hardPath = age === "6-7" || age === "8-10"
  const withLetters = age !== "2-3"
  /** 4–5 : ordre utile + leurres estompés ; 6+ : mélange stable */
  const bubbles = letterBubbles(WORD, {
    shuffle: hardPath,
    max: hardPath ? 14 : 12,
  })

  return (
    <WorksheetFrame
      title={
        age === "2-3"
          ? "Aide l'abeille à rejoindre le tournesol"
          : age === "4-5"
            ? "Aide l'abeille à rejoindre le tournesol"
            : "Le chemin secret de l'abeille"
      }
      instructions={
        age === "2-3"
          ? "Trace le chemin en pointillés avec le doigt, puis avec un gros crayon. Bravo l'abeille !"
          : age === "4-5"
            ? "Trace le chemin en pointillés. Puis colorie les bulles qui forment le mot ABEILLE."
            : age === "6-7"
              ? "Trace le chemin zigzag. Colorie SEULEMENT les lettres du mot ABEILLE (il y a des pièges). Écris le mot en bas."
              : "Trace. Entoure les lettres ABEILLE dans l'ordre, barres les autres, écris le mot deux fois (majuscules + cursive)."
      }
      footerNote={`Tracés · ${age} ans`}
      accent="sun"
    >
      <div className="flex flex-col gap-8">
        <div
          className={`relative flex w-full items-center justify-center overflow-hidden rounded-2xl border-[3px] border-ink bg-[#fffdf7] ${
            age === "2-3" ? "h-72" : hardPath ? "h-64" : "h-56"
          }`}
        >
          <svg viewBox="0 0 600 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path
              d={
                hardPath
                  ? "M80 120 C 140 20, 200 180, 260 70 S 340 160, 400 50 S 480 170, 530 100"
                  : "M90 110 C 180 35, 260 165, 350 95 S 470 45, 510 105"
              }
              fill="none"
              stroke="currentColor"
              strokeWidth={age === "2-3" ? 6 : hardPath ? 3.5 : 4}
              strokeDasharray={age === "2-3" ? "16 12" : hardPath ? "8 8" : "12 10"}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
            <div
              className={`flex items-center justify-center rounded-full border-[3px] border-ink bg-sun shadow-[3px_3px_0_0_var(--ink)] ${
                age === "2-3" ? "h-24 w-24" : "h-20 w-20"
              }`}
            >
              <PictoBee mode="color" className={age === "2-3" ? "h-16 w-16" : "h-14 w-14"} />
            </div>
          </div>
          <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
            <div
              className={`flex items-center justify-center rounded-full border-[3px] border-ink bg-leaf shadow-[3px_3px_0_0_var(--ink)] ${
                age === "2-3" ? "h-24 w-24" : "h-20 w-20"
              }`}
            >
              <PictoSunflower mode="color" className={age === "2-3" ? "h-16 w-16" : "h-14 w-14"} />
            </div>
          </div>
        </div>

        {withLetters ? (
          <div>
            <p className="mb-3 font-display text-sm font-bold">
              {age === "4-5" ? (
                <>
                  Colorie les bulles du mot&nbsp;:{" "}
                  <span className="tracking-widest">{letters.join("-")}</span>
                </>
              ) : (
                <>
                  Lettres mêlées — retrouve{" "}
                  <span className="tracking-widest">{letters.join("-")}</span>
                </>
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {bubbles.map((l, i) => {
                const hit = WORD.includes(l)
                return (
                  <span
                    key={`${l}-${i}`}
                    className={`flex h-14 w-14 items-center justify-center rounded-full border-[3px] font-display text-xl font-bold shadow-[2px_2px_0_0_var(--ink)] ${
                      !hardPath && !hit
                        ? "border-ink/30 bg-transparent text-ink/35 shadow-none"
                        : "border-ink bg-white"
                    }`}
                  >
                    {l}
                  </span>
                )
              })}
            </div>
            {hardPath ? (
              <div className="mt-5 space-y-3">
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-ink/45">
                    J&apos;écris ABEILLE (majuscules)
                  </p>
                  <div className="h-10 border-b-[3px] border-ink" />
                </div>
                {age === "8-10" ? (
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-ink/45">
                      Et en cursive
                    </p>
                    <div className="h-10 border-b-[3px] border-ink" />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </WorksheetFrame>
  )
}
