// app/(org)/[organisationId]/ai-systems/page.tsx
// app/(org)/[organisationId]/ai-systems/page.tsx

import Link from 'next/link'
import { redirect } from 'next/navigation'

import { requireMember } from '@/lib/rbac/guards'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { RegisterAISystemModal } from '@/components/ai/register-ai-system-modal'
import { AISystemsTable } from '@/components/ai/ai-systems-table'

export default async function AISystemsPage({
  params,
}: {
  params: Promise<{ organisationId: string }>
}) {
  const { organisationId } = await params

  // --------------------------------------------------
  // Auth / membership
  // --------------------------------------------------
  const membership = await requireMember(organisationId)
  if (!membership.ok) {
    redirect(membership.reason === 'unauthenticated' ? '/auth/login' : '/')
  }

  const supabase = await supabaseServerRead()

  // --------------------------------------------------
  // Fetch AI systems
  // --------------------------------------------------
  const { data: systems } = await supabase
    .from('ai_systems')
    .select(
      `
      id,
      name,
      purpose,
      lifecycle_status,
      system_owner,
      is_operational,
      updated_at
    `
    )
    .eq('organisation_id', organisationId)
    .order('created_at', { ascending: true })

  return (
    <main className="py-12">
      <div className="mx-auto max-w-5xl px-6 space-y-10">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500">
          <Link
            href={`/${organisationId}/dashboard`}
            className="hover:text-slate-700"
          >
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-700">AI systems</span>
        </div>

        {/* Page header */}
        <section className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            AI systems
          </h1>
          <p className="text-sm text-slate-600">
            Declare the AI systems used by your organisation. These records form
            a core input to your AI Governance Evidence Pack.
          </p>
        </section>

        {/* Why this matters */}
        <section className="rounded-md border bg-slate-50 p-6 space-y-2">
          <p className="text-sm font-medium text-slate-900">
            Why this is required
          </p>
          <p className="text-sm text-slate-600">
            Enterprise customers, insurers, and regulators increasingly expect
            organisations to document which AI systems are in use, their purpose,
            and whether they are operational.
          </p>
          <p className="text-xs text-slate-500">
            Veriscopic records declared facts only. No risk scoring or compliance
            judgement is performed.
          </p>
        </section>

        {/* Declared systems */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-slate-900">
              Declared systems
            </h2>

            <button
              disabled
              className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 cursor-not-allowed"
            >
              Register AI system
            </button>
          </div>

          <RegisterAISystemModal
            organisationId={organisationId}
            onCreated={() => window.location.reload()}
          />

          {systems && systems.length > 0 ? (
            <AISystemsTable
              organisationId={organisationId}
              systems={systems}
            />
          ) : (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-900">
                No AI systems declared
              </p>
              <p className="text-xs text-amber-700">
                At least one AI system must be recorded to complete governance
                setup and enable full Evidence Pack generation.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

