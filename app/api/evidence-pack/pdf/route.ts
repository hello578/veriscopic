// app/api/evidence-pack/pdf/route.ts
// app/api/evidence-pack/pdf/route.ts

import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/rbac/guards'
import { requireFeature } from '@/lib/compliance/require-feature'
import { exportEvidencePack } from '@/lib/legal/export-evidence'
import { renderEvidencePackPdf } from '@/lib/legal/export-evidence-pdf'

export const runtime = 'nodejs'

/**
 * Evidence Pack PDF export
 *
 * GUARANTEES:
 * - Owner/Admin only
 * - Feature-flag enforced (evidence_pack)
 * - Deterministic output from canonical JSON
 * - No mutation or side-effects
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const organisationId = searchParams.get('organisationId')

  if (!organisationId) {
    return NextResponse.json(
      { error: 'Missing organisationId' },
      { status: 400 }
    )
  }

  // ---------------------------------------------------------------------------
  // RBAC — strict: only owners/admins may export evidence
  // ---------------------------------------------------------------------------
  const roleResult = await requireRole(organisationId, ['owner', 'admin'])
  if (!roleResult.ok) {
    return NextResponse.json(
      { error: 'Unauthorised' },
      { status: 401 }
    )
  }

  // ---------------------------------------------------------------------------
  // Feature gate — Evidence Pack must be enabled
  // ---------------------------------------------------------------------------
  const enabled = await requireFeature(organisationId, 'evidence_pack')
  if (!enabled) {
    return NextResponse.json(
      {
        error: 'Evidence Pack export is not enabled for this organisation.',
        code: 'EVIDENCE_PACK_DISABLED',
      },
      { status: 403 }
    )
  }

  // ---------------------------------------------------------------------------
  // Canonical export (read-only, deterministic)
  // ---------------------------------------------------------------------------
  const pack = await exportEvidencePack(organisationId)

  const pdfBytes = await renderEvidencePackPdf(pack, {
    mode: 'full',
  })

  const buffer = Buffer.from(pdfBytes)
  const filename = `veriscopic-evidence-pack-${organisationId}.pdf`

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
