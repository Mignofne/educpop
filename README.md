# educpop

Activités pédagogiques joyeuses à imprimer pour l'**instruction en famille (IEF)**.

**Baseline :** Grandir et faire grandir, un moment joyeux à la fois.

## Cadre produit (à respecter)

| Doc | Rôle |
|-----|------|
| [`docs/ief-standard.md`](docs/ief-standard.md) | Inspiration pédagogique + déclinaison âge |
| [`docs/activity-formats.md`](docs/activity-formats.md) | Matrice des formats par âge |
| [`docs/visual-standard-worksheets.md`](docs/visual-standard-worksheets.md) | Style Tullet / arty pop (obligatoire) |
| [`docs/index.md`](docs/index.md) | Index documentation projet |

## Stack

- **Frontend** : Next.js 16 (App Router) + Tailwind 4
- **Auth** : Better Auth (optionnel si `DATABASE_URL` est défini)
- **DB** : PostgreSQL via Drizzle (Neon recommandé)
- **Hébergement** : Vercel + GitHub
- **CMS** (Phase 2) : Strapi (blog + fiches éditoriales)

## Démarrage local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Sans `DATABASE_URL`, le site fonctionne : téléchargements (gate email) et pages publiques OK ; auth / enregistrement des leads désactivés.

## Scripts

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Serveur de dev |
| `pnpm build` | Build production |
| `pnpm start` | Serveur production |
| `pnpm validate:worksheets` | QA contenus fiches (syllabes, emoji, placeholders) |

## Routes

| Path                    | Description                          |
|-------------------------|--------------------------------------|
| `/`                     | Accueil                              |
| `/bibliotheque`         | Fiches filtrables                    |
| `/activites/[slug]`     | Fiche + impression                   |
| `/generer`              | Génération IA (abonnement — bientôt) |
| `/abonnement`           | Offres                               |
| `/blog`                 | Articles (placeholder → Strapi)      |
| `/llms.txt`             | Fichier LLM-friendly                 |
| `/sitemap.xml`          | Sitemap SEO                          |

## Déploiement Vercel

1. Pousser le repo sur GitHub
2. Import projet dans Vercel
3. Variables d'environnement (voir `.env.example`)
4. Domaine custom `educpop.fr`

## BMAD Method

Installé pour Cursor (46 skills dans `.agents/skills`).

```bash
npx bmad-method status
```

Dans le chat Cursor, démarrer avec :

> **bmad-help** — où en sommes-nous et quelle skill lancer ensuite ?

Langue agents : français · Artefacts : `_bmad-output/`

## Roadmap

1. **MVP gratuit** (en cours) — bibliothèque + gate email + SEO
2. **Strapi** — blog + gestion des fiches
3. **Stripe + IA** — abonnement et génération à la volée
