import type { LivretCrosswordWord, LivretLifecycleStep, LivretThemeDef } from "@/lib/livret/livret-theme-defs"
import { PathTriple } from "@/components/worksheets/path-triple"
import { PhotoBox } from "@/components/worksheets/nomenclature-cards"
import { LivretColorByNumber } from "../livret-color-by-number"
import { LivretActivityFrame } from "../livret-activity-frame"
import { LivretNomenclatureGrid } from "../livret-nomenclature-grid"

const ACCENTS = ["leaf", "sky", "tangerine", "berry", "sun", "leaf", "sky", "berry"] as const

function shuffled<T>(items: readonly T[], order: readonly number[]): T[] {
  return order.map((i) => items[i])
}

export function PackLivret67({ config }: { config: LivretThemeDef }) {
  const { themeLabel, meta67: activities, cards8: cards, pathConfig } = config
  const activityCount = 8

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <LivretActivityFrame meta={activities[0]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[0]}>
        <LivretColorByNumber pictos={config.coloringPictos} colorLegend={config.colorLegend} colorZones={config.colorZones} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[1]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[1]}>
        <LivretNomenclatureGrid cards={cards} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[2]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[2]}>
        <SchemaActivity config={config} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[3]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[3]}>
        <ClassificationActivity items={config.classification} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[4]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[4]}>
        <LifecycleOrder steps={config.lifecycle} shuffle={config.lifecycleShuffle} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[5]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[5]}>
        {pathConfig ? (
          <PathTriple From={pathConfig.From} To={pathConfig.To} bubbleWord={pathConfig.bubbleWord} age="6-7" />
        ) : null}
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[6]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[6]}>
        <TrueFalseActivity items={config.trueFalse} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[7]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[7]}>
        <CrosswordActivity crossword={config.crossword} />
      </LivretActivityFrame>
    </div>
  )
}

function SchemaActivity({ config }: { config: LivretThemeDef }) {
  const { schemaHeroPhoto, schemaParts } = config

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="flex justify-center rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
        <PhotoBox src={schemaHeroPhoto.src} alt={schemaHeroPhoto.alt} className="w-full max-w-xs" />
      </div>
      <div className="space-y-4">
        {schemaParts.map(({ num, word, hint }) => (
          <div key={word} className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-white font-display text-sm font-bold">
                {num}
              </span>
              <span className="shrink-0 rounded-full border-[3px] border-ink bg-leaf px-4 py-1.5 font-display text-sm font-bold uppercase">
                {word}
              </span>
              <span className="text-xs font-semibold text-ink/55">{hint}</span>
            </div>
            <div className="h-14 rounded-xl border-[3px] border-dashed border-ink bg-white" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ClassificationActivity({ items }: { items: readonly string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((label) => (
        <div
          key={label}
          className="flex items-center justify-between rounded-xl border-[3px] border-ink bg-[#fffdf7] p-3"
        >
          <span className="font-display text-base font-bold capitalize">{label}</span>
          <div className="flex gap-2 text-xs font-bold">
            <span className="rounded-lg border-[3px] border-ink px-3 py-1">VIVANT</span>
            <span className="rounded-lg border-[3px] border-ink px-3 py-1">NON</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function LifecycleOrder({
  steps,
  shuffle,
}: {
  steps: readonly LivretLifecycleStep[]
  shuffle: readonly number[]
}) {
  const cards = shuffled([...steps], shuffle)
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cards.map((step, i) => (
        <div
          key={`${step.label}-${i}`}
          className="flex items-center gap-4 rounded-2xl border-[3px] border-dashed border-ink bg-[#fffdf7] p-4"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-white font-display text-xl font-bold">
            ?
          </span>
          {step.Picto ? <step.Picto mode="outline" className="h-14 w-14 shrink-0" /> : null}
          {step.photo ? <PhotoBox src={step.photo.src} alt={step.photo.alt} className="h-14 w-14 shrink-0" /> : null}
          <span className="font-display text-sm font-bold leading-snug">{step.label}</span>
        </div>
      ))}
    </div>
  )
}

function TrueFalseActivity({ items }: { items: LivretThemeDef["trueFalse"] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ text }) => (
        <div key={text} className="rounded-xl border-[3px] border-ink bg-[#fffdf7] p-4">
          <p className="font-display text-sm font-bold">{text}</p>
          <div className="mt-3 flex gap-3">
            {["VRAI", "FAUX"].map((o) => (
              <span
                key={o}
                className="rounded-full border-[3px] border-ink bg-white px-4 py-1.5 font-display text-sm font-bold shadow-[2px_2px_0_0_var(--ink)]"
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function CrosswordActivity({ crossword }: { crossword: LivretThemeDef["crossword"] }) {
  type Cell = { num?: number } | null
  const { rows, cols, words, clueH, clueV } = crossword
  const g: Cell[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))

  const place = (w: LivretCrosswordWord) => {
    ;[...w.word].forEach((_, i) => {
      const rr = w.dir === "H" ? w.row : w.row + i
      const cc = w.dir === "H" ? w.col + i : w.col
      if (!g[rr][cc]) g[rr][cc] = {}
      if (i === 0) g[rr][cc] = { num: w.num }
    })
  }
  words.forEach(place)

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <table className="mx-auto border-collapse">
        <tbody>
          {g.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) =>
                cell ? (
                  <td
                    key={ci}
                    className="relative h-10 w-10 border-[3px] border-ink bg-white sm:h-11 sm:w-11"
                  >
                    {cell.num ? (
                      <span className="absolute left-0.5 top-0.5 text-[9px] font-bold">{cell.num}</span>
                    ) : null}
                  </td>
                ) : (
                  <td key={ci} className="h-10 w-10 sm:h-11 sm:w-11" />
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex-1 space-y-3 text-sm">
        {clueH.length > 0 ? (
          <div>
            <p className="font-display font-bold">Horizontal</p>
            {clueH.map((c) => (
              <p key={c} className="mt-1">
                {c}
              </p>
            ))}
          </div>
        ) : null}
        {clueV.length > 0 ? (
          <div>
            <p className="font-display font-bold">Vertical</p>
            {clueV.map((c) => (
              <p key={c} className="mt-1">
                {c}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
