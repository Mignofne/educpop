import { WorksheetFrame } from "./worksheet-frame"

/**
 * Mots croisés tournesol — 8–10 ans (MAJUSCULES).
 * Intersections vérifiées :
 *   TOURNESOL H @ (2,0)
 *   GRAINE    V @ (1,3) croise R
 *   SOLEIL    V @ (2,6) croise S
 *   TIGE      H @ (4,2) croise I de GRAINE
 *   ABEILLE   H @ (7,2) croise L de SOLEIL
 *   PETALE    H @ (0,4)
 */

type Cell = { num?: number } | null

function buildGrid(): Cell[][] {
  const rows = 9
  const cols = 10
  const g: Cell[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  const place = (word: string, r: number, c: number, dir: "H" | "V", num: number) => {
    ;[...word].forEach((_, i) => {
      const rr = dir === "H" ? r : r + i
      const cc = dir === "H" ? c + i : c
      if (!g[rr][cc]) g[rr][cc] = {}
      if (i === 0) g[rr][cc] = { num }
    })
  }
  place("PETALE", 0, 4, "H", 1)
  place("TOURNESOL", 2, 0, "H", 2)
  place("GRAINE", 1, 3, "V", 3)
  place("SOLEIL", 2, 6, "V", 4)
  place("TIGE", 4, 2, "H", 5)
  place("ABEILLE", 7, 2, "H", 6)
  return g
}

const GRID = buildGrid()

const CLUES_ACROSS = [
  { n: 1, text: "Partie jaune autour du cœur (sans le S final)." },
  { n: 2, text: "Grande fleur d'été qui suit le soleil." },
  { n: 5, text: "Partie longue et forte qui porte la tête." },
  { n: 6, text: "Insecte qui butine le tournesol." },
]

const CLUES_DOWN = [
  { n: 3, text: "On la plante dans la terre." },
  { n: 4, text: "Astre jaune dans le ciel." },
]

export function SunflowerCrossword() {
  return (
    <WorksheetFrame
      title="Mots croisés du jardin"
      instructions="Lis les définitions. Écris les mots en MAJUSCULES dans la grille. Les numéros marquent le début de chaque mot."
      footerNote="Mots croisés · 8–10 ans"
      accent="berry"
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="mx-auto shrink-0">
          <table className="border-collapse">
            <tbody>
              {GRID.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) =>
                    cell ? (
                      <td
                        key={ci}
                        className="relative h-8 w-8 border-2 border-ink bg-white p-0 text-center sm:h-9 sm:w-9"
                      >
                        {cell.num ? (
                          <span className="absolute left-0.5 top-0 text-[8px] font-bold leading-none">
                            {cell.num}
                          </span>
                        ) : null}
                      </td>
                    ) : (
                      <td key={ci} className="h-8 w-8 sm:h-9 sm:w-9" />
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="min-w-0 flex-1 space-y-4 text-sm">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-berry">
              Horizontalement
            </p>
            <ul className="mt-2 space-y-1.5">
              {CLUES_ACROSS.map((c) => (
                <li key={c.n} className="leading-snug">
                  <span className="font-bold">{c.n}.</span> {c.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-sky">
              Verticalement
            </p>
            <ul className="mt-2 space-y-1.5">
              {CLUES_DOWN.map((c) => (
                <li key={c.n} className="leading-snug">
                  <span className="font-bold">{c.n}.</span> {c.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WorksheetFrame>
  )
}
