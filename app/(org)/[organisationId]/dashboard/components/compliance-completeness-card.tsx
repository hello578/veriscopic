// app/(org)/[organisationId]/dashboard/components/compliance-completeness-card.tsx
// app/(org)/[organisationId]/dashboard/components/compliance-completeness-card.tsx

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

export type CompletenessStatus = 'complete' | 'partial' | 'incomplete'

export interface CompletenessBreakdown {
  requiredDocs: string[]
  missingDocs: string[]
  hasAISystems: boolean
  hasAccountability: boolean
}

export interface CompletenessResult {
  status: CompletenessStatus
  breakdown: CompletenessBreakdown
}

interface Props {
  completeness: CompletenessResult
  organisationId: string
}

/* ───────────────────────────────────────────── */
/* Helpers                                      */
/* ───────────────────────────────────────────── */

function statusBadge(status: CompletenessStatus) {
  switch (status) {
    case 'complete':
      return (
        <Badge className="bg-emerald-100 text-emerald-700">
          Complete
        </Badge>
      )
    case 'partial':
      return (
        <Badge className="bg-amber-100 text-amber-700">
          Partial
        </Badge>
      )
    default:
      return (
        <Badge variant="secondary">
          Incomplete
        </Badge>
      )
  }
}

function labelForDoc(doc: string) {
  switch (doc) {
    case 'platform-terms':
      return 'Platform Terms'
    case 'privacy-notice':
      return 'Privacy Notice'
    case 'ai-governance-disclosure':
      return 'AI Governance Disclosure'
    default:
      return doc
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
  }
}

/* ───────────────────────────────────────────── */
/* Component                                    */
/* ───────────────────────────────────────────── */

export function ComplianceCompletenessCard({
  completeness,
  organisationId,
}: Props) {
  const requiredDocs = completeness.breakdown.requiredDocs.length
  const missingDocs = completeness.breakdown.missingDocs.length
  const docsComplete = Math.max(0, requiredDocs - missingDocs)

  const totalChecks = requiredDocs + 2
  const completedChecks =
    docsComplete +
    (completeness.breakdown.hasAISystems ? 1 : 0) +
    (completeness.breakdown.hasAccountability ? 1 : 0)

  const pct =
    totalChecks === 0
      ? 0
      : Math.round((completedChecks / totalChecks) * 100)

  return (
    <Card className="border-slate-200/60 bg-white shadow-sm">
      <CardHeader className="space-y-4 pb-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Governance completeness
            </h3>
            <p className="text-sm text-slate-600">
              Evidence-based record completeness. Not a legal assessment.
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
                completeness.status === 'complete'
                  ? 'bg-emerald-600'
                  : 'bg-slate-800'
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-0">
        {/* Required artefacts */}
        <div className="space-y-2">
          {completeness.breakdown.requiredDocs.map((doc) => {
            const missing =
              completeness.breakdown.missingDocs.includes(doc)

            return (
              <div
                key={doc}
                className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2"
              >
                <span className="text-sm font-medium text-slate-900">
                  {labelForDoc(doc)}
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
        </div>

        {/* Next step */}
        {!completeness.breakdown.hasAISystems && (
          <div className="flex items-center justify-between rounded-lg border border-blue-200/60 bg-blue-50/30 px-4 py-3">
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

        {/* Trust signal */}
        <p className="text-xs text-slate-500 pt-2">
          Last updated automatically from recorded evidence
        </p>
      </CardContent>
    </Card>
  )
}

