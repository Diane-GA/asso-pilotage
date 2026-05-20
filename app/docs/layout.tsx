"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, ChevronRight } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const docLinks = [
  { href: "/docs",             label: "Sommaire" },
  { href: "/docs/apprenantes", label: "Apprenantes" },
  { href: "/docs/demarrage",   label: "Démarrage" },
  { href: "/docs/gitflow",     label: "Gitflow" },
  { href: "/docs/livraison",   label: "Livraison" },
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

          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5">Guides</p>

          {docLinks.map(({ href, label }) => {
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
        </nav>
      </aside>

      {/* Contenu */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
