# Photos de nomenclature — standard educpop

**Règle produit :** les **cartes de nomenclature** utilisent des **photos réelles libres de droit**, pas des pictos SVG.

| Règle | Détail |
|-------|--------|
| Source | **Wikimedia Commons** (CC / domaine public) — pas d’image stock payante, pas d’IA bitmap |
| Dossier | `public/nomenclature/<set>/` |
| Crédits | `CREDITS.md` obligatoire dans chaque set (fichier → sujet → page Commons) |
| Format | JPG, ~800 px de large max (poids print + web) |
| **Nombre** | **Exactement 12 photos** par set / thème |
| Sujet | La photo doit montrer **exactement** le mot (pas de stylo « Snake », logo, pub…) |
| Usage | Uniquement fiches **nomenclature** ; coloriage / chemins / anatomie restent en **SVG Tullet** |

## Sets

| Dossier | Thème |
|---------|--------|
| `animaux/` | Cartes animaux |
| `moyen-age/` | Château, chevalier, dragon… |
| `tournesol/` | Tournesol & co |
| `asie/` | Panda, bambou, pagode… |
| `pirate/` | Bateau, mer, boussole… |
| `secours/` | Chiot, camion, tour… |
| `nuit/` | Chat, lune, lézard… |
| `chats/` | Maison, chaton, cupcake… |
| `papillon/` | Papillon, chenille, chrysalide… |
| `serpent/` | Serpent, écaille, désert… |
| `saisons/` | Neige, pluie, arbre… |
| `coccinelle/` | Coccinelle, larve, puceron… |
| `cerise/` | Cerise, fleur, verger… |
| `antarctique/` | Pingouin, phoque, banquise… |
| `afrique/` | Lion, girafe, savane… |
| `ocean/` | Poisson, vague, corail… |
| `halloween/` | Citrouille, chauve-souris… |
| `noel/` | Sapin, cadeau, renne… |

## Ajouter un set

1. Créer `public/nomenclature/<set>/`
2. Télécharger via Commons `Special:FilePath/Nom_du_fichier.jpg?width=800`
3. Remplir `CREDITS.md`
4. Déclarer les cartes dans `lib/worksheets/nomenclature-sets.ts`
5. Afficher avec `<NomenclatureCards cards={…} />`

Script d’aide : `node scripts/fetch-nomenclature-photos.mjs`
