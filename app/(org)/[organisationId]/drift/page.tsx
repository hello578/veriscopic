
//app/(org)/[organisationId]/drift/page.tsx

import { redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { requireMember } from '@/lib/rbac/guards'
import Link from 'next/link'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { DriftItem } from '@/lib/legal/drift/detect-drift'

type PageProps = {
  params: Promise<{ organisationId: string }>
}

function formatDate(iso?: string | null) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

function SeverityBadge({ severity }: { severity: DriftItem['severity'] }) {
  return severity === 'material' ? (
    <Badge className="bg-red-100 text-red-800">Material</Badge>
  ) : (
    <Badge className="bg-slate-100 text-slate-700">Informational</Badge>
  )
}

export default async function DriftReportPage({ params }: PageProps) {
  const { organisationId } = await params

  const result = await requireMember(organisationId)
  if (!result.ok) {
    redirect(result.reason === 'unauthenticated' ? '/auth/login' : '/')
  }

  const supabase = await supabaseServerRead()

  /* ------------------------------------------------------------------------ */
  /* Latest drift event                                                        */
  /* ------------------------------------------------------------------------ */

  const { data: driftEvent } = await supabase
    .from('drift_events')
    .select('detected_at, delta_snapshot')
    .eq('organisation_id', organisationId)
    .order('detected_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  /* ------------------------------------------------------------------------ */
  /* No drift history yet                                                      */
  /* ------------------------------------------------------------------------ */

  if (!driftEvent) {
    return (
      <main className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <Card>
            <CardContent className="py-14 text-center text-sm text-slate-600">
              Governance drift has not yet been detected for this organisation.
              <div className="mt-2 text-xs text-slate-500">
                Drift checks run when governance evidence packs are generated.
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  const delta = driftEvent.delta_snapshot as {
    drift_summary: {
      has_drift: boolean
      drift_item_count: number
      material_count: number
      informational_count: number
    }
    drift_items: DriftItem[]
  }

  /* ------------------------------------------------------------------------ */
  /* Drift history timeline (last 5)                                           */
  /* ------------------------------------------------------------------------ */

  const { data: history } = await supabase
    .from('drift_events')
    .select('detected_at, drift_hash, has_drift')
    .eq('organisation_id', organisationId)
    .order('detected_at', { ascending: false })
    .limit(5)

  return (
    <main className="py-12">
      <div className="mx-auto max-w-4xl px-6 space-y-12">
        {/* ------------------------------------------------------------------ */}
        {/* Header                                                              */}
        {/* ------------------------------------------------------------------ */}
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            Governance drift report
          </h1>
          <p className="text-sm text-slate-600">
            Last verified on {formatDate(driftEvent.detected_at)}
          </p>

          <Link
            href="/drift/how-it-works"
            className="text-xs text-slate-500 underline"
          >
            How drift detection works
          </Link>

        </header>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
          <strong>Drift scope:</strong> Drift reports compare the two most recently
          sealed Evidence Packs. Governance changes made after the latest pack
          will be reflected in the <em>next</em> drift report when a new Evidence
          Pack is generated.
        </div>


        {/* ------------------------------------------------------------------ */}
        {/* Material warning                                                    */}
        {/* ------------------------------------------------------------------ */}
        {delta.drift_summary.material_count > 0 && (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            <strong>Material governance drift detected.</strong>
            <p className="mt-1 text-xs text-red-800">
              These changes may require review by legal, compliance, or audit
              stakeholders.
            </p>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Summary                                                             */}
        {/* ------------------------------------------------------------------ */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Drift summary</h2>
            {delta.drift_summary.has_drift ? (
              <Badge className="bg-amber-100 text-amber-800">
                Drift detected
              </Badge>
            ) : (
              <Badge className="bg-emerald-100 text-emerald-700">
                No drift
              </Badge>
            )}
          </CardHeader>

          <CardContent className="space-y-4 text-sm">
            <p>
              <strong>{delta.drift_summary.drift_item_count}</strong> change(s)
              detected
            </p>

            <div className="flex gap-4 text-xs text-slate-600">
              <span>Material: {delta.drift_summary.material_count}</span>
              <span>
                Informational: {delta.drift_summary.informational_count}
              </span>
            </div>

            <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
              Drift is detected by comparing cryptographically sealed governance
              snapshots. No monitoring, inference, or behavioural analysis is
              performed.
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`/api/drift/json?organisationId=${organisationId}`}
                className="text-xs underline text-slate-700"
              >
                Download drift JSON
              </a>

              <a
                href={`/api/drift/pdf?organisationId=${organisationId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-50"
              >
                View drift appendix (PDF)
              </a>
            </div>
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------------ */}
        {/* No drift message                                                    */}
        {/* ------------------------------------------------------------------ */}
        {delta.drift_items.length === 0 && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <strong>No governance drift detected.</strong>
            <p className="mt-1 text-xs text-emerald-800">
              The current governance state matches the last verified evidence
              pack.
            </p>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Detected items                                                      */}
        {/* ------------------------------------------------------------------ */}
        {delta.drift_items.length > 0 && (
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold">Detected changes</h2>
            </CardHeader>

            <CardContent className="space-y-3">
              {delta.drift_items.map((item) => (
                <div
                  key={`${item.path}-${item.change_type}`}
                  className="rounded-md border border-slate-200 p-3 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">
                      {item.path}
                    </p>
                    <SeverityBadge severity={item.severity} />
                  </div>

                  <p className="text-xs text-slate-600">{item.summary}</p>

                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    {item.change_type}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Drift history                                                       */}
        {/* ------------------------------------------------------------------ */}
        {history && history.length > 0 && (

          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold">Drift history</h2>
            </CardHeader>

            <CardContent className="space-y-2 text-xs">
              {history.map((h) => (
                <div
                  key={h.drift_hash}
                  className="flex items-center justify-between rounded border border-slate-200 px-3 py-2"
                >
                  <span>{formatDate(h.detected_at)}</span>
                  <span className="font-mono text-[11px] text-slate-500">
                    {h.drift_hash.slice(0, 10)}…
                  </span>
                  {h.has_drift ? (
                    <Badge className="bg-amber-100 text-amber-800">
                      Drift
                    </Badge>
                  ) : (
                    <Badge className="bg-emerald-100 text-emerald-700">
                      No drift
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}


