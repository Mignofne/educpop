import { WorksheetFrame } from "./worksheet-frame"
import { PictoCastle } from "./art/pictos-moyen-age"

/** Coloriage château — 4–5 / sensoriel */
export function MoyenAgeColoring() {
  return (
    <WorksheetFrame
      title="Je colorie le château"
      instructions="Colorie le château, les tours et la porte. Dis à voix haute ce que tu vois : les tours, la porte, les créneaux…"
      footerNote="Coloriage · Moyen Âge"
      accent="sky"
    >
      <div className="mx-auto max-w-md rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
        <svg viewBox="0 0 280 260" className="h-auto w-full text-ink" aria-hidden="true">
          {/* Colline */}
          <ellipse cx="140" cy="230" rx="120" ry="24" fill="white" stroke="currentColor" strokeWidth="3" />
          {/* Tours */}
          <rect x="40" y="100" width="50" height="120" fill="white" stroke="currentColor" strokeWidth="3.5" />
          <rect x="190" y="100" width="50" height="120" fill="white" stroke="currentColor" strokeWidth="3.5" />
          <rect x="90" y="80" width="100" height="140" fill="white" stroke="currentColor" strokeWidth="3.5" />
          {/* Créneaux */}
          {[40, 58, 76].map((x) => (
            <rect key={x} x={x} y="82" width="14" height="20" fill="white" stroke="currentColor" strokeWidth="2.5" />
          ))}
          {[190, 208, 226].map((x) => (
            <rect key={x} x={x} y="82" width="14" height="20" fill="white" stroke="currentColor" strokeWidth="2.5" />
          ))}
          {[100, 124, 148, 172].map((x) => (
            <rect key={x} x={x} y="58" width="16" height="24" fill="white" stroke="currentColor" strokeWidth="2.5" />
          ))}
          {/* Toits */}
          <path d="M35 82 L65 48 L95 82 Z" fill="white" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M185 82 L215 48 L245 82 Z" fill="white" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
          {/* Porte */}
          <path d="M118 220 V160 Q140 130 162 160 V220" fill="white" stroke="currentColor" strokeWidth="3.5" />
          {/* Fenêtres */}
          <rect x="110" y="110" width="18" height="24" fill="white" stroke="currentColor" strokeWidth="2.5" />
          <rect x="152" y="110" width="18" height="24" fill="white" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="65" cy="140" r="10" fill="white" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="215" cy="140" r="10" fill="white" stroke="currentColor" strokeWidth="2.5" />
          {/* Drapeau */}
          <line x1="140" y1="58" x2="140" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M140 28 L175 38 L140 48 Z" fill="white" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
        <div className="mt-2 flex justify-center">
          <PictoCastle mode="outline" className="h-10 w-10 opacity-40" />
        </div>
      </div>
    </WorksheetFrame>
  )
}
