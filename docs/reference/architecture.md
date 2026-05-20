---
type: reference
---

# Architecture générale

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────┐
│                  Next.js 16 App Router               │
├──────────────┬──────────────────────────────────────┤
│  app/login   │  app/(modules)/*                     │
│  (public)    │  (protégé par AuthGate)              │
├──────────────┴──────────────────────────────────────┤
│              components/ (partagés)                  │
│  AuthGate · Sidebar · SlideOver · StatCard          │
├─────────────────────────────────────────────────────┤
│                    lib/                              │
│  auth.ts · auth-context.tsx · mock-data.ts          │
│  emargement-data.ts · roadmap-data.ts               │
├─────────────────────────────────────────────────────┤
│               localStorage (browser)                 │
│  asso-session · asso-users · asso-absences-today    │
│  asso-demandes · asso-inscriptions · asso-benevoles │
│  asso-apprenantes · asso-membres · asso-presences   │
│  asso-roadmap-statuses                              │
└─────────────────────────────────────────────────────┘
```

## Flux d'authentification

```
Visite → AuthGate
  ├── pathname === "/login" → render page login (pas de sidebar)
  ├── user = null → redirect /login
  └── user != null → render Sidebar + page demandée
```

La session est un JSON dans `localStorage["asso-session"]`.
Voir `lib/auth.ts` pour les détails.

## Flux CRUD standard

```
Page load
  └── useState(mockData) → initialisation
  └── useEffect → load(localStorage) → hydratation

Action utilisateur
  └── openNew() / openEdit(item)
      └── setForm(...) → setSlideOpen(true)
          └── SlideOver form
              └── handleSave()
                  └── persist(data)
                      └── setItems(data)
                      └── localStorage.setItem(...)
```

## Arbre des fichiers importants

```
asso/
├── app/
│   ├── globals.css          ← Tailwind v4 + tokens couleur
│   ├── layout.tsx           ← AuthProvider + AuthGate + <main>
│   ├── page.tsx             ← redirect → /dashboard
│   ├── login/page.tsx       ← connexion / inscription
│   ├── dashboard/page.tsx   ← vue d'ensemble
│   ├── emargement/page.tsx
│   ├── absences/page.tsx
│   ├── finances/page.tsx
│   ├── ateliers/page.tsx
│   ├── communication/page.tsx
│   ├── benevoles/page.tsx
│   ├── membres/page.tsx
│   └── roadmap/page.tsx
├── components/
│   ├── AuthGate.tsx         ← protection routes + sidebar conditionnelle
│   ├── Sidebar.tsx          ← nav + chip utilisateur + logout
│   ├── SlideOver.tsx        ← panneau latéral + composants form
│   └── StatCard.tsx         ← carte KPI dashboard
├── lib/
│   ├── auth.ts              ← login/register/logout/getSession
│   ├── auth-context.tsx     ← AuthProvider + useAuth()
│   ├── mock-data.ts         ← données initiales tous modules
│   ├── emargement-data.ts   ← séances + présences types
│   └── roadmap-data.ts      ← 6 thèmes, 16 use cases, 43 sous-actions
├── docs/                    ← documentation Diataxis
├── CLAUDE.md                ← contexte IA
├── AGENTS.md                ← avertissements techniques
└── README.md                ← entrée documentation
```

## Clés localStorage

| Clé | Contenu | Page |
|---|---|---|
| `asso-session` | `AuthUser` (objet JSON) | Global (AuthGate) |
| `asso-users` | `(AuthUser & {pwd})[]]` | login/page.tsx |
| `asso-absences-today` | `AbsenceEntry[]` | absences/page.tsx |
| `asso-absences-histo` | `HistoEntry[]` | absences/page.tsx |
| `asso-demandes` | `Demande[]` | finances/page.tsx |
| `asso-inscriptions` | `Inscription[]` | finances/page.tsx |
| `asso-apprenantes` | `Apprenante[]` | ateliers/page.tsx |
| `asso-benevoles` | `Benevole[]` | benevoles/page.tsx |
| `asso-membres` | `Membre[]` | membres/page.tsx |
| `asso-presences` | `Record<seanceId, Record<apprenanteId, PresenceStatus>>` | emargement/page.tsx |
| `asso-roadmap-statuses` | `Record<subActionId, Status>` | roadmap/page.tsx |

## Conventions de nommage

| Élément | Convention | Exemple |
|---|---|---|
| Pages | `app/{module}/page.tsx` | `app/absences/page.tsx` |
| Clés storage | `asso-{module}` | `asso-benevoles` |
| Types locaux | PascalCase dans le fichier | `interface AbsenceEntry` |
| Handlers | `handle{Action}` | `handleSave`, `handleDelete` |
| Toggles inline | `toggle{Champ}(id)` | `toggleDisponible(id)` |
| Ouvrir form | `openNew()` / `openEdit(item)` | — |
