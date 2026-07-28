import { WorksheetFrame } from "./worksheet-frame"

type AgeMode = "2-3" | "4-5" | "6-7" | "8-10"

const SEASONS = [
  {
    name: "PRINTEMPS",
    hint: "Les fleurs poussent",
    fact: "Les jours rallongent.",
    // haut-droite
    path: "M160 160 L160 20 A140 140 0 0 1 300 160 Z",
    label: { x: 205, y: 88 },
    motif: "flower" as const,
  },
  {
    name: "ÉTÉ",
    hint: "Le soleil brille",
    fact: "Les journées sont longues.",
    // bas-droite
    path: "M160 160 L300 160 A140 140 0 0 1 160 300 Z",
    label: { x: 215, y: 235 },
    motif: "sun" as const,
  },
  {
    name: "AUTOMNE",
    hint: "Les feuilles tombent",
    fact: "Beaucoup d'arbres changent de couleur.",
    // bas-gauche
    path: "M160 160 L160 300 A140 140 0 0 1 20 160 Z",
    label: { x: 48, y: 235 },
    motif: "leaf" as const,
  },
  {
    name: "HIVER",
    hint: "Il fait froid",
    fact: "Certains arbres sont nus.",
    // haut-gauche
    path: "M160 160 L20 160 A140 140 0 0 1 160 20 Z",
    label: { x: 55, y: 88 },
    motif: "snow" as const,
  },
] as const

function Motif({ kind, cx, cy }: { kind: "flower" | "sun" | "leaf" | "snow"; cx: number; cy: number }) {
  if (kind === "sun") {
    return (
      <g transform={`translate(${cx} ${cy})`} opacity="0.85">
        <circle r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const rad = (a * Math.PI) / 180
          return (
            <line
              key={a}
              x1={Math.cos(rad) * 18}
              y1={Math.sin(rad) * 18}
              x2={Math.cos(rad) * 26}
              y2={Math.sin(rad) * 26}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )
        })}
      </g>
    )
  }
  if (kind === "flower") {
    return (
      <g transform={`translate(${cx} ${cy})`} opacity="0.85">
        {[0, 72, 144, 216, 288].map((a) => {
          const rad = (a * Math.PI) / 180
          return (
            <ellipse
              key={a}
              cx={Math.cos(rad) * 12}
              cy={Math.sin(rad) * 12}
              rx="7"
              ry="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              transform={`rotate(${a} ${Math.cos(rad) * 12} ${Math.sin(rad) * 12})`}
            />
          )
        })}
        <circle r="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </g>
    )
  }
  if (kind === "leaf") {
    return (
      <g transform={`translate(${cx} ${cy}) rotate(-30)`} opacity="0.85">
        <path
          d="M0 -22 C12 -8 12 10 0 22 C-12 10 -12 -8 0 -22 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <line x1="0" y1="-18" x2="0" y2="18" stroke="currentColor" strokeWidth="2" />
      </g>
    )
  }
  // snow
  return (
    <g transform={`translate(${cx} ${cy})`} opacity="0.85">
      {[0, 60, 120].map((a) => (
        <line
          key={a}
          x1={0}
          y1={-16}
          x2={0}
          y2={16}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r="3" fill="none" stroke="currentColor" strokeWidth="2" />
    </g>
  )
}

/** Motifs SVG Tullet dans chaque quartier — positions relatives au centre */
const MOTIF_POS: Record<(typeof SEASONS)[number]["motif"], { cx: number; cy: number }> = {
  flower: { cx: 220, cy: 95 },
  sun: { cx: 220, cy: 225 },
  leaf: { cx: 100, cy: 225 },
  snow: { cx: 100, cy: 95 },
}

/**
 * Roue / cycle des saisons — cœur du pack « Les saisons ».
 * Mode âge : consignes et encarts d'observation adaptés.
 */
export function SeasonsWheel({ age = "4-5" }: { age?: AgeMode }) {
  const showFacts = age === "8-10"
  const showDraw = age === "2-3" || age === "4-5"
  const blankLabels = age === "6-7" || age === "8-10"

  const instructions =
    age === "2-3"
      ? "Colorie chaque quartier avec un adulte. Nommez les saisons à voix haute."
      : age === "4-5"
        ? "Colorie chaque quartier. Dans les cadres, dessine ce que tu observes dehors à chaque saison."
        : age === "6-7"
          ? "Colorie la roue. Écris le nom de chaque saison dans le quartier (MAJUSCULES), puis complète les indices."
          : "Colorie la roue. Écris les saisons, puis note une observation précise dans chaque cadre."

  return (
    <WorksheetFrame
      title={age === "8-10" ? "Le cycle des saisons" : "La roue des saisons"}
      instructions={instructions}
      footerNote={`Cycle annuel · Saisons · ${age === "2-3" ? "2–3" : age === "4-5" ? "4–5" : age === "6-7" ? "6–7" : "8–10"} ans`}
      accent="sun"
    >
      <div className="flex flex-col items-center gap-6">
        <svg viewBox="0 0 320 320" className="h-72 w-72 text-ink" role="img" aria-label="Roue des saisons à colorier">
          {SEASONS.map((s) => (
            <path key={s.name} d={s.path} fill="white" stroke="currentColor" strokeWidth="3" />
          ))}
          {SEASONS.map((s) => {
            const pos = MOTIF_POS[s.motif]
            return <Motif key={`m-${s.name}`} kind={s.motif} cx={pos.cx} cy={pos.cy} />
          })}
          <circle cx="160" cy="160" r="28" fill="white" stroke="currentColor" strokeWidth="3" />
          <text x="160" y="155" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">
            UNE
          </text>
          <text x="160" y="170" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">
            ANNÉE
          </text>
          {SEASONS.map((s) =>
            blankLabels ? (
              <g key={`lab-${s.name}`}>
                <rect
                  x={s.label.x - 4}
                  y={s.label.y - 14}
                  width={72}
                  height="20"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  rx="4"
                />
              </g>
            ) : (
              <text
                key={`lab-${s.name}`}
                x={s.label.x}
                y={s.label.y}
                fontSize="12"
                fontWeight="700"
                fill="currentColor"
              >
                {s.name}
              </text>
            ),
          )}
          {/* Flèches de cycle (sens horaire) */}
          <defs>
            <marker id="season-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0 0 L7 3.5 L0 7 Z" fill="currentColor" />
            </marker>
          </defs>
          <path
            d="M175 28 A145 145 0 0 1 292 145"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.4"
            markerEnd="url(#season-arrow)"
          />
        </svg>

        <div className="grid w-full grid-cols-2 gap-3">
          {SEASONS.map((s) => (
            <div key={s.name} className="rounded-xl border-[3px] border-ink bg-[#fffdf7] p-3">
              <p className="font-display text-sm font-bold">
                {blankLabels ? "……………" : s.name}
              </p>
              <p className="text-xs text-ink/60">{showFacts ? s.fact : s.hint}</p>
              {showDraw ? (
                <div
                  className="mt-2 h-16 rounded-lg border-2 border-dashed border-ink/40"
                  aria-hidden="true"
                />
              ) : (
                <div className="mt-2 h-10 border-b-2 border-ink/40" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </WorksheetFrame>
  )
}
