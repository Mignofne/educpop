/**
 * Données syllabes validables — source de vérité pour les fiches mots à trous.
 * Ne jamais hardcoder une banque séparée : elle se dérive de `missing`.
 *
 * Règles (scripts/validate-worksheet-content.mjs) :
 * - parts.join("") === word (sans tirets) OU wordWithHyphens cohérent
 * - chaque index missing est valide
 * - parts et word en MAJUSCULES
 * - bank = multiset exact des syllabes manquantes (+ distractors optionnels listés)
 * - illustration = photo réelle (Wikimedia / public/nomenclature/), pas de picto
 */

export type SyllableItem = {
  /** Mot cible complet (MAJUSCULES, tirets OK pour lecture) */
  word: string
  /** Découpage syllabique affiché */
  parts: string[]
  /** Indices des trous (dans parts) */
  missing: number[]
  /** Photo libre de droit (même standard que nomenclature) */
  src: string
  alt: string
}

/** Fiche bibliothèque « Complète les mots — syllabes » */
export const SYLLABLES_LIBRARY: SyllableItem[] = [
  {
    word: "GRENOUILLE",
    parts: ["GRE", "NOU", "ILLE"],
    missing: [1],
    src: "/nomenclature/animaux/grenouille.jpg",
    alt: "Photo d'une grenouille",
  },
  {
    word: "TOURNESOL",
    parts: ["TOUR", "NE", "SOL"],
    missing: [0],
    src: "/nomenclature/tournesol/tournesol.jpg",
    alt: "Photo d'un tournesol",
  },
  {
    word: "PAPILLON",
    parts: ["PA", "PIL", "LON"],
    missing: [1],
    src: "/nomenclature/animaux/papillon.jpg",
    alt: "Photo d'un papillon",
  },
  {
    word: "AUTOMNE",
    parts: ["AU", "TOM", "NE"],
    missing: [2],
    src: "/nomenclature/halloween/feuille.jpg",
    alt: "Photo d'une feuille d'automne",
  },
  {
    word: "ABEILLE",
    parts: ["A", "BEILLE"],
    missing: [0],
    src: "/nomenclature/tournesol/abeille.jpg",
    alt: "Photo d'une abeille",
  },
  {
    word: "ARC-EN-CIEL",
    parts: ["ARC", "EN", "CIEL"],
    missing: [1],
    src: "/nomenclature/saisons/arc-en-ciel.jpg",
    alt: "Photo d'un arc-en-ciel",
  },
]

export function missingSyllables(items: SyllableItem[]): string[] {
  return items.flatMap((item) => item.missing.map((i) => item.parts[i]))
}

export function assertSyllablePuzzle(items: SyllableItem[], bank: string[], distractors: string[] = []) {
  const errors: string[] = []

  for (const item of items) {
    if (item.word !== item.word.toUpperCase()) {
      errors.push(`${item.word}: le mot doit être en MAJUSCULES`)
    }
    for (const p of item.parts) {
      if (p !== p.toUpperCase()) errors.push(`${item.word}: syllabe "${p}" pas en MAJUSCULES`)
    }
    for (const i of item.missing) {
      if (i < 0 || i >= item.parts.length) {
        errors.push(`${item.word}: missing index ${i} hors limites`)
      }
    }
    const joined = item.parts.join("")
    const compact = item.word.replace(/-/g, "")
    if (joined !== compact) {
      errors.push(`${item.word}: parts.join="${joined}" ≠ mot compact "${compact}"`)
    }
  }

  const needed = missingSyllables(items)
  const bankCopy = [...bank]
  for (const syl of needed) {
    const idx = bankCopy.indexOf(syl)
    if (idx === -1) {
      errors.push(`Banque: syllabe manquante "${syl}" (requis par un trou)`)
    } else {
      bankCopy.splice(idx, 1)
    }
  }
  // Ce qui reste dans bankCopy doit être uniquement des leurres déclarés
  for (const left of bankCopy) {
    if (!distractors.includes(left)) {
      errors.push(`Banque: "${left}" en trop (ni trou ni leurre déclaré)`)
    }
  }
  for (const d of distractors) {
    // leurres optionnels — ok s'ils sont absents
    void d
  }

  if (needed.length !== items.reduce((n, it) => n + it.missing.length, 0)) {
    errors.push("Incohérence comptage trous")
  }

  return errors
}
