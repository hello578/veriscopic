// lib/legal/read-acceptance.ts


import { supabaseServerRead } from '@/lib/supabase/server-read'

export type AcceptanceEvent = {
  accepted_at: string
  document_id: string
  document_name?: string
  version?: string
  content_hash?: string
  user_email?: string | null
}

export async function getOrganisationAcceptanceEvents(
  organisationId: string
): Promise<AcceptanceEvent[]> {
  const supabase = await supabaseServerRead()

  /**
   * IMPORTANT:
   * We must FK-qualify the embed because you have multiple relationships in the schema.
   * If your FK constraint name differs, update the !... part below.
   */
  const { data, error } = await supabase
    .from('terms_acceptance')
    .select(
      `
      accepted_at,
      document_id,
      content_hash,
      legal_documents:legal_documents!terms_acceptance_document_id_fkey (
        name,
        version
      )
    `
    )
    .eq('organisation_id', organisationId)
    .order('accepted_at', { ascending: false })

  if (error) {
    console.error('[getOrganisationAcceptanceEvents]', error)
    throw error
  }

  return (data ?? []).map((row: any) => ({
    accepted_at: row.accepted_at,
    document_id: row.document_id,
    content_hash: row.content_hash ?? undefined,
    document_name: row.legal_documents?.name ?? undefined,
    version: row.legal_documents?.version ?? undefined,
    user_email: null, // optionally wire later if you have profiles/users table
  }))
}
