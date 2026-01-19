// app/api/onboarding/create-organisation/route.ts
import 'server-only'

import { NextResponse } from 'next/server'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { supabaseService } from '@/lib/supabase/server-service'

export async function POST(req: Request) {
  try {
    // ─────────────────────────────────────────────
    // 1️⃣ Parse + validate input
    // ─────────────────────────────────────────────
    const formData = await req.formData()
    const name = formData.get('name')?.toString().trim()

    if (!name) {
      return NextResponse.json(
        { error: 'Organisation name is required' },
        { status: 400 }
      )
    }

    // ─────────────────────────────────────────────
    // 2️⃣ Auth context (cookie-based, authoritative)
    // ─────────────────────────────────────────────
    const supabaseRead = await supabaseServerRead()
    const {
      data: { user },
      error: userErr,
    } = await supabaseRead.auth.getUser()

    if (userErr || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // ─────────────────────────────────────────────
    // 3️⃣ HARD GUARD: one OWNER per user (soft check)
    // ─────────────────────────────────────────────
    const { data: existingOwner, error: ownerErr } =
      await supabaseRead
        .from('organisation_members')
        .select('organisation_id')
        .eq('user_id', user.id)
        .eq('role_key', 'owner')
        .maybeSingle()

    if (ownerErr) {
      console.error('[create-organisation] owner lookup failed', ownerErr)
      return NextResponse.json(
        { error: 'Unable to verify organisation ownership' },
        { status: 500 }
      )
    }

    if (existingOwner) {
      return NextResponse.json(
        {
          error: 'Organisation already exists for this account',
          organisationId: existingOwner.organisation_id,
        },
        { status: 409 } // conflict (correct semantic)
      )
    }

    // ─────────────────────────────────────────────
    // 4️⃣ Service role for all writes
    // ─────────────────────────────────────────────
    const supabaseWrite = supabaseService()

    // ─────────────────────────────────────────────
    // 5️⃣ Create organisation
    // ─────────────────────────────────────────────
    const { data: organisation, error: orgErr } =
      await supabaseWrite
        .from('organisations')
        .insert({ name })
        .select('id')
        .single()

    if (orgErr || !organisation) {
      console.error('[create-organisation] org insert failed', orgErr)
      return NextResponse.json(
        { error: 'Failed to create organisation' },
        { status: 500 }
      )
    }

    // ─────────────────────────────────────────────
    // 6️⃣ Assign OWNER membership
    // (DB unique index enforces safety)
    // ─────────────────────────────────────────────
    const { error: memberErr } =
      await supabaseWrite
        .from('organisation_members')
        .insert({
          organisation_id: organisation.id,
          user_id: user.id,
          role_key: 'owner',
        })

    if (memberErr) {
      console.error('[create-organisation] membership failed', memberErr)
      return NextResponse.json(
        {
          error:
            'Organisation created but ownership assignment failed. Please contact support.',
        },
        { status: 500 }
      )
    }

    // ─────────────────────────────────────────────
    // 7️⃣ Immutable audit event (non-blocking)
    // ─────────────────────────────────────────────
    const userAgent = req.headers.get('user-agent')
    const forwardedFor = req.headers.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0]?.trim() ?? null

    const { error: auditErr } =
      await supabaseWrite
        .from('organisation_audit_events')
        .insert({
          organisation_id: organisation.id,
          event_type: 'organisation_created',
          actor_user_id: user.id,
          ip,
          user_agent: userAgent,
          metadata: {
            source: 'onboarding.create-organisation',
            ownership_rule: 'single-owner-per-user (db-enforced)',
          },
        })

    if (auditErr) {
      console.error('[create-organisation] audit event failed', auditErr)
      // intentionally non-blocking
    }

    // ─────────────────────────────────────────────
    // 8️⃣ Success
    // ─────────────────────────────────────────────
    return NextResponse.json(
      { organisationId: organisation.id },
      { status: 201 }
    )
  } catch (err) {
    console.error('[create-organisation] unexpected error', err)
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    )
  }
}
