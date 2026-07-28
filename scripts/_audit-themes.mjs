import { readFileSync } from "fs"

const src = readFileSync("lib/activities.ts", "utf8")
const blocks = [
  ...src.matchAll(
    /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?themes:\s*\[([^\]]+)\][\s\S]*?season:\s*"([^"]+)"/g,
  ),
]
for (const [, slug, title, themes, season] of blocks) {
  console.log(`${slug}|${title}|${themes.replace(/\s/g, "")}|${season}`)
}
console.log("TOTAL:", blocks.length)
