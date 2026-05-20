export type PresenceStatus = "présent" | "absent" | "excusé" | "retard"

export interface Apprenante {
  id: number
  nom: string
  groupe: "Débutants" | "Intermédiaires" | "Avancées"
  contact: string
  contactParent: string
  totalSeances: number
  seuilAlerte: number
}

export interface Seance {
  id: string
  atelier: string
  groupe: string
  date: string
  heure: string
  formatrice: string
  apprenanteIds: number[]
}

export const apprenantes: Apprenante[] = [
  { id: 1, nom: "Leila A.",    groupe: "Débutants",      contact: "06 12 34 56 78", contactParent: "07 98 76 54 32", totalSeances: 8, seuilAlerte: 3 },
  { id: 2, nom: "Mariam D.",   groupe: "Intermédiaires", contact: "07 23 45 67 89", contactParent: "06 87 65 43 21", totalSeances: 8, seuilAlerte: 3 },
  { id: 3, nom: "Sarah M.",    groupe: "Débutants",      contact: "06 34 56 78 90", contactParent: "07 76 54 32 10", totalSeances: 8, seuilAlerte: 3 },
  { id: 4, nom: "Fatima K.",   groupe: "Débutants",      contact: "06 45 67 89 01", contactParent: "07 65 43 21 09", totalSeances: 8, seuilAlerte: 3 },
  { id: 5, nom: "Hana T.",     groupe: "Avancées",       contact: "07 56 78 90 12", contactParent: "06 54 32 10 98", totalSeances: 8, seuilAlerte: 3 },
  { id: 6, nom: "Ines C.",     groupe: "Intermédiaires", contact: "06 67 89 01 23", contactParent: "07 43 21 09 87", totalSeances: 8, seuilAlerte: 3 },
  { id: 7, nom: "Yasmine B.",  groupe: "Intermédiaires", contact: "07 78 90 12 34", contactParent: "06 32 10 98 76", totalSeances: 8, seuilAlerte: 3 },
  { id: 8, nom: "Noura S.",    groupe: "Avancées",       contact: "06 89 01 23 45", contactParent: "07 21 09 87 65", totalSeances: 8, seuilAlerte: 3 },
  { id: 9, nom: "Dina R.",     groupe: "Débutants",      contact: "07 90 12 34 56", contactParent: "06 10 98 76 54", totalSeances: 8, seuilAlerte: 3 },
  { id: 10, nom: "Amira L.",   groupe: "Avancées",       contact: "06 01 23 45 67", contactParent: "07 09 87 65 43", totalSeances: 8, seuilAlerte: 3 },
]

export const seances: Seance[] = [
  { id: "s-0521-a", atelier: "Initiation HTML/CSS",       groupe: "Débutants",      date: "2026-05-21", heure: "14h00", formatrice: "Somayeh",  apprenanteIds: [1, 3, 4, 9] },
  { id: "s-0521-b", atelier: "Logique & Algorithmie",     groupe: "Intermédiaires", date: "2026-05-21", heure: "10h00", formatrice: "Somayeh",  apprenanteIds: [2, 6, 7] },
  { id: "s-0520-a", atelier: "Projet web libre",          groupe: "Avancées",       date: "2026-05-20", heure: "09h30", formatrice: "Nadia",    apprenanteIds: [5, 8, 10] },
  { id: "s-0514-a", atelier: "Initiation HTML/CSS",       groupe: "Débutants",      date: "2026-05-14", heure: "14h00", formatrice: "Somayeh",  apprenanteIds: [1, 3, 4, 9] },
  { id: "s-0514-b", atelier: "Logique & Algorithmie",     groupe: "Intermédiaires", date: "2026-05-14", heure: "10h00", formatrice: "Somayeh",  apprenanteIds: [2, 6, 7] },
  { id: "s-0507-a", atelier: "Initiation HTML/CSS",       groupe: "Débutants",      date: "2026-05-07", heure: "14h00", formatrice: "Somayeh",  apprenanteIds: [1, 3, 4, 9] },
  { id: "s-0507-b", atelier: "Logique & Algorithmie",     groupe: "Intermédiaires", date: "2026-05-07", heure: "10h00", formatrice: "Somayeh",  apprenanteIds: [2, 6, 7] },
  { id: "s-0507-c", atelier: "Projet web libre",          groupe: "Avancées",       date: "2026-05-07", heure: "09h30", formatrice: "Nadia",    apprenanteIds: [5, 8, 10] },
]

// Présences initiales (simulées)
export const presencesInitiales: Record<string, Record<number, PresenceStatus>> = {
  "s-0521-a": { 1: "présent", 3: "absent",  4: "absent",  9: "présent" },
  "s-0521-b": { 2: "présent", 6: "présent", 7: "absent"  },
  "s-0520-a": { 5: "présent", 8: "présent", 10: "présent" },
  "s-0514-a": { 1: "présent", 3: "absent",  4: "présent", 9: "présent" },
  "s-0514-b": { 2: "présent", 6: "excusé",  7: "présent" },
  "s-0507-a": { 1: "présent", 3: "présent", 4: "absent",  9: "absent"  },
  "s-0507-b": { 2: "présent", 6: "présent", 7: "présent" },
  "s-0507-c": { 5: "présent", 8: "absent",  10: "présent" },
}

// Calcul des absences par apprenante (toutes séances confondues)
export function calcAbsences(presences: Record<string, Record<number, PresenceStatus>>, apprenanteId: number): number {
  return Object.values(presences).reduce((acc, seancePresences) => {
    const statut = seancePresences[apprenanteId]
    return acc + (statut === "absent" ? 1 : 0)
  }, 0)
}
