import { WorksheetFrame } from "./worksheet-frame"
import { PhotoBox } from "./nomenclature-cards"
import {
  SYLLABLES_LIBRARY,
  missingSyllables,
} from "@/lib/worksheets/syllable-puzzles"

/** Banque dérivée des trous — jamais hardcodée à part */
const BANK = missingSyllables(SYLLABLES_LIBRARY)

export function SyllablesSheet() {
  return (
    <WorksheetFrame
      title="Complète les mots — syllabes"
      instructions="Retrouve la syllabe manquante en majuscules. Écris-la dans le trou, puis lis le mot à voix haute."
      footerNote="Lecture & syllabes"
      accent="berry"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {SYLLABLES_LIBRARY.map((w) => (
          <div
            key={w.word}
            className="flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4"
          >
            <PhotoBox src={w.src} alt={w.alt} className="h-14 w-14 shrink-0" />
            <div className="flex flex-wrap items-center gap-1 font-display text-lg font-bold uppercase tracking-wide">
              {w.parts.map((part, j) =>
                w.missing.includes(j) ? (
                  <span
                    key={j}
                    className="inline-flex h-9 min-w-16 items-center justify-center rounded-lg border-[3px] border-dashed border-ink bg-white px-2 normal-case"
                  >
                    ?
                  </span>
                ) : (
                  <span key={j}>{part}</span>
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border-[3px] border-dashed border-ink p-4">
        <p className="font-display text-sm font-bold">Syllabes à utiliser :</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {BANK.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="rounded-full border-[3px] border-ink bg-sun px-3 py-1 font-display text-sm font-bold uppercase tracking-wide shadow-[2px_2px_0_0_var(--ink)]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </WorksheetFrame>
  )
}
