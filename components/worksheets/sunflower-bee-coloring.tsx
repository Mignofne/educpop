import { WorksheetFrame } from "./worksheet-frame"
import { PictoBee, PictoSunflower } from "./art/pictos"

/** Coloriage abeille + tournesol — activité sensorielle 2–3 */
export function SunflowerBeeColoring() {
  return (
    <WorksheetFrame
      title="L'abeille et le tournesol"
      instructions="Colorie l'abeille et le tournesol. Gros crayons, gros gestes — c'est parfait !"
      footerNote="Coloriage · 2–3 ans"
      accent="sun"
    >
      <div className="flex flex-col items-center gap-8 py-4 sm:flex-row sm:justify-center">
        <div className="flex h-48 w-48 items-center justify-center rounded-full border-[3px] border-ink bg-[#fffdf7]">
          <PictoBee mode="outline" className="h-36 w-36" />
        </div>
        <div className="flex h-48 w-48 items-center justify-center rounded-full border-[3px] border-ink bg-[#fffdf7]">
          <PictoSunflower mode="outline" className="h-36 w-36" />
        </div>
      </div>
    </WorksheetFrame>
  )
}
