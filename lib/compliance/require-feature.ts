// lib/compliance/require-feature.ts

import { supabaseServerRead } from '@/lib/supabase/server-read'

export async function requireFeature(
  organisationId: string,
  feature: string
) {
  const supabase = await supabaseServerRead()

  const { data, error } = await supabase
    .from('organisations')
    .select('features')
    .eq('id', organisationId)
    .single()

  if (error || !data) {
    throw new Error('Organisation not found')
  }

  if (!data.features?.[feature]) {
    return false
  }

  return true
}
