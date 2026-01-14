import { redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'

export default async function HomePage() {
  const supabase = await supabaseServerRead()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: membership } = await supabase
    .from('organisation_members')
    .select('organisation_id')
    .eq('user_id', user.id)
    .limit(1)

  if (!membership || membership.length === 0) {
    redirect('/onboarding/create-organisation')
  }

  redirect(`/${membership[0].organisation_id}/dashboard`)
}
