// app/(org)/[organisationId]/dashboard/components/legal-status-table.tsx
'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Download,
} from 'lucide-react'

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
                <div
                  key={row.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  {/* LEFT: document meta (clickable) */}
                  <Link
                    href={`/legal/documents/${row.id}`}
                    className="group flex flex-1 items-center justify-between gap-4 hover:bg-slate-50 rounded-md px-2 py-2"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-900">
                        {row.name}{' '}
                        <span className="text-slate-500">
                          v{row.version}
                        </span>
                      </p>

                      {isOutdated && (
                        <div className="flex items-center gap-1 text-xs text-amber-700">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          A newer version is available.
                        </div>
                      )}
                    </div>

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

                  {/* RIGHT: download PDF (non-navigating) */}
                  <div className="shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        window.open(
                          `/api/legal/documents/${row.id}/pdf`,
                          '_blank'
                        )
                      }}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
