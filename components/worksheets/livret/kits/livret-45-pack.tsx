import type { LivretThemeDef } from "@/lib/livret/livret-theme-defs"
import { PathTriple } from "@/components/worksheets/path-triple"
import { PhotoBox } from "@/components/worksheets/nomenclature-cards"
import { LivretColorByNumber } from "../livret-color-by-number"
import { LivretActivityFrame } from "../livret-activity-frame"
import { LivretNomenclatureGrid } from "../livret-nomenclature-grid"

const ACCENTS = ["sky", "sun", "leaf", "tangerine", "berry", "leaf", "sky"] as const

function shuffled<T>(items: readonly T[], order: readonly number[]): T[] {
  return order.map((i) => items[i])
}

export function PackLivret45({ config }: { config: LivretThemeDef }) {
  const { themeLabel, meta45: activities, cards8: cards, pathConfig } = config
  const activityCount = 7

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <LivretActivityFrame meta={activities[0]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[0]}>
        <LivretNomenclatureGrid cards={cards} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[1]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[1]}>
        <LivretColorByNumber pictos={config.coloringPictos} colorLegend={config.colorLegend} colorZones={config.colorZones} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[2]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[2]}>
        <MatchPairsActivity pairs={config.matchPairs45} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[3]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[3]}>
        <Sequence45 steps={config.sequence45} shuffle={config.sequence45Shuffle} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[4]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[4]}>
        <SeekAndFind items={config.seekItems45} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[5]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[5]}>
        <LivingSort config={config} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[6]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[6]}>
        {pathConfig ? (
          <PathTriple From={pathConfig.From} To={pathConfig.To} bubbleWord={pathConfig.bubbleWord} age="4-5" />
        ) : null}
      </LivretActivityFrame>
    </div>
  )
}

function MatchPairsActivity({ pairs }: { pairs: LivretThemeDef["matchPairs45"] }) {
  const labels = [...pairs].map((p) => p.label).reverse()

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="space-y-3">
        {pairs.map(({ photo, label }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border-[3px] border-ink bg-white p-2">
            <PhotoBox src={photo.src} alt={photo.alt} className="h-16 w-16 shrink-0" />
            <span className="font-display text-xs font-bold text-ink/40">photo</span>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {labels.map((label) => (
          <div
            key={label}
            className="flex min-h-[4.5rem] items-center rounded-xl border-[3px] border-dashed border-ink bg-[#fffdf7] px-4 font-display text-sm font-bold"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

function Sequence45({
  steps,
  shuffle,
}: {
  steps: LivretThemeDef["sequence45"]
  shuffle: readonly number[]
}) {
  const cards = shuffled([...steps], shuffle)
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cards.map(({ label, Picto }) => (
        <div
          key={label}
          className="flex items-center gap-4 rounded-2xl border-[3px] border-dashed border-ink bg-[#fffdf7] p-4"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-white font-display text-xl font-bold">
            ?
          </span>
          <Picto mode="outline" className="h-14 w-14 shrink-0" />
          <span className="font-display text-sm font-bold">{label}</span>
        </div>
      ))}
    </div>
  )
}

function SeekAndFind({ items }: { items: LivretThemeDef["seekItems45"] }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map(({ word, src, alt }) => (
          <div key={word} className="rounded-xl border-[3px] border-ink p-2">
            <PhotoBox src={src} alt={alt} className="w-full" />
          </div>
        ))}
      </div>
      <ul className="space-y-2 font-display text-sm font-bold">
        {items.map(({ word }) => (
          <li key={word} className="flex items-center gap-2">
            <span className="h-5 w-5 rounded border-[2.5px] border-ink" />
            Entoure : {word}
          </li>
        ))}
      </ul>
    </div>
  )
}

function LivingSort({ config }: { config: LivretThemeDef }) {
  const items =
    config.id === "tournesols"
      ? ["tournesol", "abeille", "rocher", "graine", "soleil"]
      : ["cerisier", "cerise", "rocher", "panier", "oiseau"]

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
