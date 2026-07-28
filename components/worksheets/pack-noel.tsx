import type { AgeGroup, PackAgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { NOMENCLATURE_NOEL } from "@/lib/worksheets/nomenclature-sets"
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
  PictoChristmasTree,
  PictoGift,
  PictoHotChocolate,
  PictoMitten,
  PictoReindeer,
  PictoStar,
} from "./art/pictos-noel"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<PackAgeGroup,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "2-3": {
    subtitle: "Pack sensoriel — sapin & cadeaux",
    contents: [
      "1. Grand coloriage sapin",
      "2. Coloriage étoile & cadeau",
      "3. Cartes à nommer (oral)",
      "4. Aide l'étoile (tracé)",
      "5. Qui va avec qui ?",
    ],
    activityCount: 5,
  },
  "4-5": {
    subtitle: "Pack découverte — sapin & cadeaux",
    contents: [
      "1. Coloriage du sapin",
      "2. Cartes de nomenclature",
      "3. Chemin vers le cadeau",
      "4. J'écris 3 mots",
      "5. Qui va avec qui ?",
      "6. Remets la fête en ordre",
    ],
    activityCount: 6,
  },
  "6-7": {
    subtitle: "Pack lecture & hiver",
    contents: [
      "1. Nomenclature — Noël",
      "2. Chemin vers le sapin",
      "3. Syllabes de l'hiver",
      "4. Écriture — 4 mots",
      "5. Qui va avec qui ?",
      "6. Remets la fête en ordre",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — fête d'hiver",
    contents: [
      "1. Nomenclature — symboles",
      "2. Écriture + phrases",
      "3. Hiver à classer",
      "4. Vrai / faux — Noël",
      "5. Matinée à raconter",
      "6. Chemin défi — renne",
    ],
    activityCount: 6,
  },
}

const FETE_STEPS = [
  { n: 1, label: "On décore le sapin" },
  { n: 2, label: "On enfile les moufles" },
  { n: 3, label: "On ouvre un cadeau" },
  { n: 4, label: "On boit un chocolat chaud" },
]

/** Pack multi-pages « Noël » — décliné par âge */
export function PackNoel({ age }: { age: PackAgeGroup }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="Noël"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Hiver · Saisons · Vocabulaire"
        contents={meta.contents}
        accent="berry"
        Hero={PictoChristmasTree}
      />

      {age === "2-3" ? (
        <>
          <AnimeColoring
            title="Je colorie le sapin"
            instructions="Colorie le sapin en vert. Gros crayons, gros gestes !"
            footerNote="Coloriage · Noël · 2–3 ans"
            accent="leaf"
            Hero={PictoChristmasTree}
          />
          <NoelDoubleColoring />
          <NomenclatureCards
            title="Cartes à nommer — Noël"
            footerNote="Vocabulaire oral · Noël · 2–3 ans · photos"
            accent="sun"
            age="2-3"
            cards={NOMENCLATURE_NOEL}
          />
          <AnimePath
            title="Aide l'étoile à rejoindre le cadeau"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot CADEAU."
            footerNote="Tracés · Noël · 2–3 ans"
            accent="berry"
            From={PictoStar}
            To={PictoGift}
            bubbleWord="CADEAU"
          />
          <AnimeMatch
            title="Qui va avec qui ?"
            instructions="Relie chaque image à ce qui lui va bien (avec l'adulte)."
            footerNote="Logique · Noël · 2–3 ans"
            accent="tangerine"
            left={[
              { word: "le sapin", Picto: PictoChristmasTree },
              { word: "la moufle", Picto: PictoMitten },
              { word: "le chocolat", Picto: PictoHotChocolate },
            ]}
            right={["garde les mains au chaud", "se boit bien chaud", "porte une étoile"]}
          />
        </>
      ) : age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie le sapin"
            instructions="Colorie le sapin en vert, l'étoile en jaune. Ajoute des boules si tu veux !"
            footerNote="Coloriage · Noël · 4–5 ans"
            accent="leaf"
            Hero={PictoChristmasTree}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — Noël"
            footerNote="Vocabulaire · Noël · 4–5 ans · photos"
            accent="sun"
            age="4-5"
            cards={NOMENCLATURE_NOEL}
          />
          <AnimePath
            title="Aide l'étoile à rejoindre le cadeau"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot CADEAU."
            footerNote="Tracés · Noël · 4–5 ans"
            accent="berry"
            From={PictoStar}
            To={PictoGift}
            bubbleWord="CADEAU"
          />
          <AnimeWriting
            title="J'écris 3 mots de Noël"
            instructions="Recopie chaque mot en MAJUSCULES puis en cursive."
            footerNote="Écriture · Noël · 4–5 ans"
            accent="sky"
            words={[
              { word: "sapin", Picto: PictoChristmasTree },
              { word: "etoile", Picto: PictoStar },
              { word: "cadeau", Picto: PictoGift },
            ]}
          />
          <AnimeMatch
            title="Qui va avec qui ?"
            instructions="Relie chaque image à ce qui lui va bien."
            footerNote="Logique · Noël · 4–5 ans"
            accent="tangerine"
            left={[
              { word: "le sapin", Picto: PictoChristmasTree },
              { word: "la moufle", Picto: PictoMitten },
              { word: "le chocolat", Picto: PictoHotChocolate },
            ]}
            right={["garde les mains au chaud", "se boit bien chaud", "porte une étoile"]}
          />
          <AnimeOrder
            title="Remets la fête en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter une matinée de Noël."
            footerNote="Logique · Noël · 4–5 ans"
            accent="berry"
            steps={FETE_STEPS}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <NomenclatureCards
            title="Nomenclature — Noël"
            footerNote="Vocabulaire · Noël · 6–7 ans · photos"
            accent="sun"
            age="6-7"
            cards={NOMENCLATURE_NOEL}
          />
          <AnimePath
            title="Aide le renne à rejoindre le sapin"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot HIVER."
            footerNote="Tracés · Noël · 6–7 ans"
            accent="berry"
            From={PictoReindeer}
            To={PictoChristmasTree}
            bubbleWord="HIVER"
            hard
          />
          <AnimeSyllables
            title="Syllabes de l'hiver"
            footerNote="Syllabes · Noël · 6–7 ans"
            accent="sky"
            items={[
              { word: "SAPIN", parts: ["SA", "PIN"], missing: [0], src: "/nomenclature/noel/sapin.jpg", alt: "Photo d'un sapin de Noël" },
              { word: "CADEAU", parts: ["CA", "DEAU"], missing: [1], src: "/nomenclature/noel/cadeau.jpg", alt: "Photo d'un cadeau" },
              { word: "MOUFLE", parts: ["MOU", "FLE"], missing: [0], src: "/nomenclature/noel/moufle.jpg", alt: "Photo de moufles" },
              { word: "RENNE", parts: ["REN", "NE"], missing: [1], src: "/nomenclature/noel/renne.jpg", alt: "Photo d'un renne" },
            ]}
          />
          <AnimeWriting
            title="J'écris — vocabulaire de Noël"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · Noël · 6–7 ans"
            accent="leaf"
            words={[
              { word: "hiver", Picto: PictoMitten },
              { word: "sapin", Picto: PictoChristmasTree },
              { word: "cadeau", Picto: PictoGift },
              { word: "renne", Picto: PictoReindeer },
            ]}
          />
          <AnimeMatch
            title="Symboles & saisons"
            instructions="Relie chaque symbole à la bonne idée."
            footerNote="Observation · Noël · 6–7 ans"
            accent="tangerine"
            left={[
              { word: "le sapin", Picto: PictoChristmasTree },
              { word: "la moufle", Picto: PictoMitten },
              { word: "le renne", Picto: PictoReindeer },
            ]}
            right={["arbre décoré", "protège du froid", "animal du froid"]}
          />
          <AnimeOrder
            title="Remets la fête en ordre"
            instructions="Numérote les étapes de 1 à 4."
            footerNote="Logique · Noël · 6–7 ans"
            accent="berry"
            steps={FETE_STEPS}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature — symboles de l'hiver"
            footerNote="Vocabulaire · Noël · 8–10 ans · photos"
            accent="sun"
            age="8-10"
            cards={NOMENCLATURE_NOEL}
          />
          <AnimeWriting
            title="J'écris et je raconte"
            instructions="Majuscules, cursive, puis une phrase sous chaque mot."
            footerNote="Écriture · Noël · 8–10 ans"
            accent="sky"
            phrase
            words={[
              { word: "hiver", Picto: PictoMitten },
              { word: "tradition", Picto: PictoGift },
              { word: "solstice", Picto: PictoStar },
            ]}
          />
          <AnimeMatch
            title="Hiver à classer"
            instructions="Relie chaque élément à sa catégorie."
            footerNote="Classification · Noël · 8–10 ans"
            accent="leaf"
            left={[
              { word: "le sapin", Picto: PictoChristmasTree },
              { word: "la moufle", Picto: PictoMitten },
              { word: "le renne", Picto: PictoReindeer },
              { word: "le chocolat", Picto: PictoHotChocolate },
            ]}
            right={["plante conifère", "vêtement chaud", "mammifère arctique", "boisson réconfortante"]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — Noël"
            footerNote="Esprit critique · Noël · 8–10 ans"
            accent="berry"
            statements={[
              { text: "Noël a lieu en hiver dans l'hémisphère nord.", truth: true },
              { text: "Le sapin est une plante qui perd toutes ses feuilles en hiver.", truth: false },
              { text: "Les rennes vivent dans les régions froides.", truth: true },
              { text: "En hiver, les journées sont plus longues qu'en été.", truth: false },
            ]}
          />
          <AnimeOrder
            title="Matinée à raconter"
            instructions="Remets les étapes dans l'ordre, puis écris un petit récit."
            footerNote="Logique · Noël · 8–10 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "Dehors, il neige et il fait froid" },
              { n: 2, label: "On allume les guirlandes du sapin" },
              { n: 3, label: "On échange des cadeaux" },
              { n: 4, label: "On partage un chocolat chaud en famille" },
            ]}
          />
          <AnimePath
            title="Aide le renne à rejoindre l'étoile"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot DECEMBRE."
            footerNote="Tracés · Noël · 8–10 ans"
            accent="berry"
            From={PictoReindeer}
            To={PictoStar}
            bubbleWord="DECEMBRE"
            hard
          />
        </>
      )}
    </div>
  )
}

function NoelDoubleColoring() {
  return (
    <WorksheetFrame
      title="Étoile et cadeau"
      instructions="Colorie l'étoile et le cadeau. Observe : l'étoile brille, le cadeau a un ruban."
      footerNote="Coloriage · Noël · 2–3 ans"
      accent="sun"
    >
      <div className="flex flex-col items-center gap-8 py-4 sm:flex-row sm:justify-center">
        <div className="flex h-48 w-48 items-center justify-center rounded-full border-[3px] border-ink bg-[#fffdf7]">
          <PictoStar mode="outline" className="h-36 w-36" />
        </div>
        <div className="flex h-48 w-48 items-center justify-center rounded-full border-[3px] border-ink bg-[#fffdf7]">
          <PictoGift mode="outline" className="h-36 w-36" />
        </div>
      </div>
    </WorksheetFrame>
  )
}
