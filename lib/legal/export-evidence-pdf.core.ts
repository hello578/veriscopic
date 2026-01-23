
// lib/legal/export-evidence-pdf.core.ts

import path from 'path'
import PDFDocument from 'pdfkit'
import { PDFDocument as PDFLibDocument } from 'pdf-lib'

type PDFKitDocument = InstanceType<typeof PDFDocument>

import type { EvidencePack } from './export-evidence'
import { applyFooters } from './export-evidence-pdf.primitives'

import {
  renderAiActMap,
  renderAiSystems,
  renderCover,
  renderEvidenceIndex,
  renderExecutiveSummary,
  renderGovernanceSnapshot,
  renderLegalAcceptance,
  renderVerificationAppendix,
} from './export-evidence-pdf.sections'

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

export async function renderEvidencePackPdfCore(
  pack: EvidencePack,
  options?: { mode?: 'full' | 'sample' }
): Promise<Buffer> {
  const isSample = options?.mode === 'sample'
  const SAMPLE_PAGES = 5

  const doc: PDFKitDocument = new PDFDocument({
    size: 'A4',
    margin: 54,
    bufferPages: true,
  })

  doc.registerFont('Inter', FONT_REGULAR)
  doc.registerFont('InterSemiBold', FONT_SEMIBOLD)
  doc.font('Inter')

  const chunks: Buffer[] = []
  const rendered = new Promise<Buffer>((resolve, reject) => {
    doc.on('data', (c) => chunks.push(c))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
  })

  const newPage = () => doc.addPage()

  const counts = {
    legalAcceptance: pack.legal_acceptance.length,
    aiSystems: pack.ai_systems.length,
    orgEvents: pack.governance_snapshot.organisation_events.length,
    aiActMappings: pack.ai_act_mapping.length,
  }

  const completeness =
    counts.legalAcceptance && counts.aiSystems
      ? 'Strong'
      : counts.legalAcceptance
      ? 'Developing'
      : 'Incomplete'

  // ------------------------------------------------------------------
  // Cover (STRICT EvidencePack — no derived fields injected)
  // ------------------------------------------------------------------
  renderCover({
    doc,
    pack,
    isSample,
    brandMarkPath: BRAND_MARK,
  })

  if (isSample) {
    newPage()
    renderExecutiveSummary({ doc, isSample })
    renderEvidenceIndex({ doc, counts, completeness })

    newPage()
    renderLegalAcceptance({ doc, pack, isSample, maxPages: SAMPLE_PAGES })

    newPage()
    renderAiSystems({ doc, pack, isSample, maxPages: SAMPLE_PAGES })

    newPage()
    renderAiActMap({ doc, pack, isSample, maxPages: SAMPLE_PAGES })
  } else {
    newPage()
    renderExecutiveSummary({ doc, isSample })

    newPage()
    renderEvidenceIndex({ doc, counts, completeness })

    newPage()
    renderGovernanceSnapshot({ doc, pack, isSample, maxPages: 8 })

    newPage()
    renderLegalAcceptance({ doc, pack, isSample, maxPages: 8 })

    newPage()
    renderAiSystems({ doc, pack, isSample, maxPages: 8 })

    newPage()
    renderAiActMap({ doc, pack, isSample, maxPages: 8 })

    newPage()
    renderVerificationAppendix({ doc, isSample })
  }

  applyFooters(doc, {
    generatedAt: pack.generated_at,
    hash: pack.integrity.canonical_json_sha256,
    isSample,
  })

  doc.end()

  const pdfBuffer = await rendered
  if (!isSample) return pdfBuffer

  // ------------------------------------------------------------------
  // Hard truncate sample
  // ------------------------------------------------------------------
  const src = await PDFLibDocument.load(pdfBuffer)
  const out = await PDFLibDocument.create()

  const pages = await out.copyPages(
    src,
    Array.from({ length: SAMPLE_PAGES }, (_, i) => i)
  )
  pages.forEach((p) => out.addPage(p))

  const finalBuffer = Buffer.from(await out.save())
  const finalDoc = await PDFLibDocument.load(finalBuffer)

  if (finalDoc.getPageCount() !== SAMPLE_PAGES) {
    throw new Error(
      `Sample PDF invariant violated — expected ${SAMPLE_PAGES}, got ${finalDoc.getPageCount()}`
    )
  }

  return finalBuffer
}
