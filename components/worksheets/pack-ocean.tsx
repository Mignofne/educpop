import type { AgeGroup, PackAgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { NOMENCLATURE_OCEAN } from "@/lib/worksheets/nomenclature-sets"
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
  PictoBoat,
  PictoFish,
  PictoOceanWave,
  PictoOceanWhale,
  PictoOctopus,
  PictoShell,
} from "./art/pictos-ocean"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<PackAgeGroup,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "2-3": {
    subtitle: "Pack sensoriel — mer & vagues",
    contents: [
      "1. Grand coloriage poisson",
      "2. Coloriage baleine & vague",
      "3. Cartes à nommer (oral)",
      "4. Aide le poisson (tracé)",
      "5. Qui vit dans la mer ?",
    ],
    activityCount: 5,
  },
  "4-5": {
    subtitle: "Pack découverte — mer & créatures",
    contents: [
      "1. Coloriage du poisson",
      "2. Cartes de nomenclature",
      "3. Chemin vers la coquille",
      "4. J'écris 3 mots",
      "5. Qui vit où ?",
      "6. Remets la sortie en ordre",
    ],
    activityCount: 6,
  },
  "6-7": {
    subtitle: "Pack lecture & observation",
    contents: [
      "1. Nomenclature — océan",
      "2. Chemin vers le bateau",
      "3. Syllabes de la mer",
      "4. Écriture — 4 mots",
      "5. Qui vit où ?",
      "6. Remets la plongée en ordre",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — océan profond",
    contents: [
      "1. Nomenclature — créatures marines",
      "2. Écriture + phrases",
      "3. Zones de l'océan à associer",
      "4. Vrai / faux — la mer",
      "5. Expédition à raconter",
      "6. Chemin défi — pieuvre",
    ],
    activityCount: 6,
  },
}

/** Pack multi-pages « L'océan » — décliné par âge */
export function PackOcean({ age }: { age: PackAgeGroup }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="L'océan"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Animaux · Mer · Observation"
        contents={meta.contents}
        accent="sky"
        Hero={PictoFish}
      />

      {age === "2-3" ? (
        <>
          <AnimeColoring
            title="Je colorie le poisson"
            instructions="Colorie le poisson. Gros crayons, gros gestes — c'est parfait !"
            footerNote="Coloriage · Océan · 2–3 ans"
            accent="sky"
            Hero={PictoFish}
          />
          <OceanDoubleColoring />
          <NomenclatureCards
            title="Cartes à nommer — océan"
            footerNote="Vocabulaire oral · Océan · 2–3 ans · photos"
            accent="sun"
            age="2-3"
            cards={NOMENCLATURE_OCEAN}
          />
          <AnimePath
            title="Aide le poisson à rejoindre le coquillage"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot MER."
            footerNote="Tracés · Océan · 2–3 ans"
            accent="berry"
            From={PictoFish}
            To={PictoShell}
            bubbleWord="MER"
          />
          <AnimeMatch
            title="Qui vit dans la mer ?"
            instructions="Relie chaque créature à ce qui lui va bien (avec l'adulte)."
            footerNote="Logique · Océan · 2–3 ans"
            accent="tangerine"
            left={[
              { word: "le poisson", Picto: PictoFish },
              { word: "la baleine", Picto: PictoOceanWhale },
              { word: "la pieuvre", Picto: PictoOctopus },
            ]}
            right={["a huit bras", "nage en banc", "est très grande"]}
          />
        </>
      ) : age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie le poisson"
            instructions="Colorie le poisson, les écailles et la queue. Gros crayons bienvenus !"
            footerNote="Coloriage · Océan · 4–5 ans"
            accent="sky"
            Hero={PictoFish}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — océan"
            footerNote="Vocabulaire · Océan · 4–5 ans · photos"
            accent="sun"
            age="4-5"
            cards={NOMENCLATURE_OCEAN}
          />
          <AnimePath
            title="Aide le poisson à rejoindre le coquillage"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot MER."
            footerNote="Tracés · Océan · 4–5 ans"
            accent="berry"
            From={PictoFish}
            To={PictoShell}
            bubbleWord="MER"
          />
          <AnimeWriting
            title="J'écris 3 mots de la mer"
            instructions="Recopie chaque mot en MAJUSCULES puis en cursive."
            footerNote="Écriture · Océan · 4–5 ans"
            accent="leaf"
            words={[
              { word: "vague", Picto: PictoOceanWave },
              { word: "poisson", Picto: PictoFish },
              { word: "bateau", Picto: PictoBoat },
            ]}
          />
          <AnimeMatch
            title="Qui vit où ?"
            instructions="Relie chaque créature à ce qui lui va bien."
            footerNote="Logique · Océan · 4–5 ans"
            accent="tangerine"
            left={[
              { word: "le poisson", Picto: PictoFish },
              { word: "la baleine", Picto: PictoOceanWhale },
              { word: "la pieuvre", Picto: PictoOctopus },
            ]}
            right={["a huit bras", "nage en banc", "est très grande"]}
          />
          <AnimeOrder
            title="Remets la sortie mer en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter une sortie au bord de l'océan."
            footerNote="Logique · Océan · 4–5 ans"
            accent="sky"
            steps={[
              { n: 1, label: "On arrive sur la plage" },
              { n: 2, label: "On observe les vagues" },
              { n: 3, label: "On trouve un coquillage" },
              { n: 4, label: "On rentre avec le trésor" },
            ]}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <NomenclatureCards
            title="Nomenclature — océan"
            footerNote="Vocabulaire · Océan · 6–7 ans · photos"
            accent="sun"
            age="6-7"
            cards={NOMENCLATURE_OCEAN}
          />
          <AnimePath
            title="Aide la baleine à rejoindre le bateau"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot BALEINE."
            footerNote="Tracés · Océan · 6–7 ans"
            accent="berry"
            From={PictoOceanWhale}
            To={PictoBoat}
            bubbleWord="BALEINE"
            hard
          />
          <AnimeSyllables
            title="Syllabes de la mer"
            footerNote="Syllabes · Océan · 6–7 ans"
            accent="sky"
            items={[
              { word: "POISSON", parts: ["POIS", "SON"], missing: [0], src: "/nomenclature/ocean/poisson.jpg", alt: "Photo d'un poisson" },
              { word: "BALEINE", parts: ["BA", "LEI", "NE"], missing: [1], src: "/nomenclature/ocean/baleine.jpg", alt: "Photo d'une baleine" },
              { word: "PIEUVRE", parts: ["PIEU", "VRE"], missing: [1], src: "/nomenclature/ocean/pieuvre.jpg", alt: "Photo d'une pieuvre" },
              { word: "VAGUE", parts: ["VA", "GUE"], missing: [0], src: "/nomenclature/ocean/vague.jpg", alt: "Photo d'une vague" },
            ]}
          />
          <AnimeWriting
            title="J'écris — vocabulaire de la mer"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · Océan · 6–7 ans"
            accent="leaf"
            words={[
              { word: "océan", Picto: PictoOceanWave },
              { word: "baleine", Picto: PictoOceanWhale },
              { word: "coquillage", Picto: PictoShell },
              { word: "pieuvre", Picto: PictoOctopus },
            ]}
          />
          <AnimeMatch
            title="Créatures & habitudes"
            instructions="Relie chaque animal à ce qu'il fait ou possède."
            footerNote="Observation · Océan · 6–7 ans"
            accent="tangerine"
            left={[
              { word: "la baleine", Picto: PictoOceanWhale },
              { word: "la pieuvre", Picto: PictoOctopus },
              { word: "le poisson", Picto: PictoFish },
            ]}
            right={["respire par des branchies", "a huit tentacules", "chante sous l'eau"]}
          />
          <AnimeOrder
            title="Remets la plongée en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter une journée d'observation."
            footerNote="Logique · Océan · 6–7 ans"
            accent="sky"
            steps={[
              { n: 1, label: "On met le masque de plongée" },
              { n: 2, label: "On aperçoit un banc de poissons" },
              { n: 3, label: "Une pieuvre se cache dans un rocher" },
              { n: 4, label: "On remonte à la surface" },
            ]}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature — créatures marines"
            footerNote="Vocabulaire · Océan · 8–10 ans · photos"
            accent="sun"
            age="8-10"
            cards={NOMENCLATURE_OCEAN}
          />
          <AnimeWriting
            title="J'écris et je raconte"
            instructions="Majuscules, cursive, puis une phrase courte sous chaque mot."
            footerNote="Écriture · Océan · 8–10 ans"
            accent="leaf"
            phrase
            words={[
              { word: "océan", Picto: PictoOceanWave },
              { word: "baleine", Picto: PictoOceanWhale },
              { word: "pieuvre", Picto: PictoOctopus },
            ]}
          />
          <AnimeMatch
            title="Zones de l'océan à associer"
            instructions="Relie chaque créature à la zone où on la trouve le plus souvent."
            footerNote="Sciences · Océan · 8–10 ans"
            accent="tangerine"
            left={[
              { word: "le poisson", Picto: PictoFish },
              { word: "la baleine", Picto: PictoOceanWhale },
              { word: "la pieuvre", Picto: PictoOctopus },
              { word: "le bateau", Picto: PictoBoat },
            ]}
            right={["eaux de surface", "grands fonds", "récifs / rochers", "au-dessus de l'eau"]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — la mer"
            footerNote="Esprit critique · Océan · 8–10 ans"
            accent="berry"
            statements={[
              { text: "L'océan couvre une grande partie de la Terre.", truth: true },
              { text: "Les baleines sont des poissons.", truth: false },
              { text: "La pieuvre a huit bras.", truth: true },
              { text: "L'eau de mer est douce comme celle du robinet.", truth: false },
            ]}
          />
          <AnimeOrder
            title="Expédition océanographique à raconter"
            instructions="Remets les étapes dans l'ordre, puis raconte l'histoire à voix haute."
            footerNote="Logique · Océan · 8–10 ans"
            accent="sky"
            steps={[
              { n: 1, label: "L'équipe part en bateau" },
              { n: 2, label: "On lance un filet d'échantillons" },
              { n: 3, label: "On observe des créatures sous l'eau" },
              { n: 4, label: "On note les découvertes dans le carnet" },
            ]}
          />
          <AnimePath
            title="Aide la pieuvre à rejoindre le bateau"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot PROFOND."
            footerNote="Tracés · Océan · 8–10 ans"
            accent="berry"
            From={PictoOctopus}
            To={PictoBoat}
            bubbleWord="PROFOND"
            hard
          />
        </>
      )}
    </div>
  )
}

function OceanDoubleColoring() {
  return (
    <WorksheetFrame
      title="Baleine et vague"
      instructions="Colorie la baleine et la vague. Observe : la baleine est grande, la vague bouge."
      footerNote="Coloriage · Océan · 2–3 ans"
      accent="sky"
    >
      <div className="flex flex-col items-center gap-8 py-4 sm:flex-row sm:justify-center">
        <div className="flex h-48 w-48 items-center justify-center rounded-full border-[3px] border-ink bg-[#fffdf7]">
          <PictoOceanWhale mode="outline" className="h-36 w-36" />
        </div>
        <div className="flex h-48 w-48 items-center justify-center rounded-full border-[3px] border-ink bg-[#fffdf7]">
          <PictoOceanWave mode="outline" className="h-36 w-36" />
        </div>
      </div>
    </WorksheetFrame>
  )
}
