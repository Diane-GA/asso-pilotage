"use client"

import { useState, useEffect } from "react"
import { absences as absencesMock } from "@/lib/mock-data"
import SlideOver, { Field, Input, Select, Textarea, SaveButton, DeleteButton } from "@/components/SlideOver"
import { Phone, CheckCircle, Clock, Plus, Pencil } from "lucide-react"

type AbsenceStatut = "à appeler" | "excusée" | "justifiée" | "appelé – pas de réponse"

interface AbsenceEntry {
  id: number; nom: string; groupe: string; totalAbsences: number
  statut: AbsenceStatut; contact: string; notes: string
}

interface HistoEntry { semaine: string; total: number }

const STORAGE_A = "asso-absences-today"
const STORAGE_H = "asso-absences-histo"

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback } catch { return fallback }
}

const statutStyle: Record<AbsenceStatut, string> = {
  "à appeler":              "bg-absences-light text-absences-dark",
  "excusée":                "bg-green-100 text-green-700",
  "justifiée":              "bg-slate-100 text-slate-600",
  "appelé – pas de réponse": "bg-orange-100 text-orange-700",
}

const empty = (): Omit<AbsenceEntry, "id"> => ({
  nom: "", groupe: "", totalAbsences: 1, statut: "à appeler", contact: "", notes: "",
})

export default function AbsencesPage() {
  const initialToday = absencesMock.today.map((e) => ({ ...e, notes: "" })) as AbsenceEntry[]
  const [entries, setEntries] = useState<AbsenceEntry[]>(initialToday)
  const [historique, setHistorique] = useState<HistoEntry[]>(absencesMock.historique)
  const [slideOpen, setSlideOpen] = useState(false)
  const [editing, setEditing] = useState<AbsenceEntry | null>(null)
  const [form, setForm] = useState<Omit<AbsenceEntry, "id">>(empty())

  useEffect(() => {
    setEntries(load(STORAGE_A, initialToday))
    setHistorique(load(STORAGE_H, absencesMock.historique))
  }, [])

  function persist(data: AbsenceEntry[]) { setEntries(data); localStorage.setItem(STORAGE_A, JSON.stringify(data)) }

  function openNew() { setEditing(null); setForm(empty()); setSlideOpen(true) }
  function openEdit(e: AbsenceEntry) { setEditing(e); setForm({ ...e }); setSlideOpen(true) }

  function handleSave() {
    const updated = editing
      ? entries.map((x) => x.id === editing.id ? { ...form, id: editing.id } : x)
      : [...entries, { ...form, id: Date.now() }]
    persist(updated); setSlideOpen(false)
  }

  function handleDelete() {
    if (!editing) return
    persist(entries.filter((x) => x.id !== editing.id))
    setSlideOpen(false)
  }

  function cycleStatut(id: number) {
    const cycle: AbsenceStatut[] = ["à appeler", "appelé – pas de réponse", "excusée", "justifiée"]
    persist(entries.map((e) => e.id === id ? { ...e, statut: cycle[(cycle.indexOf(e.statut) + 1) % cycle.length] } : e))
  }

  const nonJustifiees = entries.filter((e) => e.statut === "à appeler" || e.statut === "appelé – pas de réponse").length
  const appelsEffectues = entries.filter((e) => e.statut !== "à appeler").length

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Absences</h1>
        <p className="text-sm text-muted mt-1">Suivi du jour — cliquer sur le statut pour le faire avancer</p>
      </header>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface rounded-xl border border-border p-4">
          <p className="text-3xl font-bold text-foreground">{entries.length}</p>
          <p className="text-sm text-muted mt-1">Absents aujourd'hui</p>
        </div>
        <div className="bg-absences-light rounded-xl border border-absences/20 p-4">
          <p className="text-3xl font-bold text-absences-dark">{nonJustifiees}</p>
          <p className="text-sm text-absences-dark/70 mt-1">Non justifiées</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4">
          <p className="text-3xl font-bold text-foreground">{appelsEffectues}/{entries.length}</p>
          <p className="text-sm text-muted mt-1">Appels effectués / traités</p>
        </div>
      </div>

      <section className="bg-surface rounded-xl border border-border overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground text-sm">Absents aujourd'hui</h2>
            <p className="text-xs text-muted mt-0.5">Mercredi 20 mai 2026</p>
          </div>
          <button onClick={openNew} className="flex items-center gap-1.5 text-xs font-medium bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors">
            <Plus size={13} /> Ajouter
          </button>
        </div>
        {entries.length === 0 ? (
          <p className="text-center text-sm text-muted py-8 italic">Aucune absence aujourd'hui</p>
        ) : (
          <ul className="divide-y divide-border">
            {entries.map((e) => (
              <li key={e.id} className="px-5 py-4 flex items-start gap-4">
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{e.nom}</p>
                  <p className="text-xs text-muted mt-0.5">{e.groupe} · {e.totalAbsences} absence{e.totalAbsences > 1 ? "s" : ""} au total</p>
                  {e.notes && <p className="text-xs text-slate-500 italic mt-1">📝 {e.notes}</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-muted">{e.contact}</span>
                  <button
                    onClick={() => cycleStatut(e.id)}
                    title="Cliquer pour changer le statut"
                    className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all hover:opacity-80 ${statutStyle[e.statut]}`}
                  >
                    {e.statut}
                  </button>
                  {e.statut === "à appeler" && (
                    <a href={`tel:${e.contact.replace(/\s/g, "")}`} className="p-2 rounded-lg bg-absences text-white hover:bg-absences-dark transition-colors" title="Appeler">
                      <Phone size={13} />
                    </a>
                  )}
                  {e.statut === "excusée" || e.statut === "justifiée" ? <CheckCircle size={15} className="text-green-500" /> : null}
                  <button onClick={() => openEdit(e)} className="p-1.5 rounded-lg hover:bg-slate-100 text-muted transition-colors">
                    <Pencil size={13} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground text-sm">Historique des semaines</h2>
        </div>
        <ul className="divide-y divide-border">
          {historique.map((s) => (
            <li key={s.semaine} className="px-5 py-3 flex items-center justify-between text-sm">
              <span className="text-muted flex items-center gap-2"><Clock size={13} /> Semaine du {s.semaine}</span>
              <span className="font-medium text-foreground">{s.total} absence{s.total > 1 ? "s" : ""}</span>
            </li>
          ))}
        </ul>
      </section>

      <SlideOver
        open={slideOpen}
        onClose={() => setSlideOpen(false)}
        title={editing ? "Modifier l'absence" : "Nouvelle absence"}
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="flex flex-col gap-4">
          <Field label="Nom de l'apprenante" required>
            <Input placeholder="Ex: Sarah M." value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} />
          </Field>
          <Field label="Groupe">
            <Input placeholder="Ex: Groupe A – Web" value={form.groupe} onChange={e => setForm(f => ({ ...f, groupe: e.target.value }))} />
          </Field>
          <Field label="Total absences (cumulé)">
            <Input type="number" min={1} value={String(form.totalAbsences)} onChange={e => setForm(f => ({ ...f, totalAbsences: Number(e.target.value) }))} />
          </Field>
          <Field label="Contact (parent/apprenante)">
            <Input placeholder="06 12 34 56 78" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} />
          </Field>
          <Field label="Statut">
            <Select value={form.statut} onChange={e => setForm(f => ({ ...f, statut: e.target.value as AbsenceStatut }))}>
              <option>à appeler</option>
              <option>appelé – pas de réponse</option>
              <option>excusée</option>
              <option>justifiée</option>
            </Select>
          </Field>
          <Field label="Notes">
            <Textarea placeholder="Raison, commentaire, suivi…" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          </Field>
          <SaveButton />
          {editing && <DeleteButton onClick={handleDelete} />}
        </form>
      </SlideOver>
    </div>
  )
}
