"use client"

// ──────────────────────────────────────────────
// Auth système — localStorage (pas de backend)
// ──────────────────────────────────────────────

export type Role = "super_admin" | "admin" | "formatrice" | "coordinatrice" | "benevole"

export interface AuthUser {
  id: string
  email: string
  nom: string
  prenom: string
  role: Role
  createdAt: string
}

const STORAGE_USERS   = "asso-users"
const STORAGE_SESSION = "asso-session"

// ── Helpers ──────────────────────────────────

function hashPwd(pwd: string): string {
  // Simple hash non-cryptographique (usage démo/local uniquement)
  let h = 0
  for (let i = 0; i < pwd.length; i++) {
    h = ((h << 5) - h) + pwd.charCodeAt(i)
    h |= 0
  }
  return "h" + Math.abs(h).toString(36)
}

function loadUsers(): (AuthUser & { pwd: string })[] {
  if (typeof window === "undefined") return []
  try {
    const s = localStorage.getItem(STORAGE_USERS)
    return s ? JSON.parse(s) : []
  } catch { return [] }
}

function saveUsers(users: (AuthUser & { pwd: string })[]) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users))
}

// ── Compte admin par défaut ───────────────────

export function ensureDefaultAdmin() {
  if (typeof window === "undefined") return
  const users = loadUsers()
  if (users.find((u) => u.email === "admin@asso.fr")) return
  const admin: AuthUser & { pwd: string } = {
    id: "admin-default",
    email: "admin@asso.fr",
    nom: "Admin",
    prenom: "Super",
    role: "super_admin",
    createdAt: new Date().toISOString(),
    pwd: hashPwd("admin1234"),
  }
  saveUsers([...users, admin])
}

// ── Auth API ──────────────────────────────────

export function login(email: string, password: string): AuthUser | null {
  const users = loadUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.pwd === hashPwd(password))
  if (!user) return null
  const { pwd: _pwd, ...session } = user
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(session))
  return session
}

export function register(data: {
  email: string; password: string; nom: string; prenom: string; role: Role
}): { ok: boolean; error?: string } {
  const users = loadUsers()
  if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { ok: false, error: "Cet email est déjà utilisé." }
  }
  const newUser: AuthUser & { pwd: string } = {
    id: Date.now().toString(),
    email: data.email,
    nom: data.nom,
    prenom: data.prenom,
    role: data.role,
    createdAt: new Date().toISOString(),
    pwd: hashPwd(data.password),
  }
  saveUsers([...users, newUser])
  const { pwd: _pwd, ...session } = newUser
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(session))
  return { ok: true }
}

export function logout() {
  localStorage.removeItem(STORAGE_SESSION)
}

export function getSession(): AuthUser | null {
  if (typeof window === "undefined") return null
  try {
    const s = localStorage.getItem(STORAGE_SESSION)
    return s ? JSON.parse(s) : null
  } catch { return null }
}

export const ROLE_LABELS: Record<Role, string> = {
  super_admin:    "Super Administratrice",
  admin:          "Administratrice",
  formatrice:     "Formatrice",
  coordinatrice:  "Coordinatrice",
  benevole:       "Bénévole",
}

// ── Admin API ─────────────────────────────────

export function getAllUsers(): AuthUser[] {
  return loadUsers().map(({ pwd: _pwd, ...user }) => user)
}

export function updateUser(
  id: string,
  data: { nom?: string; prenom?: string; email?: string; role?: Role; password?: string }
): { ok: boolean; error?: string } {
  const users = loadUsers()
  const idx = users.findIndex((u) => u.id === id)
  if (idx === -1) return { ok: false, error: "Utilisateur introuvable." }

  if (data.email) {
    const conflict = users.find(
      (u) => u.email.toLowerCase() === data.email!.toLowerCase() && u.id !== id
    )
    if (conflict) return { ok: false, error: "Cet email est déjà utilisé." }
  }

  const { password: newPwd, ...rest } = data
  users[idx] = {
    ...users[idx],
    ...rest,
    ...(newPwd ? { pwd: hashPwd(newPwd) } : {}),
  }
  saveUsers(users)

  // Rafraîchir la session si c'est l'utilisateur courant
  if (typeof window !== "undefined") {
    const session = getSession()
    if (session?.id === id) {
      const { pwd: _pwd, ...sessionData } = users[idx]
      localStorage.setItem(STORAGE_SESSION, JSON.stringify(sessionData))
    }
  }
  return { ok: true }
}

export function deleteUser(id: string): { ok: boolean; error?: string } {
  const users = loadUsers()
  const idx = users.findIndex((u) => u.id === id)
  if (idx === -1) return { ok: false, error: "Utilisateur introuvable." }

  const admins = users.filter((u) => u.role === "admin" || u.role === "super_admin")
  if (admins.length === 1 && (users[idx].role === "admin" || users[idx].role === "super_admin")) {
    return { ok: false, error: "Impossible de supprimer le dernier administrateur." }
  }

  saveUsers(users.filter((u) => u.id !== id))

  // Déconnecter si on supprime son propre compte
  if (typeof window !== "undefined") {
    const session = getSession()
    if (session?.id === id) localStorage.removeItem(STORAGE_SESSION)
  }
  return { ok: true }
}
