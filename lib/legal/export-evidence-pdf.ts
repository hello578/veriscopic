// lib/legal/export-evidence-pdf.ts

import 'server-only'

import type { EvidencePack } from './export-evidence'
import { renderEvidencePackPdfCore } from './export-evidence-pdf.core'

export async function renderEvidencePackPdf(
  pack: EvidencePack,
  options?: { mode?: 'full' | 'sample' }
): Promise<Buffer> {
  return renderEvidencePackPdfCore(pack, options)
}
