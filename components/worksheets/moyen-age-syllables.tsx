import { WorksheetFrame } from "./worksheet-frame"
import { PhotoBox } from "./nomenclature-cards"

type Item = {
  word: string
  parts: string[]
  missing: number[]
  src: string
  alt: string
}

const ITEMS: Item[] = [
  {
    word: "CHATEAU",
    parts: ["CHA", "TEAU"],
    missing: [0],
    src: "/nomenclature/moyen-age/chateau.jpg",
    alt: "Photo d'un château",
  },
  {
    word: "COURONNE",
    parts: ["COU", "RON", "NE"],
    missing: [1],
    src: "/nomenclature/moyen-age/couronne.jpg",
    alt: "Photo d'une couronne",
  },
  {
    word: "DRAGON",
    parts: ["DRA", "GON"],
    missing: [1],
    src: "/nomenclature/moyen-age/dragon.jpg",
    alt: "Photo d'une statue de dragon",
  },
  {
    word: "CHEVALIER",
    parts: ["CHE", "VA", "LIER"],
    missing: [1],
    src: "/nomenclature/moyen-age/chevalier.jpg",
    alt: "Photo d'une armure de chevalier",
  },
]

function bankFrom(items: Item[]) {
  return items.flatMap((it) => it.missing.map((i) => it.parts[i]))
}

/** Syllabes Moyen Âge — banque dérivée des trous · photos */
export function MoyenAgeSyllables() {
  const bank = bankFrom(ITEMS)

  return (
    <WorksheetFrame
      title="Syllabes du château"
      instructions="Retrouve la syllabe manquante en MAJUSCULES. Écris-la dans le trou, puis lis le mot."
      footerNote="Syllabes · Moyen Âge"
      accent="berry"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {ITEMS.map((w) => (
          <div key={w.word} className="flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-3">
            <PhotoBox src={w.src} alt={w.alt} className="h-14 w-14 shrink-0" />
            <div className="flex flex-wrap items-center gap-1 font-display text-lg font-bold uppercase tracking-wide">
              {w.parts.map((part, j) =>
                w.missing.includes(j) ? (
                  <span
                    key={j}
                    className="inline-flex h-10 min-w-14 items-center justify-center rounded-xl border-[3px] border-dashed border-ink bg-white px-2 normal-case"
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
          {bank.map((s, i) => (
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
