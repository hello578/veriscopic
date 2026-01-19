// lib/legal/export-evidence-pdf.ts
import 'server-only'

import path from 'path'
import PDFDocument from 'pdfkit'
import type { EvidencePack } from './export-evidence'

/* -------------------------------------------------------------------------- */
/* Assets */
/* -------------------------------------------------------------------------- */

const FONT_REGULAR = path.join(
  process.cwd(),
  'public/fonts/Inter_18pt-Regular.ttf'
)

const FONT_SEMIBOLD = path.join(
  process.cwd(),
  'public/fonts/Inter_18pt-SemiBold.ttf'
)

const BRAND_MARK = path.join(
  process.cwd(),
  'public/assets/brand/veriscopic-mark-mono.png'
)

/* -------------------------------------------------------------------------- */
/* Utilities */
/* -------------------------------------------------------------------------- */

function toUtcDate(iso?: string) {
  if (!iso) return 'Unknown'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toISOString().replace('T', ' ').replace('Z', ' UTC')
}

function ellipsize(s: string, n: number) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s
}

/* -------------------------------------------------------------------------- */
/* PDF Renderer */
/* -------------------------------------------------------------------------- */

export async function renderEvidencePackPdf(
  pack: EvidencePack
): Promise<Buffer> {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 54,
    bufferPages: true,
    info: {
      Title: 'Veriscopic Evidence Pack',
      Author: 'Veriscopic',
      Subject: 'AI Governance Evidence Pack',
    },
  })

  /* Fonts */
  doc.registerFont('Inter', FONT_REGULAR)
  doc.registerFont('InterSemiBold', FONT_SEMIBOLD)
  doc.font('Inter')

  const chunks: Buffer[] = []
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('data', (c: Buffer) => chunks.push(c))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
  })

  const organisationId = pack.organisation.id
  const organisationName = pack.organisation.name
  const generatedAt = pack.generated_at
  const checksumValue = pack.integrity.canonical_json_sha256
  const checksumAlgorithm = pack.integrity.algorithm
  const packVersion = pack.evidence_pack_version

  /* -------------------------------------------------------------------------- */
  /* Drawing helpers */
  /* -------------------------------------------------------------------------- */

  const hr = () => {
    const y = doc.y + 6
    doc
      .moveTo(doc.page.margins.left, y)
      .lineTo(doc.page.width - doc.page.margins.right, y)
      .lineWidth(1)
      .strokeColor('#e5e7eb')
      .stroke()
    doc.moveDown(1.2)
  }

  const h1 = (t: string) => {
    doc.font('InterSemiBold').fontSize(18).fillColor('#111827').text(t)
    doc.moveDown(0.6)
    doc.font('Inter').fontSize(10)
  }

  const h2 = (t: string) => {
    doc.font('InterSemiBold').fontSize(12).fillColor('#111827').text(t)
    doc.moveDown(0.5)
    doc.font('Inter').fontSize(10)
  }

  const p = (t: string) => {
    doc.font('Inter').fontSize(10).fillColor('#374151').text(t)
  }

  const small = (t: string) => {
    doc.font('Inter').fontSize(9).fillColor('#374151').text(t)
  }

  const kv = (k: string, v: string) => {
    doc.font('InterSemiBold').text(k, { continued: true })
    doc.font('Inter').text(`  ${v}`)
  }

  /* -------------------------------------------------------------------------- */
  /* Executive Summary */
  /* -------------------------------------------------------------------------- */

  const executiveSummaryPage = () => {
    doc.addPage()
    h1('Executive Summary – What Regulators See')

    p(
      'This Evidence Pack is a cryptographically verifiable export of governance artefacts recorded by the Veriscopic platform.'
    )

    doc.moveDown(0.8)
    h2('What this pack confirms')
    doc.list(
      [
        'Specific governance documents were accepted.',
        'Acceptances are version-bound and time-stamped.',
        'Governance events were recorded immutably.',
        'Exported data has not been altered.',
      ],
      { bulletRadius: 2 }
    )

    doc.moveDown(0.8)
    h2('What this pack does NOT claim')
    doc.list(
      [
        'It does not certify legal compliance.',
        'It does not provide legal advice.',
        'It does not assess EU AI Act risk classification.',
      ],
      { bulletRadius: 2 }
    )

    doc.moveDown(0.8)
    p(
      'Integrity is ensured via SHA-256 hashing of a canonicalized JSON export. Verification can be performed independently.'
    )
  }

  /* -------------------------------------------------------------------------- */
  /* Acceptance Table */
  /* -------------------------------------------------------------------------- */

  const drawAcceptanceTableHeader = () => {
    doc.font('InterSemiBold').fontSize(9).fillColor('#6b7280')

    const x = doc.page.margins.left
    const y = doc.y

    doc.text('Document', x, y, { width: 220 })
    doc.text('Version', x + 230, y, { width: 60 })
    doc.text('Accepted (UTC)', x + 300, y, { width: 120 })
    doc.text('Hash', x + 430, y, { width: 110 })

    doc.moveDown(0.6)
    hr()
  }

  /* -------------------------------------------------------------------------- */
  /* Integrity Appendix */
  /* -------------------------------------------------------------------------- */

  const integrityAppendixPage = () => {
    doc.addPage()
    h2('Appendix: Raw Integrity Details')

    p(
      'The integrity hash is computed over a canonicalized JSON representation of the Evidence Pack.'
    )

    doc.moveDown(0.6)
    h2('Canonicalization rules')
    doc.list(
      [
        'Object keys sorted lexicographically.',
        'Array order preserved.',
        'JSON.stringify used with no whitespace.',
      ],
      { bulletRadius: 2 }
    )

    doc.moveDown(0.6)
    h2('Fields excluded from hashing')
    doc.list(['integrity', 'signature (if present)'], { bulletRadius: 2 })

    small(
      'Any modification to included fields results in a different SHA-256 checksum.'
    )
  }

  /* -------------------------------------------------------------------------- */
  /* COVER */
  /* -------------------------------------------------------------------------- */

  try {
    doc.image(BRAND_MARK, doc.page.margins.left, 44, { width: 26 })
  } catch {}

  doc.moveDown(2)
  h1('AI Governance Evidence Pack')

  p(
    'A cryptographically bound export of governance evidence. This PDF is a rendered view of the canonical Evidence Pack JSON.'
  )

  doc.moveDown(1)
  kv('Organisation', organisationName)
  kv('Organisation ID', organisationId)
  kv('Generated (UTC)', toUtcDate(generatedAt))
  kv('Evidence Pack Version', packVersion)

  doc.moveDown(1)
  hr()
  h2('Integrity')
  kv('Algorithm', checksumAlgorithm)
  kv('SHA-256', checksumValue)

  executiveSummaryPage()

  /* -------------------------------------------------------------------------- */
  /* LEGAL ACCEPTANCE */
  /* -------------------------------------------------------------------------- */

  doc.addPage()
  h2('Legal Documents Accepted')

  if (!pack.legal_acceptance.length) {
    p('No legal acceptance evidence recorded.')
  } else {
    drawAcceptanceTableHeader()

    for (const a of pack.legal_acceptance) {
      const bottomLimit =
        doc.page.height - doc.page.margins.bottom - 60

      if (doc.y > bottomLimit) {
        doc.addPage()
        drawAcceptanceTableHeader()
      }

      const x = doc.page.margins.left
      const y = doc.y

      doc.font('Inter').fontSize(9).fillColor('#111827')
      doc.text(a.document_name, x, y, { width: 220 })
      doc.text(a.version ?? '—', x + 230, y, { width: 60 })
      doc.text(toUtcDate(a.accepted_at), x + 300, y, { width: 120 })
      doc.text(ellipsize(a.content_hash, 18), x + 430, y, { width: 110 })

      doc.moveDown(1)
    }
  }

  integrityAppendixPage()

  /* -------------------------------------------------------------------------- */
  /* Finalise */
  /* -------------------------------------------------------------------------- */

  doc.end()

  const range = doc.bufferedPageRange()
  const totalPages = range.count

  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i)
    const y = doc.page.height - doc.page.margins.bottom + 18

    doc.font('Inter').fontSize(8).fillColor('#6b7280')
    doc.text(
      `Evidence Pack Hash: ${ellipsize(checksumValue, 56)}`,
      doc.page.margins.left,
      y
    )
    doc.text(
      `Generated: ${toUtcDate(generatedAt)} · Page ${i + 1} of ${totalPages}`,
      doc.page.margins.left,
      y + 10
    )
  }

  return done
}

