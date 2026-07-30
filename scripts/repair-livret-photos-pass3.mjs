/**
 * Passe 3 — photos hors sujet détectées en QA visuelle (cadeau=graphique, dragon=rue, trésor=tabouret…).
 * Usage: node scripts/repair-livret-photos-pass3.mjs
 */
import { mkdirSync, writeFileSync, existsSync, unlinkSync, readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const UA = "educpop-photo-repair-pass3/1.0 (educational worksheets)"
const PAUSE = 8000

const REJECT =
  /\b(chart|graph|power\s*bi|dashboard|spreadsheet|excel|bar chart|histogram|stool|benin|museum label|street scene|firecracker|gall\b|diagram|infographic)\b/i

const FIXES = [
  {
    set: "noel",
    file: "cadeau.jpg",
    note: "cadeau emballé (Noël)",
    mustMatch: /gift|present|wrapped|cadeau|parcel|bow|ribbon|christmas|xmas/i,
    titles: [
      "Brown gift box with red ribbon and bow.jpg",
      "Gifts xmas.jpg",
      "Christmas Tree and Presents.jpg",
      "Gift-present-christmas-xmas (24217172092).jpg",
      "Badly wrapped gift.jpg",
    ],
  },
  {
    set: "noel",
    file: "etoile.jpg",
    note: "étoile de Noël (décor)",
    mustMatch: /star|étoile|christmas|ornament|decoration/i,
    titles: [
      "CHRISTMASSTAR.jpg",
      "Christmas star decoration at Arikkad village, Palakkad, Kerala, India.jpg",
      "Christmas Star Float.jpg",
    ],
  },
  {
    set: "pirate",
    file: "tresor.jpg",
    note: "coffre au trésor",
    mustMatch: /treasure|chest|coffre|gold|pirate/i,
    titles: [
      "Treasure Chest (3981686321).jpg",
      "Treasure chest, Jockey's Ridge Mini-Golf, Nags Head, North Carolina (LOC).jpg",
      "Treasure chest, Magic Carpet Golf, Key West, Florida (LOC).jpg",
    ],
  },
]

async function resolve(title) {
  const fileTitle = title.startsWith("File:") ? title : `File:${title}`
  const api = new URL("https://commons.wikimedia.org/w/api.php")
  api.searchParams.set("action", "query")
  api.searchParams.set("titles", fileTitle)
  api.searchParams.set("prop", "imageinfo")
  api.searchParams.set("iiprop", "url|extmetadata|mime")
  api.searchParams.set("iiurlwidth", "800")
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
  if (!url) throw new Error("no url")
  if ((info?.mime || "").includes("svg")) throw new Error("svg")
  const resolved = page.title?.replace(/^File:/, "") || title
  const desc = String(info?.extmetadata?.ImageDescription?.value || "").replace(/<[^>]+>/g, " ")
  return { url, title: resolved, desc }
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": UA } })
  if (res.status === 429) throw new Error("429")
  if (!res.ok) throw new Error(`GET ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 4000) throw new Error(`too small ${buf.length}`)
  writeFileSync(dest, buf)
  return buf.length
}

function credit(set, file, commons, note) {
  const path = join(root, "public/nomenclature", set, "CREDITS.md")
  let body = existsSync(path)
    ? readFileSync(path, "utf8")
    : `# Crédits photos — nomenclature ${set}\n\nSource : Wikimedia Commons.\n\n| Fichier | Sujet | Source Commons |\n|---------|-------|----------------|\n`
  if (!body.includes("| Fichier | Sujet |")) {
    body = `# Crédits photos — nomenclature ${set}\n\nSource : Wikimedia Commons.\n\n| Fichier | Sujet | Source Commons |\n|---------|-------|----------------|\n`
  }
  const lineRe = new RegExp(`\\| \\\`${file}\\\` \\|[^\\n]*\\n`)
  const row = `| \`${file}\` | ${note} | ${commons} |\n`
  if (lineRe.test(body)) body = body.replace(lineRe, row)
  else body = `${body.trimEnd()}\n${row}`
  writeFileSync(path, body)
}

async function main() {
  console.log(`Passe 3 — ${FIXES.length} photos…\n`)
  let ok = 0
  let fail = 0
  for (const item of FIXES) {
    const dir = join(root, "public/nomenclature", item.set)
    mkdirSync(dir, { recursive: true })
    const dest = join(dir, item.file)
    const bak = `${dest}.bak`
    if (existsSync(dest)) {
      writeFileSync(bak, readFileSync(dest))
      unlinkSync(dest)
    }

    let done = false
    for (const title of item.titles) {
      try {
        await sleep(PAUSE)
        const { url, title: resolved, desc } = await resolve(title)
        const blob = `${resolved} ${desc}`
        if (REJECT.test(blob)) {
          console.warn(`  · ${title}: rejected (${resolved})`)
          continue
        }
        if (item.mustMatch && !item.mustMatch.test(blob)) {
          console.warn(`  · ${title}: subject mismatch (${resolved})`)
          continue
        }
        await sleep(PAUSE)
        const bytes = await download(url, dest)
        credit(item.set, item.file, resolved, item.note)
        console.log(`✓ ${item.set}/${item.file} ← ${resolved} (${bytes} B)`)
        if (existsSync(bak)) unlinkSync(bak)
        done = true
        ok++
        break
      } catch (e) {
        console.warn(`  · ${title}: ${e.message}`)
        if (e.message === "429") {
          console.warn("    (cooldown 20s)")
          await sleep(20000)
        }
      }
    }
    if (!done) {
      if (existsSync(bak)) {
        writeFileSync(dest, readFileSync(bak))
        unlinkSync(bak)
        console.error(`✗ ${item.set}/${item.file} (restored bak)`)
      } else {
        console.error(`✗ ${item.set}/${item.file}`)
      }
      fail++
    }
  }
  console.log(`\nOK=${ok} échecs=${fail}`)
  if (fail > 0) process.exitCode = 1
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
