
// app/(org)/[organisationId]/dashboard/components/accept-documents-cta.tsx

'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { acceptCurrentPlatformDocuments } from '@/lib/legal/actions/accept-platform-documents'

export function AcceptDocumentsCTA({
  organisationId,
  acceptedOn,
}: {
  organisationId: string
  acceptedOn?: string | null
}) {
  const [isPending, startTransition] = useTransition()

  // ─────────────────────────────────────────────
  // Accepted state (final, immutable)
  // ─────────────────────────────────────────────
  if (acceptedOn) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
        <p className="text-sm font-medium text-emerald-900">
          Documents accepted
        </p>
        <p className="text-xs text-emerald-800 mt-1">
          Recorded on {acceptedOn} · Immutable audit record created
        </p>
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



