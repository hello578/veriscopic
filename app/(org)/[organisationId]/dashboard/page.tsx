import { redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'

type PageProps = {
  params: Promise<{
    organisationId: string
  }>
}

export default async function OrganisationDashboardPage({ params }: PageProps) {
  // ✅ Next.js 16 FIX — unwrap params
  const { organisationId } = await params

  const supabase = await supabaseServerRead()

  // 🔐 1. Auth check
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser()

  if (userErr || !user) {
    redirect('/auth/login')
  }

  // 🧭 2. Validate membership for this organisation
  const { data: membership } = await supabase
    .from('organisation_members')
    .select('role_key')
    .eq('organisation_id', organisationId)
    .eq('user_id', user.id)
    .limit(1)

  if (!membership || membership.length === 0) {
    redirect('/onboarding/create-organisation')
  }

  // 📊 3. Load organisation data
  const { data: organisation, error: orgErr } = await supabase
    .from('organisations')
    .select('id, name')
    .eq('id', organisationId)
    .single()

  if (orgErr || !organisation) {
    throw new Error('Organisation not found')
  }

  // ✅ Render
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">
        {organisation.name}
      </h1>

      <p className="text-muted-foreground">
        Organisation dashboard
      </p>

      {/* Placeholder for real dashboard content */}
      <div className="rounded-lg border p-6">
        <p className="text-sm">
          Role: {membership[0].role_key}
        </p>
      </div>
    </main>
  )
}
