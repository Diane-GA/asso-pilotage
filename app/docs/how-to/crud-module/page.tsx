"use client"

export default function CrudModulePage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
      <header>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-finances-light text-finances-dark">How-to</span>
        <h1 className="text-3xl font-bold text-foreground mt-4">Ajouter le CRUD à un module</h1>
        <p className="text-muted mt-2">Bouton Ajouter, crayon par ligne, SlideOver avec formulaire, persistence localStorage.</p>
      </header>

      <section className="space-y-3">
        <div className="bg-ateliers-light border border-ateliers/20 rounded-xl p-4 text-sm text-ateliers-dark">
          <strong>Prérequis :</strong> module existant avec une page <code className="bg-white/50 px-1 rounded font-mono text-xs">page.tsx</code>.<br />
          Ce guide reproduit exactement le pattern utilisé sur tous les modules existants (Absences, Bénévoles, Finances, Membres…).
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">1. Imports nécessaires</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`import { useState, useEffect } from "react"
import SlideOver, { Field, Input, Select, Textarea, FormRow, SaveButton, DeleteButton } from "@/components/SlideOver"
import { Plus, Pencil } from "lucide-react"`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">2. État et persistence</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`// Constante de stockage — préfixer toujours par "asso-"
const STORAGE_KEY = "asso-monmodule"

function load(fallback: Item[]): Item[] {
  if (typeof window === "undefined") return fallback
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : fallback
  } catch { return fallback }
}

const empty = (): Omit<Item, "id"> => ({
  nom: "",
  // ... autres champs avec valeurs vides/défaut
})

// Dans le composant
const [items, setItems]     = useState<Item[]>(MOCK_DATA)
const [slideOpen, setSlideOpen] = useState(false)
const [editing,   setEditing]   = useState<Item | null>(null)
const [form,      setForm]      = useState<Omit<Item, "id">>(empty())

useEffect(() => { setItems(load(MOCK_DATA)) }, [])

function persist(data: Item[]) {
  setItems(data)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">3. Handlers</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`function openNew()         { setEditing(null); setForm(empty()); setSlideOpen(true) }
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
}`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">4. Bouton &quot;Ajouter&quot; dans le header de section</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`<div className="px-5 py-4 border-b border-border flex items-center justify-between">
  <h2 className="font-semibold text-foreground text-sm">Titre de la section</h2>
  <button
    onClick={openNew}
    className="flex items-center gap-1.5 text-xs font-medium bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
  >
    <Plus size={13} /> Ajouter
  </button>
</div>`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">5. Crayon par ligne (group-hover)</h2>
        <p className="text-sm text-muted leading-relaxed">Le crayon est invisible par défaut, visible au survol de la ligne :</p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`<li key={item.id} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50 group">
  {/* contenu de la ligne */}
  <div className="flex items-center gap-2 shrink-0">
    <button
      onClick={() => openEdit(item)}
      className="p-1.5 rounded-lg hover:bg-slate-100 text-muted opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <Pencil size={13} />
    </button>
  </div>
</li>`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">6. SlideOver avec formulaire</h2>
        <p className="text-sm text-muted leading-relaxed">Placer à la fin du JSX, avant la fermeture du <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">&lt;div&gt;</code> principal :</p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`<SlideOver
  open={slideOpen}
  onClose={() => setSlideOpen(false)}
  title={editing ? "Modifier l'élément" : "Nouvel élément"}
  subtitle="Informations"
  width="md"
>
  <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="flex flex-col gap-4">
    <Field label="Nom" required>
      <Input
        placeholder="Ex: Nadjat"
        value={form.nom}
        onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
      />
    </Field>
    <SaveButton />
    {editing && <DeleteButton onClick={handleDelete} />}
  </form>
</SlideOver>`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Récapitulatif du pattern</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`useState MOCK_DATA
  ↓
useEffect → load localStorage
  ↓
openNew() / openEdit(item) → setForm → setSlideOpen(true)
  ↓
SlideOver + form
  ↓
handleSave() → persist() → setSlideOpen(false)
handleDelete() → persist() → setSlideOpen(false)`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Exemples de référence dans le code</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Fichier</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Particularité</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["app/absences/page.tsx", "Cas le plus simple"],
                ["app/benevoles/page.tsx", "Multi-select de compétences"],
                ["app/finances/page.tsx", "Deux entités dans un seul SlideOver (mode switch)"],
                ["app/ateliers/page.tsx", "CRUD dans un sous-composant (NotesTab)"],
                ["app/communication/page.tsx", "Vue lecture + vue édition (deux SlideOver)"],
              ].map(([file, note]) => (
                <tr key={file} className="hover:bg-slate-50">
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">{file}</code></td>
                  <td className="px-3 py-2 text-sm text-muted border-b border-border">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
