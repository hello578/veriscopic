// app/(org)/[organisationId]/dashboard/components/accept-documents-cta.tsx

'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { acceptCurrentPlatformDocuments } from '@/lib/legal/actions/accept-platform-documents'

export function AcceptDocumentsCTA({
  organisationId,
}: {
  organisationId: string
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="rounded border p-4">
      <p className="text-sm text-muted-foreground mb-3">
        Accept the current platform legal and governance documents on behalf of
        your organisation. Acceptance is recorded immutably for audit purposes.
      </p>

      <Button
        disabled={isPending}
        onClick={() =>
          startTransition(() => {
            acceptCurrentPlatformDocuments(organisationId)
          })
        }
      >
        {isPending ? 'Recording acceptance…' : 'Accept current documents'}
      </Button>
    </div>
  )
}
