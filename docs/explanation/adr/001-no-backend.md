---
type: explanation
adr: "001"
statut: accepté
date: 2025-05-20
---

# ADR 001 — Pas de backend (localStorage first)

## Contexte

Asso Pilotage est un outil de pilotage interne pour une association de ~10 personnes.
Au moment du démarrage (mai 2025), le besoin principal était de **valider les fonctionnalités** avec l'équipe avant d'investir dans une infrastructure backend.

## Décision

**Pas de base de données, pas de serveurs, pas d'API** pour la phase 1.
Toutes les données sont stockées dans le `localStorage` du navigateur.

## Conséquences positives

- Déploiement immédiat sur Vercel (site statique)
- Zéro coût d'infrastructure
- Développement rapide (pas de migrations, pas de modèles ORM)
- Pas de RGPD complexe (les données ne quittent pas le navigateur de l'utilisateur)

## Conséquences négatives

- **Pas de partage de données** entre utilisateurs ou appareils
- **Perte de données** si le navigateur est réinitialisé
- Pas de vraie authentification (la session localStorage est falsifiable)
- Pas de sauvegarde automatique

## Quand revisiter cette décision

Migrer vers un vrai backend quand :
- [ ] L'équipe a besoin de voir les mêmes données en temps réel
- [ ] Les données doivent persister sur plusieurs appareils
- [ ] Des règles d'accès différenciées par rôle sont nécessaires sur les données elles-mêmes

## Migration prévue

Stack cible envisagée : **Supabase** (PostgreSQL hébergé, auth intégrée, API auto-générée)
- Les types TypeScript existants (`AuthUser`, `Membre`, `Apprenante`…) mapperont directement sur des tables
- Les clés localStorage deviendront des noms de tables
- Le `useAuth()` hook pourra être remplacé par `@supabase/auth-helpers-nextjs`
