"use client"

import Link from "next/link"
import { BookOpen, GraduationCap, Map, ClipboardCheck, BarChart2 } from "lucide-react"

const cards = [
  {
    href: "/docs/apprenantes",
    label: "Apprenantes",
    icon: GraduationCap,
    description: "Guide d'utilisation pour les bénéficiaires et apprenantes — connexion, modules, FAQ.",
    featured: true,
    accent: "bg-ateliers-light text-ateliers-dark border-ateliers/30",
    badge: "Page principale",
  },
  {
    href: "/docs/demarrage",
    label: "Démarrage",
    icon: ClipboardCheck,
    description: "Installer Node.js, Git, cloner le projet et lancer le serveur local en 15 minutes.",
    featured: false,
    accent: "bg-finances-light text-finances-dark border-finances/30",
    badge: null,
  },
  {
    href: "/docs/gitflow",
    label: "Gitflow",
    icon: Map,
    description: "Comment contribuer : branches, commits, pull requests et règles de l'équipe.",
    featured: false,
    accent: "bg-communication-light text-communication-dark border-communication/30",
    badge: null,
  },
  {
    href: "/docs/livraison",
    label: "Livraison",
    icon: BarChart2,
    description: "Fonctionnalités, accès, déploiement Vercel, intégrations et support.",
    featured: false,
    accent: "bg-slate-100 text-slate-700 border-slate-200",
    badge: null,
  },
  {
    href: "/docs",
    label: "ADR",
    icon: BookOpen,
    description: "Décisions d'architecture enregistrées — pourquoi localStorage, pas de backend, etc.",
    featured: false,
    accent: "bg-slate-100 text-slate-700 border-slate-200",
    badge: "À venir",
  },
]

export default function DocsIndexPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-foreground">Documentation</h1>
        <p className="mt-2 text-muted text-sm">
          Guides techniques et fonctionnels pour l'équipe et les apprenantes du projet Asso Pilotage.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {cards.map(({ href, label, icon: Icon, description, featured, accent, badge }) => (
          <Link
            key={href + label}
            href={href}
            className={`group flex items-start gap-4 p-5 rounded-xl border transition-all hover:shadow-sm ${
              featured
                ? `${accent} border`
                : "bg-surface border-border hover:border-slate-300"
            }`}
          >
            <span className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${featured ? accent : "bg-slate-100 text-slate-500"}`}>
              <Icon size={18} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-sm font-semibold ${featured ? "" : "text-foreground"}`}>{label}</span>
                {badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                    {badge}
                  </span>
                )}
              </div>
              <p className={`text-xs leading-relaxed ${featured ? "opacity-80" : "text-muted"}`}>
                {description}
              </p>
            </div>
            <span className="text-muted group-hover:text-foreground transition-colors mt-1 shrink-0">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
