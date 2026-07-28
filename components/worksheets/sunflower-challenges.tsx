import { WorksheetFrame } from "./worksheet-frame"

/**
 * Mots fléchés simplifiés + vrai/faux observation — formats 8–10.
 * Lecture autonome, raisonnement, vocabulaire précis.
 */

const ARROWS = [
  { dir: "→", clue: "Plateau de petites fleurs au centre (mot savant)", answerLen: 8, hint: "C _ _ _ _ _ _ E" },
  { dir: "↓", clue: "Pétales jaunes du bord (mot savant)", answerLen: 7, hint: "L _ _ _ _ _ S" },
  { dir: "→", clue: "Fruit / graine du tournesol", answerLen: 6, hint: "A _ _ _ _ E" },
  { dir: "↓", clue: "Insecte qui transporte le pollen", answerLen: 7, hint: "A _ _ _ _ _ E" },
]

const TRUE_FALSE = [
  { q: "Le tournesol est une seule fleur.", a: false },
  { q: "Les ligules sont les pétales jaunes du bord.", a: true },
  { q: "Les racines servent surtout à faire joli.", a: false },
  { q: "Le jeune tournesol peut suivre le soleil.", a: true },
  { q: "Les graines mûrissent dans le capitule.", a: true },
]

export function SunflowerChallenges() {
  return (
    <WorksheetFrame
      title="Défis lecture & sciences"
      instructions="Deux défis : mots fléchés (écris en majuscules), puis vrai ou faux. Discute tes réponses avec un adulte !"
      footerNote="Défis · 8–10 ans"
      accent="sky"
    >
      <div className="flex flex-col gap-6">
        <section>
          <h3 className="font-display text-base font-bold">1. Mots fléchés</h3>
          <p className="mt-1 text-xs font-medium text-ink/55">
            Lis la définition, écris le mot sur la ligne (indices en pointillés).
          </p>
          <div className="mt-3 space-y-3">
            {ARROWS.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-3 sm:flex-row sm:items-center"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-sun font-display text-lg font-bold">
                  {item.dir}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-snug">{item.clue}</p>
                  <p className="mt-1 font-display text-xs tracking-widest text-ink/40">{item.hint}</p>
                  <div className="mt-2 h-8 border-b-[3px] border-ink" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-display text-base font-bold">2. Vrai ou faux ?</h3>
          <p className="mt-1 text-xs font-medium text-ink/55">
            Entoure V ou F. Si c&apos;est faux, corrige à voix haute.
          </p>
          <div className="mt-3 space-y-2">
            {TRUE_FALSE.map((item, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-3 rounded-xl border-[3px] border-ink bg-white px-3 py-2"
              >
                <p className="text-sm font-medium leading-snug">{item.q}</p>
                <div className="flex shrink-0 gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-ink font-display text-sm font-bold">
                    V
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-ink font-display text-sm font-bold">
                    F
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </WorksheetFrame>
  )
}
