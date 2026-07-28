import { WorksheetFrame } from "./worksheet-frame"

/** Coloriage grand format — 2–3 ans */
export function SunflowerColoring() {
  const cx = 150
  const cy = 95
  return (
    <WorksheetFrame
      title="Je colorie le tournesol"
      instructions="Prends un gros crayon. Colorie les pétales, le cœur, la tige et les feuilles. Dis à voix haute ce que tu vois !"
      footerNote="Coloriage · pack tournesols"
      accent="sun"
    >
      <div className="mx-auto max-w-lg rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-3">
        <svg viewBox="0 0 300 340" className="h-auto w-full text-ink" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2 - Math.PI / 2
            const px = cx + Math.cos(a) * 55
            const py = cy + Math.sin(a) * 55
            return (
              <ellipse
                key={i}
                cx={px}
                cy={py}
                rx="28"
                ry="14"
                fill="white"
                stroke="currentColor"
                strokeWidth="3.5"
                transform={`rotate(${(a * 180) / Math.PI} ${px} ${py})`}
              />
            )
          })}
          <circle cx={cx} cy={cy} r="38" fill="white" stroke="currentColor" strokeWidth="3.5" />
          {[0, 1, 2].flatMap((ring) =>
            Array.from({ length: 6 + ring * 4 }).map((_, i) => {
              const n = 6 + ring * 4
              const r = 10 + ring * 10
              const a = (i / n) * Math.PI * 2
              return (
                <circle
                  key={`${ring}-${i}`}
                  cx={cx + Math.cos(a) * r}
                  cy={cy + Math.sin(a) * r}
                  r="3.5"
                  fill="currentColor"
                />
              )
            }),
          )}
          <line x1={cx} y1={cy + 38} x2={cx} y2="280" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path
            d="M150 180 Q90 160 70 210 Q110 230 150 200"
            fill="white"
            stroke="currentColor"
            strokeWidth="3.5"
          />
          <path
            d="M150 210 Q210 190 230 240 Q190 255 150 225"
            fill="white"
            stroke="currentColor"
            strokeWidth="3.5"
          />
          <path
            d="M150 280 Q120 310 95 325 M150 280 Q150 315 150 330 M150 280 Q180 310 205 325"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </WorksheetFrame>
  )
}
