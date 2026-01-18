// app/api/evidence-pack/verify/route.ts

import { NextResponse } from 'next/server'
import { verifyEvidencePack } from '@/lib/legal/verify-evidence-pack'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = verifyEvidencePack(body)

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'no-store' },
      status: result.ok ? 200 : 400,
    })
  } catch {
    return NextResponse.json(
      { ok: false, reason: 'Invalid JSON payload' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
