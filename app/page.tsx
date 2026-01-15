import { redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'

export default async function RootPage() {
  const supabase = await supabaseServerRead()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 🔐 Not signed in
  if (!user) {
    redirect('/auth/login')
  }

  // 🧭 Fetch memberships
  const { data: memberships } = await supabase
    .from('organisation_members')
    .select('organisation_id')
    .eq('user_id', user.id)
    .limit(1)

  // 🏗️ No organisation yet
  if (!memberships || memberships.length === 0) {
    redirect('/onboarding/create-organisation')
  }

  // ✅ Exactly ONE redirect, from /
  redirect(`/${memberships[0].organisation_id}/dashboard`)
}
