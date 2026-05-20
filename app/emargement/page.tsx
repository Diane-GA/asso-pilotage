"use client"

import { useState, useEffect, useMemo } from "react"
import {
  seances, apprenantes, presencesInitiales, calcAbsences,
  type PresenceStatus,
} from "@/lib/emargement-data"
import { Phone, AlertTriangle, CheckCircle, Clock, XCircle, ChevronDown } from "lucide-react"

const STORAGE_KEY = "asso-presences"

const STATUS_CONFIG: Record<PresenceStatus, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  présent:  { label: "Présent",  bg: "bg-finances-light",       text: "text-finances-dark",       icon: <CheckCircle size={13} /> },
  absent:   { label: "Absent",   bg: "bg-absences-light",       text: "text-absences-dark",       icon: <XCircle size={13} /> },
  excusé:   { label: "Excusé",   bg: "bg-blue-50",              text: "text-blue-700",             icon: <Clock size={13} /> },
  retard:   { label: "Retard",   bg: "bg-communication-light",  text: "text-communication-dark",   icon: <Clock size={13} /> },
}

const STATUS_CYCLE: PresenceStatus[] = ["présent", "absent", "excusé", "retard"]

function loadPresences(): Record<string, Record<number, PresenceStatus>> {
  if (typeof window === "undefined") return presencesInitiales
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : presencesInitiales
  } catch { return presencesInitiales }
}
function savePresences(p: Record<string, Record<number, PresenceStatus>>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
}

export default function EmargementPage() {
  const [presences, setPresences] = useState<Record<string, Record<number, PresenceStatus>>>(presencesInitiales)
  const [selectedSeanceId, setSelectedSeanceId] = useState(seances[0].id)

  useEffect(() => { setPresences(loadPresences()) }, [])

  const selectedSeance = seances.find((s) => s.id === selectedSeanceId)!
  const seanceApprenantes = apprenantes.filter((a) => selectedSeance.apprenanteIds.includes(a.id))
  const seancePresences = presences[selectedSeanceId] ?? {}

  // Stats pour la séance sélectionnée
  const presents = seanceApprenantes.filter((a) => seancePresences[a.id] === "présent").length
  const absents  = seanceApprenantes.filter((a) => seancePresences[a.id] === "absent").length
  const excuses  = seanceApprenantes.filter((a) => seancePresences[a.id] === "excusé").length
  const tauxPresence = seanceApprenantes.length > 0 ? Math.round((presents / seanceApprenantes.length) * 100) : 0

  // Apprenantes à appeler (absentes non excusées)
  const aAppeler = seanceApprenantes.filter((a) => seancePresences[a.id] === "absent")

  // Alertes décrochage (>= seuil absences toutes séances confondues)
  const enDecrochage = apprenantes.filter((a) => calcAbsences(presences, a.id) >= a.seuilAlerte)

  function toggleStatus(apprenanteId: number) {
    setPresences((prev) => {
      const current = prev[selectedSeanceId]?.[apprenanteId] ?? "absent"
      const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length]
      const updated = {
        ...prev,
        [selectedSeanceId]: { ...prev[selectedSeanceId], [apprenanteId]: next },
      }
      savePresences(updated)
      return updated
    })
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Émargement numérique</h1>
        <p className="text-sm text-muted mt-1">Feuille de présence interactive — alertes décrochage automatiques</p>
      </header>

      {/* Sélecteur de séance */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-muted uppercase tracking-wider block mb-2">Séance</label>
        <div className="relative w-full max-w-md">
          <select
            value={selectedSeanceId}
            onChange={(e) => setSelectedSeanceId(e.target.value)}
            className="w-full appearance-none bg-surface border border-border rounded-xl px-4 py-3 pr-10 text-sm font-medium text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-ateliers"
          >
            {seances.map((s) => (
              <option key={s.id} value={s.id}>
                {new Date(s.date).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })} — {s.atelier} ({s.groupe}) · {s.heure}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Feuille de présence */}
        <div className="col-span-2 space-y-4">
          {/* Stats de la séance */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-surface rounded-xl border border-border p-3 text-center">
              <p className="text-2xl font-bold text-foreground">{seanceApprenantes.length}</p>
              <p className="text-xs text-muted mt-0.5">Inscrites</p>
            </div>
            <div className="bg-finances-light rounded-xl border border-finances/20 p-3 text-center">
              <p className="text-2xl font-bold text-finances-dark">{presents}</p>
              <p className="text-xs text-finances-dark/70 mt-0.5">Présentes</p>
            </div>
            <div className="bg-absences-light rounded-xl border border-absences/20 p-3 text-center">
              <p className="text-2xl font-bold text-absences-dark">{absents}</p>
              <p className="text-xs text-absences-dark/70 mt-0.5">Absentes</p>
            </div>
            <div className="bg-ateliers-light rounded-xl border border-ateliers/20 p-3 text-center">
              <p className="text-2xl font-bold text-ateliers-dark">{tauxPresence}%</p>
              <p className="text-xs text-ateliers-dark/70 mt-0.5">Présence</p>
            </div>
          </div>

          {/* Liste des apprenantes */}
          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                {selectedSeance.atelier} · {selectedSeance.groupe}
              </span>
              <span className="text-xs text-muted">{selectedSeance.formatrice} · {selectedSeance.heure}</span>
            </div>
            <ul className="divide-y divide-border">
              {seanceApprenantes.map((a) => {
                const statut = seancePresences[a.id] ?? "absent"
                const config = STATUS_CONFIG[statut]
                const totalAbsences = calcAbsences(presences, a.id)
                const isAlerte = totalAbsences >= a.seuilAlerte
                return (
                  <li key={a.id} className="px-5 py-3.5 flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground text-sm">{a.nom}</p>
                        {isAlerte && (
                          <span className="flex items-center gap-1 text-xs text-alert font-medium">
                            <AlertTriangle size={11} /> {totalAbsences} abs.
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted mt-0.5">{a.groupe}</p>
                    </div>
                    {statut === "absent" && (
                      <span className="text-xs text-muted">{a.contactParent}</span>
                    )}
                    <button
                      onClick={() => toggleStatus(a.id)}
                      title="Cliquer pour changer le statut"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-80 ${config.bg} ${config.text}`}
                    >
                      {config.icon}
                      {config.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <p className="text-xs text-muted text-center">Cliquez sur un statut pour le faire tourner : Présent → Absent → Excusé → Retard</p>
        </div>

        {/* Panneau latéral */}
        <div className="space-y-4">
          {/* À appeler */}
          <div className="bg-absences-light rounded-xl border border-absences/30 p-4">
            <h3 className="font-semibold text-absences-dark text-sm mb-3 flex items-center gap-2">
              <Phone size={14} /> À appeler ({aAppeler.length})
            </h3>
            {aAppeler.length === 0 ? (
              <p className="text-xs text-absences-dark/60 italic">Aucun appel nécessaire</p>
            ) : (
              <ul className="space-y-2">
                {aAppeler.map((a) => (
                  <li key={a.id} className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-absences-dark">{a.nom}</span>
                    <div className="flex items-center gap-2">
                      <a href={`tel:${a.contactParent.replace(/\s/g, "")}`} className="text-xs text-absences-dark/80 underline underline-offset-2">{a.contactParent}</a>
                      <span className="text-xs text-absences-dark/50">(parent)</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Alertes décrochage */}
          <div className="bg-surface rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <AlertTriangle size={14} className="text-alert" />
              Décrochage ({enDecrochage.length})
            </h3>
            {enDecrochage.length === 0 ? (
              <p className="text-xs text-muted italic">Aucune alerte décrochage</p>
            ) : (
              <ul className="space-y-2">
                {enDecrochage.map((a) => {
                  const nbAbs = calcAbsences(presences, a.id)
                  return (
                    <li key={a.id} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{a.nom}</span>
                      <span className="text-xs font-semibold text-alert">{nbAbs} abs.</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Recap toutes séances */}
          <div className="bg-surface rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground text-sm mb-3">Toutes les séances</h3>
            <ul className="space-y-1.5">
              {seances.map((s) => {
                const sApp = apprenantes.filter((a) => s.apprenanteIds.includes(a.id))
                const sPresences = presences[s.id] ?? {}
                const sPresents = sApp.filter((a) => sPresences[a.id] === "présent").length
                return (
                  <li key={s.id} className="flex items-center justify-between text-xs">
                    <button
                      onClick={() => setSelectedSeanceId(s.id)}
                      className={`text-left hover:text-foreground transition-colors ${selectedSeanceId === s.id ? "font-semibold text-ateliers-dark" : "text-muted"}`}
                    >
                      {new Date(s.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} — {s.atelier.split(" ")[0]}
                    </button>
                    <span className={`font-medium ${selectedSeanceId === s.id ? "text-ateliers-dark" : "text-muted"}`}>
                      {sPresents}/{sApp.length}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
