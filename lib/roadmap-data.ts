export type Status = "not_started" | "in_progress" | "done"

export interface SubAction {
  id: string
  title: string
  benefit: string
}

export interface UseCase {
  id: string
  title: string
  impact?: number
  confidence?: number
  ease?: number
  notes?: string
  subActions: SubAction[]
}

export interface Theme {
  id: number
  title: string
  shortTitle: string
  colorClass: string
  bgClass: string
  borderClass: string
  useCases: UseCase[]
}

export const themes: Theme[] = [
  {
    id: 1,
    title: "Centralisation des données, Intégrité & Continuité",
    shortTitle: "Données & Continuité",
    colorClass: "text-indigo-700",
    bgClass: "bg-indigo-50",
    borderClass: "border-indigo-200",
    useCases: [
      {
        id: "1.1",
        title: "Dossier Unique Bénéficiaire",
        impact: 4,
        confidence: 4,
        subActions: [
          { id: "1.1.1", title: "Saisie unique des données d'inscription (supprimer la double saisie papier/numérique)", benefit: "Suppression des tâches de saisie redondantes et chronophages." },
          { id: "1.1.2", title: "Interconnexion des fiches d'informations (lier profils parents, enfants et suivi juridique)", benefit: "Éviter l'éclatement de l'information sur plusieurs supports." },
          { id: "1.1.3", title: "Centralisation des réservations de salles et des autorisations parentales", benefit: "Traçabilité des modifications et conformité légale facilitée." },
          { id: "1.1.4", title: "Réplication automatique des modifications de données sur l'ensemble des bases", benefit: "Garantie d'avoir une information mise à jour en temps réel partout." },
        ],
      },
      {
        id: "1.2",
        title: "Automatisation des canaux de communication",
        impact: 3,
        confidence: 1,
        ease: 1,
        subActions: [
          { id: "1.2.1", title: "Synchronisation automatique des fiches bénéficiaires avec les répertoires téléphoniques professionnels", benefit: "Éviter l'enregistrement manuel laborieux des contacts sur smartphone." },
          { id: "1.2.2", title: "Génération et mise à jour automatique des listes/groupes WhatsApp par activité ou atelier", benefit: "Gain de temps majeur sur la logistique de démarrage des groupes." },
        ],
      },
      {
        id: "1.3",
        title: "Hub d'émargement et d'assiduité",
        impact: 2,
        confidence: 4,
        ease: 4,
        notes: "Pas d'IA",
        subActions: [
          { id: "1.3.1", title: "Calcul automatisé des taux de présence et d'absentéisme par élève, groupe et période", benefit: "Obtenir des statistiques fiables sans calculs manuels sur tableur." },
          { id: "1.3.2", title: "Détection instantanée et alerte automatique en cas d'absences répétées ou anormales", benefit: "Permettre un suivi et un ciblage rapide des décrochages." },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Gestion, Animation & Ingénierie Pédagogique",
    shortTitle: "Pédagogie",
    colorClass: "text-teal-700",
    bgClass: "bg-teal-50",
    borderClass: "border-teal-200",
    useCases: [
      {
        id: "2.1",
        title: "Aide à la composition des groupes",
        impact: 3,
        confidence: 4,
        ease: 3,
        notes: "Pas d'IA",
        subActions: [
          { id: "2.1.1", title: "Centralisation et consolidation automatique des notes des élèves provenant de sources variées", benefit: "Centraliser les évaluations au même endroit de manière fiable." },
          { id: "2.1.2", title: "Segmentation et répartition automatique des élèves par niveau/besoin pour former les groupes", benefit: "Supprimer les allers-retours fastidieux sur les fichiers Sheets de notes." },
        ],
      },
      {
        id: "2.2",
        title: "Base de connaissances partagée",
        notes: "À préciser sur place (stockage des cours, transmission de l'information)",
        subActions: [
          { id: "2.2.1", title: "Standardisation et centralisation des supports de cours et de formation par thématique et niveau", benefit: "Capitaliser sur le savoir de l'association." },
          { id: "2.2.2", title: "Création d'une bibliothèque documentaire partagée et accessible en 1 clic à toute l'équipe pédagogique", benefit: "Éviter la perte de connaissances détenues uniquement par les salariés." },
        ],
      },
      {
        id: "2.3",
        title: "Générateur de bilans scolaires annuels",
        notes: "Pas prioritaire",
        subActions: [
          { id: "2.3.1", title: "Agrégation automatique des données multi-sources d'un élève (notes, présence, comportement)", benefit: "Disposer d'une vision d'ensemble de l'élève instantanément." },
          { id: "2.3.2", title: "Génération semi-automatique de fiches de synthèse ou de réponses personnalisées pour les écoles", benefit: "Réduire le temps perdu à rédiger manuellement des courriels individualisés aux établissements." },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Planification & Gestion des RH (Salariés & Bénévoles)",
    shortTitle: "RH & Planning",
    colorClass: "text-orange-700",
    bgClass: "bg-orange-50",
    borderClass: "border-orange-200",
    useCases: [
      {
        id: "3.1",
        title: "Planning partagé et automatisé",
        subActions: [
          { id: "3.1.1", title: "Coordination et croisement des agendas des salariés, bénévoles et créneaux d'ateliers", benefit: "Éviter les conflits d'horaires et simplifier la planification." },
          { id: "3.1.2", title: "Synchronisation automatique des calendriers et envoi d'invitations (Google Calendar / Notion)", benefit: "Automatiser les invitations et bloquer les créneaux sans action manuelle." },
          { id: "3.1.3", title: "Historisation et traçabilité en temps réel de toutes les modifications de plannings", benefit: "Garder l'information à jour malgré les imprévus de dernière minute." },
        ],
      },
      {
        id: "3.2",
        title: "Suivi et anticipation des effectifs bénévoles",
        subActions: [
          { id: "3.2.1", title: "Suivi en temps réel des disponibilités, confirmations et inscriptions des bénévoles par événement", benefit: "Anticiper le nombre de bénévoles présents sur le terrain." },
          { id: "3.2.2", title: "Alertes automatiques en cas de risque de pénurie de bénévoles sur un atelier", benefit: "Pouvoir réajuster la logistique en amont plutôt que de subir le jour J." },
        ],
      },
      {
        id: "3.3",
        title: "Notifications automatiques aux familles",
        subActions: [
          { id: "3.3.1", title: "Envoi automatique d'alertes (SMS/WhatsApp) vers les parents dès qu'une absence non justifiée est cochée", benefit: "Supprimer la pénibilité des appels téléphoniques manuels répétés en début d'atelier." },
          { id: "3.3.2", title: "Automatisation des relances d'informations générales et rappels d'événements vers les familles", benefit: "Améliorer le taux de réponse et la communication globale avec les usagers." },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Stratégie de Communication & Création de Contenu",
    shortTitle: "Communication",
    colorClass: "text-purple-700",
    bgClass: "bg-purple-50",
    borderClass: "border-purple-200",
    useCases: [
      {
        id: "4.1",
        title: "Calendrier éditorial collaboratif",
        impact: 3,
        confidence: 4,
        ease: 4,
        subActions: [
          { id: "4.1.1", title: "Planification visuelle mensuelle des posts basée sur les événements réels de l'association (via Trello)", benefit: "Sortir du flux d'urgence et de la production au jour le jour." },
          { id: "4.1.2", title: "Visualisation claire et centralisée de la charge de travail de création de contenu sur le mois", benefit: "Offrir une meilleure visibilité globale sur la communication à l'équipe." },
        ],
      },
      {
        id: "4.2",
        title: "Workflow de co-rédaction & validation",
        impact: 3,
        confidence: 4,
        ease: 4,
        subActions: [
          { id: "4.2.1", title: "Décentralisation de la rédaction en permettant à l'équipe de soumettre des brouillons de posts", benefit: "Décharger la personne qui centralise actuellement toute la rédaction de contenu." },
          { id: "4.2.2", title: "Configuration d'un circuit de validation simple (Validation / Modification / Refus) avant publication", benefit: "Fluidifier le processus tout en garantissant la fiabilité des valeurs transmises." },
        ],
      },
      {
        id: "4.3",
        title: "Assistant de déclinaison & anonymisation",
        subActions: [
          { id: "4.3.1", title: "Redimensionnement automatique des visuels et images selon les critères techniques de chaque réseau", benefit: "Éliminer une tâche technique chronophage et peu gratifiante." },
          { id: "4.3.2", title: "Automatisation de l'intégration des tags, mentions (@) et liens vers les pages partenaires", benefit: "Sécuriser la publication et éviter les oublis de référencement." },
          { id: "4.3.3", title: "Pré-identification ou détection accélérée des visages des bénéficiaires à flouter sur les photos", benefit: "Sécuriser le droit à l'image des mineurs de manière rapide et systématique." },
        ],
      },
      {
        id: "4.4",
        title: "Publication automatisée",
        subActions: [
          { id: "4.4.1", title: "Programmation automatique des posts validés dans une file d'attente de publication (scheduling)", benefit: "Réduire la charge mentale de devoir publier manuellement chaque semaine à heure fixe." },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Gestion Financière, Subventions & Conformité",
    shortTitle: "Finances & Conformité",
    colorClass: "text-emerald-700",
    bgClass: "bg-emerald-50",
    borderClass: "border-emerald-200",
    useCases: [
      {
        id: "5.1",
        title: "Pipeline de suivi des subventions",
        impact: 4,
        subActions: [
          { id: "5.1.1", title: "Centralisation visuelle de l'état d'avancement des demandes de financement (Recherche, En cours, Validé)", benefit: "Passer moins de temps à chercher le statut d'un dossier de financement." },
          { id: "5.1.2", title: "Rappels automatiques des dates limites de dépôt pour ne rater aucune opportunité de subvention", benefit: "Augmenter le volume global d'offres de subventions validées à temps." },
          { id: "5.1.3", title: "Stockage centralisé des pièces justificatives financières par dossier de subvention", benefit: "Faciliter les audits et simplifier la récupération des documents obligatoires." },
        ],
      },
      {
        id: "5.2",
        title: "Matrice d'arbitrage des opportunités",
        subActions: [
          { id: "5.2.1", title: "Évaluation automatique du ratio temps de rédaction / probabilité de succès d'un appel à projets", benefit: "Permettre un arbitrage rapide de la direction pour prioriser les dossiers rentables." },
        ],
      },
      {
        id: "5.3",
        title: "Sécurisation des adhésions",
        subActions: [
          { id: "5.3.1", title: "Rapprochement automatisé des frais d'inscription et d'adhésion encaissés avec le dossier bénéficiaire", benefit: "Éviter les erreurs de saisie manuelle et conserver un tableau financier à jour." },
          { id: "5.3.2", title: "Structuration et restriction des droits d'accès aux données financières sensibles de l'association", benefit: "Sécuriser le suivi financier, notamment si la gestion est déléguée à des étudiants." },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Valorisation de l'Activité, Reporting & Innovation",
    shortTitle: "Reporting & Impact",
    colorClass: "text-cyan-700",
    bgClass: "bg-cyan-50",
    borderClass: "border-cyan-200",
    useCases: [
      {
        id: "6.1",
        title: "Générateur de bilans institutionnels",
        subActions: [
          { id: "6.1.1", title: "Normalisation et nettoyage automatique des données géographiques (adresses, codes postaux) à la saisie", benefit: "Garantir la propreté de la base de données en amont." },
          { id: "6.1.2", title: "Extraction automatique des publics issus des Quartiers Prioritaires de la Ville (QPV) via mapping", benefit: "Supprimer le filtrage géographique manuel complexe et fastidieux." },
          { id: "6.1.3", title: "Génération automatique des rapports et synthèses d'activité aux formats des financeurs (CAF, Cité Éducative)", benefit: "Rendre la production des bilans réglementaires immédiate et valoriser l'impact auprès des partenaires." },
        ],
      },
      {
        id: "6.2",
        title: "Analyse d'impact pédagogique",
        subActions: [
          { id: "6.2.1", title: "Automatisation de la correction et de l'application des barèmes des tests de positionnement", benefit: "Réduire drastiquement le temps d'analyse des évaluations de début et fin d'année." },
          { id: "6.2.2", title: "Centralisation automatique et mise en graphique des réponses aux questionnaires d'impact", benefit: "Obtenir des conclusions pédagogiques rapides pour réajuster l'accompagnement en cours d'année." },
        ],
      },
      {
        id: "6.3",
        title: "Cockpit de pilotage (Dashboard KPI)",
        subActions: [
          { id: "6.3.1", title: "Consolidation automatique en temps réel des indicateurs clés (adhérents actifs, heures bénévoles, budgets)", benefit: "Piloter l'activité de manière agile et proactive sans manipulations humaines complexes." },
          { id: "6.3.2", title: "Création d'une interface visuelle synthétique d'aide à la décision partagée avec l'équipe", benefit: "Donner de l'autonomie aux collaborateurs grâce à une visibilité claire sur la charge globale." },
        ],
      },
      {
        id: "6.4",
        title: "Libération de temps pour le fond",
        subActions: [
          { id: "6.4.1", title: "Réduction globale du temps de gestion administrative sur l'ensemble des 29 sous-actions précédentes", benefit: "Redéployer le temps du personnel sur des projets de fond (innovation, certification Qualiopi, événements)." },
        ],
      },
    ],
  },
]

export const allUseCases = themes.flatMap((t) => t.useCases.map((uc) => ({ ...uc, themeId: t.id, themeTitle: t.shortTitle, themeColorClass: t.colorClass, themeBgClass: t.bgClass })))

export const allSubActions = themes.flatMap((t) =>
  t.useCases.flatMap((uc) =>
    uc.subActions.map((sa) => ({ ...sa, useCaseId: uc.id, useCaseTitle: uc.title, themeId: t.id }))
  )
)

export const TOTAL_SUB_ACTIONS = allSubActions.length
export const TOTAL_USE_CASES = allUseCases.length
