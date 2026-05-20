"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  UserX,
  Euro,
  BookOpen,
  Megaphone,
  Users,
  Heart,
  Map,
  ClipboardCheck,
} from "lucide-react"

const navItems = [
  { href: "/dashboard",      label: "Vue d'ensemble",  icon: LayoutDashboard, accent: "bg-slate-100 text-slate-700",                      dot: "bg-slate-500" },
  { href: "/emargement",     label: "Émargement",       icon: ClipboardCheck,  accent: "bg-ateliers-light text-ateliers-dark",              dot: "bg-ateliers" },
  { href: "/absences",       label: "Absences",         icon: UserX,           accent: "bg-absences-light text-absences-dark",              dot: "bg-absences" },
  { href: "/finances",       label: "Finances",         icon: Euro,            accent: "bg-finances-light text-finances-dark",              dot: "bg-finances" },
  { href: "/ateliers",       label: "Ateliers",         icon: BookOpen,        accent: "bg-ateliers-light text-ateliers-dark",              dot: "bg-ateliers" },
  { href: "/communication",  label: "Communication",    icon: Megaphone,       accent: "bg-communication-light text-communication-dark",    dot: "bg-communication" },
  { href: "/benevoles",      label: "Bénévoles",        icon: Users,           accent: "bg-benevoles-light text-benevoles-dark",            dot: "bg-benevoles" },
]

const stratItems = [
  { href: "/roadmap", label: "Roadmap stratégique", icon: Map, accent: "bg-slate-100 text-slate-700", dot: "bg-slate-600" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 min-h-screen bg-surface border-r border-border flex flex-col shrink-0">
      <div className="p-5 border-b border-border flex items-center gap-2.5">
        <span className="bg-slate-900 text-white rounded-lg p-1.5">
          <Heart size={16} />
        </span>
        <span className="font-semibold text-foreground text-sm tracking-wide">Asso</span>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5 mt-1">Opérationnel</p>
        {navItems.map(({ href, label, icon: Icon, accent, dot }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? `${accent} font-semibold`
                  : "text-muted hover:bg-slate-50 hover:text-foreground"
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${active ? dot : "bg-border"}`} />
              <Icon size={16} className="shrink-0" />
              {label}
            </Link>
          )
        })}
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5 mt-3">Stratégie</p>
        {stratItems.map(({ href, label, icon: Icon, accent, dot }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? `${accent} font-semibold`
                  : "text-muted hover:bg-slate-50 hover:text-foreground"
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${active ? dot : "bg-border"}`} />
              <Icon size={16} className="shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border text-xs text-muted">
        <p>Données simulées</p>
        <p className="mt-0.5 text-slate-400">Google Sheets à connecter</p>
      </div>
    </aside>
  )
}
