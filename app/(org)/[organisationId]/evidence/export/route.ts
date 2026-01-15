// app/(org)/[organisationId]/evidence/export/route.ts


import { NextResponse } from 'next/server'
import { requireMember } from '@/lib/rbac/guards'
import { exportEvidencePack } from '@/lib/legal/export-evidence'
import { signEvidencePack } from '@/lib/legal/sign-evidence'

export async function GET(
  _req: Request,
  { params }: { params: { organisationId?: string } }
) {
  const organisationId = params.organisationId

  if (!organisationId) {
    return NextResponse.json(
      { error: 'Missing organisationId' },
      { status: 400 }
    )
  }

  const result = await requireMember(organisationId)

  if (!result.ok) {
    return NextResponse.json(
      { error: 'Unauthorised' },
      { status: 401 }
    )
  }

  const { ctx } = result

  if (!ctx.role || !['owner', 'admin'].includes(ctx.role)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }

  const evidencePack = await exportEvidencePack(organisationId)
  const signedPack = signEvidencePack(evidencePack)

  return new NextResponse(JSON.stringify(signedPack, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="veriscopic-evidence-${organisationId}.json"`,
      'Cache-Control': 'no-store',
    },
  })
}
