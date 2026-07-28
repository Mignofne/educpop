# Formats d’activités educpop (par âge)

**Statut :** obligatoire pour packs et génération IA  
**Esprit :** inspiration « apprendre ensemble » — voir [`ief-standard.md`](./ief-standard.md)  
**Style :** [`visual-standard-worksheets.md`](./visual-standard-worksheets.md)

## Principe

Un **thème** (ex. tournesols) se décline en **formats différents** selon l’âge.  
Même sujet ≠ mêmes pages. La difficulté, le type d’activité et le vocabulaire changent.

**Produit catalogue = pack** (5–8 activités). Pas de fiche pédagogique isolée dans la bibliothèque.

### Livret co-schooling (variante pack)

Format court **parent + enfant** : slug `pack-livret-<theme>-<age>`, **`pageCount` = nombre d’activités** (5–8, sans page couverture en v1). Formats distincts par tranche (ex. **1–2** : oral, coloriage, couleurs, son, tri 2 couleurs, même/différent ; **6–7** : 8 formats logique/compréhension) ; encart « Le savais-tu ? » + question à discuter sur chaque page via `LivretActivityFrame`. Voir [`livret-standard.md`](./livret-standard.md).

## Matrice des formats

| Format | 2–3 | 4–5 | 6–7 | 8–10 | Intention |
|--------|:---:|:---:|:---:|:----:|-----------|
| Coloriage grand format | ● | ○ | — | — | Sensoriel, oral |
| Tracé / chemin (gros) | ● | ● | ○ | ○ | Motricité fine |
| Symétrie (avec / sans guide) | ○ | ● | ● | ● | Observation spatiale |
| Nomenclature (oral → associer → écrire) | ● oral | ● collé | ● séparé | ● + écrire | Vocabulaire |
| Anatomie (étiquettes) | — | ● 4–5 parties | ● + racines | ● termes précis | Observer / nommer juste |
| Syllabes MAJUSCULES | — | ● 1 trou | ● 2 trous + leurres | ○ | Lecture |
| Écriture majuscules + cursive | — | ● court | ● | ● + phrases | Graphisme |
| **Cycle de vie — mode ronde + étiquettes** | — | **●** | ○ | — | Séquencer, coller |
| Cycle de vie — cartes à ordonner | — | — | ● | ● + raconter | Logique temporelle |
| **Mots croisés** | — | — | — | **●** | Lecture + raisonnement |
| **Mots fléchés / définitions** | — | — | — | **●** | Vocabulaire autonome |
| **Vrai / faux (sciences)** | — | — | ○ | **●** | Esprit critique doux |
| Texte à trous / petite lecture | — | — | ○ | ● | Compréhension |
| Frise / classification | — | — | ○ | ● | Structurer |

● = format cœur de la tranche · ○ = optionnel · — = hors cible

## Pourquoi ces choix (inspiration famille)

| Âge | Ce qui marche | À éviter |
|-----|---------------|----------|
| **2–3** | Gros, oral, peu d’écrit, adulte médiateur | Grilles, consignes longues, découpage fin seul |
| **4–5** | Coller, nommer, 1 consigne claire, cycle **visuel** (rond) | Mots croisés, jargon, autonomie totale |
| **6–7** | Défi mesuré (2 trous, leurres), ordonner, écrire plus | Exercices « collège », grilles denses |
| **8–10** | Croisés, fléchés, vrai/faux, phrases, termes justes | Babyfication, même page qu’en 4–5 |

## Taille d’un pack (obligatoire)

| Règle | Valeur |
|-------|--------|
| **Minimum** | **5 activités** (hors page de couverture) |
| **Maximum** | **8 activités** (hors couverture) |
| Pages imprimées | couverture + 5 à 8 = **6 à 9 pages** |

Si un pack a moins de 5 activités → le compléter (ne pas publier).  
Si plus de 8 → scinder ou fusionner des pages.

### Catalogue public = packs uniquement

La bibliothèque (`lib/activities.ts`) ne liste **que des packs**.  
Les fiches composantes (anatomie, drapeaux, syllabes, roue des saisons, tracés…) **ne sont pas** des produits solo : elles vivent **à l’intérieur** d’un pack thématique, décliné par âge.

**Thèmes animaux = un sujet dédié** (ex. `pack-papillon-*`, `pack-serpent-*`, `pack-coccinelle-*`).  
**Interdit** : un pack fourre-tout « Les animaux » qui mélange plusieurs espèces / solos (coccinelle + cartes zoo + syllabes génériques).

| Interdit en catalogue | OK |
|-----------------------|-----|
| Fiche isolée « anatomie de la coccinelle » | Même anatomie dans `pack-coccinelle-*` |
| Fiche isolée « drapeaux du monde » | Même fiche dans `pack-continents-*` |
| Pack « Les animaux » grab-bag | Packs dédiés papillon / serpent / coccinelle… |
| Contenu générique tous-âges en solo | Packs 2–3 / 4–5 / 6–7 / 8–10 distincts |

## Formats à prioriser dans un pack thématique

### Pack type 4–5
1. Anatomie simple  
2. Nomenclature  
3. Syllabes légères  
4. Tracé  
5. Symétrie guidée  
6. Écriture courte  
7. **Cycle rond + étiquettes à coller**

### Pack type 8–10
1. Anatomie vocabulaire riche  
2. Nomenclature + production écrite  
3. **Mots croisés**  
4. **Mots fléchés + vrai/faux** (ou texte à trous)  
5. Symétrie / observation fine  
6. Phrases  
7. Cycle à raconter (écriture)

## Implémentation code

| Format | Composant / pattern |
|--------|---------------------|
| Cycle rond 4–5 | `sunflower-lifecycle-circle.tsx` |
| Cycle cartes 6–10 | `sunflower-lifecycle.tsx` |
| Mots croisés | `sunflower-crossword.tsx` (modèle à généraliser) |
| Défis fléchés / V-F | `sunflower-challenges.tsx` |
| Pack orchestration | `pack-tournesols.tsx` + `age` |

Nouveau thème = **réutiliser ces formats**, pas inventer une page « générique tous âges ».

## Checklist avant publication d’un pack

- [ ] **5 à 8 activités** (hors couverture)
- [ ] **Pas de fiche solo** au catalogue (`lib/activities.ts` = packs only)
- [ ] Au moins un format **distinctif** de la tranche (rond 4–5, croisés 8–10…)  
- [ ] Pas de copie 4–5 collée en 8–10  
- [ ] Syllabes en MAJUSCULES ; écriture = majuscules + cursive dès 4–5  
- [ ] Style Tullet / pictos SVG (sauf **nomenclature = photos Commons**)  
- [ ] Nomenclature : `NomenclatureCards` + `CREDITS.md`  
- [ ] Pas de label marketing « kit IEF » sur la fiche  
- [ ] `pnpm validate:worksheets` OK  

---

_educpop · formats par âge · apprendre ensemble_
