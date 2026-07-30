import type { NomenclaturePhoto } from "@/components/worksheets/nomenclature-cards"
import type { Theme } from "@/lib/activities"
import type { LivretActivityMeta, ScientificNoteKind } from "@/lib/livret/types"
import type { ComponentType, SVGProps } from "react"
import {
  NOMENCLATURE_ABEILLES,
  NOMENCLATURE_CERISE,
  NOMENCLATURE_COCCINELLE,
  NOMENCLATURE_OCEAN,
  NOMENCLATURE_PAPILLON,
  NOMENCLATURE_SERPENT,
  NOMENCLATURE_TOURNESOL,
} from "@/lib/worksheets/nomenclature-sets"
import {
  PictoBee,
  PictoHive,
  PictoLeaf,
  PictoSeed,
  PictoSprout,
  PictoStem,
  PictoSun,
  PictoSunflower,
} from "@/components/worksheets/art/pictos"
import {
  PictoBloom,
  PictoButterfly,
  PictoCaterpillar,
  PictoChrysalis,
  PictoEgg,
  PictoLadybug,
  PictoScale,
  PictoSnake,
  PictoTongue,
  PictoWing,
} from "@/components/worksheets/art/pictos-animaux"
import {
  PictoBasket,
  PictoCherryFlower,
  PictoCherryFruit,
  PictoCherryLeaf,
  PictoCherryTree,
} from "@/components/worksheets/art/pictos-cerise"
import {
  PictoBoat,
  PictoFish,
  PictoOceanWave,
  PictoOctopus,
  PictoShell,
} from "@/components/worksheets/art/pictos-ocean"

export type OutlinePicto = ComponentType<SVGProps<SVGSVGElement> & { mode?: "color" | "outline"; className?: string }>

export type LivretColorPair = { name: string; className: string }

export type LivretColorMatchRow = {
  label: string
  Picto: OutlinePicto
  colors: readonly string[]
}

export type LivretSoundItem = {
  word: string
  src: string
  alt: string
  sound: string
}

export type LivretLifecycleStep = { label: string; Picto?: OutlinePicto; photo?: NomenclaturePhoto }

export type LivretSchemaPart = { num: number; word: string; hint: string }

export type LivretCrosswordWord = {
  word: string
  row: number
  col: number
  dir: "H" | "V"
  num: number
  clueH?: string
  clueV?: string
}

export type LivretTrueFalseItem = { text: string; answer: boolean }

export type LivretMatchPair = { photo: NomenclaturePhoto; label: string }

export type LivretSeekItem = { word: string; src: string; alt: string }

export type Livret45SequenceStep = { label: string; Picto: OutlinePicto }

export type LivretThemeId =
  | "abeilles"
  | "papillon"
  | "coccinelle"
  | "serpent"
  | "tournesols"
  | "ocean"
  | "cerise"

export type LivretThemeDef = {
  id: LivretThemeId
  themeLabel: string
  catalogTitle: string
  themes: Theme[]
  season: "printemps" | "ete" | "automne" | "hiver" | "toute-annee"
  color: "berry" | "sun" | "sky" | "leaf" | "tangerine"
  toddlerCards: readonly NomenclaturePhoto[]
  cards8: readonly NomenclaturePhoto[]
  soundWord: string
  colorPairs: readonly LivretColorPair[]
  colorMatchRows: readonly LivretColorMatchRow[]
  soundItems: readonly LivretSoundItem[]
  twoColorSort: { zones: readonly { zone: string; className: string }[]; items: readonly string[] }
  sameDifferentPairs: readonly { left: OutlinePicto; right: OutlinePicto }[]
  coloringPictos: readonly OutlinePicto[]
  lifecycle: readonly LivretLifecycleStep[]
  lifecycleShuffle: readonly number[]
  story: readonly string[]
  storyShuffle: readonly number[]
  classification: readonly string[]
  schemaParts: readonly LivretSchemaPart[]
  schemaHeroPhoto: NomenclaturePhoto
  crossword: {
    rows: number
    cols: number
    words: readonly LivretCrosswordWord[]
    clueH: readonly string[]
    clueV: readonly string[]
  }
  trueFalse: readonly LivretTrueFalseItem[]
  colorLegend: readonly { num: number; name: string }[]
  colorZones: readonly { zone: string; num: number }[]
  matchPairs45: readonly LivretMatchPair[]
  sequence45: readonly Livret45SequenceStep[]
  sequence45Shuffle: readonly number[]
  seekItems45: readonly LivretSeekItem[]
  pathConfig?: { From: OutlinePicto; To: OutlinePicto; bubbleWord: string }
  toddlerMeta: readonly LivretActivityMeta[]
  meta45: readonly LivretActivityMeta[]
  meta67: readonly LivretActivityMeta[]
}

function note(kind: ScientificNoteKind, text: string) {
  return { kind, text } as const
}

function pickWords(set: readonly NomenclaturePhoto[], words: readonly string[]): NomenclaturePhoto[] {
  return words.map((w) => {
    const card = set.find((c) => c.word === w)
    if (!card) throw new Error(`Livret theme: mot « ${w} » introuvable dans le set`)
    return card
  })
}

const COLOR_SWATCHES: readonly LivretColorPair[] = [
  { name: "jaune", className: "bg-[#FFE566]" },
  { name: "noir", className: "bg-ink" },
  { name: "rouge", className: "bg-[#FF6B6B]" },
  { name: "marron", className: "bg-[#C4A574]" },
  { name: "vert", className: "bg-[#7BC67E]" },
  { name: "bleu", className: "bg-[#7EC8E3]" },
  { name: "orange", className: "bg-[#FFA94D]" },
]

function swatch(...names: string[]) {
  return names.map((n) => COLOR_SWATCHES.find((c) => c.name === n)!)
}

export const LIVRET_THEME_DEFS: Record<LivretThemeId, LivretThemeDef> = {
  abeilles: {
    id: "abeilles",
    themeLabel: "Les abeilles",
    catalogTitle: "Les abeilles",
    themes: ["animaux"],
    season: "printemps",
    color: "sun",
    toddlerCards: pickWords(NOMENCLATURE_ABEILLES, [
      "l'abeille",
      "la fleur",
      "la ruche",
      "le miel",
      "le bourdon",
    ]),
    cards8: pickWords(NOMENCLATURE_ABEILLES, [
      "l'abeille",
      "la ruche",
      "le miel",
      "la fleur",
      "le pollen",
      "le nectar",
      "le couvain",
      "la reine",
    ]),
    soundWord: "Bzzz",
    colorPairs: swatch("jaune", "noir", "rouge", "marron"),
    colorMatchRows: [
      { label: "l'abeille", Picto: PictoBee, colors: ["jaune", "noir"] },
      { label: "la fleur", Picto: PictoSunflower, colors: ["jaune", "rouge"] },
      { label: "la ruche", Picto: PictoHive, colors: ["marron", "jaune"] },
    ],
    soundItems: [
      { word: "l'abeille", src: "/nomenclature/abeilles/abeille.jpg", alt: "Photo d'une abeille", sound: "Bzzz !" },
      { word: "la ruche", src: "/nomenclature/abeilles/ruche.jpg", alt: "Photo d'une ruche", sound: "Bzzz…" },
      { word: "la fleur", src: "/nomenclature/abeilles/fleur.jpg", alt: "Photo d'une fleur", sound: "Frou…" },
    ],
    twoColorSort: {
      zones: [
        { zone: "JAUNE", className: "bg-[#FFE566]/30" },
        { zone: "NOIR", className: "bg-ink/10" },
      ],
      items: ["Corps de l'abeille", "Rayures", "Ailes", "Antennes"],
    },
    sameDifferentPairs: [
      { left: PictoBee, right: PictoBee },
      { left: PictoBee, right: PictoSunflower },
      { left: PictoSunflower, right: PictoSunflower },
    ],
    coloringPictos: [PictoBee, PictoWing, PictoSunflower, PictoHive],
    pathConfig: { From: PictoBee, To: PictoHive, bubbleWord: "ABEILLE" },
    lifecycle: [
      { label: "Œuf", Picto: PictoEgg },
      { label: "Larve", photo: NOMENCLATURE_ABEILLES.find((c) => c.word === "le couvain")! },
      { label: "Nymphe", photo: NOMENCLATURE_ABEILLES.find((c) => c.word === "le couvain")! },
      { label: "Abeille", Picto: PictoBee },
    ],
    lifecycleShuffle: [2, 0, 3, 1],
    story: [
      "Sort de la ruche",
      "Se pose sur une fleur",
      "Récolte du nectar",
      "Retourne à la ruche",
      "Danse pour indiquer la fleur",
    ],
    storyShuffle: [4, 1, 0, 3, 2],
    classification: ["abeille", "fleur", "rocher", "miel", "papillon"],
    schemaParts: [
      { num: 1, word: "entrée", hint: "par où l'abeille passe" },
      { num: 2, word: "alvéole", hint: "petit hexagone de cire" },
      { num: 3, word: "couvain", hint: "où grandissent les larves" },
      { num: 4, word: "miel", hint: "réserve sucrée" },
    ],
    schemaHeroPhoto: NOMENCLATURE_ABEILLES.find((c) => c.word === "la ruche")!,
    crossword: {
      rows: 5,
      cols: 7,
      words: [
        { word: "ABEILLE", row: 1, col: 0, dir: "H", num: 1, clueH: "Insecte qui butine et vit en colonie." },
        { word: "AILE", row: 1, col: 0, dir: "V", num: 2, clueV: "Partie qui permet de voler (croise le A)." },
        { word: "MIEL", row: 0, col: 3, dir: "V", num: 3, clueV: "Substance sucrée dans la ruche (croise le I)." },
      ],
      clueH: ["1. Insecte qui butine et vit en colonie."],
      clueV: [
        "2. Partie qui permet de voler (croise le A).",
        "3. Substance sucrée dans la ruche (croise le I).",
      ],
    },
    trueFalse: [
      { text: "Toutes les abeilles font du miel.", answer: false },
      { text: "Les ouvrières butinent les fleurs.", answer: true },
      { text: "Le pollen aide les plantes.", answer: true },
    ],
    colorLegend: [
      { num: 1, name: "jaune" },
      { num: 2, name: "noir" },
      { num: 3, name: "orange" },
      { num: 4, name: "marron" },
    ],
    colorZones: [
      { zone: "Corps", num: 1 },
      { zone: "Ailes", num: 2 },
      { zone: "Fleur", num: 3 },
      { zone: "Ruche", num: 4 },
    ],
    matchPairs45: [],
    sequence45: [],
    sequence45Shuffle: [],
    seekItems45: [],
    toddlerMeta: toddlerAbeillesMeta(),
    meta45: [],
    meta67: meta67Abeilles(),
  },

  papillon: {
    id: "papillon",
    themeLabel: "Le papillon",
    catalogTitle: "Le papillon",
    themes: ["animaux"],
    season: "printemps",
    color: "leaf",
    toddlerCards: pickWords(NOMENCLATURE_PAPILLON, [
      "le papillon",
      "la chenille",
      "la fleur",
      "l'œuf",
      "la feuille",
    ]),
    cards8: pickWords(NOMENCLATURE_PAPILLON, [
      "le papillon",
      "la chenille",
      "la chrysalide",
      "la fleur",
      "l'aile",
      "l'œuf",
      "l'antenne",
      "la feuille",
    ]),
    soundWord: "Silence",
    colorPairs: swatch("rouge", "jaune", "vert", "orange", "noir"),
    colorMatchRows: [
      { label: "le papillon", Picto: PictoButterfly, colors: ["orange", "rouge"] },
      { label: "la chenille", Picto: PictoCaterpillar, colors: ["vert", "noir"] },
      { label: "la fleur", Picto: PictoBloom, colors: ["rouge", "jaune"] },
    ],
    soundItems: [
      { word: "le papillon", src: "/nomenclature/papillon/papillon.jpg", alt: "Photo d'un papillon", sound: "Silence" },
      { word: "la chenille", src: "/nomenclature/papillon/chenille.jpg", alt: "Photo d'une chenille", sound: "Crr…" },
      { word: "la fleur", src: "/nomenclature/papillon/fleur.jpg", alt: "Photo d'une fleur", sound: "Bzzz…" },
    ],
    twoColorSort: {
      zones: [
        { zone: "ORANGE", className: "bg-[#FFA94D]/30" },
        { zone: "NOIR", className: "bg-ink/10" },
      ],
      items: ["Ailes", "Corps", "Antennes", "Pattes"],
    },
    sameDifferentPairs: [
      { left: PictoButterfly, right: PictoButterfly },
      { left: PictoButterfly, right: PictoCaterpillar },
      { left: PictoBloom, right: PictoBloom },
    ],
    coloringPictos: [PictoButterfly, PictoCaterpillar, PictoLeaf, PictoBloom],
    pathConfig: { From: PictoCaterpillar, To: PictoButterfly, bubbleWord: "PAPILLON" },
    lifecycle: [
      { label: "Œuf", Picto: PictoEgg },
      { label: "Chenille", Picto: PictoCaterpillar },
      { label: "Chrysalide", Picto: PictoChrysalis },
      { label: "Papillon", Picto: PictoButterfly },
    ],
    lifecycleShuffle: [3, 0, 2, 1],
    story: [
      "Œuf sur une feuille",
      "La chenille mange",
      "Chrysalide accrochée",
      "Le papillon sort",
      "Il butine une fleur",
    ],
    storyShuffle: [2, 4, 0, 3, 1],
    classification: ["papillon", "chenille", "rocher", "fleur", "chrysalide"],
    schemaParts: [
      { num: 1, word: "tête", hint: "avec les antennes" },
      { num: 2, word: "aile", hint: "partie colorée" },
      { num: 3, word: "corps", hint: "au milieu" },
      { num: 4, word: "antenne", hint: "tout en haut" },
    ],
    schemaHeroPhoto: NOMENCLATURE_PAPILLON.find((c) => c.word === "le papillon")!,
    crossword: {
      rows: 5,
      cols: 8,
      words: [
        { word: "PAPILLON", row: 1, col: 0, dir: "H", num: 1 },
        { word: "AILE", row: 1, col: 0, dir: "V", num: 2 },
        { word: "OEUF", row: 1, col: 6, dir: "V", num: 3 },
      ],
      clueH: ["1. Insecte aux ailes colorées."],
      clueV: [
        "2. Partie qui permet de voler (croise le A).",
        "3. Première étape sur une feuille (croise le O).",
      ],
    },
    trueFalse: [
      { text: "Le papillon naît directement d'un œuf.", answer: false },
      { text: "La chenille devient chrysalide.", answer: true },
      { text: "Les papillons butinent le nectar.", answer: true },
    ],
    colorLegend: [
      { num: 1, name: "orange" },
      { num: 2, name: "noir" },
      { num: 3, name: "vert" },
      { num: 4, name: "rouge" },
    ],
    colorZones: [
      { zone: "Ailes", num: 1 },
      { zone: "Corps", num: 2 },
      { zone: "Feuille", num: 3 },
      { zone: "Fleur", num: 4 },
    ],
    matchPairs45: [],
    sequence45: [],
    sequence45Shuffle: [],
    seekItems45: [],
    toddlerMeta: toddlerMeta("Le papillon"),
    meta45: [],
    meta67: meta67("Le papillon"),
  },

  coccinelle: {
    id: "coccinelle",
    themeLabel: "La coccinelle",
    catalogTitle: "La coccinelle",
    themes: ["animaux"],
    season: "printemps",
    color: "berry",
    toddlerCards: pickWords(NOMENCLATURE_COCCINELLE, [
      "la coccinelle",
      "la feuille",
      "la fleur",
      "l'œuf",
      "le jardin",
    ]),
    cards8: pickWords(NOMENCLATURE_COCCINELLE, [
      "la coccinelle",
      "la feuille",
      "la fleur",
      "l'œuf",
      "la larve",
      "le puceron",
      "la nymphe",
      "l'antenne",
    ]),
    soundWord: "Silence",
    colorPairs: swatch("rouge", "noir", "vert", "jaune"),
    colorMatchRows: [
      { label: "la coccinelle", Picto: PictoLadybug, colors: ["rouge", "noir"] },
      { label: "la feuille", Picto: PictoLeaf, colors: ["vert", "jaune"] },
      { label: "la fleur", Picto: PictoBloom, colors: ["rouge", "jaune"] },
    ],
    soundItems: [
      { word: "la coccinelle", src: "/nomenclature/coccinelle/coccinelle.jpg", alt: "Photo d'une coccinelle", sound: "Silence" },
      { word: "la feuille", src: "/nomenclature/coccinelle/feuille.jpg", alt: "Photo d'une feuille", sound: "Frou…" },
      { word: "la fleur", src: "/nomenclature/coccinelle/fleur.jpg", alt: "Photo d'une fleur", sound: "Chuu…" },
    ],
    twoColorSort: {
      zones: [
        { zone: "ROUGE", className: "bg-[#FF6B6B]/30" },
        { zone: "NOIR", className: "bg-ink/10" },
      ],
      items: ["Élytres", "Points", "Tête", "Pattes"],
    },
    sameDifferentPairs: [
      { left: PictoLadybug, right: PictoLadybug },
      { left: PictoLadybug, right: PictoBloom },
      { left: PictoLeaf, right: PictoLeaf },
    ],
    coloringPictos: [PictoLadybug, PictoLadybug, PictoLeaf, PictoBloom],
    pathConfig: { From: PictoEgg, To: PictoLadybug, bubbleWord: "COCCINELLE" },
    lifecycle: [
      { label: "Œuf", photo: NOMENCLATURE_COCCINELLE.find((c) => c.word === "l'œuf")! },
      { label: "Larve", photo: NOMENCLATURE_COCCINELLE.find((c) => c.word === "la larve")! },
      { label: "Nymphe", photo: NOMENCLATURE_COCCINELLE.find((c) => c.word === "la nymphe")! },
      { label: "Coccinelle", Picto: PictoLadybug },
    ],
    lifecycleShuffle: [1, 3, 0, 2],
    story: [
      "Œuf sous une feuille",
      "La larve mange des pucerons",
      "Nymphe immobile",
      "La coccinelle sort",
      "Elle s'envole vers une fleur",
    ],
    storyShuffle: [3, 0, 4, 1, 2],
    classification: ["coccinelle", "puceron", "rocher", "feuille", "fleur"],
    schemaParts: [
      { num: 1, word: "tête", hint: "avec les antennes" },
      { num: 2, word: "élytre", hint: "carapace rouge" },
      { num: 3, word: "point", hint: "tache noire" },
      { num: 4, word: "patte", hint: "pour marcher" },
    ],
    schemaHeroPhoto: NOMENCLATURE_COCCINELLE.find((c) => c.word === "la coccinelle")!,
    crossword: {
      rows: 6,
      cols: 8,
      words: [
        { word: "ROUGE", row: 2, col: 1, dir: "H", num: 1 },
        { word: "OEUF", row: 2, col: 2, dir: "V", num: 2 },
        { word: "PUCERON", row: 4, col: 0, dir: "H", num: 3 },
      ],
      clueH: [
        "1. Couleur des élytres de la coccinelle.",
        "3. Petit insecte que la larve mange (croise le U).",
      ],
      clueV: ["2. Première étape sous une feuille (croise le O)."],
    },
    trueFalse: [
      { text: "La coccinelle a toujours 7 points.", answer: false },
      { text: "Elle mange des pucerons.", answer: true },
      { text: "La larve est aussi rouge que l'adulte.", answer: false },
    ],
    colorLegend: [
      { num: 1, name: "rouge" },
      { num: 2, name: "noir" },
      { num: 3, name: "vert" },
      { num: 4, name: "jaune" },
    ],
    colorZones: [
      { zone: "Corps", num: 1 },
      { zone: "Points", num: 2 },
      { zone: "Feuille", num: 3 },
      { zone: "Fleur", num: 4 },
    ],
    matchPairs45: [],
    sequence45: [],
    sequence45Shuffle: [],
    seekItems45: [],
    toddlerMeta: toddlerMeta("La coccinelle"),
    meta45: [],
    meta67: meta67("La coccinelle"),
  },

  serpent: {
    id: "serpent",
    themeLabel: "Le serpent",
    catalogTitle: "Le serpent",
    themes: ["animaux"],
    season: "ete",
    color: "leaf",
    toddlerCards: pickWords(NOMENCLATURE_SERPENT, [
      "le serpent",
      "l'écaille",
      "le désert",
      "l'œuf",
      "la forêt",
    ]),
    cards8: pickWords(NOMENCLATURE_SERPENT, [
      "le serpent",
      "l'écaille",
      "la langue",
      "l'œuf",
      "le désert",
      "la forêt",
      "la mue",
      "la tête",
    ]),
    soundWord: "Ssss",
    colorPairs: swatch("vert", "marron", "jaune", "noir"),
    colorMatchRows: [
      { label: "le serpent", Picto: PictoSnake, colors: ["vert", "marron"] },
      { label: "le désert", Picto: PictoScale, colors: ["jaune", "marron"] },
      { label: "la forêt", Picto: PictoLeaf, colors: ["vert", "marron"] },
    ],
    soundItems: [
      { word: "le serpent", src: "/nomenclature/serpent/serpent.jpg", alt: "Photo d'un serpent", sound: "Ssss !" },
      { word: "le sable", src: "/nomenclature/serpent/sable.jpg", alt: "Photo de sable", sound: "Chhh…" },
      { word: "la forêt", src: "/nomenclature/serpent/foret.jpg", alt: "Photo d'une forêt", sound: "Cui cui…" },
    ],
    twoColorSort: {
      zones: [
        { zone: "VERT", className: "bg-[#7BC67E]/30" },
        { zone: "MARRON", className: "bg-[#C4A574]/30" },
      ],
      items: ["Corps", "Écailles", "Tête", "Queue"],
    },
    sameDifferentPairs: [
      { left: PictoSnake, right: PictoSnake },
      { left: PictoSnake, right: PictoScale },
      { left: PictoTongue, right: PictoTongue },
    ],
    coloringPictos: [PictoSnake, PictoScale, PictoEgg, PictoTongue],
    pathConfig: { From: PictoEgg, To: PictoSnake, bubbleWord: "SERPENT" },
    lifecycle: [
      { label: "Œuf", photo: NOMENCLATURE_SERPENT.find((c) => c.word === "l'œuf")! },
      { label: "Jeune", Picto: PictoSnake },
      { label: "Mue", photo: NOMENCLATURE_SERPENT.find((c) => c.word === "la mue")! },
      { label: "Adulte", photo: NOMENCLATURE_SERPENT.find((c) => c.word === "le serpent")! },
    ],
    lifecycleShuffle: [2, 0, 3, 1],
    story: [
      "Sort de l'œuf",
      "Cherche un abri",
      "Chasse une proie",
      "Change de peau",
      "Se repose au soleil",
    ],
    storyShuffle: [4, 1, 0, 3, 2],
    classification: ["serpent", "rocher", "sable", "écaille", "forêt"],
    schemaParts: [
      { num: 1, word: "tête", hint: "avec les yeux" },
      { num: 2, word: "écaille", hint: "couvre le corps" },
      { num: 3, word: "langue", hint: "fourchue" },
      { num: 4, word: "queue", hint: "à l'arrière" },
    ],
    schemaHeroPhoto: NOMENCLATURE_SERPENT.find((c) => c.word === "le serpent")!,
    crossword: {
      rows: 5,
      cols: 8,
      words: [
        { word: "SERPENT", row: 1, col: 0, dir: "H", num: 1 },
        { word: "OEUF", row: 0, col: 4, dir: "V", num: 2 },
        { word: "MUE", row: 2, col: 3, dir: "H", num: 3 },
      ],
      clueH: [
        "1. Reptile au corps long.",
        "3. Quand il change de peau (croise le U).",
      ],
      clueV: ["2. Première étape dans un nid (croise le E)."],
    },
    trueFalse: [
      { text: "Tous les serpents sont venimeux.", answer: false },
      { text: "Le serpent mue plusieurs fois.", answer: true },
      { text: "Il a des pattes.", answer: false },
    ],
    colorLegend: [
      { num: 1, name: "vert" },
      { num: 2, name: "marron" },
      { num: 3, name: "jaune" },
      { num: 4, name: "noir" },
    ],
    colorZones: [
      { zone: "Corps", num: 1 },
      { zone: "Écailles", num: 2 },
      { zone: "Sable", num: 3 },
      { zone: "Rocher", num: 4 },
    ],
    matchPairs45: [],
    sequence45: [],
    sequence45Shuffle: [],
    seekItems45: [],
    toddlerMeta: toddlerMeta("Le serpent"),
    meta45: [],
    meta67: meta67("Le serpent"),
  },

  tournesols: {
    id: "tournesols",
    themeLabel: "Les tournesols",
    catalogTitle: "Les tournesols",
    themes: ["botanique"],
    season: "ete",
    color: "sun",
    toddlerCards: pickWords(NOMENCLATURE_TOURNESOL, [
      "le tournesol",
      "la graine",
      "la feuille",
      "le soleil",
      "l'abeille",
    ]),
    cards8: pickWords(NOMENCLATURE_TOURNESOL, [
      "le tournesol",
      "la graine",
      "la feuille",
      "la tige",
      "le soleil",
      "l'abeille",
      "le pétale",
      "le pollen",
    ]),
    soundWord: "Silence",
    colorPairs: swatch("jaune", "vert", "marron", "orange"),
    colorMatchRows: [
      { label: "le tournesol", Picto: PictoSunflower, colors: ["jaune", "marron"] },
      { label: "la feuille", Picto: PictoLeaf, colors: ["vert", "jaune"] },
      { label: "le soleil", Picto: PictoSun, colors: ["jaune", "orange"] },
    ],
    soundItems: [],
    twoColorSort: { zones: [], items: [] },
    sameDifferentPairs: [],
    coloringPictos: [PictoSunflower, PictoSun, PictoStem, PictoLeaf],
    pathConfig: { From: PictoSeed, To: PictoSunflower, bubbleWord: "TOURNESOL" },
    lifecycle: [],
    lifecycleShuffle: [],
    story: [],
    storyShuffle: [],
    classification: [],
    schemaParts: [],
    schemaHeroPhoto: NOMENCLATURE_TOURNESOL.find((c) => c.word === "le tournesol")!,
    crossword: { rows: 0, cols: 0, words: [], clueH: [], clueV: [] },
    trueFalse: [],
    colorLegend: [
      { num: 1, name: "jaune" },
      { num: 2, name: "marron" },
      { num: 3, name: "vert" },
      { num: 4, name: "orange" },
    ],
    colorZones: [
      { zone: "Pétales", num: 1 },
      { zone: "Cœur", num: 2 },
      { zone: "Tige", num: 3 },
      { zone: "Feuille", num: 4 },
    ],
    matchPairs45: [
      { photo: NOMENCLATURE_TOURNESOL.find((c) => c.word === "le soleil")!, label: "fait pousser la plante" },
      { photo: NOMENCLATURE_TOURNESOL.find((c) => c.word === "l'abeille")!, label: "transporte le pollen" },
      { photo: NOMENCLATURE_TOURNESOL.find((c) => c.word === "la graine")!, label: "devient une nouvelle plante" },
      { photo: NOMENCLATURE_TOURNESOL.find((c) => c.word === "la racine")!, label: "boit l'eau du sol" },
    ],
    sequence45: [
      { label: "Graine", Picto: PictoSeed },
      { label: "Germe", Picto: PictoSprout },
      { label: "Tige", Picto: PictoStem },
      { label: "Fleur", Picto: PictoSunflower },
    ],
    sequence45Shuffle: [2, 0, 3, 1],
    seekItems45: [
      { word: "le tournesol", src: "/nomenclature/tournesol/tournesol.jpg", alt: "Photo d'un tournesol" },
      { word: "l'abeille", src: "/nomenclature/tournesol/abeille.jpg", alt: "Photo d'une abeille" },
      { word: "la graine", src: "/nomenclature/tournesol/graine.jpg", alt: "Photo de graines" },
      { word: "le soleil", src: "/nomenclature/tournesol/soleil.jpg", alt: "Photo du soleil" },
    ],
    toddlerMeta: [],
    meta45: meta45("Les tournesols"),
    meta67: [],
  },

  ocean: {
    id: "ocean",
    themeLabel: "L'océan",
    catalogTitle: "L'océan",
    themes: ["continents"],
    season: "ete",
    color: "sky",
    toddlerCards: [],
    cards8: pickWords(NOMENCLATURE_OCEAN, [
      "le poisson",
      "la baleine",
      "le coquillage",
      "la vague",
      "la pieuvre",
      "le bateau",
      "la mer",
      "le corail",
    ]),
    soundWord: "Plouf",
    colorPairs: swatch("bleu", "jaune", "marron", "vert"),
    colorMatchRows: [],
    soundItems: [],
    twoColorSort: { zones: [], items: [] },
    sameDifferentPairs: [],
    coloringPictos: [PictoOceanWave, PictoFish, PictoBoat, PictoShell],
    pathConfig: { From: PictoFish, To: PictoShell, bubbleWord: "OCEAN" },
    lifecycle: [
      { label: "Œuf", photo: NOMENCLATURE_OCEAN.find((c) => c.word === "le poisson")! },
      { label: "Alevin", Picto: PictoFish },
      { label: "Jeune", Picto: PictoFish },
      { label: "Adulte", photo: NOMENCLATURE_OCEAN.find((c) => c.word === "le poisson")! },
    ],
    lifecycleShuffle: [1, 3, 0, 2],
    story: [
      "Le poisson nage",
      "Il cherche à manger",
      "Il se cache dans les algues",
      "Il rejoint le banc",
      "Il dort près du corail",
    ],
    storyShuffle: [2, 4, 0, 3, 1],
    classification: ["poisson", "corail", "rocher", "bateau", "algue"],
    schemaParts: [
      { num: 1, word: "nageoire", hint: "pour nager" },
      { num: 2, word: "écaille", hint: "couvre le corps" },
      { num: 3, word: "œil", hint: "pour voir" },
      { num: 4, word: "queue", hint: "pousse l'eau" },
    ],
    schemaHeroPhoto: NOMENCLATURE_OCEAN.find((c) => c.word === "le poisson")!,
    crossword: {
      rows: 5,
      cols: 7,
      words: [
        { word: "MER", row: 2, col: 2, dir: "H", num: 1 },
        { word: "EAU", row: 2, col: 3, dir: "V", num: 2 },
        { word: "VAGUE", row: 3, col: 1, dir: "H", num: 3 },
      ],
      clueH: [
        "1. Grande étendue salée.",
        "3. Soulève l'eau au vent (croise le A).",
      ],
      clueV: ["2. Liquide de la mer (croise le E)."],
    },
    trueFalse: [
      { text: "Les poissons respirent sous l'eau.", answer: true },
      { text: "Le corail est une plante.", answer: false },
      { text: "Les baleines sont des poissons.", answer: false },
    ],
    colorLegend: [
      { num: 1, name: "bleu" },
      { num: 2, name: "jaune" },
      { num: 3, name: "vert" },
      { num: 4, name: "marron" },
    ],
    colorZones: [
      { zone: "Mer", num: 1 },
      { zone: "Poisson", num: 2 },
      { zone: "Vague", num: 3 },
      { zone: "Coquillage", num: 4 },
    ],
    matchPairs45: [],
    sequence45: [],
    sequence45Shuffle: [],
    seekItems45: [],
    toddlerMeta: [],
    meta45: [],
    meta67: meta67("L'océan"),
  },

  cerise: {
    id: "cerise",
    themeLabel: "La cerise",
    catalogTitle: "La cerise",
    themes: ["botanique"],
    season: "printemps",
    color: "berry",
    toddlerCards: [],
    cards8: pickWords(NOMENCLATURE_CERISE, [
      "la cerise",
      "la fleur",
      "l'arbre",
      "le panier",
      "la feuille",
      "le noyau",
      "la branche",
      "le pétale",
    ]),
    soundWord: "Silence",
    colorPairs: swatch("rouge", "vert", "marron", "jaune"),
    colorMatchRows: [],
    soundItems: [],
    twoColorSort: { zones: [], items: [] },
    sameDifferentPairs: [],
    coloringPictos: [PictoCherryFruit, PictoCherryFlower, PictoCherryLeaf, PictoCherryTree],
    pathConfig: { From: PictoCherryFlower, To: PictoCherryFruit, bubbleWord: "CERISE" },
    lifecycle: [],
    lifecycleShuffle: [],
    story: [],
    storyShuffle: [],
    classification: [],
    schemaParts: [],
    schemaHeroPhoto: NOMENCLATURE_CERISE.find((c) => c.word === "l'arbre")!,
    crossword: { rows: 0, cols: 0, words: [], clueH: [], clueV: [] },
    trueFalse: [],
    colorLegend: [
      { num: 1, name: "rouge" },
      { num: 2, name: "vert" },
      { num: 3, name: "marron" },
      { num: 4, name: "jaune" },
    ],
    colorZones: [
      { zone: "Fruit", num: 1 },
      { zone: "Fleur", num: 2 },
      { zone: "Feuille", num: 3 },
      { zone: "Tronc", num: 4 },
    ],
    matchPairs45: [
      { photo: NOMENCLATURE_CERISE.find((c) => c.word === "la fleur")!, label: "devient un fruit" },
      { photo: NOMENCLATURE_CERISE.find((c) => c.word === "le soleil")!, label: "fait mûrir les cerises" },
      { photo: NOMENCLATURE_CERISE.find((c) => c.word === "l'oiseau")!, label: "peut manger une cerise" },
      { photo: NOMENCLATURE_CERISE.find((c) => c.word === "le noyau")!, label: "est au centre du fruit" },
    ],
    sequence45: [
      { label: "Bourgeon", Picto: PictoCherryFlower },
      { label: "Fleur", Picto: PictoCherryFlower },
      { label: "Fruit vert", Picto: PictoCherryFruit },
      { label: "Cerise rouge", Picto: PictoCherryFruit },
    ],
    sequence45Shuffle: [3, 0, 2, 1],
    seekItems45: [
      { word: "la cerise", src: "/nomenclature/cerise/cerise.jpg", alt: "Photo de cerises" },
      { word: "la fleur", src: "/nomenclature/cerise/fleur.jpg", alt: "Photo de fleurs de cerisier" },
      { word: "l'arbre", src: "/nomenclature/cerise/arbre.jpg", alt: "Photo d'un cerisier" },
      { word: "le panier", src: "/nomenclature/cerise/panier.jpg", alt: "Photo d'un panier de fruits" },
    ],
    toddlerMeta: [],
    meta45: meta45("La cerise"),
    meta67: [],
  },
}

function toddlerAbeillesMeta(): LivretActivityMeta[] {
  return [
    meta(1, "Cartes à nommer", "Nomenclature (oral)", "Nommer les images à voix haute", "Montre une photo. Dis le mot ensemble.", "Cinq mots simples du thème.", note("fact", "Les abeilles vivent en groupe dans une ruche, près des fleurs."), ["Quelle photo te plaît le plus ?"]),
    meta(2, "Je colorie", "Coloriage grand format", "Colorier librement", "Colorie l'abeille et la fleur. Gros gestes !", "L'abeille butine sur les fleurs.", note("fact", "Les abeilles aiment les fleurs jaunes et orange."), ["Quelle couleur choisis-tu pour la fleur ?"]),
    meta(3, "La bonne couleur", "Association couleur", "Relier chaque image à sa couleur", "Montre la bonne couleur. Puis colorie.", "L'abeille est souvent jaune et noire.", undefined, ["De quelle couleur est l'abeille chez nous ?"]),
    meta(4, "Bzzz !", "Son / imitation", "Imiter le bourdonnement", "Écoute. Imite le son : Bzzz !", "L'abeille fait « bzzz » avec ses ailes.", note("fact", "Le bourdonnement vient du battement très rapide des ailes."), ["Peux-tu faire un bzzz tout doux, puis plus fort ?"]),
    meta(5, "Jaune ou noir ?", "Tri 2 couleurs", "Distinguer jaune et noir", "Entoure en jaune ou en noir. Dis la couleur.", "Le corps alterne jaune et noir.", undefined, ["Où vois-tu du jaune sur l'abeille ?"]),
    meta(6, "Pareil ou pas ?", "Même / différent", "Comparer deux images", "Regarde les deux images. Entoure PAREIL ou PAS PAREIL.", "Deux abeilles se ressemblent. Abeille et fleur diffèrent.", undefined, ["Qu'est-ce qui est pareil ? Qu'est-ce qui change ?"]),
  ]
}

function toddlerMeta(themeLabel: string): LivretActivityMeta[] {
  return [
    meta(1, "Cartes à nommer", "Nomenclature (oral)", "Nommer les images", "Montre une photo. Dis le mot ensemble.", "Cinq mots du thème.", note("fact", `Découvre le vocabulaire de ${themeLabel.toLowerCase()}.`), ["Quelle photo te plaît le plus ?", "Peux-tu montrer avec ton doigt ?"]),
    meta(2, "Je colorie", "Coloriage grand format", "Colorier librement", "Colorie la scène. Gros gestes !", "Colorie comme tu veux.", note("fact", "Observer aide à reconnaître les formes."), ["Quelle couleur choisis-tu en premier ?", "Où vois-tu cette forme dehors ?"]),
    meta(3, "La bonne couleur", "Association couleur", "Relier image et couleur", "Montre la bonne couleur. Puis colorie.", "Chaque image a ses couleurs.", note("fact", "Nommer les couleurs enrichit le vocabulaire."), ["Quelle couleur vois-tu sur la photo ?", "As-tu vu ces couleurs dans la nature ?"]),
    meta(4, "Son / imitation", "Son / imitation", "Imiter un son", "Écoute. Imite le son indiqué.", "Certains animaux font un son.", note("fact", "Les sons aident à reconnaître les animaux."), ["Peux-tu imiter tout doux, puis plus fort ?", "Quel son entends-tu dehors ?"]),
    meta(5, "Deux couleurs", "Tri 2 couleurs", "Trier par couleur", "Entoure la bonne couleur. Dis-la à voix haute.", "Observe les couleurs sur l'image.", note("fact", "Comparer deux couleurs, c'est déjà classer."), ["Quelle couleur domine ?", "Peux-tu trouver la même couleur ailleurs ?"]),
    meta(6, "Pareil ou pas ?", "Même / différent", "Comparer", "Entoure PAREIL ou PAS PAREIL.", "Compare les deux images.", note("fact", "Comparer entraîne l'observation."), ["Qu'est-ce qui change ?", "Qu'est-ce qui est pareil ?"]),
  ]
}

function meta45(themeLabel: string): LivretActivityMeta[] {
  return [
    meta(1, "Cartes de nomenclature", "Nomenclature enrichie", "Associer image et mot", "Découpe les mots. Associe chaque photo.", "Huit mots du thème.", note("fact", `Vocabulaire de ${themeLabel.toLowerCase()}.`), ["Quel mot connais-tu déjà ?", "Peux-tu le dire à voix haute en montrant la photo ?"]),
    meta(2, "Coloriage codé", "Coloriage codé", "Colorier selon les numéros", "Colorie chaque zone avec la bonne couleur.", "Chaque numéro = une couleur.", note("fact", "Observer les détails aide à nommer."), ["Quelle zone colories-tu en premier ?", "À quoi ressemble cet élément dans la nature ?"]),
    meta(3, "À quoi ça sert ?", "Relier image ↔ fonction", "Relier photo et rôle", "Relie chaque photo à ce qu'elle fait.", "Chaque élément a un rôle.", note("hypothesis", "Pourquoi la plante a-t-elle besoin du soleil ?"), ["Peux-tu expliquer avec tes mots ?", "As-tu déjà vu ça dehors ?"]),
    meta(4, "Dans quel ordre ?", "Séquence images", "Ordonner des étapes", "Les cartes sont mélangées. Numérote de 1 à 4.", "Une histoire a un ordre.", note("fact", "Les plantes changent au fil du temps."), ["Que se passe-t-il avant ?", "Raconte l'histoire dans l'ordre."]),
    meta(5, "Je cherche", "Cherche-et-trouve", "Trouver des images", "Entoure chaque objet demandé.", "Regarde bien chaque photo.", note("fact", "Chercher dans une image entraîne l'œil."), ["Lequel était le plus difficile ?", "Pourquoi cet objet est-il important ?"]),
    meta(6, "Vivant ou pas ?", "Tri catégories", "Classer vivant / non vivant", "Colorie VIVANT ou NON. Explique.", "Certains éléments sont vivants.", note("fact", "Une fleur est vivante ; un panier ne l'est pas."), ["Le fruit est-il vivant ?", "Comment le sais-tu ?"]),
    meta(7, "Mes chemins", "Tracés progressifs", "Tracer du facile au difficile", "Trace les 3 chemins du plus facile au défi. Puis colorie les bonnes bulles.", "La motricité fine s'entraîne par étapes.", note("fact", "Tracer aide la main avant l'écriture."), ["Quel chemin as-tu préféré ?", "Peux-tu nommer les pictos de départ et d'arrivée ?"]),
  ]
}

function meta67(themeLabel: string): LivretActivityMeta[] {
  return [
    meta(1, "Coloriage codé", "Coloriage codé", "Colorier selon les numéros", "Colorie chaque zone avec la bonne couleur.", "Chaque numéro = une couleur.", note("fact", `Découverte de ${themeLabel.toLowerCase()}.`), ["Quelle zone as-tu coloriée en premier ?", "Quelle couleur correspond au numéro 3 ?"]),
    meta(2, "Cartes de nomenclature", "Nomenclature", "Associer image et mot", "Découpe les mots. Associe chaque photo.", "Huit mots clés.", note("fact", "Le vocabulaire précis aide à observer."), ["Quelle carte te plaît le plus ?", "Peux-tu utiliser le mot dans une phrase ?"]),
    meta(3, "Légende l'image", "Schéma légendé", "Nommer les parties", "Écris chaque mot dans la bonne case.", "Chaque partie a un nom.", note("hypothesis", "À quoi sert chaque partie ?"), ["Peux-tu montrer sur la photo ?", "Le savais-tu : chaque partie a un rôle précis."]),
    meta(4, "Vivant ou pas ?", "Classification", "Distinguer vivant / non vivant", "Colorie VIVANT ou NON. Explique à voix haute.", "Observer pour classer.", note("fact", "Tous les éléments ne sont pas vivants."), ["Quel mot t'a surpris ?", "Pourquoi as-tu choisi vivant ou non ?"]),
    meta(5, "Dans quel ordre ?", "Frise", "Ordonner un cycle", "Les cartes sont mélangées. Numérote de 1 à 4.", "Un cycle a plusieurs étapes.", note("fact", "Les êtres vivants changent."), ["En quoi c'est pareil ou différent d'un autre animal ?", "Raconte le cycle comme une histoire."]),
    meta(6, "Mes chemins", "Tracés progressifs", "Tracer du facile au difficile", "Trace les 3 chemins. Colorie les bulles du mot indiqué.", "Motricité et lecture se rejoignent.", note("fact", "Les tracés préparent l'écriture cursive."), ["Quel chemin était le plus difficile ?", "Retrouve les lettres du mot dans les bulles."]),
    meta(7, "Vrai ou faux", "Vrai / faux", "Vérifier des affirmations", "Entoure VRAI ou FAUX.", "Lis chaque phrase.", note("fact", "Vérifier une affirmation, c'est réfléchir."), ["Comment sais-tu que c'est vrai ou faux ?", "As-tu une expérience qui le confirme ?"]),
    meta(8, "Mots croisés", "Mots croisés", "Réviser le vocabulaire", "Écris les mots en MAJUSCULES dans la grille.", "Les mots se croisent.", note("fact", "Les mots croisés renforcent l'orthographe."), ["Peux-tu faire une phrase avec deux mots ?", "Quel mot du thème connais-tu le mieux ?"]),
  ]
}

function meta67Abeilles(): LivretActivityMeta[] {
  return [
    meta(1, "Coloriage codé", "Coloriage codé (additions)", "Résoudre des additions simples", "Résous chaque addition. Colorie avec la bonne couleur.", "Chaque zone a une addition.", note("fact", "Les abeilles domestiques vivent en colonies dans une ruche."), ["Pourquoi les abeilles vont-elles vers les fleurs ?", "Quelle couleur as-tu utilisée pour la ruche ?"]),
    meta(2, "Cartes de nomenclature", "Nomenclature", "Associer image et mot", "Découpe les mots. Associe chaque photo.", "Huit mots clés du thème abeilles.", note("fact", "Une colonie compte une reine, des ouvrières et des mâles."), ["Quelle carte te plaît le plus ?", "Peux-tu nommer trois parties de la ruche ?"]),
    meta(3, "Légende la ruche", "Schéma légendé", "Nommer les parties de la ruche", "Écris chaque mot dans la case qui va avec.", "Une ruche a plusieurs parties.", note("hypothesis", "Les abeilles dansent pour indiquer où trouver du nectar."), ["À quoi sert chaque partie selon toi ?", "As-tu déjà vu une ruche ?"]),
    meta(4, "Vivant ou pas ?", "Classification", "Distinguer vivant / non vivant", "Colorie VIVANT ou NON. Explique à voix haute.", "L'abeille est vivante ; le miel est fabriqué.", note("fact", "Le miel est fabriqué par les abeilles à partir du nectar."), ["Le miel est-il vivant ? Pourquoi ?", "Le pollen est-il vivant ?"]),
    meta(5, "De l'œuf à l'abeille", "Frise", "Ordonner le cycle de vie", "Les cartes sont mélangées. Numérote de 1 à 4.", "Œuf → larve → nymphe → abeille.", note("fact", "Les ouvrières nourrissent la larve."), ["En quoi c'est pareil ou différent du papillon ?", "Raconte le cycle à voix haute."]),
    meta(6, "Mes chemins", "Tracés progressifs", "Tracer du facile au difficile", "Trace les 3 chemins. Colorie les bulles du mot ABEILLE.", "Motricité et lecture se rejoignent.", note("fact", "Les tracés préparent l'écriture cursive."), ["Quel chemin était le plus difficile ?", "Retrouve les lettres de ABEILLE dans les bulles."]),
    meta(7, "Vrai ou faux", "Vrai / faux", "Vérifier des affirmations", "Entoure VRAI ou FAUX.", "Seules les ouvrières butinent.", note("fact", "Les faux-bourdons ne butinent pas."), ["Comment sais-tu que c'est vrai ou faux ?", "Peux-tu expliquer à un plus jeune ?"]),
    meta(8, "Mots croisés", "Mots croisés", "Réviser le vocabulaire", "Écris les mots en MAJUSCULES.", "Mots clés : abeille, aile, miel.", note("fact", "Les mots croisés renforcent l'orthographe."), ["Peux-tu faire une phrase avec deux mots ?", "Quel mot du thème connais-tu le mieux ?"]),
  ]
}

function meta(
  index: number,
  title: string,
  pedagogicalType: string,
  objective: string,
  childInstruction: string,
  learns: string,
  scientificNote?: { kind: ScientificNoteKind; text: string },
  parentQuestions: string[] = ["Qu'as-tu remarqué ?"],
): LivretActivityMeta {
  return {
    index,
    title,
    pedagogicalType,
    objective,
    skills: [],
    material: [],
    childInstruction,
    steps: [],
    learns,
    scientificNote,
    parentQuestions,
  }
}

export function getLivretDef(id: LivretThemeId): LivretThemeDef {
  return LIVRET_THEME_DEFS[id]
}
