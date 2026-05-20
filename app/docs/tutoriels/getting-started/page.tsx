"use client"

export default function GettingStartedPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
      <header>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-ateliers-light text-ateliers-dark">Tutoriel</span>
        <h1 className="text-3xl font-bold text-foreground mt-4">Prise en main du projet</h1>
        <p className="text-muted mt-2">Cloner le projet, le faire tourner en local, comprendre sa structure, et être prêt à contribuer. Durée estimée : 20 minutes.</p>
      </header>

      <section className="space-y-3">
        <div className="bg-ateliers-light border border-ateliers/20 rounded-xl p-4 text-sm text-ateliers-dark">
          <strong>Prérequis :</strong> Node.js ≥ 18, npm, accès au repo GitHub.
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Étape 1 — Cloner et installer</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`git clone https://github.com/anais0210/asso-pilotage.git
cd asso-pilotage
npm install`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Étape 2 — Lancer en développement</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`npm run dev -- --port 3001`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          Ouvrir <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">http://localhost:3001</code>.
          Connexion avec le compte démo : <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">admin@asso.fr</code> / <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">admin1234</code>.
        </p>
        <div className="bg-ateliers-light border border-ateliers/20 rounded-xl p-4 text-sm text-ateliers-dark">
          <strong>Pourquoi le port 3001 ?</strong> Le port 3000 est souvent occupé par d&apos;autres projets du workspace. C&apos;est une convention locale — Vercel utilise le port configuré automatiquement.
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Étape 3 — Explorer l&apos;interface</h2>
        <p className="text-sm text-muted leading-relaxed">L&apos;application comporte 9 modules accessibles via la sidebar :</p>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1">
          <li><strong>Vue d&apos;ensemble</strong> — point d&apos;entrée, KPIs par module</li>
          <li><strong>Émargement</strong> — sélecteur de séance, toggle présence par apprenante</li>
          <li><strong>Absences</strong> — liste du jour, cycle de statut au clic</li>
          <li><strong>Finances</strong> — demandes de financement + frais d&apos;inscription</li>
          <li><strong>Ateliers</strong> — planning + notes + composition des groupes</li>
          <li><strong>Communication</strong> — calendrier éditorial + kanban de validation</li>
          <li><strong>Bénévoles</strong> — disponibilités + assignation aux événements</li>
          <li><strong>Membres</strong> — annuaire de l&apos;équipe</li>
          <li><strong>Roadmap stratégique</strong> — matrice impact/facilité</li>
        </ol>
        <div className="bg-ateliers-light border border-ateliers/20 rounded-xl p-4 text-sm text-ateliers-dark">
          <strong>Important :</strong> toutes les données sont stockées en <code className="bg-white/50 px-1 rounded font-mono text-xs">localStorage</code>. Elles persistent entre les rechargements mais sont perdues si on vide le cache navigateur. C&apos;est intentionnel pour cette phase (voir ADR 001).
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Étape 4 — Comprendre la structure des fichiers</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`app/               Pages (une par module)
components/        Composants partagés
lib/               Données mock + helpers auth
docs/              Cette documentation
CLAUDE.md          Contexte pour les assistants IA
AGENTS.md          Avertissements techniques stack`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          Chaque page dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">app/</code> est un fichier <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">page.tsx</code> autonome avec <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">&quot;use client&quot;</code> en première ligne.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Étape 5 — Faire sa première modification</h2>
        <p className="text-sm text-muted leading-relaxed">
          Ouvrir <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">app/dashboard/page.tsx</code> et changer le titre :
        </p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`<h1 className="text-2xl font-bold text-foreground">Vue d'ensemble</h1>`}</pre>
        <p className="text-sm text-muted leading-relaxed">Sauvegarder — le HMR rechargera automatiquement la page.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Étape 6 — Vérifier que TypeScript est content</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`npx tsc --noEmit`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          Aucune erreur attendue. <strong>Ne jamais commit avec des erreurs TypeScript</strong> — le build Vercel échouera.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Étape 7 — Pousser et déployer</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`git add .
git commit -m "feat: ma première modification"
git push`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          Vercel déclenche automatiquement un déploiement sur <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">main</code>. Voir le résultat sur <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">asso-inky.vercel.app</code>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground mt-2">Ce que tu viens d&apos;apprendre</h2>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>La stack (Next.js 16 + Tailwind v4 + localStorage)</li>
          <li>Comment lancer le projet en local</li>
          <li>La structure des modules</li>
          <li>Le cycle dev → commit → deploy</li>
        </ul>
      </section>
    </div>
  )
}
