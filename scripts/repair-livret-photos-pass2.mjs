/**
 * Passe 2 — titres Commons vérifiés (recherche API).
 * Usage: node scripts/repair-livret-photos-pass2.mjs
 */
import { mkdirSync, writeFileSync, existsSync, unlinkSync, readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const UA = "educpop-livret-photo-repair/1.1 (educational)"
const PAUSE = 5000

const FIXES = [
  {
    set: "papillon",
    file: "oeuf.jpg",
    note: "œufs de papillon sur feuille",
    titles: [
      "Monarch butterfly egg on a milkweed leaf (42970347980).jpg",
      "Monarch butterfly egg on a leaf.jpg",
      "Butterfly laying eggs underneath a leaf.jpg",
    ],
  },
  {
    set: "papillon",
    file: "antenne.jpg",
    note: "tête et antennes de papillon",
    titles: [
      "Butterfly Aporia crataegi macro portrait.jpg",
      "Butterfly portrait.jpg",
      "Butterfly (Lepidoptera) - Guelph, Ontario 02.jpg",
    ],
  },
  {
    set: "papillon",
    file: "pollen.jpg",
    note: "pollen sur une fleur",
    titles: ["Flower with pollen-Edit2.jpg", "Amaryllis stamens aka.jpg"],
  },
  {
    set: "coccinelle",
    file: "antenne.jpg",
    note: "coccinelle (tête visible)",
    titles: [
      "Coccinella septempunctata Luc Viatour.JPG",
      "Seven-spot ladybird 1.jpg",
      "20210409 Coccinella septempunctata 01.jpg",
    ],
  },
  {
    set: "coccinelle",
    file: "soleil.jpg",
    note: "soleil dans le ciel",
    titles: [
      "Sun in the sky.jpg",
      "Sun behind clouds.jpg",
      "The sun seen in the white light.jpg",
    ],
  },
  {
    set: "cerise",
    file: "tige.jpg",
    note: "cerises sur la branche",
    titles: [
      "Cherries cherry branch fruit red 826113.jpg",
      "Cherry (Prunus species); fruiting branch with sectioned frui Wellcome V0043150.jpg",
    ],
  },
  {
    set: "cerise",
    file: "soleil.jpg",
    note: "soleil dans le ciel",
    titles: ["Sun in the sky.jpg", "Sun behind clouds.jpg"],
  },
  {
    set: "ocean",
    file: "vague.jpg",
    note: "vague de mer",
    titles: [
      "Big wave breaking in Santa Cruz.jpg",
      "A surfer at the wave edit.jpg",
      "La horde - Surfers riding a wave in Paea, Tahiti.jpg",
    ],
  },
  {
    set: "serpent",
    file: "desert.jpg",
    note: "dunes de sable",
    titles: [
      "Sossusvlei sand dunes.jpg",
      "Mesquite Sand Dunes in Death Valley.jpg",
      "Dunes, Désert du Thar.jpg",
    ],
  },
]

async function resolve(title) {
  const api = new URL("https://commons.wikimedia.org/w/api.php")
  api.searchParams.set("action", "query")
  api.searchParams.set("titles", title.startsWith("File:") ? title : `File:${title}`)
  api.searchParams.set("prop", "imageinfo")
  api.searchParams.set("iiprop", "url|mime")
  api.searchParams.set("iiurlwidth", "900")
  api.searchParams.set("format", "json")
  api.searchParams.set("origin", "*")
  const res = await fetch(api, { headers: { "User-Agent": UA } })
  if (res.status === 429) throw new Error("429")
  if (!res.ok) throw new Error(`API ${res.status}`)
  const data = await res.json()
  const page = Object.values(data?.query?.pages || {})[0]
  if (!page || page.missing != null) throw new Error("missing")
  const info = page.imageinfo?.[0]
  const url = info?.thumburl || info?.url
  if (!url || (info?.mime || "").includes("svg")) throw new Error("bad mime")
  return { url, title: page.title?.replace(/^File:/, "") || title }
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": UA } })
  if (!res.ok) throw new Error(`GET ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 8000) throw new Error(`too small ${buf.length}`)
  writeFileSync(dest, buf)
  return buf.length
}

function credit(set, file, commons, note) {
  const path = join(root, "public/nomenclature", set, "CREDITS.md")
  let body = existsSync(path)
    ? readFileSync(path, "utf8")
    : `# Crédits photos — nomenclature ${set}\n\nSource : Wikimedia Commons.\n\n| Fichier | Sujet | Source Commons |\n|---------|-------|----------------|\n`
  const lineRe = new RegExp(`\\| \\\`${file}\\\` \\|[^\\n]*\\n`)
  const row = `| \`${file}\` | ${note} | ${commons} |\n`
  if (lineRe.test(body)) body = body.replace(lineRe, row)
  else body = `${body.trimEnd()}\n${row}`
  writeFileSync(path, body)
}

async function main() {
  let ok = 0
  let fail = 0
  for (const item of FIXES) {
    const dir = join(root, "public/nomenclature", item.set)
    mkdirSync(dir, { recursive: true })
    const dest = join(dir, item.file)
    const bak = existsSync(dest) ? readFileSync(dest) : null
    if (existsSync(dest)) unlinkSync(dest)

    let done = false
    for (const title of item.titles) {
      try {
        await sleep(PAUSE)
        const { url, title: resolved } = await resolve(title)
        await sleep(PAUSE)
        const bytes = await download(url, dest)
        credit(item.set, item.file, resolved, item.note)
        console.log(`✓ ${item.set}/${item.file} ← ${resolved} (${bytes} B)`)
        done = true
        ok++
        break
      } catch (e) {
        console.warn(`  · ${item.set}/${item.file} / ${title}: ${e.message}`)
        if (e.message === "429") await sleep(25000)
      }
    }
    if (!done) {
      if (bak) writeFileSync(dest, bak)
      console.error(`✗ ${item.set}/${item.file}`)
      fail++
    }
  }
  console.log(`\nOK=${ok} échecs=${fail}`)
  if (fail) process.exitCode = 1
}

main()
