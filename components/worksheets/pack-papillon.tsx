import type { AgeGroup, PackAgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { NOMENCLATURE_PAPILLON } from "@/lib/worksheets/nomenclature-sets"
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
import { ButterflyLifecycleCircle } from "./butterfly-lifecycle-circle"
import { NomenclatureCards } from "./nomenclature-cards"
import { WorksheetFrame } from "./worksheet-frame"
import {
  PictoBloom,
  PictoButterfly,
  PictoCaterpillar,
  PictoChrysalis,
  PictoEgg,
  PictoWing,
} from "./art/pictos-animaux"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<PackAgeGroup,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "2-3": {
    subtitle: "Pack sensoriel — à vivre avec un adulte",
    contents: [
      "1. Grand coloriage papillon",
      "2. Coloriage chenille",
      "3. Cartes à nommer (oral)",
      "4. Aide la chenille (tracé)",
      "5. Qui va avec qui ?",
    ],
    activityCount: 5,
  },
  "4-5": {
    subtitle: "Pack découverte — 7 activités",
    contents: [
      "1. Grand coloriage papillon",
      "2. Anatomie — 5 parties",
      "3. Cartes de nomenclature",
      "4. Syllabes (1 trou)",
      "5. J'écris 3 mots",
      "6. Cycle de vie en rond",
      "7. Qui va avec qui ?",
    ],
    activityCount: 7,
  },
  "6-7": {
    subtitle: "Pack lecture & nature",
    contents: [
      "1. Nomenclature à associer",
      "2. Complète les mots — syllabes",
      "3. Chemin zigzag",
      "4. Écriture — 4 mots",
      "5. Remets le cycle en ordre",
      "6. Qui mange quoi ?",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — sciences douces",
    contents: [
      "1. Nomenclature + écrire",
      "2. Mots croisés du papillon",
      "3. Écriture + phrases",
      "4. Cycle à raconter",
      "5. Habitats & fleurs",
      "6. Vrai / faux — papillons",
    ],
    activityCount: 6,
  },
}

/** Pack multi-pages « Le papillon » — décliné par âge */
export function PackPapillon({ age }: { age: PackAgeGroup }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="Le papillon"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Animaux · Printemps · Nature"
        contents={meta.contents}
        accent="berry"
        Hero={PictoButterfly}
      />

      {age === "2-3" ? (
        <>
          <AnimeColoring
            title="Je colorie le papillon"
            instructions="Colorie le papillon. Gros crayons, gros gestes — c'est parfait !"
            footerNote="Coloriage · papillon · 2–3 ans"
            accent="sky"
            Hero={PictoButterfly}
          />
          <AnimeColoring
            title="Je colorie la chenille"
            instructions="Colorie la chenille. Observe les ronds de son corps."
            footerNote="Coloriage · papillon · 2–3 ans"
            accent="leaf"
            Hero={PictoCaterpillar}
          />
          <NomenclatureCards
            title="Cartes à nommer — papillon"
            footerNote="Vocabulaire oral · papillon · 2–3 ans · photos"
            accent="sun"
            age="2-3"
            cards={NOMENCLATURE_PAPILLON}
          />
          <AnimePath
            title="Aide la chenille à rejoindre la fleur"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot FLEUR."
            footerNote="Tracés · papillon · 2–3 ans"
            accent="berry"
            From={PictoCaterpillar}
            To={PictoBloom}
            bubbleWord="FLEUR"
          />
          <AnimeMatch
            title="Qui va avec qui ?"
            instructions="Relie chaque image à ce qui lui va bien."
            footerNote="Logique · papillon · 2–3 ans"
            accent="tangerine"
            left={[
              { word: "le papillon", Picto: PictoButterfly },
              { word: "la chenille", Picto: PictoCaterpillar },
              { word: "l'œuf", Picto: PictoEgg },
            ]}
            right={["sur la feuille", "vole vers la fleur", "mange des feuilles"]}
          />
        </>
      ) : age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie le papillon"
            instructions="Colorie les grandes ailes (fond blanc) avec tes couleurs préférées. Observe : corps au milieu, antennes en haut."
            footerNote="Coloriage · papillon · 4–5 ans"
            accent="sky"
            Hero={PictoButterfly}
          />
          <AnatomySheet slug="anatomie-du-papillon" age={age} />
          <NomenclatureCards
            title="Cartes de nomenclature — papillon"
            footerNote="Vocabulaire · papillon · 4–5 ans · photos"
            accent="sun"
            age="4-5"
            cards={NOMENCLATURE_PAPILLON}
          />
          <AnimeSyllables
            title="Syllabes — mots du papillon"
            footerNote="Lecture · papillon · 4–5 ans"
            accent="berry"
            items={[
              { word: "PAPILLON", parts: ["PA", "PIL", "LON"], missing: [1], src: "/nomenclature/papillon/papillon.jpg", alt: "Photo d'un papillon" },
              { word: "CHENILLE", parts: ["CHE", "NIL", "LE"], missing: [0], src: "/nomenclature/papillon/chenille.jpg", alt: "Photo d'une chenille" },
              { word: "AILE", parts: ["AI", "LE"], missing: [1], src: "/nomenclature/papillon/aile.jpg", alt: "Photo d'une aile de papillon" },
              { word: "CHRYSALIDE", parts: ["CHRY", "SA", "LIDE"], missing: [1], src: "/nomenclature/papillon/chrysalide.jpg", alt: "Photo d'une chrysalide" },
            ]}
          />
          <AnimeWriting
            title="J'écris les mots du papillon"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · papillon · 4–5 ans"
            accent="tangerine"
            words={[
              { word: "papillon", Picto: PictoButterfly },
              { word: "aile", Picto: PictoWing },
              { word: "fleur", Picto: PictoBloom },
            ]}
          />
          <ButterflyLifecycleCircle />
          <AnimeMatch
            title="Qui va avec qui ?"
            instructions="Relie chaque image à ce qui lui va bien."
            footerNote="Logique · papillon · 4–5 ans"
            accent="leaf"
            left={[
              { word: "le papillon", Picto: PictoButterfly },
              { word: "la chenille", Picto: PictoCaterpillar },
              { word: "l'œuf", Picto: PictoEgg },
            ]}
            right={["sur la feuille", "vole vers la fleur", "mange des feuilles"]}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <NomenclatureCards
            title="Nomenclature à associer — papillon"
            footerNote="Vocabulaire · papillon · 6–7 ans · photos"
            accent="sun"
            age="6-7"
            cards={NOMENCLATURE_PAPILLON}
          />
          <AnimeSyllables
            title="Syllabes — défi papillon"
            footerNote="Lecture · papillon · 6–7 ans"
            accent="berry"
            items={[
              { word: "PAPILLON", parts: ["PA", "PIL", "LON"], missing: [0, 2], src: "/nomenclature/papillon/papillon.jpg", alt: "Photo d'un papillon" },
              { word: "CHENILLE", parts: ["CHE", "NIL", "LE"], missing: [1], src: "/nomenclature/papillon/chenille.jpg", alt: "Photo d'une chenille" },
              { word: "CHRYSALIDE", parts: ["CHRY", "SA", "LIDE"], missing: [1], src: "/nomenclature/papillon/chrysalide.jpg", alt: "Photo d'une chrysalide" },
              { word: "AILE", parts: ["AI", "LE"], missing: [0], src: "/nomenclature/papillon/aile.jpg", alt: "Photo d'une aile de papillon" },
            ]}
          />
          <AnimePath
            title="Chemin zigzag — chenille"
            instructions="Trace le chemin secret. Colorie les bulles du mot PAPILLON."
            footerNote="Tracés · papillon · 6–7 ans"
            accent="leaf"
            From={PictoCaterpillar}
            To={PictoButterfly}
            bubbleWord="PAPILLON"
            hard
          />
          <AnimeWriting
            title="J'écris 4 mots"
            instructions="Écris en MAJUSCULES puis en cursive."
            footerNote="Écriture · papillon · 6–7 ans"
            accent="tangerine"
            words={[
              { word: "papillon", Picto: PictoButterfly },
              { word: "chenille", Picto: PictoCaterpillar },
              { word: "chrysalide", Picto: PictoChrysalis },
              { word: "aile", Picto: PictoWing },
            ]}
          />
          <AnimeOrder
            title="Le cycle du papillon"
            instructions="Remets les étapes dans l'ordre (1 → 4)."
            footerNote="Sciences · papillon · 6–7 ans"
            accent="berry"
            steps={[
              { n: 1, label: "L'œuf sur la feuille" },
              { n: 2, label: "La chenille mange" },
              { n: 3, label: "La chrysalide" },
              { n: 4, label: "Le papillon s'envole" },
            ]}
          />
          <AnimeMatch
            title="Qui mange quoi ?"
            instructions="Relie chaque étape à ce qui lui correspond."
            footerNote="Observation · papillon · 6–7 ans"
            accent="sky"
            left={[
              { word: "la chenille", Picto: PictoCaterpillar },
              { word: "le papillon", Picto: PictoButterfly },
              { word: "l'œuf", Picto: PictoEgg },
            ]}
            right={["posé sur une feuille", "butine le nectar", "mange des feuilles"]}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature + écrire — papillon"
            footerNote="Vocabulaire · papillon · 8–10 ans · photos"
            accent="sun"
            age="8-10"
            cards={NOMENCLATURE_PAPILLON}
          />
          <PapillonCrossword />
          <AnimeWriting
            title="Écriture + phrases"
            instructions="Écris en majuscules et en cursive, puis invente une phrase."
            footerNote="Écriture · papillon · 8–10 ans"
            accent="tangerine"
            phrase
            words={[
              { word: "papillon", Picto: PictoButterfly },
              { word: "chenille", Picto: PictoCaterpillar },
              { word: "chrysalide", Picto: PictoChrysalis },
            ]}
          />
          <AnimeOrder
            title="Cycle à raconter"
            instructions="Ordonne les étapes, puis raconte le cycle à voix haute (ou écris 2 phrases au dos)."
            footerNote="Sciences · papillon · 8–10 ans"
            accent="berry"
            steps={[
              { n: 1, label: "Œuf déposé sur une feuille" },
              { n: 2, label: "Chenille qui grandit" },
              { n: 3, label: "Chrysalide (métamorphose)" },
              { n: 4, label: "Papillon adulte qui vole" },
            ]}
          />
          <AnimeMatch
            title="Habitats & fleurs"
            instructions="Relie chaque élément à son milieu ou son rôle."
            footerNote="Sciences · papillon · 8–10 ans"
            accent="sky"
            left={[
              { word: "le papillon", Picto: PictoButterfly },
              { word: "la chenille", Picto: PictoCaterpillar },
              { word: "la fleur", Picto: PictoBloom },
              { word: "l'aile", Picto: PictoWing },
            ]}
            right={["prairie / jardin", "feuille nourricière", "nectar / pollen", "vol et motifs"]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — les papillons"
            footerNote="Esprit critique · papillon · 8–10 ans"
            accent="leaf"
            statements={[
              { text: "Le papillon commence sa vie en œuf.", truth: true },
              { text: "La chenille mange surtout des feuilles.", truth: true },
              { text: "Tous les papillons sont gris.", truth: false },
              { text: "La chrysalide est une étape avant le papillon.", truth: true },
              { text: "Le papillon naît directement adulte, sans chenille.", truth: false },
            ]}
          />
        </>
      )}
    </div>
  )
}

/**
 * Mots croisés papillon — 8–10.
 * Intersections vérifiées :
 *   PAPILLON H @ (1,0)
 *   AILE     V @ (1,1) croise A
 *   FLEUR    V @ (0,4) croise L
 *   OEUF     H @ (2,3) croise E de FLEUR
 */
function PapillonCrossword() {
  type Cell = { num?: number } | null
  const rows = 5
  const cols = 8
  const g: Cell[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  const place = (word: string, r: number, c: number, dir: "H" | "V", num: number) => {
    ;[...word].forEach((_, i) => {
      const rr = dir === "H" ? r : r + i
      const cc = dir === "H" ? c + i : c
      if (!g[rr][cc]) g[rr][cc] = {}
      if (i === 0) g[rr][cc] = { num }
    })
  }
  place("PAPILLON", 1, 0, "H", 1)
  place("AILE", 1, 1, "V", 2)
  place("FLEUR", 0, 4, "V", 3)
  place("OEUF", 2, 3, "H", 4)

  const across = [
    { n: 1, text: "Insecte aux ailes colorées, né d'une chenille." },
    { n: 4, text: "Premier stade du cycle, posé sur une feuille." },
  ]
  const down = [
    { n: 2, text: "Partie qui permet au papillon de voler." },
    { n: 3, text: "La chenille s'en nourrit ; le papillon la butine." },
  ]

  return (
    <WorksheetFrame
      title="Mots croisés du papillon"
      instructions="Lis les définitions. Écris les mots en MAJUSCULES dans la grille."
      footerNote="Mots croisés · papillon · 8–10 ans"
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
