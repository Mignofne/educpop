# educpop — Index documentation

**Type :** monolithe web  
**Langage principal :** TypeScript  
**Architecture :** Next.js App Router full-stack  
**Dernière mise à jour :** 2026-07-27  
**Scan :** deep (BMAD document-project)

## Description

Plateforme d’activités pédagogiques à imprimer pour l’IEF (educpop). Bibliothèque gratuite (email), abonnement IA, CMS Strapi prévu, **admin Google SSO + gestion des admins** exigés.

## Quick reference

- **Stack :** Next.js 16 · React 19 · Tailwind 4 · Better Auth · Drizzle/Postgres
- **Entry :** `app/layout.tsx` / `app/page.tsx`
- **Pattern :** RSC + Server Actions + client islands
- **Database :** PostgreSQL (optionnel en local)
- **Déploiement :** Vercel (+ Strapi séparé)

## Documentation générée

### Cœur

- [Vue d’ensemble](./project-overview.md)
- [Architecture](./architecture.md)
- [Arborescence](./source-tree-analysis.md)
- [Inventaire composants](./component-inventory.md)
- [Guide développement](./development-guide.md)
- [Contrats API](./api-contracts.md)
- [Modèles de données](./data-models.md)
- [Déploiement](./deployment-guide.md)

### Exigences produit

- [**Inspiration pédagogique + âges**](./ief-standard.md) ← obligatoire (pas de label « kit IEF » produit)
- [**Formats d’activités par âge**](./activity-formats.md) ← matrice packs / IA
- [Admin Google SSO & gestion admins](./requirements-admin-sso.md)
- [Inspiration structure PDF (exemples/)](./inspiration-exemples.md)
- [**Standard visuel fiches (Tullet / arty pop)**](./visual-standard-worksheets.md) ← obligatoire

### Qualité contenus

- Skill Cursor : `.cursor/skills/educpop-worksheet-qa/`
- Script : `pnpm validate:worksheets`

### État de scan

- [project-scan-report.json](./project-scan-report.json)

## Documentation existante (repo)

- [README.md](../README.md) — démarrage + BMAD
- [public/llms.txt](../public/llms.txt) — résumé LLM-friendly
- [.env.example](../.env.example) — variables

## Getting started

```bash
pnpm install
cp .env.example .env.local
npx next dev
```

Ouvrir http://localhost:3000 — tester `/bibliotheque` et une fiche `/activites/...`.

## Pour les agents AI

| Besoin | Lire |
|--------|------|
| UI / fiches | `architecture.md`, `component-inventory.md` |
| Auth / admin SSO | `requirements-admin-sso.md`, `api-contracts.md`, `data-models.md` |
| Feature full-stack | Tous les docs ci-dessus + `index.md` |
| Brownfield PRD | Pointer le workflow PRD vers **ce fichier** `docs/index.md` |

### Suite BMAD recommandée

1. `bmad-product-brief` ou `bmad-prd` (inclure admin Google SSO)
2. `bmad-architecture` (trancher Option A Strapi vs B Next pour admins)
3. `bmad-create-epics-and-stories`

---

_Documentation générée par BMAD Method `document-project`_
