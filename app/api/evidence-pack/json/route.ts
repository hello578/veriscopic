
// app/api/evidence-pack/json/route.ts
// app/api/evidence-pack/json/route.ts

import { NextResponse } from 'next/server'
import { requireRole } from '@/lib/rbac/guards'
import { requireFeature } from '@/lib/compliance/require-feature'
import { exportEvidencePack } from '@/lib/legal/export-evidence'
import { runDriftCheck } from '@/lib/legal/drift/run-drift-check'
import { supabaseServerWrite } from '@/lib/supabase/server-write'

export const runtime = 'nodejs'

/**
 * Evidence Pack JSON export
 *
 * GUARANTEES:
 * - Owner/Admin only
 * - Feature-flag enforced (evidence_pack)
 * - Canonical JSON returned to caller
 * - Drift detection runs (best-effort)
 * - Immutable snapshot persisted (append-only)
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const organisationId = searchParams.get('organisationId')

  if (!organisationId) {
    return NextResponse.json(
      { error: 'Missing organisationId' },
      { status: 400 }
    )
  }

  // ---------------------------------------------------------------------------
  // RBAC
  // ---------------------------------------------------------------------------
  const roleResult = await requireRole(organisationId, ['owner', 'admin'])
  if (!roleResult.ok) {
    return NextResponse.json(
      { error: 'Unauthorised' },
      { status: 401 }
    )
  }

  // ---------------------------------------------------------------------------
  // Feature gate
  // ---------------------------------------------------------------------------
  const enabled = await requireFeature(organisationId, 'evidence_pack')
  if (!enabled) {
    return NextResponse.json(
      {
        error: 'Evidence Pack export is not enabled for this organisation.',
        code: 'EVIDENCE_PACK_DISABLED',
      },
      { status: 403 }
    )
  }

  // ---------------------------------------------------------------------------
  // Canonical export (pure)
  // ---------------------------------------------------------------------------
  const pack = await exportEvidencePack(organisationId)

  // ---------------------------------------------------------------------------
  // Drift detection (best-effort, non-blocking)
  // ---------------------------------------------------------------------------
  try {
    await runDriftCheck(organisationId)
  } catch (err) {
    console.warn('[evidence-pack] drift check failed (non-blocking)', err)
  }

  // ---------------------------------------------------------------------------
  // Persist immutable snapshot (append-only)
  // ---------------------------------------------------------------------------
  const supabase = await supabaseServerWrite()

  const { error: insertErr } = await supabase
    .from('evidence_packs')
    .insert({
      organisation_id: organisationId,
      pack_version: pack.evidence_pack_version,
      canonical_json_sha256: pack.integrity.canonical_json_sha256,
      generated_at: pack.generated_at,
      generated_by: 'system',
      scope: 'full',
      json_snapshot: pack,
    })

  if (insertErr) {
    console.error('[evidence-pack] snapshot insert failed', insertErr)
    // IMPORTANT: never block export due to persistence failure
  }

  return NextResponse.json(pack, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}
