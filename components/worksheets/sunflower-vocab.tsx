import type { AgeGroup } from "@/lib/activities"
import { NomenclatureCards } from "./nomenclature-cards"
import { NOMENCLATURE_TOURNESOL } from "@/lib/worksheets/nomenclature-sets"

/** Nomenclature tournesol — photos libres (Commons) — toujours 12 cartes */
export function SunflowerVocab({ age = "4-5" }: { age?: AgeGroup }) {
  return (
    <NomenclatureCards
      title={
        age === "2-3"
          ? "Cartes à nommer — tournesol"
          : age === "8-10"
            ? "Nomenclature — à associer & écrire"
            : age === "6-7"
              ? "Nomenclature — à associer"
              : "Cartes de nomenclature — tournesol"
      }
      footerNote={`Vocabulaire · tournesol · ${age} ans · photos`}
      accent="leaf"
      cards={NOMENCLATURE_TOURNESOL}
      age={age}
    />
  )
}
