# Standard livret educpop

**Rôle :** source de vérité pour concevoir et implémenter les **livrets co-schooling**  
**Référence code :** `components/worksheets/pack-livret-abeilles.tsx`  
**Prompt IA :** [`prompts/livret-pedagogique.md`](./prompts/livret-pedagogique.md)  
**Formats par âge :** [`activity-formats.md`](./activity-formats.md) · inspiration générale [`ief-standard.md`](./ief-standard.md)

---

## Esprit

Un livret educpop est un **pack court à vivre à deux** (parent + enfant), 100 % papier, scientifiquement honnête, sans ton scolaire punitif.

- **Moment partagé** — l’adulte médie, questionne, observe ; l’enfant manipule, colorie, écrit.
- **Juste milieu pédagogique** — consignes **courtes**, langage adapté (ex. 6 ans : pas de flèches `→`, pas de jargon).
- **Rigueur douce** — distinguer fait établi, hypothèse, zone d’incertitude dans « Le savais-tu ? ».
- **Pas de label « IEF »** sur le produit public (docs internes seulement).

---

## Livret vs pack classique

| | Pack classique | Livret (v1) |
|---|----------------|-------------|
| **Pages catalogue** | couverture + 5–8 activités | **1 page = 1 activité** (pas de couverture / intro / clôture séparées) |
| **`pageCount`** | `1 + activités` | **`= nombre d’activités`** (5 à 8) |
| **Co-schooling** | « Le savais-tu ? » sur certaines fiches | **Encart bas de page** sur chaque activité |
| **Slug** | `pack-<theme>-<age>` | `pack-livret-<theme>-<age>` |

Le validateur (`scripts/validate-worksheet-content.mjs`) traite les slugs `*livret*` à part : `pageCount` doit être dans **[5, 8]**, une page par activité.

Composants couverture / intro parents / clôture existent (`components/worksheets/livret/livret-cover.tsx`, etc.) — **réservés à une v2 plus longue**. Le prototype abeilles 6–7 n’en utilise pas.

---

## Structure v1 (8 pages = 8 activités)

1. **Huit activités distinctes** — huit **formats différents** (voir matrices par âge dans le prompt livret).
2. **Progression** simple → plus exigeant.
3. **Une page A4** par activité (1–2 pages max si vraiment nécessaire — éviter en v1).
4. **Encart pédagogique intégré** via `LivretActivityFrame` — pas de page parents séparée (trop long à imprimer).

### Encart bas de page (`LivretActivityFrame`)

Chaque activité affiche en bas de fiche :

- **Pied de page** — `themeLabel` + `index/activityCount` (ex. « Les abeilles · 3/8 ») ; passer ces props depuis le pack thématique
- **Le savais-tu ?** — texte + kind : `fact` | `hypothesis` | `uncertain`
- **À discuter :** — **une seule** question ouverte (`parentQuestions[0]`)

Les métadonnées complètes (`LivretActivityMeta`) restent dans le code pour génération IA et évolutions ; seul cet encart court est imprimé en v1.

---

## Référence — livret abeilles 1–2

**Slug :** `pack-livret-abeilles-1-2` · **Fichier :** `pack-livret-abeilles-1-2.tsx` · **`pageCount` :** 6

| # | Format | Points clés |
|---|--------|-------------|
| 1 | Nomenclature (oral) | **5 photos** — `LivretNomenclatureToddler` ; nommer à voix haute, pas de découpage |
| 2 | Coloriage grand format | Pictos outline abeille + fleur ; gros gestes, libre |
| 3 | Association couleurs | Image ↔ pastilles couleur (abeille, fleur, ruche) |
| 4 | Son / imitation | Photos + imiter bzzz / silence |
| 5 | Tri 2 couleurs | Jaune ou noir sur les parties de l’abeille |
| 6 | Même / différent | Pareil ou pas pareil entre deux pictos |

---

## Référence — livret abeilles 6–7

**Slug :** `pack-livret-abeilles-6-7` · **Fichier :** `pack-livret-abeilles.tsx` · **`pageCount` :** 8

| # | Format | Points clés |
|---|--------|-------------|
| 1 | Coloriage codé (additions) | **Vrai coloriage** : scène pictos outline + **légende couleurs dans un panneau séparé** ; zones numérotées avec additions sur la scène (pas de pseudo-coloriage = cases génériques sans scène) |
| 2 | Nomenclature | **8 photos** Wikimedia Commons (`LivretNomenclatureGrid`) — sous-ensemble d’un set nomenclature 12 cartes ; mots à découper en bas |
| 3 | Schéma légendé | Grand picto (`PictoHive` ruche en skep, pas gâteau) + **grandes zones d’écriture** |
| 4 | Classification | Vivant / non vivant — cases à colorier, explication à voix haute |
| 5 | Frise (cycle de vie) | Cartes **mélangées** (ordre fixe en code, ex. `[2,0,3,1]`) — l’enfant numérote |
| 6 | Séquence (histoire) | Cartes **mélangées** — journée d’une butineuse, même pattern |
| 7 | Vrai / faux | **3 items** — boutons VRAI / FAUX |
| 8 | Mots croisés | Grille où les mots **se croisent vraiment** (vérifier les intersections en code) |

---

## Banques de formats par âge

Alignées sur [`prompts/livret-pedagogique.md`](./prompts/livret-pedagogique.md) :

| Âge | Formats typiques |
|-----|------------------|
| **1–2** | Nomenclature oral (5 cartes), coloriage grand format, association couleurs, son / imitation, tri 2 couleurs, même / différent |
| **2–3** | Nomenclature simple, coloriage guidé, collage, pointage, tri 2 cat., image à compléter, association identique, mini cherche-et-trouve |
| **4–5** | Nomenclature enrichie, coloriage codé, tri catégories, labyrinthe, relier image↔fonction, séquence images, cherche-et-trouve, puzzle papier |
| **6–7** | Mini texte + questions, vrai/faux, frise, mots croisés simples, image légendée, classification, reconstitution d’histoire, observation |
| **8–10** | Texte documentaire, débat, carte mentale, comparaison sources, hypothèses, frise détaillée, mini enquête, argumentation |

**Règle :** les 8 activités d’un livret = **8 formats différents**, adaptés strictement à la tranche.

---

## Visuel

- **Pictos educpop outline** — `PictoBee`, `PictoHive` (skep), `PictoSunflower`, etc. Pas de primitives géométriques seules quand un picto thème existe.
- **Nomenclature** — photos **Wikimedia Commons** uniquement ; crédits dans `public/nomenclature/<theme>/CREDITS.md` ; scripts de réparation si besoin.
- **Style** — [`visual-standard-worksheets.md`](./visual-standard-worksheets.md) : bordures épaisses, accents couleur, fond crème `#fffdf7`.
- **No emoji** sur les fiches (`emojiFree: true` au catalogue).

---

## Ton des consignes

| OK | Éviter |
|----|--------|
| « Colorie avec la bonne couleur. » | « Résous → colorie selon la légende → vérifie. » |
| « Les cartes sont mélangées. Numérote de 1 à 4. » | Jargon (« métacognition », « tri taxonomique ») |
| « Explique à voix haute. » | Consignes en 5 étapes numérotées |
| Syllabes et mots croisés en **MAJUSCULES** | Infantilisation ou ton correcteur |

Écriture : majuscules + **cursive** dès 4–5 (aligné packs).

---

## Implémentation technique

| Élément | Emplacement |
|---------|-------------|
| Types métadonnées | `lib/livret/types.ts` — `LivretActivityMeta`, `LivretSpec` |
| Cadre activité + encart | `components/worksheets/livret/livret-activity-frame.tsx` |
| Grille nomenclature 8 photos | `components/worksheets/livret/livret-nomenclature-grid.tsx` |
| Contenu thématique | `components/worksheets/pack-livret-<theme>.tsx` |
| Catalogue | `lib/activities.ts` — entrée `pack-livret-*`, `type: "pack"` |
| Routage | `components/worksheets/activity-worksheet.tsx` |

### Checklist nouveau livret

- [ ] Slug `pack-livret-<theme>-<age>` et `pageCount` = nombre d’activités (5–8)
- [ ] `activityCount` exporté cohérent (validateur lit `pack-livret-*.tsx`)
- [ ] 8 formats **distincts** pour la tranche
- [ ] Chaque activité dans `LivretActivityFrame` avec `themeLabel`, `activityCount`, `scientificNote` ou `learns` + au moins 1 `parentQuestions`
- [ ] Consignes courtes, langage âge
- [ ] Pictos outline ; nomenclature = 8 photos + CREDITS
- [ ] Frises / séquences : cartes **mélangées** (shuffle fixe documenté)
- [ ] Mots croisés : croisements vérifiés en commentaire code
- [ ] `pnpm validate:worksheets` OK
- [ ] Pas de label « IEF » sur la fiche imprimée

---

## Ce qu’on n’imprime pas en v1

- Page intro parents dédiée (`livret-parent-intro.tsx`)
- Page parents par activité (`livret-activity-parent-page.tsx`)
- Couverture / clôture / diplôme (`livret-cover.tsx`, `livret-closing.tsx`)

Ces composants restent disponibles pour une **v2 livret long** ; ne pas les ajouter sans décision produit explicite.

---

_educpop · livret co-schooling · prototype abeilles 6–7_
