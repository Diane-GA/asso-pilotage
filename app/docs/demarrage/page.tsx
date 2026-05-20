"use client"

import Link from "next/link"

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-slate-900 text-green-300 rounded-xl p-4 text-xs leading-relaxed overflow-x-auto my-3 font-mono">
      <code>{children}</code>
    </pre>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-bold flex items-center justify-center shrink-0">
          {n}
        </span>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
      </div>
      <div className="pl-11">{children}</div>
    </section>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-ateliers-light border border-ateliers/20 rounded-xl p-4 my-3">
      <p className="text-ateliers-dark text-sm leading-relaxed">{children}</p>
    </div>
  )
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 my-3">
      <p className="text-red-700 text-sm leading-relaxed">{children}</p>
    </div>
  )
}

export default function DemarragePage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <header className="mb-10">
        <p className="text-xs font-semibold text-finances-dark uppercase tracking-wider mb-2">Guide technique</p>
        <h1 className="text-3xl font-bold text-foreground leading-tight">Démarrage rapide</h1>
        <p className="mt-3 text-muted text-sm leading-relaxed">
          Pour tout le monde, même sans expérience de code. Suis chaque étape dans l'ordre — environ <strong>15 minutes</strong> la première fois.
        </p>
      </header>

      <Step n={1} title="Installer Node.js">
        <p className="text-sm text-muted mb-2 leading-relaxed">
          Node.js est le moteur qui fait tourner le projet sur ton ordinateur.
        </p>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1 leading-relaxed mb-3">
          <li>Va sur <strong>nodejs.org</strong></li>
          <li>Télécharge la version <strong>LTS</strong> (le bouton vert à gauche)</li>
          <li>Lance l'installateur et clique "Suivant" jusqu'à la fin</li>
          <li>Vérifie l'installation :</li>
        </ol>
        <CodeBlock>{`node --version
# Tu dois voir quelque chose comme v20.x.x`}</CodeBlock>
        <Tip>
          <strong>Ouvrir un terminal :</strong><br />
          Mac : <code>Cmd + Espace</code> → tape "Terminal" → Entrée<br />
          Windows : touche Windows → tape "PowerShell" → Entrée
        </Tip>
      </Step>

      <Step n={2} title="Installer Git">
        <p className="text-sm text-muted mb-2 leading-relaxed">
          Git permet de télécharger le projet et de sauvegarder ton travail.
        </p>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1 leading-relaxed mb-3">
          <li>Va sur <strong>git-scm.com/downloads</strong></li>
          <li>Télécharge et installe la version pour ton système</li>
          <li>Vérifie :</li>
        </ol>
        <CodeBlock>{`git --version
# Tu dois voir git version 2.x.x`}</CodeBlock>
      </Step>

      <Step n={3} title="Créer un compte GitHub">
        <p className="text-sm text-muted mb-2 leading-relaxed">
          GitHub est l'endroit où le code du projet est stocké.
        </p>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1 leading-relaxed">
          <li>Va sur <strong>github.com</strong> → "Sign up"</li>
          <li>Crée ton compte avec ton email professionnel</li>
          <li>Transmets ton <strong>nom d'utilisateur GitHub</strong> à Anaïs pour être ajouté·e au projet</li>
        </ol>
        <Warn>
          Tu ne pourras pas télécharger ni modifier le projet sans être ajouté·e au dépôt.
        </Warn>
      </Step>

      <Step n={4} title="Télécharger le projet">
        <p className="text-sm text-muted mb-2 leading-relaxed">
          Dans ton terminal, tape ces commandes une par une (copie-colle chaque ligne) :
        </p>
        <CodeBlock>{`# Va dans ton dossier Documents
cd ~/Documents

# Télécharge le projet
git clone https://github.com/anais0210/asso-pilotage.git

# Entre dans le dossier du projet
cd asso-pilotage`}</CodeBlock>
      </Step>

      <Step n={5} title="Installer les dépendances">
        <p className="text-sm text-muted mb-2 leading-relaxed">
          Toujours dans le terminal (tu dois être dans le dossier <code className="text-slate-700 bg-slate-100 px-1 rounded">asso-pilotage</code>) :
        </p>
        <CodeBlock>{`npm install`}</CodeBlock>
        <Tip>
          Cette commande télécharge tous les outils nécessaires. C'est normal si ça prend 1-2 minutes.
        </Tip>
      </Step>

      <Step n={6} title="Lancer le projet">
        <CodeBlock>{`npm run dev`}</CodeBlock>
        <p className="text-sm text-muted mb-2 leading-relaxed">Tu dois voir apparaître :</p>
        <CodeBlock>{`▲ Next.js 16.2.6
- Local: http://localhost:3000
✓ Ready in ...ms`}</CodeBlock>
        <p className="text-sm text-muted leading-relaxed">
          Ouvre ton navigateur et va sur <strong>http://localhost:3000</strong>
        </p>
        <Tip>
          <strong>Compte de connexion (développement) :</strong><br />
          Email : <code>admin@asso.fr</code> — Mot de passe : <code>admin1234</code>
        </Tip>
      </Step>

      <Step n={7} title="Créer ta branche de travail">
        <p className="text-sm text-muted mb-2 leading-relaxed">
          Avant de modifier quoi que ce soit, crée ta propre branche :
        </p>
        <CodeBlock>{`# Récupère les dernières modifications
git checkout dev
git pull origin dev

# Crée ta branche (remplace "prenom" par ton prénom en minuscules)
git checkout -b feature/prenom-description-courte`}</CodeBlock>
        <p className="text-sm text-muted mb-2">Exemples de noms de branches :</p>
        <CodeBlock>{`feature/marie-page-beneficiaires
feature/camille-correction-formulaire
feature/fatoumata-ajout-filtre-ateliers`}</CodeBlock>
      </Step>

      {/* Raccourcis */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-3">Arrêter / relancer le projet</h2>
        <p className="text-sm text-muted mb-2">Pour <strong>arrêter</strong> le serveur : dans le terminal, appuie sur <code className="bg-slate-100 px-1 rounded">Ctrl + C</code></p>
        <p className="text-sm text-muted mb-2">Pour <strong>relancer</strong> :</p>
        <CodeBlock>{`npm run dev`}</CodeBlock>
      </section>

      {/* Problèmes courants */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">En cas de problème</h2>
        <div className="flex flex-col gap-3">
          {[
            { err: '"command not found: npm"', fix: "Node.js n'est pas installé, reprends l'étape 1." },
            { err: "La page ne s'ouvre pas", fix: 'Vérifie que le terminal affiche bien "Ready" et essaie http://localhost:3000' },
            { err: "Erreur rouge dans le terminal", fix: "Copie le message d'erreur et envoie-le à Anaïs." },
            { err: "Le code d'une autre personne est apparu", fix: "Tu es sur la mauvaise branche. Fais : git checkout feature/ton-prenom-xxx" },
          ].map(({ err, fix }) => (
            <div key={err} className="rounded-xl border border-border p-4">
              <p className="text-sm font-semibold text-foreground mb-1">
                <code className="bg-slate-100 text-slate-700 px-1 rounded text-xs">{err}</code>
              </p>
              <p className="text-sm text-muted leading-relaxed">{fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer nav */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Link href="/docs/apprenantes" className="text-sm text-muted hover:text-foreground transition-colors">← Apprenantes</Link>
        <Link href="/docs/gitflow" className="text-sm text-ateliers-dark font-medium hover:underline">Gitflow →</Link>
      </div>
    </div>
  )
}
