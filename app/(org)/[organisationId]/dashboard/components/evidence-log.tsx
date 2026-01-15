// app/(org)/[organisationId]/dashboard/components/evidence-log.tsx
// app/(org)/[organisationId]/dashboard/components/evidence-log.tsx

'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Download } from 'lucide-react'

export function EvidenceLog({
  organisationId,
  events,
}: {
  organisationId: string
  events: {
    accepted_at: string
    document_name?: string
    user_email?: string
    role?: string
    content_hash?: string
  }[]
}) {
  async function handleExport() {
    const res = await fetch(
      `/${organisationId}/evidence/export`
    )

    if (!res.ok) {
      alert('Failed to export evidence pack')
      return
    }

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `veriscopic-evidence-${organisationId}.json`
    a.click()

    URL.revokeObjectURL(url)
  }

  return (
    <Card className="border-slate-200/60 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Evidence log
          </h3>
          <p className="text-xs text-slate-500">
            Immutable, append-only records
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export evidence pack
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {events.length === 0 && (
          <p className="text-sm text-slate-500">
            No evidence recorded yet.
          </p>
        )}

        {events.map((e, i) => (
          <div
            key={i}
            className="flex gap-3 rounded-md border border-slate-100 px-3 py-2"
          >
            <Clock className="h-4 w-4 text-slate-400 mt-1" />

            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-900">
                Accepted platform documents
              </p>

              <p className="text-xs text-slate-600">
                By {e.user_email ?? 'Organisation owner'}
                {e.role ? ` (${e.role})` : ''}
              </p>

              {e.content_hash && (
                <p className="text-xs text-slate-500 font-mono">
                  Hash: {e.content_hash.slice(0, 8)}…
                </p>
              )}

              <p className="text-xs text-slate-400">
                {new Date(e.accepted_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

