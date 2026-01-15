// lib/dashboard/load-dashboard-data.ts
import { SupabaseClient } from '@supabase/supabase-js'
import type { OrganisationWithRole } from '@/lib/types/organisation'

export async function loadDashboardData(
  supabase: SupabaseClient,
  activeOrg: OrganisationWithRole
) {
  /**
   * Organisation member count
   */
  const { count: memberCount } = await supabase
    .from('organisation_members')
    .select('*', { count: 'exact', head: true })
    .eq('organisation_id', activeOrg.id)

  /**
   * Active legal documents
   */
  const { data: legalDocuments } = await supabase
    .from('legal_documents')
    .select('id, name, version')
    .order('name')

  /**
   * Evidence log (latest acceptances)
   */
  const { data: evidenceLog } = await supabase
    .from('terms_acceptance')
    .select('accepted_at')
    .order('accepted_at', { ascending: false })
    .limit(5)

  return {
    memberCount: memberCount ?? 0,
    legalDocuments: legalDocuments ?? [],
    evidenceLog: evidenceLog ?? [],
  }
}
