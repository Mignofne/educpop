import { Blob, Dots } from "@/components/decor"

/** Decorative pop collage for the homepage hero (no external image required). */
export function HeroCollage() {
  return (
    <div
      className="relative aspect-square overflow-hidden rounded-[2rem] border-4 border-ink bg-card shadow-[8px_8px_0_0_var(--ink)]"
      aria-hidden="true"
    >
      <Blob color="sky" className="absolute -left-10 -top-8 h-48 w-48 opacity-70" />
      <Blob color="sun" className="absolute -bottom-12 -right-8 h-56 w-56 opacity-80" />
      <Blob color="berry" className="absolute right-8 top-10 h-28 w-28 opacity-60" />
      <Blob color="leaf" className="absolute bottom-16 left-6 h-24 w-24 opacity-70" />

      <div className="absolute left-[12%] top-[18%] flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-ink bg-sun font-display text-2xl font-bold text-ink shadow-[4px_4px_0_0_var(--ink)] rotate-[-8deg]">
        🌻
      </div>
      <div className="absolute right-[14%] top-[28%] flex h-24 w-24 items-center justify-center rounded-full border-4 border-ink bg-berry font-display text-2xl font-bold text-primary-foreground shadow-[4px_4px_0_0_var(--ink)] rotate-[10deg]">
        🐞
      </div>
      <div className="absolute bottom-[18%] left-[22%] flex h-24 w-32 items-center justify-center rounded-3xl border-4 border-ink bg-sky font-display text-xl font-bold text-ink shadow-[4px_4px_0_0_var(--ink)] rotate-[-4deg]">
        🐼
      </div>
      <div className="absolute bottom-[22%] right-[12%] flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-ink bg-tangerine font-display text-xl font-bold text-ink shadow-[4px_4px_0_0_var(--ink)] rotate-[6deg]">
        🌍
      </div>

      <Dots color="berry" className="absolute bottom-6 left-6 h-10 w-28" />
      <Dots color="sky" className="absolute right-8 top-6 h-8 w-24" />
    </div>
  )
}
