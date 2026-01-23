// app/api/evidence-pack/pdf-sample/route.ts

import { renderEvidencePackPdf } from '@/lib/legal/export-evidence-pdf'
import { exportEvidencePackSample } from '@/lib/legal/export-evidence-sample'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const pack = await exportEvidencePackSample()

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

