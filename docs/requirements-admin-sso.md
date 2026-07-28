# Exigence — Admin Google SSO & gestion des admins

**Statut :** exigence produit confirmée (2026-07-27) — **non implémentée**  
**Décision architecture :** **Option B** retenue (spine AD-2 / AD-10) — Better Auth + Google dans Next, `role=admin`, UI `/admin`  
**Priorité :** haute (avant ou avec le BO Strapi)

## Besoin

1. L’opérateur (fondateur) se connecte au **back-office** avec **Google SSO**.
2. Depuis le BO, il peut **ajouter / retirer des administrateurs**.
3. Les admins gèrent contenus (fiches, blog), leads email, et (plus tard) outils IA éditoriaux.

## Contexte technique actuel

| Élément | État |
|---------|------|
| Better Auth | Email/password parents uniquement (`lib/auth.ts`) |
| Champ `user.isSubscribed` | Abonnement parent — **pas** un rôle admin |
| Strapi | Non installé |
| Route `/admin` | Absente |

## Options d’architecture (à trancher en PRD / architecture BMAD)

### Option A — Admins dans Strapi (recommandée pour le BO éditorial)

- SSO Google via **Strapi admin** (provider Google OAuth)
- Gestion des utilisateurs admin **nativement dans Strapi** (invite / rôles)
- Next.js reste le site public ; Strapi = CMS + éventuellement custom plugin « leads »

**Avantages :** rôles CMS prêts, SEO/blog, création de fiches IA côté éditeur.  
**Inconvénient :** deux surfaces d’auth (parents Better Auth vs admins Strapi).

### Option B — Admins dans Next.js (Better Auth + Google)

- Activer provider **Google** sur Better Auth
- Ajouter `role: "user" | "admin"` (ou table `admin_user`)
- UI `/admin` dans Next pour gérer admins + contenus (ou proxy Strapi)

**Avantages :** un seul IdP côté app.  
**Inconvénient :** reconstruire un mini-BO ; Strapi admin reste séparé si Strapi est utilisé.

### Option C — Hybride

- Parents : Better Auth (email ± Google login parent optionnel)
- Admins CMS : Strapi + Google SSO
- Premier admin bootstrap via email Google allowlist dans env (`ADMIN_GOOGLE_EMAILS`)

## Critères d’acceptation (brouillon)

- [ ] Connexion admin possible uniquement via Google (pas de mot de passe admin partagé)
- [ ] Premier admin bootstrapé (env allowlist ou seed)
- [ ] Un admin peut inviter un autre admin (email Google)
- [ ] Un admin peut révoquer un admin (sauf dernier super-admin)
- [ ] Les routes BO / API admin sont protégées (RBAC)
- [ ] Audit minimal : qui a été ajouté / quand

## Variables d’environnement envisagées

```env
# Better Auth Google (si Option B)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Bootstrap allowlist (Option B/C)
ADMIN_GOOGLE_EMAILS=toi@gmail.com

# Strapi Google (si Option A)
# configuré dans Strapi admin SSO / users-permissions
```

## Prochaine étape BMAD

Intégrer cette exigence dans :
1. `bmad-product-brief` ou `bmad-prd`
2. `bmad-architecture` (choix Option A/B/C + schéma `role`)

---

_Contexte utilisateur capturé pendant document-project_
