
// lib/legal/drift/run-drift-check.ts

// GOLD STANDARD: Drift orchestration v1.0
// Do not mutate without audit review
// lib/legal/drift/run-drift-check.ts
import 'server-only'

import { supabaseServerWrite } from '@/lib/supabase/server-write'
import { exportEvidencePack } from '@/lib/legal/export-evidence'
import { exportDeltaEvidence } from '@/lib/legal/export-delta-evidence'

export async function runDriftCheck(organisationId: string) {
  const supabase = await supabaseServerWrite()

  // 1️⃣ Load previous pack (if any)
  const { data: previousPack } = await supabase
    .from('evidence_packs')
    .select('id, json_snapshot')
    .eq('organisation_id', organisationId)
    .order('generated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  // 2️⃣ Always generate a fresh pack
  const currentPack = await exportEvidencePack(organisationId)

  // 3️⃣ Persist current pack
  const { data: currentInsert, error } = await supabase
    .from('evidence_packs')
    .insert({
      organisation_id: organisationId,
      pack_version: currentPack.evidence_pack_version,
      canonical_json_sha256: currentPack.integrity.canonical_json_sha256,
      generated_at: currentPack.generated_at,
      generated_by: 'system',
      scope: 'full',
      json_snapshot: currentPack,
    })
    .select('id')
    .single()

  if (error || !currentInsert) {
    throw new Error('Failed to persist evidence pack')
  }

  // 4️⃣ If no previous pack, record "checked, no baseline"
  if (!previousPack) {
    await supabase.from('drift_events').insert({
      organisation_id: organisationId,
      from_pack_id: null,
      to_pack_id: currentInsert.id,
      has_drift: false,
      detected_at: currentPack.generated_at,
      drift_hash: currentPack.integrity.canonical_json_sha256,
      delta_snapshot: null,
    })

    return { has_drift: false, baseline_created: true }
  }

  // 5️⃣ Generate delta
  const delta = exportDeltaEvidence(
    previousPack.json_snapshot,
    currentPack
  )

  // 6️⃣ Persist drift event (CRITICAL)
  await supabase.from('drift_events').insert({
    organisation_id: organisationId,
    from_pack_id: previousPack.id,
    to_pack_id: currentInsert.id,
    has_drift: delta.drift_summary.has_drift,
    detected_at: delta.generated_at,
    drift_hash: delta.integrity.canonical_json_sha256,
    delta_snapshot: delta,
  })

  return delta
}
