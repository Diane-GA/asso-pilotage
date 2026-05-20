---
type: explanation
adr: "002"
statut: accepté
date: 2025-05-20
---

# ADR 002 — Tailwind v4 avec configuration CSS-first

## Contexte

Tailwind v4 introduit un nouveau paradigme : la configuration se fait dans le fichier CSS principal via `@theme inline`, sans fichier `tailwind.config.ts`.

## Décision

Utiliser Tailwind v4 avec la configuration entièrement dans `app/globals.css`.

## Pourquoi ce choix

- Les tokens de couleur par module (`absences`, `finances`…) sont déclarés comme variables CSS natives
- Les composants utilisent des classes sémantiques lisibles (`bg-absences-light`) plutôt que des valeurs arbitraires
- Pas de fichier de config supplémentaire à maintenir

## Impact sur le développement

### Ce qui change par rapport à Tailwind v3

```css
/* v4 — dans globals.css */
:root { --color-absences: #f59e0b; }
@theme inline { --color-absences: var(--color-absences); }
```

```tsx
// v4 — classes générées automatiquement
"bg-absences text-absences-dark border-absences/20"
```

### Ce qui NE fonctionne pas

```tsx
// ❌ Interdit — valeur arbitraire
"bg-[var(--color-absences)]"

// ❌ Interdit — fichier de config
// tailwind.config.ts n'existe pas dans ce projet
```

## Attention pour les assistants IA

Les LLMs entraînés sur des codebases Tailwind v3 vont spontanément :
- Créer un `tailwind.config.ts` → **à supprimer**
- Écrire `bg-[var(--color-xxx)]` → **à remplacer** par `bg-xxx`
- Ajouter `extend.colors` → **ne fonctionne pas** en v4

Se référer à `CLAUDE.md` section "Ce qu'il ne faut PAS faire".
