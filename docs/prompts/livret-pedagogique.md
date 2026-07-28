# Prompt master — Livret pédagogique educpop

> Variante interne pour générer des **livrets** imprimables A4 co-schooling parent-enfant.  
> **Standard canonique :** [`docs/livret-standard.md`](../livret-standard.md)  
> Ne pas afficher le label « IEF » sur le produit public.

## Variables

| Variable | Valeur |
|----------|--------|
| **THÈME** | ex. Les abeilles |
| **TRANCHE D'ÂGE** | 1–2 · 2–3 · 4–5 · 6–7 · 8–10 |

## Objectif global

Livret PDF A4, 100 % papier, progressif, inclusif, scientifiquement rigoureux, co-schooling parent-enfant.

## Exigence scientifique

Distinguer systématiquement :

- **Fait établi** (`fact`)
- **Hypothèse scientifique** (`hypothesis`)
- **Zone d'incertitude** (`uncertain`)

Pas de stéréotypes de genre simplistes.

## Structure v1 (prototype abeilles — format court)

**8 pages = 8 activités.** Pas de couverture, intro parents ni clôture en v1 (trop long à imprimer).

1. **8 activités** — chacune = **un format différent** (matrices ci-dessous + [`activity-formats.md`](../activity-formats.md))
2. Chaque page = fiche enfant + **encart bas** (voir ci-dessous)

> Composants couverture / intro / clôture existent dans le code pour une **v2 longue** — ne pas les inclure par défaut.

## Format de chaque activité (métadonnées)

Chaque activité exporte un objet `LivretActivityMeta` (`lib/livret/types.ts`) :

- Titre · Type pédagogique · Objectif · Compétences · Matériel
- **Consigne enfant** (courte, langage adapté à l'âge)
- Déroulement pas à pas · Variante facile · Variante difficile (optionnel en v1)
- Ce que l'enfant apprend réellement (`learns`)
- « Le savais-tu ? » — `scientificNote: { kind, text }`
- Co-schooling : **1 question ouverte** minimum (`parentQuestions[0]` utilisée à l'impression)

### Rendu print (`LivretActivityFrame`)

- Fiche enfant (consigne + activité)
- Encart bas de page :
  - **Le savais-tu ?** — fait / hypothèse / incertitude
  - **À discuter :** — une question

Pas de page parents séparée par activité.

## Banques de formats par âge

### 1–2 ans (oral, sensoriel)

nomenclature **oral** (5 cartes) · coloriage grand format · association **couleurs** · son / imitation · tri **2 couleurs** · même / différent

### 2–3 ans (sensoriel)

carte nomenclature simple · coloriage guidé · collage · pointage · tri visuel (2 cat.) · image à compléter · association image-identique · mini cherche et trouve

### 4–5 ans (classification + langage)

nomenclature enrichie · coloriage codé · tri catégories · labyrinthe · relier image↔fonction · séquence images · cherche et trouve · puzzle papier

### 6–7 ans (logique + compréhension)

coloriage codé · nomenclature · schéma légendé · classification · frise chronologique · séquence / reconstitution d'histoire · vrai/faux · mots croisés simples

### 8–10 ans (analyse)

texte documentaire + questions ouvertes · débat guidé · carte mentale · comparaison de sources · hypothèses scientifiques · frise détaillée · mini enquête · argumentation

## Règles de construction

- 8 activités = **8 formats différents**
- Progression simple → complexe
- Adaptation stricte à l'âge
- Syllabes en **MAJUSCULES** ; écriture majuscules + cursive dès 4–5
- **1 page max par activité** en v1
- Illustrations = pictos SVG outline educpop ; nomenclature = photos Commons
- Consignes sans flèches `→`, sans jargon

## Mise en page

- A4 imprimable, noir et blanc privilégié
- Grandes zones d'écriture
- `LivretActivityFrame` + accents couleur educpop (style Tullet)

## Implémentation technique (educpop)

| Fichier | Rôle |
|---------|------|
| `lib/livret/types.ts` | Types métadonnées |
| `components/worksheets/livret/livret-activity-frame.tsx` | Cadre activité + encart |
| `components/worksheets/livret/livret-nomenclature-grid.tsx` | Nomenclature 8 photos |
| `components/worksheets/livret/*` | Couverture, intro, clôture (v2 — non utilisés en v1) |
| `components/worksheets/pack-livret-<theme>.tsx` | Contenu thématique |
| `lib/activities.ts` | Entrée catalogue `pack-livret-*` |
| `activity-worksheet.tsx` | Routage |

**Catalogue livret :**

- Slug : `pack-livret-<theme>-<age>`
- **`pageCount` = nombre d'activités** (5 à 8) — pas de +1 pour couverture
- Validateur : slugs `*livret*` acceptent `pageCount` dans **[5, 8]**

## Prototypes de référence

### Abeilles 1–2

- **Slug :** `pack-livret-abeilles-1-2`
- **Fichier :** `pack-livret-abeilles-1-2.tsx`
- **Détail complet :** [`docs/livret-standard.md`](../livret-standard.md#référence--livret-abeilles-1-2)
- **6 formats 1–2 :** nomenclature oral (5 cartes) · coloriage grand format · association couleurs · son / imitation · tri 2 couleurs · même / différent

### Abeilles 6–7

- **Slug :** `pack-livret-abeilles-6-7`
- **Fichier :** `pack-livret-abeilles.tsx`
- **Détail complet :** [`docs/livret-standard.md`](../livret-standard.md#référence--livret-abeilles-6-7)
- **8 formats 6–7 :** coloriage codé · nomenclature 8 photos · schéma ruche légendé · classification vivant/non · frise cycle (mélangée) · séquence butineuse (mélangée) · vrai/faux (3) · mots croisés croisés

## Ton

Chaleureux, intelligent, non infantilisant, encourageant, scientifique.
