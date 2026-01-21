// lib/compliance/get-completeness.ts
// lib/compliance/get-completeness.ts

import 'server-only'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import type { CompletenessResult } from '@/lib/types/compliance'

export async function getCompleteness(
  organisationId: string
): Promise<CompletenessResult> {
  const supabase = await supabaseServerRead()

  /**
   * These are PLATFORM documents.
   * Presence means "accepted and recorded", not "legally sufficient".
   */
  const REQUIRED_DOCS = [
    'platform-terms',
    'privacy-notice',
    'ai-governance-disclosure',
  ]

  /* ---------------------------------------------------------------------- */
  /* Legal documents acceptance                                              */
  /* ---------------------------------------------------------------------- */

  const { data: acceptedDocs } = await supabase
    .from('terms_acceptance')
    .select(`
      legal_documents (
        slug
      )
    `)
    .eq('organisation_id', organisationId)

  const presentDocs =
    acceptedDocs
      ?.map((row) => row.legal_documents?.[0]?.slug)
      .filter((s): s is string => Boolean(s)) ?? []

  const missingDocs = REQUIRED_DOCS.filter(
    (doc) => !presentDocs.includes(doc)
  )

  /* ---------------------------------------------------------------------- */
  /* AI systems presence                                                     */
  /* ---------------------------------------------------------------------- */

  const { count: aiSystemsCount } = await supabase
    .from('ai_systems')
    .select('*', { count: 'exact', head: true })
    .eq('organisation_id', organisationId)

  const hasAISystems = (aiSystemsCount ?? 0) > 0

  /* ---------------------------------------------------------------------- */
  /* Accountability (org ownership/admin)                                    */
  /* ---------------------------------------------------------------------- */

  const { count: accountabilityCount } = await supabase
    .from('organisation_members')
    .select('*', { count: 'exact', head: true })
    .eq('organisation_id', organisationId)
    .in('role_key', ['owner', 'admin'])

  const hasAccountability = (accountabilityCount ?? 0) > 0

  /* ---------------------------------------------------------------------- */
  /* Status logic (descriptive only)                                          */
  /* ---------------------------------------------------------------------- */

  let status: CompletenessResult['status'] = 'complete'

  if (missingDocs.length > 0 || !hasAISystems) {
    status = 'partial'
  }

  if (
    missingDocs.length === REQUIRED_DOCS.length &&
    !hasAISystems
  ) {
    status = 'incomplete'
  }

  /* ---------------------------------------------------------------------- */
  /* Result                                                                  */
  /* ---------------------------------------------------------------------- */

  return {
    status,
    breakdown: {
      requiredDocs: REQUIRED_DOCS,
      missingDocs,
      hasAISystems,
      hasAccountability,
    },
  }
}
