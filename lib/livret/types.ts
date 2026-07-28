/** Métadonnées pédagogiques d'une activité de livret (génération IA + rendu print). */

export type ScientificNoteKind = "fact" | "hypothesis" | "uncertain"

export type LivretActivityMeta = {
  index: number
  title: string
  pedagogicalType: string
  objective: string
  skills: string[]
  material: string[]
  childInstruction: string
  steps: string[]
  easyVariant?: string
  hardVariant?: string
  learns: string
  scientificNote?: { kind: ScientificNoteKind; text: string }
  parentQuestions: string[]
}

export type LivretParentIntro = {
  objectives: string[]
  parentRole: string
  duration: string
  material: string[]
}

export type LivretSpec = {
  theme: string
  age: "1-2" | "2-3" | "4-5" | "6-7" | "8-10"
  title: string
  subtitle: string
  intro: LivretParentIntro
  activities: LivretActivityMeta[]
  resources: { label: string; url?: string }[]
}
