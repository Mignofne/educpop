/**
 * Répare les photos nomenclature abeilles (titres exacts + recherche Commons).
 * Usage: node scripts/repair-abeilles-photos.mjs
 */
import { mkdirSync, writeFileSync, existsSync, unlinkSync, readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const UA = "educpop-abeilles-repair/1.1 (educational; https://github.com/educpop)"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const PAUSE = 5000

const REJECT =
  /\b(cherry|cerise|coccinelle|ladybug|ladybird|graine|seed|chrysalide|papillon|pen|cross\b)\b/i

const FIXES = [
  {
    file: "couvain.jpg",
    note: "couvain (larves sur rayon)",
    must: /larv|brood|couvain|egg|honeycomb/i,
    rejectExtra: /maltese honey \(304|beetle|journal \(19/i,
    titles: ["HoneyComb.jpg", "Frame from hive of honey bee (apis mellifera).jpg"],
    search: "honeycomb larvae brood apis",
  },
  {
    file: "reine.jpg",
    note: "abeille reine",
    must: /queen|reine|royal cell|cellules royales/i,
    rejectExtra: /worker only|scutellata$/i,
    titles: [
      "Maltese honey bee.JPG",
      "Capped emergency supercedure queen cells of the honey bee.JPG",
    ],
    search: "queen bee royal cell comb",
  },
]

async function resolve(title) {
  const api = new URL("https://commons.wikimedia.org/w/api.php")
  api.searchParams.set("action", "query")
  api.searchParams.set("titles", title.startsWith("File:") ? title : `File:${title}`)
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
  if (!url || (info?.mime || "").includes("svg")) throw new Error("bad mime")
  const resolved = page.title?.replace(/^File:/, "") || title
  const desc = String(info?.extmetadata?.ImageDescription?.value || "").replace(/<[^>]+>/g, " ")
  return { url, title: resolved, desc }
}

async function searchCommons(query) {
  const api = new URL("https://commons.wikimedia.org/w/api.php")
  api.searchParams.set("action", "query")
  api.searchParams.set("generator", "search")
  api.searchParams.set("gsrsearch", `filetype:bitmap ${query}`)
  api.searchParams.set("gsrnamespace", "6")
  api.searchParams.set("gsrlimit", "8")
  api.searchParams.set("prop", "imageinfo")
  api.searchParams.set("iiprop", "url|mime|extmetadata")
  api.searchParams.set("iiurlwidth", "800")
  api.searchParams.set("format", "json")
  api.searchParams.set("origin", "*")
  const res = await fetch(api, { headers: { "User-Agent": UA } })
  if (res.status === 429) throw new Error("429")
  if (!res.ok) throw new Error(`search ${res.status}`)
  const data = await res.json()
  return Object.values(data?.query?.pages || {})
    .map((p) => {
      const info = p.imageinfo?.[0]
      if (!info || !/jpeg|png|webp/.test(info.mime || "")) return null
      const title = p.title?.replace(/^File:/, "") || ""
      const desc = String(info.extmetadata?.ImageDescription?.value || "").replace(/<[^>]+>/g, " ")
      return { title, url: info.thumburl || info.url, desc }
    })
    .filter(Boolean)
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": UA } })
  if (!res.ok) throw new Error(`GET ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 4000) throw new Error(`small ${buf.length}`)
  writeFileSync(dest, buf)
  return buf.length
}

function credit(file, commons, note) {
  const path = join(root, "public/nomenclature/abeilles/CREDITS.md")
  let body = existsSync(path)
    ? readFileSync(path, "utf8")
    : `# Crédits photos — nomenclature abeilles\n\nSource : Wikimedia Commons.\n\n| Fichier | Sujet | Source Commons |\n|---------|-------|----------------|\n`
  const lineRe = new RegExp(`\\| \\\`${file}\\\` \\|[^\\n]*\\n`)
  const row = `| \`${file}\` | ${note} | ${commons} |\n`
  if (lineRe.test(body)) body = body.replace(lineRe, row)
  else body = `${body.trimEnd()}\n${row}`
  writeFileSync(path, body)
}

function okHit(item, title, desc) {
  const blob = `${title} ${desc}`
  if (REJECT.test(blob)) return false
  if (item.rejectExtra?.test(blob)) return false
  return item.must.test(blob)
}

async function tryDownload(item, url, title, dest) {
  await sleep(1500)
  const bytes = await download(url, dest)
  credit(item.file, title, item.note)
  console.log(`✓ abeilles/${item.file} ← ${title} (${bytes} B)`)
}

async function main() {
  const dir = join(root, "public/nomenclature/abeilles")
  mkdirSync(dir, { recursive: true })
  let fail = 0

  for (const item of FIXES) {
    const dest = join(dir, item.file)
    if (existsSync(dest) && readFileSync(dest).length > 4000) {
      console.log(`skip abeilles/${item.file} (ok)`)
      continue
    }
    if (existsSync(dest)) unlinkSync(dest)

    let done = false
    for (const title of item.titles) {
      try {
        await sleep(PAUSE)
        const { url, title: resolved, desc } = await resolve(title)
        if (!okHit(item, resolved, desc)) {
          console.warn(`  · ${title}: rejected (${resolved})`)
          continue
        }
        await tryDownload(item, url, resolved, dest)
        done = true
        break
      } catch (e) {
        console.warn(`  · ${title}: ${e.message}`)
        if (e.message === "429") await sleep(25000)
      }
    }

    if (!done && item.search) {
      try {
        await sleep(PAUSE)
        for (const hit of await searchCommons(item.search)) {
          if (!okHit(item, hit.title, hit.desc)) continue
          try {
            await tryDownload(item, hit.url, hit.title, dest)
            done = true
            break
          } catch (e) {
            console.warn(`  · search ${hit.title}: ${e.message}`)
          }
        }
      } catch (e) {
        console.warn(`  · search: ${e.message}`)
      }
    }

    if (!done) {
      console.error(`✗ abeilles/${item.file}`)
      fail++
    }
  }

  if (fail > 0) process.exitCode = 1
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
