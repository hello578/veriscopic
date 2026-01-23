// components/ai/ai-systems-table.tsx

// components/ai/ai-systems-table.tsx
'use client'

import { Switch } from '@/components/ui/switch'

export type AISystemRow = {
  id: string
  name: string
  purpose: string
  lifecycle_status: string
  system_owner: string | null
  is_operational: boolean
  updated_at: string
}

type Props = {
  organisationId: string
  systems: AISystemRow[]
  onToggle: (id: string, is_operational: boolean) => void
}

export function AISystemsTable({
  organisationId,
  systems,
  onToggle,
}: Props) {
  async function toggleSystem(
    id: string,
    next: boolean
  ) {
    // Optimistic UI already handled by parent
    await fetch(
      `/api/${organisationId}/ai-systems/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_operational: next }),
      }
    )
  }

  return (
    <div className="rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-left">Purpose</th>
            <th className="px-3 py-2 text-left">Lifecycle</th>
            <th className="px-3 py-2 text-left">Operational</th>
            <th className="px-3 py-2 text-left">Owner</th>
          </tr>
        </thead>

        <tbody>
          {systems.filter(Boolean).map((s) => (

            <tr
              key={s.id}
              className="border-t"
            >
              <td className="px-3 py-2 font-medium">
                {s.name}
              </td>
              <td className="px-3 py-2 text-slate-600">
                {s.purpose}
              </td>
              <td className="px-3 py-2">
                {s.lifecycle_status}
              </td>
              <td className="px-3 py-2">
                <Switch
                  checked={s.is_operational}
                  onCheckedChange={(v) => {
                    onToggle(s.id, v)
                    toggleSystem(s.id, v)
                  }}
                />
              </td>
              <td className="px-3 py-2 text-slate-600">
                {s.system_owner ?? '—'}
              </td>
            </tr>
          ))}

          {systems.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-3 py-6 text-center text-slate-500"
              >
                No AI systems registered
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
