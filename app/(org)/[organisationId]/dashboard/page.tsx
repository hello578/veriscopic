 // app/(org)/[organisationId]/dashboard/page.tsx
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

import {
  getCurrentPlatformDocuments,
  type CurrentDocument,
} from '@/lib/legal/read-documents'
import { getOrganisationAcceptanceEvents } from '@/lib/legal/read-acceptance'
import { computeCompleteness } from '@/lib/legal/completeness'

function formatAcceptedDate(iso?: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

export default async function OrganisationDashboardPage({
  params,
}: {
  params: Promise<{ organisationId: string }>
}) {
  const { organisationId } = await params

  const result = await requireMember(organisationId)
  if (!result.ok) {
    switch (result.reason) {
      case 'unauthenticated':
        redirect('/auth/login')
      case 'no-org':
        redirect('/onboarding/create-organisation')
      default:
        redirect('/')
    }
  }

  const { ctx } = result
  if (!ctx.org || !ctx.user) redirect('/')

  const supabase = await supabaseServerRead()

  const [{ data: orgRow }, currentDocs, acceptanceEvents] =
    await Promise.all([
      supabase
        .from('organisations')
        .select('features')
        .eq('id', ctx.org.id)
        .single(),
      getCurrentPlatformDocuments(),
      getOrganisationAcceptanceEvents(ctx.org.id),
    ])

  const features = orgRow?.features ?? {}

  const acceptedDocIds = new Set<string>(
    acceptanceEvents.map((e) => e.document_id)
  )

  const acceptedOn = acceptanceEvents.length
    ? formatAcceptedDate(
        acceptanceEvents
          .map((e) => e.accepted_at)
          .sort()
          .at(-1)
      )
    : null

  const completeness = computeCompleteness({
    currentDocs,
    hasAISystems: false, // will flip once AI systems UI is wired
    hasAccountability: true,
  })

  const hasAcceptedAllDocs =
    currentDocs.length > 0 &&
    currentDocs.every((d: CurrentDocument) =>
      acceptedDocIds.has(d.id)
    )

  const canEditFeatures = hasRole(ctx, ['owner', 'admin'])

  return (
    <main className="py-10">
      <div className="mx-auto max-w-4xl px-6 space-y-14">

        {/* =============================
            HEADER (identity & context)
        ============================== */}
        <DashboardHeader
          organisationName={ctx.org.name}
          userEmail={ctx.user.email ?? undefined}
          role={ctx.role ?? 'member'}
        />

        {/* =============================
            GOVERNANCE STATUS (PRIMARY)
        ============================== */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Governance status
          </h2>

          <ComplianceCompletenessCard
            completeness={completeness}
            organisationId={ctx.org.id}
          />
        </section>

        {/* =============================
            EVIDENCE OUTPUTS
        ============================== */}
        <section className="space-y-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Evidence outputs
          </h2>

          <div className="grid gap-6 lg:grid-cols-3">
            <OrganisationOverview
              name={ctx.org.name}
              memberCount={1}
            />

            <div className="lg:col-span-2 space-y-6">
              <EvidencePackCard organisationId={ctx.org.id} />

              <FeatureToggle
                organisationId={ctx.org.id}
                featureKey="evidence_pack"
                enabled={Boolean(features.evidence_pack)}
                canEdit={canEditFeatures}
              />
            </div>
          </div>
        </section>

        {/* =============================
            GOVERNANCE INPUTS
        ============================== */}
        <section className="space-y-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Governance inputs
          </h2>

          {hasAcceptedAllDocs ? (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-900">
                Platform documents accepted
              </p>
              <p className="text-xs text-emerald-700">
                Accepted on {acceptedOn} · Evidence recorded immutably
              </p>
            </div>
          ) : (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-900">
                Action required
              </p>
              <p className="text-xs text-amber-700">
                You must accept the current platform documents to
                complete governance setup.
              </p>
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <ResponsibilityMap />
            </div>

            <div className="lg:col-span-3 space-y-6">
              <LegalStatusTable
                rows={currentDocs.map((doc: CurrentDocument) => ({
                  id: doc.id,
                  name: doc.name,
                  version: doc.version,
                  isCurrent: true,
                  status: acceptedDocIds.has(doc.id)
                    ? 'accepted'
                    : 'pending',
                }))}
              />

              {canEditFeatures && (
                <AcceptDocumentsCTA
                  organisationId={ctx.org.id}
                  acceptedOn={acceptedOn}
                />
              )}
            </div>
          </div>
        </section>

        {/* =============================
            AUDIT & TRACEABILITY
        ============================== */}
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
