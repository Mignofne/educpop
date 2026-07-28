import type { SVGProps } from "react"
import { cn } from "@/lib/utils"
import type { ArtMode } from "./pictos"

type PictoProps = SVGProps<SVGSVGElement> & {
  mode?: ArtMode
  className?: string
}

const S = 3.25

/** Sapin */
export function PictoChristmasTree({ mode = "color", className, ...rest }: PictoProps) {
  const tree = mode === "color" ? "fill-leaf" : "fill-white"
  const trunk = mode === "color" ? "fill-tangerine" : "fill-white"
  const star = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path d="M50 14 L68 36 H32 Z" className={tree} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <path d="M50 28 L76 54 H24 Z" className={tree} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <path d="M50 44 L84 76 H16 Z" className={tree} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <rect x="44" y="76" width="12" height="14" className={trunk} stroke="currentColor" strokeWidth={S} />
      <circle cx="50" cy="12" r="5" className={star} stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Étoile */
export function PictoStar({ mode = "color", className, ...rest }: PictoProps) {
  const star = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M50 12 L58 40 L88 40 L64 58 L72 88 L50 70 L28 88 L36 58 L12 40 L42 40 Z"
        className={star}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Cadeau */
export function PictoGift({ mode = "color", className, ...rest }: PictoProps) {
  const box = mode === "color" ? "fill-berry" : "fill-white"
  const ribbon = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="22" y="40" width="56" height="42" rx="4" className={box} stroke="currentColor" strokeWidth={S} />
      <rect x="44" y="40" width="12" height="42" className={ribbon} stroke="currentColor" strokeWidth="2" />
      <rect x="22" y="54" width="56" height="10" className={ribbon} stroke="currentColor" strokeWidth="2" />
      <path d="M50 40 Q36 22 28 34 Q40 38 50 40 Q60 38 72 34 Q64 22 50 40" className={ribbon} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
    </svg>
  )
}

/** Moufle */
export function PictoMitten({ mode = "color", className, ...rest }: PictoProps) {
  const mitten = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M38 82 V42 Q38 22 54 22 Q70 22 70 42 V82 Z"
        className={mitten}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <path d="M38 48 Q22 44 24 56 Q26 66 38 62" className={mitten} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <rect x="38" y="78" width="32" height="10" className={mode === "color" ? "fill-berry" : "fill-white"} stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

/** Chocolat chaud */
export function PictoHotChocolate({ mode = "color", className, ...rest }: PictoProps) {
  const cup = mode === "color" ? "fill-tangerine" : "fill-white"
  const drink = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path d="M28 38 H68 L64 82 H32 Z" className={cup} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <ellipse cx="48" cy="38" rx="20" ry="8" className={drink} stroke="currentColor" strokeWidth={S} />
      <path d="M68 48 Q84 48 84 62 Q84 74 68 72" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M40 28 Q42 18 46 28 M52 26 Q54 14 58 26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Renne (simple, pas de marque) */
export function PictoReindeer({ mode = "color", className, ...rest }: PictoProps) {
  const fur = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="52" cy="62" rx="26" ry="18" className={fur} stroke="currentColor" strokeWidth={S} />
      <circle cx="32" cy="48" r="14" className={fur} stroke="currentColor" strokeWidth={S} />
      <circle cx="28" cy="46" r="3" className="fill-ink" />
      <circle cx="24" cy="52" r="3.5" className={mode === "color" ? "fill-berry" : "fill-white"} stroke="currentColor" strokeWidth="2" />
      <path d="M28 34 L22 18 M28 34 L34 16 M36 34 L40 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 78 V92 M62 78 V92" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </svg>
  )
}

export type { PictoProps }
