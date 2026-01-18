// app/onboarding/create-organisation/page.tsx

import { redirect } from "next/navigation"
import { supabaseServerRead } from "@/lib/supabase/server-read"
import CreateOrganisationForm from "./create-organisation-form"

export default async function CreateOrganisationPage() {
  const supabase = await supabaseServerRead()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data: membership } = await supabase
    .from("organisation_members")
    .select("organisation_id")
    .eq("user_id", user.id)
    .eq("role_key", "owner")
    .maybeSingle()

  if (membership?.organisation_id) {
    redirect(`/${membership.organisation_id}/dashboard`)
  }

  return (
    <main className="p-10 max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">Create your organisation</h1>
      <p className="text-muted-foreground">
        Every Veriscopic workspace belongs to an organisation.
      </p>
      <CreateOrganisationForm />
    </main>
  )
}
