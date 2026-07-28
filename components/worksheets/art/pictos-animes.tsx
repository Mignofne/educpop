import type { SVGProps } from "react"
import { cn } from "@/lib/utils"
import type { ArtMode } from "./pictos"

type PictoProps = SVGProps<SVGSVGElement> & {
  mode?: ArtMode
  className?: string
}

const S = 3.25

/** Bateau pirate (aventure) */
export function PictoPirateShip({ mode = "color", className, ...rest }: PictoProps) {
  const hull = mode === "color" ? "fill-tangerine" : "fill-white"
  const sail = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="50" cy="82" rx="36" ry="10" className="fill-sky" opacity={mode === "color" ? 0.5 : 0} />
      <path d="M18 70 Q50 88 82 70 L76 58 H24 Z" className={hull} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <line x1="50" y1="58" x2="50" y2="22" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M52 24 L78 40 L52 52 Z" className={sail} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <path d="M48 28 L28 42 L48 50 Z" className="fill-white" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <circle cx="22" cy="48" r="6" className={mode === "color" ? "fill-berry" : "fill-white"} stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

/** Chapeau de paille (aventure) */
export function PictoStrawHat({ mode = "color", className, ...rest }: PictoProps) {
  const hat = mode === "color" ? "fill-sun" : "fill-white"
  const band = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="50" cy="62" rx="40" ry="14" className={hat} stroke="currentColor" strokeWidth={S} />
      <ellipse cx="50" cy="48" rx="26" ry="18" className={hat} stroke="currentColor" strokeWidth={S} />
      <rect x="24" y="52" width="52" height="10" rx="3" className={band} stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

/** Coffre au trésor */
export function PictoTreasure({ mode = "color", className, ...rest }: PictoProps) {
  const box = mode === "color" ? "fill-tangerine" : "fill-white"
  const lid = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="20" y="48" width="60" height="36" rx="4" className={box} stroke="currentColor" strokeWidth={S} />
      <path d="M18 48 Q50 22 82 48" className={lid} stroke="currentColor" strokeWidth={S} fill={mode === "color" ? undefined : "white"} />
      <rect x="44" y="58" width="12" height="14" rx="2" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="40" r="5" className={mode === "color" ? "fill-sun" : "fill-white"} stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Boussole */
export function PictoCompass({ mode = "color", className, ...rest }: PictoProps) {
  const face = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="50" cy="50" r="32" className={face} stroke="currentColor" strokeWidth={S} />
      <circle cx="50" cy="50" r="22" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <path d="M50 32 L56 50 L50 68 L44 50 Z" className={mode === "color" ? "fill-berry" : "fill-white"} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="4" className="fill-ink" />
    </svg>
  )
}

/** Vague / mer */
export function PictoWave({ mode = "color", className, ...rest }: PictoProps) {
  const water = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M10 55 Q25 35 40 55 Q55 75 70 55 Q85 35 95 50 L95 80 H10 Z"
        className={water}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Chiot secours */
export function PictoRescuePup({ mode = "color", className, ...rest }: PictoProps) {
  const fur = mode === "color" ? "fill-sun" : "fill-white"
  const vest = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="50" cy="62" rx="28" ry="22" className={fur} stroke="currentColor" strokeWidth={S} />
      <circle cx="50" cy="38" r="20" className={fur} stroke="currentColor" strokeWidth={S} />
      <ellipse cx="28" cy="28" rx="8" ry="12" className={fur} stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="72" cy="28" rx="8" ry="12" className={fur} stroke="currentColor" strokeWidth="2.5" />
      <circle cx="42" cy="36" r="3" className="fill-ink" />
      <circle cx="58" cy="36" r="3" className="fill-ink" />
      <ellipse cx="50" cy="46" rx="5" ry="3.5" className={mode === "color" ? "fill-berry" : "fill-white"} stroke="currentColor" strokeWidth="2" />
      <path d="M32 58 H68 V72 H32 Z" className={vest} stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="65" r="6" className="fill-white" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Tour de guet */
export function PictoLookout({ mode = "color", className, ...rest }: PictoProps) {
  const tower = mode === "color" ? "fill-sky" : "fill-white"
  const roof = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="34" y="40" width="32" height="48" className={tower} stroke="currentColor" strokeWidth={S} />
      <path d="M28 40 L50 18 L72 40 Z" className={roof} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <rect x="44" y="52" width="12" height="14" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="28" r="5" className={mode === "color" ? "fill-sun" : "fill-white"} stroke="currentColor" strokeWidth="2" />
      <line x1="20" y1="88" x2="80" y2="88" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </svg>
  )
}

/** Badge secours */
export function PictoBadge({ mode = "color", className, ...rest }: PictoProps) {
  const badge = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="50" cy="50" r="30" className={badge} stroke="currentColor" strokeWidth={S} />
      <circle cx="50" cy="50" r="18" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <path d="M50 38 L54 48 L65 48 L56 55 L60 66 L50 59 L40 66 L44 55 L35 48 L46 48 Z" className={mode === "color" ? "fill-berry" : "fill-white"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

/** Camion de secours */
export function PictoRescueTruck({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="14" y="42" width="58" height="28" rx="4" className={body} stroke="currentColor" strokeWidth={S} />
      <path d="M72 50 H88 L92 62 V70 H72 Z" className={body} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <rect x="76" y="54" width="10" height="8" className="fill-white" stroke="currentColor" strokeWidth="2" />
      <circle cx="30" cy="74" r="9" className="fill-white" stroke="currentColor" strokeWidth={S} />
      <circle cx="70" cy="74" r="9" className="fill-white" stroke="currentColor" strokeWidth={S} />
      <rect x="22" y="48" width="14" height="10" className="fill-white" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Os */
export function PictoBone({ mode = "color", className, ...rest }: PictoProps) {
  const bone = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="28" y="44" width="44" height="12" rx="4" className={bone} stroke="currentColor" strokeWidth={S} />
      <circle cx="24" cy="40" r="10" className={bone} stroke="currentColor" strokeWidth={S} />
      <circle cx="24" cy="60" r="10" className={bone} stroke="currentColor" strokeWidth={S} />
      <circle cx="76" cy="40" r="10" className={bone} stroke="currentColor" strokeWidth={S} />
      <circle cx="76" cy="60" r="10" className={bone} stroke="currentColor" strokeWidth={S} />
    </svg>
  )
}

/** Héros chat (nuit) */
export function PictoNightCat({ mode = "color", className, ...rest }: PictoProps) {
  const suit = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="50" cy="68" rx="22" ry="20" className={suit} stroke="currentColor" strokeWidth={S} />
      <circle cx="50" cy="40" r="18" className={suit} stroke="currentColor" strokeWidth={S} />
      <path d="M34 28 L38 14 L46 26 Z" className={suit} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M54 26 L62 14 L66 28 Z" className={suit} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="50" cy="42" rx="12" ry="8" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="44" cy="42" r="2.5" className="fill-ink" />
      <circle cx="56" cy="42" r="2.5" className="fill-ink" />
    </svg>
  )
}

/** Héros hibou (nuit) */
export function PictoNightOwl({ mode = "color", className, ...rest }: PictoProps) {
  const suit = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="50" cy="62" rx="24" ry="26" className={suit} stroke="currentColor" strokeWidth={S} />
      <circle cx="50" cy="40" r="20" className={suit} stroke="currentColor" strokeWidth={S} />
      <circle cx="40" cy="40" r="8" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="40" r="8" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="40" cy="40" r="3" className="fill-ink" />
      <circle cx="60" cy="40" r="3" className="fill-ink" />
      <path d="M46 50 L50 56 L54 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 70 Q20 50 30 42" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M72 70 Q80 50 70 42" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </svg>
  )
}

/** Héros lézard (nuit) */
export function PictoNightLizard({ mode = "color", className, ...rest }: PictoProps) {
  const suit = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="50" cy="58" rx="20" ry="26" className={suit} stroke="currentColor" strokeWidth={S} />
      <circle cx="50" cy="32" r="16" className={suit} stroke="currentColor" strokeWidth={S} />
      <ellipse cx="50" cy="34" rx="10" ry="7" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="46" cy="34" r="2.5" className="fill-ink" />
      <circle cx="54" cy="34" r="2.5" className="fill-ink" />
      <path d="M50 78 Q70 88 78 70" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <circle cx="78" cy="68" r="5" className={suit} stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

/** Lune croissant */
export function PictoMoon({ mode = "color", className, ...rest }: PictoProps) {
  const moon = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M58 22 A28 28 0 1 0 58 78 A22 22 0 1 1 58 22 Z"
        className={moon}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <circle cx="72" cy="30" r="2" className="fill-ink" opacity="0.45" />
      <circle cx="78" cy="48" r="1.5" className="fill-ink" opacity="0.45" />
    </svg>
  )
}

/** QG nuit */
export function PictoNightHQ({ mode = "color", className, ...rest }: PictoProps) {
  const wall = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path d="M20 78 L50 22 L80 78 Z" className={wall} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <rect x="42" y="52" width="16" height="26" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="42" r="6" className={mode === "color" ? "fill-sun" : "fill-white"} stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

/** Maison des chats */
export function PictoCatHouse({ mode = "color", className, ...rest }: PictoProps) {
  const wall = mode === "color" ? "fill-berry" : "fill-white"
  const roof = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="22" y="48" width="56" height="40" className={wall} stroke="currentColor" strokeWidth={S} />
      <path d="M16 48 L50 18 L84 48 Z" className={roof} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      {/* Oreilles toit */}
      <path d="M28 40 L34 22 L42 40" fill="none" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <path d="M58 40 L66 22 L72 40" fill="none" stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <rect x="42" y="60" width="16" height="28" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="34" cy="62" r="5" className="fill-white" stroke="currentColor" strokeWidth="2" />
      <circle cx="66" cy="62" r="5" className="fill-white" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Chaton amical */
export function PictoKitty({ mode = "color", className, ...rest }: PictoProps) {
  const fur = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="50" cy="52" r="28" className={fur} stroke="currentColor" strokeWidth={S} />
      <path d="M28 40 L32 18 L44 36 Z" className={fur} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M56 36 L68 18 L72 40 Z" className={fur} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="40" cy="50" r="4" className="fill-ink" />
      <circle cx="60" cy="50" r="4" className="fill-ink" />
      <ellipse cx="50" cy="60" rx="4" ry="3" className={mode === "color" ? "fill-berry" : "fill-white"} stroke="currentColor" strokeWidth="2" />
      <path d="M22 58 Q10 55 18 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M78 58 Q90 55 82 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Cupcake fête */
export function PictoCupcake({ mode = "color", className, ...rest }: PictoProps) {
  const icing = mode === "color" ? "fill-berry" : "fill-white"
  const cake = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path d="M30 52 H70 L64 82 H36 Z" className={cake} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <ellipse cx="50" cy="50" rx="26" ry="14" className={icing} stroke="currentColor" strokeWidth={S} />
      <circle cx="50" cy="34" r="6" className={mode === "color" ? "fill-leaf" : "fill-white"} stroke="currentColor" strokeWidth="2.5" />
      <rect x="48" y="22" width="4" height="12" className="fill-white" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Pelote / artisanat */
export function PictoYarn({ mode = "color", className, ...rest }: PictoProps) {
  const ball = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="50" cy="52" r="28" className={ball} stroke="currentColor" strokeWidth={S} />
      <path d="M28 40 Q50 30 72 45" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M26 55 Q50 48 74 58" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M32 70 Q50 62 68 72" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M72 40 Q88 28 82 18" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </svg>
  )
}

/** Porte-clés ami */
export function PictoFriendKey({ mode = "color", className, ...rest }: PictoProps) {
  const key = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="38" cy="38" r="16" className={key} stroke="currentColor" strokeWidth={S} />
      <circle cx="38" cy="38" r="7" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <rect x="48" y="34" width="36" height="10" rx="3" className={key} stroke="currentColor" strokeWidth={S} />
      <rect x="72" y="44" width="6" height="12" className={key} stroke="currentColor" strokeWidth="2" />
      <rect x="62" y="44" width="6" height="8" className={key} stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export type { PictoProps }
