// app/api/(org)/[organisationId]/ai-systems/[systemId]/route.ts
import { NextResponse } from 'next/server'

import { requireMember } from '@/lib/rbac/guards'
import { supabaseServerWrite } from '@/lib/supabase/server-write'

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      organisationId: string
      systemId: string
    }>
  }
) {
  const { organisationId, systemId } = await params

  // --------------------------------------------------
  // Auth / membership (organisation-scoped)
  // --------------------------------------------------
  const membership = await requireMember(organisationId)
  if (!membership.ok) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // --------------------------------------------------
  // Parse body
  // --------------------------------------------------
  let body: { is_operational?: boolean }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    )
  }

  if (typeof body.is_operational !== 'boolean') {
    return NextResponse.json(
      { error: '`is_operational` must be a boolean' },
      { status: 400 }
    )
  }

  const supabase = await supabaseServerWrite()
  const now = new Date().toISOString()

  // --------------------------------------------------
  // Update AI system
  // --------------------------------------------------
  const { error: updateError } = await supabase
    .from('ai_systems')
    .update({
      is_operational: body.is_operational,
      updated_at: now,
    })
    .eq('id', systemId)
    .eq('organisation_id', organisationId)

  if (updateError) {
    console.error('[ai-systems PATCH] update failed', updateError)
    return NextResponse.json(
      { error: 'Failed to update AI system' },
      { status: 500 }
    )
  }

  // --------------------------------------------------
  // Audit event (organisation-level, no user dependency)
  // --------------------------------------------------
  const { error: auditError } = await supabase
    .from('organisation_audit_events')
    .insert({
      organisation_id: organisationId,
      event_type: 'ai_system.operational_changed',
      actor_user_id: null, // ← intentionally org-scoped
      occurred_at: now,
      metadata: {
        system_id: systemId,
        is_operational: body.is_operational,
      },
    })

  if (auditError) {
    // Non-blocking by design
    console.warn('[ai-systems PATCH] audit insert failed', auditError)
  }

  return NextResponse.json({ ok: true })
}
