import { WorksheetFrame } from "./worksheet-frame"
import { PictoSeed, PictoSprout, PictoSunflower } from "./art/pictos"

/** Étapes du cycle (rond) — vocabulaire 4–5, accessible */
const STEPS = [
  { id: "graine", label: "la graine", angle: -90 },
  { id: "germe", label: "le germe", angle: -30 },
  { id: "pousse", label: "la pousse", angle: 30 },
  { id: "plant", label: "le plant", angle: 90 },
  { id: "jeune", label: "la jeune plante", angle: 150 },
  { id: "adulte", label: "la plante adulte", angle: 210 },
] as const

const LABELS_SHUFFLED = [
  "la pousse",
  "la plante adulte",
  "la graine",
  "le plant",
  "le germe",
  "la jeune plante",
]

/**
 * Cycle de vie en rond + étiquettes à coller — format 4–5 ans.
 * Inspiration structure type « roue / cycle » ; illustrations SVG maison.
 */
export function SunflowerLifecycleCircle() {
  const cx = 160
  const cy = 155
  const r = 108

  return (
    <WorksheetFrame
      title="Le cycle de vie du tournesol"
      instructions="Observe le rond. Découpe les étiquettes en bas et colle chacune au bon endroit. Colorie ensuite !"
      footerNote="Cycle de vie · 4–5 ans · mode ronde"
      accent="sun"
    >
      <div className="mx-auto max-w-lg">
        <svg
          viewBox="0 0 320 320"
          className="mx-auto h-auto w-full text-ink"
          aria-label="Cycle de vie du tournesol en cercle"
        >
          {/* Cercle guide */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            opacity="0.35"
          />

          {/* Flèches entre étapes */}
          {STEPS.map((step, i) => {
            const next = STEPS[(i + 1) % STEPS.length]
            const a1 = ((step.angle + 18) * Math.PI) / 180
            const a2 = ((next.angle - 18) * Math.PI) / 180
            const x1 = cx + Math.cos(a1) * r
            const y1 = cy + Math.sin(a1) * r
            const x2 = cx + Math.cos(a2) * r
            const y2 = cy + Math.sin(a2) * r
            return (
              <path
                key={`arrow-${step.id}`}
                d={`M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                markerEnd="url(#arrowhead)"
                opacity="0.55"
              />
            )
          })}

          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="currentColor" />
            </marker>
          </defs>

          {/* Centre */}
          <circle cx={cx} cy={cy} r="28" className="fill-sun" stroke="currentColor" strokeWidth="3" />
          <text
            x={cx}
            y={cy + 5}
            textAnchor="middle"
            className="fill-ink"
            style={{ fontSize: 11, fontWeight: 700, fontFamily: "var(--font-fredoka), sans-serif" }}
          >
            cycle
          </text>

          {/* Étapes : illustration + zone étiquette vide */}
          {STEPS.map((step) => {
            const a = (step.angle * Math.PI) / 180
            const x = cx + Math.cos(a) * r
            const y = cy + Math.sin(a) * r
            return (
              <g key={step.id} transform={`translate(${x}, ${y})`}>
                <circle r="32" fill="#fffdf7" stroke="currentColor" strokeWidth="3" />
                <g transform="translate(-16, -22) scale(0.4)">{stepArt(step.id)}</g>
                {/* Slot étiquette */}
                <rect
                  x="-36"
                  y="18"
                  width="72"
                  height="18"
                  rx="6"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
              </g>
            )
          })}
        </svg>

        <div className="mt-4">
          <p className="mb-2 font-display text-sm font-bold">Étiquettes à découper :</p>
          <div className="flex flex-wrap justify-center gap-2">
            {LABELS_SHUFFLED.map((label) => (
              <span
                key={label}
                className="rounded-xl border-[3px] border-dashed border-ink bg-white px-3 py-2 font-display text-sm font-bold shadow-[2px_2px_0_0_var(--ink)]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </WorksheetFrame>
  )
}

function stepArt(id: string) {
  switch (id) {
    case "graine":
      return <PictoSeed mode="color" width={80} height={80} />
    case "germe":
      return <PictoSprout mode="outline" width={80} height={80} />
    case "pousse":
      return <PictoSprout mode="color" width={80} height={80} />
    case "plant":
      return <MiniPlant />
    case "jeune":
      return <MiniBud />
    case "adulte":
      return <PictoSunflower mode="color" width={80} height={80} />
    default:
      return null
  }
}

function MiniPlant() {
  return (
    <svg viewBox="0 0 80 80" width={80} height={80} className="text-ink" aria-hidden="true">
      <ellipse cx="40" cy="68" rx="22" ry="6" className="fill-tangerine" stroke="currentColor" strokeWidth="3" />
      <line x1="40" y1="62" x2="40" y2="28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="28" cy="40" rx="12" ry="7" className="fill-leaf" stroke="currentColor" strokeWidth="3" transform="rotate(-30 28 40)" />
      <ellipse cx="52" cy="36" rx="12" ry="7" className="fill-leaf" stroke="currentColor" strokeWidth="3" transform="rotate(30 52 36)" />
      <ellipse cx="34" cy="24" rx="10" ry="6" className="fill-leaf" stroke="currentColor" strokeWidth="3" />
      <ellipse cx="48" cy="22" rx="10" ry="6" className="fill-leaf" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

function MiniBud() {
  return (
    <svg viewBox="0 0 80 80" width={80} height={80} className="text-ink" aria-hidden="true">
      <ellipse cx="40" cy="70" rx="20" ry="5" className="fill-tangerine" stroke="currentColor" strokeWidth="3" />
      <line x1="40" y1="65" x2="40" y2="32" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="28" cy="48" rx="11" ry="6" className="fill-leaf" stroke="currentColor" strokeWidth="3" transform="rotate(-25 28 48)" />
      <ellipse cx="52" cy="50" rx="11" ry="6" className="fill-leaf" stroke="currentColor" strokeWidth="3" transform="rotate(25 52 50)" />
      <ellipse cx="40" cy="22" rx="12" ry="16" className="fill-leaf" stroke="currentColor" strokeWidth="3" />
      <ellipse cx="40" cy="18" rx="6" ry="8" className="fill-sun" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}
