import { ThemeCrossword } from "./theme-crossword"

/**
 * Mots croisés Asie — 8–10.
 * Intersections vérifiées :
 *   CHINE H @ (2,0)
 *   INDE  V @ (2,2) — I(2,2)=I
 *   JAPON H @ (4,2) — J(4,2)=N
 */
export function AsiaCrossword() {
  return (
    <ThemeCrossword
      title="Mots croisés d'Asie"
      footerNote="Mots croisés · Asie · 8–10 ans"
      accent="berry"
      rows={7}
      cols={8}
      words={[
        { word: "CHINE", row: 2, col: 0, dir: "H", num: 1 },
        { word: "INDE", row: 2, col: 2, dir: "V", num: 2 },
        { word: "JAPON", row: 4, col: 2, dir: "H", num: 3 },
      ]}
      across={[
        { n: 1, text: "Grand pays d'Asie, berceau du panda géant." },
        { n: 3, text: "Archipel d'Asie de l'Est, connu pour le mont Fuji." },
      ]}
      down={[{ n: 2, text: "Pays d'Asie du Sud, connu pour ses éléphants." }]}
    />
  )
}
