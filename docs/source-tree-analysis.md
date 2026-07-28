# educpop — Analyse de l’arborescence

**Date :** 2026-07-27

## Vue d’ensemble

Monolithe Next.js App Router. Code applicatif concentré dans `app/`, `components/`, `lib/`. BMAD dans `_bmad/` et `.agents/skills/`. Documentation projet dans `docs/`.

## Arborescence (critique)

```
educpop/
├── app/                          # Routes Next.js (App Router)
│   ├── page.tsx                  # Accueil marketing
│   ├── layout.tsx                # Fonts, metadata, Analytics
│   ├── globals.css               # Tokens brand + print CSS
│   ├── sitemap.ts / robots.ts
│   ├── bibliotheque/             # Liste filtrable
│   ├── activites/[slug]/        # Fiche + impression
│   ├── generer/                  # IA (placeholder abonnés)
│   ├── abonnement/
│   ├── blog/                     # Placeholder → Strapi
│   ├── sign-in/ / sign-up/
│   ├── mentions-legales/ / confidentialite/
│   ├── actions/download.ts       # Server Action leads
│   └── api/auth/[...all]/        # Better Auth handler
├── components/
│   ├── worksheets/               # Templates imprimables A4
│   ├── ui/                       # shadcn/base-ui
│   ├── download-gate.tsx         # Modal email
│   ├── library-browser.tsx       # Filtres client
│   └── site-header.tsx / site-footer.tsx
├── lib/
│   ├── activities.ts             # Catalogue fiches (source actuelle)
│   ├── auth.ts / auth-client.ts
│   ├── worksheet-renderer.tsx
│   └── db/                       # Drizzle schema + pool
├── public/                       # Assets + llms.txt
├── docs/                         # Connaissance projet (BMAD)
├── .agents/skills/               # Skills BMAD Cursor
├── _bmad/                        # Config BMAD
├── _bmad-output/                 # Artefacts planning/impl
├── package.json
├── next.config.mjs
└── .env.example
```

## Dossiers critiques

### `app/`

Routes et layouts. Entry : `app/layout.tsx`, `app/page.tsx`.

### `components/worksheets/`

Templates pédagogiques imprimables. Point d’extension pour nouveaux types de fiches et génération IA.

### `lib/`

Domaine métier : activités, auth, DB, rendu fiche.

### `lib/db/`

Schéma Drizzle (Better Auth + leads + generations).

### `docs/`

Index AI-ready + exigences (admin SSO).

### `.agents/skills/` + `_bmad/`

Méthode BMAD — ne pas confondre avec le code produit.

## Points d’entrée

- **App web :** `app/layout.tsx` → pages
- **Auth API :** `app/api/auth/[...all]/route.ts`
- **Download :** `app/actions/download.ts`
- **Catalogue :** `lib/activities.ts`

## Patterns

| Pattern | Usage |
|---------|--------|
| `app/**/page.tsx` | Pages routées |
| `components/worksheets/*.tsx` | Templates fiche |
| `lib/*.ts` | Logique partagée |
| Server Actions | Mutations (download) |
| Client components | Filtres, modals, forms |

## Config

| Fichier | Rôle |
|---------|------|
| `package.json` | Dépendances / scripts |
| `next.config.mjs` | Next (ignoreBuildErrors TS actuellement) |
| `tsconfig.json` | Paths `@/*` |
| `.env.example` | Variables documentées |
| `pnpm-workspace.yaml` | Overrides pnpm / onlyBuiltDependencies |
| `_bmad/config.toml` | Config BMAD |

## Notes

- `pnpm-workspace.yaml` marque le dossier comme workspace pnpm (package `.`) — pas un vrai monorepo multi-packages.
- `node_modules/` et `.next/` exclus du scan sémantique.

---

_Généré via BMAD Method `document-project`_
