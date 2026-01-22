// app/dashboard/page.tsx

import { redirect } from "next/navigation"
import { supabaseServerRead } from "@/lib/supabase/server-read"

export default async function DashboardEntryPage() {
  const supabase = await supabaseServerRead()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: ownerOrg } = await supabase
    .from("organisation_members")
    .select("organisation_id")
    .eq("user_id", user.id)
    .eq("role_key", "owner")
    .single()

  if (!ownerOrg) {
    redirect("/onboarding/create-organisation")
  }

  // 🔑 THIS MUST MATCH THE (org) ROUTE
  redirect(`/${ownerOrg.organisation_id}/dashboard`)
}

