
// lib/legal/export-drift-appendix-pdf.ts
import 'server-only'
import PDFDocument from 'pdfkit'

import type { DeltaEvidencePack } from '@/lib/legal/export-delta-evidence'

export async function renderDriftAppendixPdf(
  delta: DeltaEvidencePack
): Promise<Uint8Array> {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
  })

  const chunks: Buffer[] = []
  doc.on('data', (c) => chunks.push(c))
  doc.on('end', () => {})

  // ---------------------------------------------------------------------------
  // Cover
  // ---------------------------------------------------------------------------
  doc
    .fontSize(20)
    .text('Governance Drift Appendix', { align: 'center' })
    .moveDown(1.5)

  doc
    .fontSize(11)
    .text(`Organisation ID: ${delta.organisation_id}`)
    .text(`Generated at: ${delta.generated_at}`)
    .text(`From pack hash: ${delta.from_pack_hash}`)
    .text(`To pack hash: ${delta.to_pack_hash}`)

  doc.moveDown(1.5)

  doc
    .fontSize(10)
    .fillColor('gray')
    .text(
      'This appendix records detected changes between two cryptographically sealed governance evidence packs. ' +
        'It does not perform monitoring, surveillance, or behavioural analysis.',
      { align: 'left' }
    )

  doc.addPage()

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------
  doc.fontSize(14).fillColor('black').text('Drift summary')
  doc.moveDown(0.5)

  doc.fontSize(10)
  doc.text(`Has drift: ${delta.drift_summary.has_drift ? 'Yes' : 'No'}`)
  doc.text(`Total changes: ${delta.drift_summary.drift_item_count}`)
  doc.text(`Material changes: ${delta.drift_summary.material_count}`)
  doc.text(`Informational changes: ${delta.drift_summary.informational_count}`)
  doc.text(
    `Highest severity: ${delta.drift_summary.highest_severity ?? 'None'}`
  )

  // ---------------------------------------------------------------------------
  // Items
  // ---------------------------------------------------------------------------
  if (delta.drift_items.length > 0) {
    doc.addPage()
    doc.fontSize(14).text('Detected changes')
    doc.moveDown(0.5)

    delta.drift_items.forEach((item, i) => {
      doc
        .fontSize(11)
        .text(`${i + 1}. ${item.summary}`, { continued: false })

      doc.fontSize(9).fillColor('gray')
      doc.text(`Path: ${item.path}`)
      doc.text(`Change type: ${item.change_type}`)
      doc.text(`Severity: ${item.severity}`)

      doc.moveDown(0.75)
      doc.fillColor('black')
    })
  }

  // ---------------------------------------------------------------------------
  // Integrity footer
  // ---------------------------------------------------------------------------
  doc.addPage()
  doc.fontSize(12).text('Integrity')
  doc.moveDown(0.5)

  doc.fontSize(10)
  doc.text(`Algorithm: ${delta.integrity.algorithm}`)
  doc.text(`Canonical JSON SHA-256:`)
  doc.font('Courier').text(delta.integrity.canonical_json_sha256)

  doc.end()

  await new Promise<void>((resolve) => doc.on('end', resolve))
  return new Uint8Array(Buffer.concat(chunks))
}
