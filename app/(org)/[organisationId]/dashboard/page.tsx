 // app/(org)/[organisationId]/dashboard/page.tsx
// app/(org)/[organisationId]/dashboard/page.tsx

import { redirect } from 'next/navigation'
import { requireMember, hasRole } from '@/lib/rbac/guards'

import { DashboardHeader } from './components/dashboard-header'
import { OrganisationOverview } from './components/organisation-overview'
import { ComplianceCompletenessCard } from './components/compliance-completeness-card'
import { ResponsibilityMap } from './components/responsibility-map'
import { LegalStatusTable } from './components/legal-status-table'
import { EvidenceLog } from './components/evidence-log'
import { AcceptDocumentsCTA } from './components/accept-documents-cta'
import { EvidencePackCard } from './components/evidence-pack-card'

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

  const [currentDocs, acceptanceEvents] = await Promise.all([
    getCurrentPlatformDocuments(),
    getOrganisationAcceptanceEvents(ctx.org.id),
  ])

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
    hasAISystems: false,
    hasAccountability: true,
  })

  const hasAcceptedAllDocs =
    currentDocs.length > 0 &&
    currentDocs.every((d: CurrentDocument) =>
      acceptedDocIds.has(d.id)
    )

  return (
    <main className="py-10">
      <div className="mx-auto max-w-4xl px-6 space-y-12">

        <DashboardHeader
          organisationName={ctx.org.name}
          userEmail={ctx.user.email ?? undefined}
          role={ctx.role ?? 'member'}
        />

        <section className="grid gap-6 lg:grid-cols-3">
          <OrganisationOverview
            name={ctx.org.name}
            memberCount={1}
          />

          <div className="lg:col-span-2 space-y-6">
            <ComplianceCompletenessCard
              completeness={completeness}
              organisationId={ctx.org.id}
            />
            <EvidencePackCard organisationId={ctx.org.id} />
          </div>
        </section>

        <section>
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
        </section>

        <section className="grid gap-8 lg:grid-cols-5">
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

            {hasRole(ctx, ['owner', 'admin']) && (
              <AcceptDocumentsCTA
                organisationId={ctx.org.id}
                acceptedOn={acceptedOn}
              />
            )}
          </div>
        </section>

        <section className="space-y-3">
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
