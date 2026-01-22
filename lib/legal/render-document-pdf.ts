// lib/legal/render-document-pdf.ts

import 'server-only'

import path from 'path'
import PDFDocument from 'pdfkit'

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

const FONT_REGULAR = path.join(
  process.cwd(),
  'public',
  'fonts',
  'Inter_18pt-Regular.ttf'
)

const FONT_SEMIBOLD = path.join(
  process.cwd(),
  'public',
  'fonts',
  'Inter_18pt-SemiBold.ttf'
)

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
  const doc = new PDFDocument({ margin: 50 })

  const chunks: Buffer[] = []

  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
  })

  // ── Fonts (with safe fallback) ───────────────────────────

  try {
    doc.registerFont('Inter', FONT_REGULAR)
    doc.registerFont('InterSemiBold', FONT_SEMIBOLD)
    doc.font('Inter')
  } catch {
    // Fallback to built-in font if files are missing
    doc.font('Helvetica')
  }

  // ── CONTENT ──────────────────────────────────────────────

  doc.fontSize(18).font('InterSemiBold').text(title)
  doc.moveDown(0.5)

  doc
    .fontSize(10)
    .fillColor('#555')
    .font('Inter')
    .text(
      `Version ${version}${
        publishedAt
          ? ` · Published ${new Date(publishedAt).toDateString()}`
          : ''
      }`
    )

  doc.moveDown()

  doc.fontSize(11).fillColor('#000').text(content)

  doc.end()

  return done
}

