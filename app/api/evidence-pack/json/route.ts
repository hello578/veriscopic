// app/api/evidence-pack/json/route.ts
import { NextResponse } from 'next/server'
import { exportEvidencePack } from '@/lib/legal/export-evidence'
import { requireRole } from '@/lib/rbac/guards'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const organisationId = searchParams.get('organisationId')

  if (!organisationId) {
    return NextResponse.json(
      { error: 'Missing organisationId' },
      { status: 400 }
    )
  }

  // RBAC: owner/admin only
  await requireRole(organisationId, ['owner', 'admin'])

  const pack = await exportEvidencePack(organisationId)

  return NextResponse.json(pack, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}
