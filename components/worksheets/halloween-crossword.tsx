import { ThemeCrossword } from "./theme-crossword"

/**
 * Mots croisés Halloween — 8–10.
 * Intersections vérifiées :
 *   OCTOBRE H @ (2,0) — O(2,4)=B
 *   BONBON  V @ (2,4)
 *   LUNE    H @ (4,2) — N(4,4)=N
 */
export function HalloweenCrossword() {
  return (
    <ThemeCrossword
      title="Mots croisés d'automne"
      footerNote="Mots croisés · Halloween · 8–10 ans"
      accent="berry"
      rows={7}
      cols={8}
      words={[
        { word: "OCTOBRE", row: 2, col: 0, dir: "H", num: 1 },
        { word: "BONBON", row: 2, col: 4, dir: "V", num: 2 },
        { word: "LUNE", row: 4, col: 2, dir: "H", num: 3 },
      ]}
      across={[
        { n: 1, text: "Dixième mois de l'année, quand a lieu Halloween." },
        { n: 3, text: "Astre qui brille dans le ciel nocturne d'automne." },
      ]}
      down={[{ n: 2, text: "Friandise qu'on partage le soir d'Halloween." }]}
    />
  )
}
