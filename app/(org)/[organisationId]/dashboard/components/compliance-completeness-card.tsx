// app/(org)/[organisationId]/dashboard/components/compliance-completeness-card.tsx

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CheckCircle2, XCircle, Info } from 'lucide-react'

export type CompletenessStatus = 'strong' | 'developing' | 'incomplete'

export interface CompletenessResult {
  status: CompletenessStatus
  breakdown: {
    requiredDocs: string[]
    missingDocs: string[]
    hasAISystems: boolean
    hasAccountability: boolean
  }
}

interface Props {
  completeness: CompletenessResult
  organisationId: string
}

function statusBadge(status: CompletenessStatus) {
  if (status === 'strong') {
    return <Badge className="bg-emerald-100 text-emerald-700">Strong</Badge>
  }
  if (status === 'developing') {
    return <Badge className="bg-amber-100 text-amber-700">Developing</Badge>
  }
  return <Badge variant="secondary">Incomplete</Badge>
}

export function ComplianceCompletenessCard({
  completeness,
  organisationId,
}: Props) {
  const totalChecks = completeness.breakdown.requiredDocs.length + 2
  const completedChecks =
    completeness.breakdown.requiredDocs.length -
    completeness.breakdown.missingDocs.length +
    (completeness.breakdown.hasAISystems ? 1 : 0) +
    (completeness.breakdown.hasAccountability ? 1 : 0)

  const pct =
    totalChecks === 0
      ? 0
      : Math.round((completedChecks / totalChecks) * 100)

  return (
    <Card className="border-slate-200/60 bg-white shadow-sm">
      <CardHeader className="space-y-4 pb-6 px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-lg font-semibold text-slate-900">
                 Governance record status
             </h3>

              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                      aria-label="What does governance completeness mean?"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>

                  <TooltipContent
                    side="top"
                    align="start"
                    sideOffset={10}
                    className="
                      max-w-sm
                      rounded-xl
                      border border-slate-200
                      bg-white
                      px-4 py-3
                      text-sm
                      leading-relaxed
                      text-slate-700
                      shadow-xl
                    "
                  >
                    <div className="space-y-2">
                      <p className="font-medium text-slate-900">
                        Evidence-based indicator
                      </p>
                      <p>
                        This score reflects whether required governance artefacts
                        have been recorded in the system.
                      </p>
                      <p className="text-slate-500">
                        It does not constitute legal advice or regulatory
                        certification.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <p className="text-sm text-slate-600">
              Based on accepted platform documents and declared AI systems.
           </p>
          </div>

          {statusBadge(completeness.status)}
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              {completedChecks} of {totalChecks} checks recorded
            </span>
            <span className="font-medium text-slate-900">
              {pct}%
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all ${
                completeness.status === 'strong'
                  ? 'bg-emerald-600'
                  : 'bg-slate-800'
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pt-0 pb-6">
        {completeness.breakdown.requiredDocs.map((doc) => {
          const missing = completeness.breakdown.missingDocs.includes(doc)

          return (
            <div
              key={doc}
              className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-2"
            >
              <span className="text-sm font-medium text-slate-900">
                {doc.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>

              {missing ? (
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <XCircle className="h-3 w-3" />
                  Missing
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <CheckCircle2 className="h-3 w-3" />
                  Recorded
                </span>
              )}
            </div>
          )
        })}

        {!completeness.breakdown.hasAISystems && (
          <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/40 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-blue-900">
                Next step
              </p>
              <p className="text-sm text-blue-700">
                Record at least one AI system to complete governance setup.
              </p>
            </div>

            <a
              href={`/${organisationId}/ai-systems`}
              className="text-sm font-medium text-blue-700 hover:underline"
            >
              Record AI system
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
