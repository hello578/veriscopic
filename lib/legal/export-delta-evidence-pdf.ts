
// lib/legal/export-delta-evidence-pdf.ts

import 'server-only'

import PDFDocument from 'pdfkit'
import type { DeltaEvidencePack } from '@/lib/legal/export-delta-evidence'

type RenderDeltaPdfOptions = {
  mode?: 'appendix'
  maxItems?: number
}

function safeOneLine(v: unknown, maxLen = 120): string {
  if (v === null || v === undefined) return ''
  const s = typeof v === 'string' ? v : JSON.stringify(v)
  if (!s) return ''
  return s.length > maxLen ? `${s.slice(0, maxLen)}…` : s
}

export async function renderDeltaAppendixPdf(
  delta: DeltaEvidencePack,
  opts: RenderDeltaPdfOptions = {}
): Promise<Uint8Array> {
  const { maxItems = 50 } = opts

  const doc = new PDFDocument({
    size: 'A4',
    margin: 48,
    info: {
      Title: 'Veriscopic — Governance Drift Appendix',
      Author: 'Veriscopic',
    },
  })

  const chunks: Buffer[] = []
  doc.on('data', (c) => chunks.push(c))
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
  })

  // ---------------- Header ----------------
  doc.fontSize(18).text('Governance Drift Appendix', { align: 'left' })
  doc.moveDown(0.4)
  doc
    .fontSize(10)
    .fillColor('#334155')
    .text('This appendix is generated from cryptographically sealed governance snapshots.')
    .text('It may be reviewed independently as part of audit and procurement evidence.')
    .fillColor('black')

  doc.moveDown(1)

  // ---------------- Snapshot IDs ----------------
  doc.fontSize(12).text('Snapshot identifiers', { underline: false })
  doc.moveDown(0.5)
  doc.fontSize(10)
  doc.text(`Organisation: ${delta.organisation_id}`)
  doc.text(`Generated at: ${delta.generated_at}`)
  doc.text(`From pack hash: ${delta.from_pack_hash}`)
  doc.text(`To pack hash: ${delta.to_pack_hash}`)
  doc.text(`Delta hash (SHA-256): ${delta.integrity.canonical_json_sha256}`)

  doc.moveDown(1)

  // ---------------- Summary ----------------
  doc.fontSize(12).text('Drift summary')
  doc.moveDown(0.5)
  doc.fontSize(10)
  doc.text(`Drift detected: ${delta.drift_summary.has_drift ? 'Yes' : 'No'}`)
  doc.text(`Highest severity: ${delta.drift_summary.highest_severity ?? 'n/a'}`)
  doc.text(`Items: ${delta.drift_summary.drift_item_count}`)
  doc.text(`Material: ${delta.drift_summary.material_count}`)
  doc.text(`Informational: ${delta.drift_summary.informational_count}`)

  doc.moveDown(1)

  // ---------------- Items ----------------
  doc.fontSize(12).text('Itemised drift evidence')
  doc.moveDown(0.5)

  const items = delta.drift_items.slice(0, maxItems)

  if (items.length === 0) {
    doc.fontSize(10).text('No drift items recorded.')
  } else {
    for (let idx = 0; idx < items.length; idx++) {
      const it = items[idx]

      // Page break guard
      if (doc.y > 740) doc.addPage()

      const sev =
        it.severity === 'material'
          ? 'MATERIAL'
          : 'INFORMATIONAL'

      doc
        .fontSize(10)
        .fillColor('#0f172a')
        .text(`${idx + 1}. ${sev} — ${it.change_type.toUpperCase()}`)

      doc
        .fontSize(10)
        .fillColor('#334155')
        .text(`Path: ${it.path}`)

      doc
        .fontSize(10)
        .fillColor('#334155')
        .text(`Summary: ${it.summary}`)

      // Optional: show trimmed before/after (safe, not huge)
      const before = safeOneLine((it as any).before)
      const after = safeOneLine((it as any).after)

      if (before) doc.text(`Before: ${before}`)
      if (after) doc.text(`After: ${after}`)

      doc.moveDown(0.8)
      doc.fillColor('black')
    }

    if (delta.drift_items.length > maxItems) {
      doc
        .fontSize(9)
        .fillColor('#334155')
        .text(`Note: showing first ${maxItems} items of ${delta.drift_items.length}.`)
        .fillColor('black')
    }
  }

  doc.moveDown(1)

  // ---------------- Footer note ----------------
  doc
    .fontSize(9)
    .fillColor('#64748b')
    .text(
      'Note: Drift detection compares sealed governance snapshots. It does not monitor runtime AI behaviour or employee activity.',
      { align: 'left' }
    )

  doc.end()
  const pdf = await done
  return new Uint8Array(pdf)
}
