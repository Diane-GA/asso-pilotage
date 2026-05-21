"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ateliers as ateliersMock } from "@/lib/mock-data"
import {
  THEMATIQUES,
  migrate as migrateBenef,
  type NotesPositionnement,
} from "@/lib/positionnement"
import { migrateFiche, type FicheAtelier } from "@/lib/atelier"
import {
  composerGroupes,
  saveBrouillon,
  loadBrouillon,
  deleteBrouillon,
  type Brouillon,
  type GroupeBrouillon,
  type BeneficiairePourGroupage,
} from "@/lib/group-composer"
import SlideOver, { Field, Input, SaveButton } from "@/components/SlideOver"
import {
  Shuffle, RotateCcw, CheckCircle2, AlertTriangle, Users,
  GraduationCap, UserCheck, Sparkles, Settings,
} from "lucide-react"

// ──────────────────────────────────────────────
// Types locaux (alignés avec app/ateliers/page.tsx et app/beneficiaires/page.tsx)
// ──────────────────────────────────────────────
type SessionStatut = "planifié" | "en cours" | "terminé" | "annulé"
type NiveauBenef   = "débutant" | "intermédiaire" | "avancé"
type StatutBenef   = "actif" | "diplômé" | "abandon"
type TypeGroupe    = "niveau" | "âge" | "mixte"

interface Session extends FicheAtelier {
  id: number
  titre: string
  description: string
  date: string
  heure: string
  duree: string
  salle: string
  formatrice: string
  beneficiaireIds: number[]
  benevoleIds: number[]
  statut: SessionStatut
}

interface Beneficiaire {
  id: number
  prenom: string
  nom: string
  dateNaissance: string
  email: string
  telephone: string
  nomParent: string
  telephoneParent: string
  emailParent: string
  dateInscription: string
  positionnementInitial: NotesPositionnement
  positionnementFinal:   NotesPositionnement
  niveau: NiveauBenef
  notes: string
  statut: StatutBenef
}

interface Groupe {
  id: number
  nom: string
  type: TypeGroupe
  description: string
  beneficiaireIds: number[]
}

// ──────────────────────────────────────────────
// Storage
// ──────────────────────────────────────────────
const S_SESSIONS = "asso-ateliers-sessions"
const S_BENEF    = "asso-beneficiaires"
const S_GROUPES  = "asso-groupes"

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback } catch { return fallback }
}

function toGroupingInput(b: Beneficiaire): BeneficiairePourGroupage {
  return {
    id: b.id, prenom: b.prenom, nom: b.nom,
    dateNaissance: b.dateNaissance, statut: b.statut,
    positionnementInitial: b.positionnementInitial,
  }
}

function computeAge(dn: string): number | null {
  if (!dn) return null
  const an = new Date(dn).getFullYear()
  return isNaN(an) ? null : new Date().getFullYear() - an
}

function cohesionColor(score: number): string {
  if (score >= 80) return "text-green-700 bg-green-100"
  if (score >= 60) return "text-orange-700 bg-orange-100"
  return "text-red-700 bg-red-100"
}

// ──────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────
export default function BrouillonGroupesPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [benefs, setBenefs]     = useState<Beneficiaire[]>([])
  /** Brouillons indexés par atelierId. */
  const [brouillons, setBrouillons] = useState<Record<number, Brouillon | null>>({})

  // SlideOver "régénérer avec paramètres"
  const [paramSlide, setParamSlide] = useState(false)
  const [paramAtelier, setParamAtelier] = useState<Session | null>(null)
  const [paramForm, setParamForm] = useState<{ tailleGroupeCible: number; mixerNiveaux: boolean }>({
    tailleGroupeCible: 10, mixerNiveaux: false,
  })

  // Drag & drop
  const dragRef = useRef<{ benefId: number; fromGroupeId: string; atelierId: number } | null>(null)

  // ── Chargement initial ──
  useEffect(() => {
    const sRaw = load<Session[]>(S_SESSIONS, ateliersMock.sessions as Session[])
    const sMigrated = sRaw.map(s => migrateFiche(s) as Session)
    setSessions(sMigrated)

    const bRaw = load<Beneficiaire[]>(S_BENEF, ateliersMock.beneficiaires as Beneficiaire[])
    setBenefs(bRaw.map(b => migrateBenef(b) as Beneficiaire))

    // Pour chaque session, on essaie de charger un brouillon
    const map: Record<number, Brouillon | null> = {}
    for (const s of sMigrated) {
      map[s.id] = loadBrouillon(s.id)
    }
    setBrouillons(map)
  }, [])

  // ── Actions ──
  function genererPour(atelier: Session, override?: Partial<FicheAtelier>) {
    const fiche = { ...atelier, ...override }
    const brouillon = composerGroupes(fiche, benefs.map(toGroupingInput))
    saveBrouillon(brouillon)
    setBrouillons(m => ({ ...m, [atelier.id]: brouillon }))
  }

  function ouvrirParametres(atelier: Session) {
    setParamAtelier(atelier)
    setParamForm({
      tailleGroupeCible: atelier.tailleGroupeCible ?? 10,
      mixerNiveaux: atelier.mixerNiveaux,
    })
    setParamSlide(true)
  }

  function validerParametres() {
    if (!paramAtelier) return
    genererPour(paramAtelier, paramForm)
    setParamSlide(false)
  }

  function supprimerBrouillon(atelierId: number) {
    deleteBrouillon(atelierId)
    setBrouillons(m => ({ ...m, [atelierId]: null }))
  }

  function validerComposition(atelier: Session, brouillon: Brouillon) {
    // Convertit les groupes du brouillon en Groupe[] persistés dans asso-groupes
    const existants = load<Groupe[]>(S_GROUPES, [])
    const baseId = Date.now()
    const nouveaux: Groupe[] = brouillon.groupes.map((g, i) => ({
      id: baseId + i,
      nom: g.nom,
      type: brouillon.parametres.mode === "hétérogène" ? "mixte" : "niveau",
      description: `Auto-généré depuis "${atelier.titre}" — ${g.beneficiaireIds.length} bénéficiaires, cohésion ${g.scoreCohesion}%`,
      beneficiaireIds: [...g.beneficiaireIds],
    }))
    const tous = [...existants, ...nouveaux]
    localStorage.setItem(S_GROUPES, JSON.stringify(tous))
    supprimerBrouillon(atelier.id)
    alert(`${nouveaux.length} groupe(s) ajouté(s) à l'onglet Ateliers.`)
  }

  // ── Drag & drop ──
  function onDragStart(benefId: number, fromGroupeId: string, atelierId: number) {
    dragRef.current = { benefId, fromGroupeId, atelierId }
  }
  function onDropOnGroupe(toGroupeId: string, atelierId: number) {
    const drag = dragRef.current
    if (!drag || drag.atelierId !== atelierId) return
    if (drag.fromGroupeId === toGroupeId) return
    const b = brouillons[atelierId]
    if (!b) return

    const newGroupes: GroupeBrouillon[] = b.groupes.map(g => {
      if (g.id === drag.fromGroupeId) {
        return { ...g, beneficiaireIds: g.beneficiaireIds.filter(id => id !== drag.benefId) }
      }
      if (g.id === toGroupeId) {
        if (g.beneficiaireIds.includes(drag.benefId)) return g
        return { ...g, beneficiaireIds: [...g.beneficiaireIds, drag.benefId] }
      }
      return g
    })
    const updated: Brouillon = { ...b, groupes: newGroupes }
    saveBrouillon(updated)
    setBrouillons(m => ({ ...m, [atelierId]: updated }))
    dragRef.current = null
  }

  // ── Helpers d'affichage ──
  function benefById(id: number): Beneficiaire | undefined {
    return benefs.find(b => b.id === id)
  }

  // Ateliers visibles : tous, mais on traite à part ceux sans compétence cochée
  const ateliersAffichables = sessions
    .filter(s => s.statut !== "terminé" && s.statut !== "annulé")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const brouillonsActifs = ateliersAffichables.filter(a => brouillons[a.id])

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="bg-amber-100 text-amber-800 rounded-lg p-1.5">
            <Shuffle size={16} />
          </span>
          <h1 className="text-2xl font-bold text-foreground">Brouillon groupes</h1>
        </div>
        <p className="text-sm text-muted">
          Pré-propositions de composition à partir des notes du test de positionnement. À ajuster avant validation.
        </p>
      </header>

      {/* Stats globales */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
          <p className="text-3xl font-bold text-amber-800">{brouillonsActifs.length}</p>
          <p className="text-sm text-amber-700 mt-1">Brouillon{brouillonsActifs.length > 1 ? "s" : ""} en attente</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4">
          <p className="text-3xl font-bold text-foreground">{ateliersAffichables.length - brouillonsActifs.length}</p>
          <p className="text-sm text-muted mt-1">Atelier{ateliersAffichables.length - brouillonsActifs.length > 1 ? "s" : ""} sans brouillon</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-4">
          <p className="text-3xl font-bold text-foreground">{benefs.filter(b => b.statut === "actif").length}</p>
          <p className="text-sm text-muted mt-1">Bénéficiaires actifs</p>
        </div>
      </div>

      {ateliersAffichables.length === 0 ? (
        <EtatVide
          icon={<Shuffle size={36} className="text-slate-300" />}
          titre="Aucun atelier à venir"
          message="Crée d'abord un atelier depuis la page Ateliers pour pouvoir générer un brouillon de groupes."
          action={<Link href="/ateliers" className="text-sm text-ateliers-dark hover:underline">→ Aller à Ateliers</Link>}
        />
      ) : (
        <div className="flex flex-col gap-5">
          {ateliersAffichables.map(atelier => {
            const brouillon = brouillons[atelier.id]
            const pasDeCompetence = atelier.competencesCiblees.length === 0

            return (
              <article key={atelier.id} className="bg-surface rounded-xl border border-border overflow-hidden">
                {/* Header atelier */}
                <header className="px-5 py-4 border-b border-border flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-semibold text-foreground">{atelier.titre}</h2>
                      <span className="text-[10px] text-muted">{new Date(atelier.date).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      {atelier.competencesCiblees.map(c => {
                        const t = THEMATIQUES.find(x => x.key === c)
                        return t ? (
                          <span key={c} className="text-[10px] bg-ateliers/10 text-ateliers-dark px-1.5 py-0.5 rounded font-medium">
                            {t.short}
                          </span>
                        ) : null
                      })}
                      {(atelier.ageMin !== null || atelier.ageMax !== null) && (
                        <span className="text-[10px] text-muted">· {atelier.ageMin ?? "?"}-{atelier.ageMax ?? "?"} ans</span>
                      )}
                      {atelier.tailleGroupeCible !== null && (
                        <span className="text-[10px] text-muted">· groupes de {atelier.tailleGroupeCible}</span>
                      )}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        atelier.mixerNiveaux ? "bg-communication-light text-communication-dark" : "bg-ateliers-light text-ateliers-dark"
                      }`}>
                        {atelier.mixerNiveaux ? "hétérogène" : "homogène"}
                      </span>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2 shrink-0">
                    {brouillon ? (
                      <>
                        <button
                          onClick={() => ouvrirParametres(atelier)}
                          className="flex items-center gap-1.5 text-xs font-medium border border-border bg-surface text-foreground px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <Settings size={12} /> Régénérer
                        </button>
                        <button
                          onClick={() => validerComposition(atelier, brouillon)}
                          className="flex items-center gap-1.5 text-xs font-medium bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle2 size={12} /> Valider la composition
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => genererPour(atelier)}
                        disabled={pasDeCompetence}
                        title={pasDeCompetence ? "Coche au moins une compétence ciblée sur l'atelier" : "Générer un brouillon"}
                        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                          pasDeCompetence
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-amber-500 text-white hover:bg-amber-600"
                        }`}
                      >
                        <Sparkles size={12} /> Générer un brouillon
                      </button>
                    )}
                  </div>
                </header>

                {/* Corps */}
                <div className="px-5 py-4">
                  {pasDeCompetence && !brouillon && (
                    <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
                      <AlertTriangle size={12} />
                      Aucune compétence ciblée n'est cochée pour cet atelier. Édite l'atelier pour en cocher au moins une.
                    </p>
                  )}

                  {brouillon && brouillon.parametres.erreurs.length > 0 && (
                    <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">
                      <p className="font-semibold mb-1 flex items-center gap-1"><AlertTriangle size={12} /> Génération impossible</p>
                      <ul className="list-disc pl-4">
                        {brouillon.parametres.erreurs.map((e, i) => <li key={i}>{e}</li>)}
                      </ul>
                    </div>
                  )}

                  {brouillon && brouillon.groupes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {brouillon.groupes.map(g => (
                        <GroupeCard
                          key={g.id}
                          groupe={g}
                          atelierId={atelier.id}
                          dims={atelier.competencesCiblees}
                          benefById={benefById}
                          onDragStart={onDragStart}
                          onDrop={onDropOnGroupe}
                        />
                      ))}
                    </div>
                  )}

                  {/* Buckets — bénéficiaires non placés */}
                  {brouillon && (brouillon.aEvaluer.length + brouillon.horsTranche.length > 0) && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {brouillon.aEvaluer.length > 0 && (
                        <BucketCard
                          color="amber"
                          icon={<AlertTriangle size={11} />}
                          titre={`À évaluer (${brouillon.aEvaluer.length})`}
                          sousTitre="Aucune note initiale renseignée"
                          membres={brouillon.aEvaluer.map(id => benefById(id)).filter((b): b is Beneficiaire => !!b)}
                        />
                      )}
                      {brouillon.horsTranche.length > 0 && (
                        <BucketCard
                          color="slate"
                          icon={<Users size={11} />}
                          titre={`Hors tranche d'âge (${brouillon.horsTranche.length})`}
                          sousTitre={`Cible : ${atelier.ageMin}-${atelier.ageMax} ans`}
                          membres={brouillon.horsTranche.map(id => benefById(id)).filter((b): b is Beneficiaire => !!b)}
                        />
                      )}
                    </div>
                  )}

                  {brouillon && (
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted">
                      <span>
                        Généré le {new Date(brouillon.generedAt).toLocaleString("fr-FR")} · Mode <b>{brouillon.parametres.mode}</b>
                      </span>
                      <button onClick={() => supprimerBrouillon(atelier.id)} className="hover:text-foreground hover:underline">
                        <RotateCcw size={10} className="inline mr-1" /> Abandonner ce brouillon
                      </button>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}

      {/* ── SlideOver paramètres de régénération ── */}
      <SlideOver
        open={paramSlide}
        onClose={() => setParamSlide(false)}
        title="Régénérer le brouillon"
        subtitle={paramAtelier?.titre}
        width="md"
      >
        <form onSubmit={e => { e.preventDefault(); validerParametres() }} className="flex flex-col gap-4">
          <p className="text-xs text-muted">
            Modifie les paramètres ci-dessous pour relancer l'algorithme.
            Le brouillon actuel sera remplacé.
          </p>
          <Field label="Taille de groupe cible">
            <Input
              type="number" min={2} max={30}
              value={paramForm.tailleGroupeCible}
              onChange={e => setParamForm(f => ({ ...f, tailleGroupeCible: Number(e.target.value) }))}
            />
          </Field>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={paramForm.mixerNiveaux}
              onChange={e => setParamForm(f => ({ ...f, mixerNiveaux: e.target.checked }))}
              className="rounded border-border"
            />
            <span className="text-sm text-foreground">
              Mélanger les niveaux <span className="text-muted text-xs">(hétérogène)</span>
            </span>
          </label>
          <p className="text-[11px] text-muted bg-slate-50 rounded-lg px-3 py-2">
            💡 <b>Mode homogène</b> : les bénéficiaires aux notes proches sont regroupés (rythme pédagogique adapté).<br />
            <b>Mode hétérogène</b> : les niveaux sont mélangés (entraide entre pairs).
          </p>
          <SaveButton />
        </form>
      </SlideOver>
    </div>
  )
}

// ──────────────────────────────────────────────
// Sous-composants
// ──────────────────────────────────────────────

function GroupeCard(props: {
  groupe: GroupeBrouillon
  atelierId: number
  dims: typeof THEMATIQUES[number]["key"][]
  benefById: (id: number) => Beneficiaire | undefined
  onDragStart: (benefId: number, fromGroupeId: string, atelierId: number) => void
  onDrop: (toGroupeId: string, atelierId: number) => void
}) {
  const { groupe, atelierId, dims, benefById, onDragStart, onDrop } = props
  const [over, setOver] = useState(false)

  return (
    <div
      onDragOver={e => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); onDrop(groupe.id, atelierId) }}
      className={`rounded-xl border bg-surface transition-colors ${over ? "border-ateliers ring-2 ring-ateliers/20" : "border-border"}`}
    >
      <header className="px-3 py-2 border-b border-border flex items-center justify-between gap-2 flex-wrap">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">{groupe.nom}</p>
          <p className="text-[10px] text-muted">{groupe.beneficiaireIds.length} bénéficiaire{groupe.beneficiaireIds.length > 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {groupe.encadrantsRequis !== null && (
            <span className="text-[10px] bg-benevoles-light text-benevoles-dark px-1.5 py-0.5 rounded flex items-center gap-1">
              <UserCheck size={9} /> {groupe.encadrantsRequis} encadrant·e{groupe.encadrantsRequis > 1 ? "s" : ""}
            </span>
          )}
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${cohesionColor(groupe.scoreCohesion)}`}>
            cohésion {groupe.scoreCohesion}%
          </span>
        </div>
      </header>
      <ul className="px-2 py-2 flex flex-col gap-1 min-h-[60px]">
        {groupe.beneficiaireIds.length === 0 && (
          <li className="text-[11px] text-muted italic text-center py-3">Glisse un bénéficiaire ici</li>
        )}
        {groupe.beneficiaireIds.map(id => {
          const b = benefById(id)
          if (!b) return null
          const age = computeAge(b.dateNaissance)
          return (
            <li
              key={b.id}
              draggable
              onDragStart={() => onDragStart(b.id, groupe.id, atelierId)}
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-50 cursor-grab active:cursor-grabbing"
            >
              <GraduationCap size={12} className="text-ateliers-dark shrink-0" />
              <span className="text-xs font-medium text-foreground">{b.prenom} {b.nom}</span>
              {age !== null && <span className="text-[10px] text-muted">{age} ans</span>}
              <span className="ml-auto flex gap-1">
                {dims.map(d => {
                  const n = b.positionnementInitial[d]
                  return (
                    <span key={d} className="text-[10px] text-muted tabular-nums">
                      {n ?? "—"}
                    </span>
                  )
                })}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function BucketCard(props: {
  color: "amber" | "slate"
  icon: React.ReactNode
  titre: string
  sousTitre: string
  membres: Beneficiaire[]
}) {
  const { color, icon, titre, sousTitre, membres } = props
  const palette = color === "amber"
    ? "bg-amber-50 border-amber-200 text-amber-800"
    : "bg-slate-50 border-slate-200 text-slate-700"
  return (
    <div className={`rounded-xl border p-3 ${palette}`}>
      <p className="text-xs font-semibold flex items-center gap-1.5 mb-0.5">{icon} {titre}</p>
      <p className="text-[10px] opacity-80 mb-2">{sousTitre}</p>
      <div className="flex flex-wrap gap-1">
        {membres.map(b => (
          <span key={b.id} className="text-[10px] bg-white/60 px-1.5 py-0.5 rounded">
            {b.prenom} {b.nom}
          </span>
        ))}
      </div>
    </div>
  )
}

function EtatVide(props: {
  icon: React.ReactNode
  titre: string
  message: string
  action?: React.ReactNode
}) {
  return (
    <div className="text-center py-20 bg-surface rounded-xl border border-border">
      <div className="mx-auto mb-4 inline-flex p-3 rounded-full bg-slate-50">
        {props.icon}
      </div>
      <p className="font-semibold text-foreground">{props.titre}</p>
      <p className="text-sm text-muted mt-1 max-w-md mx-auto">{props.message}</p>
      {props.action && <div className="mt-4">{props.action}</div>}
    </div>
  )
}

