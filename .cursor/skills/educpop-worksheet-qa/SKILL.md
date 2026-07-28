---
name: educpop-worksheet-qa
description: >-
  Validates educpop printable worksheet content for pedagogical correctness
  (syllable banks, puzzles, age formats, no emoji, no placeholders). Use when
  creating or editing worksheets, packs, syllabes, mots croisés, nomenclature,
  or when the user mentions QA fiches, confiance contenus, or validate worksheets.
---

# educpop — QA fiches imprimables

## Quand l’utiliser

- Création / modification de `components/worksheets/**`
- Packs thématiques, syllabes, croisés, nomenclature, cycles
- Avant de dire « c’est bon » à l’utilisateur

## Obligatoire avant de terminer

1. Lire `docs/activity-formats.md` + `docs/visual-standard-worksheets.md`
2. Lancer : `pnpm validate:worksheets` (doit exit 0)
3. Auto-check manuel des puzzles (ci-dessous)

## Règles syllabes (critique)

| Règle | Détail |
|-------|--------|
| Source unique | Données dans `lib/worksheets/syllable-puzzles.ts` |
| Banque | **Dérivée** des trous (`missingSyllables`) — jamais une liste hardcodée divergente |
| Cohérence | `parts.join("") === word` (tirets retirés du mot) |
| Compte | 1 trou ⇒ 1 entrée banque (leurres = liste `distractors` explicite) |
| Casse | Mot + syllabes en **MAJUSCULES** |
| Visuel | Pictos SVG hors nomenclature — **pas d’emoji** |
| Nomenclature | **Photos Commons** via `NomenclatureCards` + `CREDITS.md` |

### Exemple d’erreurs déjà vues (ne plus reproduire)

- Banque avec `CIEL` alors que le trou attendait `EN` (ARC-EN-CIEL)
- Mot `AUTOMNE` trou `NE` absent de la banque
- 6 mots / 5 syllabes
- Placeholder texte « illustration » sans image

## Autres formats

- **Mots croisés** : intersections lettres cohérentes ; définitions ↔ mots
- **Nomenclature** : chaque carte a un picto **ou** une photo réelle (pas de texte « illustration »)
- **Anatomie** : parties visibles sur le schéma + étiquettes alignées
- **Âge** : ne pas copier un pack 4–5 en 8–10 (`activity-formats.md`)

## Script

```bash
pnpm validate:worksheets
```

Si le script échoue → corriger avant de répondre à l’utilisateur.

## Checklist courte

- [ ] `pnpm validate:worksheets` OK
- [ ] Banque syllabes = trous (+ leurres déclarés)
- [ ] Pas d’emoji dans worksheets
- [ ] Pas de placeholder illustration
- [ ] Format adapté à l’âge
- [ ] Pack : **5 à 8 activités** (hors couverture)
- [ ] Catalogue : **packs only** (pas de solo)
