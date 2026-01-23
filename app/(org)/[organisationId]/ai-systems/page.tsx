// app/(org)/[organisationId]/ai-systems/page.tsx
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { requireMember } from '@/lib/rbac/guards'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { AISystemsClient } from '@/components/ai/ai-systems-client'

export default async function AISystemsPage({
  params,
}: {
  params: Promise<{ organisationId: string }>
}) {
  const { organisationId } = await params

  const membership = await requireMember(organisationId)
  if (!membership.ok) {
    redirect(membership.reason === 'unauthenticated' ? '/auth/login' : '/')
  }

  const supabase = await supabaseServerRead()

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

        <section className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            AI systems
          </h1>
          <p className="text-sm text-slate-600">
            Declare the AI systems used by your organisation.
          </p>
        </section>

        <AISystemsClient
          organisationId={organisationId}
          initialSystems={systems ?? []}
        />
      </div>
    </main>
  )
}
