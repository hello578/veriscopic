// app/(org)/[organisationId]/dashboard/components/legal-status-table.tsx
'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react'

/**
 * Canonical row contract.
 * This file OWNS this shape.
 */
export type LegalStatusRow = {
  id: string
  name: string
  version: string
  isCurrent: boolean
  status: 'accepted' | 'pending' | 'outdated'
}

export function LegalStatusTable({
  rows = [],
}: {
  rows?: LegalStatusRow[]
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-500">
        No platform documents found.
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Platform legal documents
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Acceptance status is tracked immutably for audit and compliance.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-slate-50"
            >
              <TableCell className="font-medium">
                <Link
                  href={`/legal/documents/${row.id}`}
                  className="block"
                >
                  {row.name}
                </Link>
              </TableCell>

              <TableCell>
                <span className="text-sm text-slate-600">
                  v{row.version}
                </span>
              </TableCell>

              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/* ───────────────────────────────────────────── */
/* Status badge                                  */
/* ───────────────────────────────────────────── */

function StatusBadge({
  status,
}: {
  status: LegalStatusRow['status']
}) {
  switch (status) {
    case 'accepted':
      return (
        <Badge className="gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Accepted
        </Badge>
      )

    case 'outdated':
      return (
        <Badge className="gap-1 bg-amber-50 text-amber-700 border border-amber-200">
          <AlertTriangle className="h-3.5 w-3.5" />
          Outdated
        </Badge>
      )

    case 'pending':
    default:
      return (
        <Badge className="gap-1 bg-slate-100 text-slate-700 border border-slate-200">
          <Clock className="h-3.5 w-3.5" />
          Pending
        </Badge>
      )
  }
}
