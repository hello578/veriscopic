
// components/legal/accept-documents-button.tsx
'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { acceptCurrentPlatformDocuments } from '@/lib/legal/actions/accept-platform-documents'

export function AcceptDocumentsButton({
  organisationId,
  userId,
}: {
  organisationId: string
  userId: string
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <button
      onClick={() =>
        startTransition(async () => {
         await acceptCurrentPlatformDocuments(organisationId, userId)

          router.refresh()
        })
      }
      disabled={isPending}
      className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
    >
      {isPending ? 'Recording acceptance…' : 'Accept documents'}
    </button>
  )
}


