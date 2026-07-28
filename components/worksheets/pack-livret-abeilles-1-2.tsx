import type { LivretActivityMeta } from "@/lib/livret/types"
import type { NomenclaturePhoto } from "@/components/worksheets/nomenclature-cards"
import { PhotoBox } from "@/components/worksheets/nomenclature-cards"
import { PictoBee, PictoHive, PictoSunflower } from "./art/pictos"
import { LivretActivityFrame } from "./livret/livret-activity-frame"
import { LivretNomenclatureToddler } from "./livret/livret-nomenclature-grid"

/** 5 cartes — les plus reconnaissables pour les tout-petits */
const ABEILLES_TODDLER_CARDS: readonly NomenclaturePhoto[] = [
  { word: "l'abeille", src: "/nomenclature/abeilles/abeille.jpg", alt: "Photo d'une abeille" },
  { word: "la fleur", src: "/nomenclature/abeilles/fleur.jpg", alt: "Photo d'une fleur" },
  { word: "la ruche", src: "/nomenclature/abeilles/ruche.jpg", alt: "Photo d'une ruche" },
  { word: "le miel", src: "/nomenclature/abeilles/miel.jpg", alt: "Photo de miel" },
  { word: "le bourdon", src: "/nomenclature/abeilles/bourdon.jpg", alt: "Photo d'un bourdon" },
]

const ACTIVITIES: LivretActivityMeta[] = [
  {
    index: 1,
    title: "Cartes à nommer",
    pedagogicalType: "Nomenclature (oral)",
    objective: "Nommer les images à voix haute",
    skills: ["Vocabulaire", "Oral"],
    material: [],
    childInstruction: "Montre une photo. Dis le mot ensemble.",
    steps: [],
    learns: "Cinq mots simples : abeille, fleur, ruche, miel, bourdon.",
    scientificNote: {
      kind: "fact",
      text: "Les abeilles vivent en groupe dans une ruche, près des fleurs.",
    },
    parentQuestions: ["Quelle photo te plaît le plus ?"],
  },
  {
    index: 2,
    title: "Je colorie",
    pedagogicalType: "Coloriage grand format",
    objective: "Colorier librement une scène abeille et fleur",
    skills: ["Motricité", "Créativité"],
    material: ["Gros crayons"],
    childInstruction: "Colorie l'abeille et la fleur. Gros gestes !",
    steps: [],
    learns: "L'abeille butine sur les fleurs colorées.",
    scientificNote: {
      kind: "fact",
      text: "Les abeilles aiment les fleurs jaunes et orange.",
    },
    parentQuestions: ["Quelle couleur choisis-tu pour la fleur ?"],
  },
  {
    index: 3,
    title: "La bonne couleur",
    pedagogicalType: "Association couleur",
    objective: "Relier chaque image à sa couleur",
    skills: ["Couleurs", "Observation"],
    material: ["Crayons"],
    childInstruction: "Montre la bonne couleur. Puis colorie.",
    steps: [],
    learns: "L'abeille est souvent jaune et noire. La fleur peut être jaune ou rouge.",
    parentQuestions: ["De quelle couleur est l'abeille chez nous ?"],
  },
  {
    index: 4,
    title: "Bzzz !",
    pedagogicalType: "Son / imitation",
    objective: "Imiter le bourdonnement de l'abeille",
    skills: ["Oral", "Écoute"],
    material: [],
    childInstruction: "Écoute. Imite le son : Bzzz !",
    steps: [],
    learns: "L'abeille fait « bzzz » avec ses ailes.",
    scientificNote: {
      kind: "fact",
      text: "Le bourdonnement vient du battement très rapide des ailes.",
    },
    parentQuestions: ["Peux-tu faire un bzzz tout doux, puis plus fort ?"],
  },
  {
    index: 5,
    title: "Jaune ou noir ?",
    pedagogicalType: "Tri 2 couleurs",
    objective: "Distinguer jaune et noir sur l'abeille",
    skills: ["Couleurs", "Tri"],
    material: ["Crayons jaune et noir"],
    childInstruction: "Entoure en jaune ou en noir. Dis la couleur.",
    steps: [],
    learns: "Le corps de l'abeille alterne jaune et noir.",
    parentQuestions: ["Où vois-tu du jaune sur l'abeille ?"],
  },
  {
    index: 6,
    title: "Pareil ou pas ?",
    pedagogicalType: "Même / différent",
    objective: "Comparer deux images",
    skills: ["Observation", "Logique"],
    material: ["Crayon"],
    childInstruction: "Regarde les deux images. Entoure PAREIL ou PAS PAREIL.",
    steps: [],
    learns: "Deux abeilles se ressemblent. Une abeille et une fleur sont différentes.",
    parentQuestions: ["Qu'est-ce qui est pareil ? Qu'est-ce qui change ?"],
  },
]

export const LIVRET_ABEILLES_1_2_META = {
  subtitle: "Livret — 6 pages",
  contents: [
    "1. Cartes à nommer",
    "2. Je colorie",
    "3. La bonne couleur",
    "4. Bzzz !",
    "5. Jaune ou noir ?",
    "6. Pareil ou pas ?",
  ],
  activityCount: 6,
}

export function PackLivretAbeilles12() {
  const themeLabel = "Les abeilles"
  const activityCount = LIVRET_ABEILLES_1_2_META.activityCount

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <LivretActivityFrame meta={ACTIVITIES[0]} themeLabel={themeLabel} activityCount={activityCount} accent="sun">
        <LivretNomenclatureToddler cards={ABEILLES_TODDLER_CARDS} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={ACTIVITIES[1]} themeLabel={themeLabel} activityCount={activityCount} accent="leaf">
        <ToddlerColoringScene />
      </LivretActivityFrame>

      <LivretActivityFrame meta={ACTIVITIES[2]} themeLabel={themeLabel} activityCount={activityCount} accent="sky">
        <ColorMatchActivity />
      </LivretActivityFrame>

      <LivretActivityFrame meta={ACTIVITIES[3]} themeLabel={themeLabel} activityCount={activityCount} accent="tangerine">
        <SoundImitationActivity />
      </LivretActivityFrame>

      <LivretActivityFrame meta={ACTIVITIES[4]} themeLabel={themeLabel} activityCount={activityCount} accent="berry">
        <TwoColorSortActivity />
      </LivretActivityFrame>

      <LivretActivityFrame meta={ACTIVITIES[5]} themeLabel={themeLabel} activityCount={activityCount} accent="sun">
        <SameDifferentActivity />
      </LivretActivityFrame>
    </div>
  )
}

function ToddlerColoringScene() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4 sm:p-6">
      <div className="flex w-full max-w-lg flex-wrap items-end justify-center gap-6">
        <PictoSunflower mode="outline" className="h-44 w-40 sm:h-52 sm:w-48" />
        <PictoBee mode="outline" className="h-32 w-36 sm:h-40 sm:w-44" />
      </div>
      <p className="text-center text-xs font-semibold text-ink/50">Colorie comme tu veux — jaune, rouge, vert…</p>
    </div>
  )
}

const COLOR_SWATCHES = [
  { name: "jaune", className: "bg-[#FFE566]" },
  { name: "noir", className: "bg-ink" },
  { name: "rouge", className: "bg-[#FF6B6B]" },
  { name: "marron", className: "bg-[#C4A574]" },
] as const

function ColorMatchActivity() {
  const rows = [
    { label: "l'abeille", Picto: PictoBee, colors: ["jaune", "noir"] as const },
    { label: "la fleur", Picto: PictoSunflower, colors: ["jaune", "rouge"] as const },
    { label: "la ruche", Picto: PictoHive, colors: ["marron", "jaune"] as const },
  ]

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
              const swatch = COLOR_SWATCHES.find((c) => c.name === colorName)!
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

function SoundImitationActivity() {
  const items = [
    { word: "l'abeille", src: "/nomenclature/abeilles/abeille.jpg", alt: "Photo d'une abeille", sound: "Bzzz !" },
    { word: "la ruche", src: "/nomenclature/abeilles/ruche.jpg", alt: "Photo d'une ruche", sound: "Mmm…" },
    { word: "la fleur", src: "/nomenclature/abeilles/fleur.jpg", alt: "Photo d'une fleur", sound: "Silence" },
  ]

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

function TwoColorSortActivity() {
  const zones = [
    { zone: "JAUNE", className: "bg-[#FFE566]/30" },
    { zone: "NOIR", className: "bg-ink/10" },
  ]
  const items = ["Corps de l'abeille", "Rayures", "Ailes", "Antennes"]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {zones.map(({ zone, className }) => (
          <div
            key={zone}
            className={`flex min-h-[8rem] flex-col items-center rounded-2xl border-[3px] border-ink p-3 ${className}`}
          >
            <span className="font-display text-lg font-bold">{zone}</span>
            <PictoBee mode="outline" className="mt-2 h-16 w-16 opacity-40" />
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
        Dis « jaune » ou « noir ». Entoure ou colle dans la bonne case.
      </p>
    </div>
  )
}

function SameDifferentActivity() {
  const pairs = [
    {
      label: "1",
      left: PictoBee,
      right: PictoBee,
    },
    {
      label: "2",
      left: PictoBee,
      right: PictoSunflower,
    },
    {
      label: "3",
      left: PictoSunflower,
      right: PictoSunflower,
    },
  ]

  return (
    <div className="space-y-4">
      {pairs.map(({ label, left: Left, right: Right }) => (
        <div key={label} className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
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
