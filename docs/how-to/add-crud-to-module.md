---
type: how-to
---

# Ajouter le CRUD à un module

**Prérequis** : module existant avec une page `page.tsx`.
**Résultat** : bouton Ajouter, crayon par ligne, SlideOver avec formulaire, persistence localStorage.

Ce guide reproduit exactement le pattern utilisé sur tous les modules existants (Absences, Bénévoles, Finances, Membres…).

---

## 1. Imports nécessaires

```tsx
import { useState, useEffect } from "react"
import SlideOver, { Field, Input, Select, Textarea, FormRow, SaveButton, DeleteButton } from "@/components/SlideOver"
import { Plus, Pencil } from "lucide-react"
```

## 2. État et persistence

```tsx
// Constante de stockage — préfixer toujours par "asso-"
const STORAGE_KEY = "asso-monmodule"

// Fonction de chargement avec fallback
function load(fallback: Item[]): Item[] {
  if (typeof window === "undefined") return fallback
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : fallback
  } catch { return fallback }
}

// Valeurs par défaut d'un nouvel item
const empty = (): Omit<Item, "id"> => ({
  nom: "",
  // ... autres champs avec valeurs vides/défaut
})

// Dans le composant
const [items, setItems] = useState<Item[]>(MOCK_DATA)
const [slideOpen, setSlideOpen] = useState(false)
const [editing,   setEditing]   = useState<Item | null>(null)
const [form,      setForm]      = useState<Omit<Item, "id">>(empty())

useEffect(() => { setItems(load(MOCK_DATA)) }, [])

function persist(data: Item[]) {
  setItems(data)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
```

## 3. Handlers

```tsx
function openNew()        { setEditing(null); setForm(empty()); setSlideOpen(true) }
function openEdit(i: Item) { setEditing(i);   setForm({ ...i }); setSlideOpen(true) }

function handleSave() {
  const updated = editing
    ? items.map((x) => x.id === editing.id ? { ...form, id: editing.id } : x)
    : [...items, { ...form, id: Date.now() }]
  persist(updated)
  setSlideOpen(false)
}

function handleDelete() {
  if (!editing) return
  persist(items.filter((x) => x.id !== editing.id))
  setSlideOpen(false)
}
```

## 4. Bouton "Ajouter" dans le header de section

```tsx
<div className="px-5 py-4 border-b border-border flex items-center justify-between">
  <h2 className="font-semibold text-foreground text-sm">Titre de la section</h2>
  <button
    onClick={openNew}
    className="flex items-center gap-1.5 text-xs font-medium bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
  >
    <Plus size={13} /> Ajouter
  </button>
</div>
```

## 5. Crayon par ligne (group-hover)

Le crayon est invisible par défaut, visible au survol de la ligne :

```tsx
<li key={item.id} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50 group">
  {/* contenu de la ligne */}
  <div className="flex items-center gap-2 shrink-0">
    {/* autres actions */}
    <button
      onClick={() => openEdit(item)}
      className="p-1.5 rounded-lg hover:bg-slate-100 text-muted opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <Pencil size={13} />
    </button>
  </div>
</li>
```

## 6. SlideOver avec formulaire

Placer à la fin du JSX, avant la fermeture du `<div>` principal :

```tsx
<SlideOver
  open={slideOpen}
  onClose={() => setSlideOpen(false)}
  title={editing ? "Modifier l'élément" : "Nouvel élément"}
  subtitle="Informations"        {/* optionnel */}
  width="md"                     {/* "md" (défaut) ou "lg" pour formulaires larges */}
>
  <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="flex flex-col gap-4">
    
    {/* Champ texte simple */}
    <Field label="Nom" required>
      <Input
        placeholder="Ex: Nadjat"
        value={form.nom}
        onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
      />
    </Field>

    {/* Deux champs côte à côte */}
    <FormRow>
      <Field label="Champ A">
        <Input value={form.champA} onChange={e => setForm(f => ({ ...f, champA: e.target.value }))} />
      </Field>
      <Field label="Champ B">
        <Input value={form.champB} onChange={e => setForm(f => ({ ...f, champB: e.target.value }))} />
      </Field>
    </FormRow>

    {/* Select */}
    <Field label="Statut">
      <Select value={form.statut} onChange={e => setForm(f => ({ ...f, statut: e.target.value as MonStatut }))}>
        <option>option A</option>
        <option>option B</option>
      </Select>
    </Field>

    {/* Textarea */}
    <Field label="Notes">
      <Textarea
        placeholder="Commentaire…"
        value={form.notes}
        onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
      />
    </Field>

    <SaveButton />
    {editing && <DeleteButton onClick={handleDelete} />}
  </form>
</SlideOver>
```

## Récapitulatif du pattern complet

```
useState MOCK_DATA
  ↓
useEffect → load localStorage
  ↓
openNew() / openEdit(item) → setForm → setSlideOpen(true)
  ↓
SlideOver + form
  ↓
handleSave() → persist() → setSlideOpen(false)
handleDelete() → persist() → setSlideOpen(false)
```

## Exemples de référence dans le code

| Fichier | Particularité |
|---|---|
| `app/absences/page.tsx` | Cas le plus simple |
| `app/benevoles/page.tsx` | Multi-select de compétences |
| `app/finances/page.tsx` | Deux entités dans un seul SlideOver (mode switch) |
| `app/ateliers/page.tsx` | CRUD dans un sous-composant (`NotesTab`) |
| `app/communication/page.tsx` | Vue lecture + vue édition (deux SlideOver) |
