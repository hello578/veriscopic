// lib/legal/export-evidence-pdf.core.ts
import path from 'path'
import PDFDocument from 'pdfkit'

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

/* -------------------------------------------------------------------------- */
/* Assets                                                                     */
/* -------------------------------------------------------------------------- */

const FONT_REGULAR = path.join(process.cwd(), 'public/fonts/Inter_18pt-Regular.ttf')
const FONT_SEMIBOLD = path.join(process.cwd(), 'public/fonts/Inter_18pt-SemiBold.ttf')
const BRAND_MARK = path.join(process.cwd(), 'public/assets/brand/veriscopic-mark-mono.png')

/* -------------------------------------------------------------------------- */
/* Renderer                                                                   */
/* -------------------------------------------------------------------------- */

export async function renderEvidencePackPdfCore(
  pack: EvidencePack,
  options?: { mode?: 'full' | 'sample' }
): Promise<Buffer> {
  const mode = options?.mode ?? 'full'
  const isSample = mode === 'sample'
  const MAX_PAGES = isSample ? 5 : 8

  const doc: PDFKitDocument = new PDFDocument({
    size: 'A4',
    margin: 54,
    bufferPages: true,
    info: {
      Title: isSample ? 'Veriscopic Evidence Pack — Sample (Redacted)' : 'Veriscopic Evidence Pack',
      Author: 'Veriscopic',
      Subject: 'AI Governance Evidence Pack',
    },
  })

  doc.registerFont('Inter', FONT_REGULAR)
  doc.registerFont('InterSemiBold', FONT_SEMIBOLD)
  doc.font('Inter')

  const chunks: Buffer[] = []
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('data', (c: Buffer) => chunks.push(c))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
  })

  const counts = {
    legalAcceptance: pack.legal_acceptance.length,
    aiSystems: pack.ai_systems.length,
    orgEvents: pack.governance_snapshot.organisation_events.length,
    aiActMappings: pack.ai_act_mapping.length,
  }

  const completeness =
    counts.legalAcceptance > 0 && counts.aiSystems > 0
      ? 'Strong'
      : counts.legalAcceptance > 0
        ? 'Developing'
        : 'Incomplete'

  // 1) Cover (page 1)
  renderCover({ doc, pack, isSample, brandMarkPath: BRAND_MARK })

  // 2) Summary / index / sections
  // Hard page cap: if we’re already at cap, we skip remaining sections.
  const canAddMorePages = () => doc.bufferedPageRange().count < MAX_PAGES

  if (canAddMorePages()) renderExecutiveSummary({ doc, isSample })
  if (canAddMorePages()) renderEvidenceIndex({ doc, counts, completeness })
  if (canAddMorePages()) renderGovernanceSnapshot({ doc, pack, isSample, maxPages: MAX_PAGES })

  // Legal Acceptance continues on the current page (no forced addPage inside)
  if (doc.bufferedPageRange().count <= MAX_PAGES) {
    renderLegalAcceptance({ doc, pack, isSample, maxPages: MAX_PAGES })
  }

  if (canAddMorePages()) renderAiSystems({ doc, pack, isSample, maxPages: MAX_PAGES })
  if (canAddMorePages()) renderAiActMap({ doc, pack, isSample, maxPages: MAX_PAGES })
  if (canAddMorePages()) renderVerificationAppendix({ doc, isSample })

  // 3) Footer + watermark (MUST be last, MUST NOT add pages)
  applyFooters(doc, {
    generatedAt: pack.generated_at,
    hash: pack.integrity.canonical_json_sha256,
    isSample,
  })

  doc.end()
  return done
}
