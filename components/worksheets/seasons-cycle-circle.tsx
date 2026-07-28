import { WorksheetFrame } from "./worksheet-frame"

/** Étapes du cycle annuel — format rond + étiquettes (4–5) */
const STEPS = [
  { id: "printemps", label: "printemps", angle: -90 },
  { id: "ete", label: "été", angle: 0 },
  { id: "automne", label: "automne", angle: 90 },
  { id: "hiver", label: "hiver", angle: 180 },
] as const

const LABELS_SHUFFLED = ["automne", "printemps", "hiver", "été"]

/**
 * Cycle des saisons en rond + étiquettes à coller — format cœur 4–5.
 */
export function SeasonsCycleCircle() {
  const cx = 160
  const cy = 155
  const r = 100

  return (
    <WorksheetFrame
      title="Le cycle de l'année"
      instructions="Observe le rond. Découpe les étiquettes en bas et colle chacune au bon endroit. Colorie ensuite !"
      footerNote="Cycle des saisons · 4–5 ans · mode ronde"
      accent="sun"
    >
      <div className="mx-auto max-w-lg">
        <svg
          viewBox="0 0 320 320"
          className="mx-auto h-auto w-full text-ink"
          aria-label="Cycle des saisons en cercle"
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
            const a1 = ((step.angle + 25) * Math.PI) / 180
            const a2 = ((next.angle - 25) * Math.PI) / 180
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
                markerEnd="url(#season-cycle-arrow)"
                opacity="0.55"
              />
            )
          })}

          <defs>
            <marker id="season-cycle-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L8 3 L0 6 Z" fill="currentColor" />
            </marker>
          </defs>

          {STEPS.map((step) => {
            const a = (step.angle * Math.PI) / 180
            const x = cx + Math.cos(a) * r
            const y = cy + Math.sin(a) * r
            return (
              <g key={step.id}>
                <circle cx={x} cy={y} r="28" fill="white" stroke="currentColor" strokeWidth="3" />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="currentColor"
                >
                  ?
                </text>
              </g>
            )
          })}

          <circle cx={cx} cy={cy} r="36" fill="white" stroke="currentColor" strokeWidth="3" />
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">
            ANNÉE
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">
            qui tourne
          </text>
        </svg>

        <div className="mt-4">
          <p className="mb-2 text-center font-display text-sm font-bold">Étiquettes à découper :</p>
          <div className="flex flex-wrap justify-center gap-2">
            {LABELS_SHUFFLED.map((label) => (
              <span
                key={label}
                className="rounded-xl border-[3px] border-dashed border-ink bg-white px-4 py-2 font-display text-sm font-bold shadow-[2px_2px_0_0_var(--ink)]"
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
