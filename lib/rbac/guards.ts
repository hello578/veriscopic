import { redirect } from 'next/navigation'
import { getUserOrgContext } from './context'
import type { Role } from './types'

export async function requireRole(
  organisationId: string,
  allowed: Role[]
) {
  const ctx = await getUserOrgContext(organisationId)

  // 🔐 Not authenticated
  if (!ctx.user) {
    redirect('/auth/login')
  }

  // 🚫 User does not belong to this organisation
  if (!ctx.org || !ctx.role) {
    // DO NOT redirect
    // Let the page decide what to show
    throw new Error('No organisation access')
  }

  // 🚫 Insufficient permissions
  if (!allowed.includes(ctx.role)) {
    throw new Error('Insufficient permissions')
  }

  return ctx
}





