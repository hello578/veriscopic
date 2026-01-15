// lib/legal/export-evidence.ts

// lib/legal/export-evidence.ts

import { supabaseServerRead } from '@/lib/supabase/server-read'
import { sha256HexFromJson } from './evidence-pack-canonical'

export type EvidencePack = {
  organisation_id: string
  generated_at: string
  evidence: {
    document_id: string
    document_name: string
    document_type: string | null
    version: string
    jurisdiction: string | null
    content_hash: string
    accepted_at: string
  }[]
  checksum: {
    algorithm: 'SHA-256'
    canonical_json_sha256: string
  }
}

export async function exportEvidencePack(
  organisationId: string
): Promise<EvidencePack> {
  const supabase = await supabaseServerRead()

  const { data, error } = await supabase
    .from('terms_acceptance')
    .select(
      `
        organisation_id,
        accepted_at,
        content_hash,
        document_id,
       legal_documents:legal_documents!terms_acceptance_document_id_fkey (
          id,
          name,
          document_type,
          version,
          jurisdiction,
          content_hash
        )
      `
    )
    .eq('organisation_id', organisationId)
    .order('accepted_at', { ascending: true })

  if (error) {
    console.error('[exportEvidencePack] Supabase error:', error)
    throw new Error(error.message)
  }

  const generatedAt = new Date().toISOString()

  const packCore = {
    organisation_id: organisationId,
    generated_at: generatedAt,
    evidence: (data ?? []).map((row: any) => ({
      document_id: row.document_id,
      document_name: row.legal_documents?.name ?? 'Unknown document',
      document_type: row.legal_documents?.document_type ?? null,
      version: row.legal_documents?.version ?? 'unknown',
      jurisdiction: row.legal_documents?.jurisdiction ?? null,
      content_hash: row.content_hash,
      accepted_at: new Date(row.accepted_at).toISOString(),
    })),
  }

  const { checksum } = sha256HexFromJson(packCore as any)

  return {
    ...packCore,
    checksum: {
      algorithm: 'SHA-256',
      canonical_json_sha256: checksum,
    },
  }
}
