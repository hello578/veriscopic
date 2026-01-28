// lib/legal/read-acceptance.ts
// lib/legal/read-acceptance.ts

import { supabaseServerRead } from '@/lib/supabase/server-read'

/**
 * =====================================================================
 * GOVERNANCE INVARIANT — READ CAREFULLY
 * =====================================================================
 *
 * This module reads ACCEPTANCE EVIDENCE.
 *
 * Acceptance evidence represents a historical fact:
 *   “This organisation accepted this exact document content at this time.”
 *
 * CRITICAL RULES:
 * 1. Acceptance rows MUST NEVER be dropped at read time.
 * 2. Missing enrichment (document name/version) MUST NOT invalidate evidence.
 * 3. Evidence is sourced ONLY from `terms_acceptance`.
 * 4. This function MUST NOT depend on Evidence Packs or current document state.
 *
 * If enrichment fails, placeholder values MUST be returned.
 * Evidence must always remain visible once recorded.
 * =====================================================================
 */

/* ------------------------------------------------------------------
   Public domain type (consumed by dashboard, exports, audit views)
------------------------------------------------------------------- */

export type AcceptanceEvent = {
  accepted_at: string
  document_id: string
  content_hash: string
  document_name: string
  version: string
  user_email: string | null
}

/* ------------------------------------------------------------------
   Internal DB row shape (Supabase join result)
------------------------------------------------------------------- */

type AcceptanceRow = {
  accepted_at: string
  document_id: string
  content_hash: string | null
  legal_documents:
    | {
        name: string | null
        version: string | null
      }[]
    | null
}

/* ------------------------------------------------------------------
   Canonical acceptance reader
------------------------------------------------------------------- */

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
    .order('accepted_at', { ascending: true }) // chronological, deterministic

  if (error) {
    console.error('[getOrganisationAcceptanceEvents]', error)
    throw error
  }

  const rows = (data ?? []) as AcceptanceRow[]

  /**
   * IMPORTANT:
   * We ALWAYS return one AcceptanceEvent per DB row.
   * Missing enrichment is represented explicitly, never filtered out.
   */
  return rows.map((row): AcceptanceEvent => {
    const doc = row.legal_documents?.[0]

    return {
      accepted_at: row.accepted_at,
      document_id: row.document_id,

      // Hash is the cryptographic anchor of acceptance.
      // If missing (should not happen), return a sentinel value — never drop.
      content_hash: row.content_hash ?? '[hash-missing]',

      // Enrichment fields — best effort only
      document_name: doc?.name ?? '[unknown document]',
      version: doc?.version ?? '[unknown version]',

      // Email intentionally nullable (not all acceptance contexts require it)
      user_email: null,
    }
  })
}
