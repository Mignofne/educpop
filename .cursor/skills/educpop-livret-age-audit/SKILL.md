---
name: educpop-livret-age-audit
description: >-
  Audit pédagogique des livrets co-schooling educpop (pack-livret-*). Vérifie
  déclinaison par âge, formats distincts, LivretActivityFrame, nomenclature,
  coloriage codé, mots croisés, pageCount catalogue. Use when auditing livrets,
  age adaptation review, or before publishing a new livret.
---

# educpop — Audit livrets co-schooling

## Quand l’utiliser

- Audit d’un ou plusieurs livrets (`pack-livret-*.tsx`)
- Avant publication d’un nouveau livret
- Quand l’utilisateur demande un contrôle âge / IEF sur les livrets

## Sources obligatoires

1. `docs/livret-standard.md` — structure v1, encart, références abeilles
2. `docs/activity-formats.md` — matrice formats par âge
3. `docs/ief-standard.md` — déclinaison obligatoire
4. `.cursor/skills/educpop-worksheet-qa/SKILL.md` — QA générale + `pnpm validate:worksheets`

## Inventaire livret

```bash
# Fichiers composants
glob: components/worksheets/pack-livret-*.tsx

# Catalogue
grep pack-livret lib/activities.ts
```

Slug attendu : `pack-livret-<theme>-<age>` · `pageCount` catalogue = **nombre d’activités** (5–8, sans couverture v1).

## Checklist par livret

### Structure & catalogue

- [ ] 5–8 activités, **formats tous différents** pour la tranche
- [ ] `activityCount` exporté = nombre de `LivretActivityFrame`
- [ ] `pageCount` dans `lib/activities.ts` = `activityCount` (pas +1 couverture)
- [ ] Pas de couverture / intro parents / clôture v1 (`livret-cover`, etc.)
- [ ] Routage OK dans `activity-worksheet.tsx`

### LivretActivityFrame (chaque page)

- [ ] `themeLabel` + `activityCount` passés
- [ ] Pied de page `themeLabel · index/activityCount`
- [ ] Encart « Le savais-tu ? » : `scientificNote` (kind `fact`|`hypothesis`|`uncertain`) ou `learns`
- [ ] Au moins 1 `parentQuestions[0]` → « À discuter : »
- [ ] Consignes courtes, langage adapté à l’âge, **pas de emoji**, **pas de label IEF**

### Formats par tranche (livret-standard)

| Âge | Formats typiques |
|-----|------------------|
| **1–2** | Nomenclature oral 5 photos, coloriage grand format, association couleurs, son/imitation, tri 2 couleurs, même/différent |
| **2–3** | Nomenclature simple, coloriage guidé, collage, pointage, tri 2 cat., image à compléter, association identique, mini cherche-et-trouve |
| **4–5** | Nomenclature enrichie, coloriage codé, tri catégories, labyrinthe, relier image↔fonction, séquence, cherche-et-trouve, puzzle papier |
| **6–7** | Coloriage codé, nomenclature 8 photos, schéma légendé, classification, frise, séquence, vrai/faux, mots croisés **simples** |
| **8–10** | Texte documentaire, débat, carte mentale, comparaison sources, hypothèses, frise détaillée, mini enquête, argumentation |

**Interdit :** recopier un livret jeune en version plus âgée ; formats 8–10 (croisés denses) sur 6–7 sans adaptation « simples ».

### Contrôles visuels spécifiques

| Format | Vérifier |
|--------|----------|
| **Nomenclature 1–2** | `LivretNomenclatureToddler` — 4–6 photos, oral, pas de découpage enfant |
| **Nomenclature 6–7+** | `LivretNomenclatureGrid` — 8 photos Commons + CREDITS.md |
| **Coloriage codé** | Vraie scène outline + légende couleurs **séparée** ; zones numérotées uniques ; pas de pseudo-cases génériques |
| **Schéma légendé** | Flèches / zones reliées au picto, pas seulement liste à côté |
| **Frise / séquence** | Cartes **mélangées** (ordre fixe documenté en constante) |
| **Mots croisés** | Recalculer intersections en code — commentaire ≠ preuve ; lettres partagées cohérentes |
| **Vrai/faux 6–7** | ~3 items boutons VRAI/FAUX |

### Ton 6–7

- Pas de flèches `→` dans les consignes imprimées
- Pas de jargon ; une consigne claire par activité

## Validation automatique

```bash
pnpm validate:worksheets
```

Le script ne vérifie **pas** la logique des mots croisés ni la qualité pédagogique — audit manuel obligatoire.

## Format de rapport (utilisateur)

Tableau markdown :

| Livret | Âge | OK / À corriger | Problèmes | Correctifs proposés (priorité) |

Priorités : **bloquant** · **should-fix** · **nice-to-have**

Groupes de correctifs en fin de rapport si plusieurs livrets.

## Note hors périmètre livret

Les packs pirates (`pack-one-piece-*`, thème pirate dans `pack-animes.tsx`) ne sont **pas** des livrets — les mentionner séparément si confusion avec la plainte « pirates 8–10 trop facile ».
