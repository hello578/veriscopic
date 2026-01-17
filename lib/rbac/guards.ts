// lib/rbac/guards.ts
// lib/rbac/guards.ts
import 'server-only'

import { getUserOrgContext } from './context'
import type {
  Role,
  GuardResult,
  UserOrgContext,
} from './types'

export async function requireRole(
  organisationId: string,
  allowed: Role[]
): Promise<GuardResult> {
  const ctx = await getUserOrgContext(organisationId)

  if (!ctx.user) {
    return { ok: false, reason: 'unauthenticated' }
  }

  if (!ctx.org || !ctx.role) {
    return { ok: false, reason: 'no-org' }
  }

  if (!allowed.includes(ctx.role)) {
    return { ok: false, reason: 'forbidden' }
  }

  return { ok: true, ctx }
}

export function requireOwner(organisationId: string) {
  return requireRole(organisationId, ['owner'])
}

export function requireAdmin(organisationId: string) {
  return requireRole(organisationId, ['owner', 'admin'])
}

export function requireMember(organisationId: string) {
  return requireRole(organisationId, [
    'owner',
    'admin',
    'member',
  ])
}

export function hasRole(
  ctx: UserOrgContext,
  roles: Role[]
): boolean {
  return !!ctx.role && roles.includes(ctx.role)
}
