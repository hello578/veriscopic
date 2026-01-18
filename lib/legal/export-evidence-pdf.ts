
// lib/legal/export-evidence-pdf.ts

import 'server-only'

import path from 'path'
import PDFDocument from 'pdfkit'
import type { EvidencePack } from './export-evidence'

/**
 * Render an Evidence Pack PDF from the canonical EvidencePack.
 * The PDF is a VIEW only. The EvidencePack JSON remains the source of truth.
 */
export async function renderEvidencePackPdf(
  pack: EvidencePack
): Promise<Buffer> {
  const doc = new PDFDocument({
    margin: 54,
    size: 'A4',
    info: {
      Title: 'Veriscopic Evidence Pack',
      Author: 'Veriscopic',
      Subject: 'AI Governance Evidence Pack',
    },
  })

  const chunks: Buffer[] = []
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('data', (c: Buffer) => chunks.push(c))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
  })

  // ---------------------------------------------------------------------------
  // Canonical values (NO legacy fallbacks)
  // ---------------------------------------------------------------------------

  const organisationId = pack.organisation.id
  const organisationName = pack.organisation.name
  const generatedAt = pack.generated_at

  const checksumAlgorithm = pack.integrity.algorithm
  const checksumValue = pack.integrity.canonical_json_sha256

  const packVersion = pack.evidence_pack_version

  // ---------------------------------------------------------------------------
  // Assets
  // ---------------------------------------------------------------------------

  const brandMarkPath = path.join(
    process.cwd(),
    'public',
    'assets',
    'brand',
    'veriscopic-mark-mono.png'
  )

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const toUtcDate = (iso?: string) => {
    if (!iso) return 'Unknown'
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return `${d.toISOString().replace('T', ' ').replace('Z', ' UTC')}`
  }

  const ellipsize = (s: string, n: number) =>
    s.length > n ? `${s.slice(0, n - 1)}…` : s

  const hr = () => {
    const y = doc.y + 6
    doc
      .save()
      .moveTo(doc.page.margins.left, y)
      .lineTo(doc.page.width - doc.page.margins.right, y)
      .lineWidth(1)
      .strokeColor('#e5e7eb')
      .stroke()
      .restore()
    doc.moveDown(1.1)
  }

  const sectionTitle = (title: string) => {
    doc
      .fontSize(12)
      .fillColor('#111827')
      .font('Helvetica-Bold')
      .text(title)
    doc.moveDown(0.5)
  }

  const kvRow = (k: string, v: string) => {
    doc
      .fontSize(10)
      .fillColor('#111827')
      .font('Helvetica-Bold')
      .text(k, { continued: true })
      .font('Helvetica')
      .text(`  ${v}`)
  }

  const footer = () => {
    const page = doc.page
    const y = page.height - page.margins.bottom + 18
    doc.save()
    doc.fontSize(8).fillColor('#6b7280').font('Helvetica')
    doc.text(
      `Evidence Pack Hash: ${ellipsize(checksumValue, 56)}`,
      page.margins.left,
      y,
      { width: page.width - page.margins.left - page.margins.right }
    )
    doc.text(
      `Generated: ${toUtcDate(generatedAt)} · Veriscopic`,
      page.margins.left,
      y + 10,
      { width: page.width - page.margins.left - page.margins.right }
    )
    doc.restore()
  }

  doc.on('pageAdded', footer)

  // ---------------------------------------------------------------------------
  // COVER
  // ---------------------------------------------------------------------------

  try {
    doc.image(brandMarkPath, doc.page.margins.left, 44, { width: 24 })
  } catch {
    // optional asset
  }

  doc
    .fontSize(20)
    .fillColor('#111827')
    .font('Helvetica-Bold')
    .text('AI Governance Evidence Pack', doc.page.margins.left, 80)

  doc.moveDown(0.4)
  doc
    .fontSize(10)
    .fillColor('#374151')
    .font('Helvetica')
    .text(
      'A cryptographically bound export of governance evidence. This document does not constitute legal advice or a compliance opinion.'
    )

  doc.moveDown(1.2)
  kvRow('Organisation', organisationName)
  kvRow('Organisation ID', organisationId)
  kvRow('Generated at (UTC)', toUtcDate(generatedAt))
  kvRow('Evidence Pack Version', packVersion)

  doc.moveDown(1)
  hr()

  sectionTitle('Integrity')
  kvRow('Algorithm', checksumAlgorithm)
  kvRow('SHA-256', checksumValue)

  doc.moveDown(1)
  doc
    .fontSize(9)
    .fillColor('#374151')
    .font('Helvetica')
    .text(
      'Any alteration to the underlying evidence data invalidates the checksum above.'
    )

  footer()

  // ---------------------------------------------------------------------------
  // GOVERNANCE SNAPSHOT
  // ---------------------------------------------------------------------------

  doc.addPage()
  sectionTitle('Governance Snapshot')

  const gs = pack.governance_snapshot

  kvRow('Ownership model', gs.ownership_model)
  kvRow('Audit logging', gs.audit_logging)

  doc.moveDown(1)
  hr()

  sectionTitle('Recorded Organisation Events')

  if (!gs.organisation_events.length) {
    doc
      .fontSize(10)
      .fillColor('#374151')
      .font('Helvetica')
      .text('No organisation lifecycle events recorded.')
  } else {
    gs.organisation_events.forEach((e) => {
      doc
        .fontSize(10)
        .fillColor('#111827')
        .font('Helvetica')
        .text(`${e.event_type} · ${toUtcDate(e.occurred_at)}`)
    })
  }

  footer()

  // ---------------------------------------------------------------------------
  // LEGAL ACCEPTANCE
  // ---------------------------------------------------------------------------

  doc.addPage()
  sectionTitle('Legal Documents Accepted')

  const acceptances = pack.legal_acceptance

  if (!acceptances.length) {
    doc
      .fontSize(10)
      .fillColor('#374151')
      .font('Helvetica')
      .text('No legal acceptance evidence recorded at time of export.')
  } else {
    acceptances.forEach((a) => {
      doc
        .fontSize(10)
        .fillColor('#111827')
        .font('Helvetica-Bold')
        .text(a.document_name)

      doc
        .fontSize(9)
        .font('Helvetica')
        .text(
          `Version ${a.version} · ${toUtcDate(a.accepted_at)} · ${ellipsize(
            a.content_hash,
            48
          )}`
        )

      doc.moveDown(0.4)
    })
  }

  footer()

  // ---------------------------------------------------------------------------
  // AI SYSTEMS
  // ---------------------------------------------------------------------------

  doc.addPage()
  sectionTitle('AI Systems Registry')

  if (!pack.ai_systems.length) {
    doc
      .fontSize(10)
      .fillColor('#374151')
      .font('Helvetica')
      .text('No AI systems recorded.')
  } else {
    pack.ai_systems.forEach((s, i) => {
      doc
        .fontSize(11)
        .fillColor('#111827')
        .font('Helvetica-Bold')
        .text(`${i + 1}. ${s.name}`)

      doc.fontSize(9).font('Helvetica')
      kvRow('Purpose', s.purpose)
      kvRow('Lifecycle status', s.lifecycle_status)
      kvRow(
        'Data categories',
        s.data_categories.length
          ? s.data_categories.join(', ')
          : '—'
      )

      doc.moveDown(0.6)
      hr()
    })
  }

  footer()

  // ---------------------------------------------------------------------------
  // AI ACT MAPPING
  // ---------------------------------------------------------------------------

  doc.addPage()
  sectionTitle('AI Act Mapping (Declarative)')

  if (!pack.ai_act_mapping.length) {
    doc
      .fontSize(10)
      .fillColor('#374151')
      .font('Helvetica')
      .text('No AI Act mappings included in this export.')
  } else {
    pack.ai_act_mapping.forEach((m) => {
      doc
        .fontSize(10)
        .fillColor('#111827')
        .font('Helvetica-Bold')
        .text(m.article)

      doc
        .fontSize(9)
        .font('Helvetica')
        .text(`Expectation: ${m.expectation}`)
        .text(`Evidence refs: ${m.evidence_refs.join(', ')}`)

      doc.moveDown(0.6)
      hr()
    })
  }

  footer()

  // ---------------------------------------------------------------------------
  // FINALISE
  // ---------------------------------------------------------------------------

  doc.end()
  return done
}

