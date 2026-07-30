import { ThemeCrossword } from "./theme-crossword"

/**
 * Mots croisés Noël — 8–10.
 * Intersections vérifiées :
 *   HIVER  H @ (2,0)
 *   RENNE  V @ (2,4) croise R
 *   NEIGE  H @ (4,4) croise N
 */
export function NoelCrossword() {
  return (
    <ThemeCrossword
      title="Mots croisés de l'hiver"
      footerNote="Mots croisés · Noël · 8–10 ans"
      accent="berry"
      rows={7}
      cols={9}
      words={[
        { word: "HIVER", row: 2, col: 0, dir: "H", num: 1 },
        { word: "RENNE", row: 2, col: 4, dir: "V", num: 2 },
        { word: "NEIGE", row: 4, col: 4, dir: "H", num: 3 },
      ]}
      across={[
        { n: 1, text: "Saison froide où il peut neiger." },
        { n: 3, text: "Flocons blancs qui tombent du ciel en hiver." },
      ]}
      down={[{ n: 2, text: "Mammifère arctique qui tire le traîneau dans les histoires." }]}
    />
  )
}
