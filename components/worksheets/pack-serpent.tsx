import type { AgeGroup, PackAgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { NOMENCLATURE_SERPENT } from "@/lib/worksheets/nomenclature-sets"
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
import { SnakeLifecycleCircle } from "./snake-lifecycle-circle"
import { WorksheetFrame } from "./worksheet-frame"
import {
  PictoDesert,
  PictoEgg,
  PictoForest,
  PictoScale,
  PictoSnake,
  PictoTongue,
} from "./art/pictos-animaux"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<PackAgeGroup,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "2-3": {
    subtitle: "Pack sensoriel — à vivre avec un adulte",
    contents: [
      "1. Grand coloriage serpent",
      "2. Coloriage œuf",
      "3. Cartes à nommer (oral)",
      "4. Aide l'œuf (tracé)",
      "5. Qui va avec qui ?",
    ],
    activityCount: 5,
  },
  "4-5": {
    subtitle: "Pack découverte — 7 activités",
    contents: [
      "1. Grand coloriage serpent",
      "2. Anatomie — 5 parties",
      "3. Cartes de nomenclature",
      "4. Syllabes (1 trou)",
      "5. J'écris 3 mots",
      "6. Cycle de vie en rond",
      "7. Qui vit où ?",
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
      "5. Remets la vie en ordre",
      "6. Qui vit où ?",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — curiosité douce",
    contents: [
      "1. Nomenclature + écrire",
      "2. Mots croisés du serpent",
      "3. Écriture + phrases",
      "4. Cycle à raconter",
      "5. Habitats & écailles",
      "6. Vrai / faux — serpents",
    ],
    activityCount: 6,
  },
}

/** Pack multi-pages « Le serpent » — décliné par âge */
export function PackSerpent({ age }: { age: PackAgeGroup }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="Le serpent"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Animaux · Nature · Curiosité"
        contents={meta.contents}
        accent="leaf"
        Hero={PictoSnake}
      />

      {age === "2-3" ? (
        <>
          <AnimeColoring
            title="Je colorie le serpent"
            instructions="Colorie le serpent. Gros crayons, gros gestes — c'est parfait !"
            footerNote="Coloriage · serpent · 2–3 ans"
            accent="leaf"
            Hero={PictoSnake}
          />
          <AnimeColoring
            title="Je colorie l'œuf"
            instructions="Colorie l'œuf. Le serpent naît dedans, bien au chaud."
            footerNote="Coloriage · serpent · 2–3 ans"
            accent="tangerine"
            Hero={PictoEgg}
          />
          <NomenclatureCards
            title="Cartes à nommer — serpent"
            footerNote="Vocabulaire oral · serpent · 2–3 ans · photos"
            accent="sun"
            age="2-3"
            cards={NOMENCLATURE_SERPENT}
          />
          <AnimePath
            title="Aide l'œuf à devenir un serpent"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot SERPENT."
            footerNote="Tracés · serpent · 2–3 ans"
            accent="berry"
            From={PictoEgg}
            To={PictoSnake}
            bubbleWord="SERPENT"
          />
          <AnimeMatch
            title="Qui va avec qui ?"
            instructions="Relie chaque image à ce qui lui va bien."
            footerNote="Logique · serpent · 2–3 ans"
            accent="sky"
            left={[
              { word: "le serpent", Picto: PictoSnake },
              { word: "l'écaille", Picto: PictoScale },
              { word: "l'œuf", Picto: PictoEgg },
            ]}
            right={["protège le corps", "devient un serpent", "langue fourchue"]}
          />
        </>
      ) : age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie le serpent"
            instructions="Colorie le grand serpent : corps blanc à remplir, motifs d'écailles à inventer. Gros crayons bienvenus !"
            footerNote="Coloriage · serpent · 4–5 ans"
            accent="leaf"
            Hero={PictoSnake}
          />
          <AnatomySheet slug="anatomie-du-serpent" age={age} />
          <NomenclatureCards
            title="Cartes de nomenclature — serpent"
            footerNote="Vocabulaire · serpent · 4–5 ans · photos"
            accent="sun"
            age="4-5"
            cards={NOMENCLATURE_SERPENT}
          />
          <AnimeSyllables
            title="Syllabes — mots du serpent"
            footerNote="Lecture · serpent · 4–5 ans"
            accent="berry"
            items={[
              { word: "SERPENT", parts: ["SER", "PENT"], missing: [0], src: "/nomenclature/serpent/serpent.jpg", alt: "Photo d'un serpent" },
              { word: "ECAILLE", parts: ["E", "CAIL", "LE"], missing: [1], src: "/nomenclature/serpent/ecaille.jpg", alt: "Photo d'écailles de serpent" },
              { word: "LANGUE", parts: ["LAN", "GUE"], missing: [0], src: "/nomenclature/serpent/langue.jpg", alt: "Photo d'une langue de serpent" },
              { word: "DESERT", parts: ["DE", "SERT"], missing: [1], src: "/nomenclature/serpent/desert.jpg", alt: "Photo d'un désert" },
            ]}
          />
          <AnimeWriting
            title="J'écris les mots du serpent"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · serpent · 4–5 ans"
            accent="sky"
            words={[
              { word: "serpent", Picto: PictoSnake },
              { word: "écaille", Picto: PictoScale },
              { word: "langue", Picto: PictoTongue },
            ]}
          />
          <SnakeLifecycleCircle />
          <AnimeMatch
            title="Qui vit où ?"
            instructions="Relie chaque image à son lieu. On observe les serpents avec curiosité, pas avec peur."
            footerNote="Logique · serpent · 4–5 ans"
            accent="berry"
            left={[
              { word: "le désert", Picto: PictoDesert },
              { word: "la forêt", Picto: PictoForest },
              { word: "l'œuf", Picto: PictoEgg },
            ]}
            right={["nid au chaud", "sable et soleil", "arbres et feuilles"]}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <NomenclatureCards
            title="Nomenclature à associer — serpent"
            footerNote="Vocabulaire · serpent · 6–7 ans · photos"
            accent="sun"
            age="6-7"
            cards={NOMENCLATURE_SERPENT}
          />
          <AnimeSyllables
            title="Syllabes — défi serpent"
            footerNote="Lecture · serpent · 6–7 ans"
            accent="berry"
            items={[
              { word: "SERPENT", parts: ["SER", "PENT"], missing: [0], src: "/nomenclature/serpent/serpent.jpg", alt: "Photo d'un serpent" },
              { word: "ECAILLE", parts: ["E", "CAIL", "LE"], missing: [0, 2], src: "/nomenclature/serpent/ecaille.jpg", alt: "Photo d'écailles de serpent" },
              { word: "LANGUE", parts: ["LAN", "GUE"], missing: [1], src: "/nomenclature/serpent/langue.jpg", alt: "Photo d'une langue de serpent" },
              { word: "DESERT", parts: ["DE", "SERT"], missing: [1], src: "/nomenclature/serpent/desert.jpg", alt: "Photo d'un désert" },
            ]}
          />
          <AnimePath
            title="Chemin zigzag — serpent"
            instructions="Trace le chemin secret. Colorie les bulles du mot ECAILLE."
            footerNote="Tracés · serpent · 6–7 ans"
            accent="tangerine"
            From={PictoEgg}
            To={PictoSnake}
            bubbleWord="ECAILLE"
            hard
          />
          <AnimeWriting
            title="J'écris 4 mots"
            instructions="Écris en MAJUSCULES puis en cursive."
            footerNote="Écriture · serpent · 6–7 ans"
            accent="sky"
            words={[
              { word: "serpent", Picto: PictoSnake },
              { word: "écaille", Picto: PictoScale },
              { word: "langue", Picto: PictoTongue },
              { word: "désert", Picto: PictoDesert },
            ]}
          />
          <AnimeOrder
            title="La vie du serpent"
            instructions="Remets les étapes dans l'ordre (1 → 4)."
            footerNote="Sciences · serpent · 6–7 ans"
            accent="leaf"
            steps={[
              { n: 1, label: "L'œuf dans le nid" },
              { n: 2, label: "Le bébé serpent naît" },
              { n: 3, label: "Le serpent grandit" },
              { n: 4, label: "Le serpent adulte explore" },
            ]}
          />
          <AnimeMatch
            title="Qui vit où ?"
            instructions="Relie chaque élément à son milieu ou son rôle."
            footerNote="Observation · serpent · 6–7 ans"
            accent="berry"
            left={[
              { word: "le serpent du désert", Picto: PictoDesert },
              { word: "le serpent de forêt", Picto: PictoForest },
              { word: "l'écaille", Picto: PictoScale },
            ]}
            right={["sable chaud", "sous les feuilles", "protège le corps"]}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature + écrire — serpent"
            footerNote="Vocabulaire · serpent · 8–10 ans · photos"
            accent="sun"
            age="8-10"
            cards={NOMENCLATURE_SERPENT}
          />
          <SerpentCrossword />
          <AnimeWriting
            title="Écriture + phrases"
            instructions="Écris en majuscules et en cursive, puis invente une phrase."
            footerNote="Écriture · serpent · 8–10 ans"
            accent="sky"
            phrase
            words={[
              { word: "serpent", Picto: PictoSnake },
              { word: "écaille", Picto: PictoScale },
              { word: "langue", Picto: PictoTongue },
            ]}
          />
          <AnimeOrder
            title="Cycle à raconter"
            instructions="Ordonne les étapes, puis raconte la vie du serpent à voix haute (ou écris 2 phrases au dos)."
            footerNote="Sciences · serpent · 8–10 ans"
            accent="leaf"
            steps={[
              { n: 1, label: "Œuf déposé au chaud" },
              { n: 2, label: "Éclosion — bébé serpent" },
              { n: 3, label: "Croissance et mue des écailles" },
              { n: 4, label: "Serpent adulte dans son habitat" },
            ]}
          />
          <AnimeMatch
            title="Habitats & écailles"
            instructions="Relie chaque élément à son milieu ou son rôle."
            footerNote="Sciences · serpent · 8–10 ans"
            accent="berry"
            left={[
              { word: "le serpent", Picto: PictoSnake },
              { word: "l'écaille", Picto: PictoScale },
              { word: "la langue", Picto: PictoTongue },
              { word: "le désert", Picto: PictoDesert },
            ]}
            right={["détecte les odeurs", "sable et chaleur", "revêtement du corps", "ondulations"]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — les serpents"
            footerNote="Esprit critique · serpent · 8–10 ans · curiosité"
            accent="leaf"
            statements={[
              { text: "Le serpent a des écailles sur le corps.", truth: true },
              { text: "Tous les serpents sont méchants.", truth: false },
              { text: "Certains serpents vivent dans le désert.", truth: true },
              { text: "La langue du serpent est fourchue.", truth: true },
              { text: "Le serpent naît directement adulte, sans œuf.", truth: false },
            ]}
          />
        </>
      )}
    </div>
  )
}

/**
 * Mots croisés serpent — 8–10.
 * Intersections vérifiées :
 *   SERPENT  H @ (2,0) — E croise ECAILLE @ (2,1)
 *   ECAILLE  V @ (2,1) — E croise OEUF @ (8,1)
 *   LANGUE   H @ (6,1) — L croise ECAILLE @ (6,1)
 *   OEUF     H @ (8,0)
 */
function SerpentCrossword() {
  type Cell = { num?: number } | null
  const rows = 10
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
  place("SERPENT", 2, 0, "H", 1)
  place("ECAILLE", 2, 1, "V", 2)
  place("LANGUE", 6, 1, "H", 3)
  place("OEUF", 8, 0, "H", 4)

  const across = [
    { n: 1, text: "Reptile sans pattes, aux écailles lisses." },
    { n: 3, text: "Organe fourchu qui sent les odeurs." },
    { n: 4, text: "Premier stade : le serpent naît dedans." },
  ]
  const down = [
    { n: 2, text: "Petite plaque qui recouvre la peau du serpent." },
  ]

  return (
    <WorksheetFrame
      title="Mots croisés du serpent"
      instructions="Lis les définitions. Écris les mots en MAJUSCULES dans la grille."
      footerNote="Mots croisés · serpent · 8–10 ans"
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
