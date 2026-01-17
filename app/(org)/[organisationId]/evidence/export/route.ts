// app/(org)/[organisationId]/evidence/export/route.ts
import 'server-only'

import { NextRequest, NextResponse } from 'next/server'
import { requireMember } from '@/lib/rbac/guards'
import { exportEvidencePack } from '@/lib/legal/export-evidence'
import { signEvidencePack } from '@/lib/legal/sign-evidence'

export async function GET(
  _request: NextRequest,
  context: {
    params: Promise<{ organisationId: string }>
  }
) {
  const { organisationId } = await context.params

  // --- AuthN: must be a member of the organisation
  const result = await requireMember(organisationId)

  if (!result.ok || !result.ctx) {
    return NextResponse.json(
      { error: 'Unauthorised' },
      { status: 401 }
    )
  }

  const { role } = result.ctx

  // --- AuthZ: only owner/admin may export evidence
  if (!role || !['owner', 'admin'].includes(role)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }

  // --- Evidence export + signing
  const evidencePack = await exportEvidencePack(organisationId)
  const signedPack = signEvidencePack(evidencePack)

  // --- Response as downloadable, non-cacheable artefact
  return new NextResponse(
    JSON.stringify(signedPack, null, 2),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="veriscopic-evidence-${organisationId}.json"`,
        'Cache-Control': 'no-store',
      },
    }
  )
}
