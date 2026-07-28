/**
 * Validation contenus worksheets educpop.
 * Usage: node scripts/validate-worksheet-content.mjs
 * Exit 1 si erreur — à lancer avant publication / après edit de fiches.
 */

import { readFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

let failed = 0

function fail(msg) {
  console.error(`✗ ${msg}`)
  failed++
}

function ok(msg) {
  console.log(`✓ ${msg}`)
}

// ——— Syllabes library (parse TS lightly) ———
function validateSyllablePuzzlesFile() {
  const path = join(root, "lib/worksheets/syllable-puzzles.ts")
  const src = readFileSync(path, "utf8")

  const start = src.indexOf("export const SYLLABLES_LIBRARY")
  if (start < 0) {
    fail("SYLLABLES_LIBRARY introuvable dans syllable-puzzles.ts")
    return
  }
  const bracket = src.indexOf("= [", start)
  const end = src.indexOf("\n]", bracket)
  if (bracket < 0 || end < 0) {
    fail("Impossible de parser le tableau SYLLABLES_LIBRARY")
    return
  }
  const body = src.slice(bracket + 3, end)

  const itemRe =
    /\{\s*word:\s*"([^"]+)"\s*,\s*parts:\s*\[([^\]]+)\]\s*,\s*missing:\s*\[([^\]]*)\]/g
  let m
  const items = []
  while ((m = itemRe.exec(body))) {
    const word = m[1]
    const parts = m[2]
      .split(",")
      .map((s) => s.trim().replace(/"/g, ""))
      .filter(Boolean)
    const missing = m[3]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number)
    items.push({ word, parts, missing })
  }

  if (items.length === 0) {
    fail("Aucun item syllabe parsé")
    return
  }

  const needed = []
  for (const item of items) {
    if (item.word !== item.word.toUpperCase()) fail(`${item.word}: pas en MAJUSCULES`)
    for (const p of item.parts) {
      if (p !== p.toUpperCase()) fail(`${item.word}: syllabe ${p} pas MAJUSCULES`)
    }
    const compact = item.word.replace(/-/g, "")
    const joined = item.parts.join("")
    if (joined !== compact) {
      fail(`${item.word}: parts "${joined}" ≠ "${compact}"`)
    } else {
      ok(`${item.word}: découpage OK`)
    }
    for (const i of item.missing) {
      if (Number.isNaN(i) || i < 0 || i >= item.parts.length) {
        fail(`${item.word}: missing ${i} invalide`)
      } else {
        needed.push(item.parts[i])
      }
    }
  }

  // syllables-sheet must not hardcode a divergent bank
  const sheet = readFileSync(join(root, "components/worksheets/syllables-sheet.tsx"), "utf8")
  if (/\[\s*"NOU"/.test(sheet) || /Syllabes à utiliser[\s\S]*?\["/.test(sheet)) {
    fail("syllables-sheet.tsx: banque hardcodée suspecte — utiliser missingSyllables()")
  }
  if (!sheet.includes("missingSyllables")) {
    fail("syllables-sheet.tsx: doit dériver la banque via missingSyllables()")
  } else {
    ok("syllables-sheet: banque dérivée")
  }

  if (/[\u{1F300}-\u{1FAFF}]/u.test(sheet)) {
    fail("syllables-sheet: emoji Unicode interdit (standard visuel)")
  } else {
    ok("syllables-sheet: pas d'emoji")
  }

  ok(`Syllabes library: ${items.length} mots, ${needed.length} trous`)
}

// ——— Interdit emoji dans worksheets ———
function validateNoEmojiInWorksheets() {
  const dir = join(root, "components/worksheets")
  const files = walkTsx(dir)
  for (const f of files) {
    const src = readFileSync(f, "utf8")
    if (/[\u{1F300}-\u{1FAFF}]/u.test(src)) {
      fail(`Emoji dans ${f.replace(root, "")}`)
    }
  }
  ok(`Scan emoji: ${files.length} fichiers worksheets`)
}

function walkTsx(dir) {
  const out = []
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name)
    if (name.isDirectory()) out.push(...walkTsx(p))
    else if (/\.(tsx|ts)$/.test(name.name)) out.push(p)
  }
  return out
}

// ——— Placeholder trompeur ———
function validateNoIllustrationPlaceholder() {
  const dir = join(root, "components/worksheets")
  for (const f of walkTsx(dir)) {
    const src = readFileSync(f, "utf8")
    if (/>\s*illustration\s*</i.test(src) || /"illustration"/i.test(src)) {
      fail(`Placeholder "illustration" dans ${f.replace(root, "")}`)
    }
  }
  ok("Pas de placeholder illustration")
}

/** Nomenclature : chaque src déclaré doit exister sous public/ ; chaque set = 12 cartes */
function validateNomenclaturePhotos() {
  const setsPath = join(root, "lib/worksheets/nomenclature-sets.ts")
  const src = readFileSync(setsPath, "utf8")

  const setBlocks = [
    ...src.matchAll(
      /export const (NOMENCLATURE_[A-Z_]+)(?::[^=]+)?\s*=\s*\[([\s\S]*?)\]\s*(?=\n(?:export |\/\*\*|$))/g,
    ),
  ]
  if (setBlocks.length === 0) {
    fail("Aucun set NOMENCLATURE_* dans nomenclature-sets.ts")
    return
  }
  for (const [, name, body] of setBlocks) {
    const cards = [...body.matchAll(/\{\s*word:/g)]
    if (cards.length !== 12) {
      fail(`${name}: attendu 12 photos, trouvé ${cards.length}`)
    } else {
      ok(`${name}: 12 photos`)
    }
  }

  const paths = [...src.matchAll(/src:\s*"(\/nomenclature\/[^"]+)"/g)].map((m) => m[1])
  if (paths.length === 0) {
    fail("Aucun chemin nomenclature dans nomenclature-sets.ts")
    return
  }
  const seen = new Set()
  for (const p of paths) {
    if (seen.has(p)) continue
    seen.add(p)
    const disk = join(root, "public", p.replace(/^\//, ""))
    try {
      const st = readFileSync(disk)
      if (st.length < 3000) fail(`${p}: fichier trop petit (${st.length} B)`)
      else ok(`Photo OK ${p}`)
    } catch {
      fail(`${p}: fichier manquant`)
    }
  }

  // Vocab sheets doivent utiliser NomenclatureCards
  for (const f of ["moyen-age-vocab.tsx", "sunflower-vocab.tsx", "vocab-cards.tsx"]) {
    const sheet = readFileSync(join(root, "components/worksheets", f), "utf8")
    if (!sheet.includes("NomenclatureCards")) {
      fail(`${f}: doit utiliser NomenclatureCards (photos)`)
    } else {
      ok(`${f}: NomenclatureCards`)
    }
  }

  // Packs + vocab : jamais de .slice sur NOMENCLATURE_* (toujours les 12 cartes)
  const sheetsDir = join(root, "components/worksheets")
  const sheetFiles = readdirSync(sheetsDir).filter((n) => /\.(tsx|ts|jsx|js)$/.test(n))
  for (const name of sheetFiles) {
    const sheet = readFileSync(join(sheetsDir, name), "utf8")
    const sliceHits = [
      ...sheet.matchAll(/NOMENCLATURE_[A-Z_]+\s*\.\s*slice\s*\(\s*0\s*,\s*(\d+)\s*\)/g),
    ]
    for (const m of sliceHits) {
      fail(
        `${name}: NOMENCLATURE_*.slice(0, ${m[1]}) interdit — toujours passer les 12 cartes à NomenclatureCards`,
      )
    }
    // cards={...} inline arrays passed to NomenclatureCards must be length 12
    const inlineCards = [
      ...sheet.matchAll(/<NomenclatureCards\b[\s\S]*?cards=\{(\[[\s\S]*?\])\}/g),
    ]
    for (const m of inlineCards) {
      const n = [...m[1].matchAll(/\{\s*word:/g)].length
      if (n > 0 && n !== 12) {
        fail(`${name}: NomenclatureCards inline cards.length=${n} (attendu 12)`)
      }
    }
    // cards={SOME_CONST} — if SOME_CONST is NOMENCLATURE_* OK; if .slice already caught
    if (sheet.includes("NomenclatureCards") && /cards=\{[^}]*\.slice\s*\(/.test(sheet)) {
      fail(`${name}: cards={...slice(...)} interdit — NomenclatureCards exige 12 photos`)
    }
  }

  // Packs : nomenclature = photos (pas AnimeVocab)
  const packsDir = join(root, "components/worksheets")
  for (const name of readdirSync(packsDir).filter((n) => /^pack-.*\.tsx$/.test(n))) {
    const sheet = readFileSync(join(packsDir, name), "utf8")
    if (sheet.includes("AnimeVocab")) {
      fail(`${name}: nomenclature encore en AnimeVocab (pictos) — migrer vers NomenclatureCards`)
    } else if (/nomenclature|NomenclatureCards/i.test(sheet)) {
      ok(`${name}: pas d'AnimeVocab`)
    }
  }
}

const PACK_MIN = 5
const PACK_MAX = 8

/** Packs : activityCount dans 5–8, cohérent avec contents[] */
function validatePackActivityCounts() {
  const dir = join(root, "components/worksheets")
  const packs = readdirSync(dir).filter(
    (n) => /^pack-.*\.tsx$/.test(n) && n !== "pack-cover.tsx",
  )
  if (packs.length === 0) {
    fail("Aucun pack-*.tsx trouvé")
    return
  }

  for (const name of packs) {
    const src = readFileSync(join(dir, name), "utf8")
    const countRe = /activityCount:\s*(\d+)/g
    const contentsRe = /contents:\s*\[([\s\S]*?)\]/g
    const counts = []
    let m
    while ((m = countRe.exec(src))) counts.push(Number(m[1]))

    const contentLens = []
    while ((m = contentsRe.exec(src))) {
      const items = m[1].match(/"[^"]+"/g) || []
      contentLens.push(items.length)
    }

    if (counts.length === 0) {
      fail(`${name}: activityCount manquant (règle 5–8)`)
      continue
    }

    for (let i = 0; i < counts.length; i++) {
      const n = counts[i]
      if (n < PACK_MIN || n > PACK_MAX) {
        fail(`${name}[#${i}]: activityCount=${n} hors [${PACK_MIN},${PACK_MAX}]`)
      } else {
        ok(`${name}[#${i}]: ${n} activités`)
      }
      if (contentLens[i] != null && contentLens[i] !== n) {
        fail(`${name}[#${i}]: contents (${contentLens[i]}) ≠ activityCount (${n})`)
      }
    }
  }

  // Catalog : packs only, pageCount ≈ 1 + activités
  const catalog = readFileSync(join(root, "lib/activities.ts"), "utf8")

  const soloTypes = catalog.match(/type:\s*"(anatomie|saisons|vocabulaire|syllabes|traces|drapeaux)"/g)
  if (soloTypes && soloTypes.length > 0) {
    fail(`Catalogue: ${soloTypes.length} entrée(s) non-pack — bibliothèque = packs uniquement`)
  } else {
    ok("Catalogue: packs uniquement (pas de fiche solo)")
  }

  const packBlocks = [
    ...catalog.matchAll(
      /\{\s*slug:\s*"(pack-[^"]+)"[\s\S]*?pageCount:\s*(\d+)/g,
    ),
  ]
  if (packBlocks.length === 0) {
    fail("Catalogue: aucun pack-* avec pageCount")
  }
  for (const [, slug, pages] of packBlocks) {
    const p = Number(pages)
    if (slug.includes("livret")) {
      if (p < PACK_MIN || p > PACK_MAX) {
        fail(`${slug}: livret pageCount=${p} hors [${PACK_MIN},${PACK_MAX}] (1 page = 1 activité)`)
      } else {
        ok(`${slug}: livret pageCount ${p} (1 page par activité)`)
      }
      continue
    }
    const acts = p - 1
    if (acts < PACK_MIN || acts > PACK_MAX) {
      fail(`${slug}: pageCount=${p} ⇒ ${acts} activités hors [${PACK_MIN},${PACK_MAX}]`)
    } else {
      ok(`${slug}: pageCount ${p} (≈ ${acts} activités + couverture)`)
    }
  }
}

console.log("educpop — validation contenus worksheets\n")
validateSyllablePuzzlesFile()
validateNoEmojiInWorksheets()
validateNoIllustrationPlaceholder()
validateNomenclaturePhotos()
validatePackActivityCounts()

if (failed > 0) {
  console.error(`\n${failed} erreur(s) — corriger avant publication.`)
  process.exit(1)
}
console.log("\nTout est cohérent.")
