/**
 * Répare les photos nomenclature utilisées par les livrets co-schooling.
 * Titres Commons exacts + filtre sujet (pas de recherche floue).
 *
 * Usage: node scripts/repair-livret-photos.mjs
 */
import { mkdirSync, writeFileSync, existsSync, unlinkSync, readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const UA = "educpop-livret-photo-repair/1.0 (educational; https://github.com/educpop)"
const PAUSE = 3500

const REJECT =
  /\b(pen|fountain|hotel|neon|building at night|weevil|stag beetle|grasshopper|lacewing|chrysopidae|horse|painting|oil on canvas|diagram|finite element|container|node\b|element\b|camel|caravan|begonia|collage|montage)\b/i

/** @type {Array<{ set: string; file: string; note: string; mustMatch?: RegExp; rejectExtra?: RegExp; titles: string[] }>} */
const FIXES = [
  // —— papillon ——
  {
    set: "papillon",
    file: "feuille.jpg",
    note: "feuille verte",
    mustMatch: /leaf|feuille|foliage|blatt/i,
    rejectExtra: /building|hotel|neon|urban|night|camel|begonia/i,
    titles: [
      "Green leaves in spring.jpg",
      "Leaf 1 web.jpg",
      "A leaf (PSF).jpg",
      "Ficus elastica leaf.jpg",
    ],
  },
  {
    set: "papillon",
    file: "fleur.jpg",
    note: "fleur de prairie",
    mustMatch: /flower|blossom|bloom|fleur|meadow|prairie/i,
    rejectExtra: /begonia|black background/i,
    titles: [
      "Wildflower meadow.jpg",
      "Purple coneflower blossom.jpg",
      "Dandelion flower.jpg",
      "Sunflower flower.jpg",
    ],
  },
  {
    set: "papillon",
    file: "oeuf.jpg",
    note: "œufs de papillon",
    mustMatch: /butterfly egg|papillon|lepidoptera|pieris|vanessa|colias/i,
    rejectExtra: /lacewing|chrysop/i,
    titles: [
      "Pieris brassicae eggs.jpg",
      "Butterfly eggs on leaf.jpg",
      "Vanessa cardui eggs.jpg",
    ],
  },
  {
    set: "papillon",
    file: "antenne.jpg",
    note: "antennes de papillon",
    mustMatch: /butterfly|papillon|lepidoptera/i,
    rejectExtra: /weevil|stag beetle|grasshopper|moth|beetle collage|coleoptera/i,
    titles: [
      "Vanessa atalanta head.jpg",
      "Papilio machaon head.jpg",
      "Butterfly head close-up.jpg",
    ],
  },
  {
    set: "papillon",
    file: "pollen.jpg",
    note: "pollen sur une fleur",
    mustMatch: /pollen|fleur|flower/i,
    rejectExtra: /bumblebee|apis mellifera|honey bee/i,
    titles: [
      "Pollen on a flower.jpg",
      "Pollen grains on stamen.jpg",
      "Yellow pollen on flower.jpg",
    ],
  },
  // —— coccinelle ——
  {
    set: "coccinelle",
    file: "feuille.jpg",
    note: "feuille verte",
    mustMatch: /leaf|feuille|foliage/i,
    rejectExtra: /building|hotel|neon|urban|night/i,
    titles: [
      "Green leaves in spring.jpg",
      "Leaf 1 web.jpg",
      "Plant leaf close-up.jpg",
    ],
  },
  {
    set: "coccinelle",
    file: "fleur.jpg",
    note: "fleur du jardin",
    mustMatch: /flower|blossom|fleur|daisy|marguerite/i,
    rejectExtra: /begonia|black background/i,
    titles: [
      "Daisy flower.jpg",
      "Garden flower.jpg",
      "Red flower blossom.jpg",
    ],
  },
  {
    set: "coccinelle",
    file: "soleil.jpg",
    note: "soleil",
    mustMatch: /sun|soleil/i,
    rejectExtra: /silhouette|treeline|moon|eclipse/i,
    titles: ["Sun.jpg", "The Sun in white light.jpg", "Solar disk H-alpha.jpg"],
  },
  {
    set: "coccinelle",
    file: "antenne.jpg",
    note: "antennes de coccinelle",
    mustMatch: /coccinella|ladybug|ladybird|coccinelle/i,
    rejectExtra: /weevil|grasshopper|stag beetle|collage/i,
    titles: [
      "Coccinella septempunctata head.jpg",
      "Seven-spot ladybird head.jpg",
      "Ladybug close-up head.jpg",
    ],
  },
  // —— cerise ——
  {
    set: "cerise",
    file: "tige.jpg",
    note: "cerises sur la tige",
    mustMatch: /cherry|cerise|prunus|branch|stem|tige|tree/i,
    titles: [
      "Cherries on the tree.jpg",
      "Prunus avium fruit on branch.jpg",
      "Sweet cherry on branch.jpg",
    ],
  },
  {
    set: "cerise",
    file: "soleil.jpg",
    note: "soleil",
    mustMatch: /sun|soleil/i,
    rejectExtra: /silhouette|treeline|moon/i,
    titles: ["Sun.jpg", "The Sun in white light.jpg"],
  },
  // —— océan ——
  {
    set: "ocean",
    file: "crabe.jpg",
    note: "crabe",
    mustMatch: /crab|crabe|cancer|decapod/i,
    rejectExtra: /horse|painting|canvas|ship/i,
    titles: [
      "Carcinus maenas.jpg",
      "Shore crab.jpg",
      "Hermit crab.jpg",
      "Crab on beach.jpg",
    ],
  },
  {
    set: "ocean",
    file: "vague.jpg",
    note: "vague de mer",
    mustMatch: /wave|vague|surf|ocean|sea/i,
    rejectExtra: /diagram|element|node|finite|container|mesh/i,
    titles: ["Ocean wave.jpg", "Breaking wave.jpg", "Sea wave.jpg", "Surfing wave.jpg"],
  },
  // —— serpent ——
  {
    set: "serpent",
    file: "desert.jpg",
    note: "désert de sable",
    mustMatch: /desert|sand|dune|sahara/i,
    rejectExtra: /camel|caravan|oasis market/i,
    titles: [
      "Sahara desert sand dunes.jpg",
      "Sand dunes in desert.jpg",
      "Desert landscape sand.jpg",
      "Erg Chebbi dunes.jpg",
    ],
  },
]

async function resolve(title) {
  const api = new URL("https://commons.wikimedia.org/w/api.php")
  api.searchParams.set("action", "query")
  api.searchParams.set("titles", title.startsWith("File:") ? title : `File:${title}`)
  api.searchParams.set("prop", "imageinfo")
  api.searchParams.set("iiprop", "url|extmetadata|mime")
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
  if (!body.includes("| Fichier |")) {
    body = `# Crédits photos — nomenclature ${set}\n\nSource : Wikimedia Commons.\n\n| Fichier | Sujet | Source Commons |\n|---------|-------|----------------|\n`
  }
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
  if (item.mustMatch && !item.mustMatch.test(blob)) return false
  return true
}

async function main() {
  console.log(`Réparation livrets : ${FIXES.length} photos\n`)
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
        if (!okHit(item, resolved, desc)) {
          console.warn(`  · ${title}: rejected (${resolved})`)
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
        if (e.message === "429") await sleep(20000)
      }
    }

    if (!done) {
      if (existsSync(bak)) {
        writeFileSync(dest, readFileSync(bak))
        unlinkSync(bak)
        console.error(`✗ ${item.set}/${item.file} (restored)`)
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
