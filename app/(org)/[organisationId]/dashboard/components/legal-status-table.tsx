// app/(org)/[organisationId]/dashboard/components/legal-status-table.tsx

'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react'

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
              const isOutdated = row.status === 'outdated'
              const isAccepted = row.status === 'accepted'

              return (
                <Link
                  key={row.id}
                  href={`/legal/documents/${row.id}`}
                  className={cn(
                    'group flex items-center justify-between gap-4 py-4 transition',
                    'hover:bg-slate-50'
                  )}
                >
                  {/* Left */}
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
                        A newer version is available. Your previous acceptance remains recorded.
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

                    {row.status === 'pending' && (
                      <Badge
                        variant="outline"
                        className="text-amber-700 border-amber-300"
                      >
                        Pending
                      </Badge>
                    )}

                    {isOutdated && (
                      <Badge
                        variant="outline"
                        className="text-amber-700 border-amber-300"
                      >
                        Action required
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

