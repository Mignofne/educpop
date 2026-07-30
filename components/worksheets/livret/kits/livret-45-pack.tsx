import type { LivretThemeDef } from "@/lib/livret/livret-theme-defs"
import { PhotoBox } from "@/components/worksheets/nomenclature-cards"
import { LivretActivityFrame } from "../livret-activity-frame"
import { LivretNomenclatureGrid } from "../livret-nomenclature-grid"

const ACCENTS = ["sky", "sun", "leaf", "tangerine", "berry", "leaf", "sky"] as const

function shuffled<T>(items: readonly T[], order: readonly number[]): T[] {
  return order.map((i) => items[i])
}

export function PackLivret45({ config }: { config: LivretThemeDef }) {
  const { themeLabel, meta45: activities, cards8: cards } = config
  const activityCount = 7

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <LivretActivityFrame meta={activities[0]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[0]}>
        <LivretNomenclatureGrid cards={cards} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={activities[1]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[1]}>
        <ColorByNumber45 config={config} />
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
        <SimpleMaze Hero={config.coloringPictos[0]} />
      </LivretActivityFrame>
    </div>
  )
}

function ColorByNumber45({ config }: { config: LivretThemeDef }) {
  const [A, B] = config.coloringPictos

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border-[3px] border-ink bg-white px-3 py-2">
        <p className="font-display text-[10px] font-bold uppercase tracking-wide text-ink/55">Légende des couleurs</p>
        <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
          {config.colorLegend.map(({ num, name }) => (
            <li key={num} className="flex items-center gap-1.5 font-display text-xs font-bold">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink bg-[#fffdf7] text-[10px]">
                {num}
              </span>
              <span>= {name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-6">
        {A ? (
          <div className="relative">
            <A mode="outline" className="h-36 w-32" />
            <span className="absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-ink bg-white text-xs font-bold">1</span>
          </div>
        ) : null}
        {B ? (
          <div className="relative">
            <B mode="outline" className="h-28 w-28" />
            <span className="absolute left-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-ink bg-white text-xs font-bold">2</span>
          </div>
        ) : null}
      </div>
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

function SimpleMaze({ Hero }: { Hero?: LivretThemeDef["coloringPictos"][number] }) {
  return (
    <div className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
      <svg viewBox="0 0 320 200" className="mx-auto h-auto w-full max-w-md text-ink" aria-label="Labyrinthe simple">
        <rect x="8" y="8" width="304" height="184" fill="white" stroke="currentColor" strokeWidth="3" rx="8" />
        <path d="M24 24 H120 V56 H200 V88 H88 V120 H232 V152 H56 V176" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="8" fill="white" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="56" cy="176" r="8" fill="white" stroke="currentColor" strokeWidth="2.5" />
      </svg>
      {Hero ? (
        <div className="mt-3 flex justify-center">
          <Hero mode="outline" className="h-12 w-12" />
        </div>
      ) : null}
      <p className="mt-2 text-center text-xs font-semibold text-ink/50">Trace le chemin du départ à la sortie.</p>
    </div>
  )
}
