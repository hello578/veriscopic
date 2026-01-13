'use server'

import { redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { supabaseService } from '@/lib/supabase/server-service'

export async function createOrganisation(formData: FormData) {
  const name = formData.get('name')?.toString().trim()
  if (!name) throw new Error('Organisation name is required')

  // ✅ 1. READ auth context from cookie-based client
  const supabaseRead = await supabaseServerRead()
  const { data: userData } = await supabaseRead.auth.getUser()

  const user = userData.user
  if (!user) {
    redirect('/auth/login')
  }

  // ✅ 2. WRITE using service-role client
  const supabaseWrite = supabaseService()

  const { data: org, error: orgErr } = await supabaseWrite
    .from('organisations')
    .insert({ name })
    .select()
    .single()

  if (orgErr) throw new Error(orgErr.message)

  const { error: memberErr } = await supabaseWrite
    .from('organisation_members')
    .insert({
      organisation_id: org.id,
      user_id: user.id,
      role_key: 'owner',
    })

  if (memberErr) throw new Error(memberErr.message)

  // ✅ 3. Redirect (session cookie still valid)
  redirect('/dashboard')
}

