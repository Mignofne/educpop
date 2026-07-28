import { WorksheetFrame } from "./worksheet-frame"
import { PictoSeed, PictoSunflower, PictoSprout } from "./art/pictos"

const STEPS = [
  {
    n: 1,
    title: "La graine",
    hint: "On la plante dans la terre.",
    Picto: PictoSeed,
  },
  {
    n: 2,
    title: "La pousse",
    hint: "Une tige et deux petites feuilles sortent.",
    Picto: PictoSprout,
  },
  {
    n: 3,
    title: "Le tournesol",
    hint: "La fleur s'ouvre et suit le soleil.",
    Picto: PictoSunflower,
  },
  {
    n: 4,
    title: "De nouvelles graines",
    hint: "Dans le cœur, de nouvelles graines mûrissent.",
    Picto: PictoSeed,
  },
]

/** Cycle de vie — pack 6–7 / 8–10 (absent en 4–5) */
export function SunflowerLifecycle({
  age = "6-7",
}: {
  age?: "6-7" | "8-10"
}) {
  // Mélanger l'affichage pour que l'enfant doive remettre en ordre
  const shuffled = [STEPS[2], STEPS[0], STEPS[3], STEPS[1]]

  return (
    <WorksheetFrame
      title={age === "8-10" ? "Le cycle de vie du tournesol" : "Du grain au tournesol"}
      instructions={
        age === "8-10"
          ? "Numérote les étapes dans l'ordre (1 → 4), relie-les par des flèches, puis écris une phrase qui raconte le cycle."
          : "Les cartes sont dans le désordre ! Numérote-les de 1 à 4, puis colorie. (Aide en bas de page.)"
      }
      footerNote={`Cycle de vie · ${age} ans`}
      accent="leaf"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {shuffled.map(({ title, hint, Picto }) => (
          <div
            key={title}
            className="rounded-2xl border-[3px] border-dashed border-ink bg-[#fffdf7] p-3"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-dashed border-ink bg-white font-display text-base font-bold text-ink/35">
                ?
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wide text-ink/40">
                Écris le n° ici
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-ink bg-white">
                <Picto mode="color" className="h-12 w-12" />
              </div>
              <div>
                <p className="font-display text-base font-bold">{title}</p>
                <p className="text-xs font-medium text-ink/60">{hint}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {age === "8-10" ? (
        <div className="mt-5">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-ink/45">
            Je raconte le cycle
          </p>
          <div className="h-10 border-b-[3px] border-ink" />
          <div className="mt-3 h-10 border-b-[3px] border-ink" />
        </div>
      ) : (
        <p className="mt-5 rounded-xl border-[3px] border-ink bg-sun/30 p-3 text-center text-sm font-semibold">
          Ordre : 1 graine → 2 pousse → 3 tournesol → 4 nouvelles graines
        </p>
      )}
    </WorksheetFrame>
  )
}
