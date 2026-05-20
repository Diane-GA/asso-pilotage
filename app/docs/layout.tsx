"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, ChevronRight } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

type DocLink = { href: string; label: string }
type DocSection = { title: string; links: DocLink[] }

const docSections: DocSection[] = [
  {
    title: "Général",
    links: [
      { href: "/docs", label: "Sommaire" },
    ],
  },
  {
    title: "Guides utilisateur",
    links: [
      { href: "/docs/apprenantes", label: "Apprenantes" },
    ],
  },
  {
    title: "Tutoriels",
    links: [
      { href: "/docs/demarrage",                    label: "Démarrage rapide" },
      { href: "/docs/tutoriels/getting-started",    label: "Premier pas" },
    ],
  },
  {
    title: "How-to",
    links: [
      { href: "/docs/how-to/nouveau-module", label: "Nouveau module" },
      { href: "/docs/how-to/crud-module",    label: "CRUD module" },
      { href: "/docs/how-to/deployer",       label: "Déployer" },
    ],
  },
  {
    title: "Référence",
    links: [
      { href: "/docs/reference/architecture", label: "Architecture" },
      { href: "/docs/reference/couleurs",     label: "Couleurs" },
      { href: "/docs/reference/composants",   label: "Composants" },
    ],
  },
  {
    title: "ADR",
    links: [
      { href: "/docs/adr/001-no-backend",    label: "001 – No backend" },
      { href: "/docs/adr/002-tailwind",      label: "002 – Tailwind v4" },
      { href: "/docs/adr/003-auth",          label: "003 – Auth" },
      { href: "/docs/adr/004-google-sheets", label: "004 – Google Sheets" },
    ],
  },
  {
    title: "Équipe",
    links: [
      { href: "/docs/gitflow",   label: "Gitflow" },
      { href: "/docs/livraison", label: "Livraison" },
    ],
  },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const pathname = usePathname()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-muted text-sm">Chargement…</span>
      </div>
    )
  }

  if (user?.role !== "super_admin" && user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold text-foreground mb-2">Accès restreint</h1>
          <p className="text-muted text-sm mb-6">
            Cette section est réservée aux super administratrices du projet.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Retour au dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar docs */}
      <aside className="w-[220px] shrink-0 min-h-screen bg-surface border-r border-border flex flex-col">
        {/* En-tête */}
        <div className="p-5 border-b border-border flex items-center gap-2.5">
          <span className="bg-slate-900 text-white rounded-lg p-1.5">
            <BookOpen size={15} />
          </span>
          <span className="font-semibold text-foreground text-sm tracking-wide">Documentation</span>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
          {/* Lien retour */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted hover:text-foreground hover:bg-slate-50 rounded-lg transition-colors mb-2"
          >
            <ChevronRight size={14} className="rotate-180 shrink-0" />
            Dashboard
          </Link>

          {docSections.map(({ title, links }) => (
            <div key={title} className="mb-2">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5">{title}</p>
              {links.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-slate-100 text-slate-700 font-semibold"
                        : "text-muted hover:bg-slate-50 hover:text-foreground"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? "bg-slate-500" : "bg-border"}`} />
                    {label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Contenu */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
