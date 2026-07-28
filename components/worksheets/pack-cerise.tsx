import type { AgeGroup, PackAgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { NOMENCLATURE_CERISE } from "@/lib/worksheets/nomenclature-sets"
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
  PictoBasket,
  PictoCherryFlower,
  PictoCherryFruit,
  PictoCherryLeaf,
  PictoCherryTree,
} from "./art/pictos-cerise"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<PackAgeGroup,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "2-3": {
    subtitle: "Pack sensoriel — fleurs & fruits",
    contents: [
      "1. Grand coloriage cerises",
      "2. Coloriage fleur & arbre",
      "3. Cartes à nommer (oral)",
      "4. Aide la fleur (tracé)",
      "5. Qui va avec qui ?",
    ],
    activityCount: 5,
  },
  "4-5": {
    subtitle: "Pack découverte — fleurs & fruits",
    contents: [
      "1. Coloriage des cerises",
      "2. Cartes de nomenclature",
      "3. Chemin vers le panier",
      "4. J'écris 3 mots",
      "5. Qui va avec qui ?",
      "6. Remets la cueillette en ordre",
    ],
    activityCount: 6,
  },
  "6-7": {
    subtitle: "Pack lecture & botanique",
    contents: [
      "1. Nomenclature — cerisier",
      "2. Chemin vers l'arbre",
      "3. Syllabes du cerisier",
      "4. Écriture — 4 mots",
      "5. Fleur, fruit ou outil ?",
      "6. Cycle de la cerise à ordonner",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — du bourgeon au fruit",
    contents: [
      "1. Nomenclature + observer",
      "2. Écriture + phrases",
      "3. Botanique à associer",
      "4. Vrai / faux — le cerisier",
      "5. Cycle à raconter",
      "6. Syllabes avancées",
    ],
    activityCount: 6,
  },
}

const CYCLE_CERISE = [
  { n: 1, label: "Le cerisier a des fleurs blanches" },
  { n: 2, label: "Les pétales tombent" },
  { n: 3, label: "Les cerises grossissent" },
  { n: 4, label: "On les met dans le panier" },
]

/** Pack multi-pages « La cerise » — décliné par âge */
export function PackCerise({ age }: { age: PackAgeGroup }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="La cerise"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Printemps · Botanique · Observation"
        contents={meta.contents}
        accent="berry"
        Hero={PictoCherryFruit}
      />

      {age === "2-3" ? (
        <>
          <AnimeColoring
            title="Je colorie les cerises"
            instructions="Colorie les cerises en rouge. Gros crayons, gros gestes !"
            footerNote="Coloriage · Cerise · 2–3 ans"
            accent="berry"
            Hero={PictoCherryFruit}
          />
          <CeriseDoubleColoring />
          <NomenclatureCards
            title="Cartes à nommer — cerise"
            footerNote="Vocabulaire oral · Cerise · 2–3 ans · photos"
            accent="sun"
            age="2-3"
            cards={NOMENCLATURE_CERISE}
          />
          <AnimePath
            title="Aide la fleur à rejoindre le panier"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot CERISE."
            footerNote="Tracés · Cerise · 2–3 ans"
            accent="leaf"
            From={PictoCherryFlower}
            To={PictoBasket}
            bubbleWord="CERISE"
          />
          <AnimeMatch
            title="Qui va avec qui ?"
            instructions="Relie chaque image à ce qui lui va bien (avec l'adulte)."
            footerNote="Logique · Cerise · 2–3 ans"
            accent="tangerine"
            left={[
              { word: "la fleur", Picto: PictoCherryFlower },
              { word: "la cerise", Picto: PictoCherryFruit },
              { word: "le panier", Picto: PictoBasket },
            ]}
            right={["porte les fruits", "vient avant le fruit", "est rouge et ronde"]}
          />
        </>
      ) : age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie les cerises"
            instructions="Colorie les deux cerises en rouge, la tige et la feuille. Observe la forme ronde."
            footerNote="Coloriage · Cerise · 4–5 ans"
            accent="berry"
            Hero={PictoCherryFruit}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — cerise"
            footerNote="Vocabulaire · Cerise · 4–5 ans · photos"
            accent="sun"
            age="4-5"
            cards={NOMENCLATURE_CERISE}
          />
          <AnimePath
            title="Aide la fleur à rejoindre le panier"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot CERISE."
            footerNote="Tracés · Cerise · 4–5 ans"
            accent="leaf"
            From={PictoCherryFlower}
            To={PictoBasket}
            bubbleWord="CERISE"
          />
          <AnimeWriting
            title="J'écris 3 mots du cerisier"
            instructions="Recopie chaque mot en MAJUSCULES puis en cursive."
            footerNote="Écriture · Cerise · 4–5 ans"
            accent="sky"
            words={[
              { word: "cerise", Picto: PictoCherryFruit },
              { word: "fleur", Picto: PictoCherryFlower },
              { word: "feuille", Picto: PictoCherryLeaf },
            ]}
          />
          <AnimeMatch
            title="Qui va avec qui ?"
            instructions="Relie chaque image à ce qui lui va bien."
            footerNote="Logique · Cerise · 4–5 ans"
            accent="tangerine"
            left={[
              { word: "la fleur", Picto: PictoCherryFlower },
              { word: "la cerise", Picto: PictoCherryFruit },
              { word: "le panier", Picto: PictoBasket },
            ]}
            right={["porte les fruits", "vient avant le fruit", "est rouge et ronde"]}
          />
          <AnimeOrder
            title="Remets la cueillette en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter comment naît une cerise."
            footerNote="Logique · Cerise · 4–5 ans"
            accent="berry"
            steps={CYCLE_CERISE}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <NomenclatureCards
            title="Nomenclature — cerisier"
            footerNote="Vocabulaire · Cerise · 6–7 ans · photos"
            accent="sun"
            age="6-7"
            cards={NOMENCLATURE_CERISE}
          />
          <AnimePath
            title="Aide la cerise à rejoindre l'arbre"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot CERISIER."
            footerNote="Tracés · Cerise · 6–7 ans"
            accent="leaf"
            From={PictoCherryFruit}
            To={PictoCherryTree}
            bubbleWord="CERISIER"
            hard
          />
          <AnimeSyllables
            title="Syllabes du cerisier"
            footerNote="Syllabes · Cerise · 6–7 ans"
            accent="sky"
            items={[
              { word: "CERISE", parts: ["CE", "RI", "SE"], missing: [1], src: "/nomenclature/cerise/cerise.jpg", alt: "Photo de cerises" },
              { word: "FLEUR", parts: ["FLE", "UR"], missing: [0], src: "/nomenclature/cerise/fleur.jpg", alt: "Photo de fleurs de cerisier" },
              { word: "ARBRE", parts: ["AR", "BRE"], missing: [0], src: "/nomenclature/cerise/arbre.jpg", alt: "Photo d'un cerisier" },
              { word: "PANIER", parts: ["PA", "NIER"], missing: [1], src: "/nomenclature/cerise/panier.jpg", alt: "Photo d'un panier de fruits" },
            ]}
          />
          <AnimeWriting
            title="J'écris — vocabulaire du cerisier"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · Cerise · 6–7 ans"
            accent="berry"
            words={[
              { word: "cerise", Picto: PictoCherryFruit },
              { word: "fleur", Picto: PictoCherryFlower },
              { word: "cerisier", Picto: PictoCherryTree },
              { word: "panier", Picto: PictoBasket },
            ]}
          />
          <AnimeMatch
            title="Fleur, fruit ou outil ?"
            instructions="Relie chaque élément à sa catégorie."
            footerNote="Botanique · Cerise · 6–7 ans"
            accent="tangerine"
            left={[
              { word: "la fleur", Picto: PictoCherryFlower },
              { word: "la cerise", Picto: PictoCherryFruit },
              { word: "le panier", Picto: PictoBasket },
            ]}
            right={["partie de la plante qui attire les insectes", "fruit comestible", "objet pour ramasser"]}
          />
          <AnimeOrder
            title="Cycle de la cerise à ordonner"
            instructions="Numérote les étapes de 1 à 4. Raconte le cycle du cerisier."
            footerNote="Sciences · Cerise · 6–7 ans"
            accent="berry"
            steps={CYCLE_CERISE}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature — observer le cerisier"
            footerNote="Vocabulaire · Cerise · 8–10 ans · photos"
            accent="sun"
            age="8-10"
            cards={NOMENCLATURE_CERISE}
          />
          <AnimeWriting
            title="J'écris et je raconte"
            instructions="Majuscules, cursive, puis une phrase sous chaque mot."
            footerNote="Écriture · Cerise · 8–10 ans"
            accent="sky"
            phrase
            words={[
              { word: "cerisier", Picto: PictoCherryTree },
              { word: "floraison", Picto: PictoCherryFlower },
              { word: "récolte", Picto: PictoBasket },
            ]}
          />
          <AnimeMatch
            title="Botanique à associer"
            instructions="Relie chaque terme à la bonne définition."
            footerNote="Sciences · Cerise · 8–10 ans"
            accent="tangerine"
            left={[
              { word: "la fleur", Picto: PictoCherryFlower },
              { word: "la cerise", Picto: PictoCherryFruit },
              { word: "la feuille", Picto: PictoCherryLeaf },
              { word: "l'arbre", Picto: PictoCherryTree },
            ]}
            right={["organe reproducteur", "fruit du cerisier", "fabrique de l'énergie (chlorophylle)", "plante ligneuse"]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — le cerisier"
            footerNote="Esprit critique · Cerise · 8–10 ans"
            accent="leaf"
            statements={[
              { text: "La fleur du cerisier vient avant le fruit.", truth: true },
              { text: "Les cerises poussent directement sur la terre.", truth: false },
              { text: "Le cerisier perd ses feuilles en automne.", truth: true },
              { text: "La cerise est un légume.", truth: false },
            ]}
          />
          <AnimeOrder
            title="Cycle à raconter — du bourgeon au fruit"
            instructions="Remets les étapes dans l'ordre, puis écris deux phrases pour raconter."
            footerNote="Sciences · Cerise · 8–10 ans"
            accent="berry"
            steps={[
              { n: 1, label: "Bourgeons au printemps" },
              { n: 2, label: "Floraison blanche ou rose" },
              { n: 3, label: "Fruits verts qui rougissent" },
              { n: 4, label: "Cueillette estivale" },
            ]}
          />
          <AnimeSyllables
            title="Syllabes avancées"
            footerNote="Lecture · Cerise · 8–10 ans"
            accent="sky"
            items={[
              { word: "CERISIER", parts: ["CE", "RI", "SI", "ER"], missing: [2], src: "/nomenclature/cerise/arbre.jpg", alt: "Photo d'un cerisier" },
              { word: "FLORAISON", parts: ["FLO", "RAI", "SON"], missing: [1], src: "/nomenclature/cerise/fleur.jpg", alt: "Photo de fleurs de cerisier" },
              { word: "RECOLTE", parts: ["RE", "COL", "TE"], missing: [0], src: "/nomenclature/cerise/panier.jpg", alt: "Photo d'un panier de fruits" },
              { word: "FEUILLE", parts: ["FEU", "ILLE"], missing: [1], src: "/nomenclature/cerise/feuille.jpg", alt: "Photo d'une feuille de cerisier" },
            ]}
          />
        </>
      )}
    </div>
  )
}

function CeriseDoubleColoring() {
  return (
    <WorksheetFrame
      title="Fleur et arbre"
      instructions="Colorie la fleur et l'arbre. Observe : la fleur est petite, l'arbre est grand."
      footerNote="Coloriage · Cerise · 2–3 ans"
      accent="leaf"
    >
      <div className="flex flex-col items-center gap-8 py-4 sm:flex-row sm:justify-center">
        <div className="flex h-48 w-48 items-center justify-center rounded-full border-[3px] border-ink bg-[#fffdf7]">
          <PictoCherryFlower mode="outline" className="h-36 w-36" />
        </div>
        <div className="flex h-48 w-48 items-center justify-center rounded-full border-[3px] border-ink bg-[#fffdf7]">
          <PictoCherryTree mode="outline" className="h-36 w-36" />
        </div>
      </div>
    </WorksheetFrame>
  )
}
