"use client"

export default function Adr003Page() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10 space-y-10">
      <header>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">Explication · ADR</span>
        <h1 className="text-3xl font-bold text-foreground mt-4">ADR 003 — Authentification par localStorage</h1>
        <p className="text-muted mt-2">Pourquoi l&apos;auth est gérée manuellement dans localStorage et comment migrer vers Google SSO.</p>
      </header>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
        <span className="text-emerald-700 font-semibold text-sm">Statut :</span>
        <span className="text-emerald-800 font-bold text-sm">Accepté</span>
        <span className="text-emerald-600 text-xs ml-auto">2025-05-20</span>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Contexte</h2>
        <p className="text-sm text-muted leading-relaxed">
          L&apos;application a besoin d&apos;une page de connexion pour différencier les utilisateurs et préparer la migration vers un vrai système d&apos;auth (SSO Google, Supabase…).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Décision</h2>
        <p className="text-sm text-muted leading-relaxed">
          Authentification maison dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">lib/auth.ts</code> avec :
        </p>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>Utilisateurs stockés dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">localStorage[&quot;asso-users&quot;]</code></li>
          <li>Session dans <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">localStorage[&quot;asso-session&quot;]</code></li>
          <li>Hash simple non-cryptographique pour les mots de passe (usage démo uniquement)</li>
          <li>Compte admin par défaut : <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">admin@asso.fr</code> / <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">admin1234</code></li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Limites explicites</h2>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          <strong>Ce n&apos;est PAS une vraie sécurité :</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Le hash utilisé (<code className="bg-red-100 px-1 rounded font-mono text-xs">(h &lt;&lt; 5) - h</code>) n&apos;est pas résistant aux attaques</li>
            <li>La session localStorage est accessible depuis JS (XSS possible)</li>
            <li>Pas de token d&apos;expiration</li>
          </ul>
        </div>
        <p className="text-sm text-muted leading-relaxed">
          C&apos;est volontairement limité car les données sont mockées, l&apos;objectif est de préparer l&apos;UX et les patterns de code, et la migration vers un vrai système d&apos;auth est prévue (ADR 001).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Migration vers Google SSO</h2>
        <p className="text-sm text-muted leading-relaxed">
          Quand l&apos;association sera prête, remplacer par <strong>NextAuth.js + Google Provider</strong> :
        </p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`npm install next-auth`}</pre>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    signIn: ({ profile }) => profile?.email?.endsWith("@asso.fr") ?? false
  }
})`}</pre>
        <p className="text-sm text-muted leading-relaxed">Variables d&apos;environnement Vercel à ajouter :</p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs font-mono overflow-x-auto">{`GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_SECRET=...`}</pre>
        <p className="text-sm text-muted leading-relaxed">
          Le <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">useAuth()</code> hook resterait compatible — remplacer <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">getSession()</code> par <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">useSession()</code> de next-auth.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground mt-2">Interface AuthUser (stable)</h2>
        <p className="text-sm text-muted leading-relaxed">
          Cette interface est conçue pour être stable lors de la migration — elle correspond à ce que Google OAuth retourne enrichi du rôle stocké côté app.
        </p>
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
