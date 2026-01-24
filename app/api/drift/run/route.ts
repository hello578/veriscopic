
// app/api/drift/run/route.ts
// app/api/drift/run/route.ts

import { NextResponse } from 'next/server'
import { runDriftCheck } from '@/lib/legal/drift/run-drift-check'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)

  const organisationId = body?.organisationId

  if (!organisationId || typeof organisationId !== 'string') {
    return NextResponse.json(
      { error: 'Missing or invalid organisationId' },
      { status: 400 }
    )
  }

  try {
    const result = await runDriftCheck(organisationId)

    return NextResponse.json({
      ok: true,
      result,
    })
  } catch (err) {
    console.error('[drift/run] failed', err)

    return NextResponse.json(
      { error: 'Drift check failed' },
      { status: 500 }
    )
  }
}
