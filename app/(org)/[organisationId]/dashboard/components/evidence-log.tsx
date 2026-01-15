// app/(org)/[organisationId]/dashboard/components/evidence-log.tsx

// app/(org)/[organisationId]/dashboard/components/evidence-log.tsx

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Clock } from 'lucide-react'

export function EvidenceLog({
  events,
}: {
  events: {
    accepted_at: string
    document_name?: string
    user_email?: string
    role?: string
    content_hash?: string
  }[]
}) {
  return (
    <Card className="border-slate-200/60 bg-white shadow-sm">
      <CardHeader>
        <h3 className="text-sm font-semibold text-slate-900">
          Evidence log
        </h3>
        <p className="text-xs text-slate-500">
          Immutable, append-only records
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {events.length === 0 && (
          <p className="text-sm text-slate-500">
            No evidence recorded yet.
          </p>
        )}

        {events.map((e, i) => (
          <div key={i} className="flex gap-3">
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
                <p className="text-xs text-slate-500">
                  Hash: {e.content_hash.slice(0, 6)}…{e.content_hash.slice(-4)}
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
