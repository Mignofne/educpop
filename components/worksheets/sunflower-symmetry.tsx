import type { AgeGroup } from "@/lib/activities"
import { WorksheetFrame } from "./worksheet-frame"

/** Moitié gauche d'un tournesol clair — la droite est vide pour dessiner en miroir */
export function SunflowerSymmetry({ age = "4-5" }: { age?: AgeGroup }) {
  const cx = 200
  const cy = 130
  const petalCount = age === "2-3" ? 10 : age === "8-10" ? 18 : 16
  const instructions =
    age === "2-3"
      ? "Regarde la gauche. Dessine la même chose à droite — comme dans un miroir. Gros gestes, c'est parfait !"
      : age === "8-10"
        ? "Complète le miroir avec précision (pétales, graines, feuille). Colorie en respectant la symétrie des couleurs."
        : "Regarde bien la moitié de gauche. Dessine la même chose à droite, comme dans un miroir. Ensuite colorie ton tournesol !"

  return (
    <WorksheetFrame
      title="La moitié manquante"
      instructions={instructions}
      footerNote={`Symétrie · ${age} ans`}
      accent="leaf"
    >
      <div className="mx-auto max-w-xl">
        <div className="mb-3 flex justify-between px-2 font-display text-xs font-bold uppercase tracking-wide text-ink/50">
          <span>Modèle</span>
          <span>À toi de dessiner</span>
        </div>

        <div className="rounded-2xl border-2 border-ink bg-white p-3 sm:p-5">
          <svg
            viewBox="0 0 400 320"
            className="h-auto w-full"
            aria-label="Tournesol : moitié gauche modèle, moitié droite à compléter"
          >
            <defs>
              <clipPath id="left-half">
                <rect x="0" y="0" width={cx} height="320" />
              </clipPath>
            </defs>

            {/* Fond zones subtiles */}
            <rect x="0" y="0" width={cx} height="320" fill="#f7f3e8" opacity="0.45" />
            <rect x={cx} y="0" width={cx} height="320" fill="#fff" />

            {/* Ligne de symétrie */}
            <line
              x1={cx}
              y1="16"
              x2={cx}
              y2="304"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="8 6"
            />
            {/* Petit repère miroir */}
            <circle cx={cx} cy="16" r="4" fill="currentColor" />

            {/* Tournesol complet, clipé à gauche */}
            <g clipPath="url(#left-half)">
              {/* Pétale */}
              {Array.from({ length: petalCount }).map((_, i) => {
                const a = (i / petalCount) * Math.PI * 2 - Math.PI / 2
                const px = cx + Math.cos(a) * 58
                const py = cy + Math.sin(a) * 58
                const rot = (a * 180) / Math.PI
                return (
                  <ellipse
                    key={i}
                    cx={px}
                    cy={py}
                    rx="22"
                    ry="11"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="2.75"
                    transform={`rotate(${rot} ${px} ${py})`}
                  />
                )
              })}
              {/* Centre */}
              <circle cx={cx} cy={cy} r="36" fill="white" stroke="currentColor" strokeWidth="3" />
              {/* Graines (motif) */}
              {seedDots(cx, cy).map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="2.2" fill="currentColor" />
              ))}
              {/* Tige */}
              <line
                x1={cx}
                y1={cy + 36}
                x2={cx}
                y2="290"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Feuille gauche */}
              <path
                d={`M${cx} 210 Q${cx - 55} 195 ${cx - 70} 230 Q${cx - 25} 240 ${cx} 220`}
                fill="white"
                stroke="currentColor"
                strokeWidth="2.75"
              />
              {/* Nervure feuille */}
              <path
                d={`M${cx - 8} 218 Q${cx - 35} 215 ${cx - 55} 228`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </g>

            {/* Guides légers à droite — aide 2–3 / 4–5 seulement */}
            {age === "2-3" || age === "4-5" ? (
              <>
                <circle
                  cx={cx}
                  cy={cy}
                  r="36"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 5"
                  opacity="0.22"
                  clipPath="url(#right-half-guide)"
                />
                <defs>
                  <clipPath id="right-half-guide">
                    <rect x={cx} y="0" width={cx} height="320" />
                  </clipPath>
                </defs>
                <line
                  x1={cx}
                  y1={cy + 36}
                  x2={cx}
                  y2="290"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  opacity="0.2"
                />
              </>
            ) : null}
          </svg>
        </div>

        <p className="mt-3 text-center text-sm text-ink/55">
          {age === "6-7" || age === "8-10"
            ? "Pas de guide à droite — à toi de trouver le miroir !"
            : "Astuce : plie la feuille en deux sur la ligne pointillée pour vérifier ton dessin."}
        </p>
      </div>
    </WorksheetFrame>
  )
}

function seedDots(cx: number, cy: number): [number, number][] {
  const dots: [number, number][] = []
  for (let ring = 1; ring <= 3; ring++) {
    const n = ring * 6
    const r = ring * 8
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + ring * 0.2
      dots.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
    }
  }
  return dots
}
