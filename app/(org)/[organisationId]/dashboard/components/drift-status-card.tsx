
// app/(org)/[organisationId]/dashboard/components/drift-status-card.tsx

'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react'

export type DriftStatus =
  | 'not_checked'
  | 'no_drift'
  | 'drift_detected'

type Props = {
  status: DriftStatus
  detectedAt?: string | null
}

function formatDate(iso?: string | null) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function DriftStatusCard({ status, detectedAt }: Props) {
  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Governance drift
        </h3>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        {status === 'no_drift' && (
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            No drift detected
          </div>
        )}

        {status === 'drift_detected' && (
          <div className="flex items-center gap-2 text-amber-700">
            <AlertTriangle className="h-4 w-4" />
            Governance drift detected
          </div>
        )}

        {status === 'not_checked' && (
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="h-4 w-4" />
            Drift not yet checked
          </div>
        )}

        <div className="text-xs text-slate-500">
          Last verified: <strong>{formatDate(detectedAt)}</strong>
        </div>

        <p className="text-xs leading-relaxed text-slate-600">
          Drift is detected by comparing cryptographically sealed governance
          snapshots. No monitoring or behavioural analysis is performed.
        </p>
      </CardContent>
    </Card>
  )
}
