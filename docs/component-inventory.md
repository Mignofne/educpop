# educpop — Inventaire des composants

**Date :** 2026-07-27

## Layout & navigation

| Composant | Fichier | Rôle |
|-----------|---------|------|
| SiteHeader | `components/site-header.tsx` | Nav + auth state (RSC) |
| SiteFooter | `components/site-footer.tsx` | Liens + légales |
| UserMenu | `components/user-menu.tsx` | Déconnexion / badge abonnement |
| HeroCollage | `components/hero-collage.tsx` | Visuel hero pop |
| Decor (Blob, Dots, Squiggle) | `components/decor.tsx` | Ornements SVG |

## Bibliothèque & conversion

| Composant | Fichier | Rôle |
|-----------|---------|------|
| LibraryBrowser | `components/library-browser.tsx` | Filtres âge/thème/saison (client) |
| ActivityCard | `components/activity-card.tsx` | Carte → `/activites/[slug]` |
| DownloadGate | `components/download-gate.tsx` | Email obligatoire + print |
| AuthForm | `components/auth-form.tsx` | Sign-in / sign-up |

## Fiches imprimables (worksheets)

| Composant | Type activité | Notes |
|-----------|---------------|-------|
| WorksheetFrame | commun | Cadre A4 + print styles |
| ActivityWorksheet | router | Map type → template |
| WorksheetRenderer | `lib/` | Alternate router (slug+type) |
| AnatomySheet | anatomie | Dans `pack-coccinelle-*` / `pack-tournesols-*` (pas solo) |
| PackCoccinelle | pack | Thème dédié coccinelle (anatomie + activités) |
| PackPapillon / PackSerpent | pack | Thèmes dédiés — pas de pack-animaux fourre-tout |
| SeasonsWheel | saisons | Roue 4 saisons |
| PandaPath | traces | Chemin + lettres PANDA |
| VocabCards | vocabulaire | Photos animaux — **composant interne**, pas catalogue |
| SyllablesSheet | syllabes | Mots à trous — **dans** packs lecture / thèmes |
| FlagsSheet | drapeaux | Coloriage géo |

## UI primitives (`components/ui/`)

Button, Input, Label, Dialog, Card, Badge — base shadcn/base-ui.

## Pages (`app/`)

| Route | Fichier | Statut |
|-------|---------|--------|
| `/` | `app/page.tsx` | OK |
| `/bibliotheque` | `bibliotheque/page.tsx` | OK |
| `/activites/[slug]` | `activites/[slug]/page.tsx` | OK + JSON-LD |
| `/generer` | `generer/page.tsx` | Placeholder |
| `/abonnement` | `abonnement/page.tsx` | Placeholder Stripe |
| `/blog` | `blog/page.tsx` | Placeholder Strapi |
| `/sign-in` `/sign-up` | auth pages | OK si DB |
| `/admin` | — | **À créer** (Google SSO) |

## Design system (tokens)

Définis dans `app/globals.css` : `--berry`, `--sun`, `--sky`, `--leaf`, `--tangerine`, `--ink` ; fonts Fredoka (display) + Nunito (body).

## État client

Pas de Redux/Zustand. État local React (`useState` / `useTransition`) dans LibraryBrowser, DownloadGate, AuthForm.

---

_Généré via BMAD Method `document-project`_
