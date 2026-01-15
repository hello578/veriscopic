// lib/rbac/guards.ts

import { getUserOrgContext } from './context'
import type {
  Role,
  GuardResult,
  UserOrgContext,
} from './types'

/**
 * Core guard — unchanged behaviour
 */
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

/**
 * ─────────────────────────────────────────────
 * Role-specific helpers (thin, safe wrappers)
 * ─────────────────────────────────────────────
 */

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

/**
 * ─────────────────────────────────────────────
 * Pure predicates (NO redirects)
 * ─────────────────────────────────────────────
 */

export function hasRole(
  ctx: UserOrgContext,
  roles: Role[]
): boolean {
  if (!ctx.role) return false
  return roles.includes(ctx.role)
}

type Action =
  | 'view_dashboard'
  | 'manage_members'
  | 'manage_documents'

export function can(
  ctx: UserOrgContext,
  action: Action
): boolean {
  if (!ctx.role) return false

  const permissions: Record<Role, Action[]> = {
    owner: [
      'view_dashboard',
      'manage_members',
      'manage_documents',
    ],
    admin: ['view_dashboard', 'manage_documents'],
    member: ['view_dashboard'],
    viewer: ['view_dashboard'],
  }

  return permissions[ctx.role].includes(action)
}





