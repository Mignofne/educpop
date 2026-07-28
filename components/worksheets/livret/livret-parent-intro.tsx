import type { LivretParentIntro } from "@/lib/livret/types"
import { WorksheetFrame } from "../worksheet-frame"

export function LivretParentIntro({ theme, intro }: { theme: string; intro: LivretParentIntro }) {
  return (
    <WorksheetFrame
      title="Guide parents"
      instructions={`Avant de commencer « ${theme} » : lisez cette page à voix basse si vous voulez, puis avancez activité par activité.`}
      footerNote="Livret · guide parents"
      accent="leaf"
    >
      <div className="space-y-5 text-sm leading-relaxed">
        <section>
          <h3 className="font-display text-base font-bold">Objectifs pédagogiques</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {intro.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-display text-base font-bold">Votre rôle</h3>
          <p className="mt-2">{intro.parentRole}</p>
        </section>
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
            <p className="font-display font-bold">Durée indicative</p>
            <p className="mt-1">{intro.duration}</p>
          </div>
          <div className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
            <p className="font-display font-bold">Matériel</p>
            <ul className="mt-1 list-disc pl-4">
              {intro.material.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </section>
        <p className="rounded-xl border-2 border-dashed border-ink/35 bg-white p-3 text-xs text-ink/65">
          educpop distingue les <strong>faits établis</strong>, les <strong>hypothèses</strong> et les{" "}
          <strong>zones d&apos;incertitude</strong> dans chaque « Le savais-tu ? ». Pas de stéréotypes de
          genre simplistes — on observe, on questionne, on apprend ensemble.
        </p>
      </div>
    </WorksheetFrame>
  )
}
