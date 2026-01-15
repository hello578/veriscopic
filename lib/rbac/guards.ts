import { getUserOrgContext } from './context'
import type { Role } from './types'

export async function requireRole(
  organisationId: string,
  allowed: Role[]
) {
  const ctx = await getUserOrgContext(organisationId)

  if (!ctx.user) {
    return { ok: false as const, reason: 'unauthenticated' }
  }

  if (!ctx.org || !ctx.role) {
    return { ok: false as const, reason: 'no-org' }
  }

  if (!allowed.includes(ctx.role)) {
    return { ok: false as const, reason: 'forbidden' }
  }

  return { ok: true as const, ctx }
}





