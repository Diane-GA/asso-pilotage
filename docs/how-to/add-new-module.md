---
type: how-to
---

# Ajouter un nouveau module

**Prérequis** : projet qui tourne en local, lecture de `CLAUDE.md`.
**Résultat** : une nouvelle page accessible depuis la sidebar, avec ses propres données mock et sa couleur.

---

## 1. Choisir (ou créer) une couleur sémantique

Ouvrir `app/globals.css`. Les couleurs existantes :

| Module | Token | Hex |
|---|---|---|
| Absences | `absences` | `#f59e0b` |
| Finances | `finances` | `#10b981` |
| Ateliers | `ateliers` | `#3b82f6` |
| Communication | `communication` | `#8b5cf6` |
| Bénévoles | `benevoles` | `#14b8a6` |

**Si tu réutilises** une couleur existante, passe à l'étape 2.

**Si tu ajoutes** une nouvelle couleur (`monmodule`) :

```css
/* app/globals.css — dans :root */
--color-monmodule: #ec4899;
--color-monmodule-light: #fce7f3;
--color-monmodule-dark: #be185d;

/* dans @theme inline */
--color-monmodule: var(--color-monmodule);
--color-monmodule-light: var(--color-monmodule-light);
--color-monmodule-dark: var(--color-monmodule-dark);
```

Les classes Tailwind `bg-monmodule`, `text-monmodule-dark`, `border-monmodule/20` sont alors disponibles.

## 2. Créer la page

```bash
mkdir app/monmodule
```

Créer `app/monmodule/page.tsx` :

```tsx
"use client"

import { useState, useEffect } from "react"

// Remplacer `Item` et `STORAGE_KEY` par les vrais noms
interface Item {
  id: number
  // ... champs métier
}

const STORAGE_KEY = "asso-monmodule"
const MOCK_DATA: Item[] = [
  { id: 1 /* ... */ },
]

function load(fallback: Item[]): Item[] {
  if (typeof window === "undefined") return fallback
  try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : fallback } catch { return fallback }
}

export default function MonModulePage() {
  const [items, setItems] = useState<Item[]>(MOCK_DATA)

  useEffect(() => { setItems(load(MOCK_DATA)) }, [])

  function persist(data: Item[]) {
    setItems(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Mon module</h1>
        <p className="text-sm text-muted mt-1">Description courte</p>
      </header>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-monmodule-light rounded-xl border border-monmodule/20 p-4">
          <p className="text-3xl font-bold text-monmodule-dark">{items.length}</p>
          <p className="text-sm text-monmodule-dark/70 mt-1">Libellé KPI</p>
        </div>
      </div>

      {/* Liste + CRUD → voir how-to/add-crud-to-module.md */}
    </div>
  )
}
```

> **Règle** : une page = un fichier `page.tsx` autonome. Pas de dépendance entre pages.

## 3. Ajouter l'entrée dans la sidebar

Ouvrir `components/Sidebar.tsx`, tableau `navItems` :

```tsx
import { MonIcone } from "lucide-react"  // choisir une icône disponible

// Dans navItems :
{ 
  href: "/monmodule",
  label: "Mon module",
  icon: MonIcone,
  accent: "bg-monmodule-light text-monmodule-dark",
  dot: "bg-monmodule"
},
```

> Vérifier que l'icône existe en v1.16.0 — voir la liste dans `AGENTS.md`.

## 4. Ajouter une StatCard sur le dashboard

Ouvrir `app/dashboard/page.tsx` et ajouter une carte dans le grid existant :

```tsx
<StatCard
  title="Mon module"
  href="/monmodule"
  color="monmodule"
  stats={[
    { label: "Libellé", value: items.length, alert: items.length === 0 },
  ]}
  action="Voir le module"
/>
```

> La `StatCard` lit la prop `color` pour appliquer les bonnes classes Tailwind. Elle accepte `monmodule` si la couleur est déclarée dans `globals.css`.

## 5. Vérifier

```bash
npx tsc --noEmit   # 0 erreur
```

Ouvrir [http://localhost:3001/monmodule](http://localhost:3001/monmodule).

---

## Étapes suivantes

- Ajouter le CRUD → [add-crud-to-module.md](./add-crud-to-module.md)
- Ajouter des données mock complexes → `lib/mock-data.ts`
