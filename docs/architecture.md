# educpop — Architecture

**Date :** 2026-07-27  
**Type :** web monolithique Next.js full-stack

## Résumé

educpop sert des pages marketing + bibliothèque d’activités + fiches imprimables pour l’**instruction en famille (IEF)**. Cadre pédagogique : `docs/ief-standard.md`. Style fiches : `docs/visual-standard-worksheets.md`. La logique métier légère vit dans des Server Actions et Better Auth. Les données persistantes (users, leads, générations) passent par PostgreSQL via Drizzle. Le CMS Strapi et l’admin Google SSO sont **planifiés**, pas encore en place.

## Stack

| Catégorie | Choix | Justification |
|-----------|-------|---------------|
| Runtime | Next.js 16 App Router | SSR/SSG, Server Actions, Vercel-native |
| UI | React 19 + Tailwind 4 + tokens brand | Style pop (berry/sun/sky/leaf) |
| Auth parents | Better Auth | Sessions, email/password |
| Auth admins | **À faire** — Google SSO | Voir `requirements-admin-sso.md` |
| Données | Drizzle + `pg` | Schéma typé, Neon/Postgres |
| Contenu fiches | Hardcodé `lib/activities.ts` | Migration Strapi prévue |
| Impression | CSS `@media print` + `window.print` | Pas de PDF serveur pour l’instant |

## Pattern architectural

```
Browser
  │
  ▼
Next.js (app/)
  ├── RSC pages (bibliothèque, fiche, marketing)
  ├── Client islands (LibraryBrowser, DownloadGate, AuthForm)
  ├── Server Actions (registerDownload)
  └── API /api/auth/* (Better Auth)
        │
        ▼
   PostgreSQL (optionnel en local)
        │
        ▼ (Phase 2)
   Strapi CMS ──► contenu blog/fiches
```

## Flux principaux

### Téléchargement gratuit

1. Parent ouvre `/activites/[slug]`
2. Clique « Télécharger » → modal email (`DownloadGate`)
3. `registerDownload` valide l’email, insère `download_lead` si DB dispo
4. `window.print()` pour PDF navigateur

### Auth parent

1. `/sign-up` / `/sign-in` → Better Auth email/password
2. Session cookie ; header affiche `UserMenu`
3. Si `DATABASE_URL` absent → auth désactivée gracieusement

### Génération IA (cible)

1. Parent abonné (`isSubscribed`) → `/generer`
2. Prompt thème + âge → LLM → JSON template validé
3. Rendu via `WorksheetRenderer` / templates React
4. Persistance `generation` table

### Admin BO (cible)

1. Google SSO → session admin
2. Strapi (Option A) **ou** `/admin` Next (Option B)
3. CRUD admins + contenus

## Données

Voir [data-models.md](./data-models.md).

Tables actuelles : `user`, `session`, `account`, `verification`, `download_lead`, `generation`.  
Manquant pour admin : `role` / table `admin` / allowlist.

## API

Voir [api-contracts.md](./api-contracts.md).

## UI / composants

Voir [component-inventory.md](./component-inventory.md).

Fiches = `WorksheetFrame` + templates (anatomie, saisons, traces, vocab, syllabes, drapeaux).

## Auth & sécurité (état + gaps)

| Sujet | État |
|-------|------|
| Hash mots de passe | Better Auth |
| HTTPS | Vercel |
| RBAC admin | **Absent** |
| Google OAuth | **Absent** |
| Rate limit download | **Absent** |
| Consentement RGPD | Texte UI ; pas de double opt-in |

## Déploiement

- **Front :** Vercel (GitHub)
- **DB :** Neon / Supabase Postgres
- **CMS :** Railway / Strapi Cloud (séparé)
- Pas de CI GitHub Actions détectée

## Tests

Aucun `*.test.*` / `*.spec.*` dans le repo applicatif. Build vérifié via `next build`.

## Dette / prochaines décisions

1. Option admin SSO A/B/C (`requirements-admin-sso.md`)
2. Source de vérité contenus : code vs Strapi
3. PDF serveur vs print navigateur
4. Stripe + quotas génération

---

_Généré via BMAD Method `document-project`_
