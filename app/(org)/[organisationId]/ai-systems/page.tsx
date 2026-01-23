// app/(org)/[organisationId]/ai-systems/page.tsx

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { requireMember } from '@/lib/rbac/guards'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus } from 'lucide-react'

type PageProps = {
  params: Promise<{ organisationId: string }>
}

export default async function AISystemsPage({ params }: PageProps) {
  const { organisationId } = await params

  // ── Auth / membership
  const membership = await requireMember(organisationId)
  if (!membership.ok) {
    redirect(membership.reason === 'unauthenticated' ? '/auth/login' : '/')
  }

  const supabase = await supabaseServerRead()

  // ── Fetch AI systems
  const { data: systems } = await supabase
    .from('ai_systems')
    .select(
      `
      id,
      name,
      purpose,
      lifecycle_status,
      system_owner,
      data_categories,
      created_at
    `
    )
    .eq('organisation_id', organisationId)
    .order('created_at', { ascending: true })

  const hasSystems = (systems?.length ?? 0) > 0

  return (
    <main className="py-12">
      <div className="mx-auto max-w-4xl px-6 space-y-10">

        {/* Breadcrumb */}
        <div className="text-xs text-slate-500">
          <Link
            href={`/${organisationId}/dashboard`}
            className="hover:text-slate-700"
          >
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 font-medium">AI systems</span>
        </div>

        {/* Header */}
        <section className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            AI systems registry
          </h1>
          <p className="text-sm text-slate-600">
            Declare the AI systems used by your organisation. These declarations
            are included verbatim in your Governance Evidence Pack.
          </p>
        </section>

        {/* Why this matters */}
        <section className="rounded-md border bg-slate-50 p-6 space-y-2">
          <p className="text-sm font-medium text-slate-900">
            Why this is required
          </p>
          <p className="text-sm text-slate-600">
            Regulators, enterprise customers, and insurers increasingly expect
            organisations to maintain a factual register of AI systems in use,
            including purpose, lifecycle status, and accountability.
          </p>
          <p className="text-xs text-slate-500">
            Veriscopic records declared facts only. No risk scoring or compliance
            judgement is performed.
          </p>
        </section>

        {/* Registry */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Declared systems
            </h2>

            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Declare AI system
            </Button>
          </div>

          {!hasSystems ? (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-900">
                No AI systems declared
              </p>
              <p className="text-xs text-amber-700">
                At least one AI system must be recorded to complete governance
                setup and enable full Evidence Pack generation.
              </p>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <p className="text-xs text-slate-500">
                  {systems!.length} system{systems!.length > 1 ? 's' : ''} declared
                </p>
              </CardHeader>

              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead className="border-b bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Name</th>
                      <th className="px-4 py-2 text-left font-medium">Purpose</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2 text-left font-medium">Owner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {systems!.map((s) => (
                      <tr key={s.id}>
                        <td className="px-4 py-2 font-medium text-slate-900">
                          {s.name}
                        </td>
                        <td className="px-4 py-2 text-slate-700">
                          {s.purpose}
                        </td>
                        <td className="px-4 py-2">
                          <Badge variant="secondary">
                            {s.lifecycle_status}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 text-slate-700">
                          {s.system_owner ?? '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Navigation hint */}
        <section className="border-t pt-6">
          <p className="text-xs text-slate-500">
            Next: once at least one AI system is declared, your governance status
            becomes <strong>Operational</strong> and the Evidence Pack will
            include AI system disclosures automatically.
          </p>
        </section>

      </div>
    </main>
  )
}
