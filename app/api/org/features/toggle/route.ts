
// app/api/org/features/toggle/route.ts

import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/rbac/guards'
import { supabaseServerWrite } from '@/lib/supabase/server-write'
import { supabaseServerRead } from '@/lib/supabase/server-read'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)

  const organisationId = body?.organisationId as string | undefined
  const featureKey = body?.featureKey as string | undefined
  const enabled = body?.enabled as boolean | undefined

  if (!organisationId || !featureKey || typeof enabled !== 'boolean') {
    return NextResponse.json(
      { error: 'Missing organisationId, featureKey, or enabled' },
      { status: 400 }
    )
  }

  // --- RBAC
  const result = await requireRole(organisationId, ['owner', 'admin'])

  if (!result.ok || !result.ctx) {
    return NextResponse.json(
      { error: 'Unauthorised' },
      { status: 401 }
    )
  }

  // ✅ Correct source of actor identity
  if (!result.ctx.user) {
  // This should never happen if requireRole is correct
  return NextResponse.json(
    { error: 'Unauthorised' },
    { status: 401 }
  )
}

const actorUserId = result.ctx.user.id


  // --- Read current features
  const supabaseRead = await supabaseServerRead()
  const { data: org, error: orgErr } = await supabaseRead
    .from('organisations')
    .select('features')
    .eq('id', organisationId)
    .single()

  if (orgErr || !org) {
    return NextResponse.json(
      { error: 'Organisation not found' },
      { status: 404 }
    )
  }

  const previous = Boolean(org.features?.[featureKey])

  // No-op protection
  if (previous === enabled) {
    return NextResponse.json(
      { ok: true, changed: false, enabled },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  }

  // --- Update feature flag
  const supabaseWrite = await supabaseServerWrite()

  const { error: updErr } = await supabaseWrite
    .from('organisations')
    .update({
      features: {
        ...(org.features ?? {}),
        [featureKey]: enabled,
      },
    })
    .eq('id', organisationId)

  if (updErr) {
    return NextResponse.json(
      { error: 'Failed to update features' },
      { status: 500 }
    )
  }

  // --- Audit log (append-only)
  const { error: auditErr } = await supabaseWrite
    .from('organisation_audit_events')
    .insert({
      organisation_id: organisationId,
      event_type: 'feature_toggled',
      actor_user_id: actorUserId,
      occurred_at: new Date().toISOString(),
      metadata: {
        feature_key: featureKey,
        from: previous,
        to: enabled,
        source: 'admin_ui',
      },
    })

  if (auditErr) {
    // Never block core action due to audit failure
    console.error('[feature_toggled] audit log failed', auditErr)
  }

  return NextResponse.json(
    { ok: true, changed: true, enabled },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
