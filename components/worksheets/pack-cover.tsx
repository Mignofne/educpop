import type { ComponentType, SVGProps } from "react"
import { WorksheetFrame } from "./worksheet-frame"
import { PictoSunflower, ArtDotsRow, type ArtMode } from "./art/pictos"

type HeroProps = SVGProps<SVGSVGElement> & { mode?: ArtMode; className?: string }

/** Couverture de pack — standard Tullet */
export function PackCover({
  title,
  subtitle,
  ages,
  themeLine,
  contents,
  accent = "sun",
  Hero = PictoSunflower,
}: {
  title: string
  subtitle: string
  ages: string
  themeLine: string
  contents: string[]
  accent?: "sun" | "berry" | "sky" | "leaf" | "tangerine"
  Hero?: ComponentType<HeroProps>
}) {
  const heroBg = {
    sun: "bg-sun",
    berry: "bg-berry",
    sky: "bg-sky",
    leaf: "bg-leaf",
    tangerine: "bg-tangerine",
  }[accent]

  return (
    <WorksheetFrame
      title={title}
      instructions="Un pack d'activités à faire ensemble. Imprimez toutes les pages, sortez crayons et ciseaux — et amusez-vous !"
      footerNote="Pack gratuit educpop"
      accent={accent}
    >
      <div className="flex flex-col items-center gap-6 py-4 text-center">
        <div
          className={`flex h-44 w-44 items-center justify-center rounded-full border-[3px] border-ink ${heroBg} shadow-[4px_4px_0_0_var(--ink)]`}
        >
          <Hero mode="color" className="h-32 w-32" />
        </div>
        <ArtDotsRow />
        <div>
          <p className="font-display text-xl font-bold text-ink">{subtitle}</p>
          <p className="mt-2 text-base font-medium text-ink/65">{themeLine}</p>
          <p className="mt-4 inline-flex rounded-full border-[3px] border-ink bg-leaf px-5 py-1.5 font-display text-sm font-bold shadow-[2px_2px_0_0_var(--ink)]">
            {ages}
          </p>
        </div>
        <ol className="w-full max-w-md space-y-2.5 rounded-[1.5rem] border-[3px] border-ink bg-[#fffdf7] p-5 text-left font-display text-base font-bold text-ink">
          {contents.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </div>
    </WorksheetFrame>
  )
}
