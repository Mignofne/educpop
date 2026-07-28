import type { ReactNode } from "react"
import { ArtDotsRow } from "./art/pictos"

/**
 * Cadre A4 imprimable — chrome educpop / standard Tullet.
 * @see docs/visual-standard-worksheets.md
 */
export function WorksheetFrame({
  title,
  instructions,
  children,
  footerNote,
  accent = "sun",
}: {
  title: string
  instructions: string
  children: ReactNode
  footerNote?: string
  accent?: "sun" | "berry" | "sky" | "leaf" | "tangerine"
}) {
  const accentBg = {
    sun: "bg-sun",
    berry: "bg-berry",
    sky: "bg-sky",
    leaf: "bg-leaf",
    tangerine: "bg-tangerine",
  }[accent]

  return (
    <div className="print-page relative mx-auto w-full max-w-[794px] overflow-hidden rounded-[1.75rem] border-[3px] border-ink bg-white p-8 text-ink shadow-[5px_5px_0_0_var(--ink)] sm:p-10">
      <span
        className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border-[3px] border-ink ${accentBg} opacity-90 print:opacity-70`}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -bottom-4 -left-4 h-16 w-16 rounded-full border-[3px] border-ink bg-sky/80 print:opacity-70"
        aria-hidden="true"
      />

      <header className="relative mb-6 flex items-start justify-between gap-4 border-b-[3px] border-dashed border-ink/35 pb-4">
        <div className="min-w-0">
          <ArtDotsRow className="mb-2" />
          <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-ink/70">{instructions}</p>
        </div>
        <span className="relative z-10 shrink-0 rounded-full border-[3px] border-ink bg-sun px-3 py-1 font-display text-xs font-bold shadow-[2px_2px_0_0_var(--ink)]">
          educpop
        </span>
      </header>

      <div className="relative">{children}</div>

      <footer className="relative mt-8 flex flex-wrap items-center justify-between gap-2 border-t-[3px] border-dashed border-ink/35 pt-3 text-xs font-semibold text-ink/60">
        <span>Prénom&nbsp;: ______________________</span>
        <span>Date&nbsp;: ____________</span>
        <span>{footerNote ?? "Bon apprentissage !"}</span>
      </footer>
    </div>
  )
}
