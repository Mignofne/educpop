import type { AgeGroup } from "@/lib/activities"
import { PathTriple } from "@/components/worksheets/path-triple"
import { WorksheetFrame } from "./worksheet-frame"
import { PictoBee, PictoSunflower } from "./art/pictos"

const WORD = "ABEILLE"

export function BeePath({ age = "4-5" }: { age?: AgeGroup }) {
  if (age === "4-5" || age === "6-7") {
    return (
      <WorksheetFrame
        title={age === "4-5" ? "Aide l'abeille à rejoindre le tournesol" : "Le chemin secret de l'abeille"}
        instructions={
          age === "4-5"
            ? "Trace les 3 chemins du plus facile au défi. Puis colorie les bulles du mot ABEILLE."
            : "Trace les 3 chemins. Colorie SEULEMENT les lettres du mot ABEILLE. Écris le mot en bas."
        }
        footerNote={`Tracés · ${age} ans`}
        accent="sun"
      >
        <PathTriple From={PictoBee} To={PictoSunflower} bubbleWord={WORD} age={age} />
        {age === "6-7" ? (
          <div className="mt-4 space-y-3">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-ink/45">J&apos;écris ABEILLE (majuscules)</p>
              <div className="h-10 border-b-[3px] border-ink" />
            </div>
          </div>
        ) : null}
      </WorksheetFrame>
    )
  }

  return (
    <WorksheetFrame
      title="Aide l'abeille à rejoindre le tournesol"
      instructions="Trace le chemin en pointillés avec le doigt, puis avec un gros crayon. Bravo l'abeille !"
      footerNote={`Tracés · ${age} ans`}
      accent="sun"
    >
      <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl border-[3px] border-ink bg-[#fffdf7]">
        <svg viewBox="0 0 600 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d="M90 110 C 180 35, 260 165, 350 95 S 470 45, 510 105"
            fill="none"
            stroke="currentColor"
            strokeWidth={6}
            strokeDasharray="16 12"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-ink bg-sun shadow-[3px_3px_0_0_var(--ink)]">
            <PictoBee mode="color" className="h-16 w-16" />
          </div>
        </div>
        <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-ink bg-leaf shadow-[3px_3px_0_0_var(--ink)]">
            <PictoSunflower mode="color" className="h-16 w-16" />
          </div>
        </div>
      </div>
    </WorksheetFrame>
  )
}
