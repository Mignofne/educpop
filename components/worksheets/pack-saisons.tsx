import type { AgeGroup, PackAgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { NOMENCLATURE_SAISONS } from "@/lib/worksheets/nomenclature-sets"
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
import { PackCover } from "./pack-cover"
import { SeasonsCycleCircle } from "./seasons-cycle-circle"
import { SeasonsCrossword } from "./seasons-crossword"
import { SeasonsDidYouKnow } from "./seasons-did-you-know"
import { SeasonsWheel } from "./seasons-wheel"
import { PictoLeaf, PictoSun } from "./art/pictos"
import { PictoButterfly, PictoFox } from "./art/pictos-animaux"
import { PictoSnowflake } from "./art/pictos-antarctique"
import { PictoBloom } from "./art/pictos-animaux"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<PackAgeGroup,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "2-3": {
    subtitle: "Pack sensoriel — cycle de l'année",
    contents: [
      "1. Roue des saisons à colorier",
      "2. Coloriage soleil",
      "3. Coloriage feuille",
      "4. Cartes à nommer (oral)",
      "5. Trace vers le soleil",
      "6. Qui va avec quelle saison ?",
    ],
    activityCount: 6,
  },
  "4-5": {
    subtitle: "Pack découverte — année qui tourne",
    contents: [
      "1. Roue des saisons",
      "2. Cartes de nomenclature",
      "3. Cycle en rond + étiquettes",
      "4. Coloriage motifs de saison",
      "5. J'écris 3 mots",
      "6. Associe saison & observation",
      "7. Le savais-tu ?",
    ],
    activityCount: 7,
  },
  "6-7": {
    subtitle: "Pack lecture & observation",
    contents: [
      "1. Roue à compléter",
      "2. Nomenclature (séparée)",
      "3. Syllabes des saisons",
      "4. Chemin vers l'automne",
      "5. Écriture — 4 mots",
      "6. Ordre de l'année",
      "7. Le savais-tu ?",
    ],
    activityCount: 7,
  },
  "8-10": {
    subtitle: "Pack autonomie — cycle annuel",
    contents: [
      "1. Cycle + observations",
      "2. Nomenclature + écrire",
      "3. Mots croisés des saisons",
      "4. Écriture + phrases",
      "5. Ordre & raconter",
      "6. Vrai / faux",
      "7. Le savais-tu ?",
    ],
    activityCount: 7,
  },
}

const SEASON_SYL_67 = [
  { word: "AUTOMNE", parts: ["AU", "TOM", "NE"], missing: [2], src: "/nomenclature/halloween/feuille.jpg", alt: "Photo d'une feuille d'automne" },
  { word: "SOLEIL", parts: ["SO", "LEIL"], missing: [0], src: "/nomenclature/tournesol/soleil.jpg", alt: "Photo du soleil" },
  { word: "FEUILLE", parts: ["FEU", "ILLE"], missing: [0], src: "/nomenclature/tournesol/feuille.jpg", alt: "Photo d'une feuille" },
  { word: "HIVER", parts: ["HI", "VER"], missing: [1], src: "/nomenclature/saisons/neige.jpg", alt: "Photo de neige" },
  { word: "NEIGE", parts: ["NEI", "GE"], missing: [0], src: "/nomenclature/saisons/neige.jpg", alt: "Photo de neige" },
]

/** Pack multi-pages « Les saisons » — cycle annuel décliné par âge */
export function PackSaisons({ age }: { age: PackAgeGroup }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="Les saisons"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Saisons · Nature · Observation · Toute l'année"
        contents={meta.contents}
        accent="sun"
        Hero={PictoSun}
      />

      {age === "2-3" ? (
        <>
          <SeasonsWheel age="2-3" />
          <AnimeColoring
            title="Je colorie le soleil"
            instructions="Colorie le soleil. Gros gestes — c'est l'été !"
            footerNote="Coloriage · Saisons · 2–3 ans"
            accent="sun"
            Hero={PictoSun}
          />
          <AnimeColoring
            title="Je colorie la feuille"
            instructions="Colorie la feuille. En automne, elle change de couleur."
            footerNote="Coloriage · Saisons · 2–3 ans"
            accent="leaf"
            Hero={PictoLeaf}
          />
          <NomenclatureCards
            title="Cartes à nommer — nature"
            footerNote="Vocabulaire oral · Saisons · 2–3 ans · photos"
            accent="sky"
            age="2-3"
            cards={NOMENCLATURE_SAISONS}
          />
          <AnimePath
            title="Vers le soleil"
            instructions="Trace le chemin. Colorie les bulles du mot ETE."
            footerNote="Tracés · Saisons · 2–3 ans"
            accent="tangerine"
            From={PictoButterfly}
            To={PictoSun}
            bubbleWord="ETE"
          />
          <AnimeMatch
            title="Qui va avec quelle saison ?"
            instructions="Relie chaque image à la bonne saison (avec l'adulte)."
            footerNote="Logique · Saisons · 2–3 ans"
            accent="sky"
            left={[
              { word: "le soleil", Picto: PictoSun },
              { word: "la feuille", Picto: PictoLeaf },
              { word: "la fleur", Picto: PictoBloom },
            ]}
            right={["été", "automne", "printemps"]}
          />
        </>
      ) : age === "4-5" ? (
        <>
          <SeasonsWheel age="4-5" />
          <NomenclatureCards
            title="Cartes de nomenclature — nature & saisons"
            footerNote="Vocabulaire · Saisons · 4–5 ans · photos"
            accent="leaf"
            age="4-5"
            cards={NOMENCLATURE_SAISONS}
          />
          <SeasonsCycleCircle />
          <AnimeColoring
            title="Motifs de saison"
            instructions="Colorie le soleil d'été. Tu peux inventer des couleurs pour l'automne ensuite !"
            footerNote="Coloriage · Saisons · 4–5 ans"
            accent="sun"
            Hero={PictoSun}
          />
          <AnimeWriting
            title="J'écris 3 mots"
            instructions="Écris en MAJUSCULES, puis en cursive."
            footerNote="Écriture · Saisons · 4–5 ans"
            accent="berry"
            words={[
              { word: "été", Picto: PictoSun },
              { word: "feuille", Picto: PictoLeaf },
              { word: "soleil", Picto: PictoSun },
            ]}
          />
          <AnimeMatch
            title="Saison & observation"
            instructions="Relie chaque indice à la saison."
            footerNote="Observation · Saisons · 4–5 ans"
            accent="leaf"
            left={[
              { word: "le soleil", Picto: PictoSun },
              { word: "la feuille", Picto: PictoLeaf },
              { word: "la fleur", Picto: PictoBloom },
              { word: "la neige", Picto: PictoSnowflake },
            ]}
            right={["il fait très chaud", "les feuilles tombent", "les fleurs reviennent", "il fait froid"]}
          />
          <SeasonsDidYouKnow age="4-5" />
        </>
      ) : age === "6-7" ? (
        <>
          <SeasonsWheel age="6-7" />
          <NomenclatureCards
            title="Nomenclature — associer photos & mots"
            footerNote="Vocabulaire · Saisons · 6–7 ans · photos"
            accent="leaf"
            age="6-7"
            cards={NOMENCLATURE_SAISONS}
          />
          <AnimeSyllables
            title="Syllabes des saisons"
            footerNote="Lecture · Saisons · 6–7 ans"
            accent="berry"
            items={SEASON_SYL_67}
          />
          <AnimePath
            title="Chemin vers l'automne"
            instructions="Trace le chemin. Colorie les bulles du mot AUTOMNE."
            footerNote="Tracés · Saisons · 6–7 ans"
            accent="leaf"
            From={PictoSun}
            To={PictoLeaf}
            bubbleWord="AUTOMNE"
            hard
          />
          <AnimeWriting
            title="J'écris 4 mots"
            instructions="Écris en MAJUSCULES puis en cursive."
            footerNote="Écriture · Saisons · 6–7 ans"
            accent="sun"
            words={[
              { word: "printemps", Picto: PictoBloom },
              { word: "été", Picto: PictoSun },
              { word: "automne", Picto: PictoLeaf },
              { word: "hiver", Picto: PictoSnowflake },
            ]}
          />
          <AnimeOrder
            title="L'ordre de l'année"
            instructions="Remets les saisons dans l'ordre (1 → 4)."
            footerNote="Séquencer · Saisons · 6–7 ans"
            accent="sky"
            steps={[
              { n: 1, label: "Printemps — les bourgeons s'ouvrent" },
              { n: 2, label: "Été — les journées sont longues" },
              { n: 3, label: "Automne — les feuilles jaunissent" },
              { n: 4, label: "Hiver — beaucoup d'arbres sont nus" },
            ]}
          />
          <SeasonsDidYouKnow age="6-7" />
        </>
      ) : (
        <>
          <SeasonsWheel age="8-10" />
          <NomenclatureCards
            title="Nomenclature + écrire"
            footerNote="Vocabulaire · Saisons · 8–10 ans · photos"
            accent="leaf"
            age="8-10"
            cards={NOMENCLATURE_SAISONS}
          />
          <SeasonsCrossword />
          <AnimeWriting
            title="Écriture + phrases"
            instructions="Écris en majuscules et en cursive, puis invente une phrase sur la saison."
            footerNote="Écriture · Saisons · 8–10 ans"
            accent="sun"
            phrase
            words={[
              { word: "automne", Picto: PictoLeaf },
              { word: "printemps", Picto: PictoBloom },
              { word: "hiver", Picto: PictoSnowflake },
            ]}
          />
          <AnimeOrder
            title="Ordre & raconter"
            instructions="Remets en ordre, puis raconte à voix haute ce qui change dans la nature."
            footerNote="Sciences · Saisons · 8–10 ans"
            accent="sky"
            steps={[
              { n: 1, label: "Les bourgeons s'ouvrent" },
              { n: 2, label: "Les journées sont très longues" },
              { n: 3, label: "Les feuilles jaunissent" },
              { n: 4, label: "Beaucoup d'arbres sont nus" },
            ]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — les saisons"
            footerNote="Esprit critique · Saisons · 8–10 ans"
            accent="tangerine"
            statements={[
              { text: "En France, l'été suit le printemps.", truth: true },
              { text: "Toutes les feuilles restent vertes toute l'année.", truth: false },
              { text: "L'automne est souvent la saison des récoltes de fruits.", truth: true },
              { text: "Le soleil ne brille jamais en hiver.", truth: false },
              { text: "Les journées sont plus courtes en hiver qu'en été.", truth: true },
            ]}
          />
          <SeasonsDidYouKnow age="8-10" />
        </>
      )}
    </div>
  )
}
