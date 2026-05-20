"use client"

import { useState, useMemo, useEffect } from "react"
import { communication } from "@/lib/mock-data"
import { Calendar, Columns3, Check, X, RotateCcw, Plus, Pencil, CalendarDays } from "lucide-react"
import SlideOver, { Field, Input, Textarea, Select, FormRow, SaveButton, DeleteButton } from "@/components/SlideOver"

const STORAGE_POSTS   = "asso-communication-posts"
const STORAGE_EVENTS  = "asso-communication-events"

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback } catch { return fallback }
}

// ──────────────────────────────────────────────
// Types & données
// ──────────────────────────────────────────────
type ValidationStatus = "brouillon" | "soumis" | "approuvé" | "refusé" | "publié"
type Plateforme = "LinkedIn" | "Instagram" | "Facebook"
type TypeEvenement = "atelier" | "événement" | "cérémonie"

interface Evenement {
  id: number
  nom: string
  date: string
  type: TypeEvenement
}

interface Post {
  id: number
  date: string
  titre: string
  contenu?: string
  plateforme: Plateforme[]
  statut: ValidationStatus
  auteur: string
  evenement?: string | null
}

const postsInitiaux: Post[] = [
  { id: 1, date: "2026-05-21", titre: "Recap atelier HTML/CSS",       contenu: "Super séance aujourd'hui avec nos débutantes ! 💻 Elles ont créé leur première page web from scratch…",         plateforme: ["LinkedIn", "Instagram"], statut: "soumis",   auteur: "Nadjat",  evenement: "Atelier 21 mai" },
  { id: 2, date: "2026-05-23", titre: "Portrait bénévole – Amira",    contenu: "Rencontre avec Amira, bénévole depuis 2 ans. Elle nous parle de ce qui l'a amenée à rejoindre l'association…",    plateforme: ["Instagram"],             statut: "brouillon", auteur: "Nadjat",  evenement: null },
  { id: 3, date: "2026-05-27", titre: "Annonce portes ouvertes",       contenu: "📣 Portes ouvertes le 7 juin ! Venez découvrir nos ateliers, rencontrer l'équipe et vous inscrire pour la rentrée.", plateforme: ["LinkedIn", "Instagram", "Facebook"], statut: "brouillon", auteur: "Nadjat", evenement: "Portes ouvertes 7 juin" },
  { id: 4, date: "2026-06-07", titre: "Live portes ouvertes",          contenu: "🔴 On est EN DIRECT depuis nos portes ouvertes ! Rejoignez-nous pour voir ce qui se passe…",                      plateforme: ["Instagram"],             statut: "approuvé",  auteur: "Nadjat",  evenement: "Portes ouvertes 7 juin" },
  { id: 5, date: "2026-06-28", titre: "Remise des diplômes Promo 3",   contenu: "Félicitations à toutes les diplômées de la Promo 3 ! 🎓 Quelle fierté de les accompagner jusqu'au bout.",          plateforme: ["LinkedIn", "Instagram", "Facebook"], statut: "brouillon", auteur: "Somayeh", evenement: "Remise des diplômes" },
  { id: 6, date: "2026-05-15", titre: "Témoignage Mariam D.",          contenu: "Mariam partage son parcours : de zéro à la création de son premier site web en 8 semaines.",                       plateforme: ["LinkedIn"],              statut: "publié",    auteur: "Nadjat",  evenement: null },
]

const KANBAN_COLS: { id: ValidationStatus; label: string; color: string }[] = [
  { id: "brouillon", label: "Brouillon",  color: "bg-slate-100 border-slate-200" },
  { id: "soumis",    label: "Soumis",     color: "bg-ateliers-light border-ateliers/30" },
  { id: "approuvé",  label: "Approuvé",   color: "bg-finances-light border-finances/30" },
  { id: "publié",    label: "Publié",     color: "bg-emerald-50 border-emerald-200" },
]

const PlatIcon = ({ p }: { p: Plateforme }) => {
  if (p === "Instagram") return <span className="text-[10px] font-bold">IG</span>
  if (p === "LinkedIn")  return <span className="text-[10px] font-bold">LI</span>
  return <span className="text-[10px] font-bold">FB</span>
}

const plateformeStyle: Record<Plateforme, string> = {
  LinkedIn:  "bg-blue-100 text-blue-700",
  Instagram: "bg-purple-100 text-purple-700",
  Facebook:  "bg-indigo-100 text-indigo-700",
}

// ──────────────────────────────────────────────
// Calendrier éditorial (4.1)
// ──────────────────────────────────────────────
function CalendrierTab({ posts, evenements }: { posts: Post[]; evenements: Evenement[] }) {
  const today = new Date("2026-05-20")
  const year = today.getFullYear()
  const month = today.getMonth()
  const monthLabel = today.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const offset = (firstDay + 6) % 7 // lundi = 0

  const postsByDay = useMemo(() => {
    const map: Record<number, Post[]> = {}
    posts.forEach((p) => {
      const d = new Date(p.date)
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate()
        if (!map[day]) map[day] = []
        map[day].push(p)
      }
    })
    return map
  }, [posts])

  const events = evenements.filter((e) => {
    const d = new Date(e.date)
    return d.getFullYear() === year && d.getMonth() === month
  })

  const statutDot: Record<ValidationStatus, string> = {
    brouillon: "bg-slate-300",
    soumis:    "bg-ateliers",
    approuvé:  "bg-finances",
    refusé:    "bg-alert",
    publié:    "bg-emerald-500",
  }

  const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold capitalize text-foreground">{monthLabel}</h2>
        <div className="flex items-center gap-3 text-xs text-muted">
          {Object.entries(statutDot).slice(0, 4).map(([s, c]) => (
            <span key={s} className="flex items-center gap-1"><span className={`w-2 h-2 rounded-full ${c}`} />{s}</span>
          ))}
        </div>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted mb-1">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => <div key={d}>{d}</div>)}
      </div>

      {/* Grille */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const todayNum = today.getDate()
          const isToday = day === todayNum
          const dayPosts = postsByDay[day] ?? []
          const dayEvents = events.filter((e) => new Date(e.date).getDate() === day)

          return (
            <div key={i} className={`min-h-24 rounded-lg border p-1.5 text-xs ${isToday ? "border-ateliers bg-ateliers-light" : "border-border bg-surface hover:bg-slate-50"}`}>
              <div className={`font-semibold mb-1 ${isToday ? "text-ateliers-dark" : "text-muted"}`}>{day}</div>
              {dayEvents.map((e) => (
                <div key={e.id} className="text-[10px] bg-absences-light text-absences-dark rounded px-1 py-0.5 mb-0.5 truncate font-medium">{e.nom}</div>
              ))}
              {dayPosts.map((p) => (
                <div key={p.id} className="flex items-center gap-1 mb-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statutDot[p.statut]}`} />
                  <span className="truncate text-[10px] text-foreground">{p.titre}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Légende événements */}
      {evenements.length > 0 && (
        <div className="flex gap-3 flex-wrap text-xs text-muted pt-2">
          {evenements.map((e) => (
            <span key={e.id} className="flex items-center gap-1.5 bg-absences-light text-absences-dark px-2 py-1 rounded-full">
              📅 {e.nom} · {new Date(e.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────
// Onglet Événements — CRUD
// ──────────────────────────────────────────────
const TYPE_OPTIONS: { value: TypeEvenement; label: string; cls: string }[] = [
  { value: "atelier",     label: "Atelier",     cls: "bg-ateliers-light text-ateliers-dark" },
  { value: "événement",   label: "Événement",   cls: "bg-communication-light text-communication-dark" },
  { value: "cérémonie",   label: "Cérémonie",   cls: "bg-finances-light text-finances-dark" },
]

function EventsTab({ events, onEdit, onNew }: {
  events: Evenement[]
  onEdit: (e: Evenement) => void
  onNew: () => void
}) {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">Ces événements apparaissent dans le calendrier éditorial et peuvent être liés aux posts.</p>
        <button onClick={onNew} className="flex items-center gap-1.5 text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors">
          <Plus size={14} /> Nouvel événement
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-16 text-muted text-sm">
          <CalendarDays size={32} className="mx-auto mb-3 opacity-30" />
          Aucun événement. Commencez par en créer un.
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          {sorted.map((e, i) => {
            const typeOpt = TYPE_OPTIONS.find((t) => t.value === e.type) ?? TYPE_OPTIONS[1]
            return (
              <div key={e.id} className={`flex items-center gap-4 px-5 py-4 group hover:bg-slate-50 transition-colors ${i > 0 ? "border-t border-border" : ""}`}>
                <div className="text-center min-w-12 shrink-0">
                  <p className="text-lg font-bold text-foreground leading-none">
                    {new Date(e.date).toLocaleDateString("fr-FR", { day: "numeric" })}
                  </p>
                  <p className="text-[10px] text-muted uppercase tracking-wide">
                    {new Date(e.date).toLocaleDateString("fr-FR", { month: "short" })}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{e.nom}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${typeOpt.cls}`}>
                  {typeOpt.label}
                </span>
                <button
                  onClick={() => onEdit(e)}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-muted opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Pencil size={13} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────
// Panneau de lecture d'un post
// ──────────────────────────────────────────────
const statutLabel: Record<ValidationStatus, { label: string; cls: string }> = {
  brouillon: { label: "Brouillon",  cls: "bg-slate-100 text-slate-600" },
  soumis:    { label: "Soumis",     cls: "bg-ateliers-light text-ateliers-dark" },
  approuvé:  { label: "Approuvé",   cls: "bg-finances-light text-finances-dark" },
  refusé:    { label: "Refusé",     cls: "bg-red-50 text-alert" },
  publié:    { label: "Publié",     cls: "bg-emerald-50 text-emerald-700" },
}

function PostReadSlideOver({ post, onClose, onEdit }: { post: Post | null; onClose: () => void; onEdit: (p: Post) => void }) {
  if (!post) return null
  const { label, cls } = statutLabel[post.statut]
  return (
    <SlideOver open={!!post} onClose={onClose} title={post.titre} subtitle={`Par ${post.auteur} · ${new Date(post.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}`} width="lg">
      <div className="flex flex-col gap-5">
        {/* Statut + plateformes */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}>{label}</span>
          {post.plateforme.map((pl) => (
            <span key={pl} className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${plateformeStyle[pl]}`}>
              <PlatIcon p={pl} /> {pl}
            </span>
          ))}
          {post.evenement && (
            <span className="text-xs bg-absences-light text-absences-dark px-2.5 py-1 rounded-full">📅 {post.evenement}</span>
          )}
        </div>

        {/* Contenu du post */}
        <div className="bg-slate-50 rounded-xl p-4 border border-border">
          {post.contenu ? (
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{post.contenu}</p>
          ) : (
            <p className="text-sm text-muted italic">Aucun contenu rédigé.</p>
          )}
        </div>

        {/* Métadonnées */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-surface rounded-lg border border-border p-3">
            <p className="text-muted mb-0.5">Auteur</p>
            <p className="font-medium text-foreground">{post.auteur || "—"}</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-3">
            <p className="text-muted mb-0.5">Date de publication</p>
            <p className="font-medium text-foreground">{new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>

        {/* Bouton modifier */}
        <button
          onClick={() => { onClose(); setTimeout(() => onEdit(post), 150) }}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-slate-700 transition-colors"
        >
          <Pencil size={13} /> Modifier ce post
        </button>
      </div>
    </SlideOver>
  )
}

// ──────────────────────────────────────────────
// Kanban de validation (4.2)
// ──────────────────────────────────────────────
function KanbanTab({ posts, onChangeStatus, onEdit, onRead }: {
  posts: Post[]
  onChangeStatus: (id: number, status: ValidationStatus) => void
  onEdit: (p: Post) => void
  onRead: (p: Post) => void
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Circuit de validation : <span className="font-medium text-foreground">Brouillon → Soumis → Approuvé → Publié</span>.
        Cliquez sur une carte pour lire le post, ou utilisez les boutons pour le faire avancer.
      </p>

      <div className="grid grid-cols-4 gap-4">
        {KANBAN_COLS.map((col) => {
          const colPosts = posts.filter((p) => p.statut === col.id)
          return (
            <div key={col.id} className={`rounded-xl border-2 p-3 flex flex-col gap-3 min-h-48 ${col.color}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{col.label}</h3>
                <span className="text-xs bg-white/70 rounded-full px-2 py-0.5 font-medium text-muted">{colPosts.length}</span>
              </div>
              {colPosts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onRead(p)}
                  className="bg-white rounded-xl p-3 shadow-sm border border-white flex flex-col gap-2 cursor-pointer hover:shadow-md hover:border-slate-200 transition-all group"
                >
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-xs font-semibold text-foreground leading-snug flex-1 group-hover:text-ateliers-dark transition-colors">{p.titre}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); onEdit(p) }}
                      className="p-1 rounded hover:bg-slate-100 text-muted shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Pencil size={11} />
                    </button>
                  </div>
                  {p.contenu && <p className="text-[11px] text-muted leading-relaxed line-clamp-3">{p.contenu}</p>}
                  <div className="flex flex-wrap gap-1">
                    {p.plateforme.map((pl) => (
                      <span key={pl} className={`flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${plateformeStyle[pl]}`}>
                        <PlatIcon p={pl} /> {pl}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted">
                    <span>{p.auteur}</span>
                    <span>{new Date(p.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-1.5 mt-1" onClick={(e) => e.stopPropagation()}>
                    {p.statut === "brouillon" && (
                      <button onClick={() => onChangeStatus(p.id, "soumis")} className="flex-1 text-[10px] bg-ateliers-light text-ateliers-dark rounded-lg py-1 font-medium hover:opacity-80">Soumettre</button>
                    )}
                    {p.statut === "soumis" && <>
                      <button onClick={() => onChangeStatus(p.id, "approuvé")} className="flex-1 text-[10px] bg-finances-light text-finances-dark rounded-lg py-1 font-medium hover:opacity-80 flex items-center justify-center gap-1"><Check size={10} /> Approuver</button>
                      <button onClick={() => onChangeStatus(p.id, "brouillon")} className="text-[10px] bg-red-50 text-alert rounded-lg px-2 py-1 font-medium hover:opacity-80 flex items-center gap-1"><X size={10} /></button>
                    </>}
                    {p.statut === "approuvé" && <>
                      <button onClick={() => onChangeStatus(p.id, "publié")} className="flex-1 text-[10px] bg-emerald-100 text-emerald-700 rounded-lg py-1 font-medium hover:opacity-80">Marquer publié</button>
                      <button onClick={() => onChangeStatus(p.id, "soumis")} className="text-[10px] bg-slate-100 text-muted rounded-lg px-2 py-1 hover:opacity-80"><RotateCcw size={10} /></button>
                    </>}
                    {p.statut === "publié" && (
                      <span className="flex-1 text-[10px] text-center text-emerald-600 font-medium py-1">✓ Publié</span>
                    )}
                  </div>
                </div>
              ))}
              {colPosts.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-xs text-muted/50 italic">Vide</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// Page principale
// ──────────────────────────────────────────────
const eventsInitiaux: Evenement[] = communication.evenements as Evenement[]

const emptyPost = (): Omit<Post, "id"> => ({
  date: new Date().toISOString().split("T")[0],
  titre: "", contenu: "", plateforme: ["Instagram"],
  statut: "brouillon", auteur: "", evenement: null,
})

const emptyEvent = (): Omit<Evenement, "id"> => ({
  nom: "", date: new Date().toISOString().split("T")[0], type: "événement",
})

const ALL_PLATEFORMES: Plateforme[] = ["LinkedIn", "Instagram", "Facebook"]

export default function CommunicationPage() {
  const [tab, setTab] = useState<"calendrier" | "kanban" | "evenements">("calendrier")

  // Posts
  const [posts, setPosts] = useState<Post[]>(postsInitiaux)
  const [slideOpen, setSlideOpen] = useState(false)
  const [editing, setEditing] = useState<Post | null>(null)
  const [form, setForm] = useState<Omit<Post, "id">>(emptyPost())
  const [viewingPost, setViewingPost] = useState<Post | null>(null)

  // Événements
  const [events, setEvents] = useState<Evenement[]>(eventsInitiaux)
  const [eventSlideOpen, setEventSlideOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Evenement | null>(null)
  const [eventForm, setEventForm] = useState<Omit<Evenement, "id">>(emptyEvent())

  useEffect(() => {
    setPosts(load(STORAGE_POSTS, postsInitiaux))
    setEvents(load(STORAGE_EVENTS, eventsInitiaux))
  }, [])

  function persistPosts(data: Post[]) { setPosts(data); localStorage.setItem(STORAGE_POSTS, JSON.stringify(data)) }
  function persistEvents(data: Evenement[]) { setEvents(data); localStorage.setItem(STORAGE_EVENTS, JSON.stringify(data)) }

  // ── Posts CRUD ────────────────────────────
  function changeStatus(id: number, status: ValidationStatus) {
    persistPosts(posts.map((p) => p.id === id ? { ...p, statut: status } : p))
  }

  function openNew() { setEditing(null); setForm(emptyPost()); setSlideOpen(true) }
  function openEdit(p: Post) { setEditing(p); setForm({ ...p, plateforme: [...p.plateforme] }); setSlideOpen(true) }

  function handleSave() {
    const updated = editing
      ? posts.map((p) => p.id === editing.id ? { ...form, id: editing.id } : p)
      : [...posts, { ...form, id: Date.now() }]
    persistPosts(updated); setSlideOpen(false)
  }

  function handleDelete() {
    if (!editing) return
    persistPosts(posts.filter((p) => p.id !== editing.id))
    setSlideOpen(false)
  }

  function togglePlateforme(pl: Plateforme) {
    setForm((f) => ({
      ...f,
      plateforme: f.plateforme.includes(pl) ? f.plateforme.filter((x) => x !== pl) : [...f.plateforme, pl],
    }))
  }

  // ── Événements CRUD ───────────────────────
  function openNewEvent() { setEditingEvent(null); setEventForm(emptyEvent()); setEventSlideOpen(true) }
  function openEditEvent(e: Evenement) { setEditingEvent(e); setEventForm({ nom: e.nom, date: e.date, type: e.type }); setEventSlideOpen(true) }

  function handleSaveEvent() {
    if (!eventForm.nom.trim()) return
    const updated = editingEvent
      ? events.map((e) => e.id === editingEvent.id ? { ...eventForm, id: editingEvent.id } : e)
      : [...events, { ...eventForm, id: Date.now() }]
    persistEvents(updated); setEventSlideOpen(false)
  }

  function handleDeleteEvent() {
    if (!editingEvent) return
    persistEvents(events.filter((e) => e.id !== editingEvent.id))
    setEventSlideOpen(false)
  }

  // ── Stats ─────────────────────────────────
  const aCreer    = posts.filter((p) => p.statut === "brouillon" || p.statut === "soumis").length
  const approuves = posts.filter((p) => p.statut === "approuvé").length
  const publies   = posts.filter((p) => p.statut === "publié").length

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Communication</h1>
          <p className="text-sm text-muted mt-1">Calendrier éditorial & circuit de validation des posts</p>
        </div>
        {tab !== "evenements" && (
          <button onClick={openNew} className="flex items-center gap-1.5 text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors">
            <Plus size={14} /> Nouveau post
          </button>
        )}
      </header>

      {/* SlideOver post */}
      <SlideOver open={slideOpen} onClose={() => setSlideOpen(false)} title={editing ? "Modifier le post" : "Nouveau post"} width="lg">
        <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="flex flex-col gap-4">
          <Field label="Titre" required>
            <Input placeholder="Ex: Recap atelier HTML/CSS" value={form.titre} onChange={e => setForm(f => ({ ...f, titre: e.target.value }))} />
          </Field>
          <Field label="Contenu">
            <Textarea rows={5} placeholder="Texte du post…" value={form.contenu ?? ""} onChange={e => setForm(f => ({ ...f, contenu: e.target.value }))} />
          </Field>
          <Field label="Plateformes">
            <div className="flex gap-2">
              {ALL_PLATEFORMES.map((pl) => (
                <button type="button" key={pl} onClick={() => togglePlateforme(pl)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-colors ${form.plateforme.includes(pl) ? plateformeStyle[pl] + " border-transparent" : "bg-surface border-border text-muted hover:border-slate-400"}`}
                >
                  {pl}
                </button>
              ))}
            </div>
          </Field>
          <FormRow>
            <Field label="Date de publication">
              <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </Field>
            <Field label="Statut">
              <Select value={form.statut} onChange={e => setForm(f => ({ ...f, statut: e.target.value as ValidationStatus }))}>
                <option>brouillon</option><option>soumis</option><option>approuvé</option><option>publié</option>
              </Select>
            </Field>
          </FormRow>
          <FormRow>
            <Field label="Auteur">
              <Input placeholder="Nadjat" value={form.auteur} onChange={e => setForm(f => ({ ...f, auteur: e.target.value }))} />
            </Field>
            <Field label="Événement lié">
              <Select value={form.evenement ?? ""} onChange={e => setForm(f => ({ ...f, evenement: e.target.value || null }))}>
                <option value="">— Aucun —</option>
                {events.map((e) => <option key={e.id} value={e.nom}>{e.nom}</option>)}
              </Select>
            </Field>
          </FormRow>
          <SaveButton />
          {editing && <DeleteButton onClick={handleDelete} />}
        </form>
      </SlideOver>

      {/* SlideOver événement */}
      <SlideOver open={eventSlideOpen} onClose={() => setEventSlideOpen(false)} title={editingEvent ? `Modifier — ${editingEvent.nom}` : "Nouvel événement"} width="md">
        <form onSubmit={(e) => { e.preventDefault(); handleSaveEvent() }} className="flex flex-col gap-4">
          <Field label="Nom de l'événement" required>
            <Input placeholder="Ex: Portes ouvertes" value={eventForm.nom} onChange={e => setEventForm(f => ({ ...f, nom: e.target.value }))} />
          </Field>
          <Field label="Date" required>
            <Input type="date" value={eventForm.date} onChange={e => setEventForm(f => ({ ...f, date: e.target.value }))} />
          </Field>
          <Field label="Type">
            <Select value={eventForm.type} onChange={e => setEventForm(f => ({ ...f, type: e.target.value as TypeEvenement }))}>
              <option value="atelier">Atelier</option>
              <option value="événement">Événement</option>
              <option value="cérémonie">Cérémonie</option>
            </Select>
          </Field>
          <SaveButton />
          {editingEvent && <DeleteButton onClick={handleDeleteEvent} />}
        </form>
      </SlideOver>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-communication-light rounded-xl border border-communication/20 p-4">
          <p className="text-3xl font-bold text-communication-dark">{aCreer}</p>
          <p className="text-sm text-communication-dark/70 mt-1">En cours de rédaction</p>
        </div>
        <div className="bg-finances-light rounded-xl border border-finances/20 p-4">
          <p className="text-3xl font-bold text-finances-dark">{approuves}</p>
          <p className="text-sm text-finances-dark/70 mt-1">Approuvés à publier</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4">
          <p className="text-3xl font-bold text-foreground">{events.length}</p>
          <p className="text-sm text-muted mt-1">Événements programmés</p>
        </div>
      </div>

      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setTab("calendrier")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === "calendrier" ? "bg-surface text-foreground shadow-sm" : "text-muted hover:text-foreground"}`}
        >
          <Calendar size={14} /> Calendrier
        </button>
        <button
          onClick={() => setTab("kanban")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === "kanban" ? "bg-surface text-foreground shadow-sm" : "text-muted hover:text-foreground"}`}
        >
          <Columns3 size={14} /> Validation
        </button>
        <button
          onClick={() => setTab("evenements")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === "evenements" ? "bg-surface text-foreground shadow-sm" : "text-muted hover:text-foreground"}`}
        >
          <CalendarDays size={14} /> Événements
          <span className="text-[10px] bg-absences-light text-absences-dark px-1.5 py-0.5 rounded-full font-semibold">{events.length}</span>
        </button>
      </div>

      {tab === "calendrier" && <CalendrierTab posts={posts} evenements={events} />}
      {tab === "kanban"     && <KanbanTab posts={posts} onChangeStatus={changeStatus} onEdit={openEdit} onRead={(p) => setViewingPost(p)} />}
      {tab === "evenements" && <EventsTab events={events} onEdit={openEditEvent} onNew={openNewEvent} />}

      <PostReadSlideOver
        post={viewingPost}
        onClose={() => setViewingPost(null)}
        onEdit={(p) => { setViewingPost(null); openEdit(p) }}
      />
    </div>
  )
}
