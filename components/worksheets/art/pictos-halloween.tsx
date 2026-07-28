import type { SVGProps } from "react"
import { cn } from "@/lib/utils"
import type { ArtMode } from "./pictos"

type PictoProps = SVGProps<SVGSVGElement> & {
  mode?: ArtMode
  className?: string
}

const S = 3.25

/** Citrouille amicale */
export function PictoPumpkin({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-tangerine" : "fill-white"
  const stem = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="50" cy="58" rx="34" ry="28" className={body} stroke="currentColor" strokeWidth={S} />
      <path d="M50 30 Q50 18 56 14" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <ellipse cx="54" cy="16" rx="6" ry="4" className={stem} stroke="currentColor" strokeWidth="2" />
      <path d="M36 40 Q50 30 64 40" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M36 58 Q50 48 64 58" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M36 74 Q50 66 64 74" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="40" cy="54" r="3" className="fill-ink" />
      <circle cx="60" cy="54" r="3" className="fill-ink" />
      <path d="M42 66 Q50 74 58 66" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Chauve-souris */
export function PictoBat({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M18 48 Q8 28 28 36 Q38 42 50 40 Q62 42 72 36 Q92 28 82 48 Q70 58 50 54 Q30 58 18 48 Z"
        className={body}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <circle cx="50" cy="48" r="10" className={body} stroke="currentColor" strokeWidth={S} />
      <circle cx="46" cy="46" r="2.5" className="fill-ink" />
      <circle cx="54" cy="46" r="2.5" className="fill-ink" />
      <path d="M44 38 L42 30 M56 38 L58 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Fantôme amical */
export function PictoGhost({ mode = "color", className, ...rest }: PictoProps) {
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M30 78 L30 40 Q30 18 50 18 Q70 18 70 40 L70 78 Q64 70 58 78 Q50 70 42 78 Q36 70 30 78 Z"
        className="fill-white"
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <circle cx="42" cy="42" r="4" className="fill-ink" />
      <circle cx="58" cy="42" r="4" className="fill-ink" />
      <path d="M44 56 Q50 62 56 56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Bonbon */
export function PictoCandy({ mode = "color", className, ...rest }: PictoProps) {
  const wrap = mode === "color" ? "fill-berry" : "fill-white"
  const center = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path d="M18 40 L32 50 L18 60 Z" className={wrap} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <path d="M82 40 L68 50 L82 60 Z" className={wrap} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <ellipse cx="50" cy="50" rx="22" ry="16" className={center} stroke="currentColor" strokeWidth={S} />
      <path d="M36 44 Q50 56 64 44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Lune */
export function PictoHalloweenMoon({ mode = "color", className, ...rest }: PictoProps) {
  const moon = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="50" cy="50" r="30" className={moon} stroke="currentColor" strokeWidth={S} />
      <circle cx="62" cy="42" r="22" className={mode === "color" ? "fill-[var(--background,#fffdf7)]" : "fill-white"} stroke="none" />
      <circle cx="40" cy="48" r="3" className="fill-ink" opacity="0.35" />
      <circle cx="48" cy="62" r="2" className="fill-ink" opacity="0.35" />
    </svg>
  )
}

export type { PictoProps }
