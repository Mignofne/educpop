import { ThemeCrossword } from "./theme-crossword"

/**
 * Mots croisés Asie — 8–10.
 * Intersections vérifiées :
 *   CHINE  H @ (0,2)
 *   INDE   V @ (0,4) croise I
 *   PAGODE H @ (2,0) croise D
 */
export function AsiaCrossword() {
  return (
    <ThemeCrossword
      title="Mots croisés d'Asie"
      footerNote="Mots croisés · Asie · 8–10 ans"
      accent="berry"
      rows={5}
      cols={8}
      words={[
        { word: "CHINE", row: 0, col: 2, dir: "H", num: 1 },
        { word: "INDE", row: 0, col: 4, dir: "V", num: 2 },
        { word: "PAGODE", row: 2, col: 0, dir: "H", num: 3 },
      ]}
      across={[
        { n: 1, text: "Grand pays d'Asie, berceau du panda géant." },
        { n: 3, text: "Temple traditionnel à étages, souvent en Asie." },
      ]}
      down={[{ n: 2, text: "Pays d'Asie du Sud, connu pour ses éléphants." }]}
    />
  )
}
