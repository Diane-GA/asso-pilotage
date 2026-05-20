---
type: reference
---

# Composants partagés

## SlideOver

Panneau latéral droit réutilisable. **Tous les formulaires de l'application passent par SlideOver** — ne pas créer de modals inline.

### Import

```tsx
import SlideOver, {
  Field,        // Wrapper label + input
  Input,        // <input> stylé
  Select,       // <select> stylé
  Textarea,     // <textarea> stylé
  FormRow,      // Deux champs côte à côte
  SaveButton,   // Bouton "Enregistrer" (submit)
  DeleteButton, // Bouton "Supprimer" (rouge, onclick)
} from "@/components/SlideOver"
```

### Props SlideOver

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `open` | `boolean` | — | Contrôle l'ouverture |
| `onClose` | `() => void` | — | Appelé sur ESC, clic backdrop, croix |
| `title` | `string` | — | Titre du panneau |
| `subtitle` | `string?` | — | Sous-titre (optionnel) |
| `width` | `"md" \| "lg"` | `"md"` | Largeur : md=384px, lg=512px |
| `children` | `ReactNode` | — | Contenu du panneau |

### Props Field

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Label du champ |
| `required` | `boolean?` | Affiche une * rouge |
| `children` | `ReactNode` | Input/Select/Textarea |

### Exemple complet

```tsx
<SlideOver
  open={slideOpen}
  onClose={() => setSlideOpen(false)}
  title={editing ? "Modifier" : "Créer"}
  width="lg"
>
  <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="flex flex-col gap-4">
    <Field label="Nom" required>
      <Input placeholder="…" value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} />
    </Field>
    <FormRow>
      <Field label="A"><Input value={form.a} onChange={…} /></Field>
      <Field label="B"><Select value={form.b} onChange={…}><option>x</option></Select></Field>
    </FormRow>
    <SaveButton />
    {editing && <DeleteButton onClick={handleDelete} />}
  </form>
</SlideOver>
```

### Comportements intégrés

- Fermeture sur touche **Échap**
- Fermeture sur **clic backdrop**
- Scroll body **bloqué** quand ouvert
- Animation **slide-in** depuis la droite

---

## Sidebar

Navigation principale + chip utilisateur connecté.

### Ajouter une entrée

Dans `components/Sidebar.tsx`, tableau `navItems` :

```tsx
{
  href: "/monmodule",
  label: "Mon module",
  icon: MonIcone,             // icône lucide-react disponible en v1.16.0
  accent: "bg-xxx-light text-xxx-dark",  // classe active
  dot: "bg-xxx",              // couleur du point actif
}
```

Section Opérationnel : ajouter dans `navItems`.
Section Stratégie : ajouter dans `stratItems`.

---

## StatCard

Carte KPI sur le dashboard.

### Import

```tsx
import StatCard from "@/components/StatCard"
```

### Props

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Titre de la carte |
| `href` | `string` | Lien vers le module |
| `color` | `string` | Token couleur (ex: `"absences"`) |
| `stats` | `{ label: string; value: number \| string; alert?: boolean }[]` | Métriques à afficher |
| `action` | `string?` | Texte du lien d'action |

---

## AuthGate

Composant de protection des routes. Rendu conditionnel de la Sidebar.

**Ne pas utiliser directement dans les pages** — il est placé une seule fois dans `app/layout.tsx`.

### Comportement

| Situation | Rendu |
|---|---|
| `pathname === "/login"` | Juste `children` (pas de sidebar) |
| `loading === true` | Spinner centré |
| `user === null` | Redirect vers `/login` |
| `user !== null` | `<Sidebar /> + children` |

---

## useAuth (hook)

```tsx
import { useAuth } from "@/lib/auth-context"

const { user, loading, refresh, logout } = useAuth()
```

| Valeur | Type | Description |
|---|---|---|
| `user` | `AuthUser \| null` | Utilisateur connecté |
| `loading` | `boolean` | Vrai pendant l'hydratation initiale |
| `refresh()` | `() => void` | Recharge la session depuis localStorage |
| `logout()` | `() => void` | Vide la session + met `user` à null |

`AuthUser` :
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
