import { redirect } from 'next/navigation'
import { requireRole } from '@/lib/rbac/guards'

export default async function OrganisationDashboardPage({
  params,
}: {
  params: Promise<{ organisationId: string }>
}) {
  // ✅ REQUIRED in Next.js 16
  const { organisationId } = await params

  const result = await requireRole(organisationId, [
    'owner',
    'admin',
    'member',
  ])

  if (!result.ok) {
    if (result.reason === 'unauthenticated') {
      redirect('/auth/login')
    }

    if (result.reason === 'no-org') {
      redirect('/onboarding/create-organisation')
    }

    redirect('/')
  }

  const { ctx } = result

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">
        {ctx.org.name}
      </h1>

      <p className="text-muted-foreground">
        Role: {ctx.role}
      </p>
    </main>
  )
}



