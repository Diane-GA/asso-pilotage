"use client"

export default function CouleursPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
      <header>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-communication-light text-communication-dark">Référence</span>
        <h1 className="text-3xl font-bold text-foreground mt-4">Tokens de couleur Tailwind</h1>
        <p className="text-muted mt-2">Palette sémantique par module et conventions d&apos;usage dans le projet.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Principes</h2>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>Config dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">app/globals.css</code> (Tailwind v4 CSS-first, <strong>pas de</strong> <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">tailwind.config.ts</code>)</li>
          <li>Chaque module a sa propre palette de 3 tokens</li>
          <li>Utiliser <strong>toujours</strong> les classes sémantiques, jamais <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">bg-[var(--color-xxx)]</code></li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Palette par module</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Module</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Base</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Light</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Dark</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Absences", "bg-absences #f59e0b", "bg-absences-light #fef3c7", "text-absences-dark #d97706", "Alertes, urgences"],
                ["Finances", "bg-finances #10b981", "bg-finances-light #d1fae5", "text-finances-dark #059669", "Succès, montants"],
                ["Ateliers", "bg-ateliers #3b82f6", "bg-ateliers-light #dbeafe", "text-ateliers-dark #1d4ed8", "Info, navigation active"],
                ["Communication", "bg-communication #8b5cf6", "bg-communication-light #ede9fe", "text-communication-dark #6d28d9", "Créatif, posts"],
                ["Bénévoles", "bg-benevoles #14b8a6", "bg-benevoles-light #ccfbf1", "text-benevoles-dark #0d9488", "Social, équipe"],
                ["Alerte", "bg-alert #ef4444", "—", "—", "Erreurs, suppressions"],
              ].map(([mod, base, light, dark, usage]) => (
                <tr key={mod} className="hover:bg-slate-50">
                  <td className="px-3 py-2 text-sm font-medium text-foreground border-b border-border">{mod}</td>
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono text-slate-700">{base}</code></td>
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono text-slate-700">{light}</code></td>
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono text-slate-700">{dark}</code></td>
                  <td className="px-3 py-2 text-sm text-muted border-b border-border">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Utilisation des variantes</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`// Carte colorée (fond clair + texte foncé + bordure)
<div className="bg-absences-light border border-absences/20 rounded-xl p-4">
  <p className="text-3xl font-bold text-absences-dark">42</p>
  <p className="text-sm text-absences-dark/70 mt-1">Absences ce mois</p>
</div>

// Badge statut
<span className="bg-finances-light text-finances-dark text-xs px-2.5 py-1 rounded-full font-medium">
  Actif
</span>

// Bordure colorée active
<div className="border-2 border-ateliers bg-ateliers-light">...</div>

// Opacité sur bordure (Tailwind slash syntax)
<div className="border border-benevoles/30">...</div>`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Couleurs neutres (Tailwind standard)</h2>
        <p className="text-sm text-muted leading-relaxed">Pour tout ce qui n&apos;est pas module-spécifique, utiliser les tokens sémantiques définis dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">globals.css</code> :</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Classe</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["text-foreground", "Texte principal"],
                ["text-muted", "Texte secondaire, labels"],
                ["bg-surface", "Fond de carte/panneau"],
                ["bg-background", "Fond global"],
                ["border-border", "Bordures neutres"],
              ].map(([cls, usage]) => (
                <tr key={cls} className="hover:bg-slate-50">
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">{cls}</code></td>
                  <td className="px-3 py-2 text-sm text-muted border-b border-border">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Ajouter une nouvelle couleur</h2>
        <p className="text-sm text-muted leading-relaxed">1. Dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">app/globals.css</code>, section <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">:root</code> :</p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`--color-monmodule: #ec4899;
--color-monmodule-light: #fce7f3;
--color-monmodule-dark: #be185d;`}</pre>
        <p className="text-sm text-muted leading-relaxed">2. Dans la section <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">@theme inline</code> :</p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`--color-monmodule: var(--color-monmodule);
--color-monmodule-light: var(--color-monmodule-light);
--color-monmodule-dark: var(--color-monmodule-dark);`}</pre>
        <p className="text-sm text-muted leading-relaxed">3. Classes disponibles immédiatement : <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">bg-monmodule</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">text-monmodule-dark</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">border-monmodule/20</code>, etc.</p>
      </section>
    </div>
  )
}
