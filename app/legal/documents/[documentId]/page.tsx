
// app/legal/documents/[documentId]/page.tsx 


import { notFound, redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { requireMember } from '@/lib/rbac/guards'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2 } from 'lucide-react'

import { AcceptDocumentsButton } from '@/components/legal/accept-documents-button'
import { getOrganisationAcceptanceEvents } from '@/lib/legal/read-acceptance'

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

function daysSince(iso?: string | null) {
  if (!iso) return null
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return null
  const now = Date.now()
  return Math.floor((now - then) / (1000 * 60 * 60 * 24))
}
export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ documentId: string }>
}) {
  const { documentId } = await params


  const supabase = await supabaseServerRead()

  // Auth
  const { data: userRes } = await supabase.auth.getUser()
const user = userRes?.user
if (!user) redirect('/auth/login')


  // Organisation context (first membership is enough for MVP)
  const { data: memberships, error: membershipErr } = await supabase
    .from('organisation_members')
    .select('organisation_id')
    .limit(1)

  if (membershipErr) redirect('/')
  const organisationId = memberships?.[0]?.organisation_id
  if (!organisationId) redirect('/onboarding/create-organisation')

  const membership = await requireMember(organisationId)
  if (!membership.ok) redirect('/')

  // Fetch doc (single immutable version row)
  const { data: document, error } = await supabase
    .from('legal_documents')
    .select(
      `
      id,
      name,
      version,
      content,
      content_hash,
      jurisdiction,
      legal_documents_current (
        status
      )
    `
    )
    .eq('id', documentId)
    .single()

  if (error || !document) notFound()

  const status =
  document.legal_documents_current?.[0]?.status ?? 'archived'


  // Acceptance state for *this exact version*
  const acceptanceEvents = await getOrganisationAcceptanceEvents(organisationId)
  const acceptance = acceptanceEvents.find(
  (e) =>
    e.document_id === document.id &&
    e.content_hash === document.content_hash
)


  const isAccepted = Boolean(acceptance)
  const acceptedOn = formatDate(acceptance?.accepted_at)
  const acceptedDaysAgo = daysSince(acceptance?.accepted_at)

  return (
    <main className="py-10">
      <div className="mx-auto max-w-4xl px-6 space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-slate-900">
              {document.name}
            </h1>

            <Badge variant="secondary">{status}</Badge>
          </div>

          <p className="text-sm text-slate-600">
            Version {document.version}
            {document.jurisdiction ? <> · {document.jurisdiction}</> : null}
          </p>

          <p className="text-xs text-slate-500">
            Platform-issued document. Accepted versions are cryptographically bound and immutable.
          </p>
        </header>

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
                  {acceptedDaysAgo !== null ? <> · {acceptedDaysAgo} days ago</> : null}
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
            <h2 className="text-sm font-semibold">Document text (read-only)</h2>
          </CardHeader>

          <Separator />

          <CardContent className="pt-4 space-y-4">
            <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-800">
              {document.content}
            </pre>

            <div className="text-xs text-slate-500 space-y-1">
              <p>Content hash (SHA-256):</p>
              <p className="font-mono break-all">{document.content_hash}</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-slate-500">
          Acceptance records are immutable and audit-ready.
        </p>
      </div>
    </main>
  )
}

