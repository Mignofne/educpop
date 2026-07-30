import { WorksheetFrame } from "./worksheet-frame"

type Cell = { num?: number } | null

export type ThemeCrosswordWord = {
  word: string
  row: number
  col: number
  dir: "H" | "V"
  num: number
}

export type ThemeCrosswordClue = { n: number; text: string }

export type ThemeCrosswordProps = {
  title: string
  instructions?: string
  footerNote: string
  accent: "sun" | "berry" | "sky" | "leaf" | "tangerine"
  rows: number
  cols: number
  words: readonly ThemeCrosswordWord[]
  across: readonly ThemeCrosswordClue[]
  down: readonly ThemeCrosswordClue[]
}

function buildGrid(rows: number, cols: number, words: readonly ThemeCrosswordWord[]): Cell[][] {
  const g: Cell[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  for (const w of words) {
    ;[...w.word].forEach((_, i) => {
      const rr = w.dir === "H" ? w.row : w.row + i
      const cc = w.dir === "H" ? w.col + i : w.col
      if (!g[rr][cc]) g[rr][cc] = {}
      if (i === 0) g[rr][cc] = { num: w.num }
    })
  }
  return g
}

export function ThemeCrossword({
  title,
  instructions = "Lis les définitions. Écris les mots en MAJUSCULES dans la grille.",
  footerNote,
  accent,
  rows,
  cols,
  words,
  across,
  down,
}: ThemeCrosswordProps) {
  const grid = buildGrid(rows, cols, words)

  return (
    <WorksheetFrame title={title} instructions={instructions} footerNote={footerNote} accent={accent}>
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="mx-auto shrink-0">
          <table className="border-collapse">
            <tbody>
              {grid.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) =>
                    cell ? (
                      <td
                        key={ci}
                        className="relative h-8 w-8 border-2 border-ink bg-white p-0 text-center sm:h-9 sm:w-9"
                      >
                        {cell.num ? (
                          <span className="absolute left-0.5 top-0 text-[8px] font-bold leading-none">{cell.num}</span>
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
        <div className="flex-1 space-y-4 text-sm">
          {across.length > 0 ? (
            <div>
              <p className="font-display font-bold">Horizontal</p>
              <ul className="mt-1 space-y-1">
                {across.map((c) => (
                  <li key={c.n}>
                    <span className="font-bold">{c.n}.</span> {c.text}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {down.length > 0 ? (
            <div>
              <p className="font-display font-bold">Vertical</p>
              <ul className="mt-1 space-y-1">
                {down.map((c) => (
                  <li key={c.n}>
                    <span className="font-bold">{c.n}.</span> {c.text}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </WorksheetFrame>
  )
}
