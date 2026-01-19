// lib/legal/render-document-pdf.ts
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

  // 🔒 Register fonts immediately
  doc.registerFont('Inter', FONT_REGULAR)
  doc.registerFont('InterSemiBold', FONT_SEMIBOLD)
  doc.font('Inter')

  const chunks: Buffer[] = []
  doc.on('data', (chunk: Buffer) => chunks.push(chunk))

  doc.font('InterSemiBold').fontSize(18).text(title)
  doc.moveDown(0.5)

  doc.font('Inter').fontSize(10).fillColor('#555')
    .text(
      `Version ${version}${
        publishedAt
          ? ` · Published ${new Date(publishedAt).toDateString()}`
          : ''
      }`
    )

  doc.moveDown()
  doc.fillColor('#000').fontSize(11).text(content)

  doc.end()
  return Buffer.concat(chunks)
}

