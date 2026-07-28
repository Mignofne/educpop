import { cn } from "@/lib/utils"

const COLOR_MAP = {
  berry: "text-berry",
  sun: "text-sun",
  sky: "text-sky",
  leaf: "text-leaf",
  tangerine: "text-tangerine",
} as const

type DecorColor = keyof typeof COLOR_MAP

/** A hand-painted style blob (Hervé Tullet inspired) */
export function Blob({
  color = "berry",
  className,
}: {
  color?: DecorColor
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={cn(COLOR_MAP[color], className)}
    >
      <path
        fill="currentColor"
        d="M43.8,-63.6C56.3,-55.3,65.6,-42.4,70.9,-28.1C76.1,-13.8,77.3,1.9,72.7,15.4C68.1,28.9,57.7,40.2,45.7,49.9C33.6,59.6,19.9,67.7,4.6,71.4C-10.7,75.1,-27.6,74.4,-40.7,66.7C-53.8,59,-63.1,44.3,-68.6,28.6C-74.1,12.9,-75.8,-3.8,-71.4,-18.6C-67,-33.4,-56.5,-46.3,-43.7,-54.6C-30.9,-62.9,-15.5,-66.6,0.3,-67C16,-67.4,31.3,-71.9,43.8,-63.6Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

/** A cluster of painted dots */
export function Dots({
  color = "sun",
  className,
}: {
  color?: DecorColor
  className?: string
}) {
  return (
    <svg viewBox="0 0 120 40" aria-hidden="true" className={cn(COLOR_MAP[color], className)}>
      <circle cx="20" cy="20" r="14" fill="currentColor" />
      <circle cx="60" cy="20" r="10" fill="currentColor" opacity="0.75" />
      <circle cx="96" cy="20" r="16" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

/** A loose painted squiggle underline */
export function Squiggle({
  color = "sky",
  className,
}: {
  color?: DecorColor
  className?: string
}) {
  return (
    <svg viewBox="0 0 240 24" fill="none" aria-hidden="true" className={cn(COLOR_MAP[color], className)}>
      <path
        d="M4 14C24 4 44 4 64 14S104 24 124 14 164 4 184 14s40 10 52 2"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  )
}
