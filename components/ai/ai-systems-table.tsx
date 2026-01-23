// components/ai/ai-systems-table.tsx

'use client'

import { useState } from 'react'

import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type AISystem = {
  id: string
  name: string
  purpose: string
  lifecycle_status: string
  system_owner: string | null
  is_operational: boolean
}

interface Props {
  organisationId: string
  systems: AISystem[]
}

export function AISystemsTable({ organisationId, systems }: Props) {
  const [rows, setRows] = useState(systems)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  async function updateOperational(
    systemId: string,
    isOperational: boolean
  ) {
    setUpdatingId(systemId)

    // Optimistic UI
    setRows((prev) =>
      prev.map((s) =>
        s.id === systemId
          ? { ...s, is_operational: isOperational }
          : s
      )
    )

    try {
      await fetch(
        `/api/${organisationId}/ai-systems/${systemId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ is_operational: isOperational }),
        }
      )
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="rounded-md border border-slate-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Lifecycle</TableHead>
            <TableHead className="text-center">
              Operational
            </TableHead>
            <TableHead>Owner</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((system) => (
            <TableRow key={system.id}>
              <TableCell className="font-medium">
                {system.name}
              </TableCell>

              <TableCell className="text-sm text-slate-600">
                {system.purpose}
              </TableCell>

              <TableCell className="text-sm">
                {system.lifecycle_status}
              </TableCell>

              <TableCell className="text-center">
                <Switch
                  checked={system.is_operational}
                  disabled={updatingId === system.id}
                  onCheckedChange={(v) =>
                    updateOperational(system.id, v)
                  }
                />
              </TableCell>

              <TableCell className="text-sm text-slate-600">
                {system.system_owner ?? '—'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
