/**
 * Génère un LivretSpec JSON via OpenAI à partir du prompt pédagogique canonique.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... node scripts/generate-livret-spec.mjs --theme "les abeilles" --age 6-7
 *   pnpm generate:livret-spec -- --theme "le papillon" --age 4-5 --out output/livret-specs/papillon-4-5.json
 *
 * Env:
 *   OPENAI_API_KEY (required)
 *   OPENAI_MODEL (optional, default gpt-4o-mini)
 */

import { readFileSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { validateLivretSpec } from "../lib/livret/validate-spec.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

const JSON_SCHEMA_HINT = `{
  "theme": "string",
  "age": "1-2 | 2-3 | 4-5 | 6-7 | 8-10",
  "title": "string",
  "subtitle": "string",
  "intro": {
    "objectives": ["string"],
    "parentRole": "string",
    "duration": "string",
    "material": ["string"]
  },
  "activities": [
    {
      "index": 1,
      "title": "string",
      "pedagogicalType": "string (unique per activity)",
      "objective": "string",
      "skills": ["string"],
      "material": ["string"],
      "childInstruction": "string (short, age-appropriate)",
      "steps": ["string"],
      "easyVariant": "string (optional)",
      "hardVariant": "string (optional)",
      "learns": "string",
      "scientificNote": { "kind": "fact|hypothesis|uncertain", "text": "string" },
      "parentQuestions": ["string"]
    }
  ],
  "resources": [{ "label": "string", "url": "string (optional)" }]
}`

function parseArgs(argv) {
  const args = { theme: "", age: "", out: "", count: 8 }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--theme") args.theme = argv[++i] ?? ""
    else if (a === "--age") args.age = argv[++i] ?? ""
    else if (a === "--out") args.out = argv[++i] ?? ""
    else if (a === "--count") args.count = Number(argv[++i] ?? 8)
    else if (a === "--help" || a === "-h") args.help = true
  }
  return args
}

function slugify(theme, age) {
  const t = theme
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return `pack-livret-${t || "theme"}-${age}`
}

function loadPromptTemplate() {
  const path = join(root, "docs/prompts/livret-pedagogique.md")
  return readFileSync(path, "utf8")
}

function buildMessages({ promptTemplate, theme, age, activityCount }) {
  const system = [
    "Tu es l'éditeur pédagogique educpop. Tu produis UNIQUEMENT du JSON valide, sans markdown.",
    "Respecte strictement le prompt livret ci-dessous.",
    `Génère exactement ${activityCount} activités avec ${activityCount} formats pédagogiques DIFFÉRENTS.`,
    "Pas de label marketing IEF. Ton chaleureux, scientifique, adapté à l'âge.",
    "Syllabes en MAJUSCULES si mentionnées. Consignes courtes sans flèches →.",
    "",
    promptTemplate,
  ].join("\n")

  const user = [
    `THÈME: ${theme}`,
    `TRANCHE D'ÂGE: ${age}`,
    `Nombre d'activités: ${activityCount} (entre 5 et 8 inclus)`,
    "",
    "Réponds avec un objet JSON conforme à ce schéma:",
    JSON_SCHEMA_HINT,
  ].join("\n")

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ]
}

async function callOpenAI(messages) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set. Add it to .env or export it in your shell.")
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini"
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`OpenAI API error ${res.status}: ${body}`)
  }

  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content
  if (!content) throw new Error("OpenAI returned empty content")
  return JSON.parse(content)
}

function printHelp() {
  console.log(`Usage: node scripts/generate-livret-spec.mjs --theme "les abeilles" --age 6-7 [--count 8] [--out path.json]

Options:
  --theme   Thème pédagogique (required)
  --age     Tranche d'âge: 1-2 | 2-3 | 4-5 | 6-7 | 8-10 (required)
  --count   Nombre d'activités (5-8, default 8)
  --out     Fichier de sortie (default output/livret-specs/<slug>.json)

Environment:
  OPENAI_API_KEY   Required
  OPENAI_MODEL     Optional (default gpt-4o-mini)
`)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    printHelp()
    return
  }

  if (!args.theme.trim() || !args.age.trim()) {
    printHelp()
    process.exit(1)
  }

  const activityCount = Math.min(8, Math.max(5, Number.isFinite(args.count) ? args.count : 8))
  const slug = slugify(args.theme, args.age)
  const outPath =
    args.out || join(root, "output", "livret-specs", `${slug.replace(/^pack-livret-/, "")}.json`)

  console.log(`→ Generating LivretSpec for "${args.theme}" (${args.age}), ${activityCount} activities…`)

  const promptTemplate = loadPromptTemplate()
  const messages = buildMessages({
    promptTemplate,
    theme: args.theme,
    age: args.age,
    activityCount,
  })

  const raw = await callOpenAI(messages)
  const result = validateLivretSpec(raw)

  if (!result.ok) {
    console.error("✗ Validation failed:")
    for (const e of result.errors) console.error(`  - ${e}`)
    process.exit(1)
  }

  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, `${JSON.stringify(result.spec, null, 2)}\n`, "utf8")
  console.log(`✓ Wrote ${outPath}`)
  console.log(`  Slug catalogue visé: ${slug}`)
  console.log(`  Prochaine étape: implémenter components/worksheets/pack-livret-<theme>.tsx à partir de ce spec`)
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
