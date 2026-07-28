import type { AgeGroup, PackAgeGroup } from "@/lib/activities"
import { AGE_LABELS } from "@/lib/activities"
import { AnatomySheet } from "./anatomy-sheet"
import { BeePath } from "./bee-path"
import { PackCover } from "./pack-cover"
import { SunflowerBeeColoring } from "./sunflower-bee-coloring"
import { SunflowerChallenges } from "./sunflower-challenges"
import { SunflowerColoring } from "./sunflower-coloring"
import { SunflowerCrossword } from "./sunflower-crossword"
import { SunflowerLifecycle } from "./sunflower-lifecycle"
import { SunflowerLifecycleCircle } from "./sunflower-lifecycle-circle"
import { SunflowerSyllables } from "./sunflower-syllables"
import { SunflowerSymmetry } from "./sunflower-symmetry"
import { SunflowerVocab } from "./sunflower-vocab"
import { SunflowerWriting } from "./sunflower-writing"

/** Règle produit : 5 ≤ activités ≤ 8 (hors couverture) */
const PACK_META: Record<PackAgeGroup,
  { subtitle: string; themeLine: string; contents: string[]; activityCount: number }
> = {
  "2-3": {
    subtitle: "Pack sensoriel — à vivre avec un adulte",
    themeLine: "Botanique · Été · Gros gestes",
    contents: [
      "1. Grand coloriage tournesol",
      "2. L'abeille et le tournesol",
      "3. Cartes à nommer (oral)",
      "4. Aide l'abeille (tracé)",
      "5. Moitié manquante (simple)",
    ],
    activityCount: 5,
  },
  "4-5": {
    subtitle: "Pack découverte — 7 activités",
    themeLine: "Botanique · Été · Lecture & observation",
    contents: [
      "1. Anatomie — 5 parties",
      "2. Cartes image + mot",
      "3. Syllabes (1 trou)",
      "4. Aide l'abeille",
      "5. Moitié manquante (avec guide)",
      "6. J'écris 3 mots",
      "7. Cycle de vie en rond + étiquettes",
    ],
    activityCount: 7,
  },
  "6-7": {
    subtitle: "Pack lecture & observation — version défi",
    themeLine: "Botanique · Été · Lecture & sciences",
    contents: [
      "1. Anatomie détaillée — 6 parties",
      "2. Nomenclature à associer (séparée)",
      "3. Défi syllabes (2 trous + leurres)",
      "4. Chemin secret de l'abeille",
      "5. Symétrie sans guide",
      "6. Écriture — 5 mots",
      "7. Cycle de vie (cartes à ordonner)",
    ],
    activityCount: 7,
  },
  "8-10": {
    subtitle: "Pack autonomie — défis & sciences",
    themeLine: "Botanique · Été · Raisonnement & écriture",
    contents: [
      "1. Anatomie (capitule, ligules…)",
      "2. Nomenclature + écrire",
      "3. Mots croisés du jardin",
      "4. Défis : mots fléchés + vrai/faux",
      "5. Symétrie précise",
      "6. Écriture + phrases",
      "7. Cycle de vie à raconter",
    ],
    activityCount: 7,
  },
}

/** Pack multi-pages « Les tournesols » — contenu décliné par âge */
export function PackTournesols({ age }: { age: PackAgeGroup }) {
  const meta = PACK_META[age]

  return (
    <div className="flex flex-col gap-10 print:gap-0">
      <PackCover
        title="Les tournesols"
        subtitle={meta.subtitle}
        ages={AGE_LABELS[age]}
        themeLine={meta.themeLine}
        contents={meta.contents}
      />

      {age === "2-3" ? (
        <>
          <SunflowerColoring />
          <SunflowerBeeColoring />
          <SunflowerVocab age={age} />
          <BeePath age={age} />
          <SunflowerSymmetry age={age} />
        </>
      ) : age === "4-5" ? (
        <>
          <AnatomySheet slug="anatomie-du-tournesol" age={age} />
          <SunflowerVocab age={age} />
          <SunflowerSyllables age={age} />
          <BeePath age={age} />
          <SunflowerSymmetry age={age} />
          <SunflowerWriting age={age} />
          <SunflowerLifecycleCircle />
        </>
      ) : age === "6-7" ? (
        <>
          <AnatomySheet slug="anatomie-du-tournesol" age={age} />
          <SunflowerVocab age={age} />
          <SunflowerSyllables age={age} />
          <BeePath age={age} />
          <SunflowerSymmetry age={age} />
          <SunflowerWriting age={age} />
          <SunflowerLifecycle age={age} />
        </>
      ) : (
        <>
          <AnatomySheet slug="anatomie-du-tournesol" age={age} />
          <SunflowerVocab age={age} />
          <SunflowerCrossword />
          <SunflowerChallenges />
          <SunflowerSymmetry age={age} />
          <SunflowerWriting age={age} />
          <SunflowerLifecycle age={age} />
        </>
      )}
    </div>
  )
}
