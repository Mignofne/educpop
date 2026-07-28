import type { AgeGroup } from "@/lib/activities"
import { NomenclatureCards } from "./nomenclature-cards"
import { NOMENCLATURE_MOYEN_AGE } from "@/lib/worksheets/nomenclature-sets"

export function MoyenAgeVocab({ age = "4-5" }: { age?: AgeGroup }) {
  return (
    <NomenclatureCards
      title="Cartes de nomenclature — Moyen Âge"
      footerNote={`Vocabulaire · Moyen Âge · ${age} ans · photos`}
      accent="tangerine"
      cards={NOMENCLATURE_MOYEN_AGE}
      age={age}
    />
  )
}
