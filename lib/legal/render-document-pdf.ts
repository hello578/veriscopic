// lib/legal/render-document-pdf.ts

import PDFDocument from 'pdfkit'

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

  doc.on('data', (chunk: Buffer) => {
    chunks.push(chunk)
  })

  doc.on('end', () => {})

  doc.fontSize(18).text(title)
  doc.moveDown(0.5)

  doc
    .fontSize(10)
    .fillColor('#555')
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

