
// app/(org)/[organisationId]/dashboard/components/accept-documents-cta.tsx
// app/(org)/[organisationId]/dashboard/components/accept-documents-cta.tsx

'use client'

import { useMemo, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { acceptCurrentPlatformDocuments } from '@/lib/legal/actions/accept-platform-documents'

type AcceptedDocument = {
  name: string
  version: string
  accepted_at: string
  content_hash: string
}

export function AcceptDocumentsCTA({
  organisationId,
  acceptedOn,
  acceptedDocuments = [],
}: {
  organisationId: string
  acceptedOn?: string | null
  acceptedDocuments?: AcceptedDocument[]
}) {
  const [isPending, startTransition] = useTransition()
  const [showDetails, setShowDetails] = useState(false)

  const acceptedOnLabel = useMemo(() => {
    if (!acceptedOn) return null
    const d = new Date(acceptedOn)
    if (Number.isNaN(d.getTime())) return acceptedOn

    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }, [acceptedOn])

  /* ───────── Accepted (immutable) ───────── */

  if (acceptedOnLabel) {
    return (
      <section className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-emerald-900">
            Platform documents accepted
          </p>

          <p className="text-xs text-emerald-800">
            All current platform legal documents were accepted and recorded on{' '}
            <span className="font-medium">{acceptedOnLabel}</span>.
          </p>

          <p className="text-xs text-emerald-700">
            This record is immutable and forms part of your governance audit
            trail.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowDetails((v) => !v)}
          className="text-xs font-medium text-slate-700 hover:underline"
        >
          {showDetails ? 'Hide acceptance details' : 'View acceptance details'}
        </button>

        {showDetails && (
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Recorded documents
            </p>

            {acceptedDocuments.length === 0 && (
              <p className="text-xs text-slate-500">
                Acceptance has been recorded. Detailed document metadata will
                appear once document version linking is finalised.
              </p>
            )}

            {acceptedDocuments.map((doc) => (
              <div
                key={doc.content_hash}
                className="space-y-0.5 border-b border-slate-100 pb-2 last:border-b-0 last:pb-0"
              >
                <p className="text-sm font-medium text-slate-900">
                  {doc.name}{' '}
                  <span className="text-slate-500">
                    v{doc.version}
                  </span>
                </p>

                <p className="text-xs text-slate-600">
                  Accepted on{' '}
                  {new Date(doc.accepted_at).toLocaleString()}
                </p>

                <p className="text-xs font-mono text-slate-500">
                  Hash {doc.content_hash.slice(0, 10)}…
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    )
  }

  /* ───────── CTA (pre-acceptance) ───────── */

  return (
    <section className="rounded-xl border border-slate-200 bg-white px-5 py-5 space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-900">
          Accept current platform documents
        </p>

        <p className="text-xs text-slate-600 leading-relaxed">
          You must accept the current platform legal documents to complete
          governance setup. Acceptance is recorded immutably and provides
          auditable evidence of acknowledgement.
        </p>
      </div>

      <Button
        disabled={isPending}
        onClick={() =>
          startTransition(() => {
            acceptCurrentPlatformDocuments(organisationId)
          })
        }
      >
        {isPending ? 'Recording acceptance…' : 'Accept documents'}
      </Button>
    </section>
  )
}

