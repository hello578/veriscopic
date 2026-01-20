// lib/legal/export-evidence-pdf.primitives.ts
import PDFDocument from 'pdfkit'

type PDFKitDocument = InstanceType<typeof PDFDocument>


export type TableCol = {
  label: string
  x: number
  w: number
  align?: 'left' | 'right' | 'center'
}

export function toUtcDate(iso?: string) {
  if (!iso) return 'Unknown'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toISOString().replace('T', ' ').replace('Z', ' UTC')
}

export function ellipsize(s: string, n: number) {
  return s.length > n ? `${s.slice(0, Math.max(0, n - 1))}…` : s
}

export function safe(s: string | null | undefined, fallback = '—') {
  if (!s) return fallback
  const t = String(s).trim()
  return t.length ? t : fallback
}

export function asShortHash(hash: string, left = 10, right = 6) {
  if (!hash) return '—'
  if (hash.length <= left + right + 3) return hash
  return `${hash.slice(0, left)}…${hash.slice(-right)}`
}

export function setBody(doc: PDFKitDocument) {
  doc.font('Inter').fontSize(10).fillColor('#374151')
}

export function setMuted(doc: PDFKitDocument) {
  doc.font('Inter').fontSize(9).fillColor('#6b7280')
}

export function setTitle(doc: PDFKitDocument) {
  doc.font('InterSemiBold').fontSize(16).fillColor('#111827')
}

export function setH2(doc: PDFKitDocument) {
  doc.font('InterSemiBold').fontSize(12).fillColor('#111827')
}

export function hr(doc: PDFKitDocument) {
  const y = doc.y + 6
  doc
    .moveTo(doc.page.margins.left, y)
    .lineTo(doc.page.width - doc.page.margins.right, y)
    .lineWidth(1)
    .strokeColor('#e5e7eb')
    .stroke()
  doc.moveDown(1.2)
}

export function pageH1(doc: PDFKitDocument, t: string) {
  setTitle(doc)
  doc.text(t)
  doc.moveDown(0.7)
  setBody(doc)
}

export function sectionTitle(doc: PDFKitDocument, t: string) {
  setH2(doc)
  doc.text(t)
  doc.moveDown(0.6)
  setBody(doc)
}

export function callout(
  doc: PDFKitDocument,
  opts: { title: string; body: string }
) {
  const x = doc.page.margins.left
  const w = doc.page.width - doc.page.margins.left - doc.page.margins.right
  const y = doc.y

  const pad = 10
  const boxH = 58

  doc
    .save()
    .roundedRect(x, y, w, boxH, 8)
    .fillColor('#f8fafc')
    .fill()
    .restore()

  doc
    .font('InterSemiBold')
    .fontSize(10)
    .fillColor('#111827')
    .text(opts.title, x + pad, y + pad, { width: w - pad * 2 })

  doc
    .font('Inter')
    .fontSize(9)
    .fillColor('#374151')
    .text(opts.body, x + pad, y + pad + 16, { width: w - pad * 2 })

  doc.moveDown(4)
  setBody(doc)
}

/**
 * Hard-safe page creation:
 * - If there is not enough space, add a page only if we haven't hit maxPages.
 * - Returns false if we cannot add a page (cap reached).
 */
export function ensureSpaceOrStop(
  doc: PDFKitDocument,
  needed: number,
  maxPages: number
): boolean {
  const bottom = doc.page.height - doc.page.margins.bottom - 70
  if (doc.y + needed <= bottom) return true

  const { count } = doc.bufferedPageRange()
  if (count >= maxPages) return false

  doc.addPage()
  return true
}

/** Table header with fixed column x/w. */
export function drawTableHeader(doc: PDFKitDocument, cols: TableCol[]) {
  doc.font('InterSemiBold').fontSize(9).fillColor('#6b7280')
  const y = doc.y
  for (const c of cols) {
    doc.text(c.label, c.x, y, { width: c.w, align: c.align ?? 'left' })
  }
  doc.moveDown(0.6)
  hr(doc)
  doc.font('Inter').fontSize(9).fillColor('#111827')
}

/**
 * Deterministic table row renderer.
 * This is the overlay fix. We capture y once and then advance doc.y by height.
 */
export function drawRow(
  doc: PDFKitDocument,
  cells: { text: string; x: number; w: number; align?: 'left' | 'right' | 'center' }[],
  height = 18
) {
  const y = doc.y
  for (const c of cells) {
    doc.text(c.text, c.x, y, { width: c.w, align: c.align ?? 'left' })
  }
  doc.y = y + height
}

/**
 * Apply footer & optional sample watermark.
 * IMPORTANT: no addPage calls here.
 */
export function applyFooters(
  doc: PDFKitDocument,
  opts: { generatedAt: string; hash: string; isSample: boolean }
) {
  const range = doc.bufferedPageRange()
  const totalPages = range.count

  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i)

    const y = doc.page.height - doc.page.margins.bottom + 18
    doc.font('Inter').fontSize(8).fillColor('#6b7280')

    if (opts.isSample) {
      doc
        .fillColor('#9ca3af')
        .text('Public sample — not client evidence', doc.page.margins.left, y, {
          width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
          align: 'center',
        })
      doc.fillColor('#6b7280')
    } else {
      doc.text(
        `Evidence Pack Hash: ${ellipsize(opts.hash, 56)}`,
        doc.page.margins.left,
        y
      )
    }

    doc.text(
      `Generated: ${toUtcDate(opts.generatedAt)} · Page ${i + 1} of ${totalPages}`,
      doc.page.margins.left,
      y + 10
    )
  }
}
