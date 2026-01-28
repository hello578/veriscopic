// app/(org)/[organisationId]/dashboard/components/compliance-completeness-card.tsx
// app/(org)/[organisationId]/dashboard/components/compliance-completeness-card.tsx

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle } from 'lucide-react'

export type CompletenessStatus = 'strong' | 'developing' | 'incomplete'

export interface CompletenessResult {
  status: CompletenessStatus
  breakdown: {
    requiredDocs: string[]
    missingDocs: string[]
    outdatedDocs: string[]
    hasAISystems: boolean
    hasAccountability: boolean
  }
}

interface Props {
  completeness: CompletenessResult
  organisationId: string
}

/* --------------------------------
   Helpers
--------------------------------- */

function statusBadge(status: CompletenessStatus) {
  if (status === 'strong') {
    return <Badge className="bg-emerald-100 text-emerald-700">Strong</Badge>
  }
  if (status === 'developing') {
    return <Badge className="bg-amber-100 text-amber-700">Developing</Badge>
  }
  return <Badge variant="secondary">Incomplete</Badge>
}

function CheckRow({
  label,
  recorded,
}: {
  label: string
  recorded: boolean
}) {
  return (
    <div className="flex justify-between rounded border px-4 py-2">
      <span className="text-sm font-medium text-slate-900">
        {label}
      </span>

      {recorded ? (
        <span className="flex items-center gap-1 text-xs text-emerald-600">
          <CheckCircle2 className="h-3 w-3" />
          Recorded
        </span>
      ) : (
        <span className="flex items-center gap-1 text-xs text-amber-700">
          <XCircle className="h-3 w-3" />
          Missing
        </span>
      )}
    </div>
  )
}

/* --------------------------------
   Component
--------------------------------- */

export function ComplianceCompletenessCard({
  completeness,
}: Props) {
  const totalChecks =
    completeness.breakdown.requiredDocs.length + 2 // AI systems + accountability

  const completedChecks =
    completeness.breakdown.requiredDocs.length -
    completeness.breakdown.missingDocs.length -
    completeness.breakdown.outdatedDocs.length +
    (completeness.breakdown.hasAISystems ? 1 : 0) +
    (completeness.breakdown.hasAccountability ? 1 : 0)

  const pct =
    totalChecks === 0
      ? 0
      : Math.round((completedChecks / totalChecks) * 100)

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="px-6 pb-6 space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Governance record status
          </h3>
          {statusBadge(completeness.status)}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              {completedChecks} of {totalChecks} checks recorded
            </span>
            <span className="font-medium">{pct}%</span>
          </div>

          <div className="h-2 rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-800 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 space-y-3">
        {/* Platform documents */}
        {completeness.breakdown.requiredDocs.map((doc) => {
          const missing =
            completeness.breakdown.missingDocs.includes(doc)
          const outdated =
            completeness.breakdown.outdatedDocs.includes(doc)

          return (
            <CheckRow
              key={doc}
              label={doc.replace(/-/g, ' ')}
              recorded={!missing && !outdated}
            />
          )
        })}

        {/* AI systems */}
        <CheckRow
          label="AI systems registered"
          recorded={completeness.breakdown.hasAISystems}
        />

        {/* Accountability */}
        <CheckRow
          label="Accountability framework declared"
          recorded={completeness.breakdown.hasAccountability}
        />
      </CardContent>
    </Card>
  )
}

