// app/api/evidence-pack/json/route.ts
import { NextResponse } from 'next/server'
import { exportEvidencePack } from '@/lib/legal/export-evidence'
import { requireRole } from '@/lib/rbac/guards'
import { requireFeature } from '@/lib/compliance/require-feature'

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

  // --- RBAC: owner/admin only
  await requireRole(organisationId, ['owner', 'admin'])

  // --- Feature gate: Evidence Pack
  const hasEvidencePack = await requireFeature(
    organisationId,
    'evidence_pack'
  )

  if (!hasEvidencePack) {
    return NextResponse.json(
      {
        error:
          'Evidence Pack export is not enabled for this organisation.',
      },
      { status: 403 }
    )
  }

  // --- Canonical export
  const pack = await exportEvidencePack(organisationId)

  return NextResponse.json(pack, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}
