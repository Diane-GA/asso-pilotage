"use client"

import Link from "next/link"

type DocEntry = {
  href: string
  label: string
  badge: string
  badgeColor: string
  description: string
}

type DocCategory = {
  title: string
  entries: DocEntry[]
}

const categories: DocCategory[] = [
  {
    title: "Guides utilisateur",
    entries: [
      {
        href: "/docs/apprenantes",
        label: "Apprenantes",
        badge: "Guide",
        badgeColor: "bg-ateliers-light text-ateliers-dark",
        description: "Guide d'utilisation pour les bénéficiaires et apprenantes — connexion, modules, FAQ.",
      },
    ],
  },
  {
    title: "Tutoriels",
    entries: [
      {
        href: "/docs/demarrage",
        label: "Démarrage rapide",
        badge: "Tutoriel",
        badgeColor: "bg-ateliers-light text-ateliers-dark",
        description: "Installer Node.js, Git, cloner le projet et lancer le serveur local en 15 minutes.",
      },
      {
        href: "/docs/tutoriels/getting-started",
        label: "Premier pas",
        badge: "Tutoriel",
        badgeColor: "bg-ateliers-light text-ateliers-dark",
        description: "Cloner le projet, le faire tourner en local, comprendre sa structure et être prêt à contribuer.",
      },
    ],
  },
  {
    title: "How-to",
    entries: [
      {
        href: "/docs/how-to/nouveau-module",
        label: "Ajouter un nouveau module",
        badge: "How-to",
        badgeColor: "bg-finances-light text-finances-dark",
        description: "Créer une nouvelle page accessible depuis la sidebar avec sa couleur et ses données mock.",
      },
      {
        href: "/docs/how-to/crud-module",
        label: "Ajouter le CRUD à un module",
        badge: "How-to",
        badgeColor: "bg-finances-light text-finances-dark",
        description: "Bouton Ajouter, crayon par ligne, SlideOver avec formulaire et persistence localStorage.",
      },
      {
        href: "/docs/how-to/deployer",
        label: "Déployer sur Vercel",
        badge: "How-to",
        badgeColor: "bg-finances-light text-finances-dark",
        description: "Déploiement automatique via GitHub, checklist avant push, rollback et variables d'environnement.",
      },
      {
        href: "/docs/how-to/migration",
        label: "Migrer vers l'association",
        badge: "How-to",
        badgeColor: "bg-finances-light text-finances-dark",
        description: "Passation : transférer GitHub, Vercel, Google (compte de service + Sheet/Drive) et Anthropic vers les comptes de l'asso.",
      },
    ],
  },
  {
    title: "Référence",
    entries: [
      {
        href: "/docs/reference/architecture",
        label: "Architecture générale",
        badge: "Référence",
        badgeColor: "bg-communication-light text-communication-dark",
        description: "Vue d'ensemble du code, flux d'auth, flux CRUD, arbre des fichiers et conventions de nommage.",
      },
      {
        href: "/docs/reference/couleurs",
        label: "Tokens de couleur Tailwind",
        badge: "Référence",
        badgeColor: "bg-communication-light text-communication-dark",
        description: "Palette sémantique par module, variantes et instructions pour ajouter une nouvelle couleur.",
      },
      {
        href: "/docs/reference/composants",
        label: "Composants partagés",
        badge: "Référence",
        badgeColor: "bg-communication-light text-communication-dark",
        description: "API de SlideOver, Sidebar, StatCard, AuthGate et hook useAuth avec leurs props et exemples.",
      },
    ],
  },
  {
    title: "Décisions d'architecture (ADR)",
    entries: [
      {
        href: "/docs/adr/001-no-backend",
        label: "ADR 001 — Pas de backend",
        badge: "ADR",
        badgeColor: "bg-slate-100 text-slate-600",
        description: "Pourquoi localStorage first pour la phase 1 et comment migrer vers Supabase.",
      },
      {
        href: "/docs/adr/002-tailwind",
        label: "ADR 002 — Tailwind v4 CSS-first",
        badge: "ADR",
        badgeColor: "bg-slate-100 text-slate-600",
        description: "Configuration dans globals.css, classes sémantiques et pièges pour les assistants IA.",
      },
      {
        href: "/docs/adr/003-auth",
        label: "ADR 003 — Auth localStorage",
        badge: "ADR",
        badgeColor: "bg-slate-100 text-slate-600",
        description: "Authentification maison, limites de sécurité et chemin de migration vers Google SSO.",
      },
      {
        href: "/docs/adr/004-google-sheets",
        label: "ADR 004 — Google Sheets",
        badge: "ADR",
        badgeColor: "bg-slate-100 text-slate-600",
        description: "Intégration Google Sheets — API REST v4 côté serveur (compte de service) retenue, implémentée pour le module Familles.",
      },
    ],
  },
  {
    title: "Équipe",
    entries: [
      {
        href: "/docs/gitflow",
        label: "Gitflow",
        badge: "Guide équipe",
        badgeColor: "bg-benevoles-light text-benevoles-dark",
        description: "Comment contribuer : branches, commits, pull requests et règles de l'équipe.",
      },
      {
        href: "/docs/livraison",
        label: "Livraison",
        badge: "Guide équipe",
        badgeColor: "bg-benevoles-light text-benevoles-dark",
        description: "Fonctionnalités, accès, déploiement Vercel, intégrations et support.",
      },
    ],
  },
]

export default function DocsIndexPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-foreground">Documentation</h1>
        <p className="mt-2 text-muted text-sm">
          Guides techniques et fonctionnels pour l&apos;équipe et les apprenantes du projet Asso Pilotage — organisés selon la méthode Diataxis.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {categories.map(({ title, entries }) => (
          <section key={title}>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{title}</h2>
            <div className="flex flex-col gap-2">
              {entries.map(({ href, label, badge, badgeColor, description }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-surface hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
                      <span className="text-sm font-semibold text-foreground">{label}</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{description}</p>
                  </div>
                  <span className="text-muted group-hover:text-foreground transition-colors mt-0.5 shrink-0">→</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
