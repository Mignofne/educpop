import type { ComponentType } from "react"
import { PathTriple } from "@/components/worksheets/path-triple"
import { WorksheetFrame } from "./worksheet-frame"
import { PhotoBox } from "./nomenclature-cards"
import type { PictoProps } from "./art/pictos-animes"

export type VocabItem = { word: string; Picto: ComponentType<PictoProps> }
/** Mot à trous — photo réelle (même standard que nomenclature) */
export type SyllableItem = {
  word: string
  parts: string[]
  missing: number[]
  src: string
  alt: string
}
export type OrderStep = { n: number; label: string }

/** Coloriage grand picto */
export function AnimeColoring({
  title,
  instructions,
  footerNote,
  accent,
  Hero,
}: {
  title: string
  instructions: string
  footerNote: string
  accent: "sun" | "berry" | "sky" | "leaf" | "tangerine"
  Hero: ComponentType<PictoProps>
}) {
  return (
    <WorksheetFrame title={title} instructions={instructions} footerNote={footerNote} accent={accent}>
      <div className="mx-auto flex min-h-[22rem] w-full max-w-xl items-center justify-center rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4 sm:min-h-[26rem] sm:p-6">
        <Hero mode="outline" className="h-[20rem] w-[20rem] sm:h-[24rem] sm:w-[24rem]" />
      </div>
    </WorksheetFrame>
  )
}

/** Nomenclature image + mot (4–5 collé) */
export function AnimeVocab({
  title,
  instructions,
  footerNote,
  accent,
  items,
  oral = false,
}: {
  title: string
  instructions: string
  footerNote: string
  accent: "sun" | "berry" | "sky" | "leaf" | "tangerine"
  items: VocabItem[]
  oral?: boolean
}) {
  return (
    <WorksheetFrame title={title} instructions={instructions} footerNote={footerNote} accent={accent}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map(({ word, Picto }) => (
          <div key={word} className="rounded-2xl border-[3px] border-dashed border-ink p-2">
            <div className="flex h-28 items-center justify-center rounded-xl border-[3px] border-ink bg-[#fffdf7]">
              <Picto mode="color" className="h-20 w-20" />
            </div>
            <div className="mt-2 flex h-10 items-center justify-center rounded-xl border-[3px] border-ink bg-white font-display text-sm font-bold">
              {oral ? <span className="text-ink/35">{word}</span> : word}
            </div>
          </div>
        ))}
      </div>
    </WorksheetFrame>
  )
}

/** Chemin A → B (3 niveaux) + bulles lettres mélangées */
export function AnimePath({
  title,
  instructions,
  footerNote,
  accent,
  From,
  To,
  bubbleWord,
  hard = false,
}: {
  title: string
  instructions: string
  footerNote: string
  accent: "sun" | "berry" | "sky" | "leaf" | "tangerine"
  From: ComponentType<PictoProps>
  To: ComponentType<PictoProps>
  bubbleWord: string
  hard?: boolean
}) {
  const age = hard ? "6-7" : "4-5"

  return (
    <WorksheetFrame title={title} instructions={instructions} footerNote={footerNote} accent={accent}>
      <PathTriple From={From} To={To} bubbleWord={bubbleWord} age={age} />
    </WorksheetFrame>
  )
}

/** Écriture majuscules + cursive */
export function AnimeWriting({
  title,
  instructions,
  footerNote,
  accent,
  words,
  phrase = false,
}: {
  title: string
  instructions: string
  footerNote: string
  accent: "sun" | "berry" | "sky" | "leaf" | "tangerine"
  words: VocabItem[]
  phrase?: boolean
}) {
  return (
    <WorksheetFrame title={title} instructions={instructions} footerNote={footerNote} accent={accent}>
      <div className="flex flex-col gap-5">
        {words.map(({ word, Picto }) => (
          <div key={word} className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink bg-white">
                <Picto mode="color" className="h-10 w-10" />
              </div>
              <span className="font-display text-xl font-bold uppercase tracking-wide">{word}</span>
            </div>
            <WriteLine label="MAJUSCULES" sample={word.toUpperCase()} cursive={false} />
            <WriteLine label="CURSIVE" sample={word.toLowerCase()} cursive />
            {phrase ? (
              <div className="mt-3">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-ink/45">Ma phrase</p>
                <div className="h-9 border-b-[3px] border-ink" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </WorksheetFrame>
  )
}

function WriteLine({ label, sample, cursive }: { label: string; sample: string; cursive: boolean }) {
  return (
    <div className="mt-2">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-ink/45">{label}</p>
      <div className="relative h-10 border-b-[3px] border-ink">
        <span
          className={`pointer-events-none absolute inset-x-0 top-1 text-center text-lg text-ink/25 ${
            cursive ? "font-serif italic" : "font-display font-bold tracking-wide"
          }`}
        >
          {sample}
        </span>
      </div>
    </div>
  )
}

/** Syllabes — banque dérivée des trous · photos (pas de pictos) */
export function AnimeSyllables({
  title,
  footerNote,
  accent,
  items,
}: {
  title: string
  footerNote: string
  accent: "sun" | "berry" | "sky" | "leaf" | "tangerine"
  items: SyllableItem[]
}) {
  const bank = items.flatMap((it) => it.missing.map((i) => it.parts[i]))
  return (
    <WorksheetFrame
      title={title}
      instructions="Retrouve la syllabe manquante en MAJUSCULES. Écris-la dans le trou, puis lis le mot."
      footerNote={footerNote}
      accent={accent}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((w) => (
          <div key={w.word} className="flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-3">
            <PhotoBox src={w.src} alt={w.alt} className="h-14 w-14 shrink-0" />
            <div className="flex flex-wrap items-center gap-1 font-display text-lg font-bold uppercase tracking-wide">
              {w.parts.map((part, j) =>
                w.missing.includes(j) ? (
                  <span
                    key={j}
                    className="inline-flex h-10 min-w-14 items-center justify-center rounded-xl border-[3px] border-dashed border-ink bg-white px-2"
                  >
                    ?
                  </span>
                ) : (
                  <span key={j}>{part}</span>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border-[3px] border-dashed border-ink p-4">
        <p className="font-display text-sm font-bold">Syllabes à utiliser :</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {bank.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="rounded-full border-[3px] border-ink bg-sun px-3 py-1 font-display text-sm font-bold uppercase tracking-wide shadow-[2px_2px_0_0_var(--ink)]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </WorksheetFrame>
  )
}

/** Remettre en ordre */
export function AnimeOrder({
  title,
  instructions,
  footerNote,
  accent,
  steps,
}: {
  title: string
  instructions: string
  footerNote: string
  accent: "sun" | "berry" | "sky" | "leaf" | "tangerine"
  steps: OrderStep[]
}) {
  const shuffled = [...steps].reverse()
  return (
    <WorksheetFrame title={title} instructions={instructions} footerNote={footerNote} accent={accent}>
      <div className="grid gap-3 sm:grid-cols-2">
        {shuffled.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-2xl border-[3px] border-dashed border-ink bg-[#fffdf7] p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-white font-display text-lg font-bold">
              ?
            </span>
            <span className="font-display text-base font-bold">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-ink/55">
        Écris les numéros 1 → {steps.length} dans les bulles, puis raconte l’ordre ensemble.
      </p>
    </WorksheetFrame>
  )
}

/** Vrai / faux */
export function AnimeTrueFalse({
  title,
  footerNote,
  accent,
  statements,
}: {
  title: string
  footerNote: string
  accent: "sun" | "berry" | "sky" | "leaf" | "tangerine"
  statements: { text: string; truth: boolean }[]
}) {
  return (
    <WorksheetFrame
      title={title}
      instructions="Entoure VRAI ou FAUX. Parlez-en ensuite ensemble !"
      footerNote={footerNote}
      accent={accent}
    >
      <div className="flex flex-col gap-4">
        {statements.map((s) => (
          <div key={s.text} className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
            <p className="font-display text-base font-bold">{s.text}</p>
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
    </WorksheetFrame>
  )
}

/** Associer paires (2 colonnes) */
export function AnimeMatch({
  title,
  instructions,
  footerNote,
  accent,
  left,
  right,
}: {
  title: string
  instructions: string
  footerNote: string
  accent: "sun" | "berry" | "sky" | "leaf" | "tangerine"
  left: VocabItem[]
  right: string[]
}) {
  return (
    <WorksheetFrame title={title} instructions={instructions} footerNote={footerNote} accent={accent}>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          {left.map(({ word, Picto }) => (
            <div key={word} className="flex items-center gap-2 rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-2">
              <Picto mode="color" className="h-12 w-12 shrink-0" />
              <span className="font-display text-sm font-bold">{word}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {right.map((label) => (
            <div
              key={label}
              className="flex h-[4.25rem] items-center justify-center rounded-2xl border-[3px] border-dashed border-ink bg-white px-3 font-display text-sm font-bold"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </WorksheetFrame>
  )
}
