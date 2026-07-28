import type { AgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { NOMENCLATURE_AFRIQUE } from "@/lib/worksheets/nomenclature-sets"
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
import {
  PictoAcacia,
  PictoAfricaElephant,
  PictoBaobab,
  PictoGiraffe,
  PictoLion,
} from "./art/pictos-afrique"

type AfriqueAge = Exclude<AgeGroup, "2-3">

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<
  AfriqueAge,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "4-5": {
    subtitle: "Pack découverte — savane & animaux",
    contents: [
      "1. Coloriage du lion",
      "2. Cartes de nomenclature",
      "3. Chemin vers l'acacia",
      "4. J'écris 3 mots",
      "5. Qui vit où ?",
      "6. Remets la journée en ordre",
    ],
    activityCount: 6,
  },
  "6-7": {
    subtitle: "Pack lecture & savane",
    contents: [
      "1. Coloriage du lion",
      "2. Cartes de nomenclature",
      "3. Chemin vers le baobab",
      "4. Syllabes d'Afrique",
      "5. Qui vit où ?",
      "6. Vrai ou faux — Afrique",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — continent Afrique",
    contents: [
      "1. Nomenclature — savane",
      "2. Syllabes avancées",
      "3. Écriture + phrases",
      "4. Savane à classer",
      "5. Vrai / faux — Afrique",
      "6. Migration à raconter",
    ],
    activityCount: 6,
  },
}

/** Pack multi-pages « L'Afrique » — décliné par âge (4–5 → 8–10) */
export function PackAfrique({ age }: { age: AfriqueAge }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="L'Afrique"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Continents · Animaux · Observation"
        contents={meta.contents}
        accent="sun"
        Hero={PictoLion}
      />

      {age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie le lion"
            instructions="Colorie la crinière et le visage. Observe : la crinière entoure la tête."
            footerNote="Coloriage · Afrique · 4–5 ans"
            accent="sun"
            Hero={PictoLion}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — Afrique"
            footerNote="Vocabulaire · Afrique · 4–5 ans · photos"
            accent="leaf"
            age="4-5"
            cards={NOMENCLATURE_AFRIQUE}
          />
          <AnimePath
            title="Aide la girafe à rejoindre l'acacia"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot SAVANE."
            footerNote="Tracés · Afrique · 4–5 ans"
            accent="berry"
            From={PictoGiraffe}
            To={PictoAcacia}
            bubbleWord="SAVANE"
          />
          <AnimeWriting
            title="J'écris 3 mots de la savane"
            instructions="Recopie chaque mot en MAJUSCULES puis en cursive."
            footerNote="Écriture · Afrique · 4–5 ans"
            accent="sky"
            words={[
              { word: "lion", Picto: PictoLion },
              { word: "girafe", Picto: PictoGiraffe },
              { word: "savane", Picto: PictoAcacia },
            ]}
          />
          <AnimeMatch
            title="Qui vit où ?"
            instructions="Relie chaque animal à ce qui lui va bien."
            footerNote="Logique · Afrique · 4–5 ans"
            accent="tangerine"
            left={[
              { word: "le lion", Picto: PictoLion },
              { word: "l'éléphant", Picto: PictoAfricaElephant },
              { word: "la girafe", Picto: PictoGiraffe },
            ]}
            right={["a un long cou", "a une trompe", "a une crinière"]}
          />
          <AnimeOrder
            title="Remets la journée en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter une journée dans la savane."
            footerNote="Logique · Afrique · 4–5 ans"
            accent="sun"
            steps={[
              { n: 1, label: "Le soleil se lève sur la savane" },
              { n: 2, label: "Les animaux cherchent de l'eau" },
              { n: 3, label: "La girafe mange dans l'acacia" },
              { n: 4, label: "Le soleil se couche" },
            ]}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <AnimeColoring
            title="Je colorie le lion"
            instructions="Colorie la crinière et le visage. Observe : la crinière entoure la tête."
            footerNote="Coloriage · Afrique · 6–7 ans"
            accent="sun"
            Hero={PictoLion}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — Afrique"
            footerNote="Vocabulaire · Afrique · 6–7 ans · photos"
            accent="leaf"
            age="6-7"
            cards={NOMENCLATURE_AFRIQUE}
          />
          <AnimePath
            title="Aide la girafe à rejoindre le baobab"
            instructions="Trace le chemin zigzag. Colorie ensuite les bulles du mot BAOBAB."
            footerNote="Tracés · Afrique · 6–7 ans"
            accent="berry"
            From={PictoGiraffe}
            To={PictoBaobab}
            bubbleWord="BAOBAB"
            hard
          />
          <AnimeSyllables
            title="Syllabes d'Afrique"
            footerNote="Syllabes · Afrique · 6–7 ans"
            accent="sky"
            items={[
              { word: "LION", parts: ["LI", "ON"], missing: [0], src: "/nomenclature/afrique/lion.jpg", alt: "Photo d'un lion" },
              { word: "ELEPHANT", parts: ["E", "LE", "PHANT"], missing: [1], src: "/nomenclature/afrique/elephant.jpg", alt: "Photo d'un éléphant d'Afrique" },
              { word: "GIRAFE", parts: ["GI", "RA", "FE"], missing: [1], src: "/nomenclature/afrique/girafe.jpg", alt: "Photo d'une girafe" },
              { word: "BAOBAB", parts: ["BAO", "BAB"], missing: [0], src: "/nomenclature/afrique/baobab.jpg", alt: "Photo d'un baobab" },
              { word: "ACACIA", parts: ["A", "CA", "CIA"], missing: [1], src: "/nomenclature/afrique/acacia.jpg", alt: "Photo d'un acacia" },
            ]}
          />
          <AnimeMatch
            title="Qui vit où ?"
            instructions="Relie chaque animal à ce qui lui va bien."
            footerNote="Logique · Afrique · 6–7 ans"
            accent="tangerine"
            left={[
              { word: "le lion", Picto: PictoLion },
              { word: "l'éléphant", Picto: PictoAfricaElephant },
              { word: "la girafe", Picto: PictoGiraffe },
            ]}
            right={["a un long cou", "a une trompe", "a une crinière"]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — Afrique"
            footerNote="Défi · Afrique · 6–7 ans"
            accent="sun"
            statements={[
              { text: "Le baobab est un grand arbre d'Afrique.", truth: true },
              { text: "La girafe a un très court cou.", truth: false },
              { text: "L'éléphant d'Afrique a de grandes oreilles.", truth: true },
              { text: "L'acacia pousse souvent dans la savane.", truth: true },
            ]}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature — savane africaine"
            footerNote="Vocabulaire · Afrique · 8–10 ans · photos"
            accent="leaf"
            age="8-10"
            cards={NOMENCLATURE_AFRIQUE}
          />
          <AnimeSyllables
            title="Syllabes avancées"
            footerNote="Lecture · Afrique · 8–10 ans"
            accent="sky"
            items={[
              { word: "SAVANE", parts: ["SA", "VA", "NE"], missing: [1], src: "/nomenclature/afrique/savane.jpg", alt: "Photo de la savane" },
              { word: "ELEPHANT", parts: ["E", "LE", "PHANT"], missing: [0], src: "/nomenclature/afrique/elephant.jpg", alt: "Photo d'un éléphant d'Afrique" },
              { word: "BAOBAB", parts: ["BAO", "BAB"], missing: [1], src: "/nomenclature/afrique/baobab.jpg", alt: "Photo d'un baobab" },
              { word: "GIRAFE", parts: ["GI", "RA", "FE"], missing: [2], src: "/nomenclature/afrique/girafe.jpg", alt: "Photo d'une girafe" },
            ]}
          />
          <AnimeWriting
            title="J'écris et je raconte"
            instructions="Majuscules, cursive, puis une phrase sous chaque mot."
            footerNote="Écriture · Afrique · 8–10 ans"
            accent="sun"
            phrase
            words={[
              { word: "savane", Picto: PictoAcacia },
              { word: "migration", Picto: PictoAfricaElephant },
              { word: "baobab", Picto: PictoBaobab },
            ]}
          />
          <AnimeMatch
            title="Savane à classer"
            instructions="Relie chaque élément à sa catégorie (animal, plante, milieu)."
            footerNote="Sciences · Afrique · 8–10 ans"
            accent="tangerine"
            left={[
              { word: "le lion", Picto: PictoLion },
              { word: "l'acacia", Picto: PictoAcacia },
              { word: "le baobab", Picto: PictoBaobab },
              { word: "l'éléphant", Picto: PictoAfricaElephant },
            ]}
            right={["prédateur", "arbre épineux", "arbre géant", "herbivore massif"]}
          />
          <AnimeTrueFalse
            title="Vrai / faux — Afrique"
            footerNote="Esprit critique · Afrique · 8–10 ans"
            accent="berry"
            statements={[
              { text: "L'Afrique est le deuxième plus grand continent.", truth: true },
              { text: "Le baobab peut stocker de l'eau dans son tronc.", truth: true },
              { text: "La savane est une forêt tropicale humide.", truth: false },
              { text: "Les girafes se nourrissent de feuilles d'arbres.", truth: true },
            ]}
          />
          <AnimeOrder
            title="Migration à raconter"
            instructions="Remets les étapes dans l'ordre, puis raconte le parcours des animaux."
            footerNote="Sciences · Afrique · 8–10 ans"
            accent="leaf"
            steps={[
              { n: 1, label: "La saison sèche commence" },
              { n: 2, label: "Les herbivores partent chercher l'herbe" },
              { n: 3, label: "Les prédateurs les suivent" },
              { n: 4, label: "Les pluies reviennent, la savane reverdit" },
            ]}
          />
        </>
      )}
    </div>
  )
}
