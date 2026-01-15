// app/api/evidence-pack/pdf/route.ts


import { NextResponse } from 'next/server'
import { exportEvidencePack } from '@/lib/legal/export-evidence'
import { renderEvidencePackPdf } from '@/lib/legal/export-evidence-pdf'
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
  const pdfBytes = await renderEvidencePackPdf(pack)

  // ✅ Convert Uint8Array → Node Buffer (this is the key fix)
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



