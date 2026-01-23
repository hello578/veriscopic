
// app/api/(org)/[organisationId]/legal/documents/[documentId]/pdf/route.ts

import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import { requireMember } from '@/lib/rbac/guards'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { supabaseService } from '@/lib/supabase/server-service'
import { renderSimpleDocumentPdf } from '@/lib/legal/render-document-pdf'

export async function GET(
  _req: NextRequest,
  context: {
    params: Promise<{
      organisationId: string
      documentId: string
    }>
  }
) {
  const { organisationId, documentId } = await context.params

  // ── Auth / RBAC (deterministic)
  const membership = await requireMember(organisationId)
  if (!membership.ok) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }

  const supabase = await supabaseServerRead()
  const service = supabaseService()

  // ── Fetch immutable document
  const { data: doc, error } = await supabase
    .from('legal_documents')
    .select('id, name, version, content, content_hash, created_at')
    .eq('id', documentId)
    .single()

  if (error || !doc) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const objectPath = `${doc.id}/${doc.version}.pdf`

  // ── Check if PDF already exists
  const { data: existing } = await service.storage
    .from('legal-documents')
    .list(doc.id, { limit: 1 })

  const exists =
    (existing ?? []).some((f) => f.name === `${doc.version}.pdf`)

  // ── Generate once (immutable artefact)
  if (!exists) {
    const pdf = await renderSimpleDocumentPdf({
      title: doc.name,
      version: doc.version,
      content: doc.content,
      publishedAt: doc.created_at,
    })

    const { error: uploadErr } = await service.storage
      .from('legal-documents')
      .upload(objectPath, pdf, {
        contentType: 'application/pdf',
        upsert: false,
        cacheControl: '31536000',
        metadata: {
          content_hash: doc.content_hash,
        },
      })

    // Race-safe
    if (uploadErr && !uploadErr.message.includes('exists')) {
      return NextResponse.json(
        { error: 'PDF upload failed' },
        { status: 500 }
      )
    }
  }

  // ── Signed URL (short-lived)
  const { data: signed, error: signErr } = await service.storage
    .from('legal-documents')
    .createSignedUrl(objectPath, 60 * 10)

  if (signErr || !signed?.signedUrl) {
    return NextResponse.json(
      { error: 'Could not sign PDF' },
      { status: 500 }
    )
  }

  return NextResponse.redirect(signed.signedUrl, { status: 302 })
}


