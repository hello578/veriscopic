// app/api/org/features/request/route.ts

import { NextResponse } from 'next/server'
import { requireMember } from '@/lib/rbac/guards'
import { supabaseServerWrite } from '@/lib/supabase/server-write'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const organisationId = body?.organisationId as string | undefined

  if (!organisationId) {
    return NextResponse.json(
      { error: 'Missing organisationId' },
      { status: 400 }
    )
  }

  const result = await requireMember(organisationId)

  if (!result.ok || !result.ctx || !result.ctx.user) {
    return NextResponse.json(
      { error: 'Unauthorised' },
      { status: 401 }
    )
  }

  const supabase = await supabaseServerWrite()

  await supabase.from('organisation_audit_events').insert({
    organisation_id: organisationId,
    event_type: 'feature_requested',
    actor_user_id: result.ctx.user.id,
    occurred_at: new Date().toISOString(),
    metadata: {
      feature_key: 'evidence_pack',
      source: 'dashboard_cta',
    },
  })

  return NextResponse.json(
    { ok: true },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
