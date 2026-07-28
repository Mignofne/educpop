import type { AgeGroup, PackAgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { NOMENCLATURE_COCCINELLE } from "@/lib/worksheets/nomenclature-sets"
import { AnatomySheet } from "./anatomy-sheet"
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
import { PictoBee, PictoLeaf, PictoSun } from "./art/pictos"
import { PictoBloom, PictoEgg, PictoLadybug } from "./art/pictos-animaux"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<PackAgeGroup,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "2-3": {
    subtitle: "Pack sensoriel — à vivre avec un adulte",
    contents: [
      "1. Grand coloriage coccinelle",
      "2. Coloriage feuille",
      "3. Cartes à nommer (oral)",
      "4. Aide la coccinelle (tracé)",
      "5. Qui va avec qui ?",
    ],
    activityCount: 5,
  },
  "4-5": {
    subtitle: "Pack découverte — observer & nommer",
    contents: [
      "1. Anatomie — 5 parties",
      "2. Cartes de nomenclature",
      "3. Syllabes (1 trou)",
      "4. Chemin vers la feuille",
      "5. J'écris 3 mots",
      "6. Cycle de vie en ordre",
    ],
    activityCount: 6,
  },
  "6-7": {
    subtitle: "Pack lecture & nature",
    contents: [
      "1. Anatomie détaillée",
      "2. Nomenclature à associer",
      "3. Défi syllabes",
      "4. Chemin zigzag",
      "5. Écriture — 4 mots",
      "6. Remets le cycle en ordre",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — sciences douces",
    contents: [
      "1. Anatomie (termes précis)",
      "2. Nomenclature + écrire",
      "3. Mots croisés de la coccinelle",
      "4. Écriture + phrases",
      "5. Cycle à raconter",
      "6. Vrai / faux — coccinelles",
    ],
    activityCount: 6,
  },
}

/** Pack multi-pages « La coccinelle » — thème dédié, décliné par âge */
export function PackCoccinelle({ age }: { age: PackAgeGroup }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="La coccinelle"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Animaux · Jardin · Observation"
        contents={meta.contents}
        accent="berry"
        Hero={PictoLadybug}
      />

      {age === "2-3" ? (
        <>
          <AnimeColoring
            title="Je colorie la coccinelle"
            instructions="Colorie la coccinelle. Gros crayons, gros gestes — c'est parfait !"
            footerNote="Coloriage · coccinelle · 2–3 ans"
            accent="berry"
            Hero={PictoLadybug}
          />
          <AnimeColoring
            title="Je colorie la feuille"
            instructions="Colorie la feuille. La coccinelle aime s'y poser."
            footerNote="Coloriage · coccinelle · 2–3 ans"
            accent="leaf"
            Hero={PictoLeaf}
          />
          <NomenclatureCards
            title="Cartes à nommer — coccinelle"
            footerNote="Vocabulaire oral · coccinelle · 2–3 ans · photos"
            accent="sun"
            age="2-3"
            cards={NOMENCLATURE_COCCINELLE}
          />
          <AnimePath
            title="Aide la coccinelle à rejoindre la feuille"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot COCCI."
            footerNote="Tracés · coccinelle · 2–3 ans"
            accent="tangerine"
            From={PictoLadybug}
            To={PictoLeaf}
            bubbleWord="COCCI"
          />
          <AnimeMatch
            title="Qui va avec qui ?"
            instructions="Relie chaque image à ce qui lui va bien."
            footerNote="Logique · coccinelle · 2–3 ans"
            accent="sky"
            left={[
              { word: "la coccinelle", Picto: PictoLadybug },
              { word: "la feuille", Picto: PictoLeaf },
              { word: "l'œuf", Picto: PictoEgg },
            ]}
            right={["a des points rouges", "pousse sur la plante", "premier stade"]}
          />
        </>
      ) : age === "4-5" ? (
        <>
          <AnatomySheet slug="anatomie-de-la-coccinelle" age={age} />
          <NomenclatureCards
            title="Cartes de nomenclature — coccinelle"
            footerNote="Vocabulaire · coccinelle · 4–5 ans · photos"
            accent="sun"
            age="4-5"
            cards={NOMENCLATURE_COCCINELLE}
          />
          <AnimeSyllables
            title="Syllabes — mots de la coccinelle"
            footerNote="Lecture · coccinelle · 4–5 ans"
            accent="berry"
            items={[
              { word: "COCCINELLE", parts: ["COC", "CI", "NEL", "LE"], missing: [1], src: "/nomenclature/coccinelle/coccinelle.jpg", alt: "Photo d'une coccinelle" },
              { word: "FEUILLE", parts: ["FEUIL", "LE"], missing: [0], src: "/nomenclature/coccinelle/feuille.jpg", alt: "Photo d'une feuille" },
              { word: "ELYTRE", parts: ["E", "LY", "TRE"], missing: [1], src: "/nomenclature/coccinelle/coccinelle.jpg", alt: "Photo d'une coccinelle (élytres)" },
              { word: "SOLEIL", parts: ["SO", "LEIL"], missing: [1], src: "/nomenclature/coccinelle/soleil.jpg", alt: "Photo du soleil" },
            ]}
          />
          <AnimePath
            title="Chemin de la coccinelle"
            instructions="Trace le chemin. Colorie les bulles du mot COCCI."
            footerNote="Tracés · coccinelle · 4–5 ans"
            accent="leaf"
            From={PictoLadybug}
            To={PictoLeaf}
            bubbleWord="COCCI"
          />
          <AnimeWriting
            title="J'écris 3 mots"
            instructions="Écris chaque mot en MAJUSCULES, puis en cursive."
            footerNote="Écriture · coccinelle · 4–5 ans"
            accent="tangerine"
            words={[
              { word: "coccinelle", Picto: PictoLadybug },
              { word: "feuille", Picto: PictoLeaf },
              { word: "fleur", Picto: PictoBloom },
            ]}
          />
          <AnimeOrder
            title="Le cycle de la coccinelle"
            instructions="Remets les étapes dans l'ordre (1 → 4). Tu peux découper et coller."
            footerNote="Sciences · coccinelle · 4–5 ans · cycle"
            accent="berry"
            steps={[
              { n: 1, label: "L'œuf sur la feuille" },
              { n: 2, label: "La larve mange" },
              { n: 3, label: "La nymphe se transforme" },
              { n: 4, label: "La coccinelle adulte" },
            ]}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <AnatomySheet slug="anatomie-de-la-coccinelle" age={age} />
          <NomenclatureCards
            title="Nomenclature à associer — coccinelle"
            footerNote="Vocabulaire · coccinelle · 6–7 ans · photos"
            accent="sun"
            age="6-7"
            cards={NOMENCLATURE_COCCINELLE}
          />
          <AnimeSyllables
            title="Syllabes — défi coccinelle"
            footerNote="Lecture · coccinelle · 6–7 ans"
            accent="berry"
            items={[
              { word: "COCCINELLE", parts: ["COC", "CI", "NEL", "LE"], missing: [0, 2], src: "/nomenclature/coccinelle/coccinelle.jpg", alt: "Photo d'une coccinelle" },
              { word: "ELYTRE", parts: ["E", "LY", "TRE"], missing: [1], src: "/nomenclature/coccinelle/coccinelle.jpg", alt: "Photo d'une coccinelle (élytres)" },
              { word: "FEUILLE", parts: ["FEUIL", "LE"], missing: [1], src: "/nomenclature/coccinelle/feuille.jpg", alt: "Photo d'une feuille" },
              { word: "ABEILLE", parts: ["A", "BEILLE"], missing: [0], src: "/nomenclature/coccinelle/abeille.jpg", alt: "Photo d'une abeille" },
            ]}
          />
          <AnimePath
            title="Chemin zigzag — coccinelle"
            instructions="Trace le chemin secret. Colorie les bulles du mot ELYTRE."
            footerNote="Tracés · coccinelle · 6–7 ans"
            accent="leaf"
            From={PictoLadybug}
            To={PictoBloom}
            bubbleWord="ELYTRE"
            hard
          />
          <AnimeWriting
            title="J'écris 4 mots"
            instructions="Écris en MAJUSCULES puis en cursive."
            footerNote="Écriture · coccinelle · 6–7 ans"
            accent="tangerine"
            words={[
              { word: "coccinelle", Picto: PictoLadybug },
              { word: "élytre", Picto: PictoLadybug },
              { word: "feuille", Picto: PictoLeaf },
              { word: "abeille", Picto: PictoBee },
            ]}
          />
          <AnimeOrder
            title="Le cycle de la coccinelle"
            instructions="Remets les étapes dans l'ordre (1 → 4)."
            footerNote="Sciences · coccinelle · 6–7 ans"
            accent="berry"
            steps={[
              { n: 1, label: "L'œuf sur la feuille" },
              { n: 2, label: "La larve grandit" },
              { n: 3, label: "La nymphe (métamorphose)" },
              { n: 4, label: "La coccinelle adulte vole" },
            ]}
          />
        </>
      ) : (
        <>
          <AnatomySheet slug="anatomie-de-la-coccinelle" age={age} />
          <NomenclatureCards
            title="Nomenclature + écrire — coccinelle"
            footerNote="Vocabulaire · coccinelle · 8–10 ans · photos"
            accent="sun"
            age="8-10"
            cards={NOMENCLATURE_COCCINELLE}
          />
          <CoccinelleCrossword />
          <AnimeWriting
            title="Écriture + phrases"
            instructions="Écris en majuscules et en cursive, puis invente une phrase."
            footerNote="Écriture · coccinelle · 8–10 ans"
            accent="tangerine"
            phrase
            words={[
              { word: "coccinelle", Picto: PictoLadybug },
              { word: "élytre", Picto: PictoLadybug },
              { word: "feuille", Picto: PictoLeaf },
            ]}
          />
          <AnimeOrder
            title="Cycle à raconter"
            instructions="Ordonne les étapes, puis raconte le cycle à voix haute (ou écris 2 phrases au dos)."
            footerNote="Sciences · coccinelle · 8–10 ans"
            accent="berry"
            steps={[
              { n: 1, label: "Œufs pondus sous une feuille" },
              { n: 2, label: "Larves qui se nourrissent" },
              { n: 3, label: "Nymphe (métamorphose)" },
              { n: 4, label: "Adulte aux élytres à points" },
            ]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — les coccinelles"
            footerNote="Esprit critique · coccinelle · 8–10 ans"
            accent="leaf"
            statements={[
              { text: "Les élytres de la coccinelle protègent les ailes de vol.", truth: true },
              { text: "Toutes les coccinelles ont exactement le même nombre de points.", truth: false },
              { text: "La coccinelle commence sa vie en œuf.", truth: true },
              { text: "Le pronotum est le « collier » derrière la tête.", truth: true },
              { text: "La coccinelle naît directement adulte, sans larve.", truth: false },
            ]}
          />
        </>
      )}
    </div>
  )
}

/**
 * Mots croisés coccinelle — 8–10.
 * Intersections :
 *   COCCINELLE H @ (1,0)
 *   ELYTRE     V @ (1,6) croise E
 *   PATTE      H @ (4,4) croise T de ELYTRE
 *   OEUF       H @ (6,5) croise E final de ELYTRE
 */
function CoccinelleCrossword() {
  type Cell = { num?: number } | null
  const rows = 8
  const cols = 11
  const g: Cell[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  const place = (word: string, r: number, c: number, dir: "H" | "V", num: number) => {
    ;[...word].forEach((_, i) => {
      const rr = dir === "H" ? r : r + i
      const cc = dir === "H" ? c + i : c
      if (!g[rr][cc]) g[rr][cc] = {}
      if (i === 0) g[rr][cc] = { num }
    })
  }
  place("COCCINELLE", 1, 0, "H", 1)
  place("ELYTRE", 1, 6, "V", 2)
  place("PATTE", 4, 4, "H", 3)
  place("OEUF", 6, 5, "H", 4)

  const across = [
    { n: 1, text: "Insecte rouge à points, amie du jardin." },
    { n: 3, text: "La coccinelle en a six pour marcher." },
    { n: 4, text: "Premier stade du cycle, posé sur une feuille." },
  ]
  const down = [
    { n: 2, text: "Aile dure qui protège l'aile de vol." },
  ]

  return (
    <WorksheetFrame
      title="Mots croisés de la coccinelle"
      instructions="Lis les définitions. Écris les mots en MAJUSCULES dans la grille."
      footerNote="Mots croisés · coccinelle · 8–10 ans"
      accent="berry"
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="mx-auto shrink-0">
          <table className="border-collapse">
            <tbody>
              {g.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) =>
                    cell ? (
                      <td
                        key={ci}
                        className="relative h-8 w-8 border-2 border-ink bg-white p-0 text-center sm:h-9 sm:w-9"
                      >
                        {cell.num ? (
                          <span className="absolute left-0.5 top-0 text-[8px] font-bold leading-none">
                            {cell.num}
                          </span>
                        ) : null}
                      </td>
                    ) : (
                      <td key={ci} className="h-8 w-8 sm:h-9 sm:w-9" />
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-1 space-y-4 text-sm">
          <div>
            <p className="font-display font-bold">Horizontal</p>
            <ul className="mt-1 space-y-1">
              {across.map((c) => (
                <li key={c.n}>
                  <span className="font-bold">{c.n}.</span> {c.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display font-bold">Vertical</p>
            <ul className="mt-1 space-y-1">
              {down.map((c) => (
                <li key={c.n}>
                  <span className="font-bold">{c.n}.</span> {c.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WorksheetFrame>
  )
}
