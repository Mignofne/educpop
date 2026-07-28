import { WorksheetFrame } from "../worksheet-frame"
import { PictoBee, ArtDotsRow } from "../art/pictos"

/** Couverture livret — illustration N&B (outline) + sommaire + prénom */
export function LivretCover({
  title,
  theme,
  ages,
  subtitle,
  contents,
  accent = "sun",
}: {
  title: string
  theme: string
  ages: string
  subtitle: string
  contents: string[]
  accent?: "sun" | "berry" | "sky" | "leaf" | "tangerine"
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
      instructions="Un livret à imprimer et à vivre ensemble — crayons, ciseaux, colle."
      footerNote="Livret educpop"
      accent={accent}
    >
      <div className="flex flex-col items-center gap-5 py-4 text-center">
        <div
          className={`flex h-44 w-44 items-center justify-center rounded-full border-[3px] border-ink ${heroBg} shadow-[4px_4px_0_0_var(--ink)]`}
        >
          <PictoBee mode="outline" className="h-32 w-32" />
        </div>
        <ArtDotsRow />
        <div>
          <p className="font-display text-base font-bold text-ink/70">Thème&nbsp;: {theme}</p>
          <p className="mt-2 font-display text-xl font-bold">{subtitle}</p>
          <p className="mt-3 inline-flex rounded-full border-[3px] border-ink bg-leaf px-5 py-1.5 font-display text-sm font-bold shadow-[2px_2px_0_0_var(--ink)]">
            {ages}
          </p>
        </div>

        <ol className="w-full max-w-md space-y-2 rounded-[1.5rem] border-[3px] border-ink bg-[#fffdf7] p-5 text-left font-display text-sm font-bold text-ink">
          {contents.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>

        <div className="w-full max-w-sm rounded-2xl border-[3px] border-ink bg-white p-4 text-left">
          <p className="font-display text-sm font-bold">Mon prénom</p>
          <div className="mt-2 h-10 border-b-[3px] border-ink" />
        </div>
      </div>
    </WorksheetFrame>
  )
}
