
// app/(org)/[organisationId]/dashboard/page.tsx

import { redirect } from 'next/navigation'
import { requireMember, hasRole } from '@/lib/rbac/guards'
import { supabaseServerRead } from '@/lib/supabase/server-read'

import { DashboardHeader } from './components/dashboard-header'
import { OrganisationOverview } from './components/organisation-overview'
import { ComplianceCompletenessCard } from './components/compliance-completeness-card'
import { ResponsibilityMap } from './components/responsibility-map'
import { LegalStatusTable } from './components/legal-status-table'
import { EvidenceLog } from './components/evidence-log'
import { AcceptDocumentsCTA } from './components/accept-documents-cta'
import { EvidencePackCard } from './components/evidence-pack-card'
import { FeatureToggle } from '@/components/compliance/feature-toggle'

import { getCurrentPlatformDocuments } from '@/lib/legal/read-documents'
import {
  getOrganisationAcceptanceEvents,
  type AcceptanceEvent,
} from '@/lib/legal/read-acceptance'
import { computeCompleteness } from '@/lib/legal/completeness'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function formatDate(iso?: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

type PageProps = {
  params: Promise<{ organisationId: string }>
}

export default async function OrganisationDashboardPage({ params }: PageProps) {
  const { organisationId } = await params

  const result = await requireMember(organisationId)
  if (!result.ok) {
    redirect(result.reason === 'unauthenticated' ? '/auth/login' : '/')
  }

  const { ctx } = result
  if (!ctx.org) redirect('/')

  const supabase = await supabaseServerRead()

  const [
    { data: orgRow, error: orgError },
    currentDocs,
    acceptanceEvents,
    { count: aiSystemsCount, error: aiCountError },
  ] = await Promise.all([
    supabase
      .from('organisations')
      .select('features')
      .eq('id', ctx.org.id)
      .single(),

    getCurrentPlatformDocuments(),

    getOrganisationAcceptanceEvents(ctx.org.id),

    supabase
      .from('ai_systems')
      .select('*', { count: 'exact', head: true })
      .eq('organisation_id', ctx.org.id),
  ])

  if (orgError) {
    console.error('[dashboard] organisations query error:', orgError)
  }
  if (aiCountError) {
    console.error('[dashboard] ai_systems count query error:', aiCountError)
  }

  const features = orgRow?.features ?? {}

  const acceptedDocumentIds = new Set(acceptanceEvents.map((e) => e.document_id))

  const docsWithStatus = currentDocs.map((doc) => ({
    ...doc,
    acceptanceStatus: acceptedDocumentIds.has(doc.id)
      ? ('accepted' as const)
      : ('missing' as const),
  }))

  const hasAcceptedAllDocs =
    docsWithStatus.length > 0 &&
    docsWithStatus.every((d) => d.acceptanceStatus === 'accepted')

  const acceptedOn = acceptanceEvents.length
    ? formatDate(
        acceptanceEvents
          .map((e) => e.accepted_at)
          .filter(Boolean)
          .sort()
          .at(-1)
      )
    : null

  // Gold-standard invariants:
  // - completeness is derived, never stored
  // - no outdated docs state in v1 (outdatedDocs = [])
  const rawCompleteness = computeCompleteness({
    currentDocs: docsWithStatus,
    hasAISystems: (aiSystemsCount ?? 0) > 0,
    hasAccountability: true,
  })

  const completeness = {
    ...rawCompleteness,
    breakdown: {
      ...rawCompleteness.breakdown,
      outdatedDocs: [] as string[],
    },
  }

  const canEditFeatures = hasRole(ctx, ['owner', 'admin'])

  const acceptedDocuments = acceptanceEvents.map((e: AcceptanceEvent) => ({
    name: e.document_name,
    version: e.version,
    accepted_at: e.accepted_at,
    content_hash: e.content_hash,
  }))

  return (
    <main className="py-10">
      <div className="mx-auto max-w-4xl px-6 space-y-14">
        <DashboardHeader
          organisationName={ctx.org.name}
          userEmail={ctx.user?.email ?? undefined}
          role={ctx.role ?? 'member'}
        />

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Governance status
          </h2>

          <ComplianceCompletenessCard
            completeness={completeness}
            organisationId={ctx.org.id}
          />
        </section>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Evidence outputs
          </h2>

          <div className="grid gap-6 lg:grid-cols-3">
            <OrganisationOverview name={ctx.org.name} memberCount={1} />

            <div className="lg:col-span-2 space-y-6">
              <EvidencePackCard organisationId={ctx.org.id} />

              <FeatureToggle
                organisationId={ctx.org.id}
                featureKey="evidence_pack"
                enabled={Boolean((features as any)?.evidence_pack)}
                canEdit={canEditFeatures}
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Governance inputs
          </h2>

          <LegalStatusTable
            organisationId={ctx.org.id}
            rows={docsWithStatus.map((doc) => ({
              id: doc.id,
              name: doc.name,
              version: doc.version,
              status: doc.acceptanceStatus,
            }))}
          />

          {canEditFeatures && !hasAcceptedAllDocs && (
            <AcceptDocumentsCTA
              organisationId={ctx.org.id}
              acceptedOn={acceptedOn}
              acceptedDocuments={acceptedDocuments}
            />
          )}

          <ResponsibilityMap />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            Audit & traceability
          </h2>

          <EvidenceLog
            organisationId={ctx.org.id}
            events={acceptanceEvents.map((e) => ({
              accepted_at: e.accepted_at,
            }))}
          />
        </section>
      </div>
    </main>
  )
}

