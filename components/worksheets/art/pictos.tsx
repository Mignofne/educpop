import type { SVGProps } from "react"
import { cn } from "@/lib/utils"

type ArtMode = "color" | "outline"

type PictoProps = SVGProps<SVGSVGElement> & {
  mode?: ArtMode
  className?: string
}

const stroke = 3.25

function base(mode: ArtMode) {
  return {
    fill: mode === "color" ? undefined : "white",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  }
}

/** Cercle / pastille Tullet */
export function DotBlob({
  mode = "color",
  tone = "sun",
  className,
  ...rest
}: PictoProps & { tone?: "sun" | "berry" | "sky" | "leaf" | "tangerine" }) {
  const fillClass =
    mode === "color"
      ? {
          sun: "fill-sun",
          berry: "fill-berry",
          sky: "fill-sky",
          leaf: "fill-leaf",
          tangerine: "fill-tangerine",
        }[tone]
      : "fill-white"
  return (
    <svg viewBox="0 0 80 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="40" cy="40" r="28" className={fillClass} stroke="currentColor" strokeWidth={stroke} />
      {mode === "color" && (
        <circle cx="28" cy="30" r="6" className="fill-white/50" />
      )}
    </svg>
  )
}

export function PictoSunflower({ mode = "color", className, ...rest }: PictoProps) {
  const petalFill = mode === "color" ? "fill-sun" : "fill-white"
  const centerFill = mode === "color" ? "fill-tangerine" : "fill-white"
  const leafFill = mode === "color" ? "fill-leaf" : "fill-white"
  const cx = 50
  const cy = 42

  return (
    <svg viewBox="0 0 100 110" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2 - Math.PI / 2
        const px = cx + Math.cos(a) * 28
        const py = cy + Math.sin(a) * 28
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx="14"
            ry="8"
            className={petalFill}
            stroke="currentColor"
            strokeWidth={stroke}
            transform={`rotate(${(a * 180) / Math.PI} ${px} ${py})`}
          />
        )
      })}
      <circle cx={cx} cy={cy} r="16" className={centerFill} stroke="currentColor" strokeWidth={stroke} />
      {mode === "color" &&
        [0, 1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            cx={cx + Math.cos(i) * 5}
            cy={cy + Math.sin(i * 1.7) * 5}
            r="1.8"
            className="fill-ink/40"
          />
        ))}
      <line x1={cx} y1={cy + 16} x2={cx} y2="98" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      <path
        d={`M${cx} 72 Q${cx - 22} 68 ${cx - 26} 84 Q${cx - 8} 86 ${cx} 78`}
        className={leafFill}
        stroke="currentColor"
        strokeWidth={stroke}
      />
    </svg>
  )
}

/** Graine de tournesol (achène) — goutte rayée, pas une pousse */
export function PictoSeed({ mode = "color", className, ...rest }: PictoProps) {
  const shell = mode === "color" ? "fill-ink" : "fill-white"
  return (
    <svg viewBox="0 0 80 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M40 12 C52 22 58 36 56 50 C54 64 46 70 40 70 C34 70 26 64 24 50 C22 36 28 22 40 12 Z"
        className={shell}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinejoin="round"
      />
      {/* Rayures caractéristiques */}
      <path
        d="M33 24 C36 36 36 50 34 60"
        fill="none"
        stroke={mode === "color" ? "white" : "currentColor"}
        strokeWidth={mode === "color" ? 5 : 2.5}
        strokeLinecap="round"
      />
      <path
        d="M40 18 C43 32 43 50 41 62"
        fill="none"
        stroke={mode === "color" ? "white" : "currentColor"}
        strokeWidth={mode === "color" ? 5 : 2.5}
        strokeLinecap="round"
      />
      <path
        d="M47 24 C50 36 50 50 48 60"
        fill="none"
        stroke={mode === "color" ? "white" : "currentColor"}
        strokeWidth={mode === "color" ? 5 : 2.5}
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Jeune pousse (germination) — distinct de la graine */
export function PictoSprout({ mode = "color", className, ...rest }: PictoProps) {
  const soil = mode === "color" ? "fill-tangerine" : "fill-white"
  const leaf = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 80 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="40" cy="62" rx="28" ry="10" className={soil} stroke="currentColor" strokeWidth={stroke} />
      <path d="M40 58 V30" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      <ellipse
        cx="30"
        cy="28"
        rx="11"
        ry="7"
        className={leaf}
        stroke="currentColor"
        strokeWidth={stroke}
        transform="rotate(-28 30 28)"
      />
      <ellipse
        cx="50"
        cy="28"
        rx="11"
        ry="7"
        className={leaf}
        stroke="currentColor"
        strokeWidth={stroke}
        transform="rotate(28 50 28)"
      />
    </svg>
  )
}



export function PictoLeaf({ mode = "color", className, ...rest }: PictoProps) {
  const fill = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 80 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M40 12 Q62 28 58 52 Q40 72 22 52 Q18 28 40 12 Z"
        className={fill}
        stroke="currentColor"
        strokeWidth={stroke}
      />
      <path d="M40 20 V60" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function PictoStem({ mode = "color", className, ...rest }: PictoProps) {
  const fill = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 80 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <line x1="40" y1="12" x2="40" y2="68" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M40 36 Q18 30 14 44 Q32 48 40 40" className={fill} stroke="currentColor" strokeWidth={stroke} />
      <path d="M40 48 Q60 42 64 56 Q48 58 40 52" className={fill} stroke="currentColor" strokeWidth={stroke} />
    </svg>
  )
}

export function PictoSun({ mode = "color", className, ...rest }: PictoProps) {
  const fill = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 80 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="40" cy="40" r="16" className={fill} stroke="currentColor" strokeWidth={stroke} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2
        return (
          <line
            key={i}
            x1={40 + Math.cos(a) * 22}
            y1={40 + Math.sin(a) * 22}
            x2={40 + Math.cos(a) * 32}
            y2={40 + Math.sin(a) * 32}
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export function PictoBee({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-sun" : "fill-white"
  const wing = mode === "color" ? "fill-sky" : "fill-white"
  return (
    <svg viewBox="0 0 80 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="28" cy="28" rx="14" ry="10" className={wing} stroke="currentColor" strokeWidth={stroke} />
      <ellipse cx="40" cy="44" rx="22" ry="14" className={body} stroke="currentColor" strokeWidth={stroke} />
      <line x1="32" y1="32" x2="32" y2="56" stroke="currentColor" strokeWidth="2.5" />
      <line x1="42" y1="32" x2="42" y2="56" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="58" cy="40" r="7" className="fill-white" stroke="currentColor" strokeWidth={stroke} />
      <circle cx="60" cy="39" r="2" className="fill-ink" />
    </svg>
  )
}

/** Ruche en paille (skep) — reconnaissable, pas en « gâteau » */
export function PictoHive({ mode = "color", className, ...rest }: PictoProps) {
  const straw = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 120" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M50 10 C78 18 92 52 88 88 C84 102 68 108 50 110 C32 108 16 102 12 88 C8 52 22 18 50 10 Z"
        className={straw}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinejoin="round"
      />
      <path d="M22 38 Q50 32 78 38" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 52 Q50 46 82 52" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 66 Q50 60 84 66" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 80 Q50 74 85 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="50" cy="94" rx="11" ry="7" className="fill-white" stroke="currentColor" strokeWidth={stroke} />
      <path d="M8 112 Q25 106 50 108 Q75 106 92 112" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 116 H94" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/** Panda géant — oreilles noires, taches oculaires, corps rond reconnaissable */
export function PictoPanda({ mode = "color", className, ...rest }: PictoProps) {
  const white = "fill-white"
  const black = mode === "color" ? "fill-ink" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {/* Oreilles */}
      <circle cx="28" cy="28" r="14" className={black} stroke="currentColor" strokeWidth={stroke} />
      <circle cx="72" cy="28" r="14" className={black} stroke="currentColor" strokeWidth={stroke} />
      {mode === "outline" && (
        <>
          <circle cx="28" cy="28" r="7" className={white} stroke="currentColor" strokeWidth="2" />
          <circle cx="72" cy="28" r="7" className={white} stroke="currentColor" strokeWidth="2" />
        </>
      )}
      {/* Tête */}
      <circle cx="50" cy="48" r="28" className={white} stroke="currentColor" strokeWidth={stroke} />
      {/* Taches oculaires */}
      <ellipse cx="36" cy="46" rx="11" ry="13" className={black} stroke="currentColor" strokeWidth="2.5" transform="rotate(-15 36 46)" />
      <ellipse cx="64" cy="46" rx="11" ry="13" className={black} stroke="currentColor" strokeWidth="2.5" transform="rotate(15 64 46)" />
      {/* Yeux */}
      <circle cx="36" cy="46" r="4" className={mode === "color" ? "fill-white" : "fill-white"} stroke="currentColor" strokeWidth="1.5" />
      <circle cx="64" cy="46" r="4" className="fill-white" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="37" cy="47" r="2" className="fill-ink" />
      <circle cx="65" cy="47" r="2" className="fill-ink" />
      {/* Nez + bouche */}
      <ellipse cx="50" cy="58" rx="5" ry="4" className={black} stroke="currentColor" strokeWidth="2" />
      <path d="M44 64 Q50 70 56 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Petit corps */}
      <ellipse cx="50" cy="82" rx="20" ry="12" className={white} stroke="currentColor" strokeWidth={stroke} />
      <ellipse cx="32" cy="78" rx="8" ry="6" className={black} stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="68" cy="78" rx="8" ry="6" className={black} stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

/** Bambou — but du chemin panda */
export function PictoBamboo({ mode = "color", className, ...rest }: PictoProps) {
  const fill = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 80 80" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="34" y="12" width="12" height="56" rx="3" className={fill} stroke="currentColor" strokeWidth={stroke} />
      <line x1="34" y1="28" x2="46" y2="28" stroke="currentColor" strokeWidth="2.5" />
      <line x1="34" y1="44" x2="46" y2="44" stroke="currentColor" strokeWidth="2.5" />
      <line x1="34" y1="58" x2="46" y2="58" stroke="currentColor" strokeWidth="2.5" />
      <path d="M46 22 Q62 14 68 22 Q58 28 46 26" className={fill} stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
      <path d="M34 36 Q18 28 14 38 Q24 44 34 40" className={fill} stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
    </svg>
  )
}

export function ArtDotsRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)} aria-hidden="true">
      <span className="h-3 w-3 rounded-full border-2 border-ink bg-berry" />
      <span className="h-3 w-3 rounded-full border-2 border-ink bg-sun" />
      <span className="h-3 w-3 rounded-full border-2 border-ink bg-sky" />
      <span className="h-3 w-3 rounded-full border-2 border-ink bg-leaf" />
    </div>
  )
}

export type { ArtMode, PictoProps }
export { base }
