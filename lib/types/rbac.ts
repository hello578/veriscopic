/**
 * Organisation-level roles
 */
export type Role = 'owner' | 'admin' | 'member' | 'viewer'

/**
 * Minimal organisation shape
 */
export interface OrganisationSummary {
  id: string
  name: string
}

/**
 * RBAC context resolved server-side
 */
export interface UserOrgContext {
  user: {
    id: string
    email?: string
  } | null
  org: OrganisationSummary | null
  role: Role | null
}
