// app/api/pdf-smoke/route.ts

import { renderMinimalEvidencePdf } from '@/lib/legal/export-evidence-pdf.smoke'

export async function GET() {
  const pdfBuffer = await renderMinimalEvidencePdf()

  // Convert Node Buffer → Uint8Array (valid BodyInit)
  const body = new Uint8Array(pdfBuffer)

  return new Response(body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="pdf-smoke-test.pdf"',
      'Cache-Control': 'no-store',
    },
  })
}

