import { ThemeCrossword } from "./theme-crossword"

/**
 * Mots croisés Noël — 8–10 (structure type pirate).
 * Intersections vérifiées :
 *   RENNE  H @ (1,0)
 *   NEIGE  V @ (0,1) croise E
 *   HIVER  H @ (2,1) croise I
 *   CADEAU H @ (4,1) croise E
 */
export function NoelCrossword() {
  return (
    <ThemeCrossword
      title="Mots croisés de l'hiver"
      footerNote="Mots croisés · Noël · 8–10 ans"
      accent="berry"
      rows={6}
      cols={7}
      words={[
        { word: "RENNE", row: 1, col: 0, dir: "H", num: 1 },
        { word: "NEIGE", row: 0, col: 1, dir: "V", num: 2 },
        { word: "HIVER", row: 2, col: 1, dir: "H", num: 3 },
        { word: "CADEAU", row: 4, col: 1, dir: "H", num: 4 },
      ]}
      across={[
        { n: 1, text: "Mammifère arctique qui tire le traîneau dans les histoires." },
        { n: 3, text: "Saison froide où il peut neiger." },
        { n: 4, text: "Objet emballé qu'on offre à Noël." },
      ]}
      down={[{ n: 2, text: "Flocons blancs qui tombent du ciel en hiver." }]}
    />
  )
}
