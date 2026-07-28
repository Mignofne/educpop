import type { ComponentType } from "react"
import type { AgeGroup } from "@/lib/activities"
import { WorksheetFrame } from "./worksheet-frame"
import {
  PictoCastle,
  PictoCrown,
  PictoDragon,
  PictoKnight,
  PictoSword,
  type PictoProps,
} from "./art/pictos-moyen-age"

const SHORT = [
  { label: "roi", Picto: PictoCrown },
  { label: "épée", Picto: PictoSword },
  { label: "tour", Picto: PictoCastle },
]

const FULL = [
  { label: "château", Picto: PictoCastle },
  { label: "chevalier", Picto: PictoKnight },
  { label: "dragon", Picto: PictoDragon },
  { label: "couronne", Picto: PictoCrown },
]

export function MoyenAgeWriting({ age = "4-5" }: { age?: AgeGroup }) {
  if (age === "2-3") return null
  const words = age === "4-5" ? SHORT : FULL
  const phrase = age === "8-10"

  return (
    <WorksheetFrame
      title={age === "4-5" ? "J'écris les mots du château" : "J'écris — vocabulaire du Moyen Âge"}
      instructions={
        phrase
          ? "Majuscules, cursive, puis une phrase courte sous chaque mot."
          : "Recopie en majuscules d'imprimerie, puis en cursive."
      }
      footerNote={`Écriture · Moyen Âge · ${age} ans`}
      accent="sky"
    >
      <div className="flex flex-col gap-5">
        {words.map(({ label, Picto }) => (
          <WordBlock key={label} label={label} Picto={Picto} phrase={phrase} />
        ))}
      </div>
    </WorksheetFrame>
  )
}

function WordBlock({
  label,
  Picto,
  phrase,
}: {
  label: string
  Picto: ComponentType<PictoProps>
  phrase: boolean
}) {
  return (
    <div className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink bg-white">
          <Picto mode="color" className="h-10 w-10" />
        </div>
        <span className="font-display text-xl font-bold uppercase tracking-wide">{label}</span>
      </div>
      <Line label="MAJUSCULES" sample={label.toUpperCase()} cursive={false} />
      <Line label="CURSIVE" sample={label.toLowerCase()} cursive />
      {phrase ? (
        <div className="mt-3">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-ink/45">Ma phrase</p>
          <div className="h-9 border-b-[3px] border-ink" />
        </div>
      ) : null}
    </div>
  )
}

function Line({ label, sample, cursive }: { label: string; sample: string; cursive: boolean }) {
  return (
    <div className="mt-2">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-ink/45">{label}</p>
      <div
        className={
          cursive
            ? "border-b-[3px] border-ink/20 pb-1 font-cursive text-2xl text-ink/25"
            : "border-b-[3px] border-ink/20 pb-1 font-display text-base tracking-[0.18em] text-ink/20"
        }
      >
        {sample}
      </div>
      <div className="mt-2 h-9 border-b-[3px] border-ink" />
    </div>
  )
}
