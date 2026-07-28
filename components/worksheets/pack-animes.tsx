import type { AgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
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
  PictoBadge,
  PictoCatHouse,
  PictoCompass,
  PictoCupcake,
  PictoFriendKey,
  PictoKitty,
  PictoLookout,
  PictoMoon,
  PictoNightCat,
  PictoNightHQ,
  PictoNightLizard,
  PictoNightOwl,
  PictoPirateShip,
  PictoRescuePup,
  PictoRescueTruck,
  PictoStrawHat,
  PictoTreasure,
  PictoWave,
  PictoYarn,
} from "./art/pictos-animes"
import {
  NOMENCLATURE_CHATS,
  NOMENCLATURE_NUIT,
  NOMENCLATURE_PIRATE,
  NOMENCLATURE_SECOURS,
} from "@/lib/worksheets/nomenclature-sets"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */

type OnePieceAge = "6-7" | "8-10"
type AnimePackAge = Exclude<AgeGroup, "2-3">

const UNIVERSE_ONE_PIECE = "L'univers de One Piece"
const UNIVERSE_PYJAMASQUES = "L'univers des Pyjamasques"
const UNIVERSE_GABBY = "L'univers de Gabby et la maison magique des chats"
const UNIVERSE_PAT_PATROUILLE = "L'univers de Pat' Patrouille"

const ONE_PIECE_META: Record<
  OnePieceAge,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "6-7": {
    subtitle: "Pack aventure — pirates & trésor",
    contents: [
      "1. Coloriage du bateau pirate",
      "2. Cartes de nomenclature",
      "3. Chemin vers le trésor",
      "4. Syllabes de l'aventure",
      "5. Remets l'aventure en ordre",
      "6. Vrai ou faux — pirates",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — navigation & défis",
    contents: [
      "1. Nomenclature + écrire",
      "2. Mots croisés pirates",
      "3. Petite lecture — cartes & mer",
      "4. Mots fléchés",
      "5. Écriture + phrases",
      "6. Outils de navigation",
      "7. Aventure à raconter",
      "8. Vrai / faux — esprit critique",
    ],
    activityCount: 8,
  },
}

/** Pack One Piece — décliné 6–7 et 8–10 ans */
export function PackOnePiece({ age }: { age: OnePieceAge }) {
  const meta = ONE_PIECE_META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title={UNIVERSE_ONE_PIECE}
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Pirates · Aventure · Lecture"
        contents={meta.contents}
        accent="tangerine"
        Hero={PictoPirateShip}
      />

      {age === "6-7" ? (
        <>
          <AnimeColoring
            title="Je colorie le bateau pirate"
            instructions="Colorie le bateau, les voiles et la mer. Dis à voix haute : le bateau, le chapeau, le trésor…"
            footerNote="Coloriage · One Piece · 6–7 ans"
            accent="tangerine"
            Hero={PictoPirateShip}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — aventure"
            footerNote="Vocabulaire · One Piece · 6–7 ans · photos"
            accent="sun"
            age="6-7"
            cards={NOMENCLATURE_PIRATE}
          />
          <AnimePath
            title="Aide le chapeau à rejoindre le trésor"
            instructions="Trace le chemin zigzag. Colorie ensuite les bulles du mot TRESOR."
            footerNote="Tracés · One Piece · 6–7 ans"
            accent="berry"
            From={PictoStrawHat}
            To={PictoTreasure}
            bubbleWord="TRESOR"
            hard
          />
          <AnimeSyllables
            title="Syllabes de l'aventure"
            footerNote="Syllabes · One Piece · 6–7 ans"
            accent="sky"
            items={[
              { word: "BATEAU", parts: ["BA", "TEAU"], missing: [0], src: "/nomenclature/pirate/bateau.jpg", alt: "Photo d'un bateau à voiles" },
              { word: "TRESOR", parts: ["TRE", "SOR"], missing: [1], src: "/nomenclature/pirate/tresor.jpg", alt: "Photo d'un coffre" },
              { word: "PIRATE", parts: ["PI", "RATE"], missing: [0], src: "/nomenclature/pirate/chapeau.jpg", alt: "Photo d'un chapeau" },
              { word: "BOUSSOLE", parts: ["BOU", "SSO", "LE"], missing: [1], src: "/nomenclature/pirate/boussole.jpg", alt: "Photo d'une boussole" },
            ]}
          />
          <AnimeOrder
            title="Remets l'aventure en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter une petite aventure pirate."
            footerNote="Logique · One Piece · 6–7 ans"
            accent="leaf"
            steps={[
              { n: 1, label: "On hisse les voiles" },
              { n: 2, label: "On suit la boussole" },
              { n: 3, label: "On trouve l'île" },
              { n: 4, label: "On ouvre le coffre" },
            ]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — pirates"
            footerNote="Défi · One Piece · 6–7 ans"
            accent="tangerine"
            statements={[
              { text: "Une boussole aide à se repérer en mer.", truth: true },
              { text: "Un trésor se cache toujours sous un lit.", truth: false },
              { text: "Un bateau pirate a souvent des voiles.", truth: true },
            ]}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature + écrire — aventure pirate"
            footerNote="Vocabulaire · One Piece · 8–10 ans · photos"
            accent="sun"
            age="8-10"
            cards={NOMENCLATURE_PIRATE}
          />
          <PirateCrossword />
          <PirateReading />
          <PirateFleches />
          <AnimeWriting
            title="Écriture + phrases"
            instructions="Écris en majuscules et en cursive, puis invente une phrase."
            footerNote="Écriture · One Piece · 8–10 ans"
            accent="leaf"
            phrase
            words={[
              { word: "navire", Picto: PictoPirateShip },
              { word: "boussole", Picto: PictoCompass },
              { word: "expédition", Picto: PictoTreasure },
            ]}
          />
          <AnimeMatch
            title="Outils de navigation"
            instructions="Relie chaque élément à son rôle. Discutez de vos choix."
            footerNote="Observation · One Piece · 8–10 ans"
            accent="sky"
            left={[
              { word: "la boussole", Picto: PictoCompass },
              { word: "le navire", Picto: PictoPirateShip },
              { word: "la mer", Picto: PictoWave },
              { word: "le trésor", Picto: PictoTreasure },
            ]}
            right={[
              "indique le nord magnétique",
              "traverse l'océan",
              "relie les îles et les ports",
              "récompense une longue expédition",
            ]}
          />
          <AnimeOrder
            title="Aventure à raconter"
            instructions="Ordonne les étapes, puis raconte l'expédition à voix haute (ou écris 2 phrases au dos)."
            footerNote="Logique · One Piece · 8–10 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "L'équipage étudie la carte et la boussole" },
              { n: 2, label: "On hisse les voiles et on quitte le port" },
              { n: 3, label: "On traverse l'océan et on repère une île" },
              { n: 4, label: "On explore l'île et on partage la découverte" },
            ]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — esprit critique"
            footerNote="Esprit critique · One Piece · 8–10 ans"
            accent="berry"
            statements={[
              { text: "La boussole aide à se repérer grâce au champ magnétique de la Terre.", truth: true },
              { text: "Les pirates de fiction ressemblent toujours aux navigateurs réels du passé.", truth: false },
              { text: "Une carte ancienne peut contenir une échelle et une légende.", truth: true },
              { text: "Le vent peut propulser un navire à voile sans moteur.", truth: true },
              { text: "Un trésor est toujours un coffre rempli d'or.", truth: false },
            ]}
          />
        </>
      )}
    </div>
  )
}

/**
 * Mots croisés pirates — 8–10.
 * Intersections vérifiées :
 *   NAVIRE H @ (1,0)
 *   CARTE  V @ (0,1) croise A
 *   ILE    V @ (1,3) croise I
 *   TRESOR H @ (3,1) croise T et E
 */
function PirateCrossword() {
  type Cell = { num?: number } | null
  const rows = 5
  const cols = 7
  const g: Cell[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  const place = (word: string, r: number, c: number, dir: "H" | "V", num: number) => {
    ;[...word].forEach((_, i) => {
      const rr = dir === "H" ? r : r + i
      const cc = dir === "H" ? c + i : c
      if (!g[rr][cc]) g[rr][cc] = {}
      if (i === 0) g[rr][cc] = { num }
    })
  }
  place("NAVIRE", 1, 0, "H", 1)
  place("CARTE", 0, 1, "V", 2)
  place("ILE", 1, 3, "V", 3)
  place("TRESOR", 3, 1, "H", 4)

  const across = [
    { n: 1, text: "Grand bateau qui traverse les océans." },
    { n: 4, text: "Coffre ou cache rempli d'objets précieux." },
  ]
  const down = [
    { n: 2, text: "Dessin qui montre un itinéraire ou une île." },
    { n: 3, text: "Morceau de terre entouré d'eau." },
  ]

  return (
    <WorksheetFrame
      title="Mots croisés pirates"
      instructions="Lis les définitions. Écris les mots en MAJUSCULES dans la grille."
      footerNote="Mots croisés · One Piece · 8–10 ans"
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

const PIRATE_ARROWS = [
  { dir: "→", clue: "Indique le nord magnétique", hint: "B _ _ _ _ _ _" },
  { dir: "→", clue: "Grand bateau qui traverse l'océan", hint: "N _ _ _ _ _" },
  { dir: "↓", clue: "Maintient le bateau au port", hint: "A _ _ _ _" },
  { dir: "→", clue: "Montre un itinéraire ou une île", hint: "C _ _ _ _" },
]

function PirateFleches() {
  return (
    <WorksheetFrame
      title="Mots fléchés — navigation"
      instructions="Lis chaque définition. Écris le mot en MAJUSCULES sur la ligne."
      footerNote="Mots fléchés · One Piece · 8–10 ans"
      accent="sky"
    >
      <div className="space-y-3">
        {PIRATE_ARROWS.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-3 sm:flex-row sm:items-center"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-sun font-display text-lg font-bold">
              {item.dir}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-snug">{item.clue}</p>
              <p className="mt-1 font-display text-xs tracking-widest text-ink/40">{item.hint}</p>
              <div className="mt-2 h-8 border-b-[3px] border-ink" />
            </div>
          </div>
        ))}
      </div>
    </WorksheetFrame>
  )
}

function PirateReading() {
  return (
    <WorksheetFrame
      title="Petite lecture — cartes & mer"
      instructions="Lis le texte à voix haute ou en silence, puis réponds aux questions."
      footerNote="Compréhension · One Piece · 8–10 ans"
      accent="tangerine"
    >
      <div className="space-y-5">
        <div className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4 text-sm leading-relaxed">
          <p>
            Lire une carte de mer, c&apos;est comme lire une histoire géante. On y trouve souvent une{" "}
            <strong>rose des vents</strong>, une <strong>échelle</strong> et des symboles pour les îles ou
            les dangers. Les navigateurs d&apos;autrefois observaient le ciel, la boussole et le vent pour
            choisir leur route.
          </p>
          <p className="mt-3">
            Dans les aventures de fiction, les pirates cherchent un trésor caché — mais dans la réalité,
            beaucoup de marins traversaient l&apos;océan pour <strong>commercer</strong> ou{" "}
            <strong>découvrir</strong> de nouvelles terres.
          </p>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border-[3px] border-dashed border-ink bg-white p-3">
            <p className="font-display text-sm font-bold">1. Que peut-on trouver sur une carte de mer ?</p>
            <div className="mt-2 h-10 border-b-[3px] border-ink" />
          </div>
          <div className="rounded-xl border-[3px] border-dashed border-ink bg-white p-3">
            <p className="font-display text-sm font-bold">
              2. Qu&apos;aide un navigateur à choisir sa route ?
            </p>
            <div className="mt-2 h-10 border-b-[3px] border-ink" />
          </div>
          <div className="rounded-xl border-[3px] border-ink bg-sun/25 p-3">
            <p className="font-display text-sm font-bold">Pour discuter</p>
            <p className="mt-1 text-sm font-medium">
              Un trésor, ce n&apos;est pas que de l&apos;or. Qu&apos;aimerais-tu découvrir lors d&apos;une
              expédition ?
            </p>
          </div>
        </div>
      </div>
    </WorksheetFrame>
  )
}

const PAT_PATROUILLE_META: Record<
  AnimePackAge,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "4-5": {
    subtitle: "Pack secours — chiens héros",
    contents: [
      "1. Coloriage du chiot secours",
      "2. Cartes de nomenclature",
      "3. Chemin vers la tour",
      "4. J'écris 3 mots",
      "5. Qui fait quoi ? (associer)",
    ],
    activityCount: 5,
  },
  "6-7": {
    subtitle: "Pack lecture & missions",
    contents: [
      "1. Nomenclature (séparée)",
      "2. Chemin zigzag + SECOURS",
      "3. Syllabes du secours",
      "4. Écriture — 4 mots",
      "5. Remets la mission en ordre",
      "6. Vrai ou faux — secours",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — équipe de secours",
    contents: [
      "1. Nomenclature + écrire",
      "2. Chemin défi",
      "3. Syllabes du secours",
      "4. Écriture + phrases",
      "5. Ordre & raconter",
      "6. Vrai / faux — secours",
    ],
    activityCount: 6,
  },
}

/** Pack Pat' Patrouille — décliné 4–5, 6–7 et 8–10 ans */
export function PackPatPatrouille({ age }: { age: AnimePackAge }) {
  const meta = PAT_PATROUILLE_META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title={UNIVERSE_PAT_PATROUILLE}
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Animés · Chiens · Motricité"
        contents={meta.contents}
        accent="sky"
        Hero={PictoRescuePup}
      />

      {age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie le chiot secours"
            instructions="Colorie le chiot et son badge. Gros crayons bienvenus !"
            footerNote="Coloriage · Pat' Patrouille · 4–5 ans"
            accent="sky"
            Hero={PictoRescuePup}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — secours"
            footerNote="Vocabulaire · Pat' Patrouille · 4–5 ans · photos"
            accent="sun"
            age="4-5"
            cards={NOMENCLATURE_SECOURS}
          />
          <AnimePath
            title="Aide le chiot à rejoindre la tour"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot SECOURS."
            footerNote="Tracés · Pat' Patrouille · 4–5 ans"
            accent="berry"
            From={PictoRescuePup}
            To={PictoLookout}
            bubbleWord="SECOURS"
          />
          <AnimeWriting
            title="J'écris les mots du secours"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · Pat' Patrouille · 4–5 ans"
            accent="leaf"
            words={[
              { word: "chiot", Picto: PictoRescuePup },
              { word: "badge", Picto: PictoBadge },
              { word: "camion", Picto: PictoRescueTruck },
            ]}
          />
          <AnimeMatch
            title="Qui fait quoi ?"
            instructions="Relie (ou numérote) chaque image à sa mission."
            footerNote="Logique · Pat' Patrouille · 4–5 ans"
            accent="tangerine"
            left={[
              { word: "le chiot", Picto: PictoRescuePup },
              { word: "le camion", Picto: PictoRescueTruck },
              { word: "la tour", Picto: PictoLookout },
            ]}
            right={["roule vite", "observe loin", "aide les amis"]}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <NomenclatureCards
            title="Nomenclature — secours"
            footerNote="Vocabulaire · Pat' Patrouille · 6–7 ans · photos"
            accent="sun"
            age="6-7"
            cards={NOMENCLATURE_SECOURS}
          />
          <AnimePath
            title="Aide le chiot à rejoindre la tour"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot SECOURS."
            footerNote="Tracés · Pat' Patrouille · 6–7 ans"
            accent="berry"
            From={PictoRescuePup}
            To={PictoLookout}
            bubbleWord="SECOURS"
            hard
          />
          <AnimeSyllables
            title="Syllabes du secours"
            footerNote="Syllabes · Pat' Patrouille · 6–7 ans"
            accent="sky"
            items={[
              { word: "CHIOT", parts: ["CHI", "OT"], missing: [0], src: "/nomenclature/secours/chiot.jpg", alt: "Photo d'un chiot" },
              { word: "CAMION", parts: ["CA", "MION"], missing: [1], src: "/nomenclature/secours/camion.jpg", alt: "Photo d'un camion" },
              { word: "SECOURS", parts: ["SE", "COURS"], missing: [0], src: "/nomenclature/secours/camion.jpg", alt: "Photo d'un camion de secours" },
              { word: "BADGE", parts: ["BA", "DGE"], missing: [1], src: "/nomenclature/secours/badge.jpg", alt: "Photo d'un badge" },
            ]}
          />
          <AnimeWriting
            title="J'écris — vocabulaire secours"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · Pat' Patrouille · 6–7 ans"
            accent="leaf"
            words={[
              { word: "secours", Picto: PictoRescuePup },
              { word: "mission", Picto: PictoBadge },
              { word: "camion", Picto: PictoRescueTruck },
              { word: "tour", Picto: PictoLookout },
            ]}
          />
          <AnimeOrder
            title="Remets la mission en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter une mission de secours."
            footerNote="Logique · Pat' Patrouille · 6–7 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "On reçoit l'appel" },
              { n: 2, label: "On monte dans le camion" },
              { n: 3, label: "On arrive sur place" },
              { n: 4, label: "On aide et on rentre" },
            ]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — secours"
            footerNote="Défi · Pat' Patrouille · 6–7 ans"
            accent="sky"
            statements={[
              { text: "La tour permet d'observer de loin.", truth: true },
              { text: "Un badge sert à décorer seulement.", truth: false },
              { text: "Le camion peut transporter du matériel.", truth: true },
            ]}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature — secours"
            footerNote="Vocabulaire · Pat' Patrouille · 8–10 ans · photos"
            accent="sun"
            age="8-10"
            cards={NOMENCLATURE_SECOURS}
          />
          <AnimePath
            title="Aide le chiot à rejoindre la tour"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot PATROUILLE."
            footerNote="Tracés · Pat' Patrouille · 8–10 ans"
            accent="berry"
            From={PictoRescuePup}
            To={PictoLookout}
            bubbleWord="PATROUILLE"
            hard
          />
          <AnimeSyllables
            title="Syllabes du secours"
            footerNote="Syllabes · Pat' Patrouille · 8–10 ans"
            accent="sky"
            items={[
              { word: "PATROUILLE", parts: ["PA", "TROU", "ILLE"], missing: [1], src: "/nomenclature/secours/chiot.jpg", alt: "Photo d'un chiot" },
              { word: "MISSION", parts: ["MIS", "SION"], missing: [0], src: "/nomenclature/secours/badge.jpg", alt: "Photo d'un badge" },
              { word: "SECOURS", parts: ["SE", "COURS"], missing: [1], src: "/nomenclature/secours/camion.jpg", alt: "Photo d'un camion de secours" },
              { word: "EQUIPE", parts: ["E", "QUI", "PE"], missing: [1], src: "/nomenclature/secours/badge.jpg", alt: "Photo d'un badge" },
            ]}
          />
          <AnimeWriting
            title="J'écris et je raconte"
            instructions="Majuscules, cursive, puis une phrase courte sous chaque mot."
            footerNote="Écriture · Pat' Patrouille · 8–10 ans"
            accent="leaf"
            phrase
            words={[
              { word: "secours", Picto: PictoRescuePup },
              { word: "mission", Picto: PictoBadge },
              { word: "équipe", Picto: PictoRescueTruck },
            ]}
          />
          <AnimeOrder
            title="Ordre & raconter la mission"
            instructions="Numérote les étapes de 1 à 4, puis raconte la mission à voix haute."
            footerNote="Logique · Pat' Patrouille · 8–10 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "L'équipe se réunit au QG" },
              { n: 2, label: "Chacun reçoit sa mission" },
              { n: 3, label: "On intervient sur le terrain" },
              { n: 4, label: "On fait le bilan ensemble" },
            ]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — secours"
            footerNote="Défi · Pat' Patrouille · 8–10 ans"
            accent="berry"
            statements={[
              { text: "Une équipe de secours travaille souvent en groupe.", truth: true },
              { text: "Observer depuis la tour ne sert à rien.", truth: false },
              { text: "Chaque membre peut avoir un rôle différent.", truth: true },
              { text: "Un camion de secours ne transporte jamais de matériel.", truth: false },
            ]}
          />
        </>
      )}
    </div>
  )
}

const PYJAMASQUES_META: Record<
  AnimePackAge,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "4-5": {
    subtitle: "Pack héros de la nuit",
    contents: [
      "1. Coloriage du héros chat",
      "2. Cartes de nomenclature",
      "3. Chemin vers le QG",
      "4. J'écris 3 mots",
      "5. Remets la nuit en ordre",
    ],
    activityCount: 5,
  },
  "6-7": {
    subtitle: "Pack lecture & nuit",
    contents: [
      "1. Nomenclature (séparée)",
      "2. Chemin zigzag + NUIT",
      "3. Syllabes de la nuit",
      "4. Écriture — 4 mots",
      "5. Remets la mission en ordre",
      "6. Vrai ou faux — héros",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — héros nocturnes",
    contents: [
      "1. Nomenclature + écrire",
      "2. Chemin défi",
      "3. Syllabes de la nuit",
      "4. Écriture + phrases",
      "5. Ordre & raconter",
      "6. Vrai / faux — héros",
    ],
    activityCount: 6,
  },
}

/** Pack Pyjamasques — décliné 4–5, 6–7 et 8–10 ans */
export function PackPyjamasques({ age }: { age: AnimePackAge }) {
  const meta = PYJAMASQUES_META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title={UNIVERSE_PYJAMASQUES}
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Nuit · Héros · Vocabulaire"
        contents={meta.contents}
        accent="berry"
        Hero={PictoNightCat}
      />

      {age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie le héros chat"
            instructions="Colorie le héros. Observe les oreilles, le masque, le costume…"
            footerNote="Coloriage · Pyjamasques · 4–5 ans"
            accent="berry"
            Hero={PictoNightCat}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — nuit"
            footerNote="Vocabulaire · Pyjamasques · 4–5 ans · photos"
            accent="sky"
            age="4-5"
            cards={NOMENCLATURE_NUIT}
          />
          <AnimePath
            title="Aide le chat à rejoindre le QG"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot NUIT."
            footerNote="Tracés · Pyjamasques · 4–5 ans"
            accent="sun"
            From={PictoNightCat}
            To={PictoNightHQ}
            bubbleWord="NUIT"
          />
          <AnimeWriting
            title="J'écris les mots de la nuit"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · Pyjamasques · 4–5 ans"
            accent="leaf"
            words={[
              { word: "chat", Picto: PictoNightCat },
              { word: "hibou", Picto: PictoNightOwl },
              { word: "lune", Picto: PictoMoon },
            ]}
          />
          <AnimeOrder
            title="Remets la nuit en ordre"
            instructions="Numérote les étapes de 1 à 4 : une soirée de héros !"
            footerNote="Logique · Pyjamasques · 4–5 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "Le jour se couche" },
              { n: 2, label: "On enfile le costume" },
              { n: 3, label: "On part en mission" },
              { n: 4, label: "On rentre au QG" },
            ]}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <NomenclatureCards
            title="Nomenclature — héros de la nuit"
            footerNote="Vocabulaire · Pyjamasques · 6–7 ans · photos"
            accent="sky"
            age="6-7"
            cards={NOMENCLATURE_NUIT}
          />
          <AnimePath
            title="Aide le chat à rejoindre le QG"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot NUIT."
            footerNote="Tracés · Pyjamasques · 6–7 ans"
            accent="sun"
            From={PictoNightCat}
            To={PictoNightHQ}
            bubbleWord="NUIT"
            hard
          />
          <AnimeSyllables
            title="Syllabes de la nuit"
            footerNote="Syllabes · Pyjamasques · 6–7 ans"
            accent="berry"
            items={[
              { word: "NUIT", parts: ["NU", "IT"], missing: [1], src: "/nomenclature/nuit/nuit.jpg", alt: "Photo d'un ciel nocturne" },
              { word: "CHAT", parts: ["CH", "AT"], missing: [0], src: "/nomenclature/nuit/chat.jpg", alt: "Photo d'un chat" },
              { word: "HIBOU", parts: ["HI", "BOU"], missing: [1], src: "/nomenclature/animaux/hibou.jpg", alt: "Photo d'un hibou" },
              { word: "HEROS", parts: ["HE", "ROS"], missing: [0], src: "/nomenclature/nuit/masque.jpg", alt: "Photo d'un masque" },
            ]}
          />
          <AnimeWriting
            title="J'écris — vocabulaire de la nuit"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · Pyjamasques · 6–7 ans"
            accent="leaf"
            words={[
              { word: "nuit", Picto: PictoMoon },
              { word: "héros", Picto: PictoNightCat },
              { word: "hibou", Picto: PictoNightOwl },
              { word: "masque", Picto: PictoNightHQ },
            ]}
          />
          <AnimeOrder
            title="Remets la mission en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter une mission nocturne."
            footerNote="Logique · Pyjamasques · 6–7 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "La lune se lève" },
              { n: 2, label: "On active les pouvoirs" },
              { n: 3, label: "On protège la ville" },
              { n: 4, label: "On revient au QG" },
            ]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — héros"
            footerNote="Défi · Pyjamasques · 6–7 ans"
            accent="berry"
            statements={[
              { text: "Le hibou peut voler la nuit.", truth: true },
              { text: "La lune brille seulement le matin.", truth: false },
              { text: "Un masque peut cacher son identité.", truth: true },
            ]}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature — héros de la nuit"
            footerNote="Vocabulaire · Pyjamasques · 8–10 ans · photos"
            accent="sky"
            age="8-10"
            cards={NOMENCLATURE_NUIT}
          />
          <AnimePath
            title="Aide le héros à rejoindre le QG"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot MISSION."
            footerNote="Tracés · Pyjamasques · 8–10 ans"
            accent="sun"
            From={PictoNightOwl}
            To={PictoNightHQ}
            bubbleWord="MISSION"
            hard
          />
          <AnimeSyllables
            title="Syllabes de la nuit"
            footerNote="Syllabes · Pyjamasques · 8–10 ans"
            accent="berry"
            items={[
              { word: "MISSION", parts: ["MIS", "SION"], missing: [0], src: "/nomenclature/nuit/masque.jpg", alt: "Photo d'un masque" },
              { word: "NOCTURNE", parts: ["NOC", "TUR", "NE"], missing: [1], src: "/nomenclature/nuit/nuit.jpg", alt: "Photo d'un ciel nocturne" },
              { word: "MASQUE", parts: ["MAS", "QUE"], missing: [1], src: "/nomenclature/nuit/masque.jpg", alt: "Photo d'un masque" },
              { word: "POUVOIR", parts: ["POU", "VOIR"], missing: [0], src: "/nomenclature/nuit/masque.jpg", alt: "Photo d'un masque" },
            ]}
          />
          <AnimeWriting
            title="J'écris et je raconte"
            instructions="Majuscules, cursive, puis une phrase courte sous chaque mot."
            footerNote="Écriture · Pyjamasques · 8–10 ans"
            accent="leaf"
            phrase
            words={[
              { word: "mission", Picto: PictoNightCat },
              { word: "nuit", Picto: PictoMoon },
              { word: "héros", Picto: PictoNightOwl },
            ]}
          />
          <AnimeOrder
            title="Ordre & raconter la mission"
            instructions="Numérote les étapes de 1 à 4, puis raconte la mission à voix haute."
            footerNote="Logique · Pyjamasques · 8–10 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "Les héros détectent un problème" },
              { n: 2, label: "Ils planifient leur intervention" },
              { n: 3, label: "Ils agissent dans la ville" },
              { n: 4, label: "Ils célèbrent la réussite au QG" },
            ]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — héros"
            footerNote="Défi · Pyjamasques · 8–10 ans"
            accent="berry"
            statements={[
              { text: "Certains animaux sont actifs surtout la nuit.", truth: true },
              { text: "Une mission se prépare toujours en plein jour.", truth: false },
              { text: "Travailler en équipe aide à résoudre les problèmes.", truth: true },
              { text: "La lune et les étoiles n'ont aucun lien avec la nuit.", truth: false },
            ]}
          />
        </>
      )}
    </div>
  )
}

const GABBY_META: Record<
  AnimePackAge,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "4-5": {
    subtitle: "Pack maison des chats",
    contents: [
      "1. Coloriage de la maison des chats",
      "2. Cartes de nomenclature",
      "3. Chemin vers la maison",
      "4. J'écris 3 mots",
      "5. Qui habite où ? (associer)",
    ],
    activityCount: 5,
  },
  "6-7": {
    subtitle: "Pack lecture & amitié",
    contents: [
      "1. Nomenclature (séparée)",
      "2. Chemin zigzag + CHAT",
      "3. Syllabes des amis",
      "4. Écriture — 4 mots",
      "5. Remets la visite en ordre",
      "6. Vrai ou faux — chats",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — maison des chats",
    contents: [
      "1. Nomenclature + écrire",
      "2. Chemin défi",
      "3. Écriture + phrases",
      "4. Associer amis & objets",
      "5. Ordre & raconter",
      "6. Vrai / faux — chats",
    ],
    activityCount: 6,
  },
}

/** Pack Gabby chat — décliné 4–5, 6–7 et 8–10 ans */
export function PackGabbyChat({ age }: { age: AnimePackAge }) {
  const meta = GABBY_META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title={UNIVERSE_GABBY}
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Chats · Amitié · Maison"
        contents={meta.contents}
        accent="berry"
        Hero={PictoCatHouse}
      />

      {age === "4-5" ? (
        <>
          <AnimeColoring
            title="Je colorie la maison des chats"
            instructions="Colorie la maison aux oreilles. Compte les fenêtres à voix haute."
            footerNote="Coloriage · Gabby · 4–5 ans"
            accent="berry"
            Hero={PictoCatHouse}
          />
          <NomenclatureCards
            title="Cartes de nomenclature — amis chats"
            footerNote="Vocabulaire · Gabby · 4–5 ans · photos"
            accent="sun"
            age="4-5"
            cards={NOMENCLATURE_CHATS}
          />
          <AnimePath
            title="Aide le chaton à rejoindre la maison"
            instructions="Trace le chemin en pointillés. Colorie les bulles du mot CHAT."
            footerNote="Tracés · Gabby · 4–5 ans"
            accent="sky"
            From={PictoKitty}
            To={PictoCatHouse}
            bubbleWord="CHAT"
          />
          <AnimeWriting
            title="J'écris les mots de la maison"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · Gabby · 4–5 ans"
            accent="leaf"
            words={[
              { word: "chat", Picto: PictoKitty },
              { word: "maison", Picto: PictoCatHouse },
              { word: "ami", Picto: PictoFriendKey },
            ]}
          />
          <AnimeMatch
            title="Qui habite où ?"
            instructions="Relie chaque image à l'endroit ou l'objet qui va avec."
            footerNote="Logique · Gabby · 4–5 ans"
            accent="tangerine"
            left={[
              { word: "le chaton", Picto: PictoKitty },
              { word: "le cupcake", Picto: PictoCupcake },
              { word: "la pelote", Picto: PictoYarn },
            ]}
            right={["pour tricoter", "pour fêter", "dans la maison"]}
          />
        </>
      ) : age === "6-7" ? (
        <>
          <NomenclatureCards
            title="Nomenclature — amis chats"
            footerNote="Vocabulaire · Gabby · 6–7 ans · photos"
            accent="sun"
            age="6-7"
            cards={NOMENCLATURE_CHATS}
          />
          <AnimePath
            title="Aide le chaton à rejoindre la maison"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot CHAT."
            footerNote="Tracés · Gabby · 6–7 ans"
            accent="sky"
            From={PictoKitty}
            To={PictoCatHouse}
            bubbleWord="CHAT"
            hard
          />
          <AnimeSyllables
            title="Syllabes des amis"
            footerNote="Syllabes · Gabby · 6–7 ans"
            accent="berry"
            items={[
              { word: "CHAT", parts: ["CH", "AT"], missing: [0], src: "/nomenclature/nuit/chat.jpg", alt: "Photo d'un chat" },
              { word: "MAISON", parts: ["MAI", "SON"], missing: [1], src: "/nomenclature/chats/maison.jpg", alt: "Photo d'une maison" },
              { word: "CHATON", parts: ["CHA", "TON"], missing: [0], src: "/nomenclature/chats/chaton.jpg", alt: "Photo d'un chaton" },
              { word: "AMITIE", parts: ["A", "MI", "TIE"], missing: [1], src: "/nomenclature/chats/cle.jpg", alt: "Photo d'une clé" },
            ]}
          />
          <AnimeWriting
            title="J'écris — vocabulaire des chats"
            instructions="Recopie en majuscules d'imprimerie, puis en cursive."
            footerNote="Écriture · Gabby · 6–7 ans"
            accent="leaf"
            words={[
              { word: "chat", Picto: PictoKitty },
              { word: "maison", Picto: PictoCatHouse },
              { word: "amitié", Picto: PictoFriendKey },
              { word: "pelote", Picto: PictoYarn },
            ]}
          />
          <AnimeOrder
            title="Remets la visite en ordre"
            instructions="Numérote les étapes de 1 à 4 pour raconter une visite à la maison des chats."
            footerNote="Logique · Gabby · 6–7 ans"
            accent="tangerine"
            steps={[
              { n: 1, label: "On frappe à la porte" },
              { n: 2, label: "On entre dans la maison" },
              { n: 3, label: "On joue avec les amis" },
              { n: 4, label: "On dit au revoir" },
            ]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — chats"
            footerNote="Défi · Gabby · 6–7 ans"
            accent="berry"
            statements={[
              { text: "Un chaton peut vivre dans une maison.", truth: true },
              { text: "Une pelote sert à peindre des murs.", truth: false },
              { text: "Les amis peuvent partager un goûter.", truth: true },
            ]}
          />
        </>
      ) : (
        <>
          <NomenclatureCards
            title="Nomenclature — amis chats"
            footerNote="Vocabulaire · Gabby · 8–10 ans · photos"
            accent="sun"
            age="8-10"
            cards={NOMENCLATURE_CHATS}
          />
          <AnimePath
            title="Aide le chaton à rejoindre la maison"
            instructions="Trace le chemin zigzag. Colorie les bulles du mot MAISON."
            footerNote="Tracés · Gabby · 8–10 ans"
            accent="sky"
            From={PictoKitty}
            To={PictoCatHouse}
            bubbleWord="MAISON"
            hard
          />
          <AnimeWriting
            title="J'écris et je raconte"
            instructions="Majuscules, cursive, puis une phrase courte sous chaque mot."
            footerNote="Écriture · Gabby · 8–10 ans"
            accent="leaf"
            phrase
            words={[
              { word: "amitié", Picto: PictoFriendKey },
              { word: "maison", Picto: PictoCatHouse },
              { word: "chaton", Picto: PictoKitty },
            ]}
          />
          <AnimeMatch
            title="Amis & objets"
            instructions="Relie chaque image à l'idée qui lui correspond. Discutez de vos choix."
            footerNote="Logique · Gabby · 8–10 ans"
            accent="tangerine"
            left={[
              { word: "le chaton", Picto: PictoKitty },
              { word: "le cupcake", Picto: PictoCupcake },
              { word: "la pelote", Picto: PictoYarn },
              { word: "la clé", Picto: PictoFriendKey },
            ]}
            right={["pour tricoter", "pour fêter", "habite ici", "ouvre la porte"]}
          />
          <AnimeOrder
            title="Ordre & raconter la visite"
            instructions="Numérote les étapes de 1 à 4, puis raconte la visite à voix haute."
            footerNote="Logique · Gabby · 8–10 ans"
            accent="berry"
            steps={[
              { n: 1, label: "On reçoit l'invitation" },
              { n: 2, label: "On découvre chaque pièce" },
              { n: 3, label: "On prépare une fête surprise" },
              { n: 4, label: "On promet de revenir bientôt" },
            ]}
          />
          <AnimeTrueFalse
            title="Vrai ou faux — chats"
            footerNote="Défi · Gabby · 8–10 ans"
            accent="sky"
            statements={[
              { text: "L'amitié demande parfois de l'écoute.", truth: true },
              { text: "Une maison n'a jamais besoin d'être entretenue.", truth: false },
              { text: "Partager un moment peut renforcer les liens.", truth: true },
              { text: "Un chaton ne peut pas apprendre de nouvelles choses.", truth: false },
            ]}
          />
        </>
      )}
    </div>
  )
}
