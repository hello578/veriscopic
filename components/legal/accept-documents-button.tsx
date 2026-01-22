// components/legal/accept-documents-button.tsx
'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { acceptCurrentPlatformDocuments } from '@/lib/legal/actions/accept-platform-documents'

export function AcceptDocumentsButton({
  organisationId,
}: {
  organisationId: string
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await acceptCurrentPlatformDocuments(organisationId)
          router.refresh()
        })
      }
      className="text-sm font-medium text-indigo-600 hover:underline"
    >
      {isPending ? 'Recording acceptance…' : 'Accept documents'}
    </button>
  )
}


