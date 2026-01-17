// app/api/legal/documents/[documentId]/pdf/route.ts
import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import { requireMember } from '@/lib/rbac/guards'
import { exportEvidencePack } from '@/lib/legal/export-evidence'
import { signEvidencePack } from '@/lib/legal/sign-evidence'

export async function GET(
  _request: NextRequest,
  context: {
    params: Promise<{ documentId: string }>
  }
) {
  const { documentId } = await context.params

  // ⬇️ TEMP: documentId maps to organisationId for now
  // (adjust when documents are org-scoped properly)
  const organisationId = documentId

  // --- AuthN
  const result = await requireMember(organisationId)

  if (!result.ok || !result.ctx) {
    return NextResponse.json(
      { error: 'Unauthorised' },
      { status: 401 }
    )
  }

  // --- AuthZ
  const { role } = result.ctx
  if (!role || !['owner', 'admin'].includes(role)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }

  // --- Build evidence payload (JSON for now)
  const evidencePack = await exportEvidencePack(organisationId)
  const signedPack = signEvidencePack(evidencePack)

  return NextResponse.json(signedPack, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

