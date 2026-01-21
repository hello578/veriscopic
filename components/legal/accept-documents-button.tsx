
// components/legal/accept-documents-button.tsx
// components/legal/accept-documents-button.tsx

'use client'

import { useTransition } from 'react'
import { acceptCurrentPlatformDocuments } from '@/lib/legal/actions/accept-platform-documents'

export function AcceptDocumentsButton({
  organisationId,
}: {
  organisationId: string
}) {
  const [isPending, startTransition] = useTransition()

  function accept() {
    startTransition(async () => {
      await acceptCurrentPlatformDocuments(organisationId)
    })
  }

  return (
    <button
      onClick={accept}
      disabled={isPending}
      className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
    >
      {isPending ? 'Recording acceptance…' : 'Accept documents'}
    </button>
  )
}
