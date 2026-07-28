import type { SVGProps } from "react"
import { cn } from "@/lib/utils"
import type { ArtMode } from "./pictos"

type PictoProps = SVGProps<SVGSVGElement> & {
  mode?: ArtMode
  className?: string
}

const S = 3.25

/** Pingouin — corps, ventre, ailerons en palette, bec, pattes */
export function PictoPenguin({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-ink" : "fill-white"
  const belly = "fill-white"
  const beak = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {/* Ailerons (sous le corps, palettes lisibles) */}
      <path
        d="M28 50 Q14 58 20 78 Q30 72 34 58 Z"
        className={body}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <path
        d="M72 50 Q86 58 80 78 Q70 72 66 58 Z"
        className={body}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Corps */}
      <ellipse cx="50" cy="58" rx="26" ry="32" className={body} stroke="currentColor" strokeWidth={S} />
      {/* Ventre */}
      <ellipse cx="50" cy="62" rx="15" ry="22" className={belly} stroke="currentColor" strokeWidth="2.5" />
      {/* Tête */}
      <circle cx="50" cy="26" r="17" className={body} stroke="currentColor" strokeWidth={S} />
      {/* Yeux */}
      <circle cx="43" cy="24" r="3.5" className={mode === "color" ? "fill-white" : "fill-ink"} />
      <circle cx="57" cy="24" r="3.5" className={mode === "color" ? "fill-white" : "fill-ink"} />
      {/* Bec */}
      <path
        d="M50 28 L42 36 L58 36 Z"
        className={beak}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Pattes */}
      <ellipse cx="40" cy="92" rx="9" ry="5" className={beak} stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="60" cy="92" rx="9" ry="5" className={beak} stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

/** Phoque — profil clair : museau, tête, corps, nageoire avant, queue en V */
export function PictoSeal({ mode = "color", className, ...rest }: PictoProps) {
  const fur = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {/* Queue / nageoires arrière — fourche attachée au corps */}
      <path
        d="M80 38 Q96 22 94 40 Q90 48 78 46 Z"
        className={fur}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <path
        d="M80 56 Q98 58 96 76 Q88 78 76 64 Z"
        className={fur}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Corps */}
      <ellipse cx="58" cy="52" rx="28" ry="22" className={fur} stroke="currentColor" strokeWidth={S} />
      {/* Nageoire avant */}
      <path
        d="M44 64 Q36 78 40 92 Q52 86 54 70 Z"
        className={fur}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Tête */}
      <circle cx="30" cy="44" r="18" className={fur} stroke="currentColor" strokeWidth={S} />
      {/* Museau */}
      <ellipse cx="14" cy="48" rx="11" ry="9" className={fur} stroke="currentColor" strokeWidth={S} />
      {/* Nez */}
      <ellipse cx="6" cy="48" rx="3.5" ry="3" className="fill-ink" />
      {/* Œil */}
      <circle cx="30" cy="40" r="4" className="fill-ink" />
      {mode === "color" ? <circle cx="31.5" cy="38.5" r="1.5" className="fill-white" /> : null}
      {/* Moustaches */}
      <path
        d="M12 42 L4 32 M12 48 L2 48 M12 54 L4 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Baleine */
export function PictoWhale({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="48" cy="55" rx="32" ry="20" className={body} stroke="currentColor" strokeWidth={S} />
      <path
        d="M78 50 Q94 38 90 58 Q86 70 76 62 Z"
        className={body}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <circle cx="30" cy="50" r="3.5" className="fill-ink" />
      <path d="M22 48 Q16 40 20 34" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse
        cx="48"
        cy="68"
        rx="14"
        ry="6"
        className="fill-white"
        stroke="currentColor"
        strokeWidth="2"
        opacity={mode === "color" ? 0.7 : 1}
      />
      <path
        d="M58 38 L62 28 L68 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Igloo — dôme, briques en arcs, grande porte */
export function PictoIgloo({ mode = "color", className, ...rest }: PictoProps) {
  const snow = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {/* Dôme */}
      <path
        d="M16 74 Q16 26 50 18 Q84 26 84 74 Z"
        className={snow}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Rangées de briques (arcs) */}
      <path d="M22 44 Q50 34 78 44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 58 Q50 50 80 58" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Joints verticaux */}
      <path d="M36 28 L34 44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 20 L50 44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M64 28 L66 44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 44 L28 58" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 44 L50 58" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M70 44 L72 58" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Porte (grande) */}
      <path
        d="M36 74 Q36 48 50 48 Q64 48 64 74"
        className="fill-white"
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Socle */}
      <rect
        x="14"
        y="70"
        width="72"
        height="10"
        rx="2"
        className={snow}
        stroke="currentColor"
        strokeWidth={S}
      />
    </svg>
  )
}

/** Bloc de glace */
export function PictoIce({ mode = "color", className, ...rest }: PictoProps) {
  const ice = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M28 78 L18 42 L50 18 L82 42 L72 78 Z"
        className={ice}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <path d="M50 18 L50 78" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M28 78 L50 52 L72 78" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

/** Flocon — 6 branches classiques + rameaux courts (zones à colorier) */
export function PictoSnowflake({ mode = "color", className, ...rest }: PictoProps) {
  const ice = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          {/* Bras principal large */}
          <rect
            x="46"
            y="14"
            width="8"
            height="36"
            rx="3"
            className={ice}
            stroke="currentColor"
            strokeWidth={S}
          />
          {/* Pointe */}
          <path
            d="M50 6 L57 16 L50 20 L43 16 Z"
            className={ice}
            stroke="currentColor"
            strokeWidth={S}
            strokeLinejoin="round"
          />
          {/* Rameaux courts (ne se croisent pas entre branches) */}
          <path
            d="M46 24 L36 16 L38 24 L46 28 Z"
            className={ice}
            stroke="currentColor"
            strokeWidth={S}
            strokeLinejoin="round"
          />
          <path
            d="M54 24 L64 16 L62 24 L54 28 Z"
            className={ice}
            stroke="currentColor"
            strokeWidth={S}
            strokeLinejoin="round"
          />
          <path
            d="M46 36 L38 30 L40 36 L46 40 Z"
            className={ice}
            stroke="currentColor"
            strokeWidth={S}
            strokeLinejoin="round"
          />
          <path
            d="M54 36 L62 30 L60 36 L54 40 Z"
            className={ice}
            stroke="currentColor"
            strokeWidth={S}
            strokeLinejoin="round"
          />
        </g>
      ))}
      {/* Cœur */}
      <circle cx="50" cy="50" r="10" className={ice} stroke="currentColor" strokeWidth={S} />
    </svg>
  )
}

export type { PictoProps }
