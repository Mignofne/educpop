# educpop — Contrats API

**Date :** 2026-07-27

## Vue d’ensemble

Peu d’HTTP REST custom. Auth via Better Auth. Mutations métier via Server Actions.

## Better Auth — `/api/auth/[...all]`

| Méthode | Path | Description |
|---------|------|-------------|
| GET/POST | `/api/auth/*` | Handler Better Auth (session, sign-in, sign-up, sign-out) |

**Condition :** `DATABASE_URL` défini → sinon réponses 503.

**Clients :** `lib/auth-client.ts` (`better-auth/react`).

### Providers actuels

- Email + password

### Providers prévus

- **Google** (admin SSO, éventuellement login parent) — voir `requirements-admin-sso.md`

## Server Actions

### `registerDownload` — `app/actions/download.ts`

| Champ | Type | Règle |
|-------|------|-------|
| email | string | Requis, format email |
| activitySlug | string | Requis |

**Effets :** insert `download_lead` si DB OK ; retourne toujours `{ ok: true }` si email valide (fail-open si DB down).

**Auth :** optionnelle (rattache `userId` si session).

## Endpoints absents (prévus)

| Endpoint | Usage |
|----------|-------|
| Admin invite / list / revoke | Gestion admins |
| `/api/generate` | Génération IA (abonné) |
| Stripe webhooks | Abonnement → `isSubscribed` |
| Strapi webhooks | Revalidation ISR |

## Authz (cible admin)

Toutes les routes `/admin/*` et API admin : rôle `admin` + session Google.  
Parents : pas d’accès BO.

---

_Généré via BMAD Method `document-project`_
