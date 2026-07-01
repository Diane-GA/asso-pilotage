"use client"

export default function Adr004Page() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
      <header>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">Explication · ADR</span>
        <h1 className="text-3xl font-bold text-foreground mt-4">ADR 004 — Intégration Google Sheets</h1>
        <p className="text-muted mt-2">Options étudiées pour synchroniser les données de l&apos;application avec les Google Sheets de l&apos;association.</p>
      </header>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
        <span className="text-emerald-700 font-semibold text-sm">Statut :</span>
        <span className="text-emerald-800 font-bold text-sm">Accepté (module Familles) — Option D</span>
        <span className="text-emerald-600 text-xs ml-auto">MAJ 2026-07-01</span>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
        <strong>Mise à jour (juillet 2026)</strong> — Le module <strong>Familles</strong> est le premier à intégrer
        Google Sheets. La solution retenue n&apos;est <strong>aucune des options A/B/C</strong> ci-dessous, mais
        l&apos;<strong>API REST Google Sheets v4 appelée côté serveur via un compte de service</strong> (Option D,
        voir plus bas). Le reste de l&apos;app est toujours en localStorage.
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Contexte</h2>
        <p className="text-sm text-muted leading-relaxed">
          L&apos;association gère ses données dans plusieurs Google Sheets (bénéficiaires, présences, ateliers).
          L&apos;outil de pilotage doit pouvoir <strong>lire et écrire</strong> ces sheets pour éviter la double saisie.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Contrainte actuelle</h2>
        <p className="text-sm text-muted leading-relaxed">
          L&apos;app est 100% navigateur (localStorage, pas de backend — voir ADR 001).
          L&apos;API Google Sheets nécessite OAuth, ce qui exige normalement un serveur pour stocker les credentials.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Options étudiées</h2>

        <h3 className="text-base font-semibold text-foreground">Option A — Google Apps Script (recommandée pour la phase 1)</h3>
        <p className="text-sm text-muted leading-relaxed">
          Un script Apps Script expose un <strong>Web App HTTP</strong> (doGet / doPost).
          L&apos;app Next.js appelle ce endpoint avec <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">fetch</code> — aucun backend requis côté nous.
        </p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`Navigateur → fetch → Apps Script Web App → Google Sheets`}</pre>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800">
            <strong>Avantages :</strong> zéro coût, pas de backend, déployable en 30 min
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700">
            <strong>Limites :</strong> URL du script exposée publiquement, pas d&apos;auth granulaire
          </div>
        </div>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`// lib/sheets.ts
const SCRIPT_URL = process.env.NEXT_PUBLIC_SHEETS_SCRIPT_URL

export async function fetchBeneficiaires() {
  const res = await fetch(\`\${SCRIPT_URL}?action=getBeneficiaires\`)
  return res.json()
}

export async function updatePresence(sessionId: number, benefId: number, statut: string) {
  await fetch(SCRIPT_URL!, {
    method: "POST",
    body: JSON.stringify({ action: "setPresence", sessionId, benefId, statut }),
  })
}`}</pre>

        <h3 className="text-base font-semibold text-foreground">Option B — Supabase (recommandée pour la phase 2)</h3>
        <p className="text-sm text-muted leading-relaxed">
          Migration vers Supabase (voir ADR 001). Supabase peut synchroniser avec Google Sheets via ses Edge Functions ou un cron job.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800">
            <strong>Avantages :</strong> auth intégrée, multi-utilisateurs, vraie BDD
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700">
            <strong>Limites :</strong> coût potentiel, migration à planifier
          </div>
        </div>

        <h3 className="text-base font-semibold text-foreground">Option C — Export/Import CSV (solution de transition immédiate)</h3>
        <p className="text-sm text-muted leading-relaxed">
          Ajouter dans l&apos;app un bouton <strong>Exporter CSV</strong> sur les pages Bénéficiaires et Présences, et un bouton <strong>Importer CSV</strong> pour charger un fichier Google Sheets exporté.
          Pas de sync temps réel, mais élimine la ressaisie manuelle.
        </p>

        <h3 className="text-base font-semibold text-foreground">Option D — API REST Google Sheets v4 côté serveur (RETENUE)</h3>
        <p className="text-sm text-muted leading-relaxed">
          Une <strong>route serveur Next.js</strong> (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">app/api/sheets/route.ts</code>) parle directement à l&apos;API REST Google Sheets v4 (et Drive) via la lib <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">googleapis</code>, authentifiée par un <strong>compte de service</strong>. Les credentials restent côté serveur.
        </p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`Client (pages familles) → /api/sheets (route serveur) → googleapis → Google Sheets / Drive`}</pre>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800">
            <strong>Avantages :</strong> credentials privés (pas d&apos;URL publique), CRUD complet, accès Drive
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700">
            <strong>Limites :</strong> compte de service à gérer ; corps de requête ~4,5 Mo max sur Vercel
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Décision</h2>
        <p className="text-sm text-muted leading-relaxed">
          <strong>Option D retenue</strong> — API REST v4 côté serveur via compte de service.
          Une première itération utilisait un Web App Apps Script (Option A), abandonnée au profit
          de l&apos;Option D (credentials privés, accès Drive). Une migration Supabase (Option B)
          reste envisageable à terme.
        </p>
        <p className="text-sm text-muted leading-relaxed">
          <strong>Implémentation (module Familles)</strong> : Sheet <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">BDD_Asso_CRM</code> (tables FAMILLE / PERSONNE / INSCRIPTION / PAIEMENT / EVALUATION / DOCUMENTS JOINTS), route <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">app/api/sheets/route.ts</code>, serveur <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">lib/google-sheets-server.ts</code>, client <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">lib/sheets-api.ts</code>. Documents uploadés vers Google Drive.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Structure des Google Sheets attendue</h2>
        <p className="text-sm text-muted">
          Le chantier 2.1 (composition de groupes) a ajouté plusieurs colonnes pour porter
          les notes détaillées du test de positionnement, la fiche descriptive de chaque
          atelier et l&apos;état brouillon/validé des groupes.
        </p>

        <h3 className="text-base font-semibold text-foreground">Sheet &quot;Bénéficiaires&quot;</h3>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`id | prenom | nom | dateNaissance | email | telephone | nomParent | telephoneParent | emailParent | dateInscription | niveau | statut | notes
init_comprehensionEcrite | init_comprehensionOrale | init_expressionEcrite | init_expressionOrale
final_comprehensionEcrite | final_comprehensionOrale | final_expressionEcrite | final_expressionOrale`}</pre>

        <h3 className="text-base font-semibold text-foreground">Sheet &quot;Ateliers&quot;</h3>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`id | titre | description | date | heure | duree | salle | formatrice | statut
periode
ageMin | ageMax | tailleGroupeCible | ratioEncadrement | mixerNiveaux
comp_comprehensionEcrite | comp_comprehensionOrale | comp_expressionEcrite | comp_expressionOrale
taches | besoins | etapes | personnesImpliqueesIds
beneficiaireIds | benevoleIds`}</pre>

        <h3 className="text-base font-semibold text-foreground">Sheet &quot;Groupes&quot;</h3>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`id | nom | atelierId | type | description | beneficiaireIds | etat | dateValidation`}</pre>
        <p className="text-xs text-muted">
          <code>etat</code> : <code>brouillon</code> (proposition de l&apos;algo non validée)
          ou <code>valide</code> (composition officielle).
        </p>

        <h3 className="text-base font-semibold text-foreground">Sheet &quot;Présences&quot;</h3>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`sessionId | beneficiaireId | statut | date`}</pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Variables d&apos;environnement (Option D — retenue)</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`GOOGLE_CLIENT_EMAIL=...@....iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"`}</pre>
        <p className="text-xs text-muted leading-relaxed">
          À définir dans <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">.env.local</code> et dans Vercel.
          Le compte de service doit avoir un accès <strong>Éditeur</strong> au Sheet <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">BDD_Asso_CRM</code> et aux dossiers Drive.
          Les anciennes variables <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">NEXT_PUBLIC_SHEETS_SCRIPT_URL</code> / <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">NEXT_PUBLIC_SHEETS_API_URL</code> sont obsolètes.
        </p>
      </section>
    </div>
  )
}
