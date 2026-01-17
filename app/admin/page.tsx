// app/admin/page.tsx
import { requireRole } from '@/lib/rbac/guards'

export default async function AdminPage() {
  const guard = await requireRole(
    'org-id-goes-here',
    ['owner', 'admin']
  )

  if (!guard.ok || !guard.ctx?.org) {
    return (
      <main className="p-10">
        <h1 className="text-xl font-semibold">
          Access denied
        </h1>
      </main>
    )
  }

  const { org, role } = guard.ctx

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Admin panel</h1>
      <p className="mt-4">
        Organisation: {org.name} — Role: {role}
      </p>
    </main>
  )
}

