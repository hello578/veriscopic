import 'server-only'

import path from 'path'
import PDFDocument from 'pdfkit'
import type { EvidencePack } from './export-evidence'

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

const FONT_REGULAR = path.join(
  process.cwd(),
  'public/fonts/Inter_18pt-Regular.ttf'
)

const FONT_SEMIBOLD = path.join(
  process.cwd(),
  'public/fonts/Inter_18pt-SemiBold.ttf'
)

// -----------------------------------------------------------------------------

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

  // Fonts (MUST be first)
  doc.registerFont('Inter', FONT_REGULAR)
  doc.registerFont('InterSemiBold', FONT_SEMIBOLD)
  doc.font('Inter')

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const toUtcDate = (iso?: string) =>
    iso ? new Date(iso).toISOString().replace('T', ' ').replace('Z', ' UTC') : '—'

  const ellipsize = (s: string, n: number) =>
    s.length > n ? `${s.slice(0, n - 1)}…` : s

  const hr = () => {
    const y = doc.y + 6
    doc
      .save()
      .moveTo(doc.page.margins.left, y)
      .lineTo(doc.page.width - doc.page.margins.right, y)
      .strokeColor('#e5e7eb')
      .stroke()
      .restore()
    doc.moveDown(1)
  }

  const sectionTitle = (title: string) => {
    doc.font('InterSemiBold').fontSize(12).fillColor('#111827').text(title)
    doc.moveDown(0.5)
  }

  const kvRow = (k: string, v: string) => {
    doc.font('InterSemiBold').fontSize(10).text(k, { continued: true })
    doc.font('Inter').text(`  ${v}`)
  }

  const footer = () => {
    const y = doc.page.height - doc.page.margins.bottom + 18
    doc.save()
    doc.font('Inter').fontSize(8).fillColor('#6b7280')
    doc.text(
      `Evidence Pack Hash: ${ellipsize(
        pack.integrity.canonical_json_sha256,
        56
      )}`,
      doc.page.margins.left,
      y
    )
    doc.text(
      `Generated: ${toUtcDate(pack.generated_at)} · Veriscopic`,
      doc.page.margins.left,
      y + 10
    )
    doc.restore()
  }

  // ---------------------------------------------------------------------------
  // COVER
  // ---------------------------------------------------------------------------

  doc.font('InterSemiBold').fontSize(20).text('AI Governance Evidence Pack')
  doc.moveDown(1)

  kvRow('Organisation', pack.organisation.name)
  kvRow('Organisation ID', pack.organisation.id)
  kvRow('Generated', toUtcDate(pack.generated_at))
  kvRow('Version', pack.evidence_pack_version)

  hr()
  sectionTitle('Integrity')
  kvRow('Algorithm', pack.integrity.algorithm)
  kvRow('SHA-256', pack.integrity.canonical_json_sha256)

  footer()

  // ---------------------------------------------------------------------------
  // GOVERNANCE SNAPSHOT
  // ---------------------------------------------------------------------------

  doc.addPage()
  sectionTitle('Governance Snapshot')

  kvRow('Ownership model', pack.governance_snapshot.ownership_model)
  kvRow('Audit logging', pack.governance_snapshot.audit_logging)

  hr()
  sectionTitle('Organisation Events')

  pack.governance_snapshot.organisation_events.forEach((e) =>
    doc
      .font('Inter')
      .fontSize(10)
      .text(`${e.event_type} · ${toUtcDate(e.occurred_at)}`)
  )

  footer()

  // ---------------------------------------------------------------------------
  // LEGAL ACCEPTANCE
  // ---------------------------------------------------------------------------

  doc.addPage()
  sectionTitle('Legal Documents Accepted')

  pack.legal_acceptance.forEach((a) => {
    doc.font('InterSemiBold').text(a.document_name)
    doc.font('Inter').fontSize(9).text(
      `Version ${a.version} · ${toUtcDate(a.accepted_at)} · ${ellipsize(
        a.content_hash,
        48
      )}`
    )
    doc.moveDown(0.5)
  })

  footer()

  // ---------------------------------------------------------------------------
  // AI SYSTEMS
  // ---------------------------------------------------------------------------

  doc.addPage()
  sectionTitle('AI Systems Registry')

  pack.ai_systems.forEach((s, i) => {
    doc.font('InterSemiBold').text(`${i + 1}. ${s.name}`)
    doc.font('Inter').fontSize(9)
    kvRow('Purpose', s.purpose)
    kvRow('Lifecycle', s.lifecycle_status)
    kvRow(
      'Data categories',
      s.data_categories.length ? s.data_categories.join(', ') : '—'
    )
    hr()
  })

  footer()

  // ---------------------------------------------------------------------------
  // AI ACT MAPPING
  // ---------------------------------------------------------------------------

  doc.addPage()
  sectionTitle('AI Act Mapping')

  pack.ai_act_mapping.forEach((m) => {
    doc.font('InterSemiBold').text(m.article)
    doc.font('Inter').fontSize(9)
    doc.text(m.expectation)
    doc.text(`Evidence: ${m.evidence_refs.join(', ')}`)
    hr()
  })

  footer()

  // Finalise
  doc.end()
  return done
}

