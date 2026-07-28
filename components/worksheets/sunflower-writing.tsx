import type { ComponentType } from "react"
import type { AgeGroup } from "@/lib/activities"
import { WorksheetFrame } from "./worksheet-frame"
import {
  PictoBee,
  PictoLeaf,
  PictoSeed,
  PictoStem,
  PictoSun,
  PictoSunflower,
  type PictoProps,
} from "./art/pictos"

type Word = { label: string; Picto: ComponentType<PictoProps> }

const SHORT: Word[] = [
  { label: "soleil", Picto: PictoSun },
  { label: "graine", Picto: PictoSeed },
  { label: "abeille", Picto: PictoBee },
]

const MEDIUM: Word[] = [
  { label: "tournesol", Picto: PictoSunflower },
  { label: "soleil", Picto: PictoSun },
  { label: "abeille", Picto: PictoBee },
  { label: "feuille", Picto: PictoLeaf },
  { label: "tige", Picto: PictoStem },
]

const HARD: Word[] = [
  { label: "tournesol", Picto: PictoSunflower },
  { label: "graine", Picto: PictoSeed },
  { label: "abeille", Picto: PictoBee },
  { label: "feuille", Picto: PictoLeaf },
  { label: "tige", Picto: PictoStem },
  { label: "soleil", Picto: PictoSun },
]

export function SunflowerWriting({ age = "4-5" }: { age?: AgeGroup }) {
  if (age === "2-3") return null

  const config =
    age === "4-5"
      ? {
          words: SHORT,
          title: "J'écris les mots du jardin",
          instructions:
            "Regarde l'image. Recopie chaque mot en majuscules d'imprimerie, puis essaie la cursive sur la ligne du bas.",
          phrase: false,
        }
      : age === "6-7"
        ? {
            words: MEDIUM,
            title: "J'écris — 5 mots du jardin",
            instructions:
              "5 mots ! Majuscules puis cursive. Relis à voix haute après chaque mot.",
            phrase: false,
          }
        : {
            words: HARD,
            title: "Écriture soignée + phrases",
            instructions:
              "Majuscules, cursive, puis une phrase courte sous chaque mot.",
            phrase: true,
          }

  const { words, title, instructions, phrase } = config

  return (
    <WorksheetFrame
      title={title}
      instructions={instructions}
      footerNote={`Écriture · ${age} ans`}
      accent="sky"
    >
      <div className="flex flex-col gap-5">
        {words.map(({ label, Picto }) => (
          <div key={label} className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-ink bg-white">
                <Picto mode="color" className="h-12 w-12" />
              </div>
              <span className="font-display text-xl font-bold uppercase tracking-wide">{label}</span>
            </div>
            <div className="space-y-3">
              <WritingLine label="MAJUSCULES" sample={label.toUpperCase()} variant="print" />
              <WritingLine label="CURSIVE" sample={label.toLowerCase()} variant="cursive" />
              {phrase ? (
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-ink/45">
                    Ma phrase
                  </p>
                  <div className="h-9 border-b-[3px] border-ink" />
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </WorksheetFrame>
  )
}

function WritingLine({
  label,
  sample,
  variant,
}: {
  label: string
  sample: string
  variant: "print" | "cursive"
}) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-ink/45">{label}</p>
      <div
        className={
          variant === "cursive"
            ? "relative border-b-[3px] border-ink/20 pb-1 font-cursive text-2xl leading-none text-ink/25"
            : "relative border-b-[3px] border-ink/20 pb-1 font-display text-base tracking-[0.18em] text-ink/20"
        }
      >
        {sample}
      </div>
      <div className="mt-2 h-9 border-b-[3px] border-ink" />
    </div>
  )
}
