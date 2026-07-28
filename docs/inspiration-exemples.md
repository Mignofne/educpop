# Inspiration structure — dossier `exemples/`

**Date :** 2026-07-27  
**Source :** PDF de référence (Milestory / @maman_happycultrice) — **inspiration de structure uniquement**. Ne pas redistribuer, extraire ni republier leurs images/PDF. educpop produit ses propres illustrations et contenus.

## Inventaire

| Fichier | ~Pages | Thème / type observé |
|---------|--------|----------------------|
| `mpo20.pdf` | 5 | Morphologie poule — étiquettes anatomie (oeuf, patte, crête, bec…) |
| `mmn_mh24.pdf` | 5 | Noël — mots mystères + alphabet + copie + genre/nombre |
| `adm-25mh.pdf` | 4 | Corps humain — cartes organes MAJ / minuscule à recopier |
| `dvh-25mh.pdf` | 5 | Corps humain — **devinettes** |
| `isct-milestory.pdf` | 5 | Insectes — découpe lettres, écriture, symétrie, entoure, lettres manquantes |
| `sd-mm-25mh.pdf` | 3 | Corps — **mots cachés** |
| `cdtmm20.pdf` | 28 | Pack long (visuel dense, peu de texte extractible) |
| `mhlw.pdf` / `mhm23mh.pdf` | longs | Packs thématiques lourds (images) |

## Anatomie d’un pack (pattern à reproduire)

Un fichier ≠ une activité : c’est un **kit multi-pages** autour d’**un thème**.

```text
1. Page licence / conditions + branding
2. 3–12 fiches d’activités sur LE MÊME sujet
3. Chrome récurrent : prénom · date · footer marque · mention usage
4. Progression douce : observer → nommer → écrire → manipuler
```

Aligné avec educpop AD-4 : la génération IA doit sortir un **pack JSON** (plusieurs templates), pas une seule page.

## Types d’activités récurrents (à mapper sur nos templates)

| Pattern observé | Template educpop (existant / à créer) |
|-----------------|----------------------------------------|
| Schéma + étiquettes à coller | `anatomie` ✅ |
| Cartes nomenclature image + MOT + mot | `vocabulaire` ✅ |
| Mot mystère / code lettres | `mot-mystere` 🆕 |
| Découpe lettres → reconstitue le mot | `lettres-decoupe` 🆕 |
| Écrire le nom (script / cursive) | `ecriture` 🆕 |
| Moitié manquante (symétrie) | `symetrie` 🆕 |
| Entoure / cherche et trouve | `cherche-trouve` 🆕 |
| Lettres / syllabes manquantes | `syllabes` ✅ (étendre) |
| Devinettes illustrées | `devinettes` 🆕 |
| Mots cachés | `mots-caches` 🆕 |
| Tableau classement (genre, taille…) | `classement` 🆕 |
| Recopie liste de mots | `copie-mots` 🆕 |
| Chemins / tracés | `traces` ✅ |
| Roue / saisons | `saisons` ✅ |

## Chrome de page (conventions UI print)

À intégrer dans `WorksheetFrame` / génération :

- En-tête : titre activité + thème pack
- Zone **Prénom** + **Date**
- Pied : marque `educpop` + mention usage familial / non commercial
- Style : fond clair imprimable, gros gabarits, peu de gris

## Pack type « tournesol 5 ans » (cible produit)

Exemple de structure générée (AD-4 + inspiration) :

1. Anatomie du tournesol (étiquettes)
2. Cartes vocabulaire (fleur, tige, feuille, graine…)
3. Syllabes / lettres manquantes (`tour-ne-sol`)
4. Tracé / chemin thématique
5. Coloriage ou symétrie simplifiée
6. (6–7 ans+) mot mystère ou classement

## Notes légales

- Les PDF dans `exemples/` sont des **références privées** pour l’équipe.
- Gitignore recommandé (poids + copyright).
- educpop = contenus et illustrations **originaux** (style Tullet, pas copie Milestory).

---

_Lié à la spine : AD-4 (packs JSON multi-templates)._
