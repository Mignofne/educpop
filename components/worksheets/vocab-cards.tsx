import { NomenclatureCards } from "./nomenclature-cards"
import { NOMENCLATURE_ANIMAUX } from "@/lib/worksheets/nomenclature-sets"

/**
 * Cartes nomenclature (photos Commons) — composant interne.
 * Pas un produit catalogue : pas de pack « Les animaux » fourre-tout.
 * Réutiliser les photos dans des thèmes dédiés si besoin.
 */
export function VocabCards() {
  return (
    <NomenclatureCards
      title="Cartes de nomenclature — nature"
      footerNote="Vocabulaire · photos Commons · composant interne"
      accent="tangerine"
      cards={NOMENCLATURE_ANIMAUX}
      age="4-5"
    />
  )
}
