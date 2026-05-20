"use client"

import Link from "next/link"

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-slate-900 text-green-300 rounded-xl p-4 text-xs leading-relaxed overflow-x-auto my-3 font-mono">
      <code>{children}</code>
    </pre>
  )
}

function Rule({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-muted leading-relaxed">
      <span className={`shrink-0 font-bold mt-0.5 ${ok ? "text-finances-dark" : "text-red-500"}`}>{ok ? "✓" : "✗"}</span>
      <span>{children}</span>
    </li>
  )
}

export default function GitflowPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <header className="mb-10">
        <p className="text-xs font-semibold text-communication-dark uppercase tracking-wider mb-2">Guide technique</p>
        <h1 className="text-3xl font-bold text-foreground leading-tight">Guide de contribution — Gitflow</h1>
        <p className="mt-3 text-muted text-sm leading-relaxed">
          Comment on travaille ensemble à 10 sur le même projet. Lis ce guide <strong>avant</strong> de modifier quoi que ce soit.
        </p>
      </header>

      {/* Les 3 branches */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">Les 3 branches à connaître</h2>
        <CodeBlock>{`main  ─────────────────────────────▶  production (asso-inky.vercel.app)
  ↑ merge uniquement via PR validée
dev   ─────────────────────────────▶  intégration (branche commune)
  ↑ merge uniquement via PR validée
feature/prenom-xxx  ───────────────▶  ta branche personnelle`}</CodeBlock>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-xs font-semibold text-muted uppercase tracking-wider">Branche</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold text-muted uppercase tracking-wider">Rôle</th>
                <th className="text-left py-2 text-xs font-semibold text-muted uppercase tracking-wider">Qui peut pusher ?</th>
              </tr>
            </thead>
            <tbody>
              {[
                { branch: "main", role: "Production — ce que voit l'association", who: "Personne (PR obligatoire + 1 validation)" },
                { branch: "dev", role: "Intégration — le travail combiné de l'équipe", who: "Personne (PR obligatoire + 1 validation)" },
                { branch: "feature/prenom-xxx", role: "Ton travail en cours", who: "Toi uniquement" },
              ].map(({ branch, role, who }) => (
                <tr key={branch} className="border-b border-border">
                  <td className="py-3 pr-4 font-mono text-xs text-slate-600 bg-slate-50 rounded px-2">{branch}</td>
                  <td className="py-3 pr-4 text-muted">{role}</td>
                  <td className="py-3 text-muted">{who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Workflow quotidien */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">Workflow quotidien</h2>

        <h3 className="text-sm font-bold text-foreground mb-2">Matin — avant de commencer</h3>
        <CodeBlock>{`# 1. Va sur dev et récupère les dernières modifications de l'équipe
git checkout dev
git pull origin dev

# 2. Mets à jour ta branche avec les nouveautés
git checkout feature/ton-prenom-xxx
git merge dev`}</CodeBlock>

        <h3 className="text-sm font-bold text-foreground mb-2 mt-5">Pendant que tu travailles</h3>
        <CodeBlock>{`# Sauvegarde ton travail régulièrement (plusieurs fois par jour)
git add .
git commit -m "description courte de ce que tu as fait"

# Exemples de bons messages :
# "ajout filtre par niveau sur la page bénéficiaires"
# "correction affichage date atelier sur mobile"
# "ajout champ email parent dans le formulaire"`}</CodeBlock>

        <h3 className="text-sm font-bold text-foreground mb-2 mt-5">Quand tu veux partager ton travail</h3>
        <CodeBlock>{`# Envoie ta branche sur GitHub
git push origin feature/ton-prenom-xxx`}</CodeBlock>
        <p className="text-sm text-muted leading-relaxed mt-2">Puis sur GitHub :</p>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1 leading-relaxed mt-2">
          <li>Va sur <strong>github.com/anais0210/asso-pilotage</strong></li>
          <li>Tu verras un bandeau jaune "Compare &amp; pull request" → clique dessus</li>
          <li>Assure-toi que la cible est <strong>dev</strong> (pas main !)</li>
          <li>Décris rapidement ce que tu as fait</li>
          <li>Clique <strong>"Create pull request"</strong></li>
          <li>Préviens quelqu'un dans l'équipe pour qu'il·elle valide</li>
        </ol>
      </section>

      {/* Règles */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">Règles à respecter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-finances/30 bg-finances-light p-4">
            <p className="text-xs font-semibold text-finances-dark uppercase tracking-wider mb-3">À faire</p>
            <ul className="space-y-2">
              <Rule ok={true}>Toujours travailler sur ta propre branche <code className="bg-white/60 px-1 rounded">feature/prenom-xxx</code></Rule>
              <Rule ok={true}>Faire des petits commits réguliers plutôt qu'un gros à la fin</Rule>
              <Rule ok={true}>Nommer les commits en français, clairement</Rule>
              <Rule ok={true}>Cibler <strong>dev</strong> dans tes Pull Requests, jamais main</Rule>
              <Rule ok={true}>Relire et tester ton travail avant de créer une PR</Rule>
            </ul>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-3">À ne pas faire</p>
            <ul className="space-y-2">
              <Rule ok={false}>Pusher directement sur <code className="bg-white/60 px-1 rounded">main</code> ou <code className="bg-white/60 px-1 rounded">dev</code></Rule>
              <Rule ok={false}>Travailler à deux sur la même branche sans le dire</Rule>
              <Rule ok={false}>Fusionner ta propre PR sans validation d'une autre personne</Rule>
              <Rule ok={false}>Supprimer les branches des autres</Rule>
            </ul>
          </div>
        </div>
      </section>

      {/* Nommage */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-3">Nommage des branches</h2>
        <p className="text-sm text-muted mb-2">Format : <code className="bg-slate-100 text-slate-700 px-1 rounded">feature/prenom-description-courte</code></p>
        <CodeBlock>{`# Bien ✓
feature/marie-page-beneficiaires
feature/camille-correction-formulaire
feature/fatoumata-filtre-ateliers

# Pas bien ✗
test
modif-truc
mabranche`}</CodeBlock>
      </section>

      {/* Cycle complet */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">Cycle complet : de l'idée à la production</h2>
        <CodeBlock>{`1. Tu crées ta branche feature
        ↓
2. Tu développes + commits réguliers
        ↓
3. Tu push sur GitHub
        ↓
4. Tu crées une Pull Request → dev
        ↓
5. Une collègue relit et valide (ou demande des corrections)
        ↓
6. La PR est fusionnée dans dev
        ↓
7. Quand dev est stable → PR de dev → main
        ↓
8. main se déploie automatiquement sur Vercel 🚀`}</CodeBlock>
      </section>

      {/* Commandes utiles */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-3">Commandes utiles</h2>
        <CodeBlock>{`# Voir sur quelle branche tu es
git branch

# Voir l'état de tes fichiers modifiés
git status

# Voir l'historique des commits
git log --oneline

# Annuler les modifications d'un fichier (attention, irréversible)
git checkout -- nom-du-fichier.tsx

# Récupérer les dernières modifs sans changer de branche
git fetch origin`}</CodeBlock>
      </section>

      {/* Conflits */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-3">En cas de conflit</h2>
        <p className="text-sm text-muted leading-relaxed mb-3">
          Un conflit arrive quand deux personnes ont modifié le même fichier. Git te signalera les fichiers en conflit avec des marqueurs.
        </p>
        <CodeBlock>{`<<<<<<< HEAD (tes modifications)
  ton code ici
=======
  le code de l'autre personne
>>>>>>> dev`}</CodeBlock>
        <p className="text-sm text-muted mb-2 mt-3 font-medium">Que faire :</p>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1 leading-relaxed">
          <li>Ouvre le fichier dans ton éditeur</li>
          <li>Choisis quelle version garder (ou fusionne les deux)</li>
          <li>Supprime les marqueurs <code className="bg-slate-100 px-1 rounded">&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code className="bg-slate-100 px-1 rounded">=======</code>, <code className="bg-slate-100 px-1 rounded">&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code></li>
          <li>Sauvegarde</li>
          <li><code className="bg-slate-100 px-1 rounded">git add .</code> puis <code className="bg-slate-100 px-1 rounded">git commit</code></li>
        </ol>
        <div className="bg-ateliers-light border border-ateliers/20 rounded-xl p-4 mt-4">
          <p className="text-ateliers-dark text-sm">En cas de doute : <strong>appelle Anaïs</strong> avant de toucher quoi que ce soit.</p>
        </div>
      </section>

      {/* Footer nav */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Link href="/docs/demarrage" className="text-sm text-muted hover:text-foreground transition-colors">← Démarrage</Link>
        <Link href="/docs/livraison" className="text-sm text-ateliers-dark font-medium hover:underline">Livraison →</Link>
      </div>
    </div>
  )
}
