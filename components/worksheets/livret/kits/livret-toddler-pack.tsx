import type { LivretThemeDef } from "@/lib/livret/livret-theme-defs"
import { PhotoBox } from "@/components/worksheets/nomenclature-cards"
import { LivretActivityFrame } from "../livret-activity-frame"
import { LivretNomenclatureToddler } from "../livret-nomenclature-grid"

const ACCENTS = ["sun", "leaf", "sky", "tangerine", "berry"] as const

export function PackLivretToddler({ config }: { config: LivretThemeDef }) {
  const { themeLabel, toddlerMeta: activities, toddlerCards: cards } = config
  const activityCount = 6

  const meta = activities.map((m, i) =>
    i === 3 ? { ...m, title: `${config.soundWord} !` } : m,
  )

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <LivretActivityFrame meta={meta[0]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[0]}>
        <LivretNomenclatureToddler cards={cards} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={meta[1]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[1]}>
        <ToddlerColoringScene pictos={config.coloringPictos} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={meta[2]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[2]}>
        <ColorMatchActivity rows={config.colorMatchRows} swatches={config.colorPairs} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={meta[3]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[3]}>
        <SoundImitationActivity items={config.soundItems} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={meta[4]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[4]}>
        <TwoColorSortActivity config={config} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={meta[5]} themeLabel={themeLabel} activityCount={activityCount} accent={ACCENTS[0]}>
        <SameDifferentActivity pairs={config.sameDifferentPairs} />
      </LivretActivityFrame>
    </div>
  )
}

function ToddlerColoringScene({ pictos }: { pictos: LivretThemeDef["coloringPictos"] }) {
  const [A, B] = pictos
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4 sm:p-6">
      <div className="flex w-full max-w-lg flex-wrap items-end justify-center gap-6">
        {A ? <A mode="outline" className="h-44 w-40 sm:h-52 sm:w-48" /> : null}
        {B ? <B mode="outline" className="h-32 w-36 sm:h-40 sm:w-44" /> : null}
      </div>
      <p className="text-center text-xs font-semibold text-ink/50">Colorie comme tu veux — gros gestes !</p>
    </div>
  )
}

function ColorMatchActivity({
  rows,
  swatches,
}: {
  rows: LivretThemeDef["colorMatchRows"]
  swatches: LivretThemeDef["colorPairs"]
}) {
  return (
    <div className="space-y-4">
      {rows.map(({ label, Picto, colors }) => (
        <div
          key={label}
          className="flex flex-col gap-3 rounded-2xl border-[3px] border-ink bg-white p-4 sm:flex-row sm:items-center sm:gap-6"
        >
          <div className="flex items-center gap-4">
            <Picto mode="outline" className="h-20 w-20 shrink-0" />
            <span className="font-display text-lg font-bold capitalize">{label}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {colors.map((colorName) => {
              const swatch = swatches.find((c) => c.name === colorName)
              if (!swatch) return null
              return (
                <div key={colorName} className="flex flex-col items-center gap-1">
                  <span
                    className={`h-14 w-14 rounded-full border-[3px] border-ink ${swatch.className}`}
                    aria-hidden="true"
                  />
                  <span className="font-display text-sm font-bold">{colorName}</span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
      <p className="text-center text-xs font-semibold text-ink/50">Montre la couleur. Puis colorie l&apos;image.</p>
    </div>
  )
}

function SoundImitationActivity({ items }: { items: LivretThemeDef["soundItems"] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map(({ word, src, alt, sound }) => (
        <div key={word} className="rounded-2xl border-[3px] border-dashed border-ink bg-[#fffdf7] p-3">
          <PhotoBox src={src} alt={alt} className="w-full" />
          <p className="mt-2 text-center font-display text-sm font-bold text-ink/50">{word}</p>
          <div className="mt-3 flex min-h-[4.5rem] flex-col items-center justify-center rounded-xl border-[3px] border-ink bg-white p-2">
            <p className="font-display text-xs font-bold uppercase tracking-wide text-ink/45">Imite</p>
            <p className="mt-1 font-display text-2xl font-bold">{sound}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TwoColorSortActivity({ config }: { config: LivretThemeDef }) {
  const { zones, items } = config.twoColorSort
  const Hero = config.coloringPictos[0]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {zones.map(({ zone, className }) => (
          <div
            key={zone}
            className={`flex min-h-[8rem] flex-col items-center rounded-2xl border-[3px] border-ink p-3 ${className}`}
          >
            <span className="font-display text-lg font-bold">{zone}</span>
            {Hero ? <Hero mode="outline" className="mt-2 h-16 w-16 opacity-40" /> : null}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map((label) => (
          <div
            key={label}
            className="flex min-h-[4rem] items-center justify-center rounded-xl border-[3px] border-dashed border-ink bg-white p-2 text-center font-display text-xs font-bold leading-snug"
          >
            {label}
          </div>
        ))}
      </div>
      <p className="text-center text-xs font-semibold text-ink/50">
        Dis la couleur à voix haute. Entoure ou colle dans la bonne case.
      </p>
    </div>
  )
}

function SameDifferentActivity({ pairs }: { pairs: LivretThemeDef["sameDifferentPairs"] }) {
  return (
    <div className="space-y-4">
      {pairs.map(({ left: Left, right: Right }, i) => (
        <div key={i} className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            <Left mode="outline" className="h-20 w-20 sm:h-24 sm:w-24" />
            <span className="font-display text-2xl font-bold text-ink/30">?</span>
            <Right mode="outline" className="h-20 w-20 sm:h-24 sm:w-24" />
          </div>
          <div className="mt-4 flex justify-center gap-3">
            {["PAREIL", "PAS PAREIL"].map((opt) => (
              <span
                key={opt}
                className="rounded-full border-[3px] border-ink bg-white px-4 py-2 font-display text-xs font-bold shadow-[2px_2px_0_0_var(--ink)] sm:text-sm"
              >
                {opt}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
