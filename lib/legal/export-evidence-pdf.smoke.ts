// lib/legal/export-evidence-pdf.smoke.ts

import PDFDocument from 'pdfkit'
import path from 'path'

type PDFKitDocument = InstanceType<typeof PDFDocument>

/* -------------------------------------------------------------------------- */
/* Assets                                                                     */
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
/* Minimal PDF Renderer (Smoke Test)                                          */
/* -------------------------------------------------------------------------- */

export async function renderMinimalEvidencePdf(): Promise<Buffer> {
  const doc: PDFKitDocument = new PDFDocument({
    size: 'A4',
    margin: 54,
    bufferPages: true,
    info: {
      Title: 'Veriscopic PDF Smoke Test',
      Author: 'Veriscopic',
      Subject: 'PDF Rendering Validation',
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

  /* ---------------------------------------------------------------------- */
  /* PAGE CONTENT                                                           */
  /* ---------------------------------------------------------------------- */

  try {
    doc.image(BRAND_MARK, doc.page.margins.left, 44, { width: 26 })
  } catch {}

  doc.moveDown(2)

  doc.font('InterSemiBold')
    .fontSize(18)
    .fillColor('#111827')
    .text('Veriscopic PDF Smoke Test')

  doc.moveDown(0.6)

  doc.font('Inter')
    .fontSize(10)
    .fillColor('#374151')
    .text(
      'This is a one-page rendering test used to validate layout, fonts, spacing, footers, and TypeScript integration.'
    )

  doc.moveDown(1)

  doc.font('InterSemiBold')
    .fontSize(12)
    .text('What this confirms')

  doc.moveDown(0.4)

  doc.list(
    [
      'Fonts load correctly from disk',
      'Margins and spacing behave as expected',
      'No text overlay or pagination bugs',
      'Footer rendering is stable',
      'PDFKit + TypeScript wiring is correct',
    ],
    { bulletRadius: 2 }
  )

  doc.moveDown(1)

  doc.font('InterSemiBold').text('Build info')
  doc.font('Inter').text(`Generated: ${new Date().toISOString()}`)
  doc.text(`Node: ${process.version}`)

  /* ---------------------------------------------------------------------- */
  /* FOOTER (single page, deterministic)                                    */
  /* ---------------------------------------------------------------------- */

  const y = doc.page.height - doc.page.margins.bottom + 18

  doc.font('Inter')
    .fontSize(8)
    .fillColor('#6b7280')
    .text(
      'Veriscopic · PDF smoke test · Not evidence',
      doc.page.margins.left,
      y,
      {
        width:
          doc.page.width -
          doc.page.margins.left -
          doc.page.margins.right,
        align: 'center',
      }
    )

  /* ---------------------------------------------------------------------- */
  /* FINALISE                                                               */
  /* ---------------------------------------------------------------------- */

  doc.end()
  return done
}
