import type { AgeGroup, PackAgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { NOMENCLATURE_ANTARCTIQUE } from "@/lib/worksheets/nomenclature-sets"
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
  PictoIce,
  PictoIgloo,
  PictoPenguin,
  PictoSeal,
  PictoSnowflake,
  PictoWhale,
} from "./art/pictos-antarctique"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<PackAgeGroup,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "2-3": {
    subtitle: "Pack sensoriel — glace & animaux",
    contents: [
      "1. Grand coloriage pingouin",
      "2. Coloriage phoque & flocon",
      "3. Cartes à nommer (oral)",
      "4. Aide le pingouin (tracé)",
      "5. Qui vit sur la glace ?",
    ],
    activityCount: 5,
  },
  "4-5": {
    subtitle: "Pack découverte — glace & animaux",
    contents: [
      "1. Coloriage du pingouin",
      "2. Cartes de nomenclature",
      "3. Chemin vers l'igloo",
      "4. J'écris 3 mots",
      "5. Qui va avec qui ?",
      "6. Remets la journée en ordre",
    ],
    activityCount: 6,
  },
  "6-7": {
    subtitle: "Pack lecture & froid",
    contents: [
      "1. Coloriage du pingouin",
      "2. Cartes de nomenclature",
      "3. Chemin vers l'igloo",
      "4. Syllabes du froid",
      "5. Écriture — 3 mots",
      "6. Remets la journée en ordre",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — continent Antarctique",
    contents: [
      "1. Nomenclature — pôle Sud",
      "2. Syllabes avancées",
      "3. Écriture + phrases",
      "4. Banquise à classer",
      "5. Vrai / faux — Antarctique",
      "6. Expédition à raconter",
    ],
    activityCount: 6,
  },
}

const JOURNEE_67 = [
  { n: 1, label: "Le soleil se lève sur la glace" },
  { n: 2, label: "Le pingouin plonge dans l'eau" },
  { n: 3, label: "Il retrouve le groupe sur la banquise" },
  { n: 4, label: "La nuit tombe, flocon après flocon" },
]

/** Pack multi-pages « L'Antarctique » — décliné par âge */
export function PackAntarctique({ age }: { age: PackAgeGroup }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="L'Antarctique"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Hiver · Animaux · Continents"
        contents={meta.contents}
        accent="sky"
        Hero={PictoPenguin}
      />

      {age === "2-3" ? (
        <>
          <AnimeColoring
            title="Je colorie le pingouin"
            instructions="Colorie le pingouin : ventre blanc, dos sombre. Gros crayons !"
            footerNote="Coloriage · Antarctique · 2–3 ans"
            accent="sky"
            Hero={PictoPenguin}
          />
          <AntarctiqueDoubleColoring />
          <NomenclatureCards
            title="Cartes à nommer — Antarctique"
            footerNote="Vocabulaire oral · Antarctique · 2–3 ans · photos"
            accent="sun"
            age="2-3"
            cards={NOMENCLATURE_ANTARCTIQUE}
          />
          <AnimePath
            title="Aide le pingouin à rejoindre la glace"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot GLACE."
            footerNote="Tracés · Antarctique · 2–3 ans"
            accent="berry"
            From={PictoPenguin}
            To={PictoIce}
            bubbleWord="GLACE"
          />
          <AnimeMatch
            title="Qui vit sur la glace ?"
            instructions="Relie chaque animal à ce qui lui va bien (avec l'adulte)."
            footerNote="Logique · Antarctique · 2–3 ans"
            accent="tangerine"
            left={[
              { word: "le pingouin", Picto: PictoPenguin },
              { word: "le phoque", Picto: PictoSeal },
              { word: "la baleine", Picto: PictoWhale },
            ]}
            right={["nage sous l'eau", "se repose sur la banquise", "marche debout sur la glace"]}
          />
        </>
      ) : age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie le pingouin"
            instructions="Colorie le pingouin : ventre blanc, dos sombre. Observe les ailerons et le bec."
            footerNote="Coloriage · Antarctique · 4–5 ans"
            accent="sky"
            Hero={PictoPenguin}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — Antarctique"
            footerNote="Vocabulaire · Antarctique · 4–5 ans · photos"
            accent="sun"
            age="4-5"
            cards={NOMENCLATURE_ANTARCTIQUE}
          />
          <AnimePath
            title="Aide le pingouin à rejoindre l'igloo"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot IGLOO."
            footerNote="Tracés · Antarctique · 4–5 ans"
            accent="berry"
            From={PictoPenguin}
            To={PictoIgloo}
            bubbleWord="IGLOO"
          />
          <AnimeWriting
            title="J'écris 3 mots du froid"
            instructions="Recopie chaque mot en MAJUSCULES puis en cursive."
            footerNote="Écriture · Antarctique · 4–5 ans"
            accent="tangerine"
            words={[
              { word: "glace", Picto: PictoIce },
              { word: "igloo", Picto: PictoIgloo },
              { word: "phoque", Picto: PictoSeal },
            ]}
          />
          <AnimeMatch
            title="Qui va avec qui ?"
            instructions="Relie chaque animal à ce qui lui va bien."
            footerNote="Logique · Antarctique · 4–5 ans"
            accent="leaf"
            left={[
              { word: "le pingouin", Picto: PictoPenguin },
              { word: "le phoque", Picto: PictoSeal },
              { word: "le flocon", Picto: PictoSnowflake },
            ]}
            right={["tombe du ciel en hiver", "a des moustaches", "ne vole pas mais nage"]}
          />
          <AnimeOrder
            title="Remets la journée en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter une journée polaire."
            footerNote="Logique · Antarctique · 4–5 ans"
            accent="sky"
            steps={[
              { n: 1, label: "Il fait froid, la glace brille" },
              { n: 2, label: "Le pingouin marche en groupe" },
              { n: 3, label: "Il plonge pour pêcher" },
              { n: 4, label: "Le phoque se repose sur la banquise" },
            ]}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <AnimeColoring
            title="Je colorie le pingouin"
            instructions="Colorie le pingouin : ventre blanc, dos sombre. Observe les ailerons et le bec."
            footerNote="Coloriage · Antarctique · 6–7 ans"
            accent="sky"
            Hero={PictoPenguin}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — Antarctique"
            footerNote="Vocabulaire · Antarctique · 6–7 ans · photos"
            accent="sun"
            age="6-7"
            cards={NOMENCLATURE_ANTARCTIQUE}
          />
          <AnimePath
            title="Aide le pingouin à rejoindre l'igloo"
            instructions="Trace le chemin zigzag. Colorie ensuite les bulles du mot IGLOO."
            footerNote="Tracés · Antarctique · 6–7 ans"
            accent="berry"
            From={PictoPenguin}
            To={PictoIgloo}
            bubbleWord="IGLOO"
            hard
          />
          <AnimeSyllables
            title="Syllabes du froid"
            footerNote="Syllabes · Antarctique · 6–7 ans"
            accent="leaf"
            items={[
              { word: "PINGOUIN", parts: ["PIN", "GOU", "IN"], missing: [1], src: "/nomenclature/antarctique/pingouin.jpg", alt: "Photo d'un pingouin" },
              { word: "PHOQUE", parts: ["PHO", "QUE"], missing: [0], src: "/nomenclature/antarctique/phoque.jpg", alt: "Photo d'un phoque" },
              { word: "BALEINE", parts: ["BA", "LEI", "NE"], missing: [1], src: "/nomenclature/antarctique/baleine.jpg", alt: "Photo d'une baleine" },
              { word: "IGLOO", parts: ["I", "GLOO"], missing: [1], src: "/nomenclature/antarctique/igloo.jpg", alt: "Photo d'un igloo" },
              { word: "FLOCON", parts: ["FLO", "CON"], missing: [0], src: "/nomenclature/antarctique/flocon.jpg", alt: "Photo d'un flocon de neige" },
            ]}
          />
          <AnimeWriting
            title="J'écris 3 mots du froid"
            instructions="Recopie chaque mot en MAJUSCULES puis en cursive."
            footerNote="Écriture · Antarctique · 6–7 ans"
            accent="tangerine"
            words={[
              { word: "glace", Picto: PictoIce },
              { word: "igloo", Picto: PictoIgloo },
              { word: "phoque", Picto: PictoSeal },
            ]}
          />
          <AnimeOrder
            title="Remets la journée polaire en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter une journée en Antarctique."
            footerNote="Logique · Antarctique · 6–7 ans"
            accent="sky"
            steps={JOURNEE_67}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature — pôle Sud"
            footerNote="Vocabulaire · Antarctique · 8–10 ans · photos"
            accent="sun"
            age="8-10"
            cards={NOMENCLATURE_ANTARCTIQUE}
          />
          <AnimeSyllables
            title="Syllabes avancées"
            footerNote="Lecture · Antarctique · 8–10 ans"
            accent="leaf"
            items={[
              { word: "ANTARCTIQUE", parts: ["AN", "TARC", "TI", "QUE"], missing: [2], src: "/nomenclature/antarctique/banquise.jpg", alt: "Photo de la banquise" },
              { word: "BANQUISE", parts: ["BAN", "QUI", "SE"], missing: [1], src: "/nomenclature/antarctique/banquise.jpg", alt: "Photo de la banquise" },
              { word: "PINGOUIN", parts: ["PIN", "GOU", "IN"], missing: [0], src: "/nomenclature/antarctique/pingouin.jpg", alt: "Photo d'un pingouin" },
              { word: "BALEINE", parts: ["BA", "LEI", "NE"], missing: [2], src: "/nomenclature/antarctique/baleine.jpg", alt: "Photo d'une baleine" },
            ]}
          />
          <AnimeWriting
            title="J'écris et je raconte"
            instructions="Majuscules, cursive, puis une phrase sous chaque mot."
            footerNote="Écriture · Antarctique · 8–10 ans"
            accent="tangerine"
            phrase
            words={[
              { word: "banquise", Picto: PictoIce },
              { word: "expédition", Picto: PictoPenguin },
              { word: "océan", Picto: PictoWhale },
            ]}
          />
          <AnimeMatch
            title="Banquise à classer"
            instructions="Relie chaque élément à sa catégorie (animal, milieu, phénomène)."
            footerNote="Sciences · Antarctique · 8–10 ans"
            accent="sky"
            left={[
              { word: "le pingouin", Picto: PictoPenguin },
              { word: "le phoque", Picto: PictoSeal },
              { word: "la glace", Picto: PictoIce },
              { word: "le flocon", Picto: PictoSnowflake },
            ]}
            right={["oiseau marin non volant", "mammifère marin", "eau gelée", "cristal de neige"]}
          />
          <AnimeTrueFalse
            title="Vrai / faux — Antarctique"
            footerNote="Esprit critique · Antarctique · 8–10 ans"
            accent="berry"
            statements={[
              { text: "L'Antarctique est le continent le plus froid.", truth: true },
              { text: "Les pingouins vivent au pôle Nord.", truth: false },
              { text: "La banquise est de la glace flottante.", truth: true },
              { text: "Il y a des ours polaires en Antarctique.", truth: false },
            ]}
          />
          <AnimeOrder
            title="Expédition à raconter"
            instructions="Remets les étapes dans l'ordre, puis écris deux phrases pour raconter."
            footerNote="Sciences · Antarctique · 8–10 ans"
            accent="leaf"
            steps={[
              { n: 1, label: "L'équipe scientifique arrive par bateau" },
              { n: 2, label: "On installe le camp sur la glace" },
              { n: 3, label: "On observe les colonies de pingouins" },
              { n: 4, label: "On note la température et le vent" },
            ]}
          />
        </>
      )}
    </div>
  )
}

function AntarctiqueDoubleColoring() {
  return (
    <WorksheetFrame
      title="Phoque et flocon"
      instructions="Colorie le phoque et le flocon. Observe : le phoque est rond, le flocon a des branches."
      footerNote="Coloriage · Antarctique · 2–3 ans"
      accent="sky"
    >
      <div className="flex flex-col items-center gap-8 py-4 sm:flex-row sm:justify-center">
        <div className="flex h-52 w-52 items-center justify-center rounded-full border-[3px] border-ink bg-[#fffdf7]">
          <PictoSeal mode="outline" className="h-44 w-44" />
        </div>
        <div className="flex h-52 w-52 items-center justify-center rounded-full border-[3px] border-ink bg-[#fffdf7]">
          <PictoSnowflake mode="outline" className="h-44 w-44" />
        </div>
      </div>
    </WorksheetFrame>
  )
}
