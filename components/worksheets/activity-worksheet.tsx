import { type Activity, type PackAgeGroup } from "@/lib/activities"
import { PackTournesols } from "./pack-tournesols"
import { PackMoyenAge } from "./pack-moyen-age"
import {
  PackGabbyChat,
  PackOnePiece,
  PackPatPatrouille,
  PackPyjamasques,
} from "./pack-animes"
import { PackAsie } from "./pack-asie"
import { PackSaisons } from "./pack-saisons"
import { PackContinents } from "./pack-continents"
import { PackPapillon } from "./pack-papillon"
import { PackSerpent } from "./pack-serpent"
import { PackCoccinelle } from "./pack-coccinelle"
import { PackAntarctique } from "./pack-antarctique"
import { PackOcean } from "./pack-ocean"
import { PackCerise } from "./pack-cerise"
import { PackAfrique } from "./pack-afrique"
import { PackHalloween } from "./pack-halloween"
import { PackNoel } from "./pack-noel"
import { PackLivretAbeilles67 } from "./pack-livret-abeilles-6-7"
import {
  PackLivretAbeilles12,
  PackLivretCerise45,
  PackLivretCoccinelle12,
  PackLivretCoccinelle67,
  PackLivretOcean67,
  PackLivretPapillon12,
  PackLivretPapillon67,
  PackLivretSerpent67,
  PackLivretTournesols45,
} from "./pack-livrets"

const PACK_TOURNESOLS: Record<string, PackAgeGroup> = {
  "pack-tournesols": "4-5",
  "pack-tournesols-2-3": "2-3",
  "pack-tournesols-4-5": "4-5",
  "pack-tournesols-6-7": "6-7",
  "pack-tournesols-8-10": "8-10",
}

const PACK_MOYEN_AGE: Record<string, Exclude<PackAgeGroup, "2-3">> = {
  "pack-moyen-age": "4-5",
  "pack-moyen-age-4-5": "4-5",
  "pack-moyen-age-6-7": "6-7",
  "pack-moyen-age-8-10": "8-10",
}

const PACK_ASIE: Record<string, PackAgeGroup> = {
  "pack-asie": "4-5",
  "pack-asie-2-3": "2-3",
  "pack-asie-4-5": "4-5",
  "pack-asie-6-7": "6-7",
  "pack-asie-8-10": "8-10",
}

const PACK_PAPILLON: Record<string, PackAgeGroup> = {
  "pack-papillon": "4-5",
  "pack-papillon-2-3": "2-3",
  "pack-papillon-4-5": "4-5",
  "pack-papillon-6-7": "6-7",
  "pack-papillon-8-10": "8-10",
}

const PACK_SERPENT: Record<string, PackAgeGroup> = {
  "pack-serpent": "4-5",
  "pack-serpent-2-3": "2-3",
  "pack-serpent-4-5": "4-5",
  "pack-serpent-6-7": "6-7",
  "pack-serpent-8-10": "8-10",
}

const PACK_COCCINELLE: Record<string, PackAgeGroup> = {
  "pack-coccinelle": "4-5",
  "pack-coccinelle-2-3": "2-3",
  "pack-coccinelle-4-5": "4-5",
  "pack-coccinelle-6-7": "6-7",
  "pack-coccinelle-8-10": "8-10",
}

const PACK_SAISONS: Record<string, PackAgeGroup> = {
  "pack-saisons": "4-5",
  "pack-saisons-2-3": "2-3",
  "pack-saisons-4-5": "4-5",
  "pack-saisons-6-7": "6-7",
  "pack-saisons-8-10": "8-10",
}

const PACK_CONTINENTS: Record<string, Exclude<PackAgeGroup, "2-3">> = {
  "pack-continents": "4-5",
  "pack-continents-4-5": "4-5",
  "pack-continents-6-7": "6-7",
  "pack-continents-8-10": "8-10",
}

const PACK_ANTARCTIQUE: Record<string, PackAgeGroup> = {
  "pack-antarctique": "4-5",
  "pack-antarctique-2-3": "2-3",
  "pack-antarctique-4-5": "4-5",
  "pack-antarctique-6-7": "6-7",
  "pack-antarctique-8-10": "8-10",
}

const PACK_OCEAN: Record<string, PackAgeGroup> = {
  "pack-ocean": "4-5",
  "pack-ocean-2-3": "2-3",
  "pack-ocean-4-5": "4-5",
  "pack-ocean-6-7": "6-7",
  "pack-ocean-8-10": "8-10",
}

const PACK_CERISE: Record<string, PackAgeGroup> = {
  "pack-cerise": "4-5",
  "pack-cerise-2-3": "2-3",
  "pack-cerise-4-5": "4-5",
  "pack-cerise-6-7": "6-7",
  "pack-cerise-8-10": "8-10",
}

const PACK_AFRIQUE: Record<string, Exclude<PackAgeGroup, "2-3">> = {
  "pack-afrique": "4-5",
  "pack-afrique-4-5": "4-5",
  "pack-afrique-6-7": "6-7",
  "pack-afrique-8-10": "8-10",
}

const PACK_HALLOWEEN: Record<string, PackAgeGroup> = {
  "pack-halloween": "4-5",
  "pack-halloween-2-3": "2-3",
  "pack-halloween-4-5": "4-5",
  "pack-halloween-6-7": "6-7",
  "pack-halloween-8-10": "8-10",
}

const PACK_NOEL: Record<string, PackAgeGroup> = {
  "pack-noel": "4-5",
  "pack-noel-2-3": "2-3",
  "pack-noel-4-5": "4-5",
  "pack-noel-6-7": "6-7",
  "pack-noel-8-10": "8-10",
}

const PACK_ONE_PIECE: Record<string, "6-7" | "8-10"> = {
  "pack-one-piece": "6-7",
  "pack-one-piece-6-7": "6-7",
  "pack-one-piece-8-10": "8-10",
}

const PACK_ANIME_AGES: Record<string, Exclude<PackAgeGroup, "2-3">> = {
  "pack-pat-patrouille": "4-5",
  "pack-pat-patrouille-4-5": "4-5",
  "pack-pat-patrouille-6-7": "6-7",
  "pack-pat-patrouille-8-10": "8-10",
  "pack-pyjamasques": "4-5",
  "pack-pyjamasques-4-5": "4-5",
  "pack-pyjamasques-6-7": "6-7",
  "pack-pyjamasques-8-10": "8-10",
  "pack-gabby-chat": "4-5",
  "pack-gabby-chat-4-5": "4-5",
  "pack-gabby-chat-6-7": "6-7",
  "pack-gabby-chat-8-10": "8-10",
}

/** Catalogue = packs uniquement (5–8 activités hors couverture). */
export function ActivityWorksheet({ activity }: { activity: Activity }) {
  if (activity.type !== "pack") return null

  const tournesolAge = PACK_TOURNESOLS[activity.slug]
  if (tournesolAge) return <PackTournesols age={tournesolAge} />

  const papillonAge = PACK_PAPILLON[activity.slug]
  if (papillonAge) return <PackPapillon age={papillonAge} />

  const serpentAge = PACK_SERPENT[activity.slug]
  if (serpentAge) return <PackSerpent age={serpentAge} />

  const coccinelleAge = PACK_COCCINELLE[activity.slug]
  if (coccinelleAge) return <PackCoccinelle age={coccinelleAge} />

  const saisonsAge = PACK_SAISONS[activity.slug]
  if (saisonsAge) return <PackSaisons age={saisonsAge} />

  const continentsAge = PACK_CONTINENTS[activity.slug]
  if (continentsAge) return <PackContinents age={continentsAge} />

  const moyenAge = PACK_MOYEN_AGE[activity.slug]
  if (moyenAge) return <PackMoyenAge age={moyenAge} />

  const asieAge = PACK_ASIE[activity.slug]
  if (asieAge) return <PackAsie age={asieAge} />

  const antarctiqueAge = PACK_ANTARCTIQUE[activity.slug]
  if (antarctiqueAge) return <PackAntarctique age={antarctiqueAge} />

  const oceanAge = PACK_OCEAN[activity.slug]
  if (oceanAge) return <PackOcean age={oceanAge} />

  const ceriseAge = PACK_CERISE[activity.slug]
  if (ceriseAge) return <PackCerise age={ceriseAge} />

  const afriqueAge = PACK_AFRIQUE[activity.slug]
  if (afriqueAge) return <PackAfrique age={afriqueAge} />

  const halloweenAge = PACK_HALLOWEEN[activity.slug]
  if (halloweenAge) return <PackHalloween age={halloweenAge} />

  const noelAge = PACK_NOEL[activity.slug]
  if (noelAge) return <PackNoel age={noelAge} />

  if (activity.slug === "pack-livret-abeilles-1-2") return <PackLivretAbeilles12 />
  if (activity.slug === "pack-livret-abeilles-6-7") return <PackLivretAbeilles67 />
  if (activity.slug === "pack-livret-papillon-1-2") return <PackLivretPapillon12 />
  if (activity.slug === "pack-livret-papillon-6-7") return <PackLivretPapillon67 />
  if (activity.slug === "pack-livret-coccinelle-1-2") return <PackLivretCoccinelle12 />
  if (activity.slug === "pack-livret-coccinelle-6-7") return <PackLivretCoccinelle67 />
  if (activity.slug === "pack-livret-serpent-6-7") return <PackLivretSerpent67 />
  if (activity.slug === "pack-livret-tournesols-4-5") return <PackLivretTournesols45 />
  if (activity.slug === "pack-livret-ocean-6-7") return <PackLivretOcean67 />
  if (activity.slug === "pack-livret-cerise-4-5") return <PackLivretCerise45 />

  const onePieceAge = PACK_ONE_PIECE[activity.slug]
  if (onePieceAge) return <PackOnePiece age={onePieceAge} />

  if (activity.slug.startsWith("pack-pat-patrouille")) {
    const age = PACK_ANIME_AGES[activity.slug]
    if (age) return <PackPatPatrouille age={age} />
  }
  if (activity.slug.startsWith("pack-pyjamasques")) {
    const age = PACK_ANIME_AGES[activity.slug]
    if (age) return <PackPyjamasques age={age} />
  }
  if (activity.slug.startsWith("pack-gabby-chat")) {
    const age = PACK_ANIME_AGES[activity.slug]
    if (age) return <PackGabbyChat age={age} />
  }

  return null
}
