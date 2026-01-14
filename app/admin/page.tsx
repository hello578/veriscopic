import { requireRole } from '@/lib/types/rbac-guards'

export default async function AdminPage() {
  const { org, role } = await requireRole(['owner', 'admin'])

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Admin panel</h1>
      <p className="mt-4">
        Organisation: {org[0].name} — Role: {role}
      </p>
    </main>
  )
}
