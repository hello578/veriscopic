// lib/legal/render-document-pdf.ts

import 'server-only'

import path from 'path'
import PDFDocument from 'pdfkit'

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

const FONT_REGULAR = path.join(process.cwd(), 'public', 'fonts', 'Inter_18pt-Regular.ttf')
const FONT_SEMIBOLD = path.join(process.cwd(), 'public', 'fonts', 'Inter_18pt-SemiBold.ttf')

// -----------------------------------------------------------------------------

export async function renderSimpleDocumentPdf({
  title,
  version,
  content,
  publishedAt,
}: {
  title: string
  version: string
  content: string
  publishedAt?: string | null
}): Promise<Buffer> {
  const doc = new PDFDocument({
    margin: 50,
    autoFirstPage: true,
  })

  const chunks: Buffer[] = []

  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
  })

  // ── Fonts (safe fallback) ───────────────────────────
  let hasInter = false
  try {
    doc.registerFont('Inter', FONT_REGULAR)
    doc.registerFont('InterSemiBold', FONT_SEMIBOLD)
    hasInter = true
  } catch {
    hasInter = false
  }

  const fontRegular = hasInter ? 'Inter' : 'Helvetica'
  const fontBold = hasInter ? 'InterSemiBold' : 'Helvetica-Bold'

  // ── Header ──────────────────────────────────────────
  doc.fillColor('#000')
  doc.font(fontBold).fontSize(18).text(title)

  doc.moveDown(0.5)

  const published =
    publishedAt && !Number.isNaN(new Date(publishedAt).getTime())
      ? ` · Published ${new Date(publishedAt).toDateString()}`
      : ''

  doc
    .font(fontRegular)
    .fontSize(10)
    .fillColor('#555')
    .text(`Version ${version}${published}`)

  doc.moveDown()

  // ── Content ─────────────────────────────────────────
  doc.font(fontRegular).fontSize(11).fillColor('#000')

  // Preserve user-provided newlines; PDFKit respects \n in text
  doc.text(content ?? '', {
    align: 'left',
  })

  doc.end()
  return done
}
