
// lib/legal/render-minimal-evidence-pdf.ts

import PDFDocument from 'pdfkit'
import type * as PDFKit from 'pdfkit'
import path from 'path'
import type { EvidencePack } from './export-evidence'

const FONT_REGULAR = path.join(
  process.cwd(),
  'public/fonts/Inter_18pt-Regular.ttf'
)

export async function renderMinimalEvidencePdf(
  pack: EvidencePack
): Promise<Buffer> {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 54,
  })

  doc.registerFont('Inter', FONT_REGULAR)
  doc.font('Inter')

  const chunks: Buffer[] = []

  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('data', (c) => chunks.push(c))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
  })

  // ── CONTENT ──────────────────────────────────────────────

  doc
    .fontSize(18)
    .text('AI Governance Evidence Pack', { align: 'left' })

  doc.moveDown(0.8)

  doc
    .fontSize(10)
    .text('Minimal smoke-test renderer', { align: 'left' })

  doc.moveDown(1.2)

  doc.fontSize(11).text('Organisation')
  doc.fontSize(10).text(pack.organisation.name)

  doc.moveDown(0.6)

  doc.fontSize(11).text('Generated (UTC)')
  doc.fontSize(10).text(pack.generated_at)

  doc.moveDown(0.6)

  doc.fontSize(11).text('Evidence Pack Hash')
  doc.fontSize(9).text(pack.integrity.canonical_json_sha256)

  // ── FOOTER (same page, no buffering) ─────────────────────

  const footerY = doc.page.height - doc.page.margins.bottom + 10

  doc
    .fontSize(8)
    .fillColor('#6b7280')
    .text(
      'Smoke test PDF — layout + wiring validation only',
      doc.page.margins.left,
      footerY
    )

  doc.end()
  return done
}
