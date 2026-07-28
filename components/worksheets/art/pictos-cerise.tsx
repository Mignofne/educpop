import type { SVGProps } from "react"
import { cn } from "@/lib/utils"
import type { ArtMode } from "./pictos"

type PictoProps = SVGProps<SVGSVGElement> & {
  mode?: ArtMode
  className?: string
}

const S = 3.25

/** Deux cerises */
export function PictoCherryFruit({ mode = "color", className, ...rest }: PictoProps) {
  const fruit = mode === "color" ? "fill-berry" : "fill-white"
  const leaf = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path d="M50 18 Q42 40 34 52" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M50 18 Q58 40 66 52" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <circle cx="34" cy="68" r="16" className={fruit} stroke="currentColor" strokeWidth={S} />
      <circle cx="66" cy="68" r="16" className={fruit} stroke="currentColor" strokeWidth={S} />
      <ellipse cx="58" cy="22" rx="12" ry="7" className={leaf} stroke="currentColor" strokeWidth="2.5" transform="rotate(-20 58 22)" />
    </svg>
  )
}

/** Fleur de cerisier */
export function PictoCherryFlower({ mode = "color", className, ...rest }: PictoProps) {
  const petal = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="50"
          cy="32"
          rx="11"
          ry="17"
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

/** Arbre / cerisier */
export function PictoCherryTree({ mode = "color", className, ...rest }: PictoProps) {
  const canopy = mode === "color" ? "fill-berry" : "fill-white"
  const trunk = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="44" y="58" width="12" height="28" rx="2" className={trunk} stroke="currentColor" strokeWidth={S} />
      <circle cx="50" cy="40" r="28" className={canopy} stroke="currentColor" strokeWidth={S} />
      <circle cx="36" cy="36" r="3" className={mode === "color" ? "fill-sun" : "fill-white"} />
      <circle cx="54" cy="28" r="3" className={mode === "color" ? "fill-sun" : "fill-white"} />
      <circle cx="62" cy="42" r="3" className={mode === "color" ? "fill-sun" : "fill-white"} />
      <ellipse cx="50" cy="90" rx="28" ry="6" className={mode === "color" ? "fill-leaf" : "fill-white"} opacity={mode === "color" ? 0.35 : 0} />
    </svg>
  )
}

/** Panier */
export function PictoBasket({ mode = "color", className, ...rest }: PictoProps) {
  const basket = mode === "color" ? "fill-sun" : "fill-white"
  const fruit = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path d="M28 28 Q50 8 72 28" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M22 42 H78 L72 82 H28 Z" className={basket} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <line x1="28" y1="56" x2="72" y2="56" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="42" cy="48" r="7" className={fruit} stroke="currentColor" strokeWidth="2" />
      <circle cx="58" cy="48" r="7" className={fruit} stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Feuille */
export function PictoCherryLeaf({ mode = "color", className, ...rest }: PictoProps) {
  const leaf = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M22 68 Q28 28 50 18 Q72 28 78 68 Q50 88 22 68 Z"
        className={leaf}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <path d="M50 22 L50 78" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 40 Q38 48 36 56 M50 52 Q62 58 64 66" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export type { PictoProps }
