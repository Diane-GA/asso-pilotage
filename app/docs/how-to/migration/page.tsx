"use client"

const code = "bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700"

export default function MigrationPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
      <header>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-finances-light text-finances-dark">How-to</span>
        <h1 className="text-3xl font-bold text-foreground mt-4">Migrer le projet vers l&apos;association</h1>
        <p className="text-muted mt-2">
          Transférer la propriété technique d&apos;Asso Pilotage des comptes personnels (<code className={code}>anais0210</code>)
          vers des comptes appartenant à l&apos;association : GitHub, Vercel, Google, Anthropic.
        </p>
      </header>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 leading-relaxed">
        ⏱️ Compter <strong>2 à 3 heures</strong>. Faire la bascule sur un créneau calme — le site peut être
        indisponible quelques minutes pendant la reconnexion Vercel.
      </div>

      {/* Vue d'ensemble */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Vue d&apos;ensemble</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-3 py-2 font-semibold text-foreground">Service</th>
                <th className="px-3 py-2 font-semibold text-foreground">Actuel</th>
                <th className="px-3 py-2 font-semibold text-foreground">Ce qui migre</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              {[
                ["GitHub", "anais0210 (perso)", "Le dépôt asso-pilotage (historique, issues, PRs)"],
                ["Vercel", "Compte perso", "Le projet + variables d'env + domaine"],
                ["Google Cloud", "Projet GCP perso", "Le compte de service (clés)"],
                ["Google Sheet + Drive", "Drive perso", "Sheet BDD_Asso_CRM + 4 dossiers de documents"],
                ["Anthropic (Claude)", "Compte perso", "La clé API (module Communication)"],
                ["Zapier (si utilisé)", "Compte perso", "Le Zap + l'URL du webhook"],
              ].map(([s, a, m]) => (
                <tr key={s} className="border-t border-border">
                  <td className="px-3 py-2 font-medium text-foreground">{s}</td>
                  <td className="px-3 py-2">{a}</td>
                  <td className="px-3 py-2">{m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-foreground">Comptes à créer côté association (préalable)</h3>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1">
          <li>Une <strong>organisation GitHub</strong> (plan gratuit suffisant)</li>
          <li>Un <strong>compte Google</strong> de l&apos;asso (idéalement Google Workspace, ex. <code className={code}>tech@nom-asso.org</code>)</li>
          <li>Un <strong>compte Vercel</strong> avec une <strong>Team</strong></li>
          <li>Un <strong>compte Anthropic</strong> avec un moyen de paiement de l&apos;asso</li>
        </ol>
        <div className="bg-familles-light border border-familles/20 rounded-xl p-3 text-sm text-familles-dark">
          💡 Créer chacun de ces comptes avec une <strong>adresse email de l&apos;association</strong> (jamais une adresse perso).
          C&apos;est le point le plus important de la passation.
        </div>

        <h3 className="text-base font-semibold text-foreground">Ordre recommandé</h3>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1">
          <li>GitHub (transfert du dépôt)</li>
          <li>Google Cloud + Sheet/Drive (backend Familles)</li>
          <li>Anthropic (clé API)</li>
          <li>Vercel (reconnexion + variables) — <strong>en dernier</strong>, une fois les secrets prêts</li>
          <li>Vérifications + références dans le code</li>
        </ol>
      </section>

      {/* 1. GitHub */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">1. GitHub — transférer le dépôt</h2>
        <p className="text-sm text-muted leading-relaxed">
          Le transfert <strong>conserve</strong> historique, issues, PRs et stars ; l&apos;ancienne URL redirige automatiquement.
        </p>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1">
          <li>Sur le dépôt → <strong>Settings → General → Danger Zone → Transfer ownership</strong></li>
          <li>Nouveau propriétaire = <strong>l&apos;organisation de l&apos;asso</strong> ; confirmer avec le nom du dépôt</li>
          <li>Un·e admin de l&apos;orga accepte le transfert (email)</li>
          <li>Ré-inviter les collaborateurs dans <strong>Settings → Collaborators and teams</strong></li>
        </ol>
        <p className="text-sm text-muted leading-relaxed">Puis mettre à jour le remote local de chaque personne :</p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`git remote set-url origin git@github.com:NOM-ORGA-ASSO/asso-pilotage.git
git remote -v`}</pre>
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
          ⚠️ La connexion Vercel↔GitHub <strong>se casse</strong> au transfert : on la refait à l&apos;étape 4.
        </div>
      </section>

      {/* 2. Google */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">2. Google Cloud + Sheet/Drive — backend Familles</h2>
        <p className="text-sm text-muted leading-relaxed">
          Le module Familles lit/écrit dans Google Sheets et stocke des documents dans Drive via un
          <strong> compte de service</strong>. Deux choses à migrer : les <strong>données</strong> et les <strong>clés</strong>.
        </p>

        <div className="bg-familles-light border border-familles/20 rounded-xl p-3 text-sm text-familles-dark">
          🔑 <strong>Transférer la propriété plutôt que recréer.</strong> Les IDs du Sheet et des dossiers sont
          <strong> codés en dur</strong> dans le code : un transfert garde les mêmes IDs → aucune modif de code.
        </div>

        <h3 className="text-base font-semibold text-foreground">2a. Transférer les données</h3>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>Sheet <code className={code}>BDD_Asso_CRM</code> → Partager → rôle <strong>Propriétaire</strong> au compte Google de l&apos;asso</li>
          <li>Les 4 dossiers Drive de documents (IDs dans <code className={code}>app/api/sheets/route.ts</code>) → idem</li>
          <li>À terme : les déplacer dans un <strong>Drive partagé</strong> appartenant à l&apos;asso</li>
        </ul>

        <h3 className="text-base font-semibold text-foreground">2b. Recréer le compte de service</h3>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1">
          <li>Google Cloud Console (compte asso) → créer un <strong>projet</strong></li>
          <li>Activer <strong>Google Sheets API</strong> et <strong>Google Drive API</strong></li>
          <li>Créer un <strong>compte de service</strong> → onglet Clés → <strong>Ajouter une clé → JSON</strong></li>
          <li>Dans le JSON : <code className={code}>client_email</code> → <code className={code}>GOOGLE_CLIENT_EMAIL</code>, <code className={code}>private_key</code> → <code className={code}>GOOGLE_PRIVATE_KEY</code></li>
          <li><strong>Partager</strong> le Sheet et les 4 dossiers avec cet email en rôle <strong>Éditeur</strong></li>
        </ol>
      </section>

      {/* 3. Anthropic */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">3. Anthropic — clé API (Communication)</h2>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1">
          <li>console.anthropic.com (compte asso) → <strong>Billing</strong> : moyen de paiement</li>
          <li><strong>API Keys → Create Key</strong> → <code className={code}>ANTHROPIC_API_KEY</code></li>
          <li>Après la bascule : <strong>révoquer</strong> l&apos;ancienne clé perso</li>
        </ol>
      </section>

      {/* 4. Vercel */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">4. Vercel — reconnecter et configurer</h2>
        <p className="text-sm text-muted leading-relaxed">À faire <strong>en dernier</strong>, une fois GitHub transféré et les secrets prêts.</p>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1">
          <li>Se connecter (compte asso) → créer/choisir une <strong>Team</strong></li>
          <li><strong>Add New → Project → Import</strong> le dépôt <code className={code}>NOM-ORGA-ASSO/asso-pilotage</code> (autoriser l&apos;app GitHub Vercel sur l&apos;orga si besoin)</li>
          <li>Framework <strong>Next.js</strong> détecté automatiquement</li>
          <li><strong>Settings → Environment Variables</strong> : ajouter les 3 variables ci-dessous (Production + Preview + Development)</li>
          <li><strong>Deploy</strong>, vérifier le build (0 erreur)</li>
          <li><strong>Settings → Domains</strong> : reconfigurer le domaine de prod</li>
        </ol>
        <p className="text-sm text-muted leading-relaxed">L&apos;ancien projet Vercel perso peut être supprimé une fois le nouveau validé.</p>
      </section>

      {/* Note Zapier (optionnel) */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
        <strong>Note — Zapier / Make (optionnel).</strong> Le module Communication peut appeler un webhook
        quand un post passe en <em>validé</em> / <em>publié</em>. C&apos;est <strong>désactivé par défaut</strong>
        et configuré dans l&apos;app (onglet <strong>Communication → Intégrations</strong>), pas au niveau infra.
        <em>Si</em> un webhook est utilisé, le recréer sous le compte de l&apos;asso et recoller la nouvelle URL dans cet onglet.
      </div>

      {/* Variables d'env */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Variables d&apos;environnement</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`GOOGLE_CLIENT_EMAIL=...@....iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
ANTHROPIC_API_KEY=sk-ant-...`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          <code className={code}>GOOGLE_PRIVATE_KEY</code> : coller exactement comme dans le JSON, avec les <code className={code}>\n</code> littéraux.
          Les variables <code className={code}>NEXT_PUBLIC_SHEETS_*</code> sont <strong>obsolètes</strong>.
        </p>
      </section>

      {/* Sécurité + checklist */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Sécurité — à ne pas oublier</h2>
        <ul className="text-sm text-muted space-y-1 leading-relaxed">
          {[
            "Révoquer l'ancienne clé Anthropic personnelle",
            "Supprimer l'ancien compte de service Google (ou sa clé)",
            "Retirer les anciens accès au Sheet / aux dossiers Drive",
            "Retirer les collaborateurs qui ne doivent plus avoir accès au dépôt",
            "Changer le mot de passe du compte démo (admin@asso.fr / admin1234)",
            "Ne jamais committer le JSON du compte de service ni les clés",
          ].map(item => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-slate-300 mt-0.5">☐</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
          ⚠️ L&apos;authentification est en localStorage (non sécurisée, voir ADR 003) : ne pas y stocker de données
          sensibles tant qu&apos;un vrai backend d&apos;auth n&apos;est pas en place.
        </div>
      </section>
    </div>
  )
}
