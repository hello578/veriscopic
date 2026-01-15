'use client'

import { CheckCircle } from 'lucide-react'
import { verifyEvidencePack } from '@/lib/legal/verify-evidence-pack'
import type { EvidencePack } from '@/lib/legal/export-evidence'

export function ChecksumBadge({ pack }: { pack: EvidencePack }) {
  const result = verifyEvidencePack(pack)

  if (!result.ok) return null

  return (
    <div className="flex items-center gap-1 text-xs text-emerald-600">
      <CheckCircle className="h-3.5 w-3.5" />
      Checksum verified
    </div>
  )
}
