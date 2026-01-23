// lib/legal/render-minimal-evidence-pdf.ts

import 'server-only'

import PDFDocument from 'pdfkit'
import path from 'path'
import type { EvidencePack } from './export-evidence'

// -----------------------------------------------------------------------------
// Fonts (safe fallback)
// -----------------------------------------------------------------------------

const FONT_REGULAR = path.join(
  process.cwd(),
  'public',
  'fonts',
  'Inter_18pt-Regular.ttf'
)

export async function renderMinimalEvidencePdf(
  pack: EvidencePack
): Promise<Buffer> {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 54,
  })

  const chunks: Buffer[] = []
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('data', (c) => chunks.push(c))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
  })

  // ── Fonts (safe fallback) ───────────────────────────
  let hasInter = false
  try {
    doc.registerFont('Inter', FONT_REGULAR)
    hasInter = true
  } catch {
    hasInter = false
  }

  const fontRegular = hasInter ? 'Inter' : 'Helvetica'
  const fontBold = hasInter ? 'Inter' : 'Helvetica-Bold'

  doc.font(fontRegular).fillColor('#000')

  // ── CONTENT ──────────────────────────────────────────────

  doc.fontSize(18).font(fontBold).text('AI Governance Evidence Pack', {
    align: 'left',
  })

  doc.moveDown(0.8)

  doc.font(fontRegular).fontSize(10).fillColor('#111').text(
    'Minimal smoke-test renderer',
    { align: 'left' }
  )

  doc.moveDown(1.2)

  doc.font(fontBold).fontSize(11).fillColor('#000').text('Organisation')
  doc.font(fontRegular).fontSize(10).text(pack.organisation?.name ?? 'Unknown')

  doc.moveDown(0.6)

  doc.font(fontBold).fontSize(11).text('Generated (UTC)')
  doc.font(fontRegular).fontSize(10).text(pack.generated_at ?? '')

  doc.moveDown(0.6)

  doc.font(fontBold).fontSize(11).text('Evidence Pack Hash')
  doc
    .font(fontRegular)
    .fontSize(9)
    .text(pack.integrity?.canonical_json_sha256 ?? '')

  // ── FOOTER (same page, no buffering) ─────────────────────
  const footerY = doc.page.height - doc.page.margins.bottom + 10

  doc
    .font(fontRegular)
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

