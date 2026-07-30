import { LIVRET_THEME_DEFS } from "@/lib/livret/livret-theme-defs"
import { PackLivretToddler } from "./livret/kits/livret-toddler-pack"
import { PackLivret45 } from "./livret/kits/livret-45-pack"
import { PackLivret67 } from "./livret/kits/livret-67-pack"

// —— 1–2 ans ——

export const LIVRET_ABEILLES_1_2_META = {
  subtitle: "Livret — 6 pages",
  contents: [
    "1. Cartes à nommer",
    "2. Je colorie",
    "3. La bonne couleur",
    "4. Bzzz !",
    "5. Jaune ou noir ?",
    "6. Pareil ou pas ?",
  ],
  activityCount: 6,
}

export function PackLivretAbeilles12() {
  return <PackLivretToddler config={LIVRET_THEME_DEFS.abeilles} />
}

export const LIVRET_PAPILLON_1_2_META = {
  subtitle: "Livret — 6 pages",
  contents: [
    "1. Cartes à nommer",
    "2. Je colorie",
    "3. La bonne couleur",
    "4. Silence !",
    "5. Deux couleurs",
    "6. Pareil ou pas ?",
  ],
  activityCount: 6,
}

export function PackLivretPapillon12() {
  return <PackLivretToddler config={LIVRET_THEME_DEFS.papillon} />
}

export const LIVRET_COCCINELLE_1_2_META = {
  subtitle: "Livret — 6 pages",
  contents: [
    "1. Cartes à nommer",
    "2. Je colorie",
    "3. La bonne couleur",
    "4. Silence !",
    "5. Deux couleurs",
    "6. Pareil ou pas ?",
  ],
  activityCount: 6,
}

export function PackLivretCoccinelle12() {
  return <PackLivretToddler config={LIVRET_THEME_DEFS.coccinelle} />
}

// —— 4–5 ans ——

export const LIVRET_TOURNESOLS_4_5_META = {
  subtitle: "Livret — 7 pages",
  contents: [
    "1. Cartes de nomenclature",
    "2. Coloriage codé",
    "3. À quoi ça sert ?",
    "4. Dans quel ordre ?",
    "5. Je cherche",
    "6. Vivant ou pas ?",
    "7. Mes chemins",
  ],
  activityCount: 7,
}

export function PackLivretTournesols45() {
  return <PackLivret45 config={LIVRET_THEME_DEFS.tournesols} />
}

export const LIVRET_CERISE_4_5_META = {
  subtitle: "Livret — 7 pages",
  contents: [
    "1. Cartes de nomenclature",
    "2. Coloriage codé",
    "3. À quoi ça sert ?",
    "4. Dans quel ordre ?",
    "5. Je cherche",
    "6. Vivant ou pas ?",
    "7. Mes chemins",
  ],
  activityCount: 7,
}

export function PackLivretCerise45() {
  return <PackLivret45 config={LIVRET_THEME_DEFS.cerise} />
}

// —— 6–7 ans (kits) ——

export const LIVRET_PAPILLON_6_7_META = {
  subtitle: "Livret — 8 pages",
  contents: [
    "1. Coloriage codé",
    "2. Cartes de nomenclature",
    "3. Légende l'image",
    "4. Vivant ou pas ?",
    "5. Dans quel ordre ?",
    "6. Mes chemins",
    "7. Vrai ou faux",
    "8. Mots croisés",
  ],
  activityCount: 8,
}

export function PackLivretPapillon67() {
  return <PackLivret67 config={LIVRET_THEME_DEFS.papillon} />
}

export const LIVRET_COCCINELLE_6_7_META = {
  subtitle: "Livret — 8 pages",
  contents: [
    "1. Coloriage codé",
    "2. Cartes de nomenclature",
    "3. Légende l'image",
    "4. Vivant ou pas ?",
    "5. Dans quel ordre ?",
    "6. Mes chemins",
    "7. Vrai ou faux",
    "8. Mots croisés",
  ],
  activityCount: 8,
}

export function PackLivretCoccinelle67() {
  return <PackLivret67 config={LIVRET_THEME_DEFS.coccinelle} />
}

export const LIVRET_SERPENT_6_7_META = {
  subtitle: "Livret — 8 pages",
  contents: [
    "1. Coloriage codé",
    "2. Cartes de nomenclature",
    "3. Légende l'image",
    "4. Vivant ou pas ?",
    "5. Dans quel ordre ?",
    "6. Mes chemins",
    "7. Vrai ou faux",
    "8. Mots croisés",
  ],
  activityCount: 8,
}

export function PackLivretSerpent67() {
  return <PackLivret67 config={LIVRET_THEME_DEFS.serpent} />
}

export const LIVRET_OCEAN_6_7_META = {
  subtitle: "Livret — 8 pages",
  contents: [
    "1. Coloriage codé",
    "2. Cartes de nomenclature",
    "3. Légende l'image",
    "4. Vivant ou pas ?",
    "5. Dans quel ordre ?",
    "6. Mes chemins",
    "7. Vrai ou faux",
    "8. Mots croisés",
  ],
  activityCount: 8,
}

export function PackLivretOcean67() {
  return <PackLivret67 config={LIVRET_THEME_DEFS.ocean} />
}
