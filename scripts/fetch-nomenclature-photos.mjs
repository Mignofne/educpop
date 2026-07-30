/**
 * Télécharge les photos manquantes déclarées dans nomenclature-sets.ts
 * (pause anti-429 Commons). Skip si fichier > 3000 B déjà présent.
 *
 * Usage: node scripts/fetch-nomenclature-photos.mjs
 *        node scripts/fix-wrong-photos.mjs   # titres forcés (sujets corrigés)
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs"
import { join, dirname, basename } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const UA = "educpop-nomenclature-fetcher/1.7 (https://github.com/educpop; educational worksheets)"

/** Titres Commons candidats par fichier (basename) — fallback = recherche API */
const TITLES = {
  // animaux
  "lapin.jpg": ["European rabbit.jpg", "Oryctolagus cuniculus.jpg", "Rabbit.jpg"],
  "cerf.jpg": ["Red deer stag.jpg", "Cervus elaphus.jpg", "Red deer.jpg"],
  "blaireau.jpg": ["European badger.jpg", "Meles meles.jpg", "Badger.jpg"],
  "sanglier.jpg": ["Wild boar.jpg", "Sus scrofa.jpg"],
  "oiseau.jpg": ["European robin.jpg", "Erithacus rubecula.jpg", "Bird.jpg"],
  "chouette.jpg": ["Tawny owl.jpg", "Strix aluco.jpg", "Owl.jpg"],
  // moyen-age
  "bouclier.jpg": ["Medieval shield.jpg", "Heater shield.jpg"],
  "casque.jpg": ["Medieval helmet.jpg", "Great helm.jpg", "Historical firefighter helmet of Russia.jpg"],
  "tour.jpg": ["Castle tower.jpg", "Medieval tower.jpg"],
  "cheval.jpg": ["Horse.jpg", "Bay horse.jpg"],
  "trone.jpg": ["Throne.jpg", "Royal throne.jpg"],
  "pont-levis.jpg": ["Pont-levis.jpg", "Drawbridge.jpg"],
  // tournesol
  "petale.jpg": ["Sunflower petals.jpg", "Yellow petals.jpg"],
  "pollen.jpg": ["Bee covered in pollen.jpg", "Pollen.jpg"],
  "racine.jpg": ["Plant roots.jpg", "Tree roots.jpg"],
  "bourdon.jpg": ["Bumblebee.jpg", "Bombus terrestris.jpg"],
  "champ.jpg": ["Sunflower field.jpg", "Field of sunflowers.jpg"],
  "germe.jpg": ["Seedling.jpg", "Germinating seed.jpg"],
  // asie
  "temple.jpg": ["Kiyomizu-dera.jpg", "Japanese temple.jpg"],
  "lotus.jpg": ["Nelumbo nucifera.jpg", "Lotus flower.jpg"],
  // pirate
  "ile.jpg": ["Small island.jpg", "Tropical island.jpg"],
  "carte.jpg": ["Old map.jpg", "Antique map.jpg"],
  "ancre.jpg": ["Ship anchor.jpg", "Anchor.jpg"],
  "voile.jpg": ["Sail.jpg", "Ship sail.jpg"],
  "perroquet.jpg": ["Scarlet macaw.jpg", "Ara macao.jpg", "Parrot.jpg"],
  "vague.jpg": ["Ocean wave.jpg", "Breaking wave.jpg"],
  "phare.jpg": ["Lighthouse.jpg"],
  // secours
  "echelle.jpg": ["Ladder.jpg", "Extension ladder.jpg"],
  "sirene.jpg": ["Emergency lights.jpg"],
  "collier.jpg": ["Collar for a Hunting Dog MET sfsb29.150.154 003l.jpg"],
  "laisse.jpg": ["Dog on leash.jpg", "Dog leash.jpg"],
  "feu.jpg": ["Campfire.jpg", "Flame.jpg"],
  "eau.jpg": ["Running water.jpg", "Fresh water.jpg"],
  // nuit
  "etoile.jpg": ["Starry sky.jpg", "Milky Way.jpg"],
  "chauve-souris.jpg": ["Bat hanging.jpg", "Fruit bat.jpg", "Bat.jpg"],
  "nuit.jpg": ["Night sky.jpg", "Dark night.jpg"],
  "toit.jpg": ["Rooftop night.jpg", "Tile roof.jpg"],
  "lanterne.jpg": ["Paper lantern.jpg", "Oil lantern.jpg"],
  "masque.jpg": ["Carnival mask.jpg", "Venetian mask.jpg"],
  // chats
  "coussin.jpg": ["Cushion.jpg", "Pillow.jpg"],
  "lait.jpg": ["Bowl of milk.jpg", "Glass of milk.jpg"],
  "souris.jpg": ["House mouse.jpg", "Mus musculus.jpg"],
  "panier.jpg": ["Wicker basket.jpg", "Basket.jpg"],
  "fenetre.jpg": ["Window.jpg", "Open window.jpg"],
  // papillon
  "oeuf.jpg": ["Butterfly egg.jpg", "Ladybug eggs.jpg"],
  "antenne.jpg": ["Insect antennae.jpg", "Butterfly antennae.jpg"],
  "feuille.jpg": ["Green leaf.jpg", "Leaf.jpg"],
  "nectar.jpg": ["Butterfly on flower.jpg"],
  "prairie.jpg": ["Wildflower meadow.jpg", "Flower meadow.jpg"],
  // serpent
  "foret.jpg": ["Forest.jpg", "Dense forest.jpg"],
  "mue.jpg": ["Snake shed skin.jpg", "Shed snake skin.jpg"],
  "tete.jpg": ["Snake head.jpg", "Python head.jpg"],
  "oeil.jpg": ["Snake Eye - Flickr - Care SMC.jpg"],
  "nid.jpg": ["Snake eggs nest.jpg", "Python eggs.jpg"],
  "sable.jpg": ["Sand.jpg", "Desert sand.jpg"],
  "rocher.jpg": ["Rock.jpg", "Boulder.jpg"],
  // saisons
  "neige.jpg": ["Snow.jpg"],
  "pluie.jpg": ["Rain.jpg"],
  "nuage.jpg": ["Cloud.jpg"],
  "arbre.jpg": ["Tree.jpg"],
  "pomme.jpg": ["Apple.jpg"],
  "gland.jpg": ["Acorn.jpg", "Quercus robur acorn.jpg", "Acorns.jpg", "Oak acorns.jpg"],
  // coccinelle
  "coccinelle.jpg": ["Coccinella septempunctata.jpg", "Ladybug.jpg"],
  "abeille.jpg": ["Honey bee.jpg", "Apis mellifera.jpg"],
  "larve.jpg": ["Coccinellidae larva.jpg", "Ladybug larva.jpg"],
  "puceron.jpg": ["Aphid.jpg"],
  "jardin.jpg": ["Garden.jpg"],
  "herbe.jpg": ["Grass.jpg"],
  "nymphe.jpg": ["Coccinellidae pupa.jpg"],
  // cerise
  "cerise.jpg": ["Cherries.jpg", "Sweet cherry.jpg"],
  "fleur.jpg": ["Cherry blossom.jpg", "Flower.jpg"],
  "noyau.jpg": ["Cherry stone hoard.JPG"],
  "branche.jpg": ["Tree branch.jpg"],
  "tige.jpg": ["Cherries.jpg"],
  "oiseau.jpg": ["Bird on tree.jpg", "European robin.jpg"],
  "verger.jpg": ["Orchard.jpg", "Cherry orchard.jpg"],
  "petale.jpg": ["Cherry blossom petals.jpg", "White petals.jpg"],
  "soleil.jpg": ["Sun.jpg"],
  // antarctique
  "pingouin.jpg": ["Emperor penguin.jpg", "Penguin.jpg"],
  "phoque.jpg": ["Weddell seal.jpg", "Seal.jpg"],
  "baleine.jpg": ["Humpback whale.jpg", "Whale.jpg"],
  "igloo.jpg": ["Igloo.jpg"],
  "glace.jpg": ["Iceberg.jpg", "Sea ice.jpg"],
  "flocon.jpg": ["Snowflake.jpg"],
  "banquise.jpg": ["Sea ice.jpg"],
  "ciel.jpg": ["Blue sky.jpg", "Polar sky.jpg"],
  "krill.jpg": ["Antarctic krill.jpg", "Krill.jpg"],
  // afrique
  "lion.jpg": ["African lion.jpg", "Lion.jpg"],
  "elephant.jpg": ["African elephant.jpg", "Asian elephant.jpg"],
  "girafe.jpg": ["Giraffe.jpg"],
  "acacia.jpg": ["Acacia tree.jpg"],
  "baobab.jpg": ["Baobab.jpg", "Adansonia digitata.jpg"],
  "savane.jpg": ["African savanna.jpg", "Savannah.jpg"],
  "zebre.jpg": ["Zebra.jpg", "Plains zebra.jpg"],
  "hippopotame.jpg": ["Hippopotamus.jpg"],
  "rhinoceros.jpg": ["White rhinoceros.jpg", "Rhinoceros.jpg"],
  "autruche.jpg": ["Ostrich.jpg"],
  // ocean
  "poisson.jpg": ["Tropical fish.jpg", "Clownfish.jpg"],
  "coquillage.jpg": ["Seashell.jpg", "Conch shell.jpg"],
  "pieuvre.jpg": ["Octopus.jpg", "Common octopus.jpg"],
  "bateau.jpg": ["Sailboat.jpg", "Tall ship.jpg"],
  "mer.jpg": ["Ocean.jpg", "Sea.jpg"],
  "corail.jpg": ["Coral reef.jpg", "Coral.jpg"],
  "etoile-de-mer.jpg": ["Starfish.jpg", "Sea star.jpg"],
  "crabe.jpg": ["Crab.jpg", "Shore crab.jpg"],
  "algue.jpg": ["Seaweed.jpg", "Kelp.jpg"],
  "dauphin.jpg": ["Dolphin.jpg", "Bottlenose dolphin.jpg"],
  // halloween
  "citrouille.jpg": ["Pumpkin.jpg"],
  "fantome.jpg": ['Theatrical ghost costume for "Le Rossignol" MET DP804813.jpg'],
  "bonbon.jpg": ["Candy.jpg", "Sweets.jpg"],
  "lune.jpg": ["Full moon.jpg", "The Moon.jpg"],
  "araignee.jpg": ["Spider.jpg", "Garden spider.jpg"],
  "chat.jpg": ["Black cat.jpg", "Domestic cat.jpg"],
  "bougie.jpg": ["Candle.jpg", "Lit candle.jpg"],
  "chapeau.jpg": ["Witch's Hat (B&W) (2201747985).jpg"],
  "mais.jpg": ["Corn.jpg", "Maize ear.jpg"],
  // noel
  "sapin.jpg": ["Christmas tree.jpg"],
  "etoile.jpg": [
    "Gold star christmas ornament.jpg",
    "Red star christmas ornament.jpg",
    "Christmas star.jpg",
  ],
  "cadeau.jpg": [
    "Brown gift box with red ribbon and bow.jpg",
    "Gifts xmas.jpg",
    "Christmas Tree and Presents.jpg",
  ],
  "moufle.jpg": ["Gloves.jpg"],
  "chocolat.jpg": ["Hot chocolate.jpg"],
  "renne.jpg": ["Reindeer.jpg", "Rangifer tarandus.jpg"],
  "boule.jpg": ["Christmas bauble.jpg"],
  "guirlande.jpg": ["Christmas lights.jpg"],
  "cloche.jpg": ["Christmas bell.jpg"],
  "botte.jpg": ["Winter boots.jpg"],
  "buche.jpg": ["Firewood.jpg"],
  "tresor.jpg": [
    "Treasure Chest (3981686321).jpg",
    "Treasure chest, Jockey's Ridge Mini-Golf, Nags Head, North Carolina (LOC).jpg",
  ],
  "dragon.jpg": [
    "Dragon statue.jpg",
    "Dragon Dance 1.jpg",
    "Dragon Dance 2.jpg",
  ],
  // abeilles
  "ruche.jpg": ["Skep bee hive.jpg", "Beehive.jpg", "Langstroth hive.jpg"],
  "miel.jpg": ["Honey.jpg", "Honey jar.jpg"],
  "fleur.jpg": ["Sunflower flower.jpg", "Flower.jpg"],
  "nectar.jpg": ["Bee on flower.jpg", "Butterfly on flower.jpg"],
  "couvain.jpg": ["Bee brood comb.jpg", "Honeycomb with brood.jpg"],
  "reine.jpg": ["Queen bee.jpg", "Apis mellifera queen.jpg"],
  "ouvriere.jpg": ["Honey bee on flower.jpg", "Worker bee.jpg"],
  "cire.jpg": ["Beeswax.jpg", "Honeycomb.jpg"],
  "bourdon.jpg": ["Bumblebee.jpg", "Bombus terrestris.jpg"],
  "essaim.jpg": ["Bee swarm.jpg", "Swarm of bees.jpg"],
}

function missingFromSets() {
  const src = readFileSync(join(root, "lib/worksheets/nomenclature-sets.ts"), "utf8")
  const paths = [...src.matchAll(/src:\s*"(\/nomenclature\/[^"]+)"/g)].map((m) => m[1])
  const seen = new Set()
  const out = []
  for (const p of paths) {
    if (seen.has(p)) continue
    seen.add(p)
    const disk = join(root, "public", p.replace(/^\//, ""))
    if (!(existsSync(disk) && readFileSync(disk).length > 3000)) {
      const parts = p.split("/")
      out.push({ set: parts[2], file: parts[3], path: p })
    }
  }
  return out
}

async function resolveThumbUrl(title) {
  const fileTitle = title.startsWith("File:") ? title : `File:${title}`
  const api = new URL("https://commons.wikimedia.org/w/api.php")
  api.searchParams.set("action", "query")
  api.searchParams.set("titles", fileTitle)
  api.searchParams.set("prop", "imageinfo")
  api.searchParams.set("iiprop", "url|mime")
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
  api.searchParams.set("gsrlimit", "6")
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
      if (!/jpeg|png|webp/.test(mime)) return null
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
    : `# Crédits photos — nomenclature ${set}\n\nSource : Wikimedia Commons.\n\n| Fichier | Sujet | Source Commons |\n|---------|-------|----------------|\n`
  const lineRe = new RegExp(`\\| \\\`${file}\\\` \\|[^\\n]*\\n`)
  const row = `| \`${file}\` | ${file.replace(".jpg", "")} | ${commons} |\n`
  if (lineRe.test(body)) body = body.replace(lineRe, row)
  else body = `${body.trimEnd()}\n${row}`
  writeFileSync(path, body, "utf8")
}

async function fetchOne(item) {
  const dir = join(root, "public/nomenclature", item.set)
  mkdirSync(dir, { recursive: true })
  const dest = join(dir, item.file)
  const candidates = TITLES[item.file] || []

  for (const title of candidates) {
    try {
      await sleep(1100)
      const { url, title: resolved } = await resolveThumbUrl(title)
      await sleep(700)
      const bytes = await download(url, dest)
      console.log(`✓ ${item.set}/${item.file} ← ${resolved} (${bytes} B)`)
      appendCredit(item.set, item.file, resolved)
      return resolved
    } catch (e) {
      console.warn(`  · ${title}: ${e.message}`)
    }
  }

  const q = item.file.replace(".jpg", "").replace(/-/g, " ")
  try {
    await sleep(1200)
    for (const hit of await searchCommons(q)) {
      try {
        await sleep(700)
        const bytes = await download(hit.url, dest)
        console.log(`✓ ${item.set}/${item.file} ← search:${hit.title} (${bytes} B)`)
        appendCredit(item.set, item.file, hit.title)
        return hit.title
      } catch (e) {
        console.warn(`  · search ${hit.title}: ${e.message}`)
      }
    }
  } catch (e) {
    console.warn(`  · search fail: ${e.message}`)
  }

  console.error(`✗ ${item.set}/${item.file}`)
  return null
}

async function main() {
  const todo = missingFromSets()
  console.log(`Photos manquantes : ${todo.length}\n`)
  if (todo.length === 0) {
    console.log("Rien à télécharger.")
    return
  }
  let okN = 0
  let fail = 0
  for (const item of todo) {
    const r = await fetchOne(item)
    if (r) okN++
    else fail++
  }
  console.log(`\nTerminé. OK=${okN} échecs=${fail}`)
  if (fail > 0) process.exitCode = 1
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
