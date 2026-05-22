import { redirect } from "next/navigation"

// Ancienne page /parents — la liste des parents vit désormais dans /beneficiaires
// (hub Élèves / Parents). Redirection préservée pour les anciens bookmarks et
// liens externes.
export default function ParentsRedirectPage() {
  redirect("/beneficiaires?type=parent")
}
