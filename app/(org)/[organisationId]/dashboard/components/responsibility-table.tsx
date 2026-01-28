
// app/(org)/[organisationId]/dashboard/components/responsibility-table.tsx

'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ResponsibilityRow = {
  id: string
  role_label: string
  decision_surface: string
  evidence_type: string
  review_trigger: string
  status: 'active' | 'superseded' | 'withdrawn'
  declared_at: string
}

function statusVariant(status: ResponsibilityRow['status']) {
  switch (status) {
    case 'active':
      return 'default'
    case 'superseded':
      return 'secondary'
    case 'withdrawn':
      return 'outline'
    default:
      return 'secondary'
  }
}

export function ResponsibilityTable({
  rows,
}: {
  rows: ResponsibilityRow[]
}) {
  return (
    <Card className="bg-white shadow-sm ring-1 ring-border">
      <CardHeader className="px-6 pb-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold tracking-tight">
            Accountability & responsibility
          </h3>
          <p className="text-xs text-muted-foreground">
            How decision accountability becomes auditable evidence
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pt-0 pb-6">
        {/* Explanatory copy (unchanged, board-safe) */}
        <p className="text-sm text-slate-700 leading-relaxed">
          The Responsibility Map records <strong>who is accountable for key
          governance decisions</strong>, the <strong>evidence that must exist</strong>{' '}
          because of those decisions, and <strong>when responsibilities must be
          reviewed</strong>. Responsibility records are organisation-level
          declarations and are included in Evidence Packs.
        </p>

        {/* Table */}
        {rows.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">
                    Accountable role
                  </th>
                  <th className="px-4 py-2 text-left font-medium">
                    Decision surface
                  </th>
                  <th className="px-4 py-2 text-left font-medium">
                    Evidence produced
                  </th>
                  <th className="px-4 py-2 text-left font-medium">
                    Review trigger
                  </th>
                  <th className="px-4 py-2 text-left font-medium">
                    Current status
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t last:border-b-0"
                  >
                    <td className="px-4 py-2 font-medium text-slate-900">
                      {r.role_label}
                    </td>
                    <td className="px-4 py-2 text-slate-700">
                      {r.decision_surface}
                    </td>
                    <td className="px-4 py-2 text-slate-700">
                      {r.evidence_type}
                    </td>
                    <td className="px-4 py-2 text-slate-700">
                      {r.review_trigger}
                    </td>
                    <td className="px-4 py-2">
                      <Badge variant={statusVariant(r.status)}>
                        {r.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-md border bg-slate-50 p-3">
            <p className="text-xs text-slate-600">
              No responsibility records have been declared yet. Declared
              responsibilities will appear here and be included in Evidence
              Packs.
            </p>
          </div>
        )}

        {/* Footer clarification */}
        <div className="rounded-md border bg-slate-50 p-3">
          <p className="text-xs text-slate-600 leading-relaxed">
            Responsibility records do not assign personal liability, certify
            compliance, or monitor behaviour. Changes over time are tracked
            through Evidence Packs and Drift detection.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
