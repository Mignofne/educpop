import { WorksheetFrame } from "../worksheet-frame"

export function LivretClosing({
  theme,
  resources,
}: {
  theme: string
  resources: { label: string; url?: string }[]
}) {
  return (
    <>
      <WorksheetFrame
        title="Mon diplôme"
        instructions="Colorie la couronne. Tu as exploré le thème — bravo !"
        footerNote="Livret · diplôme"
        accent="sun"
      >
        <div className="flex flex-col items-center gap-6 py-4 text-center">
          <svg viewBox="0 0 200 120" className="h-28 w-full max-w-xs text-ink" aria-hidden="true">
            <path
              d="M40 90 L60 40 L80 70 L100 30 L120 70 L140 40 L160 90 Z"
              fill="white"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <circle cx="100" cy="55" r="14" fill="white" stroke="currentColor" strokeWidth="3" />
          </svg>
          <p className="font-display text-xl font-bold">Diplôme du thème « {theme} »</p>
          <p className="text-sm text-ink/70">Décerné à</p>
          <div className="h-10 w-64 border-b-[3px] border-ink" />
          <p className="text-xs text-ink/55">Date&nbsp;: ____________</p>
        </div>
      </WorksheetFrame>

      <WorksheetFrame
        title="Ce que j'ai appris"
        instructions="Dessine ou écris 3 idées que tu retiens de ce livret."
        footerNote="Livret · bilan"
        accent="sky"
      >
        <div className="space-y-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-2xl border-[3px] border-dashed border-ink p-4">
              <p className="font-display text-sm font-bold">{n}.</p>
              <div className="mt-2 h-16 border-b-[3px] border-ink/40" />
            </div>
          ))}
        </div>
      </WorksheetFrame>

      <WorksheetFrame
        title="Mon dessin libre"
        instructions="Invente une scène autour du thème. Pas de consigne — juste ton imagination."
        footerNote="Livret · création"
        accent="berry"
      >
        <div className="min-h-[320px] rounded-2xl border-[3px] border-dashed border-ink/50 bg-white" />
      </WorksheetFrame>

      <WorksheetFrame
        title="Ressources parents"
        instructions="Pour aller plus loin, en toute confiance."
        footerNote="Livret · ressources"
        accent="leaf"
      >
        <ul className="space-y-3 text-sm">
          {resources.map((r) => (
            <li key={r.label} className="rounded-xl border-[3px] border-ink bg-[#fffdf7] px-4 py-3 font-semibold">
              {r.label}
              {r.url ? (
                <span className="mt-1 block text-xs font-normal text-ink/55">{r.url}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </WorksheetFrame>
    </>
  )
}
