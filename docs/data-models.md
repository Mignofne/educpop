# educpop — Modèles de données

**Date :** 2026-07-27  
**Source :** `lib/db/schema.ts` (Drizzle / PostgreSQL)

## Tables Better Auth

### `user`

| Colonne | Type | Notes |
|---------|------|-------|
| id | text PK | |
| name | text | |
| email | text unique | |
| emailVerified | boolean | |
| image | text? | |
| **isSubscribed** | boolean | Abonnement parent (IA) — défaut false |
| createdAt / updatedAt | timestamp | |

**Manquant pour admin :** `role` (`user` \| `admin`) **ou** table séparée.

### `session`, `account`, `verification`

Schéma standard Better Auth (tokens OAuth Google iront dans `account` quand activé).

## Tables applicatives

### `download_lead`

| Colonne | Type | Notes |
|---------|------|-------|
| id | serial PK | |
| email | text | Lead téléchargement |
| activitySlug | text | Fiche concernée |
| userId | text? | Si connecté |
| createdAt | timestamp | |

### `generation`

| Colonne | Type | Notes |
|---------|------|-------|
| id | serial PK | |
| userId | text | Abonné |
| theme | text | Thème libre |
| age | text | Tranche d’âge |
| content | jsonb | Pack fiches généré |
| createdAt | timestamp | |

## Contenu activités (hors DB)

Catalogue actuel en mémoire : `lib/activities.ts`  
Champs : slug, title, type, ages[], themes[], season, color, emojiFree.

**Cible :** collection Strapi `Activity` + JSON template.

## Évolutions schéma proposées (admin)

```text
user.role: text NOT NULL DEFAULT 'user'   -- 'user' | 'admin'
-- OU
admin_user (userId PK → user.id, invitedBy, createdAt)
```

Allowlist bootstrap : `ADMIN_GOOGLE_EMAILS` (env) pour premier admin Google.

## Migrations

Pas de dossier migrations Drizzle versionné détecté. À industrialiser (`drizzle-kit`) avant prod.

---

_Généré via BMAD Method `document-project`_
