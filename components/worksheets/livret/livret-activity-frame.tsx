import type { ReactNode } from "react"
import type { LivretActivityMeta } from "@/lib/livret/types"
import { WorksheetFrame } from "../worksheet-frame"

const FACT_LABEL = { fact: "Fait établi", hypothesis: "Hypothèse", uncertain: "Zone d'incertitude" } as const

/** Une page = une activité + encart pédagogique court en bas */
export function LivretActivityFrame({
  meta,
  themeLabel = "Livret",
  activityCount = 8,
  accent = "sun",
  children,
}: {
  meta: LivretActivityMeta
  themeLabel?: string
  activityCount?: number
  accent?: "sun" | "berry" | "sky" | "leaf" | "tangerine"
  children: ReactNode
}) {
  return (
    <WorksheetFrame
      title={`${meta.index}. ${meta.title}`}
      instructions={meta.childInstruction}
      footerNote={`${themeLabel} · ${meta.index}/${activityCount}`}
      accent={accent}
    >
      {children}

      {meta.scientificNote || meta.learns ? (
        <aside className="mt-5 rounded-2xl border-[3px] border-dashed border-ink/35 bg-[#fffdf7] p-4 text-sm leading-relaxed">
          {meta.scientificNote ? (
            <p className="text-xs font-bold uppercase tracking-wide text-ink/45">
              Le savais-tu ? · {FACT_LABEL[meta.scientificNote.kind]}
            </p>
          ) : (
            <p className="font-display font-bold text-ink">Le savais-tu ?</p>
          )}
          <p className="mt-1">{meta.scientificNote?.text ?? meta.learns}</p>
          {meta.parentQuestions[0] ? (
            <p className="mt-2 font-semibold text-ink/75">
              À discuter&nbsp;: <span className="font-normal">{meta.parentQuestions[0]}</span>
            </p>
          ) : null}
        </aside>
      ) : null}
    </WorksheetFrame>
  )
}
