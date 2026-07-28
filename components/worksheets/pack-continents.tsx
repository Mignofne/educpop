import type { AgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import {
  AnimeColoring,
  AnimeMatch,
  AnimeOrder,
  AnimePath,
  AnimeSyllables,
  AnimeTrueFalse,
  AnimeWriting,
} from "./anime-pack-kit"
import { FlagsSheet } from "./flags-sheet"
import { PackCover } from "./pack-cover"
import { PictoAsiaMap } from "./art/pictos-asie"
import { PictoCompass, PictoWave } from "./art/pictos-animes"

type ContinentAge = Exclude<AgeGroup, "2-3">

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<
  ContinentAge,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "4-5": {
    subtitle: "Pack découverte — drapeaux & continents",
    contents: [
      "1. Coloriage boussole",
      "2. Drapeaux du monde",
      "3. Chemin vers la mer",
      "4. J'écris 3 pays",
      "5. Associe pays & continent",
    ],
    activityCount: 5,
  },
  "6-7": {
    subtitle: "Pack lecture & géographie",
    contents: [
      "1. Drapeaux du monde",
      "2. Syllabes des pays",
      "3. Chemin défi",
      "4. Écriture — 4 pays",
      "5. Remets le voyage en ordre",
      "6. Associe pays & continent",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — le monde",
    contents: [
      "1. Drapeaux du monde",
      "2. Syllabes des pays",
      "3. Écriture + phrases",
      "4. Voyage à ordonner",
      "5. Continents à classer",
      "6. Vrai / faux — géographie",
    ],
    activityCount: 6,
  },
}

const COUNTRY_SYL = [
  { word: "FRANCE", parts: ["FRAN", "CE"], missing: [1], src: "/nomenclature/continents/france.jpg", alt: "Photo de la tour Eiffel" },
  { word: "JAPON", parts: ["JA", "PON"], missing: [0], src: "/nomenclature/asie/montagne.jpg", alt: "Photo du mont Fuji" },
  { word: "CANADA", parts: ["CA", "NA", "DA"], missing: [1], src: "/nomenclature/continents/canada.jpg", alt: "Photo d'un paysage du Canada" },
  { word: "BRESIL", parts: ["BRE", "SIL"], missing: [0], src: "/nomenclature/continents/bresil.jpg", alt: "Photo du Christ Rédempteur" },
]

/** Pack multi-pages « Continents & drapeaux » — 4–5 → 8–10 */
export function PackContinents({ age }: { age: ContinentAge }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="Continents & drapeaux"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Continents · Géographie · Drapeaux"
        contents={meta.contents}
        accent="sky"
        Hero={PictoCompass}
      />

      {age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie la boussole"
            instructions="Colorie la boussole. Elle aide à trouver le nord, le sud, l'est et l'ouest."
            footerNote="Coloriage · Continents · 4–5 ans"
            accent="sky"
            Hero={PictoCompass}
          />
          <FlagsSheet />
          <AnimePath
            title="Chemin vers la mer"
            instructions="Trace le chemin. Colorie les bulles du mot MER."
            footerNote="Tracés · Continents · 4–5 ans"
            accent="leaf"
            From={PictoCompass}
            To={PictoWave}
            bubbleWord="MER"
          />
          <AnimeWriting
            title="J'écris 3 pays"
            instructions="Écris en MAJUSCULES, puis en cursive."
            footerNote="Écriture · Continents · 4–5 ans"
            accent="sun"
            words={[
              { word: "France", Picto: PictoCompass },
              { word: "Japon", Picto: PictoAsiaMap },
              { word: "Canada", Picto: PictoWave },
            ]}
          />
          <ContinentMatch age={age} />
        </>
      ) : age === "6-7" ? (
        <>
          <FlagsSheet />
          <AnimeSyllables
            title="Syllabes des pays"
            footerNote="Lecture · Continents · 6–7 ans"
            accent="berry"
            items={COUNTRY_SYL}
          />
          <AnimePath
            title="Chemin défi — autour du monde"
            instructions="Trace le chemin secret. Colorie les bulles du mot MONDE."
            footerNote="Tracés · Continents · 6–7 ans"
            accent="leaf"
            From={PictoCompass}
            To={PictoAsiaMap}
            bubbleWord="MONDE"
            hard
          />
          <AnimeWriting
            title="J'écris 4 pays"
            instructions="Écris en MAJUSCULES puis en cursive."
            footerNote="Écriture · Continents · 6–7 ans"
            accent="sun"
            words={[
              { word: "France", Picto: PictoCompass },
              { word: "Japon", Picto: PictoAsiaMap },
              { word: "Brésil", Picto: PictoWave },
              { word: "Kenya", Picto: PictoCompass },
            ]}
          />
          <AnimeOrder
            title="Remets le voyage en ordre"
            instructions="Numérote les étapes du voyage (1 → 4)."
            footerNote="Géographie · Continents · 6–7 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "Préparer la carte" },
              { n: 2, label: "Choisir un continent" },
              { n: 3, label: "Colorier le drapeau" },
              { n: 4, label: "Raconter le voyage" },
            ]}
          />
          <ContinentMatch age={age} />
        </>
      ) : (
        <>
          <FlagsSheet />
          <AnimeSyllables
            title="Syllabes des pays"
            footerNote="Lecture · Continents · 8–10 ans"
            accent="berry"
            items={COUNTRY_SYL}
          />
          <AnimeWriting
            title="Écriture + phrases"
            instructions="Écris en majuscules et en cursive, puis une phrase sur un pays."
            footerNote="Écriture · Continents · 8–10 ans"
            accent="sun"
            phrase
            words={[
              { word: "France", Picto: PictoCompass },
              { word: "Japon", Picto: PictoAsiaMap },
              { word: "Australie", Picto: PictoWave },
            ]}
          />
          <AnimeOrder
            title="Voyage à ordonner"
            instructions="Remets les étapes en ordre, puis raconte le parcours."
            footerNote="Géographie · Continents · 8–10 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "Lire le nom du pays" },
              { n: 2, label: "Trouver son continent" },
              { n: 3, label: "Observer le drapeau" },
              { n: 4, label: "Écrire une phrase" },
            ]}
          />
          <ContinentMatch age={age} />
          <AnimeTrueFalse
            title="Vrai ou faux — géographie"
            footerNote="Esprit critique · Continents · 8–10 ans"
            accent="leaf"
            statements={[
              { text: "Le Japon est un pays d'Asie.", truth: true },
              { text: "Le Brésil est en Europe.", truth: false },
              { text: "Le Kenya est un pays d'Afrique.", truth: true },
              { text: "L'Australie est souvent présentée comme un continent à part.", truth: true },
            ]}
          />
        </>
      )}
    </div>
  )
}

function ContinentMatch({ age }: { age: ContinentAge }) {
  const left =
    age === "8-10"
      ? [
          { word: "France", Picto: PictoCompass },
          { word: "Japon", Picto: PictoAsiaMap },
          { word: "Brésil", Picto: PictoWave },
          { word: "Canada", Picto: PictoCompass },
          { word: "Kenya", Picto: PictoWave },
        ]
      : [
          { word: "France", Picto: PictoCompass },
          { word: "Japon", Picto: PictoAsiaMap },
          { word: "Brésil", Picto: PictoWave },
        ]
  const right =
    age === "8-10"
      ? ["Europe", "Asie", "Amérique du Sud", "Amérique du Nord", "Afrique"]
      : ["Europe", "Asie", "Amérique du Sud"]

  return (
    <AnimeMatch
      title="Pays & continents"
      instructions={
        age === "4-5"
          ? "Relie chaque pays au bon continent (aide-toi des drapeaux)."
          : "Relie chaque pays à son continent. Vérifie ensuite avec la fiche drapeaux."
      }
      footerNote={`Géographie · Continents · ${age} ans`}
      accent="sky"
      left={left}
      right={right}
    />
  )
}
