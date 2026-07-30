import { ThemeCrossword } from "./theme-crossword"

/**
 * Mots croisés océan — 8–10.
 * Intersections vérifiées :
 *   MER   H @ (2,2)
 *   EAU   V @ (2,3) croise E
 *   VAGUE H @ (3,2) croise A
 */
export function OceanCrossword() {
  return (
    <ThemeCrossword
      title="Mots croisés de l'océan"
      footerNote="Mots croisés · Océan · 8–10 ans"
      accent="berry"
      rows={5}
      cols={7}
      words={[
        { word: "MER", row: 2, col: 2, dir: "H", num: 1 },
        { word: "EAU", row: 2, col: 3, dir: "V", num: 2 },
        { word: "VAGUE", row: 3, col: 2, dir: "H", num: 3 },
      ]}
      across={[
        { n: 1, text: "Immense étendue d'eau salée qui couvre une grande partie de la Terre." },
        { n: 3, text: "Soulèvement de l'eau au vent ou au ressac." },
      ]}
      down={[{ n: 2, text: "Liquide transparent qui compose les océans." }]}
    />
  )
}
