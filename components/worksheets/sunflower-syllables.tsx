import type { AgeGroup } from "@/lib/activities"
import { WorksheetFrame } from "./worksheet-frame"
import { PhotoBox } from "./nomenclature-cards"

type Item = {
  parts: string[]
  /** indices des trous */
  missing: number[]
  src: string
  alt: string
}

const EASY: Item[] = [
  {
    parts: ["TOUR", "NE", "SOL"],
    missing: [1],
    src: "/nomenclature/tournesol/tournesol.jpg",
    alt: "Photo d'un tournesol",
  },
  {
    parts: ["GRAI", "NE"],
    missing: [0],
    src: "/nomenclature/tournesol/graine.jpg",
    alt: "Photo de graines de tournesol",
  },
  {
    parts: ["A", "BEILLE"],
    missing: [0],
    src: "/nomenclature/tournesol/abeille.jpg",
    alt: "Photo d'une abeille",
  },
  {
    parts: ["SO", "LEIL"],
    missing: [1],
    src: "/nomenclature/tournesol/soleil.jpg",
    alt: "Photo du soleil",
  },
  {
    parts: ["FEU", "ILLE"],
    missing: [0],
    src: "/nomenclature/tournesol/feuille.jpg",
    alt: "Photo d'une feuille de tournesol",
  },
  {
    parts: ["TI", "GE"],
    missing: [1],
    src: "/nomenclature/tournesol/tige.jpg",
    alt: "Photo de tiges de tournesol",
  },
]

/** 6–7 : mots plus longs, souvent 2 trous, banque avec leurres */
const MEDIUM: Item[] = [
  {
    parts: ["TOUR", "NE", "SOL"],
    missing: [0, 2],
    src: "/nomenclature/tournesol/tournesol.jpg",
    alt: "Photo d'un tournesol",
  },
  {
    parts: ["A", "BEI", "LLE"],
    missing: [1],
    src: "/nomenclature/tournesol/abeille.jpg",
    alt: "Photo d'une abeille",
  },
  {
    parts: ["SO", "LEIL"],
    missing: [0],
    src: "/nomenclature/tournesol/soleil.jpg",
    alt: "Photo du soleil",
  },
  {
    parts: ["FEU", "ILLE"],
    missing: [1],
    src: "/nomenclature/tournesol/feuille.jpg",
    alt: "Photo d'une feuille de tournesol",
  },
  {
    parts: ["GRAI", "NE"],
    missing: [1],
    src: "/nomenclature/tournesol/graine.jpg",
    alt: "Photo de graines de tournesol",
  },
  {
    parts: ["TI", "GE"],
    missing: [0],
    src: "/nomenclature/tournesol/tige.jpg",
    alt: "Photo de tiges de tournesol",
  },
]

/** 8–10 : presque tout à retrouver + écrire le mot */
const HARD: Item[] = [
  {
    parts: ["TOUR", "NE", "SOL"],
    missing: [0, 1, 2],
    src: "/nomenclature/tournesol/tournesol.jpg",
    alt: "Photo d'un tournesol",
  },
  {
    parts: ["A", "BEI", "LLE"],
    missing: [0, 2],
    src: "/nomenclature/tournesol/abeille.jpg",
    alt: "Photo d'une abeille",
  },
  {
    parts: ["SO", "LEIL"],
    missing: [0, 1],
    src: "/nomenclature/tournesol/soleil.jpg",
    alt: "Photo du soleil",
  },
  {
    parts: ["FEU", "ILLE"],
    missing: [0],
    src: "/nomenclature/tournesol/feuille.jpg",
    alt: "Photo d'une feuille de tournesol",
  },
  {
    parts: ["GRAI", "NE"],
    missing: [0],
    src: "/nomenclature/tournesol/graine.jpg",
    alt: "Photo de graines de tournesol",
  },
  {
    parts: ["TI", "GE"],
    missing: [1],
    src: "/nomenclature/tournesol/tige.jpg",
    alt: "Photo de tiges de tournesol",
  },
]

function bankFor(items: Item[], distractors: string[] = []) {
  const needed = items.flatMap((w) => w.missing.map((i) => w.parts[i]))
  return [...needed, ...distractors]
}

export function SunflowerSyllables({ age = "4-5" }: { age?: AgeGroup }) {
  if (age === "2-3") return null

  const config =
    age === "4-5"
      ? {
          items: EASY,
          bank: bankFor(EASY),
          title: "Syllabes du jardin",
          instructions:
            "Retrouve la syllabe manquante en majuscules. Écris-la dans le trou, puis lis le mot à voix haute.",
        }
      : age === "6-7"
        ? {
            items: MEDIUM,
            bank: bankFor(MEDIUM, ["RA", "OU", "MI", "ON"]),
            title: "Défi syllabes — 2 trous",
            instructions:
              "Attention : certains mots ont DEUX trous ! Choisis dans la banque (il y a des leurres). Relis sans l'image.",
          }
        : {
            items: HARD,
            bank: bankFor(HARD, ["RA", "OU", "CHA", "ON", "VER"]),
            title: "Défi syllabes avancées",
            instructions:
              "Complète tous les trous, puis écris le mot entier en majuscules sous chaque case.",
          }

  const { items, bank, title, instructions } = config

  return (
    <WorksheetFrame
      title={title}
      instructions={instructions}
      footerNote={`Syllabes · ${age} ans`}
      accent="berry"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((w, i) => (
          <div key={i} className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-3">
            <div className="flex items-center gap-3">
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
            {age !== "4-5" ? (
              <div className="mt-3 h-8 border-b-[3px] border-ink/40" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border-[3px] border-dashed border-ink p-4">
        <p className="font-display text-sm font-bold">
          {age === "4-5" ? "Banque de syllabes :" : "Banque (avec leurres) :"}
        </p>
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
