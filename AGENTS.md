<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Avertissements techniques — Asso Pilotage

> Pièges connus de la stack. Lire avant d'écrire du code.

## ⚠️ lucide-react 1.16.0 — Icônes absentes (erreur de build garantie)

```
Linkedin    → <span>LI</span>
Instagram   → <span>IG</span>
Facebook    → <span>FB</span>
Kanban      → Columns3
```

Icônes disponibles dans le projet : `LayoutDashboard UserX Euro BookOpen Megaphone Users Heart Map ClipboardCheck Plus Pencil Phone CheckCircle Clock X Check RotateCcw Calendar Columns3 Shuffle AlertTriangle MapPin GraduationCap CalendarDays ChevronDown ChevronRight CheckCircle2 Circle Timer BarChart2 List StickyNote UserCog UserCircle LogOut UserCheck Search`

Vérifier : `grep -r "from 'lucide-react'" app/ components/`

## ⚠️ Tailwind v4 — Pas de tailwind.config.ts

Config dans `app/globals.css` uniquement (`@theme inline`).
Utiliser `bg-absences` **jamais** `bg-[var(--color-absences)]`.

## ⚠️ TypeScript — Pièges connus

- Notes apprenantes : `number | null` — utiliser l'interface `Apprenante` locale, pas `typeof ateliersMock.apprenantes[0]`
- Type grille roadmap : `type UCWithTheme = (typeof allUseCases)[number]` — pas `typeof allUseCases[][][]`

## ⚠️ localStorage — Hydratation SSR

Toujours dans `useEffect`, jamais directement dans le composant :
```tsx
useEffect(() => { setData(load(STORAGE_KEY, fallback)) }, [])
```

## ✅ État vérifié du projet

- `npx tsc --noEmit` → 0 erreur
- Build Vercel → OK
- Toutes les pages CRUD → fonctionnelles avec persistence localStorage
