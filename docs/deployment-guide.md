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
3. Env vars : `DATABASE_URL`, `BETTER_AUTH_*`, `NEXT_PUBLIC_SITE_URL`
4. Domaine custom + HTTPS auto

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
