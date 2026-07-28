import type { LivretActivityMeta } from "@/lib/livret/types"
import { WorksheetFrame } from "../worksheet-frame"

const FACT_LABEL = { fact: "Fait établi", hypothesis: "Hypothèse", uncertain: "Zone d'incertitude" } as const

/** Page parents — 1 par activité, imprimable (guide co-schooling) */
export function LivretActivityParentPage({ meta }: { meta: LivretActivityMeta }) {
  return (
    <WorksheetFrame
      title={`Guide parents — activité ${meta.index}`}
      instructions={`${meta.title} · ${meta.pedagogicalType}`}
      footerNote={`Livret · parents · activité ${meta.index}`}
      accent="leaf"
    >
      <div className="space-y-4 text-sm leading-relaxed text-ink/85">
        <Section label="Type pédagogique" value={meta.pedagogicalType} />
        <Section label="Objectif" value={meta.objective} />
        <Section label="Compétences" value={meta.skills.join(" · ")} />
        <Section label="Matériel" value={meta.material.join(", ")} />
        <Section label="Consigne enfant" value={meta.childInstruction} />

        <div>
          <p className="font-display text-xs font-bold uppercase tracking-wide text-ink/50">Déroulement pas à pas</p>
          <ol className="mt-1 list-decimal space-y-1 pl-5">
            {meta.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>

        {meta.easyVariant ? <Section label="Variante facile" value={meta.easyVariant} /> : null}
        {meta.hardVariant ? <Section label="Variante difficile" value={meta.hardVariant} /> : null}

        <Section label="Ce que l'enfant apprend réellement" value={meta.learns} />

        {meta.scientificNote ? (
          <div className="rounded-xl border-[3px] border-ink bg-[#fffdf7] p-4">
            <p className="font-display font-bold text-ink">Le savais-tu ?</p>
            <p className="mt-1 text-xs font-bold uppercase text-ink/45">
              {FACT_LABEL[meta.scientificNote.kind]}
            </p>
            <p className="mt-2">{meta.scientificNote.text}</p>
          </div>
        ) : null}

        <div>
          <p className="font-display font-bold text-ink">Co-schooling — questions ouvertes</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            {meta.parentQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      </div>
    </WorksheetFrame>
  )
}

function Section({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-xs font-bold uppercase tracking-wide text-ink/50">{label}</p>
      <p className="mt-0.5">{value}</p>
    </div>
  )
}
