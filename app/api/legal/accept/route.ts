
//app/api/legal/accept/route.ts

import { NextResponse } from 'next/server'
import { supabaseServerWrite } from '@/lib/supabase/server-write'
import { requireMember } from '@/lib/rbac/guards'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const supabase = await supabaseServerWrite()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const documentIds: string[] = body?.documentIds

  if (!Array.isArray(documentIds) || documentIds.length === 0) {
    return NextResponse.json(
      { error: 'Missing documentIds' },
      { status: 400 }
    )
  }

  // Resolve organisation
  const { data: memberships } = await supabase
    .from('organisation_members')
    .select('organisation_id')
    .eq('user_id', user.id)
    .limit(1)

  const organisationId = memberships?.[0]?.organisation_id
  if (!organisationId) {
    return NextResponse.json({ error: 'No organisation' }, { status: 403 })
  }

  const access = await requireMember(organisationId)
  if (!access.ok) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Fetch documents + hashes
  const { data: documents } = await supabase
    .from('legal_documents')
    .select('id, content_hash, version')
    .in('id', documentIds)

  if (!documents || documents.length === 0) {
    return NextResponse.json(
      { error: 'Documents not found' },
      { status: 404 }
    )
  }

  const acceptedAt = new Date().toISOString()

  // Insert acceptance evidence (idempotent)
  const acceptanceRows = documents.map((doc) => ({
    organisation_id: organisationId,
    document_id: doc.id,
    user_id: user.id,
    content_hash: doc.content_hash,
    accepted_at: acceptedAt,
  }))

  const { error: insertError } = await supabase
    .from('terms_acceptance')
    .upsert(acceptanceRows)

  if (insertError) {
    return NextResponse.json(
      { error: insertError.message },
      { status: 500 }
    )
  }

  // Audit log
  await supabase.from('organisation_audit_events').insert(
    documents.map((doc) => ({
      organisation_id: organisationId,
      event_type: 'legal_document.accepted',
      actor_user_id: user.id,
      occurred_at: acceptedAt,
      metadata: {
        document_id: doc.id,
        version: doc.version,
      },
    }))
  )

  return NextResponse.json({ ok: true })
}
