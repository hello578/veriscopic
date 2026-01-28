
// lib/legal/export-drift-appendix-pdf.ts
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

  // ---------------------------------------------------------------------------
  // Cover
  // ---------------------------------------------------------------------------
  doc
    .fontSize(20)
    .fillColor('black')
    .text('Governance Drift Appendix', { align: 'center' })
    .moveDown(1.5)

  doc
    .fontSize(11)
    .fillColor('black')
    .text(`Organisation ID: ${delta.organisation_id}`)
    .text(`Generated at: ${delta.generated_at}`)
    .moveDown(0.75)

  // --- Pack versioning (prominent, auditor-facing) ---------------------------
  doc
    .fontSize(11)
    .font('Helvetica-Bold')
    .text('Compared Evidence Packs')
    .moveDown(0.25)

  doc
    .font('Helvetica')
    .fontSize(10)
    .text(`From pack hash:`)
    .font('Courier')
    .text(delta.from_pack_hash)
    .moveDown(0.5)

  doc
    .font('Helvetica')
    .fontSize(10)
    .text(`To pack hash:`)
    .font('Courier')
    .text(delta.to_pack_hash)

  doc.moveDown(1.25)

  // --- Drift scope (NEW, explicit) --------------------------------------------
  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor('black')
    .text('Drift scope')
    .moveDown(0.25)

  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor('gray')
    .text(
      'Drift reports compare the two most recently sealed Evidence Packs. ' +
        'Governance changes made after the latest pack is generated are not reflected ' +
        'in this appendix and will appear in the next drift report when a new Evidence Pack is created.',
      { align: 'left' }
    )

  doc.moveDown(1.25)

  // --- Non-monitoring clarification ------------------------------------------
  doc
    .fontSize(10)
    .fillColor('gray')
    .text(
      'This appendix records detected differences between cryptographically sealed governance snapshots. ' +
        'It does not perform monitoring, surveillance, inference, or behavioural analysis.',
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
  doc.text(`Total changes detected: ${delta.drift_summary.drift_item_count}`)
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
        .fillColor('black')
        .text(`${i + 1}. ${item.summary}`)

      doc
        .fontSize(9)
        .fillColor('gray')
        .text(`Path: ${item.path}`)
        .text(`Change type: ${item.change_type}`)
        .text(`Severity: ${item.severity}`)

      doc.moveDown(0.75)
    })
  }

  // ---------------------------------------------------------------------------
  // Integrity
  // ---------------------------------------------------------------------------
  doc.addPage()
  doc.fontSize(12).fillColor('black').text('Integrity')
  doc.moveDown(0.5)

  doc.fontSize(10)
  doc.text(`Algorithm: ${delta.integrity.algorithm}`)
  doc.text('Canonical JSON SHA-256:')
  doc.font('Courier').text(delta.integrity.canonical_json_sha256)

  doc.end()

  await new Promise<void>((resolve) => doc.on('end', resolve))
  return new Uint8Array(Buffer.concat(chunks))
}
