"use client"

import { useState, useEffect } from "react"
import { benevoles as benvMock } from "@/lib/mock-data"
import SlideOver, { Field, Input, Select, SaveButton, DeleteButton } from "@/components/SlideOver"
import { CheckCircle, XCircle, Calendar, Plus, Pencil } from "lucide-react"

interface Benevole {
  id: number
  nom: string
  competences: string[]
  disponible: boolean
  prochainEvent: boolean
}

const STORAGE_KEY = "asso-benevoles"

function load(fallback: Benevole[]): Benevole[] {
  if (typeof window === "undefined") return fallback
  try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : fallback } catch { return fallback }
}

const empty = (): Omit<Benevole, "id"> => ({ nom: "", competences: [], disponible: true, prochainEvent: false })

const COMPETENCES_LIST = ["Animation", "Accueil", "Technique", "Formation", "Communication", "Admin"]

export default function BenevolesPage() {
  const [benevoles, setBenevoles] = useState<Benevole[]>(benvMock.liste as Benevole[])
  const [slideOpen, setSlideOpen]  = useState(false)
  const [editing,   setEditing]    = useState<Benevole | null>(null)
  const [form,      setForm]       = useState<Omit<Benevole, "id">>(empty())
  const [compInput, setCompInput]  = useState("")

  useEffect(() => { setBenevoles(load(benvMock.liste as Benevole[])) }, [])

  function persist(data: Benevole[]) { setBenevoles(data); localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }

  function openNew() { setEditing(null); setForm(empty()); setCompInput(""); setSlideOpen(true) }
  function openEdit(b: Benevole) { setEditing(b); setForm({ ...b, competences: [...b.competences] }); setCompInput(""); setSlideOpen(true) }

  function toggleComp(c: string) {
    setForm((f) => ({
      ...f,
      competences: f.competences.includes(c) ? f.competences.filter((x) => x !== c) : [...f.competences, c],
    }))
  }

  function handleSave() {
    const updated = editing
      ? benevoles.map((x) => x.id === editing.id ? { ...form, id: editing.id } : x)
      : [...benevoles, { ...form, id: Date.now() }]
    persist(updated); setSlideOpen(false)
  }

  function handleDelete() {
    if (!editing) return
    persist(benevoles.filter((x) => x.id !== editing.id))
    setSlideOpen(false)
  }

  function toggleDisponible(id: number) {
    persist(benevoles.map((b) => b.id === id ? { ...b, disponible: !b.disponible } : b))
  }

  function toggleEvent(id: number) {
    persist(benevoles.map((b) => b.id === id ? { ...b, prochainEvent: !b.prochainEvent } : b))
  }

  const confirmes = benevoles.filter((b) => b.disponible).length
  const pourEvent = benevoles.filter((b) => b.prochainEvent).length
  const besoins = benvMock.prochainEvenement.besoins
  const manquants = Math.max(0, besoins - pourEvent)

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Bénévoles</h1>
        <p className="text-sm text-muted mt-1">Disponibilités & planning des événements</p>
      </header>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-benevoles-light rounded-xl border border-benevoles/20 p-4">
          <p className="text-3xl font-bold text-benevoles-dark">{confirmes}/{benevoles.length}</p>
          <p className="text-sm text-benevoles-dark/70 mt-1">Bénévoles disponibles</p>
        </div>
        <div className={`rounded-xl border p-4 ${manquants > 0 ? "bg-absences-light border-absences/20" : "bg-surface border-border"}`}>
          <p className={`text-3xl font-bold ${manquants > 0 ? "text-absences-dark" : "text-foreground"}`}>{pourEvent}/{besoins}</p>
          <p className={`text-sm mt-1 ${manquants > 0 ? "text-absences-dark/70" : "text-muted"}`}>Confirmés — {benvMock.prochainEvenement.nom}</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4">
          <p className="text-3xl font-bold text-foreground">{benevoles.filter(b => b.disponible && !b.prochainEvent).length}</p>
          <p className="text-sm text-muted mt-1">Disponibles non assignés</p>
        </div>
      </div>

      {manquants > 0 && (
        <div className="mb-6 bg-absences-light border border-absences/30 rounded-xl p-4 flex items-start gap-3">
          <Calendar size={18} className="text-absences-dark shrink-0 mt-0.5" />
          <p className="text-sm text-absences-dark font-medium">
            {manquants} bénévole{manquants > 1 ? "s" : ""} manquant{manquants > 1 ? "s" : ""} pour «{benvMock.prochainEvenement.nom}» ({new Date(benvMock.prochainEvenement.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })})
          </p>
        </div>
      )}

      <section className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground text-sm">Liste des bénévoles</h2>
          <button onClick={openNew} className="flex items-center gap-1.5 text-xs font-medium bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors">
            <Plus size={13} /> Ajouter
          </button>
        </div>
        {benevoles.length === 0 ? (
          <p className="text-center text-sm text-muted py-8 italic">Aucun bénévole — cliquez sur Ajouter</p>
        ) : (
          <ul className="divide-y divide-border">
            {benevoles.map((b) => (
              <li key={b.id} className="px-5 py-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-benevoles-light flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-benevoles-dark">{b.nom.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{b.nom}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {b.competences.map((c: string) => (
                      <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Toggle disponible */}
                  <button
                    onClick={() => toggleDisponible(b.id)}
                    title="Changer disponibilité"
                    className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${b.disponible ? "bg-finances-light text-finances-dark hover:opacity-80" : "bg-slate-100 text-muted hover:bg-slate-200"}`}
                  >
                    {b.disponible ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {b.disponible ? "Disponible" : "Indisponible"}
                  </button>
                  {/* Toggle prochain event */}
                  <button
                    onClick={() => toggleEvent(b.id)}
                    title="Confirmer pour le prochain événement"
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${b.prochainEvent ? "bg-benevoles-light text-benevoles-dark hover:opacity-80" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
                  >
                    {b.prochainEvent ? "✓ Confirmé" : "Non inscrit"}
                  </button>
                  <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg hover:bg-slate-100 text-muted transition-colors">
                    <Pencil size={13} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <SlideOver
        open={slideOpen}
        onClose={() => setSlideOpen(false)}
        title={editing ? "Modifier le bénévole" : "Nouveau bénévole"}
        subtitle="Informations & disponibilités"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="flex flex-col gap-4">
          <Field label="Nom complet" required>
            <Input placeholder="Ex: Amira L." value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} />
          </Field>

          <Field label="Compétences">
            <div className="flex flex-wrap gap-2">
              {COMPETENCES_LIST.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => toggleComp(c)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${form.competences.includes(c) ? "bg-ateliers text-white border-ateliers" : "bg-surface text-muted border-border hover:border-ateliers"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="Autre compétence…"
                value={compInput}
                onChange={e => setCompInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); if (compInput.trim()) { toggleComp(compInput.trim()); setCompInput("") } } }}
              />
              <button type="button" onClick={() => { if (compInput.trim()) { toggleComp(compInput.trim()); setCompInput("") } }} className="px-3 rounded-xl border border-border text-xs text-muted hover:bg-slate-50">+</button>
            </div>
          </Field>

          <Field label="Disponibilité générale">
            <Select value={form.disponible ? "oui" : "non"} onChange={e => setForm(f => ({ ...f, disponible: e.target.value === "oui" }))}>
              <option value="oui">Disponible</option>
              <option value="non">Indisponible</option>
            </Select>
          </Field>

          <Field label={`Prochain événement : ${benvMock.prochainEvenement.nom}`}>
            <Select value={form.prochainEvent ? "oui" : "non"} onChange={e => setForm(f => ({ ...f, prochainEvent: e.target.value === "oui" }))}>
              <option value="oui">Confirmé</option>
              <option value="non">Non inscrit</option>
            </Select>
          </Field>

          <SaveButton />
          {editing && <DeleteButton onClick={handleDelete} />}
        </form>
      </SlideOver>
    </div>
  )
}
