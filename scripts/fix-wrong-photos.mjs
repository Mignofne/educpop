/**
 * Re-télécharge les 7 fichiers manquants (titres Commons vérifiés).
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const UA = "educpop-nomenclature-fetcher/1.6 (https://github.com/educpop; educational)"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const ITEMS = [
  { set: "secours", file: "collier.jpg", titles: [
    "Collar for a Hunting Dog MET sfsb29.150.154 003l.jpg",
    "Dog on leash.jpg",
  ]},
  { set: "cerise", file: "noyau.jpg", titles: ["Cherry stone hoard.JPG"] },
  { set: "cerise", file: "tige.jpg", titles: ["Cherries.jpg", "Prunus avium.jpg"] },
  { set: "antarctique", file: "banquise.jpg", titles: ["Sea ice.jpg", "Iceberg Antarctica.jpg"] },
  {
    set: "halloween",
    file: "fantome.jpg",
    titles: ['Theatrical ghost costume for "Le Rossignol" MET DP804813.jpg'],
  },
  { set: "halloween", file: "chapeau.jpg", titles: ["Witch's Hat (B&W) (2201747985).jpg"] },
  { set: "noel", file: "moufle.jpg", titles: ["Gloves.jpg", "Winter boots.jpg"] },
]

async function resolve(title) {
  const api = new URL("https://commons.wikimedia.org/w/api.php")
  api.searchParams.set("action", "query")
  api.searchParams.set("titles", title.startsWith("File:") ? title : `File:${title}`)
  api.searchParams.set("prop", "imageinfo")
  api.searchParams.set("iiprop", "url|mime")
  api.searchParams.set("iiurlwidth", "800")
  api.searchParams.set("format", "json")
  api.searchParams.set("origin", "*")
  const res = await fetch(api, { headers: { "User-Agent": UA } })
  const data = await res.json()
  const page = Object.values(data.query.pages)[0]
  if (page.missing != null) throw new Error("missing")
  const info = page.imageinfo[0]
  return { url: info.thumburl || info.url, title: page.title.replace(/^File:/, "") }
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": UA } })
  if (!res.ok) throw new Error(`GET ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 3000) throw new Error(`small ${buf.length}`)
  writeFileSync(dest, buf)
  return buf.length
}

function credit(set, file, commons) {
  const path = join(root, "public/nomenclature", set, "CREDITS.md")
  let body = existsSync(path)
    ? readFileSync(path, "utf8")
    : `# Crédits photos — nomenclature ${set}\n\nSource : Wikimedia Commons.\n\n| Fichier | Sujet | Source Commons |\n|---------|-------|----------------|\n`
  const lineRe = new RegExp(`\\| \\\`${file}\\\` \\|[^\\n]*\\n`)
  const row = `| \`${file}\` | ${file.replace(".jpg", "")} | ${commons} |\n`
  if (lineRe.test(body)) body = body.replace(lineRe, row)
  else body = `${body.trimEnd()}\n${row}`
  writeFileSync(path, body)
}

async function main() {
  let fail = 0
  for (const item of ITEMS) {
    const dir = join(root, "public/nomenclature", item.set)
    mkdirSync(dir, { recursive: true })
    const dest = join(dir, item.file)
    if (existsSync(dest) && readFileSync(dest).length > 3000) {
      console.log(`skip ${item.set}/${item.file}`)
      continue
    }
    let done = false
    for (const title of item.titles) {
      try {
        await sleep(1000)
        const { url, title: resolved } = await resolve(title)
        await sleep(600)
        const bytes = await download(url, dest)
        credit(item.set, item.file, resolved)
        console.log(`OK ${item.set}/${item.file} ← ${resolved} (${bytes} B)`)
        done = true
        break
      } catch (e) {
        console.warn(`  · ${title}: ${e.message}`)
      }
    }
    if (!done) {
      console.error(`FAIL ${item.set}/${item.file}`)
      fail++
    }
  }
  if (fail) process.exitCode = 1
}

main()
