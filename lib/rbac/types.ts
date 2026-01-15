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
