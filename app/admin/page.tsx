// app/admin/page.tsx
// app/admin/page.tsx
import { getAdminContext } from './server'

export default async function AdminPage() {
  const ctx = await getAdminContext()

  if (!ctx) {
    return (
      <main className="p-10">
        <h1 className="text-xl font-semibold">
          Access denied
        </h1>
      </main>
    )
  }

  const { org, role } = ctx

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Admin panel</h1>
      <p className="mt-4">
        Organisation: {org.name} — Role: {role}
      </p>
    </main>
  )
}

