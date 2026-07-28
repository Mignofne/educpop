import type { AgeGroup } from "@/lib/activities"
import { WorksheetFrame } from "./worksheet-frame"

export type NomenclaturePhoto = {
  word: string
  src: string
  alt: string
}

type Accent = "sun" | "berry" | "sky" | "leaf" | "tangerine"

/**
 * Cartes de nomenclature — **toujours photos libres de droit**
 * (Wikimedia Commons → `public/nomenclature/<set>/` + CREDITS.md)
 */
export function NomenclatureCards({
  title,
  footerNote,
  accent = "tangerine",
  cards,
  age = "4-5",
  tip,
}: {
  title: string
  footerNote: string
  accent?: Accent
  cards: readonly NomenclaturePhoto[]
  age?: AgeGroup
  tip?: string
}) {
  if (cards.length !== 12) {
    throw new Error(
      `NomenclatureCards « ${title} »: attendu exactement 12 photos, reçu ${cards.length}`,
    )
  }

  const oral = age === "1-2" || age === "2-3"
  const separate = age === "6-7" || age === "8-10"
  const writeLine = age === "8-10"

  const instructions = oral
    ? "Montre une photo : ton enfant dit le mot (ou tu le nommes). Pas besoin de lire."
    : separate
      ? writeLine
        ? "Découpe photos et mots. Associe. Sous chaque photo, écris le mot en majuscules."
        : "Découpe photos et mots. Mélange, puis associe chaque photo à son étiquette."
      : "Découpe les cartes en suivant les pointillés. Associe chaque photo à son mot."

  return (
    <WorksheetFrame title={title} instructions={instructions} footerNote={footerNote} accent={accent}>
      {separate ? (
        <div className="grid gap-6">
          <div>
            <p className="mb-2 font-display text-sm font-bold">Photos :</p>
            <div className="grid grid-cols-3 gap-4">
              {cards.map(({ word, src, alt }) => (
                <div key={`img-${word}`} className="rounded-2xl border-[3px] border-dashed border-ink p-2.5">
                  <PhotoBox src={src} alt={alt} className="w-full" />
                  {writeLine ? <div className="mt-2 h-9 border-b-[3px] border-ink/50" aria-hidden="true" /> : null}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-display text-sm font-bold">Mots à découper :</p>
            <div className="flex flex-wrap gap-2.5">
              {[...cards].reverse().map(({ word }) => (
                <span
                  key={`w-${word}`}
                  className="rounded-xl border-[3px] border-dashed border-ink bg-white px-4 py-2.5 font-display text-base font-bold shadow-[2px_2px_0_0_var(--ink)]"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          {cards.map(({ word, src, alt }) => (
            <div key={word} className="rounded-2xl border-[3px] border-dashed border-ink p-2.5">
              <PhotoBox src={src} alt={alt} className="w-full" />
              <div className="mt-2.5 flex min-h-12 items-center justify-center rounded-xl border-[3px] border-ink bg-white px-2 py-2 font-display text-base font-bold">
                {oral ? <span className="text-ink/35">{word}</span> : word}
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-center text-xs font-semibold text-ink/55">
        {tip ??
          (oral
            ? "Mot en gris = aide pour l'adulte · Photos libres (Wikimedia Commons)"
            : "Astuce : plastifie les cartes. Photos libres de droit (Wikimedia Commons).")}
      </p>
    </WorksheetFrame>
  )
}

/** Cadre photo standard (nomenclature + syllabes) — carré, photo entière visible */
export function PhotoBox({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-xl border-[3px] border-ink bg-[#fffdf7] ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-contain object-center p-1"
        loading="eager"
      />
    </div>
  )
}
