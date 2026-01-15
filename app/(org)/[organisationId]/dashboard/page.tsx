// app/(org)/[organisationId]/dashboard/page.tsx

import { redirect } from 'next/navigation'
import {
  requireMember,
  hasRole,
} from '@/lib/rbac/guards'

import { OrganisationOverview } from './components/organisation-overview'
import { ComplianceCompletenessCard } from './components/compliance-completeness-card'
import { ResponsibilityMap } from './components/responsibility-map'
import { LegalStatusTable } from './components/legal-status-table'
import { EvidenceLog } from './components/evidence-log'
import { AcceptDocumentsCTA } from './components/accept-documents-cta'

import { getCurrentPlatformDocuments } from '@/lib/legal/read-documents'
import { getOrganisationAcceptanceEvents } from '@/lib/legal/read-acceptance'
import { computeCompleteness } from '@/lib/legal/completeness'

export default async function OrganisationDashboardPage({
  params,
}: {
  params: Promise<{ organisationId: string }>
}) {
  // ─────────────────────────────────────────────
  // Resolve params + RBAC
  // ─────────────────────────────────────────────
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

  if (!ctx.org || !ctx.user) {
    redirect('/')
  }

  // ─────────────────────────────────────────────
  // Phase 3.2 — READ-ONLY Supabase wiring
  // ─────────────────────────────────────────────
  const [currentDocs, acceptanceEvents] = await Promise.all([
    getCurrentPlatformDocuments(),
    getOrganisationAcceptanceEvents(ctx.org.id),
  ])

  const completeness = computeCompleteness({
    currentDocs,
    hasAISystems: false,      // flips when AI registry ships
    hasAccountability: true,  // implied by ownership/admin roles
  })

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <main className="p-10 space-y-8">
      <header>
        <h1 className="text-2xl font-bold">
          {ctx.org.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          Role: {ctx.role}
        </p>
      </header>

      {/* Organisation + Compliance summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <OrganisationOverview
          name={ctx.org.name}
          memberCount={1}
        />
        <ComplianceCompletenessCard
          completeness={completeness}
        />
      </div>

      {/* Governance & legal state */}
      <div className="grid gap-6 md:grid-cols-2">
        <ResponsibilityMap />

        <div className="space-y-4">
          <LegalStatusTable
            documents={currentDocs.map((doc) => ({
              id: doc.id,
              name: doc.name,
              version: doc.version,
            }))}
          />

          {/* Acceptance CTA — OWNER / ADMIN ONLY */}
          {hasRole(ctx, ['owner', 'admin']) && (
            <AcceptDocumentsCTA
              organisationId={ctx.org.id}
            />
          )}
        </div>
      </div>

      {/* Evidence */}
      <EvidenceLog
        events={acceptanceEvents.map((event) => ({
          accepted_at: event.accepted_at,
        }))}
      />
    </main>
  )
}



