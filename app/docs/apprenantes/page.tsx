"use client"

import Link from "next/link"
import { CheckCircle2, Circle, UserCircle, BookOpen, ClipboardCheck, BarChart2, Megaphone, GraduationCap } from "lucide-react"

const steps = [
  { label: "Ouvrir le navigateur (Chrome, Firefox, Safari…)" },
  { label: "Aller sur l'adresse fournie par ton équipe" },
  { label: "Entrer ton email et ton mot de passe" },
  { label: "Cliquer sur \"Se connecter\"" },
]

const modules = [
  { icon: BarChart2,    label: "Vue d'ensemble", desc: "Les indicateurs clés de l'association en un coup d'oeil." },
  { icon: ClipboardCheck, label: "Émargement",  desc: "Signer ta présence en atelier — statut présent, absent ou retard." },
  { icon: BookOpen,     label: "Ateliers",       desc: "Voir les séances planifiées, les horaires et les salles." },
  { icon: GraduationCap, label: "Bénéficiaires", desc: "Ta fiche personnelle : niveau, ateliers suivis, contact parent." },
  { icon: Megaphone,    label: "Communication",  desc: "Les événements et actualités de l'association." },
  { icon: UserCircle,   label: "Mon compte",     desc: "Modifier ton profil, changer ton mot de passe." },
]

const faq = [
  {
    q: "J'ai oublié mon mot de passe, que faire ?",
    a: "Contacte une administratrice ou coordinatrice de l'association — elle peut réinitialiser ton mot de passe depuis la page de gestion des comptes.",
  },
  {
    q: "Mes données sont-elles partagées avec tout le monde ?",
    a: "Les données sont stockées localement dans le navigateur. Chaque poste a sa propre version. L'équipe organisatrice gère les données depuis leurs appareils.",
  },
  {
    q: "L'application ne charge pas, que faire ?",
    a: "Essaie de vider le cache de ton navigateur (Ctrl+Shift+R ou Cmd+Shift+R). Si le problème persiste, préviens l'équipe.",
  },
  {
    q: "Puis-je accéder à l'application depuis mon téléphone ?",
    a: "Oui, l'application fonctionne dans n'importe quel navigateur mobile. Ouvre l'adresse depuis Chrome ou Safari sur ton téléphone.",
  },
  {
    q: "Comment savoir si j'ai bien signé ma présence ?",
    a: "Dans le module Émargement, ton nom apparaît avec un statut vert (présent) une fois la signature validée par la formatrice.",
  },
]

export default function ApprenantesPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <header className="mb-10">
        <p className="text-xs font-semibold text-ateliers-dark uppercase tracking-wider mb-2">Guide apprenantes</p>
        <h1 className="text-3xl font-bold text-foreground leading-tight">Bienvenue sur Asso Pilotage</h1>
        <p className="mt-3 text-muted text-sm leading-relaxed">
          Ce guide est fait pour toi. En quelques minutes, tu comprendras comment utiliser cet espace.
        </p>
      </header>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-3">Qu'est-ce que cet espace ?</h2>
        <p className="text-sm text-muted leading-relaxed mb-4">
          Asso Pilotage est le tableau de bord interne de l'association. Il permet à l'équipe de gérer les ateliers,
          les présences, les financements et la communication. En tant qu'apprenante ou bénéficiaire, tu as accès à
          certaines parties de cet espace pour suivre ton parcours.
        </p>
        <div className="bg-ateliers-light rounded-xl p-4 border border-ateliers/20">
          <p className="text-ateliers-dark text-sm font-medium">
            Cet outil est conçu pour être simple. Tu n'as pas besoin de connaissances techniques pour l'utiliser.
          </p>
        </div>
      </section>

      {/* Section 2 — Connexion */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">Comment vous connecter</h2>
        <ol className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-ateliers text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-foreground leading-relaxed">{step.label}</span>
            </li>
          ))}
        </ol>
        <div className="mt-5 bg-slate-50 rounded-xl p-4 border border-border">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Identifiants fournis par l'équipe</p>
          <p className="text-sm text-foreground">
            Ton <strong>email</strong> et ton <strong>mot de passe</strong> t'ont été transmis par une formatrice ou coordinatrice.
            Si tu ne les as pas reçus, contacte l'équipe.
          </p>
        </div>
      </section>

      {/* Section 3 — Modules */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">Ce que vous pouvez consulter</h2>
        <div className="flex flex-col gap-3">
          {modules.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-surface">
              <span className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-slate-600" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground mb-0.5">{label}</p>
                <p className="text-xs text-muted leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — FAQ */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">Questions fréquentes</h2>
        <div className="flex flex-col gap-4">
          {faq.map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-border p-5">
              <div className="flex items-start gap-2 mb-2">
                <Circle size={14} className="text-ateliers shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-foreground leading-snug">{q}</p>
              </div>
              <p className="text-sm text-muted leading-relaxed pl-5">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer nav */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Link href="/docs" className="text-sm text-muted hover:text-foreground transition-colors">← Sommaire</Link>
        <Link href="/docs/demarrage" className="text-sm text-ateliers-dark font-medium hover:underline">Démarrage →</Link>
      </div>
    </div>
  )
}
