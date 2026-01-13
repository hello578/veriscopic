import { redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'

import { requireOrgRole } from '@/lib/rbac'
import type {
  OrganisationSummary,
  OrganisationWithRole,
} from '@/lib/types/organisation'

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

  /**
   * 6️⃣ Render dashboard
   */
  return (
    <main className="p-10 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Organisation: <strong>{activeOrg.name}</strong>
        </p>
        <p className="text-sm text-gray-500">
          Role: {activeOrg.role_key}
        </p>
      </header>

      <section className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold">
          Welcome, {user.email}
        </h2>
        <p className="mt-2 text-gray-600">
          This is your Veriscopic control centre.
        </p>
      </section>
    </main>
  )
}
