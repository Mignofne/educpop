# Standard visuel — fiches imprimables educpop

**Statut :** obligatoire pour toute fiche / pack / génération IA  
**Inspiration :** Hervé Tullet (Press Here, Mix It Up…) — **esprit**, pas copie d’œuvres  
**Objectif :** qualité constante sans relecture page par page  
**Pédagogie :** inspiration famille + déclinaison âge — [`ief-standard.md`](./ief-standard.md) (pas de label « kit IEF » sur les fiches)

## Promesse

Chaque page imprimable doit paraître **arty, pop, joyeuse, tactile** : grands gestes, formes simples, traits épais, couleurs franches. Si ça pourrait passer pour un worksheet générique “clipart école” ou un rendu IA violet, **c’est hors standard**.

## Interdit

| Interdit | Pourquoi |
|----------|----------|
| Emoji Unicode | Rendu print irrégulier, pas “marque” |
| Photos / réalisme **hors nomenclature** | Hors esprit Tullet — coloriage, chemins, anatomie, couvertures restent en **SVG** |
| Traits fins & détails | Illisible à l’impression enfant |
| Stickers / badges flottants sur le dessin | Bruit |
| Texte placeholder trompeur (« à colorier » sur un emoji déjà coloré) | Confiance cassée |
| Style Milestory / copie d’exemples PDF | Inspiration structure seulement |
| Dégradés complexes, glow, ombres soft UI | Trop “app”, pas papier |
| Images stock payantes / IA bitmap | Licence & qualité — nomenclature = Commons uniquement |

## Exception obligatoire — nomenclature

Les **cartes de nomenclature** utilisent des **photos réelles libres de droit** (Wikimedia Commons) :

| Règle | Détail |
|-------|--------|
| Dossier | `public/nomenclature/<set>/` + `CREDITS.md` |
| Composant | `NomenclatureCards` (`components/worksheets/nomenclature-cards.tsx`) |
| Données | `lib/worksheets/nomenclature-sets.ts` |
| Guide | `public/nomenclature/README.md` |
| Fetch | `node scripts/fetch-nomenclature-photos.mjs` |
| Cadre photo | **Carré** (`aspect-square`), `object-contain` sur fond `#fffdf7` — sujet entier visible, pas de recadrage |
| Étiquettes | Bordure pointillée, police display en **gras**, taille lisible au découpage |

Pictos SVG **interdits** sur les fiches de nomenclature (OK ailleurs : cover, chemins, écriture).

## Obligatoire

| Règle | Détail |
|-------|--------|
| Contour | Trait **ink** épais (≈ 2.5–4 px viewBox enfant) |
| Formes | Cercles, ovales, blobs, points — peu de segments |
| Taille | Un motif dominant par zone ; pas de micro-détails |
| Couleur écran / cartes | Flat : `sun`, `berry`, `sky`, `leaf`, `tangerine` + blanc |
| Pages à colorier | Fond blanc / crème, **contour ink**, intérieur vide ou très pâle |
| Chrome page | `WorksheetFrame` : titre Fredoka, prénom, date, footer educpop |
| Source art | Uniquement SVG dans `components/worksheets/art/` (ou nouveau picto ajouté là) |
| Écriture | Lignes **majuscules** (imprimerie) + **cursive** (police `--font-cursive` / Caveat) — pas de ligne « minuscules script » |
| Syllabes | Toujours en **MAJUSCULES** (mot à trous + banque) |
| Anatomie | Parties **spécifiques au sujet** (pas un modèle générique fleur/tige/feuille). Encadré « Le savais-tu ? » IEF. Vocabulaire juste + accessible à l’âge — voir aussi [`ief-standard.md`](./ief-standard.md) |

## Deux modes d’illustration

1. **`color`** — pictos pop remplis (couverture, bulles, chemins)  
2. **`outline`** — contour à colorier (anatomie, symétrie, chemins)  
3. **`photo`** — nomenclature uniquement (`public/nomenclature/`)

Jamais mélanger emoji + SVG sur la même fiche.

## Checklist avant de shipper une fiche

- [ ] Aucun emoji
- [ ] Nomenclature = photos Commons (pas pictos) ; ailleurs = pas d’image stock / IA
- [ ] Traits épais, formes larges
- [ ] Couleurs = tokens brand uniquement (hors photos nomenclature)
- [ ] Consigne claire, sans placeholder mort
- [ ] Prénom + Date présents
- [ ] Impression : contraste OK en niveaux de gris

## Implémentation

- Pictos : `components/worksheets/art/pictos.tsx`
- Nomenclature photos : `components/worksheets/nomenclature-cards.tsx` + `public/nomenclature/`
- Cadre : `components/worksheets/worksheet-frame.tsx`
- Ce document = source de vérité design fiches

## Génération IA

L’IA ne produit **pas** d’images bitmap.  
- Coloriage / chemins / anatomie : pictos SVG existants (+ JSON).  
- **Nomenclature** : choisir un set photo existant dans `public/nomenclature/` (ou ajouter des Commons + CREDITS — revue humaine). Pas d’image générée par IA.

---

_Référence produit : educpop · style arty pop Tullet_
