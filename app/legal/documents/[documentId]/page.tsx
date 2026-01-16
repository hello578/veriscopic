// app/legal/documents/[documentId]/page.tsx
// app/legal/documents/[documentId]/page.tsx

import { notFound, redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { requireMember } from '@/lib/rbac/guards'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'

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

  // We still need org context → derive from session
  const supabase = await supabaseServerRead()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) redirect('/auth/login')

  // Fetch organisation membership via RBAC
  // You already enforce org context upstream in dashboard navigation
  const { data: memberships } = await supabase
    .from('organisation_members')
    .select('organisation_id')
    .eq('user_id', session.user.id)
    .limit(1)

  const organisationId = memberships?.[0]?.organisation_id
  if (!organisationId) redirect('/onboarding/create-organisation')

  const result = await requireMember(organisationId)
  if (!result.ok) redirect('/')

  // Fetch document (platform-wide)
  const { data: document, error } = await supabase
    .from('legal_documents')
    .select(
      `
      id,
      name,
      version,
      content,
      content_hash,
      published_at,
      status,
      jurisdiction
    `
    )
    .eq('id', documentId)
    .single()

  if (error || !document) notFound()

  // Fetch acceptance events for org, then filter
  const acceptanceEvents = await getOrganisationAcceptanceEvents(organisationId)
  const acceptance = acceptanceEvents.find(
    (e) => e.document_id === document.id
  )

  const acceptedOn = formatDate(acceptance?.accepted_at)
  const acceptedDaysAgo = daysSince(acceptance?.accepted_at)

  const isAccepted = Boolean(acceptance)
  const isOutdated =
    isAccepted && acceptance?.content_hash !== document.content_hash

  return (
    <main className="py-10">
      <div className="mx-auto max-w-4xl px-6 space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-slate-900">
              {document.name}
            </h1>

            {document.status === 'active' && (
              <Badge className="bg-emerald-100 text-emerald-700">
                Active
              </Badge>
            )}
          </div>

          <p className="text-sm text-slate-600">
            Version {document.version}
            {document.jurisdiction && <> · {document.jurisdiction}</>}
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

                <p className="text-sm">
                  Accepted on <strong>{acceptedOn}</strong>
                  {acceptedDaysAgo !== null && (
                    <> · {acceptedDaysAgo} days ago</>
                  )}
                </p>

                {isOutdated && (
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
                    <div className="flex items-center gap-2 font-medium text-amber-900">
                      <AlertTriangle className="h-4 w-4" />
                      A newer version is available
                    </div>
                    <p className="mt-1 text-sm text-amber-800">
                      You accepted v{acceptance?.version}. Current version is
                      v{document.version}.
                    </p>
                    <p className="mt-1 text-xs text-amber-700">
                      Your previous acceptance remains recorded.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-slate-600">
                This document has not yet been accepted by your organisation.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Document text */}
        <Card>
          <CardHeader>
            <h2 className="text-sm font-semibold">Document text (read-only)</h2>
          </CardHeader>

          <Separator />

          <CardContent className="pt-4">
            <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-800">
              {document.content}
            </pre>
          </CardContent>
        </Card>

        <p className="text-xs text-slate-500">
          Acceptance records are immutable and audit-ready.
        </p>
      </div>
    </main>
  )
}


