import { WorksheetFrame } from "./worksheet-frame"

type FlagId = "france" | "japon" | "bresil" | "kenya" | "australie" | "canada"

const FLAGS: {
  id: FlagId
  country: string
  continent: string
}[] = [
  { id: "france", country: "France", continent: "Europe" },
  { id: "japon", country: "Japon", continent: "Asie" },
  { id: "bresil", country: "Brésil", continent: "Amérique du Sud" },
  { id: "kenya", country: "Kenya", continent: "Afrique" },
  { id: "australie", country: "Australie", continent: "Océanie" },
  { id: "canada", country: "Canada", continent: "Amérique du Nord" },
]

export function FlagsSheet() {
  return (
    <WorksheetFrame
      title="Les drapeaux du monde à colorier"
      instructions="Observe le modèle (couleurs + symbole). Colorie le drapeau vide en dessous, puis note le continent."
      footerNote="Géographie"
      accent="sky"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {FLAGS.map((f) => (
          <div key={f.id} className="rounded-xl border-[3px] border-ink p-3">
            <div className="overflow-hidden rounded-lg border-[3px] border-ink">
              <FlagArt id={f.id} mode="color" />
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="font-display text-sm font-bold">{f.country}</span>
              <span className="rounded-full border-2 border-dashed border-ink px-2 py-0.5 text-xs font-semibold text-ink/60">
                {f.continent}
              </span>
            </div>
            <div className="mt-2 overflow-hidden rounded-lg border-[3px] border-dashed border-ink/50 bg-white">
              <FlagArt id={f.id} mode="outline" />
            </div>
          </div>
        ))}
      </div>
    </WorksheetFrame>
  )
}

function FlagArt({ id, mode }: { id: FlagId; mode: "color" | "outline" }) {
  const fill = mode === "color"
  const ink = "currentColor"
  const stroke = 2.75

  switch (id) {
    case "france":
      return (
        <svg viewBox="0 0 180 100" className="h-20 w-full text-ink" aria-hidden="true">
          <rect x="1.5" y="1.5" width="177" height="97" fill={fill ? "#0055A4" : "white"} stroke={ink} strokeWidth={stroke} />
          <rect x="60" y="1.5" width="60" height="97" fill={fill ? "#FFFFFF" : "white"} stroke={ink} strokeWidth={stroke} />
          <rect x="120" y="1.5" width="58.5" height="97" fill={fill ? "#EF4135" : "white"} stroke={ink} strokeWidth={stroke} />
        </svg>
      )
    case "japon":
      return (
        <svg viewBox="0 0 180 100" className="h-20 w-full text-ink" aria-hidden="true">
          <rect x="1.5" y="1.5" width="177" height="97" fill="white" stroke={ink} strokeWidth={stroke} />
          <circle
            cx="90"
            cy="50"
            r="22"
            fill={fill ? "#BC002D" : "white"}
            stroke={ink}
            strokeWidth={stroke}
          />
        </svg>
      )
    case "bresil":
      return (
        <svg viewBox="0 0 180 100" className="h-20 w-full text-ink" aria-hidden="true">
          <rect x="1.5" y="1.5" width="177" height="97" fill={fill ? "#009B3A" : "white"} stroke={ink} strokeWidth={stroke} />
          <path
            d="M90 18 L152 50 L90 82 L28 50 Z"
            fill={fill ? "#FEDF00" : "white"}
            stroke={ink}
            strokeWidth={stroke}
            strokeLinejoin="round"
          />
          <circle
            cx="90"
            cy="50"
            r="18"
            fill={fill ? "#002776" : "white"}
            stroke={ink}
            strokeWidth={stroke}
          />
          {/* Petite bande / étoile simplifiée */}
          <path
            d="M78 48 Q90 42 102 48"
            fill="none"
            stroke={fill ? "#FFFFFF" : ink}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="90" cy="54" r="2.5" fill={fill ? "#FFFFFF" : ink} />
        </svg>
      )
    case "kenya":
      return (
        <svg viewBox="0 0 180 100" className="h-20 w-full text-ink" aria-hidden="true">
          <rect x="1.5" y="1.5" width="177" height="97" fill={fill ? "#000000" : "white"} stroke={ink} strokeWidth={stroke} />
          <rect x="1.5" y="22" width="177" height="8" fill={fill ? "#FFFFFF" : "white"} stroke={ink} strokeWidth="1.5" />
          <rect x="1.5" y="30" width="177" height="40" fill={fill ? "#BB0000" : "white"} stroke={ink} strokeWidth={stroke} />
          <rect x="1.5" y="70" width="177" height="8" fill={fill ? "#FFFFFF" : "white"} stroke={ink} strokeWidth="1.5" />
          <rect x="1.5" y="78" width="177" height="20.5" fill={fill ? "#006600" : "white"} stroke={ink} strokeWidth={stroke} />
          {/* Bouclier + lances (symbole simplifié Tullet) */}
          <ellipse
            cx="90"
            cy="50"
            rx="14"
            ry="20"
            fill={fill ? "#C8102E" : "white"}
            stroke={ink}
            strokeWidth={stroke}
          />
          <ellipse cx="90" cy="50" rx="7" ry="12" fill={fill ? "#000000" : "white"} stroke={ink} strokeWidth="2" />
          <line x1="72" y1="28" x2="72" y2="72" stroke={ink} strokeWidth="3" strokeLinecap="round" />
          <line x1="108" y1="28" x2="108" y2="72" stroke={ink} strokeWidth="3" strokeLinecap="round" />
          <circle cx="72" cy="26" r="3" fill={fill ? "#FFFFFF" : "white"} stroke={ink} strokeWidth="1.5" />
          <circle cx="108" cy="26" r="3" fill={fill ? "#FFFFFF" : "white"} stroke={ink} strokeWidth="1.5" />
        </svg>
      )
    case "australie":
      return (
        <svg viewBox="0 0 180 100" className="h-20 w-full text-ink" aria-hidden="true">
          <rect x="1.5" y="1.5" width="177" height="97" fill={fill ? "#012169" : "white"} stroke={ink} strokeWidth={stroke} />
          {/* Canton Union Jack simplifié */}
          <rect x="1.5" y="1.5" width="72" height="48" fill={fill ? "#012169" : "white"} stroke={ink} strokeWidth={stroke} />
          <line x1="1.5" y1="1.5" x2="73.5" y2="49.5" stroke={fill ? "#FFFFFF" : ink} strokeWidth="4" />
          <line x1="73.5" y1="1.5" x2="1.5" y2="49.5" stroke={fill ? "#FFFFFF" : ink} strokeWidth="4" />
          <line x1="37.5" y1="1.5" x2="37.5" y2="49.5" stroke={fill ? "#C8102E" : ink} strokeWidth="6" />
          <line x1="1.5" y1="25.5" x2="73.5" y2="25.5" stroke={fill ? "#C8102E" : ink} strokeWidth="6" />
          {/* Étoile du Commonwealth + Southern Cross simplifiée */}
          <Star cx={90} cy={62} r={9} fill={fill ? "#FFFFFF" : "white"} stroke={ink} />
          <Star cx={130} cy={28} r={5} fill={fill ? "#FFFFFF" : "white"} stroke={ink} />
          <Star cx={148} cy={42} r={5} fill={fill ? "#FFFFFF" : "white"} stroke={ink} />
          <Star cx={148} cy={68} r={5} fill={fill ? "#FFFFFF" : "white"} stroke={ink} />
          <Star cx={125} cy={78} r={4} fill={fill ? "#FFFFFF" : "white"} stroke={ink} />
          <Star cx={112} cy={48} r={3.5} fill={fill ? "#FFFFFF" : "white"} stroke={ink} />
        </svg>
      )
    case "canada":
      return (
        <svg viewBox="0 0 180 100" className="h-20 w-full text-ink" aria-hidden="true">
          <rect x="1.5" y="1.5" width="40" height="97" fill={fill ? "#FF0000" : "white"} stroke={ink} strokeWidth={stroke} />
          <rect x="41.5" y="1.5" width="97" height="97" fill="white" stroke={ink} strokeWidth={stroke} />
          <rect x="138.5" y="1.5" width="40" height="97" fill={fill ? "#FF0000" : "white"} stroke={ink} strokeWidth={stroke} />
          {/* Feuille d'érable simplifiée */}
          <path
            d="M90 28
               L98 40 L112 36 L104 48 L118 52 L102 56 L108 72 L90 62
               L72 72 L78 56 L62 52 L76 48 L68 36 L82 40 Z
               M90 62 V78"
            fill={fill ? "#FF0000" : "white"}
            stroke={ink}
            strokeWidth={stroke}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      )
  }
}

function Star({
  cx,
  cy,
  r,
  fill,
  stroke,
}: {
  cx: number
  cy: number
  r: number
  fill: string
  stroke: string
}) {
  const points = Array.from({ length: 5 })
    .map((_, i) => {
      const a = (i * 2 * Math.PI) / 5 - Math.PI / 2
      const a2 = a + Math.PI / 5
      const outer = `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`
      const inner = `${cx + Math.cos(a2) * (r * 0.4)},${cy + Math.sin(a2) * (r * 0.4)}`
      return `${outer} ${inner}`
    })
    .join(" ")
  return <polygon points={points} fill={fill} stroke={stroke} strokeWidth="1.75" strokeLinejoin="round" />
}
