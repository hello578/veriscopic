
// app/(org)/[organisationId]/dashboard/components/responsibility-map.tsx
// app/(org)/[organisationId]/dashboard/components/responsibility-map.tsx
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { ResponsibilityTable } from './responsibility-table'

type ResponsibilityRow = {
  id: string
  role_label: string
  decision_surface: string
  evidence_type: string
  review_trigger: string
  status: 'active' | 'superseded' | 'withdrawn'
  declared_at: string
}

export async function ResponsibilityMap({
  organisationId,
}: {
  organisationId: string
}) {
  const supabase = await supabaseServerRead()

  const { data, error } = await supabase
    .from('organisation_responsibilities')
    .select(
      `
      id,
      role_label,
      decision_surface,
      evidence_type,
      review_trigger,
      status,
      declared_at
    `,
    )
    .eq('organisation_id', organisationId)
    .order('declared_at', { ascending: true })

  if (error) {
    console.error(
      '[ResponsibilityMap] organisation_responsibilities error:',
      error,
    )
  }

  return (
    <ResponsibilityTable
      rows={(data ?? []) as ResponsibilityRow[]}
    />
  )
}

