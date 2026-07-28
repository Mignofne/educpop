import { WorksheetFrame } from "./worksheet-frame"

/**
 * Mots croisés des saisons — 8–10 ans (MAJUSCULES).
 * Intersections vérifiées :
 *   SOLEIL  H @ (0,0)
 *   ETE     V @ (0,3) croise E
 *   HIVER   H @ (2,0) croise E final d'ETE
 *   AUTOMNE H @ (4,0)
 *   NEIGE   V @ (4,5) croise N d'AUTOMNE
 */

type Cell = { num?: number } | null

function buildGrid(): Cell[][] {
  const rows = 9
  const cols = 7
  const g: Cell[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  const place = (word: string, r: number, c: number, dir: "H" | "V", num: number) => {
    ;[...word].forEach((_, i) => {
      const rr = dir === "H" ? r : r + i
      const cc = dir === "H" ? c + i : c
      if (!g[rr][cc]) g[rr][cc] = {}
      if (i === 0) g[rr][cc] = { num }
    })
  }
  place("SOLEIL", 0, 0, "H", 1)
  place("ETE", 0, 3, "V", 2)
  place("HIVER", 2, 0, "H", 3)
  place("AUTOMNE", 4, 0, "H", 4)
  place("NEIGE", 4, 5, "V", 5)
  return g
}

const GRID = buildGrid()

const CLUES_ACROSS = [
  { n: 1, text: "Astre qui brille fort en été." },
  { n: 3, text: "Saison froide, parfois avec de la neige." },
  { n: 4, text: "Saison où les feuilles tombent souvent." },
]

const CLUES_DOWN = [
  { n: 2, text: "Saison chaude après le printemps (3 lettres)." },
  { n: 5, text: "Flocons blancs en hiver." },
]

export function SeasonsCrossword() {
  return (
    <WorksheetFrame
      title="Mots croisés des saisons"
      instructions="Lis les définitions. Écris les mots en MAJUSCULES dans la grille."
      footerNote="Mots croisés · Saisons · 8–10 ans"
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
            <p className="font-display text-sm font-bold uppercase tracking-wide text-berry">
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
