
// app/api/evidence-pack/json/route.ts

import { NextResponse } from 'next/server'
import { exportEvidencePack } from '@/lib/legal/export-evidence'
import { requireRole } from '@/lib/rbac/guards'
import { requireFeature } from '@/lib/compliance/require-feature'
import { supabaseServerWrite } from '@/lib/supabase/server-write'
import { runDriftCheck } from '@/lib/legal/drift/run-drift-check'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const organisationId = searchParams.get('organisationId')

  if (!organisationId) {
    return NextResponse.json(
      { error: 'Missing organisationId' },
      { status: 400 }
    )
  }

  // --- RBAC: owner/admin only
  await requireRole(organisationId, ['owner', 'admin'])

  // --- Feature gate: Evidence Pack
  const hasEvidencePack = await requireFeature(
    organisationId,
    'evidence_pack'
  )

  if (!hasEvidencePack) {
    return NextResponse.json(
      {
        error:
          'Evidence Pack export is not enabled for this organisation.',
      },
      { status: 403 }
    )
  }

  // --- Canonical export (PURE)
  const pack = await exportEvidencePack(organisationId)

  // 🔍 Detect governance drift against last sealed pack
await runDriftCheck(organisationId)


  // --- Persist immutable snapshot (append-only)
  const supabase = await supabaseServerWrite()

  await supabase.from('evidence_packs').insert({
    organisation_id: organisationId,
    pack_version: pack.evidence_pack_version,
    canonical_json_sha256: pack.integrity.canonical_json_sha256,
    generated_at: pack.generated_at,
    generated_by: 'system',
    scope: 'full',
    json_snapshot: pack,
  })

  return NextResponse.json(pack, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}
