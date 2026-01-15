// lib/rbac/types.ts

export type Role = 'owner' | 'admin' | 'member' | 'viewer'

export interface OrganisationSummary {
  id: string
  name: string
}

export interface UserOrgContext {
  user: {
    id: string
    email?: string
  } | null
  org: OrganisationSummary | null
  role: Role | null
}

/**
 * Guard result types (explicit, non-throwing)
 */
export type GuardFailureReason =
  | 'unauthenticated'
  | 'no-org'
  | 'forbidden'

export type GuardSuccess = {
  ok: true
  ctx: UserOrgContext
}

export type GuardFailure = {
  ok: false
  reason: GuardFailureReason
}

export type GuardResult = GuardSuccess | GuardFailure

