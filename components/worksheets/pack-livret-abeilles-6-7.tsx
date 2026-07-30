import type { LivretActivityMeta } from "@/lib/livret/types"
import type { NomenclaturePhoto } from "@/components/worksheets/nomenclature-cards"
import type { ComponentType, SVGProps } from "react"
import { PictoBee } from "./art/pictos"
import { LivretActivityFrame } from "./livret/livret-activity-frame"
import { LivretNomenclatureGrid } from "./livret/livret-nomenclature-grid"

function shuffled<T>(items: readonly T[], order: readonly number[]): T[] {
  return order.map((i) => items[i])
}

/** 8 cartes nomenclature — livret page 2 */
const ABEILLES_LIVRET_CARDS: readonly NomenclaturePhoto[] = [
  { word: "l'abeille", src: "/nomenclature/abeilles/abeille.jpg", alt: "Photo d'une abeille" },
  { word: "la ruche", src: "/nomenclature/abeilles/ruche.jpg", alt: "Photo d'une ruche" },
  { word: "le miel", src: "/nomenclature/abeilles/miel.jpg", alt: "Photo de miel" },
  { word: "la fleur", src: "/nomenclature/abeilles/fleur.jpg", alt: "Photo d'une fleur" },
  { word: "le pollen", src: "/nomenclature/abeilles/pollen.jpg", alt: "Photo de pollen" },
  { word: "le nectar", src: "/nomenclature/abeilles/nectar.jpg", alt: "Photo de nectar dans une fleur" },
  { word: "le couvain", src: "/nomenclature/abeilles/couvain.jpg", alt: "Photo de couvain d'abeilles" },
  { word: "la reine", src: "/nomenclature/abeilles/reine.jpg", alt: "Photo d'une abeille reine" },
]

const ACTIVITIES: LivretActivityMeta[] = [
  {
    index: 1,
    title: "Coloriage codé",
    pedagogicalType: "Coloriage codé (additions)",
    objective: "Résoudre des additions simples pour colorier",
    skills: ["Calcul", "Motricité fine"],
    material: ["Crayons de couleur"],
    childInstruction: "Résous chaque addition. Colorie avec la bonne couleur.",
    steps: [],
    learns: "Chaque zone a une addition : le résultat indique quelle couleur utiliser.",
    scientificNote: {
      kind: "fact",
      text: "Les abeilles domestiques vivent en colonies dans une ruche, près des fleurs qu'elles butinent.",
    },
    parentQuestions: ["Pourquoi les abeilles vont-elles vers les fleurs ?"],
  },
  {
    index: 2,
    title: "Cartes de nomenclature",
    pedagogicalType: "Nomenclature",
    objective: "Associer image et mot",
    skills: ["Vocabulaire", "Lecture"],
    material: ["Ciseaux", "Colle"],
    childInstruction: "Découpe les mots. Associe chaque photo à son mot.",
    steps: [],
    learns: "Huit mots clés du thème abeilles.",
    scientificNote: {
      kind: "fact",
      text: "Une colonie compte une reine, des ouvrières et des mâles (faux-bourdons).",
    },
    parentQuestions: ["Quelle carte te plaît le plus ? Pourquoi ?"],
  },
  {
    index: 3,
    title: "Légende la ruche",
    pedagogicalType: "Schéma légendé",
    objective: "Nommer les parties de la ruche",
    skills: ["Vocabulaire", "Écriture"],
    material: ["Crayon"],
    childInstruction: "Écris chaque mot dans la case qui va avec la partie de la ruche.",
    steps: [],
    learns: "Une ruche a une entrée, des alvéoles, du couvain et du miel.",
    scientificNote: {
      kind: "hypothesis",
      text: "Les abeilles « dansent » pour indiquer où trouver du nectar — les chercheurs étudient encore ce langage.",
    },
    parentQuestions: ["À quoi sert chaque partie selon toi ?"],
  },
  {
    index: 4,
    title: "Vivant ou pas ?",
    pedagogicalType: "Classification",
    objective: "Distinguer vivant / non vivant",
    skills: ["Raisonnement"],
    material: ["Crayon"],
    childInstruction: "Pour chaque mot, colorie VIVANT ou NON. Explique à voix haute.",
    steps: [],
    learns: "L'abeille est vivante ; le miel est fabriqué par des êtres vivants.",
    parentQuestions: ["Le miel est-il vivant ? Pourquoi ?"],
  },
  {
    index: 5,
    title: "De l'œuf à l'abeille",
    pedagogicalType: "Frise",
    objective: "Ordonner le cycle de vie",
    skills: ["Temporalité"],
    material: ["Crayon"],
    childInstruction: "Les cartes sont mélangées. Numérote de 1 à 4 dans le bon ordre.",
    steps: [],
    learns: "Œuf → larve → nymphe → abeille adulte.",
    scientificNote: {
      kind: "fact",
      text: "Les ouvrières nourrissent la larve avant qu'elle devienne nymphe, puis adulte.",
    },
    parentQuestions: ["En quoi c'est pareil ou différent du papillon ?"],
  },
  {
    index: 6,
    title: "Journée d'une butineuse",
    pedagogicalType: "Séquence",
    objective: "Remettre une histoire dans l'ordre",
    skills: ["Logique", "Narration"],
    material: ["Crayon"],
    childInstruction: "Les cartes sont mélangées. Numérote de 1 à 5, puis raconte l'histoire.",
    steps: [],
    learns: "Butiner = quitter la ruche, visiter des fleurs, revenir.",
    scientificNote: {
      kind: "fact",
      text: "Une ouvrière peut visiter des centaines de fleurs en une sortie.",
    },
    parentQuestions: ["Pourquoi doit-elle revenir à la ruche ?"],
  },
  {
    index: 7,
    title: "Vrai ou faux",
    pedagogicalType: "Vrai / faux",
    objective: "Vérifier des affirmations",
    skills: ["Esprit critique"],
    material: ["Crayon"],
    childInstruction: "Entoure VRAI ou FAUX pour chaque phrase.",
    steps: [],
    learns: "Seules les ouvrières butinent ; toutes les abeilles ne font pas du miel.",
    scientificNote: {
      kind: "fact",
      text: "Les faux-bourdons (mâles) ne butinent pas.",
    },
    parentQuestions: ["Comment sais-tu que c'est vrai ou faux ?"],
  },
  {
    index: 8,
    title: "Mots croisés",
    pedagogicalType: "Mots croisés",
    objective: "Réviser le vocabulaire",
    skills: ["Lecture", "Écriture"],
    material: ["Crayon"],
    childInstruction: "Lis les définitions. Écris les mots en MAJUSCULES dans la grille.",
    steps: [],
    learns: "Mots clés : abeille, aile, miel.",
    parentQuestions: ["Peux-tu faire une phrase avec deux mots de la grille ?"],
  },
]

export const LIVRET_ABEILLES_META = {
  subtitle: "Livret — 8 pages",
  contents: [
    "1. Coloriage codé",
    "2. Cartes de nomenclature",
    "3. Légende la ruche",
    "4. Vivant ou pas ?",
    "5. De l'œuf à l'abeille",
    "6. Journée d'une butineuse",
    "7. Vrai ou faux",
    "8. Mots croisés",
  ],
  activityCount: 8,
}

export function PackLivretAbeilles67() {
  const themeLabel = "Les abeilles"
  const activityCount = LIVRET_ABEILLES_META.activityCount

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <LivretActivityFrame meta={ACTIVITIES[0]} themeLabel={themeLabel} activityCount={activityCount} accent="leaf">
        <BeeColorByAddition />
      </LivretActivityFrame>

      <LivretActivityFrame meta={ACTIVITIES[1]} themeLabel={themeLabel} activityCount={activityCount} accent="sky">
        <LivretNomenclatureGrid cards={ABEILLES_LIVRET_CARDS} />
      </LivretActivityFrame>

      <LivretActivityFrame meta={ACTIVITIES[2]} themeLabel={themeLabel} activityCount={activityCount} accent="tangerine">
        <BeeHiveDiagram />
      </LivretActivityFrame>

      <LivretActivityFrame meta={ACTIVITIES[3]} themeLabel={themeLabel} activityCount={activityCount} accent="berry">
        <BeeClassification />
      </LivretActivityFrame>

      <LivretActivityFrame meta={ACTIVITIES[4]} themeLabel={themeLabel} activityCount={activityCount} accent="sun">
        <BeeLifecycleOrder />
      </LivretActivityFrame>

      <LivretActivityFrame meta={ACTIVITIES[5]} themeLabel={themeLabel} activityCount={activityCount} accent="leaf">
        <BeeStoryOrder />
      </LivretActivityFrame>

      <LivretActivityFrame meta={ACTIVITIES[6]} themeLabel={themeLabel} activityCount={activityCount} accent="sky">
        <BeeTrueFalse />
      </LivretActivityFrame>

      <LivretActivityFrame meta={ACTIVITIES[7]} themeLabel={themeLabel} activityCount={activityCount} accent="berry">
        <BeeCrossword />
      </LivretActivityFrame>
    </div>
  )
}

const COLOR_LEGEND = [
  { num: 1, name: "jaune" },
  { num: 2, name: "noir" },
  { num: 3, name: "orange" },
  { num: 4, name: "marron" },
  { num: 5, name: "vert" },
  { num: 6, name: "bleu clair" },
] as const

/** Banque d'additions — sommes ≤ 10, résultats 1–6 (1 zone = 1 numéro = 1 couleur) */
const ADDITION_BANK = [
  { zone: "Entrée", a: 1, b: 0 },
  { zone: "Tige", a: 1, b: 1 },
  { zone: "Pétales", a: 2, b: 1 },
  { zone: "Ailes", a: 1, b: 3 },
  { zone: "Corps de l'abeille", a: 2, b: 3 },
  { zone: "Ruche", a: 3, b: 3 },
] as const

const SCENE_STROKE = 3.25

function SvgZoneLabel({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="18"
      fontWeight="700"
      fill="currentColor"
    >
      {n}
    </text>
  )
}

/** Scène tournesol + abeille + ruche — contours épais, zones numérotées */
function BeeSceneSvg() {
  const flowerCx = 82
  const flowerCy = 88
  const petals = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2
    return {
      px: flowerCx + Math.cos(a) * 30,
      py: flowerCy + Math.sin(a) * 30,
      deg: (a * 180) / Math.PI,
    }
  })

  return (
    <svg
      viewBox="0 0 420 260"
      className="mx-auto h-auto w-full max-w-xl text-ink"
      role="img"
      aria-label="Scène à colorier : tournesol, abeille et ruche"
    >
      {petals.map(({ px, py, deg }, i) => (
        <g key={`petal-${i}`}>
          <ellipse
            cx={px}
            cy={py}
            rx="16"
            ry="9"
            fill="white"
            stroke="currentColor"
            strokeWidth={SCENE_STROKE}
            transform={`rotate(${deg} ${px} ${py})`}
          />
          {i === 0 ? <SvgZoneLabel x={px} y={py} n={3} /> : null}
        </g>
      ))}
      <circle
        cx={flowerCx}
        cy={flowerCy}
        r="14"
        fill="white"
        stroke="currentColor"
        strokeWidth={SCENE_STROKE}
      />

      <line
        x1={flowerCx}
        y1={flowerCy + 14}
        x2={flowerCx}
        y2={210}
        stroke="currentColor"
        strokeWidth={SCENE_STROKE}
        strokeLinecap="round"
      />
      <SvgZoneLabel x={flowerCx} y={198} n={2} />
      <path
        d={`M${flowerCx} 170 Q${flowerCx - 26} 166 ${flowerCx - 32} 186 Q${flowerCx - 10} 190 ${flowerCx} 178`}
        fill="white"
        stroke="currentColor"
        strokeWidth={SCENE_STROKE}
      />

      <ellipse cx={178} cy={78} rx="18" ry="12" fill="white" stroke="currentColor" strokeWidth={SCENE_STROKE} />
      <SvgZoneLabel x={178} y={78} n={4} />

      <ellipse cx={200} cy={108} rx="26" ry="16" fill="white" stroke="currentColor" strokeWidth={SCENE_STROKE} />
      <line x1="186" y1="98" x2="186" y2="118" stroke="currentColor" strokeWidth="2" />
      <line x1="200" y1="96" x2="200" y2="120" stroke="currentColor" strokeWidth="2" />
      <circle cx={224} cy={102} r="9" fill="white" stroke="currentColor" strokeWidth={SCENE_STROKE} />
      <SvgZoneLabel x={204} y={108} n={5} />

      <path
        d="M310 38 C348 48 368 90 362 132 C356 162 336 172 310 176 C284 172 264 162 258 132 C252 90 272 48 310 38 Z"
        fill="white"
        stroke="currentColor"
        strokeWidth={SCENE_STROKE}
        strokeLinejoin="round"
      />
      <path d="M272 78 Q310 72 348 78" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M266 98 Q310 90 354 98" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M264 118 Q310 110 356 118" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M262 138 Q310 130 358 138" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <SvgZoneLabel x={310} y={108} n={6} />

      <ellipse cx={310} cy={158} rx="14" ry="9" fill="white" stroke="currentColor" strokeWidth={SCENE_STROKE} />
      <SvgZoneLabel x={310} y={158} n={1} />

      <path
        d="M8 220 Q110 212 210 220 Q310 228 412 220"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function BeeColorByAddition() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border-[3px] border-ink bg-white px-3 py-2">
        <p className="font-display text-[10px] font-bold uppercase tracking-wide text-ink/55">
          Légende des couleurs
        </p>
        <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
          {COLOR_LEGEND.map(({ num, name }) => (
            <li key={num} className="flex items-center gap-1.5 font-display text-xs font-bold">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink bg-[#fffdf7] text-[10px]">
                {num}
              </span>
              <span>= {name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,12.5rem)_1fr] lg:items-start">
        <div className="rounded-2xl border-[3px] border-ink bg-white p-3">
          <p className="font-display text-xs font-bold uppercase tracking-wide text-ink/55">Additions</p>
          <ul className="mt-2 space-y-2">
            {ADDITION_BANK.map(({ zone, a, b }) => (
              <li key={zone} className="font-display text-[11px] font-bold leading-snug sm:text-xs">
                <span>{zone}</span>
                <span className="mt-0.5 block">
                  {a} + {b} = <span className="inline-block w-6 border-b-2 border-ink align-bottom" />
                </span>
                <span className="mt-0.5 block text-ink/70">
                  Écris le numéro de couleur :{" "}
                  <span className="inline-block w-5 border-b-2 border-ink/50 align-bottom" />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-3 sm:p-4">
          <BeeSceneSvg />
        </div>
      </div>
    </div>
  )
}

const HIVE_PARTS = [
  { num: 1, word: "entrée", hint: "par où l'abeille passe", x: 50, y: 94 },
  { num: 2, word: "alvéole", hint: "petit hexagone de cire", x: 28, y: 58 },
  { num: 3, word: "couvain", hint: "où grandissent les larves", x: 72, y: 42 },
  { num: 4, word: "miel", hint: "réserve sucrée", x: 68, y: 78 },
] as const

const HIVE_STROKE = 3.25

/** Ruche annotée — zones numérotées reliées au banc de mots */
function AnnotatedHiveSvg() {
  return (
    <svg
      viewBox="0 0 140 130"
      className="mx-auto h-auto w-full max-w-xs text-ink"
      role="img"
      aria-label="Schéma d'une ruche avec quatre zones numérotées"
    >
      <g transform="translate(20 4)">
        <path
          d="M50 10 C78 18 92 52 88 88 C84 102 68 108 50 110 C32 108 16 102 12 88 C8 52 22 18 50 10 Z"
          fill="white"
          stroke="currentColor"
          strokeWidth={HIVE_STROKE}
          strokeLinejoin="round"
        />
        <path d="M22 38 Q50 32 78 38" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 52 Q50 46 82 52" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 66 Q50 60 84 66" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M15 80 Q50 74 85 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="50" cy="94" rx="11" ry="7" fill="white" stroke="currentColor" strokeWidth={HIVE_STROKE} />
        <path d="M8 112 Q25 106 50 108 Q75 106 92 112" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M6 116 H94" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </g>

      {HIVE_PARTS.map(({ num, x, y }) => {
        const badgeX = num === 1 ? x + 20 : num === 2 ? x - 8 : x + 20
        const badgeY = num === 1 ? y + 22 : num === 2 ? y : num === 3 ? y - 14 : y + 14
        return (
          <g key={num}>
            <line x1={x + 20} y1={y + 4} x2={badgeX} y2={badgeY} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx={badgeX} cy={badgeY} r="11" fill="white" stroke="currentColor" strokeWidth="2.5" />
            <text
              x={badgeX}
              y={badgeY}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="13"
              fontWeight="700"
              fill="currentColor"
            >
              {num}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function BeeHiveDiagram() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
      <div className="flex justify-center rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-6">
        <AnnotatedHiveSvg />
      </div>
      <div className="space-y-4">
        {HIVE_PARTS.map(({ num, word, hint }) => (
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

function BeeClassification() {
  const items = ["abeille", "fleur", "rocher", "miel", "papillon"]
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

type OutlinePicto = ComponentType<SVGProps<SVGSVGElement> & { mode?: "color" | "outline"; className?: string }>

/** Cycle abeille — pictos neutres (pas papillon) */
function PictoBeeEgg({ mode = "outline", className }: { mode?: "color" | "outline"; className?: string }) {
  const fill = mode === "color" ? "#fffdf7" : "white"
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <ellipse cx="40" cy="42" rx="11" ry="15" fill={fill} stroke="currentColor" strokeWidth="3.25" />
    </svg>
  )
}

function PictoBeeLarva({ mode = "outline", className }: { mode?: "color" | "outline"; className?: string }) {
  const fill = mode === "color" ? "#fffdf7" : "white"
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <path
        d="M18 48 C28 32 42 30 54 36 C66 42 64 54 50 56 C38 58 28 56 22 52 Z"
        fill={fill}
        stroke="currentColor"
        strokeWidth="3.25"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="48" r="3.5" fill="currentColor" />
    </svg>
  )
}

function PictoBeeNymph({ mode = "outline", className }: { mode?: "color" | "outline"; className?: string }) {
  const fill = mode === "color" ? "#fffdf7" : "white"
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <path
        d="M40 14 L58 24 V46 L40 56 L22 46 V24 Z"
        fill={fill}
        stroke="currentColor"
        strokeWidth="3.25"
        strokeLinejoin="round"
      />
      <ellipse cx="40" cy="38" rx="10" ry="14" fill={fill} stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

const LIFECYCLE: readonly { label: string; Picto: OutlinePicto }[] = [
  { label: "Œuf", Picto: PictoBeeEgg },
  { label: "Larve", Picto: PictoBeeLarva },
  { label: "Nymphe", Picto: PictoBeeNymph },
  { label: "Abeille", Picto: PictoBee },
]
const LIFECYCLE_SHUFFLE = [2, 0, 3, 1] as const

function BeeLifecycleOrder() {
  const cards = shuffled([...LIFECYCLE], LIFECYCLE_SHUFFLE)
  return <OrderCards cards={cards} />
}

const STORY = [
  "Sort de la ruche",
  "Se pose sur une fleur",
  "Récolte du nectar",
  "Retourne à la ruche",
  "Danse pour indiquer la fleur",
] as const
const STORY_SHUFFLE = [4, 1, 0, 3, 2] as const

function BeeStoryOrder() {
  const cards = shuffled([...STORY], STORY_SHUFFLE)
  return <OrderCards cards={cards.map((t) => ({ label: t }))} />
}

function OrderCards({
  cards,
}: {
  cards: readonly ({ label: string; Picto?: OutlinePicto } | { label: string })[]
}) {
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
          {Picto ? <Picto mode="outline" className="h-14 w-14 shrink-0" /> : null}
          <span className="font-display text-sm font-bold leading-snug">{label}</span>
        </div>
      ))}
    </div>
  )
}

function BeeTrueFalse() {
  const statements = [
    "Toutes les abeilles font du miel.",
    "Les ouvrières butinent les fleurs.",
    "Le pollen aide les plantes.",
  ]
  return (
    <div className="flex flex-col gap-3">
      {statements.map((text) => (
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

/**
 * Croisements vérifiés (lettre par lettre) :
 *   ABEILLE H @ row 1, col 0  →  A B E I L L E
 *   AILE     V @ row 1, col 0  →  A / I / L / E  (partage A)
 *   MIEL     V @ row 0, col 3  →  M / I / E / L  (I croise ABEILLE col 3)
 */
function BeeCrossword() {
  type Cell = { num?: number } | null
  const rows = 5
  const cols = 7
  const g: Cell[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  const place = (word: string, r: number, c: number, dir: "H" | "V", num: number) => {
    ;[...word].forEach((_, i) => {
      const rr = dir === "H" ? r : r + i
      const cc = dir === "H" ? c + i : c
      if (!g[rr][cc]) g[rr][cc] = {}
      if (i === 0) g[rr][cc] = { num }
    })
  }
  place("ABEILLE", 1, 0, "H", 1)
  place("AILE", 1, 0, "V", 2)
  place("MIEL", 0, 3, "V", 3)

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
        <div>
          <p className="font-display font-bold">Horizontal</p>
          <p className="mt-1">
            <span className="font-bold">1.</span> Insecte qui butine et vit en colonie.
          </p>
        </div>
        <div>
          <p className="font-display font-bold">Vertical</p>
          <p className="mt-1">
            <span className="font-bold">2.</span> Partie qui permet de voler (croise le A).
          </p>
          <p className="mt-1">
            <span className="font-bold">3.</span> Substance sucrée dans la ruche (croise le I).
          </p>
        </div>
      </div>
    </div>
  )
}
