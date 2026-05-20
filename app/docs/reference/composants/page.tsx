"use client"

export default function ComposantsPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
      <header>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-communication-light text-communication-dark">Référence</span>
        <h1 className="text-3xl font-bold text-foreground mt-4">Composants partagés</h1>
        <p className="text-muted mt-2">API et usage des composants réutilisables : SlideOver, Sidebar, StatCard, AuthGate et useAuth.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">SlideOver</h2>
        <p className="text-sm text-muted leading-relaxed">
          Panneau latéral droit réutilisable. <strong>Tous les formulaires de l&apos;application passent par SlideOver</strong> — ne pas créer de modals inline.
        </p>

        <h3 className="text-base font-semibold text-foreground">Import</h3>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`import SlideOver, {
  Field,        // Wrapper label + input
  Input,        // <input> stylé
  Select,       // <select> stylé
  Textarea,     // <textarea> stylé
  FormRow,      // Deux champs côte à côte
  SaveButton,   // Bouton "Enregistrer" (submit)
  DeleteButton, // Bouton "Supprimer" (rouge, onclick)
} from "@/components/SlideOver"`}</pre>

        <h3 className="text-base font-semibold text-foreground">Props SlideOver</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Prop</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Type</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Défaut</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["open", "boolean", "—", "Contrôle l'ouverture"],
                ["onClose", "() => void", "—", "Appelé sur ESC, clic backdrop, croix"],
                ["title", "string", "—", "Titre du panneau"],
                ["subtitle", "string?", "—", "Sous-titre (optionnel)"],
                ["width", '"md" | "lg"', '"md"', "Largeur : md=384px, lg=512px"],
                ["children", "ReactNode", "—", "Contenu du panneau"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="hover:bg-slate-50">
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">{prop}</code></td>
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">{type}</code></td>
                  <td className="px-3 py-2 border-b border-border text-sm text-muted">{def}</td>
                  <td className="px-3 py-2 border-b border-border text-sm text-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-foreground">Exemple complet</h3>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`<SlideOver
  open={slideOpen}
  onClose={() => setSlideOpen(false)}
  title={editing ? "Modifier" : "Créer"}
  width="lg"
>
  <form onSubmit={(e) => { e.preventDefault(); handleSave() }} className="flex flex-col gap-4">
    <Field label="Nom" required>
      <Input placeholder="…" value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} />
    </Field>
    <FormRow>
      <Field label="A"><Input value={form.a} onChange={…} /></Field>
      <Field label="B"><Select value={form.b} onChange={…}><option>x</option></Select></Field>
    </FormRow>
    <SaveButton />
    {editing && <DeleteButton onClick={handleDelete} />}
  </form>
</SlideOver>`}</pre>

        <h3 className="text-base font-semibold text-foreground">Comportements intégrés</h3>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>Fermeture sur touche <strong>Échap</strong></li>
          <li>Fermeture sur <strong>clic backdrop</strong></li>
          <li>Scroll body <strong>bloqué</strong> quand ouvert</li>
          <li>Animation <strong>slide-in</strong> depuis la droite</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Sidebar</h2>
        <p className="text-sm text-muted leading-relaxed">Navigation principale + chip utilisateur connecté.</p>
        <h3 className="text-base font-semibold text-foreground">Ajouter une entrée</h3>
        <p className="text-sm text-muted leading-relaxed">
          Dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">components/Sidebar.tsx</code>, tableau <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">navItems</code> :
        </p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`{
  href: "/monmodule",
  label: "Mon module",
  icon: MonIcone,             // icône lucide-react disponible en v1.16.0
  accent: "bg-xxx-light text-xxx-dark",
  dot: "bg-xxx",
}`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          Section Opérationnel : ajouter dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">navItems</code>.
          Section Stratégie : ajouter dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">stratItems</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">StatCard</h2>
        <p className="text-sm text-muted leading-relaxed">Carte KPI sur le dashboard.</p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`import StatCard from "@/components/StatCard"`}</pre>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Prop</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Type</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["title", "string", "Titre de la carte"],
                ["href", "string", "Lien vers le module"],
                ["color", "string", 'Token couleur (ex: "absences")'],
                ["stats", "{ label: string; value: number | string; alert?: boolean }[]", "Métriques à afficher"],
                ["action", "string?", "Texte du lien d'action"],
              ].map(([prop, type, desc]) => (
                <tr key={prop} className="hover:bg-slate-50">
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">{prop}</code></td>
                  <td className="px-3 py-2 border-b border-border text-xs text-muted font-mono">{type}</td>
                  <td className="px-3 py-2 border-b border-border text-sm text-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">AuthGate</h2>
        <p className="text-sm text-muted leading-relaxed">
          Composant de protection des routes. Rendu conditionnel de la Sidebar.
          <strong> Ne pas utiliser directement dans les pages</strong> — il est placé une seule fois dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">app/layout.tsx</code>.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Situation</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Rendu</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['pathname === "/login"', "Juste children (pas de sidebar)"],
                ["loading === true", "Spinner centré"],
                ["user === null", "Redirect vers /login"],
                ["user !== null", "<Sidebar /> + children"],
              ].map(([sit, ren]) => (
                <tr key={sit} className="hover:bg-slate-50">
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">{sit}</code></td>
                  <td className="px-3 py-2 text-sm text-muted border-b border-border">{ren}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">useAuth (hook)</h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`import { useAuth } from "@/lib/auth-context"

const { user, loading, refresh, logout } = useAuth()`}</pre>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Valeur</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Type</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-foreground border-b border-border">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["user", "AuthUser | null", "Utilisateur connecté"],
                ["loading", "boolean", "Vrai pendant l'hydratation initiale"],
                ["refresh()", "() => void", "Recharge la session depuis localStorage"],
                ["logout()", "() => void", "Vide la session + met user à null"],
              ].map(([val, type, desc]) => (
                <tr key={val} className="hover:bg-slate-50">
                  <td className="px-3 py-2 border-b border-border"><code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">{val}</code></td>
                  <td className="px-3 py-2 border-b border-border text-xs text-muted font-mono">{type}</td>
                  <td className="px-3 py-2 border-b border-border text-sm text-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`interface AuthUser {
  id: string
  email: string
  nom: string
  prenom: string
  role: "admin" | "formatrice" | "coordinatrice" | "benevole"
  createdAt: string
}`}</pre>
      </section>
    </div>
  )
}
