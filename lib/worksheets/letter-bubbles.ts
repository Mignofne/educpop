/**
 * Lettres-bulles pour « colorie les bulles ».
 * Shuffle déterministe (seed = mot) pour SSR print = client — jamais Math.random().
 */

function hashSeed(seed: string): number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Fisher–Yates stable (même seed → même ordre). */
export function stableShuffle<T>(items: readonly T[], seed: string): T[] {
  const out = [...items]
  const rand = mulberry32(hashSeed(seed))
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const DECOY_POOL = "XYZMNPRQKWJF"

/**
 * Banque de bulles : lettres du mot (+ leurres).
 * - shuffle=false (2–3) : lettres du mot d’abord, ordre utile
 * - shuffle=true (4–5 / 6–7 / 8–10) : mélange stable seedé par le mot
 */
export function letterBubbles(
  word: string,
  opts?: { shuffle?: boolean; max?: number; decoys?: string },
): string[] {
  const letters = word
    .toUpperCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^A-Z]/g, "")
    .split("")
  const max = opts?.max ?? 12
  const decoySrc = (opts?.decoys ?? DECOY_POOL).toUpperCase()
  const need = Math.max(2, max - letters.length)
  const inWord = new Set(letters)
  const decoys: string[] = []
  for (const d of decoySrc) {
    if (decoys.length >= need) break
    if (!inWord.has(d)) decoys.push(d)
  }
  // Secours si le pool de leurres est trop court
  for (let i = 0; decoys.length < need && i < 26; i++) {
    const d = String.fromCharCode(65 + i) // A–Z
    if (!inWord.has(d) && !decoys.includes(d)) decoys.push(d)
  }
  const pool = [...letters, ...decoys].slice(0, max)
  return opts?.shuffle ? stableShuffle(pool, letters.join("")) : pool
}
