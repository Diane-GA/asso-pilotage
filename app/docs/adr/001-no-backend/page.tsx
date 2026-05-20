"use client"

export default function Adr001Page() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
      <header>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">Explication · ADR</span>
        <h1 className="text-3xl font-bold text-foreground mt-4">ADR 001 — Pas de backend (localStorage first)</h1>
        <p className="text-muted mt-2">Décision d&apos;architecture enregistrée. Pourquoi cette phase de l&apos;application n&apos;a pas de base de données ni de serveur.</p>
      </header>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
        <span className="text-emerald-700 font-semibold text-sm">Statut :</span>
        <span className="text-emerald-800 font-bold text-sm">Accepté</span>
        <span className="text-emerald-600 text-xs ml-auto">2025-05-20</span>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Contexte</h2>
        <p className="text-sm text-muted leading-relaxed">
          Asso Pilotage est un outil de pilotage interne pour une association de ~10 personnes.
          Au moment du démarrage (mai 2025), le besoin principal était de <strong>valider les fonctionnalités</strong> avec l&apos;équipe avant d&apos;investir dans une infrastructure backend.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Décision</h2>
        <p className="text-sm text-muted leading-relaxed">
          <strong>Pas de base de données, pas de serveurs, pas d&apos;API</strong> pour la phase 1.
          Toutes les données sont stockées dans le <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">localStorage</code> du navigateur.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Conséquences positives</h2>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>Déploiement immédiat sur Vercel (site statique)</li>
          <li>Zéro coût d&apos;infrastructure</li>
          <li>Développement rapide (pas de migrations, pas de modèles ORM)</li>
          <li>Pas de RGPD complexe (les données ne quittent pas le navigateur de l&apos;utilisateur)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Conséquences négatives</h2>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li><strong>Pas de partage de données</strong> entre utilisateurs ou appareils</li>
          <li><strong>Perte de données</strong> si le navigateur est réinitialisé</li>
          <li>Pas de vraie authentification (la session localStorage est falsifiable)</li>
          <li>Pas de sauvegarde automatique</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Quand revisiter cette décision</h2>
        <p className="text-sm text-muted leading-relaxed">Migrer vers un vrai backend quand :</p>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>L&apos;équipe a besoin de voir les mêmes données en temps réel</li>
          <li>Les données doivent persister sur plusieurs appareils</li>
          <li>Des règles d&apos;accès différenciées par rôle sont nécessaires sur les données elles-mêmes</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Migration prévue</h2>
        <p className="text-sm text-muted leading-relaxed">
          Stack cible envisagée : <strong>Supabase</strong> (PostgreSQL hébergé, auth intégrée, API auto-générée)
        </p>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>Les types TypeScript existants (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">AuthUser</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">Membre</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">Apprenante</code>…) mapperont directement sur des tables</li>
          <li>Les clés localStorage deviendront des noms de tables</li>
          <li>Le <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">useAuth()</code> hook pourra être remplacé par <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">@supabase/auth-helpers-nextjs</code></li>
        </ul>
      </section>
    </div>
  )
}
