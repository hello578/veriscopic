
// components/ai/ai-systems-client.tsx

'use client'

import { useState } from 'react'
import { AISystemsTable } from './ai-systems-table'
import { RegisterAISystemModal } from './register-ai-system-modal'

export type AISystemRow = {
  id: string
  name: string
  purpose: string
  lifecycle_status: string
  system_owner: string | null
  is_operational: boolean
  updated_at: string
}

export function AISystemsClient({
  organisationId,
  initialSystems,
}: {
  organisationId: string
  initialSystems: AISystemRow[]
}) {
  const [systems, setSystems] = useState<AISystemRow[]>(initialSystems)

  return (
    <>
      <RegisterAISystemModal
        organisationId={organisationId}
        onCreated={(newSystem: AISystemRow) =>
          setSystems((prev) => [...prev, newSystem])
        }
      />

      <AISystemsTable
        organisationId={organisationId}
        systems={systems}
        onToggle={(id: string, is_operational: boolean) =>
          setSystems((prev) =>
            prev.map((s) =>
              s.id === id ? { ...s, is_operational } : s
            )
          )
        }
      />
    </>
  )
}

