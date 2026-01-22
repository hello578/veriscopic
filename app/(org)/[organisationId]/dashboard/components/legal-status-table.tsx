// app/(org)/[organisationId]/dashboard/components/legal-status-table.tsx
'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react'

export type LegalStatus = 'accepted' | 'missing' | 'outdated'

export type LegalStatusRow = {
  id: string
  name: string
  version: string
  status: LegalStatus
}


export function LegalStatusTable({
  rows = [],
}: {
  rows?: LegalStatusRow[]
}) {
  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardHeader className="px-6 pb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Legal documents (platform-issued)
        </h3>
        <p className="text-xs text-slate-500">
          Accepted versions are cryptographically bound and immutable.
        </p>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        {rows.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
            No platform documents are currently published.
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
          {rows.map((row) => {
  const isAccepted = row.status === 'accepted'
  const isOutdated = row.status === 'outdated'
  const isPending = row.status === 'missing'

  return (
    <Link
      key={row.id}
      href={`/legal/documents/${row.id}`}
      className="group flex items-center justify-between gap-4 py-4 hover:bg-slate-50"
    >
      {/* Left */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-900">
          {row.name}{' '}
          <span className="text-slate-500">v{row.version}</span>
        </p>

        {isOutdated && (
          <div className="flex items-center gap-1 text-xs text-amber-700">
            <AlertTriangle className="h-3.5 w-3.5" />
            A newer version is available.
          </div>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {isAccepted && (
          <Badge variant="secondary" className="gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Accepted
          </Badge>
        )}

        {isPending && (
          <Badge
            variant="outline"
            className="text-amber-700 border-amber-300"
          >
            Action required
          </Badge>
        )}

        {isOutdated && (
          <Badge
            variant="outline"
            className="text-amber-700 border-amber-300"
          >
            Update required
          </Badge>
        )}

        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition" />
      </div>
    </Link>
  )
})}

          </div>
        )}
      </CardContent>
    </Card>
  )
}
