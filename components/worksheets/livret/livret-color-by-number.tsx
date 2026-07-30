import type { LivretThemeDef } from "@/lib/livret/livret-theme-defs"

/** Coloriage codé livret — chaque zone = un picto numéroté sur la scène */
export function LivretColorByNumber({
  pictos,
  colorLegend,
  colorZones,
}: {
  pictos: LivretThemeDef["coloringPictos"]
  colorLegend: LivretThemeDef["colorLegend"]
  colorZones: LivretThemeDef["colorZones"]
}) {
  const items = colorZones.map((zone, i) => ({
    zone: zone.zone,
    num: zone.num,
    Picto: pictos[i],
  }))

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border-[3px] border-ink bg-white px-3 py-2">
        <p className="font-display text-[10px] font-bold uppercase tracking-wide text-ink/55">Légende des couleurs</p>
        <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
          {colorLegend.map(({ num, name }) => (
            <li key={num} className="flex items-center gap-1.5 font-display text-xs font-bold">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink bg-[#fffdf7] text-[10px]">
                {num}
              </span>
              <span>= {name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border-[3px] border-ink bg-[#fffdf7] p-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map(({ zone, num, Picto }) =>
            Picto ? (
              <div key={zone} className="relative flex flex-col items-center gap-2">
                <div className="relative">
                  <Picto mode="outline" className="h-28 w-28 sm:h-32 sm:w-32" />
                  <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-ink bg-white font-display text-sm font-bold">
                    {num}
                  </span>
                </div>
                <span className="text-center font-display text-xs font-bold capitalize text-ink/70">{zone}</span>
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  )
}
