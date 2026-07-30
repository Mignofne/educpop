import type { AgeGroup, PackAgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { NOMENCLATURE_HALLOWEEN } from "@/lib/worksheets/nomenclature-sets"
import { HalloweenCrossword } from "./halloween-crossword"
import { PackCover } from "./pack-cover"
import {
  AnimeColoring,
  AnimeMatch,
  AnimeOrder,
  AnimePath,
  AnimeSyllables,
  AnimeTrueFalse,
  AnimeWriting,
} from "./anime-pack-kit"
import { NomenclatureCards } from "./nomenclature-cards"
import { WorksheetFrame } from "./worksheet-frame"
import {
  PictoBat,
  PictoCandy,
  PictoGhost,
  PictoHalloweenMoon,
  PictoPumpkin,
} from "./art/pictos-halloween"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<PackAgeGroup,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "2-3": {
    subtitle: "Pack sensoriel — citrouilles & douceurs",
    contents: [
      "1. Grand coloriage citrouille",
      "2. Coloriage fantôme",
      "3. Cartes à nommer (oral)",
      "4. Aide la citrouille (tracé)",
      "5. Qui va avec qui ?",
    ],
    activityCount: 5,
  },
  "4-5": {
    subtitle: "Pack découverte — citrouilles & douceurs",
    contents: [
      "1. Coloriage de la citrouille",
      "2. Cartes de nomenclature",
      "3. Chemin vers la lune",
      "4. J'écris 3 mots",
      "5. Qui va avec qui ?",
      "6. Remets la soirée en ordre",
    ],
    activityCount: 6,
  },
  "6-7": {
    subtitle: "Pack lecture & automne",
    contents: [
      "1. Nomenclature — Halloween",
      "2. Chemin vers la lune",
      "3. Syllabes d'automne",
      "4. Écriture — 4 mots",
      "5. Qui va avec qui ?",
      "6. Remets la soirée en ordre",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — fête d'automne",
    contents: [
      "1. Nomenclature — symboles",
      "2. Écriture + phrases",
      "3. Automne à classer",
      "4. Vrai / faux — Halloween",
      "5. Soirée à raconter",
      "6. Mots croisés d'automne",
    ],
    activityCount: 6,
  },
}

const SOIREE_STEPS = [
  { n: 1, label: "On sculpte la citrouille" },
  { n: 2, label: "On met un déguisement" },
  { n: 3, label: "On ramasse des bonbons" },
  { n: 4, label: "On regarde la lune" },
]

/** Pack multi-pages « Halloween » — ambiance douce, décliné par âge */
export function PackHalloween({ age }: { age: PackAgeGroup }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="Halloween"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Automne · Saisons · Vocabulaire"
        contents={meta.contents}
        accent="tangerine"
        Hero={PictoPumpkin}
      />

      {age === "2-3" ? (
        <>
          <AnimeColoring
            title="Je colorie la citrouille"
            instructions="Colorie la citrouille en orange. Gros crayons, gros gestes !"
            footerNote="Coloriage · Halloween · 2–3 ans"
            accent="tangerine"
            Hero={PictoPumpkin}
          />
          <AnimeColoring
            title="Je colorie le fantôme"
            instructions="Colorie le fantôme. Il est tout doux, pas effrayant !"
            footerNote="Coloriage · Halloween · 2–3 ans"
            accent="sky"
            Hero={PictoGhost}
          />
          <NomenclatureCards
            title="Cartes à nommer — Halloween"
            footerNote="Vocabulaire oral · Halloween · 2–3 ans · photos"
            accent="sun"
            age="2-3"
            cards={NOMENCLATURE_HALLOWEEN}
          />
          <AnimePath
            title="Aide la citrouille à rejoindre la lune"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot LUNE."
            footerNote="Tracés · Halloween · 2–3 ans"
            accent="berry"
            From={PictoPumpkin}
            To={PictoHalloweenMoon}
            bubbleWord="LUNE"
          />
          <AnimeMatch
            title="Qui va avec qui ?"
            instructions="Relie chaque image à ce qui lui va bien (avec l'adulte)."
            footerNote="Logique · Halloween · 2–3 ans"
            accent="leaf"
            left={[
              { word: "la citrouille", Picto: PictoPumpkin },
              { word: "le bonbon", Picto: PictoCandy },
              { word: "la chauve-souris", Picto: PictoBat },
            ]}
            right={["vole la nuit", "est orange et ronde", "est sucré"]}
          />
        </>
      ) : age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie la citrouille"
            instructions="Colorie la citrouille en orange, la tige en vert. Dessine un sourire amical !"
            footerNote="Coloriage · Halloween · 4–5 ans"
            accent="tangerine"
            Hero={PictoPumpkin}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — Halloween"
            footerNote="Vocabulaire · Halloween · 4–5 ans · photos"
            accent="sun"
            age="4-5"
            cards={NOMENCLATURE_HALLOWEEN}
          />
          <AnimePath
            title="Aide la citrouille à rejoindre la lune"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot LUNE."
            footerNote="Tracés · Halloween · 4–5 ans"
            accent="berry"
            From={PictoPumpkin}
            To={PictoHalloweenMoon}
            bubbleWord="LUNE"
          />
          <AnimeWriting
            title="J'écris 3 mots d'Halloween"
            instructions="Recopie chaque mot en MAJUSCULES puis en cursive."
            footerNote="Écriture · Halloween · 4–5 ans"
            accent="sky"
            words={[
              { word: "lune", Picto: PictoHalloweenMoon },
              { word: "bonbon", Picto: PictoCandy },
              { word: "fantome", Picto: PictoGhost },
            ]}
          />
          <AnimeMatch
            title="Qui va avec qui ?"
            instructions="Relie chaque image à ce qui lui va bien."
            footerNote="Logique · Halloween · 4–5 ans"
            accent="leaf"
            left={[
              { word: "la citrouille", Picto: PictoPumpkin },
              { word: "le bonbon", Picto: PictoCandy },
              { word: "la chauve-souris", Picto: PictoBat },
            ]}
            right={["vole la nuit", "est orange et ronde", "est sucré"]}
          />
          <AnimeOrder
            title="Remets la soirée en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter une soirée douce d'automne."
            footerNote="Logique · Halloween · 4–5 ans"
            accent="tangerine"
            steps={SOIREE_STEPS}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <NomenclatureCards
            title="Nomenclature — Halloween"
            footerNote="Vocabulaire · Halloween · 6–7 ans · photos"
            accent="sun"
            age="6-7"
            cards={NOMENCLATURE_HALLOWEEN}
          />
          <AnimePath
            title="Aide la chauve-souris à rejoindre la lune"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot AUTOMNE."
            footerNote="Tracés · Halloween · 6–7 ans"
            accent="berry"
            From={PictoBat}
            To={PictoHalloweenMoon}
            bubbleWord="AUTOMNE"
            hard
          />
          <AnimeSyllables
            title="Syllabes d'automne"
            footerNote="Syllabes · Halloween · 6–7 ans"
            accent="sky"
            items={[
              { word: "CITROUILLE", parts: ["CI", "TROUIL", "LE"], missing: [1], src: "/nomenclature/halloween/citrouille.jpg", alt: "Photo d'une citrouille" },
              { word: "FANTOME", parts: ["FAN", "TOME"], missing: [0], src: "/nomenclature/halloween/fantome.jpg", alt: "Photo d'un déguisement fantôme" },
              { word: "BONBON", parts: ["BON", "BON"], missing: [1], src: "/nomenclature/halloween/bonbon.jpg", alt: "Photo de bonbons" },
              { word: "LUNE", parts: ["LU", "NE"], missing: [0], src: "/nomenclature/halloween/lune.jpg", alt: "Photo de la lune" },
            ]}
          />
          <AnimeWriting
            title="J'écris — vocabulaire d'automne"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · Halloween · 6–7 ans"
            accent="leaf"
            words={[
              { word: "automne", Picto: PictoPumpkin },
              { word: "citrouille", Picto: PictoPumpkin },
              { word: "fantôme", Picto: PictoGhost },
              { word: "bonbon", Picto: PictoCandy },
            ]}
          />
          <AnimeMatch
            title="Symboles & saisons"
            instructions="Relie chaque symbole à la bonne idée."
            footerNote="Observation · Halloween · 6–7 ans"
            accent="tangerine"
            left={[
              { word: "la citrouille", Picto: PictoPumpkin },
              { word: "la chauve-souris", Picto: PictoBat },
              { word: "la lune", Picto: PictoHalloweenMoon },
            ]}
            right={["légume d'automne", "animal nocturne", "brille la nuit"]}
          />
          <AnimeOrder
            title="Remets la soirée en ordre"
            instructions="Numérote les étapes de 1 à 4."
            footerNote="Logique · Halloween · 6–7 ans"
            accent="tangerine"
            steps={SOIREE_STEPS}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature — symboles d'automne"
            footerNote="Vocabulaire · Halloween · 8–10 ans · photos"
            accent="sun"
            age="8-10"
            cards={NOMENCLATURE_HALLOWEEN}
          />
          <AnimeWriting
            title="J'écris et je raconte"
            instructions="Majuscules, cursive, puis une phrase sous chaque mot."
            footerNote="Écriture · Halloween · 8–10 ans"
            accent="sky"
            phrase
            words={[
              { word: "automne", Picto: PictoPumpkin },
              { word: "tradition", Picto: PictoCandy },
              { word: "lunaire", Picto: PictoHalloweenMoon },
            ]}
          />
          <AnimeMatch
            title="Automne à classer"
            instructions="Relie chaque élément à sa catégorie (plante, animal, fête, ciel)."
            footerNote="Classification · Halloween · 8–10 ans"
            accent="leaf"
            left={[
              { word: "la citrouille", Picto: PictoPumpkin },
              { word: "la chauve-souris", Picto: PictoBat },
              { word: "le bonbon", Picto: PictoCandy },
              { word: "la lune", Picto: PictoHalloweenMoon },
            ]}
            right={["plante / légume", "mammifère volant", "friandise", "astre nocturne"]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — Halloween"
            footerNote="Esprit critique · Halloween · 8–10 ans"
            accent="berry"
            statements={[
              { text: "Halloween a lieu en automne.", truth: true },
              { text: "La citrouille est un fruit d'été uniquement.", truth: false },
              { text: "La chauve-souris est active surtout la nuit.", truth: true },
              { text: "La lune ne change jamais de forme.", truth: false },
            ]}
          />
          <AnimeOrder
            title="Soirée à raconter"
            instructions="Remets les étapes dans l'ordre, puis écris un petit récit."
            footerNote="Logique · Halloween · 8–10 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "Les feuilles tombent des arbres" },
              { n: 2, label: "On creuse et sculpte la citrouille" },
              { n: 3, label: "On se déguise et part en promenade" },
              { n: 4, label: "On partage les bonbons sous la lune" },
            ]}
          />
          <HalloweenCrossword />
        </>
      )}
    </div>
  )
}
