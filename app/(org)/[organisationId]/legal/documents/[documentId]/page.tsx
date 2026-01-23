// app/(org)/[organisationId]/legal/documents/[documentId]/page.tsx

import { redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { requireMember } from '@/lib/rbac/guards'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2 } from 'lucide-react'

import { AcceptDocumentsButton } from '@/components/legal/accept-documents-button'
import { getOrganisationAcceptanceEvents } from '@/lib/legal/read-acceptance'

type PageProps = {
  params: Promise<{
    organisationId: string
    documentId: string
  }>
}

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

function formatDate(iso?: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function LegalDocumentPage({ params }: PageProps) {
  const { organisationId, documentId } = await params

  // --- Auth / membership (gate access only)
  const membership = await requireMember(organisationId)
  if (!membership.ok) {
    redirect(membership.reason === 'unauthenticated' ? '/auth/login' : '/')
  }

  const supabase = await supabaseServerRead()

  // --- Fetch platform document (GLOBAL, not org-owned)
  const { data: document, error } = await supabase
  .from('legal_documents')
  .select(`
    id,
    name,
    version,
    content,
    content_hash,
    jurisdiction,
    created_at
  `)
  .eq('id', documentId)
  .single()

  // 🚨 DO NOT call notFound()
  if (!document) {
    return (
      <main className="py-12">
        <div className="mx-auto max-w-xl px-6">
          <h1 className="text-lg font-semibold text-slate-900">
            Document unavailable
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            This platform document could not be loaded. It may have been
            archived or removed.
          </p>
        </div>
      </main>
    )
  }



  // --- Acceptance state (exact hash)
  const acceptanceEvents = await getOrganisationAcceptanceEvents(organisationId)
  const acceptance = acceptanceEvents.find(
    (e) =>
      e.document_id === document.id &&
      e.content_hash === document.content_hash
  )

  const isAccepted = Boolean(acceptance)
  const acceptedOn = formatDate(acceptance?.accepted_at)

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <main className="py-10">
      <div className="mx-auto max-w-4xl px-6 space-y-8">
        {/* Header */}
        <header className="space-y-2">
  <h1 className="text-2xl font-semibold text-slate-900">
    {document.name}
  </h1>

  <p className="text-sm text-slate-600">
    Version {document.version}
    {document.jurisdiction ? <> · {document.jurisdiction}</> : null}
  </p>

  <p className="text-xs text-slate-500">
    Platform-issued document. Accepted versions are cryptographically
    bound and immutable.
  </p>
</header>

        {/* Actions */}
        <a
          href={`/api/${organisationId}/legal/documents/${document.id}/pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-600 underline hover:text-slate-900"
        >
          Download PDF
        </a>

        {/* Acceptance status */}
        <Card>
          <CardHeader>
            <h2 className="text-sm font-semibold">
              Acceptance status (this organisation)
            </h2>
          </CardHeader>

          <CardContent className="space-y-3">
            {isAccepted ? (
              <>
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Accepted
                </div>
                <p className="text-sm text-slate-700">
                  Accepted on <strong>{acceptedOn}</strong>
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-600">
                  This document has not yet been accepted by your organisation.
                </p>
                <AcceptDocumentsButton organisationId={organisationId} />
              </>
            )}
          </CardContent>
        </Card>

        {/* Document text */}
        <Card>
          <CardHeader>
            <h2 className="text-sm font-semibold">
              Document text (read-only)
            </h2>
          </CardHeader>

          <Separator />

          <CardContent className="pt-4 space-y-4">
            <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-800">
              {document.content}
            </pre>

            <div className="text-xs text-slate-500 space-y-1">
              <p>Content hash (SHA-256):</p>
              <p className="font-mono break-all">
                {document.content_hash}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
