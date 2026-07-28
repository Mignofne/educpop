import type { SVGProps } from "react"
import { cn } from "@/lib/utils"
import type { ArtMode } from "./pictos"

type PictoProps = SVGProps<SVGSVGElement> & {
  mode?: ArtMode
  className?: string
}

const S = 3.25

/** Poisson */
export function PictoFish({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="48" cy="50" rx="28" ry="18" className={body} stroke="currentColor" strokeWidth={S} />
      <path d="M74 50 L92 34 L88 50 L92 66 Z" className={body} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <circle cx="34" cy="46" r="4" className="fill-ink" />
      <path d="M48 34 Q52 26 56 34" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 58 Q48 64 54 58" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Baleine océan */
export function PictoOceanWhale({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="46" cy="56" rx="30" ry="18" className={body} stroke="currentColor" strokeWidth={S} />
      <path d="M74 52 Q92 40 88 60 Q84 72 72 64 Z" className={body} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <circle cx="30" cy="52" r="3.5" className="fill-ink" />
      <path d="M22 50 Q16 40 22 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M54 40 L58 28 L64 38" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Coquillage */
export function PictoShell({ mode = "color", className, ...rest }: PictoProps) {
  const shell = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M50 82 Q18 70 28 40 Q38 18 50 22 Q62 18 72 40 Q82 70 50 82 Z"
        className={shell}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {[34, 42, 50, 58, 66].map((x) => (
        <line key={x} x1="50" y1="78" x2={x} y2="36" stroke="currentColor" strokeWidth="2" />
      ))}
      <ellipse cx="50" cy="78" rx="10" ry="5" className="fill-white" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Vague */
export function PictoOceanWave({ mode = "color", className, ...rest }: PictoProps) {
  const water = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M8 62 Q28 40 42 58 Q56 78 70 52 Q82 36 94 50 L94 82 L8 82 Z"
        className={water}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <path d="M12 48 Q28 28 40 44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Pieuvre */
export function PictoOctopus({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="50" cy="42" r="24" className={body} stroke="currentColor" strokeWidth={S} />
      <circle cx="42" cy="40" r="4" className="fill-ink" />
      <circle cx="58" cy="40" r="4" className="fill-ink" />
      <path d="M42 50 Q50 56 58 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {[28, 40, 52, 64].map((x, i) => (
        <path
          key={x}
          d={`M${x} 62 Q${x + (i % 2 === 0 ? -8 : 8)} 78 ${x} 92`}
          fill="none"
          stroke="currentColor"
          strokeWidth={S}
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

/** Petit bateau */
export function PictoBoat({ mode = "color", className, ...rest }: PictoProps) {
  const hull = mode === "color" ? "fill-tangerine" : "fill-white"
  const sail = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="50" cy="82" rx="36" ry="8" className={mode === "color" ? "fill-sky" : "fill-white"} opacity={mode === "color" ? 0.45 : 0} />
      <path d="M20 68 Q50 84 80 68 L74 56 H26 Z" className={hull} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <line x1="50" y1="56" x2="50" y2="22" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M52 24 L76 42 L52 50 Z" className={sail} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
    </svg>
  )
}

export type { PictoProps }
