// lib/legal/export-evidence-pdf.sections.ts

/**
 * ⚠️ GOLD STANDARD — DO NOT SIMPLIFY
 *
 * This renderer is intentionally verbose and defensive.
 * It guarantees:
 * - deterministic output
 * - bounded pagination
 * - sample vs full safety
 * - regulator-legible structure
 *
 * Any changes must preserve canonical behaviour.
 */


import PDFDocument from 'pdfkit'

type PDFKitDocument = InstanceType<typeof PDFDocument>

import type { EvidencePack } from './export-evidence'
import {
  asShortHash,
  callout,
  drawRow,
  drawTableHeader,
  ellipsize,
  ensureSpaceOrStop,
  hr,
  pageH1,
  safe,
  sectionTitle,
  setBody,
  setMuted,
  setTitle,
  toUtcDate,
  type TableCol,
} from './export-evidence-pdf.primitives'

export function renderCover(opts: {
  doc: PDFKitDocument
  pack: EvidencePack
  isSample: boolean
  brandMarkPath: string
}) {
  const { doc, pack, isSample, brandMarkPath } = opts

  try {
    doc.image(brandMarkPath, doc.page.margins.left, 44, { width: 26 })
  } catch {}

  doc.moveDown(2)
  setTitle(doc)
  doc.text(
    isSample
      ? 'AI Governance Evidence Pack — Sample (Redacted)'
      : 'AI Governance Evidence Pack'
  )

  doc.moveDown(0.6)
  setBody(doc)
  doc.text(
    isSample
      ? 'Public sample. Demonstrates structure and verification approach. Not client evidence.'
      : 'A cryptographically verifiable export of governance artefacts recorded by the Veriscopic platform.'
  )

  const organisationName = isSample ? 'Sample Organisation (Redacted)' : pack.organisation.name
  const organisationId = isSample ? '[REDACTED]' : pack.organisation.id

  doc.moveDown(1)
  sectionTitle(doc, 'Pack metadata')
  doc.text(`Organisation: ${organisationName}`)
  doc.text(`Organisation ID: ${organisationId}`)
  doc.text(`Generated (UTC): ${toUtcDate(pack.generated_at)}`)
  doc.text(`Evidence Pack Version: ${pack.evidence_pack_version}`)

  hr(doc)

  sectionTitle(doc, 'Integrity')
  doc.text(
    isSample
      ? 'This pack is cryptographically bound to a canonical evidence representation. Verification mechanics are intentionally limited in the public sample.'
      : 'This PDF is a rendered view of the canonical Evidence Pack JSON. Integrity is verified by recomputing the canonical SHA-256 hash and comparing it to the checksum printed in this PDF.'
  )
  doc.moveDown(0.4)
  doc.font('InterSemiBold').fillColor('#111827').text('Checksum', { continued: true })
  setBody(doc)
  doc.text(`  ${isSample ? asShortHash(pack.integrity.canonical_json_sha256) : pack.integrity.canonical_json_sha256}`)
}

export function renderExecutiveSummary(opts: {
  doc: PDFKitDocument
  isSample: boolean
}) {
  const { doc, isSample } = opts

  pageH1(doc, 'Executive Summary — What Regulators See')

  doc.text(
    'This Evidence Pack is a deterministic, cryptographically verifiable export of governance artefacts recorded by the Veriscopic platform.'
  )

  doc.moveDown(0.8)
  sectionTitle(doc, 'What this pack confirms')
  doc.list(
    [
      'Governance artefacts are recorded and exported in a verifiable form.',
      'Document acceptance evidence is version-bound and time-stamped (where present).',
      'Organisation audit events support accountability and traceability (where present).',
      'Exported evidence can be independently integrity-checked.',
    ],
    { bulletRadius: 2 }
  )

  doc.moveDown(0.6)
  sectionTitle(doc, 'What this pack does NOT claim')
  doc.list(
    [
      'It does not certify legal compliance.',
      'It does not provide legal advice.',
      'It does not determine EU AI Act risk classification.',
      'It does not assert technical model performance or safety claims.',
    ],
    { bulletRadius: 2 }
  )

  doc.moveDown(0.6)
  doc.text(
    isSample
      ? 'For authorised reviewers, verification can be performed via Veriscopic.'
      : 'Verification can be performed independently by hashing the canonical Evidence Pack JSON and comparing the SHA-256 checksum.'
  )
}

export function renderEvidenceIndex(opts: {
  doc: PDFKitDocument
  counts: { legalAcceptance: number; aiSystems: number; orgEvents: number; aiActMappings: number }
  completeness: string
}) {
  const { doc, counts, completeness } = opts

  pageH1(doc, 'Evidence Index')

  callout(doc, {
   title: 'Evidence coverage signal (non-legal, informational)',
    body: `Current signal: ${completeness}. This reflects whether key evidence categories are populated (document acceptance + AI system registry).`,
  })

  sectionTitle(doc, 'Included sections')

  const rows = [
    { name: 'Governance Snapshot', value: `${counts.orgEvents} org audit events` },
    { name: 'Legal Document Acceptance', value: `${counts.legalAcceptance} acceptance records` },
    { name: 'AI Systems Registry', value: `${counts.aiSystems} declared systems` },
    { name: 'EU AI Act Evidence Map', value: `${counts.aiActMappings} mapped expectations` },
    { name: 'Verification Appendix', value: 'Canonicalization + hashing notes' },
  ]

  for (const r of rows) {
    doc.font('InterSemiBold').fillColor('#111827').text(r.name, { continued: true })
    setBody(doc)
    doc.text(`  —  ${r.value}`)
  }
}

export function renderGovernanceSnapshot(opts: {
  doc: PDFKitDocument
  pack: EvidencePack
  isSample: boolean
  maxPages: number
}) {
  const { doc, pack, isSample, maxPages } = opts

  
  pageH1(doc, 'Governance Snapshot')

  const counts = pack.governance_snapshot.organisation_events.length

  sectionTitle(doc, 'Platform controls (recorded)')
  doc.text(`Ownership model: ${pack.governance_snapshot.ownership_model}`)
  doc.text(`Audit logging: ${pack.governance_snapshot.audit_logging}`)
  doc.text(`Organisation audit events captured: ${counts}`)

  doc.moveDown(0.8)
  sectionTitle(doc, 'Organisation audit events')

  if (counts === 0) {
    callout(doc, {
      title: 'No audit events recorded yet',
      body: 'This section populates as governance events occur (e.g., document publication, document acceptance, role changes, AI system updates).',
    })
    return
  }

  const x = doc.page.margins.left
  const cols: TableCol[] = [
    { label: 'Event', x, w: 260 },
    { label: 'Occurred (UTC)', x: x + 270, w: 150 },
    { label: 'Actor', x: x + 430, w: 110 },
  ]

  drawTableHeader(doc, cols)

  const maxEvents = isSample ? 10 : 25
  const events = pack.governance_snapshot.organisation_events.slice(-maxEvents)

  for (const e of events) {
    if (!ensureSpaceOrStop(doc, 18, maxPages)) break

    drawRow(doc, [
      { text: safe(e.event_type), x, w: 260 },
      { text: toUtcDate(e.occurred_at), x: x + 270, w: 150 },
      { text: e.actor_user_id ? asShortHash(e.actor_user_id, 6, 4) : '—', x: x + 430, w: 110 },
    ])
  }

  if (pack.governance_snapshot.organisation_events.length > maxEvents) {
    doc.moveDown(0.4)
    setMuted(doc)
    doc.text(`Showing latest ${maxEvents} events (of ${pack.governance_snapshot.organisation_events.length}).`)
    setBody(doc)
  }
}

export function renderLegalAcceptance(opts: {
  doc: PDFKitDocument
  pack: EvidencePack
  isSample: boolean
  maxPages: number
}) {
  const { doc, pack, isSample, maxPages } = opts

  // IMPORTANT: this section continues on the current page if space allows.
  // Do NOT auto-add a page here unless you're genuinely out of space.
  if (!ensureSpaceOrStop(doc, 80, maxPages)) return

  pageH1(doc, 'Legal Documents Accepted')

  const count = pack.legal_acceptance.length
  if (count === 0) {
    callout(doc, {
      title: 'No acceptance evidence recorded yet',
      body:
        'Acceptance evidence is generated when the organisation accepts the current platform documents. Once accepted, this section shows document name, version, timestamp (UTC), and content hash.',
    })
    return
  }

  const x = doc.page.margins.left
  const cols: TableCol[] = [
    { label: 'Document', x, w: 220 },
    { label: 'Version', x: x + 230, w: 60 },
    { label: 'Accepted (UTC)', x: x + 300, w: 120 },
    { label: 'Content hash', x: x + 430, w: 110 },
  ]

  drawTableHeader(doc, cols)

  const maxRows = isSample ? 6 : 20
  const rows = pack.legal_acceptance.slice(0, maxRows)

  for (const a of rows) {
    if (!ensureSpaceOrStop(doc, 18, maxPages)) break

    drawRow(doc, [
      { text: safe(a.document_name), x, w: 220 },
      { text: safe(a.version), x: x + 230, w: 60 },
      { text: toUtcDate(a.accepted_at), x: x + 300, w: 120 },
      {
        text: isSample ? asShortHash(a.content_hash) : ellipsize(a.content_hash, 24),
        x: x + 430,
        w: 110,
      },
    ])
  }

  if (pack.legal_acceptance.length > maxRows) {
    doc.moveDown(0.4)
    setMuted(doc)
    doc.text(`Showing ${maxRows} records. Full list is available in the Evidence Pack JSON export.`)
    setBody(doc)
  }
}

export function renderAiSystems(opts: {
  doc: PDFKitDocument
  pack: EvidencePack
  isSample: boolean
  maxPages: number
}) {
  const { doc, pack, isSample, maxPages } = opts


  pageH1(doc, 'AI Systems Registry')

  const count = pack.ai_systems.length
  if (count === 0) {
    callout(doc, {
      title: 'No AI systems declared yet',
      body:
        'This registry populates when the organisation registers AI systems used in its product or operations. It supports governance transparency and due diligence responses.',
    })
    return
  }

  const maxSystems = isSample ? 4 : 12
  const systems = pack.ai_systems.slice(0, maxSystems)

  for (const s of systems) {
    if (!ensureSpaceOrStop(doc, 120, maxPages)) break

    doc.font('InterSemiBold').fontSize(11).fillColor('#111827').text(safe(s.name))
    setBody(doc)
    doc.text(`Purpose: ${safe(s.purpose)}`)
    doc.text(`Lifecycle status: ${safe(s.lifecycle_status)}`)
    doc.text(`System owner: ${safe(s.system_owner, 'Not specified')}`)
    doc.text(`Last updated (UTC): ${toUtcDate(s.last_updated)}`)

    const cats = (s.data_categories ?? []).filter(Boolean)
    doc.text(`Data categories: ${cats.length ? cats.join(', ') : 'None declared'}`)

    doc.moveDown(0.6)
    hr(doc)
  }

  if (pack.ai_systems.length > maxSystems) {
    setMuted(doc)
    doc.text(`Showing ${maxSystems} systems. Full registry is available in the Evidence Pack JSON export.`)
    setBody(doc)
  }
}

export function renderAiActMap(opts: {
  doc: PDFKitDocument
  pack: EvidencePack
  isSample: boolean
  maxPages: number
}) {
  const { doc, pack, isSample, maxPages } = opts

  
  pageH1(doc, 'EU AI Act Evidence Map (Governance)')

  doc.text(
    'This section maps governance expectations to evidence categories included in the pack. It is informational and non-legal.'
  )
  doc.moveDown(0.8)

  const counts = {
    legalAcceptance: pack.legal_acceptance.length,
    aiSystems: pack.ai_systems.length,
    orgEvents: pack.governance_snapshot.organisation_events.length,
  }

  const evidenceStatus = (refs: string[]) => {
    const joined = refs.join(' ')
    if (joined.includes('legal_acceptance')) return counts.legalAcceptance > 0 ? 'Present' : 'Missing'
    if (joined.includes('ai_systems')) return counts.aiSystems > 0 ? 'Present' : 'Missing'
    if (joined.includes('organisation_events')) return counts.orgEvents > 0 ? 'Present' : 'Missing'
    return 'Listed'
  }

  const x = doc.page.margins.left
  const cols: TableCol[] = [
    { label: 'Article', x, w: 70 },
    { label: 'Expectation', x: x + 70, w: 220 },
    { label: 'Evidence ref', x: x + 300, w: 170 },
    { label: 'Status', x: x + 470, w: 70 },
  ]

  drawTableHeader(doc, cols)

  const maxMappings = isSample ? 4 : 12
  const mappings = pack.ai_act_mapping.slice(0, maxMappings)

  for (const m of mappings) {
    if (!ensureSpaceOrStop(doc, 18, maxPages)) break

    drawRow(doc, [
      { text: safe(m.article), x, w: 70 },
      { text: safe(m.expectation), x: x + 70, w: 220 },
      { text: m.evidence_refs.join(', '), x: x + 300, w: 170 },
      { text: evidenceStatus(m.evidence_refs), x: x + 470, w: 70 },
    ])
  }

  if (pack.ai_act_mapping.length > maxMappings) {
    doc.moveDown(0.4)
    setMuted(doc)
    doc.text(`Showing ${maxMappings} mappings. Full map is available in the Evidence Pack JSON export.`)
    setBody(doc)
  }
}

export function renderVerificationAppendix(opts: {
  doc: PDFKitDocument
  isSample: boolean
}) {
  const { doc, isSample } = opts


  pageH1(doc, 'Appendix: Verification (Integrity)')

  doc.text(
    isSample
      ? 'This sample provides a limited description of verification. Full verification instructions are available to authorised reviewers via Veriscopic.'
      : 'The integrity hash is computed over a canonicalized JSON representation of the Evidence Pack.'
  )

  doc.moveDown(0.8)
  sectionTitle(doc, 'Canonicalization rules')
  doc.list(
    [
      'Object keys sorted lexicographically.',
      'Array order preserved.',
      'JSON.stringify used with no whitespace.',
    ],
    { bulletRadius: 2 }
  )

  doc.moveDown(0.5)
  sectionTitle(doc, 'Fields excluded from hashing')
  doc.list(['integrity', 'signature (if present)'], { bulletRadius: 2 })

  doc.moveDown(0.5)
  setMuted(doc)
  doc.text('Any modification to included fields results in a different SHA-256 checksum.')
  setBody(doc)
}
