"use client"

export default function DeployerPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
      <header>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-finances-light text-finances-dark">How-to</span>
        <h1 className="text-3xl font-bold text-foreground mt-4">Déployer sur Vercel</h1>
        <p className="text-muted mt-2">Déploiement automatique via GitHub et déploiement manuel si besoin.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Déploiement automatique (recommandé)</h2>
        <p className="text-sm text-muted leading-relaxed">Tout push sur <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">main</code> déclenche un déploiement automatique :</p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`git push origin main`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          Vercel est connecté au repo GitHub <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">anais0210/asso-pilotage</code>.
          Délai de build : ~30-40 secondes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Vérifier le déploiement</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`vercel ls --prod`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          Ou dans le dashboard Vercel : <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">vercel.com/anais-projects-d34cd3c6/asso</code>
        </p>
        <p className="text-sm text-muted leading-relaxed">
          <strong>URL de production stable :</strong> <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">asso-inky.vercel.app</code>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Avant de pousser — checklist</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`npx tsc --noEmit          # 0 erreur TypeScript obligatoire
npm run build             # build local optionnel (prend ~30s)`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Déploiement manuel (si besoin)</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`vercel --prod --yes`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Variables d&apos;environnement</h2>
        <p className="text-sm text-muted leading-relaxed">
          Actuellement le projet <strong>n&apos;a pas de variables d&apos;environnement</strong> (pas de backend, pas de clés API).
        </p>
        <p className="text-sm text-muted leading-relaxed">Si tu en ajoutes :</p>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1">
          <li>Ne jamais les committer dans le repo</li>
          <li>Les ajouter dans Vercel : Settings → Environment Variables</li>
          <li>Les préfixer <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">NEXT_PUBLIC_</code> si elles doivent être accessibles côté client</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Rollback</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`vercel rollback           # retourne au déploiement précédent`}</pre>
      </section>
    </div>
  )
}
