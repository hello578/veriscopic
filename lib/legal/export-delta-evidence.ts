
//lib/legal/export-delta-evidence.ts

// lib/legal/export-delta-evidence.ts
import 'server-only'

import type { EvidencePack } from '@/lib/legal/export-evidence'
import { sha256HexFromJson } from '@/lib/legal/evidence-pack-canonical'
import { detectDrift, type DriftItem } from '@/lib/legal/drift/detect-drift'

/**
 * Supabase-compatible Json type.
 * Keeps sha256HexFromJson() happy and prevents `unknown` leakage into jsonb.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export type DeltaEvidencePack = {
  delta_version: '1.0'

  organisation_id: string

  from_pack_hash: string
  to_pack_hash: string

  generated_at: string

  drift_summary: {
    has_drift: boolean
    drift_item_count: number
    informational_count: number
    material_count: number
    highest_severity: 'informational' | 'material' | null
  }

  drift_items: DriftItem[]

  integrity: {
    algorithm: 'SHA-256'
    canonical_json_sha256: string
  }
}

/**
 * Converts unknown → Json safely.
 * - undefined → null
 * - strips non-serialisable values via JSON stringify/parse
 */
function toJsonSafe(value: unknown): Json {
  if (value === undefined) return null
  try {
    return JSON.parse(JSON.stringify(value)) as Json
  } catch {
    // If something truly non-serialisable sneaks in, we still must not break hashing.
    return null
  }
}

export function exportDeltaEvidence(
  previous: EvidencePack,
  current: EvidencePack
): DeltaEvidencePack {
  const drift = detectDrift(previous, current)
  const generated_at = new Date().toISOString()

  // Ensure drift items are JSON-safe for hashing + jsonb persistence
  const drift_items_safe: DriftItem[] = drift.drift_items.map((it) => ({
    ...it,
    before: toJsonSafe(it.before),
    after: toJsonSafe(it.after),
  }))

  // This `core` must be Json-compatible for sha256HexFromJson()
  const core: Json = {
    delta_version: '1.0',
    organisation_id: current.organisation.id,
    from_pack_hash: previous.integrity.canonical_json_sha256,
    to_pack_hash: current.integrity.canonical_json_sha256,
    generated_at,
    drift_summary: {
      has_drift: drift.has_drift,
      drift_item_count: drift_items_safe.length,
      informational_count: drift.informational_count,
      material_count: drift.material_count,
      highest_severity: drift.highest_severity,
    },
    drift_items: drift_items_safe as unknown as Json, // safe because DriftItem now contains Json-safe before/after
  }

  const { checksum } = sha256HexFromJson(core)

  // Return strongly typed delta pack
  return {
    delta_version: '1.0',
    organisation_id: current.organisation.id,
    from_pack_hash: previous.integrity.canonical_json_sha256,
    to_pack_hash: current.integrity.canonical_json_sha256,
    generated_at,
    drift_summary: {
      has_drift: drift.has_drift,
      drift_item_count: drift_items_safe.length,
      informational_count: drift.informational_count,
      material_count: drift.material_count,
      highest_severity: drift.highest_severity,
    },
    drift_items: drift_items_safe,
    integrity: {
      algorithm: 'SHA-256',
      canonical_json_sha256: checksum,
    },
  }
}
