import type { SVGProps } from "react"
import { cn } from "@/lib/utils"
import type { ArtMode } from "./pictos"

type PictoProps = SVGProps<SVGSVGElement> & {
  mode?: ArtMode
  className?: string
}

const S = 3.25

/** Renard — profil : museau, oreilles pointues, queue touffue */
export function PictoFox({ mode = "color", className, ...rest }: PictoProps) {
  const fur = mode === "color" ? "fill-tangerine" : "fill-white"
  const white = "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {/* Queue */}
      <path
        d="M78 58 C92 48 96 28 88 18 C80 12 70 22 68 34 C66 46 70 56 78 58 Z"
        className={fur}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <ellipse cx="86" cy="28" rx="6" ry="5" className={white} stroke="currentColor" strokeWidth="2" />
      {/* Corps */}
      <ellipse cx="52" cy="62" rx="26" ry="18" className={fur} stroke="currentColor" strokeWidth={S} />
      {/* Patte avant */}
      <path d="M36 72 V86" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M48 74 V88" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      {/* Tête */}
      <path
        d="M18 48 L8 28 L22 40 L28 22 L36 40 L48 30 L42 48 C42 62 28 68 18 58 Z"
        className={fur}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Museau blanc */}
      <ellipse cx="16" cy="52" rx="8" ry="6" className={white} stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="52" r="2.5" className="fill-ink" />
      <circle cx="30" cy="46" r="3" className="fill-ink" />
    </svg>
  )
}

/** Hibou — face : grands yeux, bec, aigrettes */
export function PictoOwl({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-berry" : "fill-white"
  const belly = mode === "color" ? "fill-sun" : "fill-white"
  const beak = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {/* Aigrettes */}
      <path d="M28 28 L18 8 L34 24" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M72 28 L82 8 L66 24" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" strokeLinejoin="round" />
      {/* Corps */}
      <ellipse cx="50" cy="58" rx="32" ry="30" className={body} stroke="currentColor" strokeWidth={S} />
      {/* Ventre */}
      <ellipse cx="50" cy="66" rx="16" ry="18" className={belly} stroke="currentColor" strokeWidth="2.5" />
      {/* Yeux */}
      <circle cx="36" cy="46" r="14" className="fill-white" stroke="currentColor" strokeWidth={S} />
      <circle cx="64" cy="46" r="14" className="fill-white" stroke="currentColor" strokeWidth={S} />
      <circle cx="36" cy="48" r="6" className="fill-ink" />
      <circle cx="64" cy="48" r="6" className="fill-ink" />
      <circle cx="34" cy="46" r="2" className="fill-white" />
      <circle cx="62" cy="46" r="2" className="fill-white" />
      {/* Bec */}
      <path d="M50 54 L44 64 L56 64 Z" className={beak} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Pattes */}
      <path d="M42 88 L38 96 M42 88 L46 96" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M58 88 L54 96 M58 88 L62 96" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Écureuil — assis de profil, queue en S bien visible */
export function PictoSquirrel({ mode = "color", className, ...rest }: PictoProps) {
  const fur = mode === "color" ? "fill-tangerine" : "fill-white"
  const belly = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {/* Queue en panache (S derrière) */}
      <path
        d="M58 70 C78 78 92 62 88 42 C84 22 68 16 58 28 C52 36 56 48 62 52 C70 58 68 68 58 70 Z"
        className={fur}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Corps assis */}
      <ellipse cx="42" cy="62" rx="18" ry="22" className={fur} stroke="currentColor" strokeWidth={S} />
      <ellipse cx="40" cy="66" rx="10" ry="12" className={belly} stroke="currentColor" strokeWidth="2" />
      {/* Tête */}
      <circle cx="36" cy="36" r="16" className={fur} stroke="currentColor" strokeWidth={S} />
      {/* Oreille */}
      <path d="M30 24 L26 10 L38 22" className={fur} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      {/* Museau + œil */}
      <ellipse cx="24" cy="40" rx="7" ry="5" className={belly} stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="40" r="2" className="fill-ink" />
      <circle cx="34" cy="34" r="2.5" className="fill-ink" />
      {/* Petites pattes avant */}
      <path d="M34 54 L28 64" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M42 56 L40 66" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      {/* Patte arrière */}
      <ellipse cx="48" cy="84" rx="10" ry="6" className={fur} stroke="currentColor" strokeWidth={S} />
    </svg>
  )
}

/** Hérisson — profil : museau pointu + dos hérissé de picots */
export function PictoHedgehog({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-ink" : "fill-white"
  const face = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {/* Picots en éventail */}
      {[
        [48, 52, 38, 12],
        [56, 50, 50, 8],
        [64, 52, 64, 10],
        [70, 54, 78, 14],
        [74, 58, 88, 22],
        [76, 64, 92, 36],
        [42, 54, 28, 16],
        [36, 58, 18, 26],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      {/* Dos / corps */}
      <path
        d="M30 70 C30 48 48 38 68 42 C86 46 90 62 84 74 C78 84 48 86 30 78 Z"
        className={body}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Tête / museau */}
      <path
        d="M30 62 C22 58 12 60 8 66 C4 72 10 78 20 76 C28 74 34 70 30 62 Z"
        className={face}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <circle cx="18" cy="66" r="2.5" className="fill-ink" />
      <circle cx="10" cy="68" r="2" className="fill-ink" />
      {/* Petites pattes */}
      <ellipse cx="40" cy="82" rx="6" ry="4" className={face} stroke="currentColor" strokeWidth="2" />
      <ellipse cx="58" cy="84" rx="6" ry="4" className={face} stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Grenouille — assise de face, yeux en haut, pattes visibles */
export function PictoFrog({ mode = "color", className, ...rest }: PictoProps) {
  const skin = mode === "color" ? "fill-leaf" : "fill-white"
  const belly = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {/* Pattes arrière (en M) */}
      <path
        d="M28 72 L12 78 L18 90 L32 82 Z"
        className={skin}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <path
        d="M72 72 L88 78 L82 90 L68 82 Z"
        className={skin}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Corps */}
      <ellipse cx="50" cy="62" rx="30" ry="22" className={skin} stroke="currentColor" strokeWidth={S} />
      <ellipse cx="50" cy="66" rx="16" ry="12" className={belly} stroke="currentColor" strokeWidth="2.5" />
      {/* Yeux en relief */}
      <circle cx="34" cy="38" r="14" className={skin} stroke="currentColor" strokeWidth={S} />
      <circle cx="66" cy="38" r="14" className={skin} stroke="currentColor" strokeWidth={S} />
      <circle cx="34" cy="38" r="7" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="66" cy="38" r="7" className="fill-white" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="34" cy="38" r="3.5" className="fill-ink" />
      <circle cx="66" cy="38" r="3.5" className="fill-ink" />
      {/* Sourire */}
      <path d="M40 54 Q50 62 60 54" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pattes avant */}
      <path d="M38 78 L34 90" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M62 78 L66 90" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
    </svg>
  )
}

/** Papillon — ailes en forme de cœur / ovales clairement papillon */
export function PictoButterfly({ mode = "color", className, ...rest }: PictoProps) {
  const wingTL = mode === "color" ? "fill-sky" : "fill-white"
  const wingTR = mode === "color" ? "fill-berry" : "fill-white"
  const wingBL = mode === "color" ? "fill-leaf" : "fill-white"
  const wingBR = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {/* Aile haut gauche */}
      <path
        d="M48 48 C48 28 36 14 22 18 C10 22 8 40 20 48 C28 52 40 52 48 48 Z"
        className={wingTL}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Aile haut droite */}
      <path
        d="M52 48 C52 28 64 14 78 18 C90 22 92 40 80 48 C72 52 60 52 52 48 Z"
        className={wingTR}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Aile bas gauche */}
      <path
        d="M48 52 C40 52 28 56 22 66 C16 78 24 88 36 84 C44 82 48 70 48 52 Z"
        className={wingBL}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Aile bas droite */}
      <path
        d="M52 52 C60 52 72 56 78 66 C84 78 76 88 64 84 C56 82 52 70 52 52 Z"
        className={wingBR}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Corps — blanc en outline pour coloriage */}
      <ellipse
        cx="50"
        cy="52"
        rx="4"
        ry="22"
        className={mode === "color" ? "fill-ink" : "fill-white"}
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="50"
        cy="28"
        r="6"
        className={mode === "color" ? "fill-ink" : "fill-white"}
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Antennes */}
      <path d="M46 24 Q40 12 34 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M54 24 Q60 12 66 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle
        cx="34"
        cy="10"
        r="3"
        className={mode === "color" ? "fill-ink" : "fill-white"}
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="66"
        cy="10"
        r="3"
        className={mode === "color" ? "fill-ink" : "fill-white"}
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Motifs ailes — cercles ouverts en outline (à colorier) */}
      <circle cx="28" cy="34" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="72" cy="34" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="30" cy="68" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="70" cy="68" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Coccinelle — vue de dessus, pour coloriage / chemins */
export function PictoLadybug({ mode = "color", className, ...rest }: PictoProps) {
  const shell = mode === "color" ? "fill-berry" : "fill-white"
  const head = mode === "color" ? "fill-ink" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <g fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round">
        <path d="M32 52 L18 42" />
        <path d="M30 62 L14 62" />
        <path d="M32 72 L18 82" />
        <path d="M68 52 L82 42" />
        <path d="M70 62 L86 62" />
        <path d="M68 72 L82 82" />
      </g>
      <ellipse cx="50" cy="58" rx="28" ry="26" className={shell} stroke="currentColor" strokeWidth={S} />
      <line x1="50" y1="34" x2="50" y2="82" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <circle cx="40" cy="50" r="5" className={mode === "color" ? "fill-ink" : "fill-white"} stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="50" r="5" className={mode === "color" ? "fill-ink" : "fill-white"} stroke="currentColor" strokeWidth="2.5" />
      <circle cx="40" cy="68" r="4" className={mode === "color" ? "fill-ink" : "fill-white"} stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="68" r="4" className={mode === "color" ? "fill-ink" : "fill-white"} stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="28" r="12" className={head} stroke="currentColor" strokeWidth={S} />
      <path d="M42 20 Q34 10 28 8" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path d="M58 20 Q66 10 72 8" fill="none" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <circle cx="28" cy="8" r="3.5" className="fill-ink" />
      <circle cx="72" cy="8" r="3.5" className="fill-ink" />
    </svg>
  )
}

/** Chenille — segments + antennes */
export function PictoCaterpillar({ mode = "color", className, ...rest }: PictoProps) {
  const body = mode === "color" ? "fill-leaf" : "fill-white"
  const spot = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="22" cy="58" r="12" className={body} stroke="currentColor" strokeWidth={S} />
      <circle cx="40" cy="52" r="13" className={body} stroke="currentColor" strokeWidth={S} />
      <circle cx="58" cy="54" r="13" className={body} stroke="currentColor" strokeWidth={S} />
      <circle cx="76" cy="50" r="14" className={body} stroke="currentColor" strokeWidth={S} />
      <circle cx="76" cy="46" r="4" className="fill-ink" />
      <path d="M70 38 Q64 24 58 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M80 38 Q86 24 90 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="58" cy="22" r="3" className="fill-ink" />
      <circle cx="90" cy="22" r="3" className="fill-ink" />
      {mode === "color" && (
        <>
          <circle cx="40" cy="50" r="3.5" className={spot} />
          <circle cx="58" cy="52" r="3.5" className={spot} />
        </>
      )}
    </svg>
  )
}

/** Chrysalide / cocon accroché */
export function PictoChrysalis({ mode = "color", className, ...rest }: PictoProps) {
  const shell = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <line x1="50" y1="8" x2="50" y2="22" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <path
        d="M50 22 C34 28 28 48 32 68 C36 86 50 92 50 92 C50 92 64 86 68 68 C72 48 66 28 50 22 Z"
        className={shell}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <path d="M38 48 Q50 54 62 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 60 Q50 66 60 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Aile de papillon (détail) */
export function PictoWing({ mode = "color", className, ...rest }: PictoProps) {
  const wing = mode === "color" ? "fill-sky" : "fill-white"
  const spot = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M22 78 C18 40 36 12 72 18 C88 22 90 48 78 62 C66 76 40 82 22 78 Z"
        className={wing}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <path d="M28 70 Q48 48 70 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="52" cy="42" r="8" className={spot} stroke="currentColor" strokeWidth="2.5" />
      <circle cx="64" cy="54" r="5" className={mode === "color" ? "fill-sun" : "fill-white"} stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** Fleur simple (nectar) */
export function PictoBloom({ mode = "color", className, ...rest }: PictoProps) {
  const petal = mode === "color" ? "fill-berry" : "fill-white"
  const center = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <line x1="50" y1="58" x2="50" y2="92" stroke="currentColor" strokeWidth={S} strokeLinecap="round" />
      <ellipse cx="38" cy="72" rx="10" ry="6" className="fill-leaf" stroke="currentColor" strokeWidth="2.5" transform="rotate(-30 38 72)" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="50"
          cy="36"
          rx="12"
          ry="18"
          className={petal}
          stroke="currentColor"
          strokeWidth={S}
          transform={`rotate(${deg} 50 42)`}
        />
      ))}
      <circle cx="50" cy="42" r="12" className={center} stroke="currentColor" strokeWidth={S} />
    </svg>
  )
}

/** Œuf (insecte ou serpent) */
export function PictoEgg({ mode = "color", className, ...rest }: PictoProps) {
  const shell = mode === "color" ? "fill-sun" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="50" cy="54" rx="26" ry="34" className={shell} stroke="currentColor" strokeWidth={S} />
      {mode === "color" && (
        <>
          <ellipse cx="42" cy="48" rx="6" ry="4" className="fill-white/60" />
          <circle cx="58" cy="62" r="4" className="fill-tangerine/80" />
        </>
      )}
    </svg>
  )
}

/**
 * Serpent — corps rempli (coloriable) + contour épais.
 * Mode outline : fond blanc, motifs d'écailles en trait (pas de silhouette pleine).
 */
export function PictoSnake({ mode = "color", className, ...rest }: PictoProps) {
  const skin = mode === "color" ? "fill-leaf" : "fill-white"
  const scaleStroke = mode === "color" ? "stroke-sun" : "stroke-current"
  return (
    <svg viewBox="0 0 120 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      {/* Corps en ruban fermé (S) — surface coloriable */}
      <path
        d="M14 72
           C18 52 28 44 38 52
           C46 58 50 70 58 74
           C66 78 74 72 80 62
           C86 52 94 48 104 54
           L108 50
           C96 40 84 44 78 54
           C72 64 64 70 56 66
           C48 62 44 50 36 44
           C26 36 14 44 10 64
           Z"
        className={skin}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      {/* Tête */}
      <ellipse cx="104" cy="52" rx="12" ry="11" className={skin} stroke="currentColor" strokeWidth={S} />
      <circle cx="108" cy="49" r="2.8" className="fill-ink" />
      {/* Langue fourchue */}
      <path
        d="M116 54 L124 48 M116 54 L124 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Motifs d'écailles (traits) — à colorier */}
      <g fill="none" className={scaleStroke} stroke="currentColor" strokeWidth="1.75" opacity={mode === "outline" ? 0.85 : 0.7}>
        <path d="M22 62 Q26 56 30 62 Q26 68 22 62" />
        <path d="M32 56 Q36 50 40 56 Q36 62 32 56" />
        <path d="M42 64 Q46 58 50 64 Q46 70 42 64" />
        <path d="M52 70 Q56 64 60 70 Q56 76 52 70" />
        <path d="M64 66 Q68 60 72 66 Q68 72 64 66" />
        <path d="M76 58 Q80 52 84 58 Q80 64 76 58" />
        <path d="M88 54 Q92 48 96 54 Q92 60 88 54" />
      </g>
      {mode === "color" && (
        <>
          <circle cx="28" cy="60" r="2.5" className="fill-sun" />
          <circle cx="54" cy="68" r="2.5" className="fill-sun" />
          <circle cx="78" cy="60" r="2.5" className="fill-sun" />
        </>
      )}
    </svg>
  )
}

/** Écaille losange */
export function PictoScale({ mode = "color", className, ...rest }: PictoProps) {
  const fill = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <path
        d="M50 14 L82 42 L50 88 L18 42 Z"
        className={fill}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <path d="M50 28 L70 42 L50 72 L30 42 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
      {mode === "color" && <circle cx="50" cy="46" r="5" className="fill-sun" />}
    </svg>
  )
}

/** Langue fourchue */
export function PictoTongue({ mode = "color", className, ...rest }: PictoProps) {
  const tip = mode === "color" ? "fill-berry" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <ellipse cx="50" cy="28" rx="22" ry="16" className={mode === "color" ? "fill-leaf" : "fill-white"} stroke="currentColor" strokeWidth={S} />
      <path
        d="M50 40 L50 62 L38 82 M50 62 L62 82"
        fill="none"
        stroke="currentColor"
        strokeWidth={S}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="38" cy="82" r="5" className={tip} stroke="currentColor" strokeWidth="2.5" />
      <circle cx="62" cy="82" r="5" className={tip} stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

/** Désert — dune + soleil */
export function PictoDesert({ mode = "color", className, ...rest }: PictoProps) {
  const sand = mode === "color" ? "fill-sun" : "fill-white"
  const sun = mode === "color" ? "fill-tangerine" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <circle cx="72" cy="28" r="14" className={sun} stroke="currentColor" strokeWidth={S} />
      <path
        d="M8 78 Q28 48 48 68 Q64 84 92 58 L92 92 L8 92 Z"
        className={sand}
        stroke="currentColor"
        strokeWidth={S}
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Forêt — arbres simples */
export function PictoForest({ mode = "color", className, ...rest }: PictoProps) {
  const canopy = mode === "color" ? "fill-leaf" : "fill-white"
  return (
    <svg viewBox="0 0 100 100" className={cn("text-ink", className)} aria-hidden="true" {...rest}>
      <rect x="28" y="62" width="8" height="22" className={mode === "color" ? "fill-tangerine" : "fill-white"} stroke="currentColor" strokeWidth="2.5" />
      <rect x="58" y="58" width="8" height="26" className={mode === "color" ? "fill-tangerine" : "fill-white"} stroke="currentColor" strokeWidth="2.5" />
      <path d="M18 66 L32 28 L46 66 Z" className={canopy} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <path d="M48 62 L62 22 L76 62 Z" className={canopy} stroke="currentColor" strokeWidth={S} strokeLinejoin="round" />
      <ellipse cx="82" cy="78" rx="10" ry="6" className={mode === "color" ? "fill-sky" : "fill-white"} stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

export type { PictoProps }
