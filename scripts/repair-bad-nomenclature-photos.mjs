/**
 * Répare les photos mal résolues (search fallback → mauvais sujets).
 * Pas de recherche floue : titres File: exacts uniquement + filtre anti-ambiguïté.
 *
 * Usage: node scripts/repair-bad-nomenclature-photos.mjs
 */
import { mkdirSync, writeFileSync, existsSync, unlinkSync, readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const UA = "educpop-nomenclature-repair/1.3 (educational worksheets; https://github.com/educpop)"
const PAUSE = 4000

const REJECT =
  /\b(pen|fountain|ballpoint|cross\b|montblanc|year of the snake|hms |ship|self-portrait|vanitas|nucleus|cell |polar bear|fantome|collier'|painting|oil on canvas|koons|sculpture|topiary|mack\b|bulldog hood|baseball|boné|bone\.jpg|stretcher|brancard|gardening|garden glove|pumpkin|jack-o|witch's hat \[b&w\]|observatory|dome|tower landmark|cherry|cerise|coccinelle|ladybug|ladybird|graine|seedling|chrysalide)\b/i

const FIXES = [
  {
    set: "secours",
    file: "chiot.jpg",
    note: "vrai chiot (pas sculpture Koons)",
    mustMatch: /puppy|puppies|chiot|welpe|retriever|beagle|labrador/i,
    titles: ["Golden Retriever puppy.jpg", "Beagle puppy.jpg", "Labrador Retriever puppy.jpg"],
  },
  {
    set: "secours",
    file: "collier.jpg",
    note: "collier de chien (objet)",
    mustMatch: /collar|halsband|collier|cuirs/i,
    titles: ["Leather dog collar made by Les cuirs d'Agathe (DSC07529).jpg"],
  },
  {
    set: "secours",
    file: "camion.jpg",
    note: "camion de pompiers",
    mustMatch: /fire|engine|truck|pompiers|firefighter/i,
    titles: ["Legacy red fire engine in Montreal (185953736).jpg", "Firetruck.jpg"],
  },
  {
    set: "secours",
    file: "tour.jpg",
    note: "tour de guet / observation",
    mustMatch: /tower|tour|lookout|watchtower|guet|semaphore/i,
    titles: ["Fire lookout tower.jpg", "Watchtower.jpg"],
  },
  {
    set: "secours",
    file: "os.jpg",
    note: "os pour chien (pas casquette)",
    mustMatch: /bone|chew|rawhide|os\b/i,
    titles: [
      "Wild dog chews a bone (30224946840).jpg",
      "Dreyfuss chews his rawhide bone.jpg",
      "Dog with rawhide chew toy.jpg",
    ],
  },
  {
    set: "secours",
    file: "echelle.jpg",
    note: "échelle (pas brancard)",
    mustMatch: /ladder|échelle|leiter/i,
    titles: [
      "WOODEN LADDER.jpg",
      "Wooden ladder @ Plaine des Tamarins.jpg",
      "Redundant Wooden Ladder - geograph.org.uk - 5112396.jpg",
    ],
  },
  {
    set: "secours",
    file: "sirene.jpg",
    note: "gyrophare véhicule",
    mustMatch: /lightbar|police|emergency|siren|beacon|ambulance/i,
    titles: [
      "Tokyo Police Lightbar.jpg",
      "Hokkaido Prefectural Police vehicle at traffic stop with lightbar raised.jpg",
      "Defender Code 3 ANPR lightbar - Flickr - Highway Patrol Images.jpg",
    ],
  },
  {
    set: "cerise",
    file: "noyau.jpg",
    note: "noyaux de cerise",
    mustMatch: /cherry|prunus|stone|pit|kirsch/i,
    titles: ["Cherry stone hoard.JPG"],
  },
  {
    set: "antarctique",
    file: "banquise.jpg",
    note: "banquise / pack ice",
    mustMatch: /pack ice|sea ice|antarctica|floe|banquise/i,
    titles: [
      "Antarctic mountains, pack ice and ice floes.jpg",
      "Antarctic Pack Ice (2220345436).jpg",
      "Kista Dan charging her way through pack ice (6433875665).jpg",
    ],
  },
  {
    set: "noel",
    file: "moufle.jpg",
    note: "moufles (pas gants de jardin)",
    mustMatch: /mitten|moufle|wool/i,
    titles: ["Canadian Mittens (9579797178).jpg", "001g. Woolen mittens.jpg"],
  },
  {
    set: "halloween",
    file: "chapeau.jpg",
    note: "chapeau de sorcière",
    mustMatch: /witch|hat|sorci|pointed/i,
    titles: ["Chapeau de sorcière pour Baby Globe.jpg"],
  },
  // abeilles — remplace les copies placeholder (cerise, coccinelle, graines…)
  {
    set: "abeilles",
    file: "abeille.jpg",
    note: "abeille mellifère",
    mustMatch: /apis mellifera|honey bee|european honey bee/i,
    titles: [
      "Apis mellifera flying mid-air.jpg",
      "Honey bee (Apis mellifera).jpg",
      "European honey bee (Apis mellifera).jpg",
    ],
  },
  {
    set: "abeilles",
    file: "ruche.jpg",
    note: "ruche / beehive",
    mustMatch: /beehive|bee hive|hive|ruche|skep/i,
    titles: ["Beehive.jpg", "Skep bee hive.jpg", "Langstroth hive.jpg"],
  },
  {
    set: "abeilles",
    file: "miel.jpg",
    note: "miel",
    mustMatch: /honey|miel/i,
    titles: ["Runny honey.jpg", "Jar of honey.jpg", "Honey jar.jpg"],
  },
  {
    set: "abeilles",
    file: "fleur.jpg",
    note: "fleur butinée",
    mustMatch: /sunflower|helianthus|flower|blossom|fleur/i,
    titles: [
      "Sunflower sky backdrop.jpg",
      "Helianthus annuus flower.jpg",
      "Yellow flower blossom.jpg",
    ],
  },
  {
    set: "abeilles",
    file: "pollen.jpg",
    note: "pollen",
    mustMatch: /pollen/i,
    titles: ["Bee covered in pollen.jpg", "Pollen on a bee.jpg", "Pollen.jpg"],
  },
  {
    set: "abeilles",
    file: "nectar.jpg",
    note: "abeille sur fleur (nectar)",
    mustMatch: /bee|apis|nectar|flower/i,
    titles: [
      "Honey bee on flower.jpg",
      "Apis mellifera on flower.jpg",
      "Bee collecting nectar.jpg",
    ],
  },
  {
    set: "abeilles",
    file: "couvain.jpg",
    note: "couvain dans la ruche",
    mustMatch: /brood|comb|larv|couvain|bee hive/i,
    titles: [
      "Honeycomb with brood.jpg",
      "Brood comb in bee hive.jpg",
      "Bee brood comb.jpg",
    ],
  },
  {
    set: "abeilles",
    file: "reine.jpg",
    note: "abeille reine",
    mustMatch: /queen bee|reine|apis mellifera queen/i,
    titles: ["Queen bee.jpg", "Marked queen bee.jpg", "Apis mellifera queen.jpg"],
  },
  {
    set: "abeilles",
    file: "ouvriere.jpg",
    note: "abeille ouvrière",
    mustMatch: /honey bee|apis mellifera|worker bee|bee on flower/i,
    titles: [
      "Honey bee on flower.jpg",
      "Apis mellifera on yellow flower.jpg",
      "European honey bee on flower.jpg",
    ],
  },
  {
    set: "abeilles",
    file: "cire.jpg",
    note: "cire d'abeille",
    mustMatch: /beeswax|cire|wax|honeycomb/i,
    titles: ["Beeswax.jpg", "Honeycomb.jpg", "Beeswax comb.jpg"],
  },
  {
    set: "abeilles",
    file: "bourdon.jpg",
    note: "bourdon",
    mustMatch: /bumblebee|bourdon|bombus/i,
    titles: ["Bumblebee.jpg", "Bombus terrestris.jpg", "Buff-tailed bumblebee.jpg"],
  },
  {
    set: "abeilles",
    file: "essaim.jpg",
    note: "essaim d'abeilles",
    mustMatch: /swarm|essaim|bee swarm/i,
    titles: ["Bee swarm.jpg", "Swarm of bees.jpg", "Honey bee swarm.jpg"],
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
    body = `# Crédits photos — nomenclature ${set}\n\nSource : Wikimedia Commons (réutilisation selon licence de chaque fichier).\n\n| Fichier | Sujet | Source Commons |\n|---------|-------|----------------|\n`
  }
  const lineRe = new RegExp(`\\| \\\`${file}\\\` \\|[^\\n]*\\n`)
  const row = `| \`${file}\` | ${note} | ${commons} |\n`
  if (lineRe.test(body)) body = body.replace(lineRe, row)
  else body = `${body.trimEnd()}\n${row}`
  writeFileSync(path, body)
}

async function main() {
  console.log(`Réparation de ${FIXES.length} photos…\n`)
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
