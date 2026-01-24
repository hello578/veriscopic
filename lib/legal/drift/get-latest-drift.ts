
// lib/legal/drift/get-latest-drift.ts


import { supabaseServerRead } from '@/lib/supabase/server-read'

export type DriftStatusResult =
  | {
      status: 'not_checked'
      detected_at: null
    }
  | {
      status: 'no_drift'
      detected_at: string
    }
  | {
      status: 'drift_detected'
      detected_at: string
    }

export async function getLatestDriftStatus(
  organisationId: string
): Promise<DriftStatusResult> {
  const supabase = await supabaseServerRead()

  const { data } = await supabase
    .from('drift_events')
    .select('has_drift, detected_at')
    .eq('organisation_id', organisationId)
    .order('detected_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!data) {
    return {
      status: 'not_checked',
      detected_at: null,
    }
  }

  return {
    status: data.has_drift ? 'drift_detected' : 'no_drift',
    detected_at: data.detected_at,
  }
}
