# educpop — Vue d'ensemble

**Date :** 2026-07-27  
**Type :** web  
**Architecture :** monolithique (Next.js full-stack)

## Résumé exécutif

**educpop** est une application web d’activités pédagogiques joyeuses à imprimer pour l’instruction en famille (IEF). Style pop coloré (inspiré Hervé Tullet). Les parents filtrent les fiches par âge, thème et saison, téléchargent gratuitement (email requis), et pourront générer des thèmes à la volée via IA (abonnement).

Le back-office éditorial cible **Strapi** (blog, fiches, leads). Un **accès admin via Google SSO** est exigé, avec possibilité d’**ajouter d’autres admins** dans le BO.

## Classification

- **Dépôt :** monolithe (une app Next.js)
- **Type :** web
- **Langages :** TypeScript, CSS (Tailwind)
- **Pattern :** App Router Next.js — pages RSC + Server Actions + API routes

## Stack technique (résumé)

| Catégorie | Technologie | Version / notes |
|-----------|-------------|-----------------|
| Framework | Next.js (App Router) | 16.2.6 |
| UI | React + Tailwind 4 + shadcn/base-ui | React 19 |
| Auth parents | Better Auth (email/password) | 1.6.x — Google SSO admin **à venir** |
| ORM / DB | Drizzle + PostgreSQL (`pg`) | Neon recommandé |
| Analytics | Vercel Analytics | prod uniquement |
| CMS (prévu) | Strapi | hors Vercel (Railway / Strapi Cloud) |
| Paiement (prévu) | Stripe | abonnement IA |
| IA (prévu) | OpenAI / équivalent | génération de fiches JSON |

## Fonctionnalités clés (état actuel)

- Bibliothèque filtrable (âge / thème / saison)
- 7 fiches imprimables (A4, `window.print`)
- Gate email avant téléchargement (`download_lead`)
- Auth email/password (optionnelle si pas de `DATABASE_URL`)
- Pages : abonnement, générer (placeholder), blog (placeholder), légales
- SEO : sitemap, robots, JSON-LD LearningResource, `llms.txt`

## Exigences produit à intégrer (prioritaires)

0. **Inspiration pédagogique + âges** — voir [ief-standard.md](./ief-standard.md) (pas de label « kit IEF » ; décliner par âge)
1. **Admin Google SSO** — connexion admin via compte Google  
2. **Gestion des admins dans le BO** — inviter / ajouter / retirer des admins  
3. **Strapi** — articles blog + contenus téléchargeables + (éventuellement) sync leads  
4. **Génération IA** — pack de fiches par thème/âge (abonnés)  
5. **Stripe** — abonnement payant  

> Voir aussi [Exigence Admin SSO](./requirements-admin-sso.md).

## Points d’architecture

- Rendu des fiches = composants React templates + données (`lib/activities.ts`)
- Auth Better Auth côté Next ; rôle admin **pas encore modélisé** (`isSubscribed` existe, pas `role`/`isAdmin`)
- Contenu activités encore **hardcodé** (migration Strapi prévue)
- Déploiement cible : **GitHub → Vercel** ; Strapi séparé

## Démarrage rapide

**Prérequis :** Node 20+, pnpm (ou npm/npx)

```bash
pnpm install   # ou npm install
cp .env.example .env.local
npx next dev
```

- **Dev :** `npx next dev`  
- **Build :** `npx next build`  
- **Tests :** aucun suite automatisée pour l’instant  

## Structure

Voir [source-tree-analysis.md](./source-tree-analysis.md) et [index.md](./index.md).

---

_Généré via BMAD Method `document-project` (deep scan)_
