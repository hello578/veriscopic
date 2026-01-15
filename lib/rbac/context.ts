import { supabaseServerRead } from '@/lib/supabase/server-read'
import type { Role } from './types'

export async function getUserOrgContext(organisationId: string) {
  const supabase = await supabaseServerRead()

  // 1️⃣ Auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { user: null, org: null, role: null }
  }

  // 2️⃣ Membership lookup
  const { data: membership } = await supabase
    .from('organisation_members')
    .select(
      `
      role_key,
      organisations (
        id,
        name
      )
    `
    )
    .eq('user_id', user.id)
    .eq('organisation_id', organisationId)
    .single()

  if (!membership || !membership.organisations) {
    return { user, org: null, role: null }
  }

  /**
   * 🔑 IMPORTANT:
   * Supabase types declare joins as arrays
   * even when `.single()` is used.
   * We must normalize manually.
   */
  const org = Array.isArray(membership.organisations)
    ? membership.organisations[0]
    : membership.organisations

  if (!org) {
    return { user, org: null, role: null }
  }

  return {
    user: {
      id: user.id,
      email: user.email ?? undefined,
    },
    org: {
      id: org.id,
      name: org.name,
    },
    role: membership.role_key as Role,
  }
}

