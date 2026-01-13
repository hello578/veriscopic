import { redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { requireOrgRole } from '@/lib/rbac'
import { loadDashboardData } from '@/lib/dashboard/load-dashboard-data'
import type {
  OrganisationSummary,
  OrganisationWithRole,
} from '@/lib/types/organisation'

import { ComplianceSnapshot } from '@/components/dashboard/compliance-snapshot'
import { ResponsibilityMap } from '@/components/dashboard/responsibility-map'
import { OrganisationOverview } from '@/components/dashboard/organisation-overview'
import { LegalStatusTable } from '@/components/dashboard/legal-status-table'
import { EvidenceLog } from '@/components/dashboard/evidence-log'

export default async function DashboardPage() {
  /**
   * Initialise Supabase (server-side)
   */
  const supabase = await supabaseServerRead()
  /**
   * 1️⃣ Ensure user is authenticated
   */
  const { data: userData, error: userErr } = await supabase.auth.getUser()

  if (userErr || !userData.user) {
    redirect('/auth/login')
  }

  const user = userData.user

  /**
   * 2️⃣ Load organisations user belongs to (RBAC-aware)
   */
  const { data: organisations, error: orgErr } = await supabase
    .from('organisation_members')
    .select(
      `
      role_key,
      organisations (
        id,
        name
      )
    `
    )
    .eq('user_id', user.id)
    .returns<
      {
        role_key: OrganisationWithRole['role_key']
        organisations: OrganisationSummary
      }[]
    >()

  if (orgErr) {
    throw new Error(orgErr.message)
  }

  const orgs = organisations ?? []

  /**
   * 3️⃣ User must belong to at least one organisation
   */
  if (orgs.length === 0) {
    redirect('/onboarding/create-organisation')
  }

  /**
   * 4️⃣ Choose active organisation (v1 = first org)
   */
  const activeOrg: OrganisationWithRole = {
    ...orgs[0].organisations,
    role_key: orgs[0].role_key,
  }

  /**
   * 5️⃣ Enforce RBAC (member+ can access dashboard)
   */
  requireOrgRole(activeOrg.role_key, 'member')
  const dashboardData = await loadDashboardData(supabase, activeOrg)

const isAdmin = ['owner', 'admin'].includes(activeOrg.role_key)


  /**
   * 6️⃣ Render dashboard (composed UI)
   */
  return (
    <main className="p-8 space-y-8">
      <ComplianceSnapshot />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResponsibilityMap />
        <OrganisationOverview
          name={activeOrg.name}
          memberCount={dashboardData.memberCount}
        />
      </div>

      <LegalStatusTable documents={dashboardData.legalDocuments} />

      {isAdmin && <EvidenceLog events={dashboardData.evidenceLog} />}
    </main>
  )
}

