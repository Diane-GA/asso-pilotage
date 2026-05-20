---
type: explanation
adr: "003"
statut: accepté
date: 2025-05-20
---

# ADR 003 — Authentification par localStorage

## Contexte

L'application a besoin d'une page de connexion pour différencier les utilisateurs et préparer la migration vers un vrai système d'auth (SSO Google, Supabase…).

## Décision

Authentification maison dans `lib/auth.ts` avec :
- Utilisateurs stockés dans `localStorage["asso-users"]`
- Session dans `localStorage["asso-session"]`
- Hash simple non-cryptographique pour les mots de passe (usage démo uniquement)
- Compte admin par défaut : `admin@asso.fr` / `admin1234`

## Limites explicites

⚠️ **Ce n'est PAS une vraie sécurité** :
- Le hash utilisé (`(h << 5) - h`) n'est pas résistant aux attaques
- La session localStorage est accessible depuis JS (XSS possible)
- Pas de token d'expiration

C'est volontairement limité car :
- Les données elles-mêmes ne sont pas sensibles (mock data)
- L'objectif est de préparer l'UX et les patterns de code, pas la sécurité prod
- La migration vers un vrai système d'auth est prévue (ADR 001)

## Migration vers Google SSO

Quand l'association sera prête, remplacer par **NextAuth.js + Google Provider** :

```bash
npm install next-auth
```

```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth } = NextAuth({
  providers: [Google],
  // Restreindre au domaine de l'asso si applicable
  callbacks: {
    signIn: ({ profile }) => profile?.email?.endsWith("@asso.fr") ?? false
  }
})
```

Variables d'environnement Vercel à ajouter :
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_SECRET=...
```

Le `useAuth()` hook resterait compatible — remplacer `getSession()` par `useSession()` de next-auth.

## Interface AuthUser (stable)

```ts
interface AuthUser {
  id: string
  email: string
  nom: string
  prenom: string
  role: "admin" | "formatrice" | "coordinatrice" | "benevole"
  createdAt: string
}
```

Cette interface est conçue pour être stable lors de la migration — elle correspond à ce que Google OAuth retourne (email, name) enrichi du rôle stocké côté app.
