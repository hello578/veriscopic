import PDFDocument from "pdfkit"
import type { EvidencePack } from "../export-evidence"

type PDFKitDocument = InstanceType<typeof PDFDocument>

type Props = {
  doc: PDFKitDocument
  pack: EvidencePack
}

export function renderResponsibilitySummary({ doc, pack }: Props) {
  const map = pack.responsibility_map

  // Defensive: if no responsibilities, still render a calm statement
  const records = map?.records ?? []
  const count = map?.declared_count ?? records.length

  doc.font("InterSemiBold").fontSize(16).fillColor("#000")
  doc.text("Responsibility & Accountability Summary")

  doc.moveDown(0.6)

  doc.font("Inter").fontSize(11).fillColor("#000")
  doc.text(
    "This section summarises declared accountability under the organisation’s governance model. " +
      "Responsibilities are recorded as organisation-level declarations and fixed in time as evidence."
  )

  doc.moveDown()

  // High-level stats
  doc.font("InterSemiBold").fontSize(12)
  doc.text("Declared responsibilities")

  doc.moveDown(0.3)

  doc.font("Inter").fontSize(11)
  doc.text(`Total declared responsibilities: ${count}`)

  doc.moveDown()

  if (records.length === 0) {
    doc
      .font("Inter")
      .fontSize(11)
      .fillColor("#444")
      .text(
        "No responsibility declarations were present at the time this Evidence Pack was generated."
      )
    return
  }

  // Render each responsibility as a compact block (not a table)
  records.forEach((r, idx) => {
    doc.moveDown(0.6)

    doc.font("InterSemiBold").fontSize(11).fillColor("#000")
    doc.text(`Responsibility ${idx + 1}`)

    doc.moveDown(0.2)

    doc.font("Inter").fontSize(10.5).fillColor("#000")
    doc.text(`Accountable role: ${r.role}`)
    doc.text(`Decision surface: ${r.decision_surface}`)
    doc.text(`Evidence produced: ${r.evidence_type}`)
    doc.text(`Review trigger: ${r.review_trigger}`)
    doc.text(`Current status: ${r.status}`)

    if (r.declared_at) {
      doc.text(
        `Declared at: ${new Date(r.declared_at).toLocaleDateString()}`
      )
    }
  })

  doc.moveDown()

  // Closing governance statement
  doc
    .font("Inter")
    .fontSize(10)
    .fillColor("#555")
    .text(
      "Responsibility declarations are included in this Evidence Pack to support board oversight, " +
        "procurement review, and external assurance. They do not constitute legal advice or regulatory classification."
    )
}
