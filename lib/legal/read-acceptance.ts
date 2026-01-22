// lib/legal/read-acceptance.ts
// lib/legal/read-acceptance.ts

import { supabaseServerRead } from '@/lib/supabase/server-read'

export type AcceptanceEvent = {
  accepted_at: string
  document_id: string
  content_hash: string
  document_name: string
  version: string
  user_email: string | null
}

export async function getOrganisationAcceptanceEvents(
  organisationId: string
): Promise<AcceptanceEvent[]> {
  const supabase = await supabaseServerRead()

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

  return (data ?? [])
    .map((row: any) => ({
      accepted_at: row.accepted_at as string,
      document_id: row.document_id as string,
      content_hash: row.content_hash as string | null,
      document_name: row.legal_documents?.name as string | null,
      version: row.legal_documents?.version as string | null,
      user_email: null,
    }))
    .filter((e) => Boolean(e.content_hash && e.document_name && e.version))
    .map((e) => ({
      accepted_at: e.accepted_at,
      document_id: e.document_id,
      content_hash: e.content_hash!,
      document_name: e.document_name!,
      version: e.version!,
      user_email: e.user_email,
    }))
}

