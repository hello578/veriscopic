// app/api/(org)/[organisationId]/ai-systems/route.ts
// app/api/(org)/[organisationId]/ai-systems/route.ts

import { NextResponse } from 'next/server'
import { requireMember } from '@/lib/rbac/guards'
import { supabaseServerWrite } from '@/lib/supabase/server-write'

type CreateAISystemBody = {
  name?: string
  purpose?: string
  system_owner?: string | null
  data_categories?: string[] | null
}

type MembershipContext = {
  role_key?: string | null
  user_id?: string | null
  membership?: {
    role_key?: string | null
    user_id?: string | null
  }
}

function sanitizeText(input: unknown, maxLen: number): string | null {
  if (typeof input !== 'string') return null
  const t = input.trim()
  if (!t) return null
  return t.length > maxLen ? t.slice(0, maxLen) : t
}

function sanitizeStringArray(
  input: unknown,
  maxItems: number,
  maxItemLen: number
): string[] {
  if (!Array.isArray(input)) return []
  const out: string[] = []
  for (const item of input) {
    if (typeof item !== 'string') continue
    const t = item.trim()
    if (!t) continue
    out.push(t.length > maxItemLen ? t.slice(0, maxItemLen) : t)
    if (out.length >= maxItems) break
  }
  return out
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ organisationId: string }> }
) {
  const { organisationId } = await params

  // ── Auth / RBAC ───────────────────────────────────
  const membershipResult = await requireMember(organisationId)
  if (!membershipResult.ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const membership = membershipResult as MembershipContext
  const roleKey =
    membership.membership?.role_key ?? membership.role_key ?? null

  if (roleKey && !['owner', 'admin'].includes(roleKey)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // ── Parse + validate body ─────────────────────────
  let body: CreateAISystemBody
  try {
    body = (await req.json()) as CreateAISystemBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const name = sanitizeText(body?.name, 140)
  const purpose = sanitizeText(body?.purpose, 2000)

  if (!name || !purpose) {
    return NextResponse.json(
      { error: '`name` and `purpose` are required' },
      { status: 400 }
    )
  }

  const systemOwner =
    body?.system_owner === null
      ? null
      : sanitizeText(body?.system_owner, 140)

  const dataCategories = sanitizeStringArray(
    body?.data_categories ?? [],
    50,
    60
  )

  const supabase = await supabaseServerWrite()

  // ── Insert AI system ──────────────────────────────
  const { data: system, error } = await supabase
    .from('ai_systems')
    .insert({
      organisation_id: organisationId,
      name,
      purpose,
      system_owner: systemOwner,
      data_categories: dataCategories,
      lifecycle_status: 'active',
      is_operational: false,
    })
    .select()
    .single()

  if (error || !system) {
    console.error('[ai-systems POST] insert error:', error)
    return NextResponse.json(
      { error: 'Failed to create AI system' },
      { status: 500 }
    )
  }

  // ── Mark governance as changed (signal only) ──────
  await supabase
    .from('organisations')
    .update({
      governance_changed_at: new Date().toISOString(),
    })
    .eq('id', organisationId)

  // ── Audit event (best-effort) ─────────────────────
  try {
    const actorUserId =
      membership.membership?.user_id ?? membership.user_id ?? null

    await supabase.from('organisation_audit_events').insert({
      organisation_id: organisationId,
      event_type: 'ai_system.created',
      actor_user_id: actorUserId,
      metadata: {
        system_id: system.id,
        name: system.name,
      },
    })
  } catch {
    // Never block core flow on audit failure
  }

  return NextResponse.json({ system })
}
