import type { AgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { PackCover } from "./pack-cover"
import { MoyenAgeBlason } from "./moyen-age-blason"
import { MoyenAgeChallenges } from "./moyen-age-challenges"
import { MoyenAgeColoring } from "./moyen-age-coloring"
import { MoyenAgePath } from "./moyen-age-path"
import { MoyenAgeSyllables } from "./moyen-age-syllables"
import { MoyenAgeVocab } from "./moyen-age-vocab"
import { MoyenAgeWriting } from "./moyen-age-writing"
import { PictoCastle } from "./art/pictos-moyen-age"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const META: Record<
  Exclude<AgeGroup, "2-3">,
  { subtitle: string; contents: string[]; activityCount: number }
> = {
  "4-5": {
    subtitle: "Pack découverte — châteaux & chevaliers",
    contents: [
      "1. Coloriage du château",
      "2. Cartes de nomenclature",
      "3. Chemin du chevalier",
      "4. J'écris 3 mots",
      "5. Je colorie mon blason",
    ],
    activityCount: 5,
  },
  "6-7": {
    subtitle: "Pack lecture & histoire",
    contents: [
      "1. Nomenclature à associer",
      "2. Chemin zigzag + CHATEAU",
      "3. Syllabes du château",
      "4. Écriture — 4 mots",
      "5. Blason en miroir",
      "6. Remets l'histoire en ordre",
    ],
    activityCount: 6,
  },
  "8-10": {
    subtitle: "Pack autonomie — défis Moyen Âge",
    contents: [
      "1. Nomenclature + écrire",
      "2. Chemin défi",
      "3. Syllabes du château",
      "4. Écriture + phrases",
      "5. Blason + nom de maison",
      "6. Ordre + vrai/faux",
    ],
    activityCount: 6,
  },
}

export function PackMoyenAge({ age }: { age: Exclude<AgeGroup, "2-3"> }) {
  const meta = META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="Le Moyen Âge"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine="Histoire · Châteaux · Vocabulaire"
        contents={meta.contents}
        accent="sky"
        Hero={PictoCastle}
      />

      {age === "4-5" ? (
        <>
          <MoyenAgeColoring />
          <MoyenAgeVocab age={age} />
          <MoyenAgePath hard={false} />
          <MoyenAgeWriting age={age} />
          <MoyenAgeBlason age="4-5" />
        </>
      ) : age === "6-7" ? (
        <>
          <MoyenAgeVocab age={age} />
          <MoyenAgePath hard />
          <MoyenAgeSyllables />
          <MoyenAgeWriting age={age} />
          <MoyenAgeBlason age="6-7" />
          <MoyenAgeChallenges age="6-7" />
        </>
      ) : (
        <>
          <MoyenAgeVocab age={age} />
          <MoyenAgePath hard />
          <MoyenAgeSyllables />
          <MoyenAgeWriting age={age} />
          <MoyenAgeBlason age="8-10" />
          <MoyenAgeChallenges age="8-10" />
        </>
      )}
    </div>
  )
}
