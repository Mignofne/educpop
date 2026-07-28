import { WorksheetFrame } from "./worksheet-frame"

const FACTS_YOUNG = [
  "En France, une année a quatre saisons.",
  "Au printemps, beaucoup de fleurs s'ouvrent.",
  "En été, le soleil chauffe fort.",
  "En automne, des feuilles changent de couleur.",
]

const FACTS_OLDER = [
  {
    title: "Le cycle",
    text: "Les saisons se suivent toujours dans le même ordre : printemps → été → automne → hiver.",
  },
  {
    title: "La lumière",
    text: "En été, les journées sont plus longues ; en hiver, elles sont plus courtes.",
  },
  {
    title: "Les arbres",
    text: "Beaucoup d'arbres perdent leurs feuilles en automne — ce ne sont pas tous les arbres.",
  },
  {
    title: "Observer",
    text: "La température, la lumière et les plantes changent — on peut le voir dehors, près de chez soi.",
  },
]

/** « Le savais-tu ? » — faits doux sur le cycle des saisons */
export function SeasonsDidYouKnow({ age = "6-7" }: { age?: "4-5" | "6-7" | "8-10" }) {
  const older = age === "8-10" || age === "6-7"

  return (
    <WorksheetFrame
      title="Le savais-tu ? — les saisons"
      instructions={
        older
          ? "Lis chaque encart. Entoure ce que tu as déjà observé dehors, puis discute-en ensemble."
          : "Lis avec un adulte. Colorie l'encart que tu préfères, puis raconte ce que tu as vu dehors."
      }
      footerNote={`Sciences douces · Saisons · ${age === "4-5" ? "4–5" : age === "6-7" ? "6–7" : "8–10"} ans`}
      accent="sky"
    >
      {older ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {FACTS_OLDER.map((f) => (
            <div key={f.title} className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
              <p className="font-display text-sm font-bold text-sky">{f.title}</p>
              <p className="mt-2 text-sm leading-snug">{f.text}</p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full border-2 border-ink bg-white px-3 py-1 text-xs font-bold">
                  vu
                </span>
                <span className="rounded-full border-2 border-dashed border-ink/50 bg-white px-3 py-1 text-xs font-bold text-ink/50">
                  pas encore
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {FACTS_YOUNG.map((text) => (
            <div key={text} className="rounded-2xl border-[3px] border-dashed border-ink bg-[#fffdf7] p-4">
              <p className="font-display text-sm font-bold leading-snug">{text}</p>
              <div className="mt-3 h-12 rounded-lg border-2 border-dashed border-ink/30" aria-hidden="true" />
            </div>
          ))}
        </div>
      )}
    </WorksheetFrame>
  )
}
