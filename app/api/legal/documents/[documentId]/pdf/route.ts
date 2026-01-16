// app/api/legal/documents/[documentId]/pdf/route.ts

import { NextResponse } from 'next/server'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { requireRole } from '@/lib/rbac/guards'
import { renderSimpleDocumentPdf } from '@/lib/legal/render-document-pdf'

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  { params }: { params: { documentId: string } }
) {
  const { documentId } = params

  const supabase = await supabaseServerRead()

  const { data, error } = await supabase
    .from('legal_documents')
    .select(`
      id,
      name,
      version,
      content,
      published_at,
      organisation_id
    `)
    .eq('id', documentId)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // ✅ RBAC: must belong to the org
  await requireRole(data.organisation_id, ['owner', 'admin', 'member'])

  const pdfBytes = await renderSimpleDocumentPdf({
    title: data.name,
    version: data.version,
    content: data.content,
    publishedAt: data.published_at,
  })

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${data.name}-v${data.version}.pdf"`,
      'Cache-Control': 'no-store',
    },
  })
}

