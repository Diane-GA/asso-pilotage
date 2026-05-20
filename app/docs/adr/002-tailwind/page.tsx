"use client"

export default function Adr002Page() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
      <header>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">Explication · ADR</span>
        <h1 className="text-3xl font-bold text-foreground mt-4">ADR 002 — Tailwind v4 avec configuration CSS-first</h1>
        <p className="text-muted mt-2">Pourquoi le projet utilise Tailwind v4 et configure tout dans globals.css sans fichier tailwind.config.ts.</p>
      </header>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
        <span className="text-emerald-700 font-semibold text-sm">Statut :</span>
        <span className="text-emerald-800 font-bold text-sm">Accepté</span>
        <span className="text-emerald-600 text-xs ml-auto">2025-05-20</span>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Contexte</h2>
        <p className="text-sm text-muted leading-relaxed">
          Tailwind v4 introduit un nouveau paradigme : la configuration se fait dans le fichier CSS principal via <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">@theme inline</code>, sans fichier <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">tailwind.config.ts</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Décision</h2>
        <p className="text-sm text-muted leading-relaxed">
          Utiliser Tailwind v4 avec la configuration entièrement dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">app/globals.css</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Pourquoi ce choix</h2>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>Les tokens de couleur par module (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">absences</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">finances</code>…) sont déclarés comme variables CSS natives</li>
          <li>Les composants utilisent des classes sémantiques lisibles (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">bg-absences-light</code>) plutôt que des valeurs arbitraires</li>
          <li>Pas de fichier de config supplémentaire à maintenir</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Impact sur le développement</h2>
        <h3 className="text-base font-semibold text-foreground">Ce qui change par rapport à Tailwind v3</h3>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`/* v4 — dans globals.css */
:root { --color-absences: #f59e0b; }
@theme inline { --color-absences: var(--color-absences); }`}</pre>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`// v4 — classes générées automatiquement
"bg-absences text-absences-dark border-absences/20"`}</pre>

        <h3 className="text-base font-semibold text-foreground">Ce qui NE fonctionne pas</h3>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          <pre className="text-xs font-mono overflow-x-auto">{`// ❌ Interdit — valeur arbitraire
"bg-[var(--color-absences)]"

// ❌ Interdit — fichier de config
// tailwind.config.ts n'existe pas dans ce projet`}</pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Attention pour les assistants IA</h2>
        <p className="text-sm text-muted leading-relaxed">
          Les LLMs entraînés sur des codebases Tailwind v3 vont spontanément :
        </p>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>Créer un <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">tailwind.config.ts</code> → <strong>à supprimer</strong></li>
          <li>Écrire <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">bg-[var(--color-xxx)]</code> → <strong>à remplacer</strong> par <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">bg-xxx</code></li>
          <li>Ajouter <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">extend.colors</code> → <strong>ne fonctionne pas</strong> en v4</li>
        </ul>
        <p className="text-sm text-muted leading-relaxed">
          Se référer à <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">CLAUDE.md</code> section &quot;Ce qu&apos;il ne faut PAS faire&quot;.
        </p>
      </section>
    </div>
  )
}
