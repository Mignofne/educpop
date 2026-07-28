/**
 * Photos syllabes absentes des sets nomenclature (arc-en-ciel, continents).
 * Usage: node scripts/fetch-syllable-extra-photos.mjs
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const UA = "educpop-nomenclature-fetcher/1.4 (https://github.com/educpop; educational worksheets)"

const NEED = [
  {
    set: "saisons",
    file: "arc-en-ciel.jpg",
    titles: [
      "Rainbow over field.jpg",
      "Rainbow in Iceland.jpg",
      "Double rainbow.jpg",
      "Rainbow after rain.jpg",
    ],
    search: "rainbow landscape photo",
  },
  {
    set: "continents",
    file: "france.jpg",
    titles: [
      "Eiffel Tower from the Tour Montparnasse 3, Paris May 2014.jpg",
      "Tour Eiffel Wikimedia Commons.jpg",
      "Tour Eiffel.jpg",
      "Eiffel tower.jpg",
    ],
    search: "Eiffel Tower Paris photo",
  },
  {
    set: "continents",
    file: "canada.jpg",
    titles: [
      "Moraine Lake 17092005.jpg",
      "Lake Louise.jpg",
      "Banff National Park.jpg",
      "Canadian Rockies.jpg",
    ],
    search: "Banff Canada landscape",
  },
  {
    set: "continents",
    file: "bresil.jpg",
    titles: [
      "Cristo Redentor - Rio de Janeiro, Brasil.jpg",
      "Christ the Redeemer - Cristo Redentor.jpg",
      "Cristo Redentor.jpg",
      "Rio de Janeiro Christ.jpg",
    ],
    search: "Christ Redeemer Rio photo",
  },
]

async function resolveThumbUrl(title) {
  const fileTitle = title.startsWith("File:") ? title : `File:${title}`
  const api = new URL("https://commons.wikimedia.org/w/api.php")
  api.searchParams.set("action", "query")
  api.searchParams.set("titles", fileTitle)
  api.searchParams.set("prop", "imageinfo")
  api.searchParams.set("iiprop", "url|mime|size")
  api.searchParams.set("iiurlwidth", "800")
  api.searchParams.set("format", "json")
  api.searchParams.set("origin", "*")
  const res = await fetch(api, { headers: { "User-Agent": UA } })
  if (!res.ok) throw new Error(`API ${res.status}`)
  const data = await res.json()
  const page = Object.values(data?.query?.pages || {})[0]
  if (!page || page.missing != null) throw new Error("missing")
  const info = page.imageinfo?.[0]
  const url = info?.thumburl || info?.url
  if (!url) throw new Error("no url")
  if ((info?.mime || "").includes("svg")) throw new Error("svg")
  return { url, title: page.title?.replace(/^File:/, "") || title }
}

async function searchCommons(query) {
  const api = new URL("https://commons.wikimedia.org/w/api.php")
  api.searchParams.set("action", "query")
  api.searchParams.set("generator", "search")
  api.searchParams.set("gsrsearch", `filetype:bitmap ${query}`)
  api.searchParams.set("gsrnamespace", "6")
  api.searchParams.set("gsrlimit", "12")
  api.searchParams.set("prop", "imageinfo")
  api.searchParams.set("iiprop", "url|mime")
  api.searchParams.set("iiurlwidth", "800")
  api.searchParams.set("format", "json")
  api.searchParams.set("origin", "*")
  const res = await fetch(api, { headers: { "User-Agent": UA } })
  if (!res.ok) throw new Error(`search ${res.status}`)
  const data = await res.json()
  return Object.values(data?.query?.pages || {})
    .map((p) => {
      const info = p.imageinfo?.[0]
      if (!info) return null
      const mime = info.mime || ""
      if (!mime.includes("jpeg") && !mime.includes("png") && !mime.includes("webp")) return null
      return { title: p.title?.replace(/^File:/, ""), url: info.thumburl || info.url }
    })
    .filter(Boolean)
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": UA } })
  if (!res.ok) throw new Error(`GET ${res.status}`)
  const ct = res.headers.get("content-type") || ""
  if (ct.includes("html") || ct.includes("svg")) throw new Error(`bad type ${ct}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 3000) throw new Error(`too small ${buf.length}`)
  writeFileSync(dest, buf)
  return buf.length
}

function appendCredit(set, file, commons) {
  const path = join(root, "public/nomenclature", set, "CREDITS.md")
  let body = existsSync(path)
    ? readFileSync(path, "utf8")
    : `# Crédits photos — ${set}\n\nSource : Wikimedia Commons (syllabes).\n\n| Fichier | Sujet | Source Commons |\n|---------|-------|----------------|\n`
  const lineRe = new RegExp(`\\| \\\`${file}\\\` \\|[^\\n]*\\n`)
  const row = `| \`${file}\` | ${file.replace(".jpg", "")} | ${commons} |\n`
  if (lineRe.test(body)) body = body.replace(lineRe, row)
  else {
    if (!body.trimEnd().endsWith("|")) body = body.trimEnd() + "\n"
    body += row
  }
  writeFileSync(path, body, "utf8")
}

async function fetchOne(item) {
  const dir = join(root, "public/nomenclature", item.set)
  mkdirSync(dir, { recursive: true })
  const dest = join(dir, item.file)
  if (existsSync(dest)) {
    console.log(`= déjà présent ${item.set}/${item.file}`)
    return "exists"
  }
  for (const title of item.titles) {
    try {
      await sleep(800)
      const { url, title: resolved } = await resolveThumbUrl(title)
      await sleep(400)
      const bytes = await download(url, dest)
      console.log(`✓ ${item.set}/${item.file} ← ${resolved} (${bytes} B)`)
      appendCredit(item.set, item.file, resolved)
      return resolved
    } catch (e) {
      console.warn(`  · ${title}: ${e.message}`)
    }
  }
  if (item.search) {
    await sleep(1000)
    const hits = await searchCommons(item.search)
    for (const hit of hits) {
      try {
        await sleep(500)
        const bytes = await download(hit.url, dest)
        console.log(`✓ ${item.set}/${item.file} ← search:${hit.title} (${bytes} B)`)
        appendCredit(item.set, item.file, hit.title)
        return hit.title
      } catch (e) {
        console.warn(`  · search ${hit.title}: ${e.message}`)
      }
    }
  }
  console.error(`✗ ${item.set}/${item.file}`)
  return null
}

let ok = 0
let fail = 0
for (const item of NEED) {
  const r = await fetchOne(item)
  if (r) ok++
  else fail++
}
console.log(`Terminé OK=${ok} fail=${fail}`)
if (fail) process.exit(1)
