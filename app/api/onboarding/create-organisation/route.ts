import { NextResponse } from 'next/server'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { supabaseService } from '@/lib/supabase/server-service'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const name = formData.get('name')?.toString().trim()

    if (!name) {
      return NextResponse.json(
        { error: 'Organisation name is required' },
        { status: 400 }
      )
    }

    // 🔐 Read auth context from cookie-based client
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

    // 🔑 Use service role for writes
    const supabaseWrite = supabaseService()

    // 1️⃣ Create organisation
    const { data: organisation, error: orgErr } = await supabaseWrite
      .from('organisations')
      .insert({ name })
      .select('id')
      .single()

    if (orgErr || !organisation) {
      return NextResponse.json(
        { error: orgErr?.message ?? 'Failed to create organisation' },
        { status: 500 }
      )
    }

    // 2️⃣ Assign creator as OWNER
    const { error: memberErr } = await supabaseWrite
      .from('organisation_members')
      .insert({
        organisation_id: organisation.id,
        user_id: user.id,
        role_key: 'owner',
      })

    if (memberErr) {
      return NextResponse.json(
        { error: memberErr.message },
        { status: 500 }
      )
    }

    // ✅ Success — MUST be valid JSON
    return NextResponse.json({
      organisationId: organisation.id,
    })
  } catch (err) {
    console.error('[create-organisation]', err)

    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    )
  }
}

