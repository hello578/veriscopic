
// app/api/drift/pdf/route.ts

import { NextResponse } from 'next/server'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { requireRole } from '@/lib/rbac/guards'
import { renderDeltaAppendixPdf } from '@/lib/legal/export-delta-evidence-pdf'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const organisationId = searchParams.get('organisationId')

  if (!organisationId) {
    return NextResponse.json({ error: 'Missing organisationId' }, { status: 400 })
  }

  // RBAC: owner/admin only
  await requireRole(organisationId, ['owner', 'admin'])

  const supabase = await supabaseServerRead()

  const { data: driftRow, error } = await supabase
    .from('drift_events')
    .select('delta_snapshot, detected_at')
    .eq('organisation_id', organisationId)
    .order('detected_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!driftRow?.delta_snapshot) {
    return NextResponse.json({ error: 'No drift events found' }, { status: 404 })
  }

  const pdfBytes = await renderDeltaAppendixPdf(driftRow.delta_snapshot, {
    mode: 'appendix',
    maxItems: 60,
  })

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="veriscopic-drift-appendix.pdf"',
      'Cache-Control': 'no-store',
    },
  })
}
