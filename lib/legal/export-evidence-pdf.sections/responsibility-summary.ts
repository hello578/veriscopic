
// lib/legal/export-evidence-pdf.sections/responsibility-summary.ts
import type { EvidencePack } from '../export-evidence'
import type PDFDocument from 'pdfkit'

type PDFKitDocument = InstanceType<typeof PDFDocument>

export function renderResponsibilitySummary({
  doc,
  pack,
}: {
  doc: PDFKitDocument
  pack: EvidencePack
}) {
  const records = pack.responsibility_map?.records ?? []

  if (!records.length) {
    doc.fontSize(11).fillColor('#444')
    doc.text('No responsibility records have been declared.')
    return
  }

  doc
    .font('InterSemiBold')
    .fontSize(14)
    .fillColor('#000')
    .text('Declared Accountability & Responsibility')

  doc.moveDown(0.5)

  doc
    .font('Inter')
    .fontSize(10)
    .fillColor('#444')
    .text(
      'This section summarises declared accountability within the organisation’s governance model. ' +
        'Responsibility records define which roles are accountable for key governance decisions, ' +
        'the evidence expected to exist as a result, and when responsibilities must be reviewed. ' +
        'These records are declarative, organisation-scoped facts.'
    )

  doc.moveDown()

  for (const r of records) {
    doc
      .font('InterSemiBold')
      .fontSize(10)
      .fillColor('#000')
      .text(r.role)

    doc
      .font('Inter')
      .fontSize(9)
      .fillColor('#333')
      .text(`Decision surface: ${r.decision_surface}`)
    doc.text(`Evidence produced: ${r.evidence_type}`)
    doc.text(`Review trigger: ${r.review_trigger}`)
    doc.text(`Status: ${r.status}`)

    doc.moveDown(0.75)
  }
}
