# educpop — Guide de déploiement

**Date :** 2026-07-27

## Cible

| Composant | Plateforme |
|-----------|------------|
| Site Next.js | **Vercel** (GitHub) |
| PostgreSQL | Neon (ou Supabase) |
| CMS Strapi | Railway / Render / Strapi Cloud |
| Domaine | educpop.fr (prévu) |

## Déploiement Vercel (prévu)

1. Repo GitHub `educpop`
2. Import Vercel → framework Next.js
3. Env vars : `DATABASE_URL`, `BETTER_AUTH_*`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_SECRET`
4. Domaine custom + HTTPS auto

### Base de données (stats admin + leads)

Après avoir configuré `DATABASE_URL` sur Vercel, exécuter une fois en local (ou via CI) :

```bash
node scripts/create-analytics-table.mjs
```

Ce script crée / met à jour :

- `analytics_event` — événements first-party (pages, filtres, téléchargements)
- `download_lead` — emails capturés au gate de téléchargement (+ `ageBand`, `newsletterOptIn`)

Sans ces tables, le dashboard admin affiche des **données de démo**. Dès qu’au moins un événement analytics ou un lead existe, les stats réelles s’affichent.

**Back-office :**

| URL | Contenu |
|-----|---------|
| `/admin` | Dashboard performance (KPIs, top packs) |
| `/admin/telechargements` | Liste des leads + export CSV |
| `/admin/telechargements/export` | Export CSV direct |

Variables requises pour le BO en prod :

- `DATABASE_URL` — Postgres (Neon / Supabase)
- `ADMIN_SECRET` — secret cookie pour `/admin`

## CI/CD

Aucun workflow `.github/workflows` détecté. Build local validé (`next build`).

## Checklist pré-prod

- [ ] Migrations DB appliquées
- [ ] Better Auth URL = domaine prod
- [ ] Google OAuth redirect URIs (admin)
- [ ] Strapi URL + token pour ISR
- [ ] Mentions légales éditeur complétées
- [ ] RGPD / désinscription newsletter

## Strapi (séparé)

Ne pas héberger Strapi sur Vercel (pas de process long-running).  
SSO Google admin : configurer dans le provider Strapi (Option A) ou côté Next (Option B).

---

_Généré via BMAD Method `document-project`_
