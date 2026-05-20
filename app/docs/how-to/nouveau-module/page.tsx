"use client"

export default function NouveauModulePage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
      <header>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-finances-light text-finances-dark">How-to</span>
        <h1 className="text-3xl font-bold text-foreground mt-4">Ajouter un nouveau module</h1>
        <p className="text-muted mt-2">Une nouvelle page accessible depuis la sidebar, avec ses propres données mock et sa couleur.</p>
      </header>

      <section className="space-y-3">
        <div className="bg-ateliers-light border border-ateliers/20 rounded-xl p-4 text-sm text-ateliers-dark">
          <strong>Prérequis :</strong> projet qui tourne en local, lecture de <code className="bg-white/50 px-1 rounded font-mono text-xs">CLAUDE.md</code>.
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">1. Choisir (ou créer) une couleur sémantique</h2>
        <p className="text-sm text-muted leading-relaxed">
          Ouvrir <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">app/globals.css</code>. Les couleurs existantes :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Module</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Token</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Hex</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Absences", "absences", "#f59e0b"],
                ["Finances", "finances", "#10b981"],
                ["Ateliers", "ateliers", "#3b82f6"],
                ["Communication", "communication", "#8b5cf6"],
                ["Bénévoles", "benevoles", "#14b8a6"],
              ].map(([mod, token, hex]) => (
                <tr key={token} className="hover:bg-slate-50">
                  <td className="px-3 py-2 text-sm text-muted border-b border-border">{mod}</td>
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">{token}</code></td>
                  <td className="px-3 py-2 text-sm text-muted border-b border-border">{hex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted leading-relaxed">
          <strong>Si tu ajoutes</strong> une nouvelle couleur (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">monmodule</code>) :
        </p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`/* app/globals.css — dans :root */
--color-monmodule: #ec4899;
--color-monmodule-light: #fce7f3;
--color-monmodule-dark: #be185d;

/* dans @theme inline */
--color-monmodule: var(--color-monmodule);
--color-monmodule-light: var(--color-monmodule-light);
--color-monmodule-dark: var(--color-monmodule-dark);`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          Les classes Tailwind <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">bg-monmodule</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">text-monmodule-dark</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">border-monmodule/20</code> sont alors disponibles.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">2. Créer la page</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`mkdir app/monmodule`}</pre>
        <p className="text-sm text-muted leading-relaxed">Créer <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">app/monmodule/page.tsx</code> :</p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`"use client"

import { useState, useEffect } from "react"

interface Item {
  id: number
  // ... champs métier
}

const STORAGE_KEY = "asso-monmodule"
const MOCK_DATA: Item[] = [
  { id: 1 /* ... */ },
]

function load(fallback: Item[]): Item[] {
  if (typeof window === "undefined") return fallback
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : fallback
  } catch { return fallback }
}

export default function MonModulePage() {
  const [items, setItems] = useState<Item[]>(MOCK_DATA)

  useEffect(() => { setItems(load(MOCK_DATA)) }, [])

  function persist(data: Item[]) {
    setItems(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Mon module</h1>
        <p className="text-sm text-muted mt-1">Description courte</p>
      </header>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-monmodule-light rounded-xl border border-monmodule/20 p-4">
          <p className="text-3xl font-bold text-monmodule-dark">{items.length}</p>
          <p className="text-sm text-monmodule-dark/70 mt-1">Libellé KPI</p>
        </div>
      </div>
    </div>
  )
}`}</pre>
        <div className="bg-ateliers-light border border-ateliers/20 rounded-xl p-4 text-sm text-ateliers-dark">
          <strong>Règle :</strong> une page = un fichier <code className="bg-white/50 px-1 rounded font-mono text-xs">page.tsx</code> autonome. Pas de dépendance entre pages.
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">3. Ajouter l&apos;entrée dans la sidebar</h2>
        <p className="text-sm text-muted leading-relaxed">
          Ouvrir <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">components/Sidebar.tsx</code>, tableau <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">navItems</code> :
        </p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`import { MonIcone } from "lucide-react"  // choisir une icône disponible

// Dans navItems :
{
  href: "/monmodule",
  label: "Mon module",
  icon: MonIcone,
  accent: "bg-monmodule-light text-monmodule-dark",
  dot: "bg-monmodule"
},`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          Vérifier que l&apos;icône existe en v1.16.0 — voir la liste dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">AGENTS.md</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">4. Ajouter une StatCard sur le dashboard</h2>
        <p className="text-sm text-muted leading-relaxed">
          Ouvrir <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">app/dashboard/page.tsx</code> et ajouter une carte dans le grid existant :
        </p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`<StatCard
  title="Mon module"
  href="/monmodule"
  color="monmodule"
  stats={[
    { label: "Libellé", value: items.length, alert: items.length === 0 },
  ]}
  action="Voir le module"
/>`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">5. Vérifier</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`npx tsc --noEmit   # 0 erreur`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          Ouvrir <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">http://localhost:3001/monmodule</code>.
        </p>
      </section>
    </div>
  )
}
