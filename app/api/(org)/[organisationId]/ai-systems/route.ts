// app/api/(org)/[organisationId]/ai-systems/route.ts

import { NextResponse } from 'next/server'
import { requireMember } from '@/lib/rbac/guards'
import { supabaseServerWrite } from '@/lib/supabase/server-write'

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
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // --------------------------------------------------
  // Parse body
  // --------------------------------------------------
  let body: {
    name?: string
    purpose?: string
    system_owner?: string | null
    data_categories?: string[]
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    )
  }

  if (!body.name || !body.purpose) {
    return NextResponse.json(
      { error: '`name` and `purpose` are required' },
      { status: 400 }
    )
  }

  const now = new Date().toISOString()
  const supabase = await supabaseServerWrite()

  // --------------------------------------------------
  // Insert AI system
  // --------------------------------------------------
  const { data, error } = await supabase
  .from('ai_systems')
  .insert({
    organisation_id: organisationId,
    name: body.name,
    purpose: body.purpose,
    system_owner: body.system_owner ?? null,
    lifecycle_status: 'active',
    is_operational: false,
  })
  .select()
  .single()

if (error || !data) {
  console.error('[ai-systems POST]', error)
  return NextResponse.json(
    { error: 'Failed to create AI system' },
    { status: 500 }
  )
}

return NextResponse.json({ system: data })
}
