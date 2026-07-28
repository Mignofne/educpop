import type { AgeGroup } from "@/lib/activities"
import { WorksheetFrame } from "./worksheet-frame"

type Part = { label: string; x: number; y: number }

type SubjectVariant = {
  title: string
  instructions: string
  parts: Part[]
  didYouKnow: string
  accent: "sun" | "berry" | "sky" | "leaf" | "tangerine"
  diagram: "ladybug" | "sunflower" | "snake" | "butterfly"
}

/**
 * Anatomie = vocabulaire SPÉCIFIQUE au sujet.
 * Variantes par âge : nombre de parties + formulation.
 */
const SUNFLOWER_BY_AGE: Record<Exclude<AgeGroup, "2-3">, SubjectVariant> = {
  "4-5": {
    title: "L'anatomie du tournesol",
    diagram: "sunflower",
    accent: "sun",
    instructions:
      "Découpe les étiquettes et place-les sur le tournesol. Colorie ensuite les parties que tu as trouvées.",
    didYouKnow:
      "Le tournesol suit le soleil quand il est jeune : sa tête se tourne vers la lumière. Au centre, plein de petites graines se forment.",
    parts: [
      { label: "les pétales", x: 18, y: 18 },
      { label: "le cœur", x: 72, y: 14 },
      { label: "les graines", x: 78, y: 32 },
      { label: "la tige", x: 72, y: 58 },
      { label: "les feuilles", x: 18, y: 55 },
    ],
  },
  "6-7": {
    title: "Anatomie détaillée du tournesol",
    diagram: "sunflower",
    accent: "sun",
    instructions:
      "6 parties à placer ! Découpe les étiquettes (y compris les racines). Numérote-les ensuite de haut en bas (1 = le plus haut).",
    didYouKnow:
      "Ce qu'on appelle « fleur » est en fait une grosse tête : au bord, les pétales jaunes ; au centre, plein de petites fleurs qui deviennent des graines ! La tige est forte pour tenir face au soleil.",
    parts: [
      { label: "les pétales", x: 18, y: 18 },
      { label: "le cœur", x: 72, y: 14 },
      { label: "les graines", x: 78, y: 32 },
      { label: "la tige", x: 72, y: 58 },
      { label: "les grandes feuilles", x: 18, y: 55 },
      { label: "les racines", x: 50, y: 92 },
    ],
  },
  "8-10": {
    title: "L'anatomie du tournesol",
    diagram: "sunflower",
    accent: "sun",
    instructions:
      "Place chaque étiquette. Observe : le « cœur » est un capitule — un plateau de toutes petites fleurs. Les pétales jaunes sont des ligules.",
    didYouKnow:
      "Le tournesol est une composée : le capitule réunit des centaines de fleurs. Les ligules attirent les insectes ; au centre, les graines (achènes) mûrissent. Les racines ancrent la tige, qui peut dépasser 2 mètres.",
    parts: [
      { label: "les ligules (pétales)", x: 16, y: 16 },
      { label: "le capitule", x: 74, y: 12 },
      { label: "les graines", x: 80, y: 32 },
      { label: "la tige", x: 74, y: 58 },
      { label: "les grandes feuilles", x: 16, y: 55 },
      { label: "les racines", x: 50, y: 92 },
    ],
  },
}

const LADYBUG_BY_AGE: Record<Exclude<AgeGroup, "2-3">, SubjectVariant> = {
  "4-5": {
    title: "L'anatomie de la coccinelle",
    diagram: "ladybug",
    accent: "berry",
    instructions:
      "Découpe les étiquettes et place-les sur la coccinelle. Colorie ensuite les parties que tu as trouvées.",
    didYouKnow:
      "Les points sur le dos ne sont pas tous les mêmes : chaque coccinelle a son motif. Les ailes dures protègent les ailes de vol, plus fines, cachées en dessous.",
    parts: [
      { label: "la tête", x: 50, y: 10 },
      { label: "les antennes", x: 12, y: 6 },
      { label: "les élytres", x: 50, y: 42 },
      { label: "les points", x: 84, y: 36 },
      { label: "les pattes", x: 10, y: 78 },
    ],
  },
  "6-7": {
    title: "Anatomie détaillée de la coccinelle",
    diagram: "ladybug",
    accent: "berry",
    instructions:
      "6 parties à placer ! Découpe les étiquettes. Numérote-les ensuite de la tête aux pattes (1 = le plus haut).",
    didYouKnow:
      "Les élytres sont des ailes dures. En dessous, les ailes de vol se déplient pour voler. Les antennes aident à sentir et à se diriger.",
    parts: [
      { label: "la tête", x: 50, y: 10 },
      { label: "les antennes", x: 12, y: 6 },
      { label: "le pronotum", x: 50, y: 26 },
      { label: "les élytres", x: 50, y: 48 },
      { label: "les points", x: 84, y: 40 },
      { label: "les pattes", x: 10, y: 78 },
    ],
  },
  "8-10": {
    title: "L'anatomie de la coccinelle",
    diagram: "ladybug",
    accent: "berry",
    instructions:
      "Place chaque étiquette. Observe : les élytres protègent ; les ailes membraneuses (cachées) servent au vol.",
    didYouKnow:
      "Coccinella septempunctata : souvent 7 points. Les élytres (ailes dures) ferment sur une suture. Le pronotum est le « collier » derrière la tête. Les antennes portent des sensilles pour explorer.",
    parts: [
      { label: "la tête", x: 50, y: 10 },
      { label: "les antennes", x: 12, y: 6 },
      { label: "le pronotum", x: 50, y: 26 },
      { label: "les élytres", x: 42, y: 48 },
      { label: "la suture", x: 58, y: 55 },
      { label: "les pattes", x: 10, y: 78 },
    ],
  },
}

const SNAKE_BY_AGE: Record<Exclude<AgeGroup, "2-3">, SubjectVariant> = {
  "4-5": {
    title: "L'anatomie du serpent",
    diagram: "snake",
    accent: "leaf",
    instructions:
      "Découpe les étiquettes et place-les sur le serpent. Colorie ensuite les parties que tu as trouvées.",
    didYouKnow:
      "Le serpent n'a pas de pattes : il avance en ondulant. Sa langue fourchue l'aide à « goûter » l'air pour sentir ce qui l'entoure.",
    parts: [
      { label: "la tête", x: 82, y: 22 },
      { label: "l'œil", x: 78, y: 12 },
      { label: "la langue", x: 92, y: 36 },
      { label: "les écailles", x: 48, y: 48 },
      { label: "le corps", x: 28, y: 72 },
    ],
  },
  "6-7": {
    title: "Anatomie détaillée du serpent",
    diagram: "snake",
    accent: "leaf",
    instructions:
      "6 parties à placer ! Découpe les étiquettes. Numérote-les ensuite de la tête à la queue (1 = le plus devant).",
    didYouKnow:
      "Les écailles protègent la peau. Quand le serpent grandit, il change de peau : c'est la mue. La langue fourchue capte les odeurs.",
    parts: [
      { label: "la tête", x: 82, y: 22 },
      { label: "l'œil", x: 78, y: 12 },
      { label: "la langue fourchue", x: 92, y: 36 },
      { label: "les écailles", x: 52, y: 44 },
      { label: "le corps", x: 32, y: 68 },
      { label: "la queue", x: 12, y: 82 },
    ],
  },
  "8-10": {
    title: "L'anatomie du serpent",
    diagram: "snake",
    accent: "leaf",
    instructions:
      "Place chaque étiquette. Observe : la langue fourchue porte les odeurs vers l'organe de Jacobson.",
    didYouKnow:
      "Le serpent perçoit les odeurs grâce à sa langue fourchue et à l'organe voméronasal. Les écailles ventrales aident à s'accrocher au sol. La mue renouvelle toute la peau, y compris le « verre » de l'œil.",
    parts: [
      { label: "la tête", x: 82, y: 22 },
      { label: "l'œil (écaille transparente)", x: 74, y: 10 },
      { label: "la langue fourchue", x: 92, y: 36 },
      { label: "les écailles dorsales", x: 52, y: 42 },
      { label: "les écailles ventrales", x: 40, y: 62 },
      { label: "la queue", x: 12, y: 82 },
    ],
  },
}

const BUTTERFLY_BY_AGE: Record<Exclude<AgeGroup, "2-3">, SubjectVariant> = {
  "4-5": {
    title: "L'anatomie du papillon",
    diagram: "butterfly",
    accent: "berry",
    instructions:
      "Découpe les étiquettes et place-les sur le papillon. Colorie ensuite les parties que tu as trouvées.",
    didYouKnow:
      "Les ailes du papillon sont couvertes de toutes petites écailles colorées. Les antennes l'aident à sentir les fleurs.",
    parts: [
      { label: "la tête", x: 50, y: 12 },
      { label: "les antennes", x: 18, y: 8 },
      { label: "les ailes", x: 18, y: 42 },
      { label: "le corps", x: 50, y: 55 },
      { label: "les pattes", x: 50, y: 88 },
    ],
  },
  "6-7": {
    title: "Anatomie détaillée du papillon",
    diagram: "butterfly",
    accent: "berry",
    instructions:
      "6 parties à placer ! Découpe les étiquettes. Numérote-les ensuite de la tête aux pattes.",
    didYouKnow:
      "Le corps a trois parties : tête, thorax (où s'attachent ailes et pattes), abdomen. La trompe enroule pour boire le nectar.",
    parts: [
      { label: "la tête", x: 50, y: 12 },
      { label: "les antennes", x: 18, y: 8 },
      { label: "les ailes", x: 16, y: 40 },
      { label: "le thorax", x: 50, y: 48 },
      { label: "l'abdomen", x: 50, y: 68 },
      { label: "les pattes", x: 50, y: 88 },
    ],
  },
  "8-10": {
    title: "L'anatomie du papillon",
    diagram: "butterfly",
    accent: "berry",
    instructions:
      "Place chaque étiquette. Observe : la trompe (proboscis) s'enroule au repos ; les ailes portent des écailles pigmentées.",
    didYouKnow:
      "Les Lépidoptères ont des ailes membraneuses couvertes d'écailles. Les antennes portent des sensilles. Le thorax porte six pattes et quatre ailes ; l'abdomen contient la digestion et la reproduction.",
    parts: [
      { label: "la tête", x: 50, y: 12 },
      { label: "les antennes", x: 16, y: 6 },
      { label: "la trompe", x: 68, y: 22 },
      { label: "les ailes (écailles)", x: 14, y: 40 },
      { label: "le thorax", x: 50, y: 48 },
      { label: "l'abdomen", x: 50, y: 72 },
    ],
  },
}

function resolveSubject(slug: string, age: AgeGroup): SubjectVariant {
  const key = age === "2-3" ? "4-5" : age
  if (slug === "anatomie-du-tournesol") return SUNFLOWER_BY_AGE[key]
  if (slug === "anatomie-de-la-coccinelle") return LADYBUG_BY_AGE[key]
  if (slug === "anatomie-du-serpent") return SNAKE_BY_AGE[key]
  if (slug === "anatomie-du-papillon") return BUTTERFLY_BY_AGE[key]
  return LADYBUG_BY_AGE[key]
}

export function AnatomySheet({
  slug,
  age = "4-5",
}: {
  slug: string
  age?: AgeGroup
}) {
  const config = resolveSubject(slug, age)

  return (
    <WorksheetFrame
      title={config.title}
      instructions={config.instructions}
      footerNote={`Anatomie · ${age} ans`}
      accent={config.accent}
    >
      <div className="flex flex-col gap-5">
        <div className="relative mx-auto h-[22rem] w-full max-w-md rounded-2xl border-[3px] border-ink bg-[#fffdf7]">
          {config.diagram === "ladybug" ? (
            <Ladybug />
          ) : config.diagram === "sunflower" ? (
            <SunflowerDiagram />
          ) : config.diagram === "snake" ? (
            <SnakeDiagram />
          ) : (
            <ButterflyDiagram />
          )}
          {config.parts.map((p) => (
            <div
              key={p.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className="flex h-7 min-w-[5.5rem] items-center justify-center rounded-lg border-[2.5px] border-dashed border-ink/45 bg-white px-1.5 text-center text-[9px] font-semibold text-ink/40">
                ?
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border-[3px] border-ink bg-sun/40 p-3 sm:p-4">
          <p className="font-display text-xs font-bold uppercase tracking-wide text-ink">Le savais-tu ?</p>
          <p className="mt-1 text-sm font-medium leading-relaxed text-ink/80">{config.didYouKnow}</p>
        </div>

        <div>
          <p className="mb-2 font-display text-sm font-bold">Étiquettes à découper :</p>
          <div className="flex flex-wrap gap-2.5">
            {config.parts.map((p) => (
              <span
                key={p.label}
                className="rounded-xl border-[3px] border-dashed border-ink bg-white px-3 py-2 font-display text-sm font-bold shadow-[2px_2px_0_0_var(--ink)]"
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </WorksheetFrame>
  )
}

/** Coccinelle vue de dessus — élytres (2 demi-coques), tête, antennes, points, pattes */
function Ladybug() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full p-2 text-ink" aria-hidden="true">
      {/* Pattes — 3 de chaque côté, bien écartées */}
      <g fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
        <path d="M62 108 L36 88" />
        <path d="M58 128 L28 128" />
        <path d="M62 148 L36 168" />
        <path d="M138 108 L164 88" />
        <path d="M142 128 L172 128" />
        <path d="M138 148 L164 168" />
      </g>
      {/* Petits « pieds » */}
      <circle cx="36" cy="88" r="3.5" fill="currentColor" />
      <circle cx="28" cy="128" r="3.5" fill="currentColor" />
      <circle cx="36" cy="168" r="3.5" fill="currentColor" />
      <circle cx="164" cy="88" r="3.5" fill="currentColor" />
      <circle cx="172" cy="128" r="3.5" fill="currentColor" />
      <circle cx="164" cy="168" r="3.5" fill="currentColor" />

      {/* Corps / élytres : ovale plein, puis suture centrale */}
      <ellipse
        cx="100"
        cy="128"
        rx="58"
        ry="52"
        fill="white"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      {/* Suture = séparation des 2 élytres */}
      <line
        x1="100"
        y1="80"
        x2="100"
        y2="178"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Points (classiques 7 points : 3 + 3 + 1 sur la suture) */}
      <circle cx="78" cy="108" r="10" fill="white" stroke="currentColor" strokeWidth="3" />
      <circle cx="68" cy="138" r="9" fill="white" stroke="currentColor" strokeWidth="3" />
      <circle cx="82" cy="160" r="8" fill="white" stroke="currentColor" strokeWidth="3" />
      <circle cx="122" cy="108" r="10" fill="white" stroke="currentColor" strokeWidth="3" />
      <circle cx="132" cy="138" r="9" fill="white" stroke="currentColor" strokeWidth="3" />
      <circle cx="118" cy="160" r="8" fill="white" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="128" r="7" fill="white" stroke="currentColor" strokeWidth="3" />

      {/* Pronotum (collier noir typique, en outline) */}
      <ellipse
        cx="100"
        cy="78"
        rx="28"
        ry="14"
        fill="white"
        stroke="currentColor"
        strokeWidth="3.5"
      />

      {/* Tête — bien ronde, devant */}
      <circle cx="100" cy="52" r="22" fill="white" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="90" cy="50" r="4.5" fill="currentColor" />
      <circle cx="110" cy="50" r="4.5" fill="currentColor" />

      {/* Antennes courbes + boules */}
      <path
        d="M86 36 Q70 18 54 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M114 36 Q130 18 146 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="54" cy="14" r="5" fill="white" stroke="currentColor" strokeWidth="3" />
      <circle cx="146" cy="14" r="5" fill="white" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

/** Schéma tournesol : pétales, cœur, graines visibles, tige, grandes feuilles, racines */
function SunflowerDiagram() {
  const cx = 100
  const cy = 52
  return (
    <svg viewBox="0 0 200 230" className="h-full w-full p-3 text-ink" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2 - Math.PI / 2
        const px = cx + Math.cos(a) * 34
        const py = cy + Math.sin(a) * 34
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx="15"
            ry="7"
            fill="white"
            stroke="currentColor"
            strokeWidth="2.75"
            transform={`rotate(${(a * 180) / Math.PI} ${px} ${py})`}
          />
        )
      })}
      <circle cx={cx} cy={cy} r="22" fill="white" stroke="currentColor" strokeWidth="3.25" />
      {seedPattern(cx, cy).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="currentColor" />
      ))}
      <line x1={cx} y1={cy + 22} x2={cx} y2="175" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M100 105 Q55 90 42 120 Q70 135 100 118"
        fill="white"
        stroke="currentColor"
        strokeWidth="2.75"
      />
      <path
        d="M100 125 Q145 110 158 140 Q130 152 100 138"
        fill="white"
        stroke="currentColor"
        strokeWidth="2.75"
      />
      <path d="M78 112 Q70 118 62 122" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M122 130 Q130 136 140 142" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M100 175 Q75 195 55 205 M100 175 Q100 200 100 212 M100 175 Q125 195 145 205 M100 175 Q85 198 70 215 M100 175 Q115 198 130 215"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function seedPattern(cx: number, cy: number): [number, number][] {
  const dots: [number, number][] = []
  for (let ring = 1; ring <= 3; ring++) {
    const n = ring * 5
    const r = ring * 5.5
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + ring * 0.25
      dots.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
    }
  }
  return dots
}

/** Serpent de profil — tête, œil, langue, corps écailleux, queue */
function SnakeDiagram() {
  return (
    <svg viewBox="0 0 220 200" className="h-full w-full p-3 text-ink" aria-hidden="true">
      <path
        d="M28 150
           C36 120 52 108 70 118
           C88 128 98 148 118 154
           C138 160 158 148 172 128
           C182 114 196 108 208 118
           L214 112
           C198 96 178 104 168 120
           C156 140 138 150 118 144
           C98 138 88 118 70 108
           C50 96 30 108 22 138
           Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="3.25"
        strokeLinejoin="round"
      />
      <ellipse cx="200" cy="114" rx="16" ry="14" fill="white" stroke="currentColor" strokeWidth="3.25" />
      <circle cx="206" cy="110" r="3.5" fill="currentColor" />
      <path
        d="M214 118 L226 110 M214 118 L226 126"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <g fill="none" stroke="currentColor" strokeWidth="1.75" opacity="0.7">
        <path d="M48 132 Q54 124 60 132 Q54 140 48 132" />
        <path d="M72 126 Q78 118 84 126 Q78 134 72 126" />
        <path d="M96 140 Q102 132 108 140 Q102 148 96 140" />
        <path d="M122 146 Q128 138 134 146 Q128 154 122 146" />
        <path d="M148 136 Q154 128 160 136 Q154 144 148 136" />
        <path d="M168 124 Q174 116 180 124 Q174 132 168 124" />
      </g>
    </svg>
  )
}

/** Papillon face — ailes, antennes, corps, pattes */
function ButterflyDiagram() {
  return (
    <svg viewBox="0 0 200 220" className="h-full w-full p-2 text-ink" aria-hidden="true">
      <path
        d="M96 100 C96 58 72 30 44 38 C22 46 18 82 42 98 C58 106 82 106 96 100 Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="3.25"
        strokeLinejoin="round"
      />
      <path
        d="M104 100 C104 58 128 30 156 38 C178 46 182 82 158 98 C142 106 118 106 104 100 Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="3.25"
        strokeLinejoin="round"
      />
      <path
        d="M96 108 C80 108 56 116 44 136 C32 160 48 180 72 172 C88 168 96 144 96 108 Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="3.25"
        strokeLinejoin="round"
      />
      <path
        d="M104 108 C120 108 144 116 156 136 C168 160 152 180 128 172 C112 168 104 144 104 108 Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="3.25"
        strokeLinejoin="round"
      />
      <ellipse cx="100" cy="118" rx="8" ry="42" fill="white" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="68" r="14" fill="white" stroke="currentColor" strokeWidth="3.25" />
      <circle cx="94" cy="66" r="2.5" fill="currentColor" />
      <circle cx="106" cy="66" r="2.5" fill="currentColor" />
      <path d="M92 56 Q78 36 64 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M108 56 Q122 36 136 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="64" cy="30" r="5" fill="white" stroke="currentColor" strokeWidth="2.75" />
      <circle cx="136" cy="30" r="5" fill="white" stroke="currentColor" strokeWidth="2.75" />
      <g fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round">
        <path d="M96 130 L84 168" />
        <path d="M100 134 L100 176" />
        <path d="M104 130 L116 168" />
      </g>
      <circle cx="58" cy="70" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="142" cy="70" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

