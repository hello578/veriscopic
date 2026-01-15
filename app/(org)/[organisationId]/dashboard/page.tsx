// app/(org)/[organisationId]/dashboard/page.tsx

import { redirect } from 'next/navigation'
import { requireMember } from '@/lib/rbac/guards'

import { OrganisationOverview } from './components/organisation-overview'
import { ComplianceCompletenessCard } from './components/compliance-completeness-card'
import { ResponsibilityMap } from './components/responsibility-map'
import { LegalStatusTable } from './components/legal-status-table'
import { EvidenceLog } from './components/evidence-log'

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

  if (!ctx.org || !ctx.user) {
    redirect('/')
  }

  /**
   * ─────────────────────────────────────────────
   * Placeholder / derived data (safe for Phase 2)
   * ─────────────────────────────────────────────
   */

  const complianceCompleteness = {
    status: 'incomplete' as const,
    breakdown: {
      requiredDocs: [
        'platform-terms',
        'privacy-notice',
        'ai-governance-disclosure',
      ],
      missingDocs: [
        'platform-terms',
        'privacy-notice',
        'ai-governance-disclosure',
      ],
      hasAISystems: false,
      hasAccountability: true,
    },
  }

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

      {/* Top summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <OrganisationOverview
          name={ctx.org.name}
          memberCount={1}
        />
        <ComplianceCompletenessCard
          completeness={complianceCompleteness}
        />
      </div>

      {/* Governance & responsibility */}
      <div className="grid gap-6 md:grid-cols-2">
        <ResponsibilityMap />
        <LegalStatusTable
          documents={[
            {
              id: 'tos',
              name: 'Platform Terms',
              version: '—',
            },
            {
              id: 'privacy',
              name: 'Privacy Notice',
              version: '—',
            },
            {
              id: 'ai',
              name: 'AI Governance Disclosure',
              version: '—',
            },
          ]}
        />
      </div>

      {/* Evidence */}
      <EvidenceLog events={[]} />
    </main>
  )
}




