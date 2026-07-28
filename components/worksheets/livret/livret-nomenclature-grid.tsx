import type { NomenclaturePhoto } from "@/components/worksheets/nomenclature-cards"
import { PhotoBox } from "@/components/worksheets/nomenclature-cards"

/** Nomenclature livret tout-petits — 4 à 6 grandes photos, vocabulaire oral */
export function LivretNomenclatureToddler({ cards }: { cards: readonly NomenclaturePhoto[] }) {
  if (cards.length < 4 || cards.length > 6) {
    throw new Error(`LivretNomenclatureToddler: attendu 4–6 photos, reçu ${cards.length}`)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {cards.map(({ word, src, alt }) => (
          <div key={word} className="rounded-2xl border-[3px] border-dashed border-ink p-2.5">
            <PhotoBox src={src} alt={alt} className="w-full" />
            <p className="mt-2.5 text-center font-display text-lg font-bold text-ink/40 sm:text-xl">{word}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-xs font-semibold text-ink/50">
        Mot en gris = aide pour l&apos;adulte · Photos libres · Wikimedia Commons
      </p>
    </div>
  )
}

/** Nomenclature livret — 8 photos, format compact une page */
export function LivretNomenclatureGrid({ cards }: { cards: readonly NomenclaturePhoto[] }) {
  if (cards.length !== 8) {
    throw new Error(`LivretNomenclatureGrid: attendu 8 photos, reçu ${cards.length}`)
  }

  const words = [...cards].reverse()

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-3">
        {cards.map(({ word, src, alt }) => (
          <div key={word} className="rounded-xl border-[3px] border-dashed border-ink p-2">
            <PhotoBox src={src} alt={alt} className="w-full" />
          </div>
        ))}
      </div>
      <div>
        <p className="mb-2 font-display text-sm font-bold text-ink/60">Mots à découper :</p>
        <div className="flex flex-wrap gap-2.5">
          {words.map(({ word }) => (
            <span
              key={`w-${word}`}
              className="rounded-xl border-[3px] border-dashed border-ink bg-white px-4 py-2.5 font-display text-base font-bold shadow-[2px_2px_0_0_var(--ink)]"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
      <p className="text-center text-xs font-semibold text-ink/50">Photos libres · Wikimedia Commons</p>
    </div>
  )
}
