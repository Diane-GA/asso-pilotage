"use client"

export default function ArchitecturePage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
      <header>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-communication-light text-communication-dark">Référence</span>
        <h1 className="text-3xl font-bold text-foreground mt-4">Architecture générale</h1>
        <p className="text-muted mt-2">Vue d&apos;ensemble de l&apos;organisation du code, des flux de données et des conventions de nommage.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Vue d&apos;ensemble</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`┌─────────────────────────────────────────────────────┐
│                  Next.js 16 App Router               │
├──────────────┬──────────────────────────────────────┤
│  app/login   │  app/(modules)/*                     │
│  (public)    │  (protégé par AuthGate)              │
├──────────────┴──────────────────────────────────────┤
│              components/ (partagés)                  │
│  AuthGate · Sidebar · SlideOver · StatCard          │
├─────────────────────────────────────────────────────┤
│                    lib/                              │
│  auth.ts · auth-context.tsx · mock-data.ts          │
│  emargement-data.ts · roadmap-data.ts               │
├─────────────────────────────────────────────────────┤
│               localStorage (browser)                 │
│  asso-session · asso-users · asso-absences-today    │
│  asso-demandes · asso-inscriptions · asso-benevoles │
│  asso-apprenantes · asso-membres · asso-presences   │
│  asso-roadmap-statuses                              │
└─────────────────────────────────────────────────────┘`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Flux d&apos;authentification</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`Visite → AuthGate
  ├── pathname === "/login" → render page login (pas de sidebar)
  ├── user = null → redirect /login
  └── user != null → render Sidebar + page demandée`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          La session est un JSON dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">localStorage[&quot;asso-session&quot;]</code>.
          Voir <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">lib/auth.ts</code> pour les détails.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Flux CRUD standard</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`Page load
  └── useState(mockData) → initialisation
  └── useEffect → load(localStorage) → hydratation

Action utilisateur
  └── openNew() / openEdit(item)
      └── setForm(...) → setSlideOpen(true)
          └── SlideOver form
              └── handleSave()
                  └── persist(data)
                      └── setItems(data)
                      └── localStorage.setItem(...)`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Arbre des fichiers importants</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`asso/
├── app/
│   ├── globals.css          ← Tailwind v4 + tokens couleur
│   ├── layout.tsx           ← AuthProvider + AuthGate + <main>
│   ├── page.tsx             ← redirect → /dashboard
│   ├── login/page.tsx       ← connexion / inscription
│   ├── dashboard/page.tsx   ← vue d'ensemble
│   ├── emargement/page.tsx
│   ├── absences/page.tsx
│   ├── finances/page.tsx
│   ├── ateliers/page.tsx
│   ├── communication/page.tsx
│   ├── benevoles/page.tsx
│   ├── membres/page.tsx
│   └── roadmap/page.tsx
├── components/
│   ├── AuthGate.tsx         ← protection routes + sidebar conditionnelle
│   ├── Sidebar.tsx          ← nav + chip utilisateur + logout
│   ├── SlideOver.tsx        ← panneau latéral + composants form
│   └── StatCard.tsx         ← carte KPI dashboard
├── lib/
│   ├── auth.ts              ← login/register/logout/getSession
│   ├── auth-context.tsx     ← AuthProvider + useAuth()
│   ├── mock-data.ts         ← données initiales tous modules
│   ├── emargement-data.ts   ← séances + présences types
│   └── roadmap-data.ts      ← 6 thèmes, 16 use cases, 43 sous-actions
├── docs/                    ← documentation Diataxis
├── CLAUDE.md                ← contexte IA
├── AGENTS.md                ← avertissements techniques
└── README.md                ← entrée documentation`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Clés localStorage</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Clé</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Contenu</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Page</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["asso-session", "AuthUser (objet JSON)", "Global (AuthGate)"],
                ["asso-users", "(AuthUser & {pwd})[]", "login/page.tsx"],
                ["asso-absences-today", "AbsenceEntry[]", "absences/page.tsx"],
                ["asso-absences-histo", "HistoEntry[]", "absences/page.tsx"],
                ["asso-demandes", "Demande[]", "finances/page.tsx"],
                ["asso-inscriptions", "Inscription[]", "finances/page.tsx"],
                ["asso-apprenantes", "Apprenante[]", "ateliers/page.tsx"],
                ["asso-benevoles", "Benevole[]", "benevoles/page.tsx"],
                ["asso-membres", "Membre[]", "membres/page.tsx"],
                ["asso-presences", "Record<seanceId, Record<apprenanteId, PresenceStatus>>", "emargement/page.tsx"],
                ["asso-roadmap-statuses", "Record<subActionId, Status>", "roadmap/page.tsx"],
              ].map(([key, content, page]) => (
                <tr key={key} className="hover:bg-slate-50">
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">{key}</code></td>
                  <td className="px-3 py-2 text-sm text-muted border-b border-border font-mono text-xs">{content}</td>
                  <td className="px-3 py-2 text-sm text-muted border-b border-border">{page}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Conventions de nommage</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Élément</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Convention</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Exemple</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Pages", "app/{module}/page.tsx", "app/absences/page.tsx"],
                ["Clés storage", "asso-{module}", "asso-benevoles"],
                ["Types locaux", "PascalCase dans le fichier", "interface AbsenceEntry"],
                ["Handlers", "handle{Action}", "handleSave, handleDelete"],
                ["Toggles inline", "toggle{Champ}(id)", "toggleDisponible(id)"],
                ["Ouvrir form", "openNew() / openEdit(item)", "—"],
              ].map(([elem, conv, ex]) => (
                <tr key={elem} className="hover:bg-slate-50">
                  <td className="px-3 py-2 text-sm text-muted border-b border-border">{elem}</td>
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">{conv}</code></td>
                  <td className="px-3 py-2 text-sm text-muted border-b border-border">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
