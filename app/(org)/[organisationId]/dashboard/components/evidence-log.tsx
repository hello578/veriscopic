// app/(org)/[organisationId]/dashboard/components/evidence-log.tsx

'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Clock, FileJson, FileText, Info } from 'lucide-react'

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
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex items-start justify-between gap-6 px-6 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold text-slate-900">
              Evidence log
            </h3>

            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>

                <TooltipContent>
                  <div className="space-y-2">
                    <p className="font-medium">
                      Immutable evidence record
                    </p>
                    <p>
                      This log contains append-only governance evidence derived
                      from recorded actions such as legal document acceptance.
                    </p>
                    <p className="text-slate-600">
                      Entries cannot be edited or deleted and may be exported for
                      audit or regulatory review.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <p className="text-xs text-slate-500">
            System-generated records derived from governance actions
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1">
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

      <CardContent className="space-y-3 px-6 pb-6">
        {events.length === 0 && (
          <p className="text-sm text-slate-500">
            No governance evidence has been recorded yet.
          </p>
        )}

        {events.map((e, i) => (
          <div
            key={i}
            className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <Clock className="mt-0.5 h-4 w-4 text-slate-400" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-900">
                Platform documents accepted
              </p>
              <p className="text-xs text-slate-500">
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


