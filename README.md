# Asso Pilotage

Dashboard de pilotage pour une association de formation numérique (Ada Tech School).
**Next.js 16.2.6 · React 19 · Tailwind v4 · TypeScript · localStorage** *(module Familles : Google Sheets API REST v4)*

🌐 **Production** : [asso-inky.vercel.app](https://asso-inky.vercel.app)
📦 **Repo** : [github.com/anais0210/asso-pilotage](https://github.com/anais0210/asso-pilotage)

---

## Démarrage rapide

```bash
npm install
npm run dev -- --port 3001   # http://localhost:3001
```

Compte démo : `admin@asso.fr` / `admin1234`

---

## Documentation (Diataxis)

La documentation suit le framework [Diataxis](https://diataxis.fr) — quatre quadrants distincts.

### 📚 Tutorials — Apprendre pas à pas
Pour comprendre le projet et faire sa première contribution.

- [Prise en main du projet](docs/tutorials/getting-started.md)

### 🔧 How-to — Recettes pratiques
Pour accomplir une tâche précise, quand on sait ce qu'on veut faire.

- [Ajouter un nouveau module](docs/how-to/add-new-module.md)
- [Ajouter le CRUD à un module](docs/how-to/add-crud-to-module.md)
- [Déployer sur Vercel](docs/how-to/deploy.md)

### 📖 Reference — Référence technique
Pour savoir comment quelque chose fonctionne.

- [Architecture générale](docs/reference/architecture.md)
- [Composants partagés (SlideOver, Sidebar…)](docs/reference/components.md)
- [Tokens de couleur Tailwind](docs/reference/color-tokens.md)
- [Modèles de données](docs/reference/data-models.md)

### 💡 Explanation — Décisions & contexte
Pour comprendre pourquoi les choses sont faites ainsi.

- [ADR 001 — Pas de backend (localStorage first)](docs/explanation/adr/001-no-backend.md)
- [ADR 002 — Tailwind v4 CSS-first](docs/explanation/adr/002-tailwind-v4-css-first.md)
- [ADR 003 — Auth localStorage](docs/explanation/adr/003-auth-localstorage.md)
- [ADR 004 — Intégration Google Sheets (module Familles, API REST v4)](docs/explanation/adr/004-google-sheets-integration.md)

---

## Modules

| Module | URL | Description |
|---|---|---|
| Vue d'ensemble | `/dashboard` | KPIs globaux, alertes |
| Émargement | `/emargement` | Présences par séance |
| Absences | `/absences` | Suivi + appels parents |
| Assiduité | `/assiduite` | Hub assiduité global par atelier |
| Bénéficiaires | `/beneficiaires` | Hub Élèves / Parents unifié (CRUD + droits image) |
| Familles | `/familles` | Familles & membres — **Google Sheets** (paiements, documents Drive, suivi) |
| Finances | `/finances` | Demandes + inscriptions |
| Ateliers | `/ateliers` | Planning, notes, groupes |
| Communication | `/communication` | Calendrier éditorial + kanban IA (Claude) |
| Bénévoles | `/benevoles` | Disponibilités + événements |
| Membres | `/membres` | Annuaire équipe |
| Roadmap | `/roadmap` | Matrice impact/facilité |
| Mon compte | `/compte` | Profil + changement de mot de passe |

---

## Pour les assistants IA

Lire dans cet ordre avant de coder :
1. `CLAUDE.md` — contexte projet, conventions, pièges
2. `AGENTS.md` — avertissements techniques stack
3. `docs/how-to/add-new-module.md` — si ajout de module
