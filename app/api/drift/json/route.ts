
// app/api/drift/json/route.ts

import { NextResponse } from 'next/server'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { requireRole } from '@/lib/rbac/guards'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const organisationId = searchParams.get('organisationId')

  if (!organisationId) {
    return NextResponse.json({ error: 'Missing organisationId' }, { status: 400 })
  }

  await requireRole(organisationId, ['owner', 'admin'])

  const supabase = await supabaseServerRead()

  const { data } = await supabase
    .from('drift_events')
    .select('delta_snapshot')
    .eq('organisation_id', organisationId)
    .order('detected_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!data?.delta_snapshot) {
    return NextResponse.json({ error: 'No drift data available' }, { status: 404 })
  }

  return NextResponse.json(data.delta_snapshot, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
