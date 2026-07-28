import { WorksheetFrame } from "./worksheet-frame"
import {
  PictoButterfly,
  PictoCaterpillar,
  PictoChrysalis,
  PictoEgg,
} from "./art/pictos-animaux"

/** Cycle papillon 4–5 — ronde + étiquettes à coller */
const STEPS = [
  { id: "oeuf", label: "l'œuf", angle: -90 },
  { id: "chenille", label: "la chenille", angle: 0 },
  { id: "chrysalide", label: "la chrysalide", angle: 90 },
  { id: "papillon", label: "le papillon", angle: 180 },
] as const

const LABELS_SHUFFLED = ["la chrysalide", "l'œuf", "le papillon", "la chenille"]

export function ButterflyLifecycleCircle() {
  const cx = 160
  const cy = 155
  const r = 100

  return (
    <WorksheetFrame
      title="Le cycle de vie du papillon"
      instructions="Observe le rond. Découpe les étiquettes en bas et colle chacune au bon endroit. Colorie ensuite !"
      footerNote="Cycle de vie · papillon · 4–5 ans · mode ronde"
      accent="berry"
    >
      <div className="mx-auto max-w-lg">
        <svg
          viewBox="0 0 320 320"
          className="mx-auto h-auto w-full text-ink"
          aria-label="Cycle de vie du papillon en cercle"
        >
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

          {STEPS.map((step, i) => {
            const next = STEPS[(i + 1) % STEPS.length]
            const a1 = ((step.angle + 22) * Math.PI) / 180
            const a2 = ((next.angle - 22) * Math.PI) / 180
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
                markerEnd="url(#bf-arrow)"
                opacity="0.55"
              />
            )
          })}

          <defs>
            <marker id="bf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="currentColor" />
            </marker>
          </defs>

          <circle cx={cx} cy={cy} r="28" className="fill-sky" stroke="currentColor" strokeWidth="3" />
          <text
            x={cx}
            y={cy + 5}
            textAnchor="middle"
            className="fill-ink"
            style={{ fontSize: 11, fontWeight: 700, fontFamily: "var(--font-fredoka), sans-serif" }}
          >
            cycle
          </text>

          {STEPS.map((step) => {
            const a = (step.angle * Math.PI) / 180
            const x = cx + Math.cos(a) * r
            const y = cy + Math.sin(a) * r
            return (
              <g key={step.id} transform={`translate(${x}, ${y})`}>
                <circle r="32" fill="#fffdf7" stroke="currentColor" strokeWidth="3" />
                <g transform="translate(-16, -22) scale(0.4)">{stepArt(step.id)}</g>
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
    case "oeuf":
      return <PictoEgg mode="color" width={80} height={80} />
    case "chenille":
      return <PictoCaterpillar mode="color" width={80} height={80} />
    case "chrysalide":
      return <PictoChrysalis mode="color" width={80} height={80} />
    case "papillon":
      return <PictoButterfly mode="color" width={80} height={80} />
    default:
      return null
  }
}
