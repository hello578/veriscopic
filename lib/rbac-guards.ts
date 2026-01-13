import { redirect } from 'next/navigation'
import { getUserOrgContext, Role } from '@/lib/rbac'

export async function requireRole(allowed: Role[]) {
  const ctx = await getUserOrgContext()

  if (!ctx.user) redirect('/auth/login')
  if (!ctx.org || !ctx.role) redirect('/dashboard')

  if (!allowed.includes(ctx.role)) {
    redirect('/dashboard')
  }

  return ctx
}
