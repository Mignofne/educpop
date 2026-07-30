import type { ReactNode } from "react"
import type { AgeGroup, PackAgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { AsiaCrossword } from "./asia-crossword"
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
import { PictoBamboo, PictoPanda } from "./art/pictos"
import {
  PictoAsiaMap,
  PictoCherryBlossom,
  PictoCrane,
  PictoElephant,
  PictoFuji,
  PictoPagoda,
  PictoRiceBowl,
  PictoTeaCup,
  PictoTiger,
} from "./art/pictos-asie"
import {
  NOMENCLATURE_ASIE,
  NOMENCLATURE_ASIE_PLUS,
} from "@/lib/worksheets/nomenclature-sets"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<PackAgeGroup,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "2-3": {
    subtitle: "Pack sensoriel — pandas & bambous",
    contents: [
      "1. Grand coloriage panda",
      "2. Coloriage bambou & fleur",
      "3. Cartes à nommer (oral)",
      "4. Aide le panda (tracé)",
      "5. Qui va avec qui ?",
    ],
    activityCount: 5,
  },
  "4-5": {
    subtitle: "Pack découverte — nature & cultures",
    contents: [
      "1. Coloriage de la montagne",
      "2. Cartes de nomenclature",
      "3. Chemin panda → bambou",
      "4. J'écris 3 mots",
      "5. Remets le voyage en ordre",
    ],
    activityCount: 5,
  },
  "6-7": {
    subtitle: "Pack lecture & géographie",
    contents: [
      "1. Nomenclature Asie",
      "2. Chemin vers la pagode",
      "3. Syllabes d'Asie",
      "4. Écriture — 4 mots",
      "5. Drapeaux d'Asie à colorier",
      "6. Remets le voyage en ordre",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — continent Asie",
    contents: [
      "1. Nomenclature + écrire",
      "2. Mots croisés d'Asie",
      "3. Syllabes d'Asie",
      "4. Écriture + phrases",
      "5. Associer pays & symboles",
      "6. Vrai / faux — Asie",
    ],
    activityCount: 6,
  },
}

/** Pack multi-pages « Découvrir l'Asie » — décliné par âge */
export function PackAsie({ age }: { age: PackAgeGroup }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="Découvrir l'Asie"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Asie · Nature · Cultures · Géographie"
        contents={meta.contents}
        accent="leaf"
        Hero={PictoAsiaMap}
      />

      {age === "2-3" ? (
        <>
          <AnimeColoring
            title="Je colorie le panda"
            instructions="Colorie le panda. Gros crayons, gros gestes — c'est parfait !"
            footerNote="Coloriage · Asie · 2–3 ans"
            accent="sky"
            Hero={PictoPanda}
          />
          <AsiaDoubleColoring />
          <NomenclatureCards
            title="Cartes à nommer — Asie"
            footerNote="Vocabulaire oral · Asie · 2–3 ans · photos"
            accent="sun"
            age="2-3"
            cards={NOMENCLATURE_ASIE}
          />
          <AnimePath
            title="Aide le panda à rejoindre le bambou"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot PANDA."
            footerNote="Tracés · Asie · 2–3 ans"
            accent="berry"
            From={PictoPanda}
            To={PictoBamboo}
            bubbleWord="PANDA"
          />
          <AnimeMatch
            title="Qui va avec qui ?"
            instructions="Relie chaque animal à ce qui lui va bien."
            footerNote="Logique · Asie · 2–3 ans"
            accent="tangerine"
            left={[
              { word: "le panda", Picto: PictoPanda },
              { word: "le tigre", Picto: PictoTiger },
              { word: "la grue", Picto: PictoCrane },
            ]}
            right={["vole dans le ciel", "mange du bambou", "a des rayures"]}
          />
        </>
      ) : age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie la montagne"
            instructions="Colorie la montagne et le sommet blanc. Observe : base large, sommet pointu."
            footerNote="Coloriage · Asie · 4–5 ans"
            accent="sky"
            Hero={PictoFuji}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — Asie"
            footerNote="Vocabulaire · Asie · 4–5 ans · photos"
            accent="sun"
            age="4-5"
            cards={NOMENCLATURE_ASIE}
          />
          <AnimePath
            title="Aide le panda à rejoindre le bambou"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot BAMBOU."
            footerNote="Tracés · Asie · 4–5 ans"
            accent="berry"
            From={PictoPanda}
            To={PictoBamboo}
            bubbleWord="BAMBOU"
          />
          <AnimeWriting
            title="J'écris les mots d'Asie"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · Asie · 4–5 ans"
            accent="leaf"
            words={[
              { word: "panda", Picto: PictoPanda },
              { word: "riz", Picto: PictoRiceBowl },
              { word: "thé", Picto: PictoTeaCup },
            ]}
          />
          <AnimeOrder
            title="Remets le voyage en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter un petit voyage."
            footerNote="Logique · Asie · 4–5 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "On regarde la carte" },
              { n: 2, label: "On voit la montagne" },
              { n: 3, label: "On boit du thé" },
              { n: 4, label: "On dit merci" },
            ]}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <NomenclatureCards
            title="Nomenclature — découvrir l'Asie"
            footerNote="Vocabulaire · Asie · 6–7 ans · photos"
            accent="sun"
            age="6-7"
            cards={NOMENCLATURE_ASIE_PLUS}
          />
          <AnimePath
            title="Aide la grue à rejoindre la pagode"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot ASIE."
            footerNote="Tracés · Asie · 6–7 ans"
            accent="berry"
            From={PictoCrane}
            To={PictoPagoda}
            bubbleWord="ASIE"
            hard
          />
          <AnimeSyllables
            title="Syllabes d'Asie"
            footerNote="Syllabes · Asie · 6–7 ans"
            accent="sky"
            items={[
              { word: "PANDA", parts: ["PAN", "DA"], missing: [0], src: "/nomenclature/asie/panda.jpg", alt: "Photo d'un panda" },
              { word: "BAMBOU", parts: ["BAM", "BOU"], missing: [1], src: "/nomenclature/asie/bambou.jpg", alt: "Photo de bambou" },
              { word: "JAPON", parts: ["JA", "PON"], missing: [0], src: "/nomenclature/asie/montagne.jpg", alt: "Photo du mont Fuji" },
              { word: "INDE", parts: ["IN", "DE"], missing: [1], src: "/nomenclature/asie/elephant.jpg", alt: "Photo d'un éléphant d'Asie" },
            ]}
          />
          <AnimeWriting
            title="J'écris — vocabulaire d'Asie"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · Asie · 6–7 ans"
            accent="leaf"
            words={[
              { word: "asie", Picto: PictoAsiaMap },
              { word: "panda", Picto: PictoPanda },
              { word: "pagode", Picto: PictoPagoda },
              { word: "thé", Picto: PictoTeaCup },
            ]}
          />
          <AsiaFlagsSheet />
          <AnimeOrder
            title="Remets le voyage en ordre"
            instructions="Numérote les étapes de 1 à 4."
            footerNote="Logique · Asie · 6–7 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "Repérer l'Asie sur la carte" },
              { n: 2, label: "Visiter une montagne" },
              { n: 3, label: "Observer un panda" },
              { n: 4, label: "Goûter du riz et du thé" },
            ]}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature — Asie"
            footerNote="Vocabulaire · Asie · 8–10 ans · photos"
            accent="sun"
            age="8-10"
            cards={NOMENCLATURE_ASIE_PLUS}
          />
          <AsiaCrossword />
          <AnimeSyllables
            title="Syllabes d'Asie"
            footerNote="Syllabes · Asie · 8–10 ans"
            accent="sky"
            items={[
              { word: "CHINE", parts: ["CHI", "NE"], missing: [0], src: "/nomenclature/asie/panda.jpg", alt: "Photo d'un panda" },
              { word: "JAPON", parts: ["JA", "PON"], missing: [1], src: "/nomenclature/asie/montagne.jpg", alt: "Photo du mont Fuji" },
              { word: "INDE", parts: ["IN", "DE"], missing: [0], src: "/nomenclature/asie/elephant.jpg", alt: "Photo d'un éléphant d'Asie" },
              { word: "PAGODE", parts: ["PA", "GO", "DE"], missing: [1], src: "/nomenclature/asie/pagode.jpg", alt: "Photo d'une pagode" },
            ]}
          />
          <AnimeWriting
            title="J'écris et je raconte"
            instructions="Majuscules, cursive, puis une phrase courte sous chaque mot."
            footerNote="Écriture · Asie · 8–10 ans"
            accent="leaf"
            phrase
            words={[
              { word: "asie", Picto: PictoAsiaMap },
              { word: "montagne", Picto: PictoFuji },
              { word: "éléphant", Picto: PictoElephant },
            ]}
          />
          <AnimeMatch
            title="Pays & symboles"
            instructions="Relie chaque symbole à l'idée qui lui correspond (plusieurs réponses possibles — discutez-en)."
            footerNote="Géographie · Asie · 8–10 ans"
            accent="tangerine"
            left={[
              { word: "montagne", Picto: PictoFuji },
              { word: "éléphant", Picto: PictoElephant },
              { word: "panda", Picto: PictoPanda },
              { word: "pagode", Picto: PictoPagoda },
            ]}
            right={["Japon (symbole)", "Inde (animal)", "Chine (animal)", "architecture"]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — Asie"
            footerNote="Défi · Asie · 8–10 ans"
            accent="berry"
            statements={[
              { text: "L'Asie est le plus grand continent.", truth: true },
              { text: "Le panda mange surtout du bambou.", truth: true },
              { text: "Le Japon est une île d'Europe.", truth: false },
              { text: "On cultive du riz dans plusieurs pays d'Asie.", truth: true },
            ]}
          />
        </>
      )}
    </div>
  )
}

function AsiaDoubleColoring() {
  return (
    <WorksheetFrame
      title="Bambou et fleur"
      instructions="Colorie le bambou et la fleur. Observe les formes : tiges longues, pétales ronds."
      footerNote="Coloriage · Asie · 2–3 ans"
      accent="leaf"
    >
      <div className="flex flex-col items-center gap-8 py-4 sm:flex-row sm:justify-center">
        <div className="flex h-48 w-48 items-center justify-center rounded-full border-[3px] border-ink bg-[#fffdf7]">
          <PictoBamboo mode="outline" className="h-36 w-36" />
        </div>
        <div className="flex h-48 w-48 items-center justify-center rounded-full border-[3px] border-ink bg-[#fffdf7]">
          <PictoCherryBlossom mode="outline" className="h-36 w-36" />
        </div>
      </div>
    </WorksheetFrame>
  )
}

/** Drapeaux Asie — Japon, Chine, Inde, Vietnam (simplifiés Tullet) */
function AsiaFlagsSheet() {
  const flags: { name: string; art: (fill: boolean) => ReactNode }[] = [
    {
      name: "Japon",
      art: (fill) => (
        <svg viewBox="0 0 180 100" className="h-16 w-full text-ink" aria-hidden="true">
          <rect x="1.5" y="1.5" width="177" height="97" fill="white" stroke="currentColor" strokeWidth="2.75" />
          <circle cx="90" cy="50" r="22" fill={fill ? "#BC002D" : "white"} stroke="currentColor" strokeWidth="2.75" />
        </svg>
      ),
    },
    {
      name: "Chine",
      art: (fill) => (
        <svg viewBox="0 0 180 100" className="h-16 w-full text-ink" aria-hidden="true">
          <rect x="1.5" y="1.5" width="177" height="97" fill={fill ? "#DE2910" : "white"} stroke="currentColor" strokeWidth="2.75" />
          {fill ? (
            <polygon points="36,28 40,40 52,40 42,48 46,60 36,52 26,60 30,48 20,40 32,40" fill="#FFDE00" stroke="currentColor" strokeWidth="1.5" />
          ) : (
            <polygon points="36,28 40,40 52,40 42,48 46,60 36,52 26,60 30,48 20,40 32,40" fill="white" stroke="currentColor" strokeWidth="2" />
          )}
        </svg>
      ),
    },
    {
      name: "Inde",
      art: (fill) => (
        <svg viewBox="0 0 180 100" className="h-16 w-full text-ink" aria-hidden="true">
          <rect x="1.5" y="1.5" width="177" height="32" fill={fill ? "#FF9933" : "white"} stroke="currentColor" strokeWidth="2" />
          <rect x="1.5" y="33.5" width="177" height="33" fill="white" stroke="currentColor" strokeWidth="2" />
          <rect x="1.5" y="66.5" width="177" height="32" fill={fill ? "#138808" : "white"} stroke="currentColor" strokeWidth="2" />
          <circle cx="90" cy="50" r="12" fill="white" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="90" cy="50" r="4" fill={fill ? "#000080" : "white"} stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "Viêt Nam",
      art: (fill) => (
        <svg viewBox="0 0 180 100" className="h-16 w-full text-ink" aria-hidden="true">
          <rect x="1.5" y="1.5" width="177" height="97" fill={fill ? "#DA251D" : "white"} stroke="currentColor" strokeWidth="2.75" />
          <polygon
            points="90,28 98,52 124,52 103,68 111,92 90,76 69,92 77,68 56,52 82,52"
            fill={fill ? "#FFFF00" : "white"}
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
  ]

  return (
    <WorksheetFrame
      title="Drapeaux d'Asie à colorier"
      instructions="Observe le modèle. Colorie le drapeau vide en dessous. Dis le nom du pays."
      footerNote="Géographie · Asie · 6–7 ans"
      accent="sky"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {flags.map((f) => (
          <div key={f.name} className="rounded-2xl border-[3px] border-ink p-3">
            <div className="overflow-hidden rounded-xl border-[3px] border-ink">{f.art(true)}</div>
            <p className="my-2 text-center font-display text-sm font-bold">{f.name}</p>
            <div className="overflow-hidden rounded-xl border-[3px] border-dashed border-ink/50 bg-white">{f.art(false)}</div>
          </div>
        ))}
      </div>
    </WorksheetFrame>
  )
}
