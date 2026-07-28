import { WorksheetFrame } from "./worksheet-frame"

/** Blason à colorier / compléter — Moyen Âge */
export function MoyenAgeBlason({ age = "4-5" }: { age?: "4-5" | "6-7" | "8-10" }) {
  return (
    <WorksheetFrame
      title={age === "4-5" ? "Je colorie mon blason" : "Le blason du château"}
      instructions={
        age === "4-5"
          ? "Colorie le blason. Tu peux inventer tes couleurs !"
          : age === "6-7"
            ? "Colorie la moitié gauche. Dessine la même chose à droite (miroir), puis colorie."
            : "Complète le blason en miroir, invente un symbole au centre, et écris le nom de ta famille imaginaire en bas."
      }
      footerNote={`Blason · Moyen Âge · ${age} ans`}
      accent="berry"
    >
      <div className="mx-auto max-w-sm">
        <svg viewBox="0 0 240 280" className="h-auto w-full text-ink" aria-hidden="true">
          {/* Forme blason */}
          <path
            d="M120 20 L200 40 V120 Q200 200 120 250 Q40 200 40 120 V40 Z"
            fill="white"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Ligne miroir pour 6+ */}
          {age !== "4-5" ? (
            <line
              x1="120"
              y1="28"
              x2="120"
              y2="240"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="6 5"
              opacity="0.45"
            />
          ) : null}
          {/* Croix modèle à gauche (ou plein pour 4-5) */}
          {age === "4-5" ? (
            <>
              <rect x="108" y="70" width="24" height="120" fill="white" stroke="currentColor" strokeWidth="3" />
              <rect x="70" y="110" width="100" height="24" fill="white" stroke="currentColor" strokeWidth="3" />
            </>
          ) : (
            <>
              <rect x="70" y="70" width="18" height="100" fill="white" stroke="currentColor" strokeWidth="3" />
              <rect x="55" y="110" width="50" height="18" fill="white" stroke="currentColor" strokeWidth="3" />
              {/* Guide pâle à droite */}
              <rect
                x="152"
                y="70"
                width="18"
                height="100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.25"
              />
              <rect
                x="135"
                y="110"
                width="50"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.25"
              />
            </>
          )}
        </svg>
        {age === "8-10" ? (
          <div className="mt-3">
            <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-wide text-ink/45">
              Nom de la maison
            </p>
            <div className="h-10 border-b-[3px] border-ink" />
          </div>
        ) : null}
      </div>
    </WorksheetFrame>
  )
}
