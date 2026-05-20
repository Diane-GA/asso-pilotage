export const absences = {
  stats: { total: 3, nonJustifiees: 2, appelsEffectues: 1 },
  today: [
    { id: 1, nom: "Sarah M.", groupe: "Groupe A – Web", totalAbsences: 3, statut: "à appeler", contact: "06 12 34 56 78" },
    { id: 2, nom: "Yasmine B.", groupe: "Groupe B – Python", totalAbsences: 1, statut: "excusée", contact: "07 23 45 67 89" },
    { id: 3, nom: "Fatima K.", groupe: "Groupe A – Web", totalAbsences: 5, statut: "à appeler", contact: "06 34 56 78 90" },
  ],
  historique: [
    { semaine: "12 mai", total: 5 },
    { semaine: "5 mai", total: 2 },
    { semaine: "28 avr.", total: 8 },
    { semaine: "21 avr.", total: 1 },
  ],
}

export const finances = {
  stats: { enCours: 2, montantTotal: 17000, deadlineCetteSemaine: 1, tauxRemplissage: 68 },
  demandes: [
    { id: 1, type: "Subvention", org: "Mairie de Paris", montant: 5000, statut: "en cours", priorite: "haute", deadline: "2026-05-30", responsable: "Nadia", notes: "Dossier complet envoyé le 3 mai" },
    { id: 2, type: "Subvention", org: "Région Île-de-France", montant: 12000, statut: "à compléter", priorite: "haute", deadline: "2026-05-28", responsable: "Nadia", notes: "Manque rapport d'activité 2025" },
    { id: 3, type: "Mécénat", org: "Fondation Orange", montant: 3000, statut: "accepté", priorite: "normale", deadline: "2026-04-15", responsable: "Nadia", notes: "Versement prévu en juin" },
    { id: 4, type: "Subvention", org: "CAF Paris", montant: 8000, statut: "rejeté", priorite: "normale", deadline: "2026-03-01", responsable: "Nadia", notes: "Hors critères d'éligibilité" },
  ],
  inscriptions: [
    { id: 1, nom: "Leila A.", montant: 50, statut: "payé", date: "2026-05-02" },
    { id: 2, nom: "Mariam D.", montant: 50, statut: "en attente", date: "2026-05-10" },
    { id: 3, nom: "Noura S.", montant: 50, statut: "en retard", date: "2026-04-20" },
    { id: 4, nom: "Hana T.", montant: 50, statut: "payé", date: "2026-05-05" },
    { id: 5, nom: "Ines C.", montant: 50, statut: "en retard", date: "2026-04-15" },
  ],
}

export const ateliers = {
  stats: { cetteSemaine: 3, groupesAComposer: 2, sallesNonConfirmees: 1 },
  prochains: [
    { id: 1, titre: "Initiation HTML/CSS", date: "2026-05-21", heure: "14h00", salle: "Salle A", groupe: "Débutants", formatrice: "Somayeh", places: 12, inscrits: 10 },
    { id: 2, titre: "Logique & Algorithmie", date: "2026-05-22", heure: "10h00", salle: "À confirmer", groupe: "Intermédiaires", formatrice: "Somayeh", places: 8, inscrits: 8 },
    { id: 3, titre: "Projet web libre", date: "2026-05-24", heure: "09h30", salle: "Salle B", groupe: "Avancées", formatrice: "Nadia", places: 6, inscrits: 5 },
  ],
  apprenantes: [
    { id: 1, nom: "Leila A.", groupe: "Débutants", noteLogique: 14, notePratique: 12, noteProjet: null, presences: 8, absences: 1 },
    { id: 2, nom: "Mariam D.", groupe: "Intermédiaires", noteLogique: 16, notePratique: 17, noteProjet: 15, presences: 9, absences: 0 },
    { id: 3, nom: "Sarah M.", groupe: "Débutants", noteLogique: 10, notePratique: 9, noteProjet: null, presences: 6, absences: 3 },
    { id: 4, nom: "Fatima K.", groupe: "Débutants", noteLogique: 8, notePratique: 11, noteProjet: null, presences: 5, absences: 5 },
    { id: 5, nom: "Hana T.", groupe: "Avancées", noteLogique: 18, notePratique: 19, noteProjet: 17, presences: 10, absences: 0 },
    { id: 6, nom: "Ines C.", groupe: "Intermédiaires", noteLogique: 13, notePratique: 14, noteProjet: 12, presences: 7, absences: 2 },
  ],
}

export const communication = {
  stats: { postsASemaine: 2, evenementsAVenir: 3, postsDrafts: 1 },
  calendrier: [
    { id: 1, date: "2026-05-21", titre: "Recap atelier HTML", plateforme: ["LinkedIn", "Instagram"], statut: "à créer", evenement: "Atelier 21 mai" },
    { id: 2, date: "2026-05-23", titre: "Portrait bénévole", plateforme: ["Instagram"], statut: "brouillon", evenement: null },
    { id: 3, date: "2026-05-27", titre: "Annonce portes ouvertes", plateforme: ["LinkedIn", "Instagram", "Facebook"], statut: "à créer", evenement: "Portes ouvertes 7 juin" },
    { id: 4, date: "2026-06-07", titre: "Live portes ouvertes", plateforme: ["Instagram"], statut: "planifié", evenement: "Portes ouvertes 7 juin" },
  ],
  evenements: [
    { id: 1, nom: "Atelier public – HTML/CSS", date: "2026-05-21", type: "atelier" },
    { id: 2, nom: "Portes ouvertes", date: "2026-06-07", type: "événement" },
    { id: 3, nom: "Remise des diplômes Promo 3", date: "2026-06-28", type: "cérémonie" },
  ],
}

export const benevoles = {
  stats: { total: 12, confirmes: 9, manquantsProchainEvent: 2, desistementsEnCours: 1 },
  prochainEvenement: { nom: "Portes ouvertes", date: "2026-06-07", besoins: 6, confirmes: 4 },
  liste: [
    { id: 1, nom: "Amira L.", competences: ["Animation", "Accueil"], disponible: true, prochainEvent: true },
    { id: 2, nom: "Céline D.", competences: ["Technique", "Formation"], disponible: true, prochainEvent: true },
    { id: 3, nom: "Dina R.", competences: ["Communication", "Accueil"], disponible: false, prochainEvent: false },
    { id: 4, nom: "Emma P.", competences: ["Animation"], disponible: true, prochainEvent: true },
    { id: 5, nom: "Fatiha M.", competences: ["Accueil", "Admin"], disponible: true, prochainEvent: false },
    { id: 6, nom: "Jade B.", competences: ["Technique", "Animation"], disponible: true, prochainEvent: true },
    { id: 7, nom: "Karine S.", competences: ["Formation"], disponible: false, prochainEvent: false },
    { id: 8, nom: "Lucie T.", competences: ["Communication"], disponible: true, prochainEvent: false },
  ],
}
