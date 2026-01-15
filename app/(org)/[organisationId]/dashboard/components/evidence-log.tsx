// app/(org)/[organisationId]/dashboard/components/evidence-log.tsx
// app/(org)/[organisationId]/dashboard/components/evidence-log.tsx

'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, FileJson, FileText } from 'lucide-react'

type EvidenceEvent = {
  accepted_at: string
}

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export function EvidenceLog({
  organisationId,
  events,
}: {
  organisationId: string
  events: EvidenceEvent[]
}) {
  function download(path: string, filename: string) {
    const url = `${path}?organisationId=${organisationId}`
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="border-slate-200/60 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Evidence log
          </h3>
          <p className="text-xs text-slate-500">
            Immutable, append-only records derived from governance evidence
          </p>
        </div>

        {/* ───── Export actions ───── */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              download(
                '/api/evidence-pack/json',
                `veriscopic-evidence-pack-${organisationId}.json`
              )
            }
          >
            <FileJson className="mr-2 h-4 w-4" />
            JSON
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              download(
                '/api/evidence-pack/pdf',
                `veriscopic-evidence-pack-${organisationId}.pdf`
              )
            }
          >
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
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
            <Clock className="mt-1 h-4 w-4 text-slate-400" />

            <div className="space-y-1">
              {/* Event label — future-proof */}
              <p className="text-sm font-medium text-slate-900">
                Platform documents accepted
              </p>

              {/* Time — relative + absolute */}
              <p className="text-xs text-slate-400">
                {timeAgo(e.accepted_at)} ·{' '}
                {new Date(e.accepted_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

