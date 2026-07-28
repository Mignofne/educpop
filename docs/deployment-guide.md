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

Tables créées par `pnpm db:setup` (alias `node scripts/create-analytics-table.mjs`) :

- Better Auth : `user`, `session`, `account`, `verification` (obligatoires dès que `DATABASE_URL` est set)
- `analytics_event` — événements first-party (pages, filtres, téléchargements)
- `download_lead` — emails capturés au gate de téléchargement (+ `ageBand`, `newsletterOptIn`)

Variables auth (recommandées en prod avec DB) :

- `BETTER_AUTH_SECRET` — secret long aléatoire (sinon auth désactivée, le site reste consultable)
- `BETTER_AUTH_URL` — URL publique du site (ex. `https://educpop.vercel.app`)

### Activer stats prod (5 min)

1. **Créer une base Neon** (gratuit) : [neon.tech](https://neon.tech) → New Project → copier la connection string **pooled** (`postgresql://…?sslmode=require`).
2. **Vercel** → Project → Settings → Environment Variables → ajouter `DATABASE_URL` (Production + Preview) avec cette URL.
3. **Redéployer** le projet (Deployments → … → Redeploy).
4. **Créer les tables** — une fois, en local avec la même URL :
   ```bash
   # PowerShell
   $env:DATABASE_URL="postgresql://..."; pnpm db:setup

   # bash
   DATABASE_URL="postgresql://..." pnpm db:setup
   ```
   Équivalent : `node scripts/create-analytics-table.mjs` (charge `.env` si présent).
5. **Optionnel — données de test** : `pnpm db:seed-analytics` (local, même `DATABASE_URL`).

**Comportement du dashboard :**

| Situation | Affichage |
|-----------|-----------|
| Pas de `DATABASE_URL` | Mode démo (chiffres fictifs) |
| `DATABASE_URL` OK, tables absentes | Zéros + bannière « tables manquantes » + commande `pnpm db:setup` |
| Base OK, aucun événement | Zéros réels + « Aucune donnée encore » |
| Événements collectés | Stats réelles |

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
