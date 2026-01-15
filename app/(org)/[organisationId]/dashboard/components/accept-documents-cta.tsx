
// app/(org)/[organisationId]/dashboard/components/accept-documents-cta.tsx

'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { acceptCurrentPlatformDocuments } from '@/lib/legal/actions/accept-platform-documents'

export function AcceptDocumentsCTA({
  organisationId,
  acceptedOn,
  acceptedDocuments = [],
}: {
  organisationId: string
  acceptedOn?: string | null
  acceptedDocuments?: {
    name: string
    version: string
    accepted_at: string
    content_hash: string
  }[]
}) {
  const [isPending, startTransition] = useTransition()
  const [showDetails, setShowDetails] = useState(false)

  // ─────────────────────────────────────────────
  // Accepted state (final, immutable)
  // ─────────────────────────────────────────────
  if (acceptedOn) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 space-y-2">
        <div>
          <p className="text-sm font-medium text-emerald-900">
            Documents accepted
          </p>
          <p className="text-xs text-emerald-800 mt-1">
            Recorded on {acceptedOn} · Immutable audit record created
          </p>
        </div>

        <button
          onClick={() => setShowDetails((v) => !v)}
          className="text-xs font-medium text-slate-700 hover:underline"
        >
          {showDetails ? 'Hide accepted documents' : 'View accepted documents'}
        </button>

        {showDetails && (
          <div className="mt-2 rounded-md border border-slate-200 bg-white p-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Accepted documents
            </p>

            {acceptedDocuments.length === 0 && (
              <p className="text-xs text-slate-500">
                No document details available.
              </p>
            )}

            {acceptedDocuments.map((doc) => (
              <div key={doc.content_hash} className="text-sm">
                <p className="font-medium text-slate-900">
                  {doc.name} <span className="text-slate-500">v{doc.version}</span>
                </p>
                <p className="text-xs text-slate-600">
                  Accepted {new Date(doc.accepted_at).toLocaleDateString()}
                </p>
                <p className="text-xs text-slate-500">
                  Hash: {doc.content_hash.slice(0, 8)}…{doc.content_hash.slice(-6)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ─────────────────────────────────────────────
  // CTA state (owner / admin only)
  // ─────────────────────────────────────────────
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 space-y-3">
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-900">
          Accept current platform documents
        </p>
        <p className="text-xs text-slate-600 leading-relaxed">
          Acceptance is recorded immutably and provides evidence of
          acknowledgement for audit and governance purposes.
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
    </div>
  )
}




