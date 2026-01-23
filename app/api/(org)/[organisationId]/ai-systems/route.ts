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

function sanitizeText(input: unknown, maxLen: number) {
  if (typeof input !== 'string') return null
  const t = input.trim()
  if (!t) return null
  return t.length > maxLen ? t.slice(0, maxLen) : t
}

function sanitizeStringArray(input: unknown, maxItems: number, maxItemLen: number) {
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
  {
    params,
  }: {
    params: Promise<{ organisationId: string }>
  }
) {
  const { organisationId } = await params

  // --------------------------------------------------
  // Auth / membership (organisation-scoped)
  // --------------------------------------------------
  const membership = await requireMember(organisationId)
  if (!membership.ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Gold-standard guardrail:
  // If your DB policies allow only owner/admin to create, keep parity here.
  // We do NOT depend on user_id for evidence validity; this is just permissioning.
  const roleKey = (membership as any)?.membership?.role_key ?? (membership as any)?.role_key
  if (roleKey && !['owner', 'admin'].includes(roleKey)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // --------------------------------------------------
  // Parse + validate body
  // --------------------------------------------------
  let body: CreateAISystemBody
  try {
    body = (await req.json()) as CreateAISystemBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const name = sanitizeText(body?.name, 140)
  const purpose = sanitizeText(body?.purpose, 2000)
  const systemOwnerRaw = body?.system_owner
  const systemOwner =
    systemOwnerRaw === null ? null : sanitizeText(systemOwnerRaw, 140)

  if (!name || !purpose) {
    return NextResponse.json(
      { error: '`name` and `purpose` are required' },
      { status: 400 }
    )
  }

  const dataCategories = sanitizeStringArray(body?.data_categories ?? [], 50, 60)

  const supabase = await supabaseServerWrite()

  // --------------------------------------------------
  // Insert AI system (org-scoped, declarative)
  // --------------------------------------------------
  const { data: system, error } = await supabase
    .from('ai_systems')
    .insert({
      organisation_id: organisationId,
      name,
      purpose,
      system_owner: systemOwner ?? null,
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

  // --------------------------------------------------
  // Audit event (best-effort, non-blocking)
  // --------------------------------------------------
  try {
    const actorUserId =
      (membership as any)?.membership?.user_id ??
      (membership as any)?.user_id ??
      null

    const { error: auditError } = await supabase
      .from('organisation_audit_events')
      .insert({
        organisation_id: organisationId,
        event_type: 'ai_system.created',
        actor_user_id: actorUserId, // allowed to be null
        metadata: {
          system_id: system.id,
          name: system.name,
          is_operational: system.is_operational,
        },
      })

    if (auditError) {
      console.warn('[ai-systems POST] audit insert failed (non-blocking):', auditError)
    }
  } catch (e) {
    console.warn('[ai-systems POST] audit insert threw (non-blocking):', e)
  }

  return NextResponse.json({ system })
}
