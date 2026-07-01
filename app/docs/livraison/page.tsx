"use client"

import Link from "next/link"

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-slate-900 text-green-300 rounded-xl p-4 text-xs leading-relaxed overflow-x-auto my-3 font-mono">
      <code>{children}</code>
    </pre>
  )
}

function SectionTitle({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
        {n}
      </span>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
    </div>
  )
}

export default function LivraisonPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <header className="mb-10">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Guide technique</p>
        <h1 className="text-3xl font-bold text-foreground leading-tight">Guide de livraison</h1>
        <p className="mt-3 text-muted text-sm leading-relaxed">
          À mettre à jour à chaque nouvelle fonctionnalité, intégration ou changement de configuration avant livraison à l'association.
        </p>
        <p className="text-xs text-muted mt-1">Dernière mise à jour : 2026-05-20</p>
      </header>

      {/* Table des matières */}
      <nav className="bg-slate-50 rounded-xl border border-border p-4 mb-10">
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Table des matières</p>
        <ol className="list-decimal list-inside text-sm text-ateliers-dark space-y-1">
          {["Présentation", "Fonctionnalités", "Accès et comptes", "Déploiement Vercel", "Configuration après livraison", "Intégrations externes", "Limites actuelles et roadmap", "Support et contacts"].map((item, i) => (
            <li key={i}><span className="hover:underline cursor-pointer">{item}</span></li>
          ))}
        </ol>
      </nav>

      {/* 1. Présentation */}
      <section className="mb-10">
        <SectionTitle n={1} title="Présentation" />
        <p className="text-sm text-muted leading-relaxed mb-4">
          <strong>Asso Pilotage</strong> est un tableau de bord de gestion interne pour une association de formation numérique.
        </p>
        <p className="text-sm text-muted leading-relaxed mb-3">Il centralise :</p>
        <ul className="list-disc list-inside text-sm text-muted space-y-1 leading-relaxed mb-4">
          <li>Le suivi des bénéficiaires (enfants + contact parent)</li>
          <li>L'organisation et l'émargement des ateliers</li>
          <li>Le suivi des financements</li>
          <li>La communication sur les réseaux sociaux</li>
          <li>La gestion des membres de l'équipe</li>
          <li>La roadmap stratégique</li>
        </ul>
        <h3 className="text-sm font-bold text-foreground mb-2">Stack technique</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {[
                ["Framework", "Next.js 16 (App Router)"],
                ["UI", "Tailwind CSS v4, lucide-react"],
                ["Persistance", "localStorage navigateur (pas de base de données)"],
                ["Hébergement", "Vercel (déploiement automatique)"],
                ["Dépôt", "github.com/anais0210/asso-pilotage"],
                ["URL production", "asso-inky.vercel.app"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-border">
                  <td className="py-2 pr-4 font-semibold text-foreground text-xs w-36">{k}</td>
                  <td className="py-2 text-muted text-xs">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
          <p className="text-amber-700 text-sm leading-relaxed">
            <strong>Important :</strong> toutes les données sont stockées dans le navigateur (<code>localStorage</code>). Chaque utilisateur·rice a ses propres données locales. Il n'y a pas de synchronisation entre les postes à ce stade (voir phase 2 en section 7).
          </p>
        </div>
      </section>

      {/* 2. Fonctionnalités */}
      <section className="mb-10">
        <SectionTitle n={2} title="Fonctionnalités" />
        <div className="flex flex-col gap-4">
          {[
            { path: "/dashboard", label: "Vue d'ensemble", items: ["KPIs globaux : alertes, stats par module", "Compteur d'alertes actives (deadline, salles non confirmées, posts à créer, candidatures en attente)"] },
            { path: "/emargement", label: "Émargement", items: ["Sélection de la séance du jour", "Liste de présence avec statuts : présent / absent / retard", "Signalement si 3+ absences cumulées", "Contact parent cliquable pour les absents"] },
            { path: "/finances", label: "Finances", items: ["Suivi des demandes de financement", "Statuts : en cours / accordé / refusé / à compléter", "Alertes sur les deadlines proches", "CRUD complet via formulaire latéral"] },
            { path: "/ateliers", label: "Ateliers", items: ["Création et suivi des séances (date, heure, salle, formatrice)", "Gestion des groupes par niveau, âge ou mixte", "Import rapide d'un groupe dans une séance"] },
            { path: "/beneficiaires", label: "Bénéficiaires", items: ["Liste complète avec recherche", "Filtres : statut et niveau", "Note d'évaluation (0-20) → niveau auto-calculé", "CRUD complet"] },
            { path: "/communication", label: "Communication", items: ["Calendrier éditorial mensuel", "Kanban : Brouillon → Soumis → Approuvé → Publié", "Gestion des événements", "Intégrations Zapier / Make"] },
            { path: "/membres", label: "Membres", items: ["Annuaire de l'équipe", "Gestion des candidatures (validation / refus)", "CRUD complet"] },
            { path: "/roadmap", label: "Roadmap stratégique", items: ["Matrice impact / facilité", "6 thèmes, 16 use cases, 43 sous-actions", "Suivi d'avancement par sous-action"] },
          ].map(({ path, label, items }) => (
            <div key={path} className="rounded-xl border border-border p-4">
              <p className="text-sm font-semibold text-foreground mb-2">
                <code className="text-xs bg-slate-100 text-slate-600 px-1 rounded">{path}</code> — {label}
              </p>
              <ul className="list-disc list-inside text-xs text-muted space-y-0.5 leading-relaxed">
                {items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Accès et comptes */}
      <section className="mb-10">
        <SectionTitle n={3} title="Accès et comptes" />
        <h3 className="text-sm font-bold text-foreground mb-2">Compte administrateur par défaut</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {[["Email", "admin@asso.fr"], ["Mot de passe", "admin1234"], ["Rôle", "Super Administratrice"]].map(([k, v]) => (
                <tr key={k} className="border-b border-border">
                  <td className="py-2 pr-4 font-semibold text-foreground text-xs w-36">{k}</td>
                  <td className="py-2 text-muted text-xs font-mono">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
          <p className="text-red-700 text-sm">Changer le mot de passe admin dès la première connexion en production (page /compte).</p>
        </div>
        <h3 className="text-sm font-bold text-foreground mb-2">Rôles disponibles</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-xs font-semibold text-muted uppercase">Rôle</th>
                <th className="text-left py-2 text-xs font-semibold text-muted uppercase">Accès</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["super_admin", "Accès complet + documentation + gestion des comptes"],
                ["admin", "Accès complet + gestion des comptes membres"],
                ["formatrice", "Tous les modules sauf gestion des comptes"],
                ["coordinatrice", "Tous les modules sauf gestion des comptes"],
                ["benevole", "Lecture seule sur la plupart des modules"],
              ].map(([role, access]) => (
                <tr key={role} className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs text-slate-600">{role}</td>
                  <td className="py-2 text-xs text-muted">{access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-sm font-bold text-foreground mb-2">Créer les comptes de l'équipe</h3>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1 leading-relaxed">
          <li>Se connecter avec le compte admin</li>
          <li>Aller dans <code className="bg-slate-100 px-1 rounded">/compte</code> → section <strong>Gestion des comptes</strong></li>
          <li>Cliquer <strong>Nouveau compte</strong></li>
          <li>Remplir prénom, nom, email, mot de passe, rôle</li>
          <li>Transmettre les identifiants à la personne concernée</li>
        </ol>
      </section>

      {/* 4. Déploiement */}
      <section className="mb-10">
        <SectionTitle n={4} title="Déploiement Vercel" />
        <h3 className="text-sm font-bold text-foreground mb-1">URL de production</h3>
        <CodeBlock>{`https://asso-inky.vercel.app`}</CodeBlock>
        <p className="text-sm text-muted leading-relaxed mb-3">
          Tout push sur la branche <code className="bg-slate-100 px-1 rounded">main</code> déclenche un déploiement automatique sur Vercel.
        </p>
        <h3 className="text-sm font-bold text-foreground mb-2">Variables d'environnement</h3>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-xs font-semibold text-muted uppercase">Variable</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold text-muted uppercase">Obligatoire</th>
                <th className="text-left py-2 text-xs font-semibold text-muted uppercase">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 pr-4 text-xs text-muted italic">aucune pour l'instant</td>
                <td className="py-2 pr-4 text-xs text-muted">—</td>
                <td className="py-2 text-xs text-muted">L'app fonctionne sans variable d'env en phase 1</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-sm font-bold text-foreground mb-1">Déployer manuellement</h3>
        <CodeBlock>{`git push origin main
# Vercel détecte le push et redéploie automatiquement (~1 min)`}</CodeBlock>
      </section>

      {/* 5. Configuration */}
      <section className="mb-10">
        <SectionTitle n={5} title="Configuration après livraison" />
        {[
          { title: "Étape 1 — Première connexion", items: ["Ouvrir https://asso-inky.vercel.app", "Se connecter avec admin@asso.fr / admin1234", "Aller dans /compte → Changer le mot de passe"] },
          { title: "Étape 2 — Créer les comptes de l'équipe", items: ["Voir section 3 — créer un compte par membre de l'équipe (4 personnes)"] },
          { title: "Étape 3 — Saisir les données initiales", items: ["Bénéficiaires (/beneficiaires) : importer la liste complète", "Groupes (/ateliers → Groupes) : créer les groupes existants", "Ateliers (/ateliers) : planifier les prochaines séances", "Financements (/finances) : saisir les demandes en cours", "Membres (/membres) : compléter la liste de l'équipe"] },
        ].map(({ title, items }) => (
          <div key={title} className="mb-5">
            <h3 className="text-sm font-bold text-foreground mb-2">{title}</h3>
            <ol className="list-decimal list-inside text-sm text-muted space-y-1 leading-relaxed">
              {items.map(item => <li key={item}>{item}</li>)}
            </ol>
          </div>
        ))}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-amber-700 text-sm leading-relaxed">
            <strong>Rappel :</strong> les données sont stockées localement dans chaque navigateur. Chaque personne a sa propre instance. La synchronisation entre postes est prévue en <strong>phase 2</strong> (Supabase).
          </p>
        </div>
      </section>

      {/* 6. Intégrations */}
      <section className="mb-10">
        <SectionTitle n={6} title="Intégrations externes" />
        <h3 className="text-sm font-bold text-foreground mb-2">6.1 Réseaux sociaux — Zapier / Make</h3>
        <p className="text-sm text-muted leading-relaxed mb-3">
          Permet de publier automatiquement les posts approuvés sur LinkedIn, Instagram et Facebook.
        </p>
        <p className="text-sm text-muted mb-2 font-medium">Configuration dans l'app :</p>
        <ol className="list-decimal list-inside text-sm text-muted space-y-1 leading-relaxed mb-4">
          <li>Aller dans <code className="bg-slate-100 px-1 rounded">/communication</code> → onglet <strong>Intégrations</strong></li>
          <li>Sélectionner <strong>Zapier / Make</strong></li>
          <li>Créer un compte Zapier (gratuit) ou Make (gratuit jusqu'à 1 000 ops/mois)</li>
          <li>Créer un Zap/scénario avec déclencheur <strong>Webhook → Catch Hook</strong></li>
          <li>Copier l'URL du webhook dans l'app</li>
          <li>Connecter LinkedIn, Instagram for Business, Facebook Pages</li>
          <li>Activer le toggle</li>
        </ol>

        <h3 className="text-sm font-bold text-foreground mb-2">6.2 Google Sheets</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-xs font-semibold text-muted uppercase">Phase</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold text-muted uppercase">Méthode</th>
                <th className="text-left py-2 text-xs font-semibold text-muted uppercase">Statut</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Phase 1", "Export / Import CSV manuel", "À implémenter"],
                ["Phase 2", "Google Apps Script (webhook HTTP)", "Prévu"],
                ["Phase 3", "Migration Supabase complète", "Long terme"],
              ].map(([phase, method, status]) => (
                <tr key={phase} className="border-b border-border">
                  <td className="py-2 pr-4 text-xs text-foreground font-medium">{phase}</td>
                  <td className="py-2 pr-4 text-xs text-muted">{method}</td>
                  <td className="py-2 text-xs text-muted italic">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-bold text-foreground mb-2">6.3 Supabase (phase 2)</h3>
        <p className="text-sm text-muted leading-relaxed">
          Migration prévue pour synchroniser les données entre tous les postes de l'équipe et permettre la publication directe sur les réseaux sociaux sans outil tiers.
        </p>
      </section>

      {/* 7. Limites */}
      <section className="mb-10">
        <SectionTitle n={7} title="Limites actuelles et roadmap" />
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-3 text-xs font-semibold text-muted uppercase">Limite</th>
                <th className="text-left py-2 pr-3 text-xs font-semibold text-muted uppercase">Impact</th>
                <th className="text-left py-2 text-xs font-semibold text-muted uppercase">Solution phase 2</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Données en localStorage", "Pas de partage entre postes", "Migration Supabase"],
                ["Pas de notifications", "Alertes visibles seulement à la connexion", "Push notifications (Supabase Realtime)"],
                ["Export CSV non implémenté", "Saisie manuelle depuis Google Sheets", "Boutons export/import CSV"],
                ["Publication réseaux sociaux via Zapier", "Dépendance service tiers", "Direct via Supabase Edge Functions"],
                ["Pas de gestion de fichiers", "Pas de pièces jointes", "Supabase Storage"],
              ].map(([lim, impact, sol]) => (
                <tr key={lim} className="border-b border-border">
                  <td className="py-2 pr-3 text-xs text-foreground">{lim}</td>
                  <td className="py-2 pr-3 text-xs text-muted">{impact}</td>
                  <td className="py-2 text-xs text-muted">{sol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-sm font-bold text-foreground mb-2">Fonctionnalités prévues (phase 2)</h3>
        <ul className="text-sm text-muted space-y-1 leading-relaxed">
          {[
            "Export / Import CSV bénéficiaires et présences",
            "Étendre l'intégration Google Sheets aux autres modules (déjà en place pour Familles, API REST v4)",
            "Base de données Supabase partagée (multi-utilisateurs)",
            "Authentification renforcée (2FA)",
            "Publication directe réseaux sociaux (sans Zapier)",
            "Notifications par email (absences, deadlines)",
          ].map(item => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-slate-300 mt-0.5">☐</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Support */}
      <section className="mb-10">
        <SectionTitle n={8} title="Support et contacts" />
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <tbody>
              {[
                ["Développement", "anais.camille.sparesotto@gmail.com"],
                ["Dépôt GitHub", "github.com/anais0210/asso-pilotage"],
                ["Hébergement", "asso-inky.vercel.app (Vercel)"],
              ].map(([role, contact]) => (
                <tr key={role} className="border-b border-border">
                  <td className="py-2 pr-4 font-semibold text-foreground text-xs w-40">{role}</td>
                  <td className="py-2 text-xs text-muted font-mono">{contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-sm font-bold text-foreground mb-3">En cas de problème</h3>
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-border p-4">
            <p className="text-sm font-semibold text-foreground mb-1">L'app ne charge pas</p>
            <ol className="list-decimal list-inside text-xs text-muted space-y-0.5 leading-relaxed">
              <li>Vider le cache navigateur (Ctrl+Shift+R / Cmd+Shift+R)</li>
              <li>Vérifier le statut de Vercel : vercel.com/status</li>
            </ol>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="text-sm font-semibold text-foreground mb-1">Les données ont disparu</p>
            <p className="text-xs text-muted leading-relaxed">Les données sont dans le localStorage du navigateur. Si le cache a été vidé, les données sont perdues. Prévoir une sauvegarde régulière via export CSV (à implémenter en phase 2).</p>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="text-sm font-semibold text-foreground mb-1">Ajouter un·e utilisateur·rice</p>
            <p className="text-xs text-muted leading-relaxed">Seul·e un·e admin peut créer des comptes (page /compte).</p>
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Link href="/docs/gitflow" className="text-sm text-muted hover:text-foreground transition-colors">← Gitflow</Link>
        <Link href="/docs" className="text-sm text-ateliers-dark font-medium hover:underline">Sommaire →</Link>
      </div>
    </div>
  )
}
