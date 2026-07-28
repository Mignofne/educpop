import type { SVGProps } from "react"
import { cn } from "@/lib/utils"
import type { ArtMode } from "./pictos"

type PictoProps = SVGProps<SVGSVGElement> & {
  mode?: ArtMode
  className?: string
}

const S = 3.25

/** Lion (crinière douce) */
export function PictoLion({ mode = "color", className, ...rest }: PictoProps) {
  const mane = mode === "color" ? "fill-tangerine" : "fill-white"
  const face = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="50" cy="50" r="34" className={mane} stroke="currentColor" strokeWidth={S} />
      <circle cx="50" cy="50" r="22" className={face} stroke="currentColor" strokeWidth={S} />
      <circle cx="42" cy="46" r="3.5" className="fill-ink" />
      <circle cx="58" cy="46" r="3.5" className="fill-ink" />
      <ellipse cx="50" cy="56" rx="5" ry="3.5" className={mode === "color" ? "fill-berry" : "fill-white"} stroke="currentColor" strokeWidth="2" />
      <path d="M44 64 Q50 70 56 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Éléphant d'Afrique */
export function PictoAfricaElephant({ mode = "color", className, ...rest }: PictoProps) {
  const skin = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="54" cy="58" rx="28" ry="22" className={skin} stroke="currentColor" strokeWidth={S} />
      <circle cx="34" cy="42" r="18" className={skin} stroke="currentColor" strokeWidth={S} />
      <path d="M26 48 Q14 72 20 86" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <ellipse cx="22" cy="38" rx="10" ry="14" className={skin} stroke="currentColor" strokeWidth="2.5" />
      <circle cx="30" cy="40" r="3" className="fill-ink" />
      <path d="M48 78 V92 M64 78 V92" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </svg>
  )
}

/** Acacia / savane */
export function PictoAcacia({ mode = "color", className, ...rest }: PictoProps) {
  const canopy = mode === "color" ? "fill-leaf" : "fill-white"
  const trunk = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="46" y="48" width="8" height="36" rx="2" className={trunk} stroke="currentColor" strokeWidth={S} />
      <ellipse cx="50" cy="40" rx="36" ry="18" className={canopy} stroke="currentColor" strokeWidth={S} />
      <ellipse cx="50" cy="90" rx="32" ry="6" className={mode === "color" ? "fill-sun" : "fill-white"} opacity={mode === "color" ? 0.45 : 0} />
    </svg>
  )
}

/** Girafe */
export function PictoGiraffe({ mode = "color", className, ...rest }: PictoProps) {
  const fur = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="44" y="28" width="12" height="42" rx="4" className={fur} stroke="currentColor" strokeWidth={S} />
      <ellipse cx="52" cy="22" rx="16" ry="12" className={fur} stroke="currentColor" strokeWidth={S} />
      <circle cx="58" cy="20" r="3" className="fill-ink" />
      <path d="M42 16 L40 8 M50 14 L50 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="50" cy="78" rx="18" ry="12" className={fur} stroke="currentColor" strokeWidth={S} />
      <path d="M40 88 V96 M60 88 V96" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      {[36, 48, 56].map((y) => (
        <rect key={y} x="46" y={y} width="8" height="5" className={mode === "color" ? "fill-tangerine" : "fill-white"} stroke="currentColor" strokeWidth="1.5" />
      ))}
    </svg>
  )
}

/** Baobab */
export function PictoBaobab({ mode = "color", className, ...rest }: PictoProps) {
  const trunk = mode === "color" ? "fill-tangerine" : "fill-white"
  const canopy = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path d="M34 88 L30 48 Q28 36 50 34 Q72 36 70 48 L66 88 Z" className={trunk} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <ellipse cx="50" cy="30" rx="28" ry="16" className={canopy} stroke="currentColor" strokeWidth={S} />
      <path d="M40 34 L36 18 M50 28 L50 12 M60 34 L64 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export type { PictoProps }
