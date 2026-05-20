import StatCard from "@/components/StatCard"
import { UserX, Euro, BookOpen, Megaphone, Users } from "lucide-react"
import { absences, finances, ateliers, communication, benevoles } from "@/lib/mock-data"

function todayFr() {
  return new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
}

export default function DashboardPage() {
  const totalAlertes =
    absences.stats.nonJustifiees +
    finances.demandes.filter((d) => d.statut === "à compléter").length +
    ateliers.stats.sallesNonConfirmees +
    communication.calendrier.filter((p) => p.statut === "à créer").length +
    (benevoles.prochainEvenement.besoins - benevoles.prochainEvenement.confirmes)

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <p className="text-sm text-muted capitalize">{todayFr()}</p>
        <h1 className="text-2xl font-bold text-foreground mt-1">Vue d'ensemble</h1>
        {totalAlertes > 0 && (
          <div className="mt-4 bg-red-50 border border-alert/20 text-alert rounded-lg px-4 py-3 text-sm font-medium">
            {totalAlertes} point{totalAlertes > 1 ? "s" : ""} à traiter aujourd'hui
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <StatCard
          title="Absences"
          icon={UserX}
          accentClass="bg-absences-light"
          iconClass="text-absences-dark"
          borderClass="border-absences"
          alerts={absences.stats.nonJustifiees}
          href="/absences"
          cta="Gérer les absences"
          stats={[
            { label: "Absents aujourd'hui", value: absences.stats.total },
            { label: "Non justifiées", value: absences.stats.nonJustifiees, highlight: absences.stats.nonJustifiees > 0 },
            { label: "Appels effectués", value: `${absences.stats.appelsEffectues}/${absences.stats.nonJustifiees}` },
          ]}
        />

        <StatCard
          title="Finances"
          icon={Euro}
          accentClass="bg-finances-light"
          iconClass="text-finances-dark"
          borderClass="border-finances"
          alerts={finances.demandes.filter((d) => d.statut === "à compléter").length}
          href="/finances"
          cta="Gérer les financements"
          stats={[
            { label: "Demandes en cours", value: finances.stats.enCours },
            { label: "Montant total suivi", value: `${finances.stats.montantTotal.toLocaleString("fr")} €` },
            { label: "Deadline cette semaine", value: finances.stats.deadlineCetteSemaine, highlight: true },
          ]}
        />

        <StatCard
          title="Ateliers"
          icon={BookOpen}
          accentClass="bg-ateliers-light"
          iconClass="text-ateliers-dark"
          borderClass="border-ateliers"
          alerts={ateliers.stats.sallesNonConfirmees}
          href="/ateliers"
          cta="Organiser les ateliers"
          stats={[
            { label: "Ateliers cette semaine", value: ateliers.stats.cetteSemaine },
            { label: "Groupes à composer", value: ateliers.stats.groupesAComposer, highlight: ateliers.stats.groupesAComposer > 0 },
            { label: "Salle non confirmée", value: ateliers.stats.sallesNonConfirmees, highlight: true },
          ]}
        />

        <StatCard
          title="Communication"
          icon={Megaphone}
          accentClass="bg-communication-light"
          iconClass="text-communication-dark"
          borderClass="border-communication"
          alerts={communication.calendrier.filter((p) => p.statut === "à créer").length}
          href="/communication"
          cta="Calendrier édito"
          stats={[
            { label: "Posts à créer", value: communication.calendrier.filter((p) => p.statut === "à créer").length, highlight: true },
            { label: "Brouillons", value: communication.calendrier.filter((p) => p.statut === "brouillon").length },
            { label: "Événements à venir", value: communication.evenements.length },
          ]}
        />

        <StatCard
          title="Bénévoles"
          icon={Users}
          accentClass="bg-benevoles-light"
          iconClass="text-benevoles-dark"
          borderClass="border-benevoles"
          alerts={benevoles.prochainEvenement.besoins - benevoles.prochainEvenement.confirmes}
          href="/benevoles"
          cta="Gérer les bénévoles"
          stats={[
            { label: "Bénévoles actifs", value: `${benevoles.stats.confirmes}/${benevoles.stats.total}` },
            { label: `Prochains : ${benevoles.prochainEvenement.nom}`, value: `${benevoles.prochainEvenement.confirmes}/${benevoles.prochainEvenement.besoins}`, highlight: benevoles.prochainEvenement.confirmes < benevoles.prochainEvenement.besoins },
            { label: "Désistements en cours", value: benevoles.stats.desistementsEnCours, highlight: benevoles.stats.desistementsEnCours > 0 },
          ]}
        />
      </div>
    </div>
  )
}
