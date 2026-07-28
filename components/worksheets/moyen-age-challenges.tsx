import { WorksheetFrame } from "./worksheet-frame"
import { PictoCastle, PictoCrown, PictoDragon, PictoKnight } from "./art/pictos-moyen-age"

const TRUE_FALSE = [
  { q: "Au Moyen Âge, les châteaux servaient aussi à se protéger.", a: true },
  { q: "Un blason est une chanson du Moyen Âge.", a: false },
  { q: "Les chevaliers portaient souvent une armure.", a: true },
  { q: "Les dragons ont vraiment existé comme animaux de ferme.", a: false },
  { q: "Une couronne est un symbole de royauté.", a: true },
]

const ORDER = [
  { n: 1, title: "Le village", hint: "On cultive, on élève les animaux." },
  { n: 2, title: "Le château", hint: "Le seigneur y vit, on s'y réfugie." },
  { n: 3, title: "Le tournoi", hint: "Les chevaliers s'entraînent / s'affrontent." },
  { n: 4, title: "La fête", hint: "Musique, repas, danses au château." },
]

/** Défis 6–7 / 8–10 */
export function MoyenAgeChallenges({ age = "6-7" }: { age?: "6-7" | "8-10" }) {
  const shuffled = [ORDER[2], ORDER[0], ORDER[3], ORDER[1]]

  return (
    <WorksheetFrame
      title={age === "8-10" ? "Défis Moyen Âge" : "Remets l'histoire en ordre"}
      instructions={
        age === "8-10"
          ? "Numérote les scènes (1→4), puis réponds vrai ou faux. Discute avec un adulte."
          : "Les cartes sont mélangées ! Numérote-les de 1 à 4 pour raconter une journée au Moyen Âge."
      }
      footerNote={`Histoire · Moyen Âge · ${age} ans`}
      accent="berry"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {shuffled.map(({ title, hint }) => (
          <div key={title} className="rounded-2xl border-[3px] border-dashed border-ink bg-[#fffdf7] p-3">
            <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-dashed border-ink bg-white font-display font-bold text-ink/35">
              ?
            </span>
            <p className="font-display text-base font-bold">{title}</p>
            <p className="text-xs font-medium text-ink/55">{hint}</p>
          </div>
        ))}
      </div>

      {age === "8-10" ? (
        <div className="mt-6">
          <h3 className="font-display text-sm font-bold">Vrai ou faux ?</h3>
          <div className="mt-3 space-y-2">
            {TRUE_FALSE.map((item) => (
              <div
                key={item.q}
                className="flex items-start justify-between gap-3 rounded-xl border-[3px] border-ink bg-white px-3 py-2"
              >
                <p className="text-sm font-medium leading-snug">{item.q}</p>
                <div className="flex shrink-0 gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-ink font-display text-sm font-bold">
                    V
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-ink font-display text-sm font-bold">
                    F
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-4 opacity-40">
            <PictoKnight mode="outline" className="h-10 w-10" />
            <PictoCastle mode="outline" className="h-10 w-10" />
            <PictoDragon mode="outline" className="h-10 w-10" />
            <PictoCrown mode="outline" className="h-10 w-10" />
          </div>
        </div>
      ) : (
        <p className="mt-5 rounded-xl border-[3px] border-ink bg-sun/30 p-3 text-center text-sm font-semibold">
          Ordre : village → château → tournoi → fête
        </p>
      )}
    </WorksheetFrame>
  )
}
