# educpop — Guide de développement

**Date :** 2026-07-27

## Prérequis

- Node.js 20+ (testé avec 24 LTS)
- pnpm recommandé (`corepack enable`) — npm/npx OK
- PostgreSQL optionnel (Neon) pour auth + leads

## Installation

```bash
cd C:\PERSO\Git\educpop
pnpm install
# ou: npm install
cp .env.example .env.local
```

## Variables d’environnement

Voir `.env.example` :

| Variable | Obligatoire | Rôle |
|----------|-------------|------|
| `NEXT_PUBLIC_SITE_URL` | Non | URL canonique SEO |
| `DATABASE_URL` | Non* | Postgres — active auth + leads |
| `BETTER_AUTH_SECRET` | Si DB | Secret sessions |
| `BETTER_AUTH_URL` | Si DB | Base URL auth |
| `GOOGLE_CLIENT_ID/SECRET` | Plus tard | Admin SSO |
| `ADMIN_GOOGLE_EMAILS` | Plus tard | Bootstrap admins |
| `STRAPI_*` / `STRIPE_*` / `OPENAI_*` | Plus tard | Phases 2–3 |

\* Sans DB : site public + print OK ; auth / stockage leads off.

## Commandes

```bash
npx next dev      # http://localhost:3000
npx next build    # production
npx next start
```

## Conventions

- Chemins `@/` → racine projet
- Fiches : nouveau type = template dans `components/worksheets/` + entrée `ActivityType` + mapping renderer
- Print : classe `no-print` / `print-page` dans `globals.css`
- Branding : tokens CSS, pas de thème purple générique

## BMAD

```bash
npx bmad-method status
```

Skills Cursor dans `.agents/skills/`. Artefacts dans `_bmad-output/`.  
Connaissance longue durée : `docs/` (ce dossier).

## Tests

Pas de suite automatisée. Vérifier manuellement :

1. `/bibliotheque` filtres
2. `/activites/roue-des-saisons` → gate email → print
3. Build `npx next build`

---

_Généré via BMAD Method `document-project`_
