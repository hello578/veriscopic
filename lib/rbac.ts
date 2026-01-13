import { redirect } from 'next/navigation'
import type { OrganisationRole } from '@/lib/types/organisation'

/**
 * Role hierarchy (highest → lowest)
 */
const ROLE_ORDER: OrganisationRole[] = [
  'owner',
  'admin',
  'member',
  'viewer',
]

/**
 * Check if a role satisfies a minimum required role
 */
export function hasRequiredRole(
  userRole: OrganisationRole,
  requiredRole: OrganisationRole
): boolean {
  return (
    ROLE_ORDER.indexOf(userRole) <=
    ROLE_ORDER.indexOf(requiredRole)
  )
}

/**
 * Enforce RBAC on a server page
 * Redirects automatically if not authorised
 */
export function requireOrgRole(
  userRole: OrganisationRole,
  requiredRole: OrganisationRole
): void {
  if (!hasRequiredRole(userRole, requiredRole)) {
    redirect('/unauthorised')
  }
}
