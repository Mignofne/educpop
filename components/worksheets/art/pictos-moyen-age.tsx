import type { SVGProps } from "react"
import { cn } from "@/lib/utils"
import type { ArtMode } from "./pictos"

type PictoProps = SVGProps<SVGSVGElement> & {
  mode?: ArtMode
  className?: string
}

const S = 3.25

/** Château — tours + donjon */
export function PictoCastle({ mode = "color", className, ...rest }: PictoProps) {
  const stone = mode === "color" ? "fill-sky" : "fill-white"
  const roof = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="18" y="48" width="18" height="40" className={stone} stroke="currentColor" strokeWidth={S} />
      <rect x="64" y="48" width="18" height="40" className={stone} stroke="currentColor" strokeWidth={S} />
      <rect x="32" y="38" width="36" height="50" className={stone} stroke="currentColor" strokeWidth={S} />
      {/* Créneaux */}
      {[18, 27, 64, 73].map((x) => (
        <rect key={x} x={x} y="40" width="8" height="10" className={stone} stroke="currentColor" strokeWidth="2" />
      ))}
      {[36, 46, 56].map((x) => (
        <rect key={x} x={x} y="28" width="8" height="12" className={stone} stroke="currentColor" strokeWidth="2" />
      ))}
      {/* Toits */}
      <path d="M16 40 L27 22 L38 40 Z" className={roof} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <path d="M62 40 L73 22 L84 40 Z" className={roof} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      {/* Porte */}
      <path d="M44 88 V62 Q50 52 56 62 V88" className="fill-white" stroke="currentColor" strokeWidth={S} />
      {/* Fenêtres */}
      <rect x="40" y="48" width="8" height="10" className="fill-white" stroke="currentColor" strokeWidth="2" />
      <rect x="52" y="48" width="8" height="10" className="fill-white" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Chevalier — casque + bouclier */
export function PictoKnight({ mode = "color", className, ...rest }: PictoProps) {
  const armor = mode === "color" ? "fill-sky" : "fill-white"
  const shield = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 80 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="40" cy="58" rx="18" ry="16" className={armor} stroke="currentColor" strokeWidth={S} />
      <circle cx="40" cy="28" r="14" className={armor} stroke="currentColor" strokeWidth={S} />
      <rect x="28" y="18" width="24" height="8" className={armor} stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="28" x2="48" y2="28" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M58 40 L72 36 L72 58 L58 62 Z"
        className={shield}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <line x1="22" y1="44" x2="22" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 20 L22 12 L28 20 Z" className={mode === "color" ? "fill-sun" : "fill-white"} stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Dragon stylisé */
export function PictoDragon({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-leaf" : "fill-white"
  const wing = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M55 40 Q70 10 88 28 Q78 38 62 42"
        className={wing}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <ellipse cx="48" cy="48" rx="22" ry="14" className={body} stroke="currentColor" strokeWidth={S} />
      <circle cx="28" cy="42" r="12" className={body} stroke="currentColor" strokeWidth={S} />
      <path d="M18 38 L10 28 L16 40" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <circle cx="24" cy="40" r="2.5" className="fill-ink" />
      <path d="M66 50 Q78 58 72 68" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M20 52 L14 62 M28 54 L26 64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Couronne */
export function PictoCrown({ mode = "color", className, ...rest }: PictoProps) {
  const fill = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 80 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M12 52 L18 28 L32 42 L40 20 L48 42 L62 28 L68 52 Z"
        className={fill}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <rect x="12" y="52" width="56" height="12" rx="2" className={fill} stroke="currentColor" strokeWidth={S} />
      <circle cx="40" cy="22" r="4" className={mode === "color" ? "fill-berry" : "fill-white"} stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Bouclier / blason */
export function PictoShield({ mode = "color", className, ...rest }: PictoProps) {
  const fill = mode === "color" ? "fill-sky" : "fill-white"
  const cross = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 80 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M40 12 L64 22 V42 Q64 62 40 72 Q16 62 16 42 V22 Z"
        className={fill}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <rect x="36" y="24" width="8" height="36" className={cross} stroke="currentColor" strokeWidth="2" />
      <rect x="24" y="36" width="32" height="8" className={cross} stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Épée */
export function PictoSword({ mode = "color", className, ...rest }: PictoProps) {
  const blade = mode === "color" ? "fill-sky" : "fill-white"
  const hilt = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 80 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path d="M38 12 L42 12 L44 48 L36 48 Z" className={blade} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <path d="M40 12 L46 6 L40 10 L34 6 Z" className={blade} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <rect x="28" y="48" width="24" height="6" className={hilt} stroke="currentColor" strokeWidth={S} />
      <rect x="36" y="54" width="8" height="16" className={hilt} stroke="currentColor" strokeWidth={S} />
      <circle cx="40" cy="72" r="4" className={hilt} stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export type { PictoProps }
