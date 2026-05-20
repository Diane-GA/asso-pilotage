# Asso Pilotage — Contexte IA

> Ce fichier est lu par les assistants IA (Claude Code, Copilot, Cursor…) en début de session.
> Il donne le contexte projet indispensable pour ne pas casser ce qui existe.

## Ce qu'est ce projet

Dashboard de pilotage pour une association de formation numérique (Ada Tech School).
**SaaS Next.js** — interface uniquement, pas de backend pour l'instant.
Persistance : `localStorage` (voir ADR 001). Données mockées dans `lib/`.

## Stack exacte

| Outil | Version | Note critique |
|---|---|---|
| Next.js | **16.2.6** | App Router, conventions différentes du Next.js courant — **lire `AGENTS.md`** |
| Tailwind CSS | **v4** | Config CSS-first dans `globals.css`, **pas de `tailwind.config.ts`** |
| React | 19 | Server Components + `"use client"` explicite |
| TypeScript | 5 | `strict: true` |
| lucide-react | 1.16.0 | Certaines icônes n'existent pas — voir liste dans `AGENTS.md` |

## Structure des modules

```
app/
├── login/          Page de connexion / inscription (publique)
├── dashboard/      Vue d'ensemble — KPIs globaux
├── emargement/     Émargement numérique par séance
├── absences/       Suivi absences du jour + historique
├── finances/       Demandes de financement + inscriptions
├── ateliers/       Planning + notes apprenantes + composition groupes
├── communication/  Calendrier éditorial + kanban validation posts
├── benevoles/      Disponibilités bénévoles + gestion événements
├── membres/        Annuaire membres (rôles, statuts, CRUD)
└── roadmap/        Matrice impact/facilité + suivi sous-actions

components/
├── Sidebar.tsx     Navigation + chip utilisateur connecté
├── SlideOver.tsx   Panneau latéral réutilisable (TOUTES les forms passent par là)
├── StatCard.tsx    Carte KPI dashboard
└── AuthGate.tsx    Protection des routes + affichage conditionnel sidebar

lib/
├── auth.ts         Helpers auth (login, register, logout, getSession)
├── auth-context.tsx Provider React + hook useAuth()
├── mock-data.ts    Données mockées (absences, finances, ateliers, com, bénévoles)
├── emargement-data.ts Séances + présences initiales
└── roadmap-data.ts  6 thèmes, 16 use cases, 43 sous-actions
```

## Conventions impératives

### Couleurs Tailwind v4 — utiliser les classes sémantiques
```tsx
// ✅ Correct
"bg-absences text-finances-dark border-ateliers/20"

// ❌ Interdit
"bg-[var(--color-absences)]"
```
Toutes les couleurs sont définies dans `app/globals.css` sous `@theme inline`.
Chaque module a sa couleur : `absences`, `finances`, `ateliers`, `communication`, `benevoles`.
Variantes disponibles : `{module}`, `{module}-light`, `{module}-dark`.

### Pattern CRUD standard
**Chaque page avec données modifiables** suit ce pattern :
1. `useState` initialisé avec données mock
2. `useEffect` → charge depuis `localStorage` (hydratation)
3. `persist(data)` → `setData(data)` + `localStorage.setItem(...)`
4. `SlideOver` pour les formulaires (jamais de modal inline)
5. `openNew()` / `openEdit(item)` → ouvre le SlideOver

```tsx
// Template type à copier
const [items, setItems] = useState<Item[]>(mockData)
useEffect(() => { setItems(load(STORAGE_KEY, mockData)) }, [])
function persist(data: Item[]) { setItems(data); localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }
```

### SlideOver — composant central
```tsx
import SlideOver, { Field, Input, Select, Textarea, FormRow, SaveButton, DeleteButton } from "@/components/SlideOver"

<SlideOver open={slideOpen} onClose={() => setSlideOpen(false)} title="..." width="md | lg">
  <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="flex flex-col gap-4">
    <Field label="Nom" required>
      <Input value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} />
    </Field>
    <SaveButton />
    {editing && <DeleteButton onClick={handleDelete} />}
  </form>
</SlideOver>
```

### Auth
```tsx
import { useAuth } from "@/lib/auth-context"
const { user, logout } = useAuth()
// user : AuthUser | null  →  { id, email, nom, prenom, role, createdAt }
// role : "admin" | "formatrice" | "coordinatrice" | "benevole"
```

### "use client" — règle
Toutes les pages sont `"use client"` (localStorage, état, hooks).
Les composants partagés aussi (`Sidebar`, `SlideOver`, `AuthGate`).
Pas de Server Actions, pas d'API routes dans ce projet (voir ADR 001).

## Ce qu'il ne faut PAS faire

- ❌ Ne pas créer `tailwind.config.ts` — config dans `globals.css`
- ❌ Ne pas importer `Linkedin`, `Instagram`, `Facebook`, `Kanban` de lucide-react (n'existent pas en v1.16.0)
- ❌ Ne pas utiliser `bg-[var(--color-xxx)]` — utiliser `bg-xxx`
- ❌ Ne pas créer de routes API (`app/api/`) sans décision d'équipe
- ❌ Ne pas mettre de données dans l'URL (PII)
- ❌ Ne pas casser le pattern SlideOver existant (cohérence UX)

## Ajouter un nouveau module — en 5 étapes

1. Créer `app/{module}/page.tsx` avec `"use client"`
2. Ajouter les données mock dans `lib/mock-data.ts`
3. Choisir une couleur ou réutiliser une existante dans `globals.css`
4. Ajouter l'entrée dans `components/Sidebar.tsx` (tableau `navItems`)
5. Ajouter une `StatCard` dans `app/dashboard/page.tsx`

→ Guide détaillé : `docs/how-to/add-new-module.md`

## Déploiement

- **GitHub** : `github.com/anais0210/asso-pilotage`
- **Vercel** : `asso-inky.vercel.app` (auto-deploy sur push `main`)
- Compte démo : `admin@asso.fr` / `admin1234`

@AGENTS.md
