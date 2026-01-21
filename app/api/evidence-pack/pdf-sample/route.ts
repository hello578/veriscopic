// app/api/evidence-pack/pdf-sample/route.ts

import { NextResponse } from 'next/server'
import { exportEvidencePack } from '@/lib/legal/export-evidence'
import { renderEvidencePackPdf } from '@/lib/legal/export-evidence-pdf'

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

  // ⚠️ NO RBAC
  // ⚠️ NO feature gating
  // This is a PUBLIC SAMPLE

  const pack = await exportEvidencePack(organisationId)

  const pdfBytes = await renderEvidencePackPdf(pack, {
    mode: 'sample',
  })

return new Response(new Uint8Array(pdfBytes), {
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition':
      'inline; filename="veriscopic-evidence-pack-sample.pdf"',
    'Cache-Control': 'no-store',
  },
})
}
