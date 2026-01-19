// lib/compliance/get-completeness.ts

import { supabaseServerRead } from '@/lib/supabase/server-read'
import type { CompletenessResult } from '@/lib/types/compliance'

export async function getCompleteness(
  organisationId: string
): Promise<CompletenessResult> {
  const supabase = await supabaseServerRead()

  const REQUIRED_DOCS = [
    'platform-terms',
    'privacy-notice',
    'ai-governance-disclosure',
  ]

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
      .filter(Boolean) ?? []

  const missingDocs = REQUIRED_DOCS.filter(
    (doc) => !presentDocs.includes(doc)
  )

  const { count: aiSystemsCount } = await supabase
    .from('ai_systems')
    .select('*', { count: 'exact', head: true })
    .eq('organisation_id', organisationId)

  const hasAISystems = (aiSystemsCount ?? 0) > 0

  const { count: accountabilityCount } = await supabase
    .from('organisation_members')
    .select('*', { count: 'exact', head: true })
    .eq('organisation_id', organisationId)
    .in('role_key', ['owner', 'admin'])

  const hasAccountability = (accountabilityCount ?? 0) > 0

  let status: CompletenessResult['status'] = 'complete'

  if (missingDocs.length || !hasAISystems) {
    status = 'partial'
  }

  if (missingDocs.length === REQUIRED_DOCS.length) {
    status = 'incomplete'
  }

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
