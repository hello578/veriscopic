// lib/legal/export-evidence.ts

// lib/legal/export-evidence.ts

import { supabaseServerRead } from '@/lib/supabase/server-read'

export interface EvidenceExport {
  organisation_id: string
  generated_at: string
  evidence: {
    document_id: string | null
    document_name: string
    version: string
    content_hash: string
    accepted_at: string
    accepted_by: {
      email: string
    }
  }[]
}

export async function exportEvidencePack(
  organisationId: string
): Promise<EvidenceExport> {
  const supabase = await supabaseServerRead()

  const { data, error } = await supabase
    .from('terms_acceptance')
    .select(`
      accepted_at,
      content_hash,
      legal_documents (
        id,
        name,
        version
      ),
      users:user_id (
        email
      )
    `)
    .eq('organisation_id', organisationId)
    .order('accepted_at', { ascending: true })

  if (error) throw error

  return {
    organisation_id: organisationId,
    generated_at: new Date().toISOString(),
    evidence: (data ?? []).map((row) => {
      const document = Array.isArray(row.legal_documents)
        ? row.legal_documents[0]
        : null

      const user = Array.isArray(row.users)
        ? row.users[0]
        : null

      return {
        document_id: document?.id ?? null,
        document_name: document?.name ?? 'Unknown document',
        version: document?.version ?? 'unknown',
        content_hash: row.content_hash,
        accepted_at: row.accepted_at,
        accepted_by: {
          email: user?.email ?? 'unknown',
        },
      }
    }),
  }
}
