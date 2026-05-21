// ──────────────────────────────────────────────
// Test de positionnement — types & helpers
// ──────────────────────────────────────────────
// Modèle : 4 thématiques évaluées, mesurées 2 fois (initial / final).
// Le test initial sert à la composition des groupes d'atelier.
// Le test final sert à la mesure d'impact (hors périmètre actuel).
//
// Les notes sont sur 20, ou `null` si la thématique n'a pas encore été évaluée.

export type Thematique =
  | "comprehensionEcrite"
  | "comprehensionOrale"
  | "expressionEcrite"
  | "expressionOrale"

export type SessionPositionnement = "initial" | "final"

export const THEMATIQUES: { key: Thematique; label: string; short: string }[] = [
  { key: "comprehensionEcrite", label: "Compréhension écrite", short: "Comp. écrite" },
  { key: "comprehensionOrale",  label: "Compréhension orale",  short: "Comp. orale" },
  { key: "expressionEcrite",    label: "Expression écrite",    short: "Expr. écrite" },
  { key: "expressionOrale",     label: "Expression orale",     short: "Expr. orale" },
]

export type NotesPositionnement = Record<Thematique, number | null>

export const emptyNotes = (): NotesPositionnement => ({
  comprehensionEcrite: null,
  comprehensionOrale:  null,
  expressionEcrite:    null,
  expressionOrale:     null,
})

// ──────────────────────────────────────────────
// Helpers d'analyse
// ──────────────────────────────────────────────

/** Toutes les thématiques sont à null → le bénéficiaire n'a pas encore été évalué. */
export function isEmpty(notes: NotesPositionnement): boolean {
  return THEMATIQUES.every(t => notes[t.key] === null)
}

/** Au moins une thématique est null → évaluation partielle. */
export function isPartial(notes: NotesPositionnement): boolean {
  const some  = THEMATIQUES.some(t => notes[t.key] !== null)
  const some2 = THEMATIQUES.some(t => notes[t.key] === null)
  return some && some2
}

/** Moyenne sur les thématiques renseignées (null si rien à moyenner). */
export function moyenne(notes: NotesPositionnement): number | null {
  const valeurs = THEMATIQUES
    .map(t => notes[t.key])
    .filter((n): n is number => n !== null)
  if (valeurs.length === 0) return null
  return valeurs.reduce((a, b) => a + b, 0) / valeurs.length
}

// ──────────────────────────────────────────────
// Discriminateur eleve / parent (chantier "ateliers adultes")
// ──────────────────────────────────────────────
// Un Bénéficiaire est soit un élève (enfant), soit un parent (adulte).
// Les deux passent le même test de positionnement (mêmes 4 thématiques).
// L'algorithme de composition reste identique, seule la pool eligible
// est filtree par l'audience de l'atelier (cf. lib/atelier.ts).

export type TypeBeneficiaire = "eleve" | "parent"

// ──────────────────────────────────────────────
// Migration depuis l'ancien format (note unique `noteEvaluation`)
// ──────────────────────────────────────────────
// Si la donnée vient de l'ancien modèle, on recopie la note unique sur les
// 4 thématiques du test initial. C'est volontairement grossier — la
// collaboratrice pourra affiner manuellement après migration.
// On comble aussi les champs ajoutés ultérieurement (type, parentIds).

interface LegacyBenef {
  noteEvaluation?: number | null
  positionnementInitial?: NotesPositionnement
  positionnementFinal?:   NotesPositionnement
  type?:      TypeBeneficiaire
  parentIds?: number[]
}

export function migrate<T extends LegacyBenef>(b: T): T & {
  positionnementInitial: NotesPositionnement
  positionnementFinal:   NotesPositionnement
  type:      TypeBeneficiaire
  parentIds: number[]
} {
  const initial = b.positionnementInitial ?? (
    b.noteEvaluation != null
      ? {
          comprehensionEcrite: b.noteEvaluation,
          comprehensionOrale:  b.noteEvaluation,
          expressionEcrite:    b.noteEvaluation,
          expressionOrale:     b.noteEvaluation,
        }
      : emptyNotes()
  )
  const final = b.positionnementFinal ?? emptyNotes()
  return {
    ...b,
    positionnementInitial: initial,
    positionnementFinal:   final,
    // Par défaut "eleve" pour rétrocompat : toutes les fiches déjà saisies
    // étaient des enfants. Les parents seront crées explicitement.
    type:      b.type      ?? "eleve",
    parentIds: b.parentIds ?? [],
  }
}
