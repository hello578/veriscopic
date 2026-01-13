/**
 * Organisation domain types
 * -------------------------
 * These types represent database-backed rows and
 * must stay aligned with the Supabase schema.
 */

/**
 * Base Organisation row
 * Mirrors: public.organisations
 */
export type OrganisationRole =
  | 'owner'
  | 'admin'
  | 'member'
  | 'viewer'

export interface OrganisationSummary {
  id: string
  name: string
}

export interface OrganisationWithRole extends OrganisationSummary {
  role_key: OrganisationRole
}
