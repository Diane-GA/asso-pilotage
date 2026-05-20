---
type: reference
---

# Tokens de couleur Tailwind

## Principes

- Config dans `app/globals.css` (Tailwind v4 CSS-first, **pas de** `tailwind.config.ts`)
- Chaque module a sa propre palette de 3 tokens
- Utiliser **toujours** les classes sémantiques, jamais `bg-[var(--color-xxx)]`

## Palette par module

| Module | Base | Light | Dark | Usage |
|---|---|---|---|---|
| **Absences** | `bg-absences` `#f59e0b` | `bg-absences-light` `#fef3c7` | `text-absences-dark` `#d97706` | Alertes, urgences |
| **Finances** | `bg-finances` `#10b981` | `bg-finances-light` `#d1fae5` | `text-finances-dark` `#059669` | Succès, montants |
| **Ateliers** | `bg-ateliers` `#3b82f6` | `bg-ateliers-light` `#dbeafe` | `text-ateliers-dark` `#1d4ed8` | Info, navigation active |
| **Communication** | `bg-communication` `#8b5cf6` | `bg-communication-light` `#ede9fe` | `text-communication-dark` `#6d28d9` | Créatif, posts |
| **Bénévoles** | `bg-benevoles` `#14b8a6` | `bg-benevoles-light` `#ccfbf1` | `text-benevoles-dark` `#0d9488` | Social, équipe |
| **Alerte** | `bg-alert` `#ef4444` | — | — | Erreurs, suppressions |

## Utilisation des variantes

```tsx
// Carte colorée (fond clair + texte foncé + bordure)
<div className="bg-absences-light border border-absences/20 rounded-xl p-4">
  <p className="text-3xl font-bold text-absences-dark">42</p>
  <p className="text-sm text-absences-dark/70 mt-1">Absences ce mois</p>
</div>

// Badge statut
<span className="bg-finances-light text-finances-dark text-xs px-2.5 py-1 rounded-full font-medium">
  Actif
</span>

// Bordure colorée active
<div className="border-2 border-ateliers bg-ateliers-light">...</div>

// Opacité sur bordure (Tailwind slash syntax)
<div className="border border-benevoles/30">...</div>
```

## Couleurs neutres (Tailwind standard)

Pour tout ce qui n'est pas module-spécifique, utiliser les tokens sémantiques définis dans `globals.css` :

| Classe | Usage |
|---|---|
| `text-foreground` | Texte principal |
| `text-muted` | Texte secondaire, labels |
| `bg-surface` | Fond de carte/panneau |
| `bg-background` | Fond global |
| `border-border` | Bordures neutres |

## Ajouter une nouvelle couleur

1. Dans `app/globals.css`, section `:root` :
```css
--color-monmodule: #ec4899;
--color-monmodule-light: #fce7f3;
--color-monmodule-dark: #be185d;
```

2. Dans la section `@theme inline` :
```css
--color-monmodule: var(--color-monmodule);
--color-monmodule-light: var(--color-monmodule-light);
--color-monmodule-dark: var(--color-monmodule-dark);
```

3. Classes disponibles immédiatement : `bg-monmodule`, `text-monmodule-dark`, `border-monmodule/20`, etc.
