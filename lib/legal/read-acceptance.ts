// lib/legal/read-acceptance.ts

import { supabaseServerRead } from '@/lib/supabase/server-read'

export type AcceptanceEvent = {
  accepted_at: string
  document_id: string
}

export async function getOrganisationAcceptanceEvents(
  organisationId: string
) {
  const supabase = await supabaseServerRead()

const { data, error } = await supabase
  .from('terms_acceptance')
  .select('accepted_at, document_id')
  .eq('organisation_id', organisationId)
  .order('accepted_at', { ascending: false })


  if (error) throw error

  return (data ?? []).map((row: any) => ({
    accepted_at: row.accepted_at,
    document_name: row.legal_documents?.name ?? 'Document',
  })) as unknown as AcceptanceEvent[]
}
