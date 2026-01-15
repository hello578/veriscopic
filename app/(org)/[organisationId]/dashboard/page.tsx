import { requireRole } from '@/lib/rbac/guards'

export default async function OrganisationDashboardPage({
  params,
}: {
  params: Promise<{ organisationId: string }>
}) {
  const { organisationId } = await params

  // 🔐 RBAC enforcement ONLY
  const ctx = await requireRole(organisationId, [
    'owner',
    'admin',
    'member',
  ])

  // ⛔ NO redirects after this point

  return (
    <main className="p-10 space-y-2">
      <h1 className="text-2xl font-bold">
        {ctx.org!.name}
      </h1>

      <p className="text-muted-foreground">
        Role: {ctx.role}
      </p>
    </main>
  )
}


