// lib/compliance/require-feature.ts

// lib/compliance/require-feature.ts

import { supabaseServerRead } from '@/lib/supabase/server-read'

/**
 * Authoritative feature gate.
 *
 * IMPORTANT:
 * - Uses service role
 * - Bypasses RLS
 * - Feature flags are system configuration, not user data
 */
export async function requireFeature(
  organisationId: string,
  feature: string
): Promise<boolean> {
  const supabase = await supabaseServerRead({ service: true })

  const { data, error } = await supabase
    .from('organisations')
    .select('features')
    .eq('id', organisationId)
    .single()

  if (error || !data) return false

  return Boolean(data.features?.[feature])
}
