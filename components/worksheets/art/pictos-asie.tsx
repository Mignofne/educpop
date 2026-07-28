import type { SVGProps } from "react"
import { cn } from "@/lib/utils"
import type { ArtMode } from "./pictos"

type PictoProps = SVGProps<SVGSVGElement> & {
  mode?: ArtMode
  className?: string
}

const S = 3.25

/** Montagne / Fuji simplifié */
export function PictoFuji({ mode = "color", className, ...rest }: PictoProps) {
  const snow = mode === "color" ? "fill-sky" : "fill-white"
  const mountain = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="50" cy="88" rx="40" ry="8" className={mode === "color" ? "fill-sky" : "fill-white"} opacity={mode === "color" ? 0.35 : 0} />
      <path d="M12 82 L50 18 L88 82 Z" className={mountain} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <path d="M38 42 L50 22 L62 42 Z" className={snow} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

/** Pagode (architecture — observation) */
export function PictoPagoda({ mode = "color", className, ...rest }: PictoProps) {
  const roof = mode === "color" ? "fill-berry" : "fill-white"
  const wall = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="36" y="68" width="28" height="22" className={wall} stroke="currentColor" strokeWidth={S} />
      <path d="M28 68 H72 L64 56 H36 Z" className={roof} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <rect x="40" y="42" width="20" height="14" className={wall} stroke="currentColor" strokeWidth="2.5" />
      <path d="M30 42 H70 L62 30 H38 Z" className={roof} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <rect x="44" y="18" width="12" height="12" className={wall} stroke="currentColor" strokeWidth="2.5" />
      <path d="M34 18 H66 L58 8 H42 Z" className={roof} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <line x1="50" y1="8" x2="50" y2="2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Fleur de cerisier */
export function PictoCherryBlossom({ mode = "color", className, ...rest }: PictoProps) {
  const petal = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="50"
          cy="32"
          rx="12"
          ry="18"
          className={petal}
          stroke="currentColor"
          strokeWidth="2.5"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="8" className={mode === "color" ? "fill-sun" : "fill-white"} stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

/** Bol de riz */
export function PictoRiceBowl({ mode = "color", className, ...rest }: PictoProps) {
  const bowl = mode === "color" ? "fill-sky" : "fill-white"
  const rice = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="50" cy="42" rx="32" ry="12" className={rice} stroke="currentColor" strokeWidth={S} />
      <path d="M18 42 Q20 78 50 82 Q80 78 82 42" className={bowl} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <ellipse cx="50" cy="42" rx="28" ry="8" className="fill-white" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </svg>
  )
}

/** Lanterne */
export function PictoLantern({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <line x1="50" y1="8" x2="50" y2="22" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <rect x="38" y="18" width="24" height="8" rx="2" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="50" cy="52" rx="26" ry="28" className={body} stroke="currentColor" strokeWidth={S} />
      <line x1="28" y1="52" x2="72" y2="52" stroke="currentColor" strokeWidth="2.5" />
      <rect x="40" y="78" width="20" height="8" rx="2" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <line x1="50" y1="86" x2="50" y2="94" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Tigre (Asie) */
export function PictoTiger({ mode = "color", className, ...rest }: PictoProps) {
  const fur = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="50" cy="48" r="28" className={fur} stroke="currentColor" strokeWidth={S} />
      <path d="M28 32 L24 16 L38 28 Z" className={fur} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M62 28 L76 16 L72 32 Z" className={fur} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="40" cy="46" r="4" className="fill-ink" />
      <circle cx="60" cy="46" r="4" className="fill-ink" />
      <ellipse cx="50" cy="58" rx="5" ry="3.5" className={mode === "color" ? "fill-berry" : "fill-white"} stroke="currentColor" strokeWidth="2" />
      {[34, 50, 66].map((x) => (
        <line key={x} x1={x} y1="68" x2={x} y2="78" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </svg>
  )
}

/** Éléphant d'Asie */
export function PictoElephant({ mode = "color", className, ...rest }: PictoProps) {
  const skin = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="52" cy="58" rx="30" ry="24" className={skin} stroke="currentColor" strokeWidth={S} />
      <circle cx="36" cy="40" r="18" className={skin} stroke="currentColor" strokeWidth={S} />
      <path d="M28 48 Q18 70 22 84" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <ellipse cx="22" cy="36" rx="10" ry="14" className={skin} stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="38" r="3" className="fill-ink" />
      <rect x="40" y="78" width="10" height="14" className={skin} stroke="currentColor" strokeWidth="2.5" />
      <rect x="62" y="78" width="10" height="14" className={skin} stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

/** Grue / oiseau */
export function PictoCrane({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-sky" : "fill-white"
  const beak = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="48" cy="58" rx="22" ry="16" className={body} stroke="currentColor" strokeWidth={S} />
      <circle cx="68" cy="40" r="12" className={body} stroke="currentColor" strokeWidth={S} />
      <path d="M78 40 L92 36 L78 46 Z" className={beak} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="70" cy="38" r="2.5" className="fill-ink" />
      <path d="M30 52 Q18 40 22 28" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <line x1="42" y1="72" x2="38" y2="90" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <line x1="54" y1="72" x2="58" y2="90" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </svg>
  )
}

/** Carte / continent simplifié */
export function PictoAsiaMap({ mode = "color", className, ...rest }: PictoProps) {
  const land = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M22 28 Q40 18 58 22 Q78 20 84 36 Q90 52 78 68 Q70 82 52 84 Q32 86 24 70 Q14 52 22 28 Z"
        className={land}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <circle cx="62" cy="40" r="4" className={mode === "color" ? "fill-berry" : "fill-white"} stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Tasse de thé */
export function PictoTeaCup({ mode = "color", className, ...rest }: PictoProps) {
  const cup = mode === "color" ? "fill-sun" : "fill-white"
  const tea = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path d="M24 38 H68 L64 78 H28 Z" className={cup} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <ellipse cx="46" cy="38" rx="22" ry="8" className={tea} stroke="currentColor" strokeWidth={S} />
      <path d="M68 48 Q84 48 84 60 Q84 72 68 70" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M36 22 Q40 12 44 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <path d="M48 20 Q52 10 56 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

export type { PictoProps }
