---
type: explanation
adr: "004"
statut: en discussion
date: 2026-05-20
---

# ADR 004 — Intégration Google Sheets

## Contexte

L'association gère ses données dans plusieurs Google Sheets (bénéficiaires, présences, ateliers).
L'outil de pilotage doit pouvoir **lire et écrire** ces sheets pour éviter la double saisie.

## Contrainte actuelle

L'app est 100% navigateur (localStorage, pas de backend — voir ADR 001).
L'API Google Sheets nécessite OAuth, ce qui exige normalement un serveur pour stocker les credentials.

## Options étudiées

### Option A — Google Apps Script (recommandée pour la phase 1)

Un script Apps Script expose un **Web App HTTP** (doGet / doPost).
L'app Next.js appelle ce endpoint avec `fetch` — aucun backend requis côté nous.

```
Navigateur → fetch → Apps Script Web App → Google Sheets
```

**Avantages** : zéro coût, pas de backend, déployable en 30 min
**Limites** : URL du script exposée publiquement, pas d'auth granulaire

Implémentation côté app :
```typescript
// lib/sheets.ts
const SCRIPT_URL = process.env.NEXT_PUBLIC_SHEETS_SCRIPT_URL

export async function fetchBeneficiaires() {
  const res = await fetch(`${SCRIPT_URL}?action=getBeneficiaires`)
  return res.json()
}

export async function updatePresence(sessionId: number, benefId: number, statut: string) {
  await fetch(SCRIPT_URL!, {
    method: "POST",
    body: JSON.stringify({ action: "setPresence", sessionId, benefId, statut }),
  })
}
```

### Option B — Supabase (recommandée pour la phase 2)

Migration vers Supabase (voir ADR 001). Supabase peut synchroniser avec Google Sheets
via ses Edge Functions ou un cron job.

**Avantages** : auth intégrée, multi-utilisateurs, vraie BDD
**Limites** : coût potentiel, migration à planifier

### Option C — Export/Import CSV (solution de transition immédiate)

Ajouter dans l'app :
- Un bouton **"Exporter CSV"** sur les pages Bénéficiaires et Présences
- Un bouton **"Importer CSV"** pour charger un fichier Google Sheets exporté

Pas de sync temps réel, mais élimine la ressaisie manuelle.

## Décision

**Phase 1 (immédiate)** : Option C — export/import CSV pour que l'équipe puisse
travailler sans attendre une intégration complexe.

**Phase 2** : Option A — Google Apps Script pour une sync semi-automatique.

**Phase 3** : Option B — migration Supabase complète.

## Structure des Google Sheets attendue

Pour que l'intégration fonctionne, les sheets doivent avoir ces colonnes :

### Sheet "Bénéficiaires"
| id | prenom | nom | dateNaissance | nomParent | telephoneParent | emailParent | noteEvaluation | niveau | statut |

### Sheet "Ateliers"
| id | titre | date | heure | salle | formatrice | statut |

### Sheet "Présences"
| sessionId | beneficiaireId | statut | date |

## Variables d'environnement à ajouter (option A)

```
NEXT_PUBLIC_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/xxx/exec
```
