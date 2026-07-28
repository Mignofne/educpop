/**
 * Validation minimale d'un LivretSpec JSON (génération IA).
 * Usage: import { validateLivretSpec } from "../lib/livret/validate-spec.mjs"
 */

const VALID_AGES = new Set(["1-2", "2-3", "4-5", "6-7", "8-10"])
const VALID_NOTE_KINDS = new Set(["fact", "hypothesis", "uncertain"])
const MIN_ACTIVITIES = 5
const MAX_ACTIVITIES = 8
const FORBIDDEN = /\bIEF\b/i

/**
 * @param {unknown} spec
 * @returns {{ ok: true, spec: object } | { ok: false, errors: string[] }}
 */
export function validateLivretSpec(spec) {
  const errors = []

  if (!spec || typeof spec !== "object") {
    return { ok: false, errors: ["Spec must be a JSON object"] }
  }

  const s = /** @type {Record<string, unknown>} */ (spec)

  requireString(s, "theme", errors)
  requireString(s, "age", errors)
  requireString(s, "title", errors)
  requireString(s, "subtitle", errors)

  if (s.age && !VALID_AGES.has(String(s.age))) {
    errors.push(`age must be one of: ${[...VALID_AGES].join(", ")}`)
  }

  if (s.theme && FORBIDDEN.test(String(s.theme))) errors.push("theme must not contain label IEF")
  if (s.title && FORBIDDEN.test(String(s.title))) errors.push("title must not contain label IEF")
  if (s.subtitle && FORBIDDEN.test(String(s.subtitle))) errors.push("subtitle must not contain label IEF")

  validateIntro(s.intro, errors)

  if (!Array.isArray(s.activities)) {
    errors.push("activities must be an array")
  } else {
    const n = s.activities.length
    if (n < MIN_ACTIVITIES || n > MAX_ACTIVITIES) {
      errors.push(`activities.length must be between ${MIN_ACTIVITIES} and ${MAX_ACTIVITIES} (got ${n})`)
    }

    const types = new Set()
    s.activities.forEach((raw, i) => validateActivity(raw, i, types, errors))
  }

  if (!Array.isArray(s.resources)) {
    errors.push("resources must be an array")
  } else {
    s.resources.forEach((r, i) => {
      if (!r || typeof r !== "object") {
        errors.push(`resources[${i}] must be an object`)
        return
      }
      const item = /** @type {Record<string, unknown>} */ (r)
      if (typeof item.label !== "string" || !item.label.trim()) {
        errors.push(`resources[${i}].label is required`)
      }
    })
  }

  if (errors.length) return { ok: false, errors }
  return { ok: true, spec: s }
}

function validateIntro(intro, errors) {
  if (!intro || typeof intro !== "object") {
    errors.push("intro is required")
    return
  }
  const i = /** @type {Record<string, unknown>} */ (intro)
  if (!Array.isArray(i.objectives) || i.objectives.length < 1) {
    errors.push("intro.objectives must be a non-empty array")
  }
  requireString(i, "parentRole", errors)
  requireString(i, "duration", errors)
  if (!Array.isArray(i.material)) errors.push("intro.material must be an array")
}

function validateActivity(raw, index, types, errors) {
  const prefix = `activities[${index}]`
  if (!raw || typeof raw !== "object") {
    errors.push(`${prefix} must be an object`)
    return
  }
  const a = /** @type {Record<string, unknown>} */ (raw)

  if (a.index !== index + 1) {
    errors.push(`${prefix}.index must be ${index + 1} (got ${a.index})`)
  }

  requireString(a, "title", errors, prefix)
  requireString(a, "pedagogicalType", errors, prefix)
  requireString(a, "objective", errors, prefix)
  requireString(a, "childInstruction", errors, prefix)
  requireString(a, "learns", errors, prefix)

  if (!Array.isArray(a.skills) || a.skills.length < 1) errors.push(`${prefix}.skills must be a non-empty array`)
  if (!Array.isArray(a.material)) errors.push(`${prefix}.material must be an array`)
  if (!Array.isArray(a.steps)) errors.push(`${prefix}.steps must be an array`)

  if (!Array.isArray(a.parentQuestions) || a.parentQuestions.length < 1) {
    errors.push(`${prefix}.parentQuestions must have at least one question`)
  }

  if (a.scientificNote != null) {
    if (typeof a.scientificNote !== "object") {
      errors.push(`${prefix}.scientificNote must be an object`)
    } else {
      const note = /** @type {Record<string, unknown>} */ (a.scientificNote)
      if (!VALID_NOTE_KINDS.has(String(note.kind))) {
        errors.push(`${prefix}.scientificNote.kind must be fact | hypothesis | uncertain`)
      }
      requireString(note, "text", errors, `${prefix}.scientificNote`)
    }
  }

  const type = String(a.pedagogicalType ?? "").trim().toLowerCase()
  if (type) {
    if (types.has(type)) errors.push(`duplicate pedagogicalType: ${a.pedagogicalType}`)
    types.add(type)
  }

  for (const field of ["title", "childInstruction", "learns"]) {
    if (a[field] && FORBIDDEN.test(String(a[field]))) {
      errors.push(`${prefix}.${field} must not contain label IEF`)
    }
  }
}

function requireString(obj, key, errors, prefix = "") {
  const p = prefix ? `${prefix}.` : ""
  if (typeof obj[key] !== "string" || !String(obj[key]).trim()) {
    errors.push(`${p}${key} is required`)
  }
}
