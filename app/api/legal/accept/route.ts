
//app/api/legal/accept/route.ts

import { NextResponse } from 'next/server'
import { supabaseServerWrite } from '@/lib/supabase/server-write'


export async function POST(request: Request) {
  const supabase = await supabaseServerWrite()


  const { data: userData, error: userErr } = await supabase.auth.getUser()
  if (userErr) return new NextResponse(userErr.message, { status: 401 })

  const user = userData.user
  if (!user) return new NextResponse('Not authenticated', { status: 401 })

  const body = await request.json().catch(() => null)
  const documentIds: string[] = body?.documentIds

  if (!Array.isArray(documentIds) || documentIds.length === 0) {
    return new NextResponse('Missing documentIds', { status: 400 })
  }

  const userAgent = request.headers.get('user-agent') ?? null
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    null

  // Insert acceptance rows (append-only evidence)
  const rows = documentIds.map((document_id) => ({
    user_id: user.id,
    document_id,
    ip_address: ip,
    user_agent: userAgent,
  }))

  // Avoid duplicate insert errors if user refreshes:
  // We'll insert one by one and ignore unique constraint conflicts if you add the unique index.
  const { error } = await supabase.from('terms_acceptance').insert(rows)

  if (error) {
    return new NextResponse(error.message, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
