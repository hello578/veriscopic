/**
 * RBAC guards temporarily disabled while auth stabilises.
 * Do NOT use in production enforcement yet.
 */

export async function requireRole() {
  console.log('[rbac] requireRole disabled during auth stabilisation')
  return null
}



