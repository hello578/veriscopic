import { supabaseServerRead } from '@/lib/supabase/server-read'
import type { UserOrgContext } from '@/lib/types/rbac'

/**
 * Resolve the current user's organisation + role context.
 *
 * v1 behaviour:
 * - User must belong to at least one organisation
 * - First organisation is treated as active
 *
 * (Can later be extended to support org switching.)
 */
export async function getUserOrgContext(): Promise<UserOrgContext> {
  const supabase = await supabaseServerRead()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 🔐 Not authenticated
  if (!user) {
    return {
      user: null,
      org: null,
      role: null,
    }
  }

  const { data: memberships, error } = await supabase
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
    .limit(1)

  if (error || !memberships || memberships.length === 0) {
    return {
      user: { id: user.id, email: user.email ?? undefined },
      org: null,
      role: null,
    }
  }

  const membership = memberships[0]

  // 🔑 Supabase returns organisations as an array — unwrap it
  const organisation = membership.organisations?.[0] ?? null

  if (!organisation) {
    return {
      user: { id: user.id, email: user.email ?? undefined },
      org: null,
      role: null,
    }
  }

  return {
    user: { id: user.id, email: user.email ?? undefined },
    org: {
      id: organisation.id,
      name: organisation.name,
    },
    role: membership.role_key,
  }
}
