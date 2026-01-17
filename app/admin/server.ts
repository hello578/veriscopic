// app/admin/server.ts
// app/admin/server.ts
import 'server-only'
import { requireRole } from '@/lib/rbac/guards'

type AdminContext = {
  org: {
    id: string
    name: string
  }
  role: string
}

export async function getAdminContext(): Promise<AdminContext | null> {
  const guard = await requireRole(
    'org-id-goes-here',
    ['owner', 'admin']
  )

  if (
    !guard.ok ||
    !guard.ctx?.org ||
    !guard.ctx.role
  ) {
    return null
  }

  return {
    org: guard.ctx.org,
    role: guard.ctx.role,
  }
}


