

// lib/legal/verify-evidence-pack.ts
import { sha256HexFromJson } from './evidence-pack-canonical'

/* ------------------------------------------------------------------
   Public result type
------------------------------------------------------------------- */

export type VerificationResult =
  | { ok: true }
  | {
      ok: false
      reason: string
      expected?: string
      actual?: string
    }

/* ------------------------------------------------------------------
   Canonical JSON type
------------------------------------------------------------------- */

type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json }

/* ------------------------------------------------------------------
   Evidence pack internal shapes
------------------------------------------------------------------- */

type EvidencePackIntegrity = {
  canonical_json_sha256: string
}

type EvidencePackSignature = {
  checksum?: string
}

type EvidencePack = {
  integrity: EvidencePackIntegrity
  signature?: EvidencePackSignature
  [key: string]: unknown
}

/* ------------------------------------------------------------------
   Type guards
------------------------------------------------------------------- */

function isJson(value: unknown): value is Json {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return true
  }

  if (Array.isArray(value)) {
    return value.every(isJson)
  }

  if (typeof value === 'object') {
    return Object.values(value).every(isJson)
  }

  return false
}

function isEvidencePack(value: unknown): value is EvidencePack {
  if (!value || typeof value !== 'object') return false

  const v = value as Record<string, unknown>
  const integrity = v.integrity as Record<string, unknown> | undefined

  return (
    !!integrity &&
    typeof integrity.canonical_json_sha256 === 'string'
  )
}

/* ------------------------------------------------------------------
   Verification
------------------------------------------------------------------- */

export function verifyEvidencePack(
  pack: unknown
): VerificationResult {
  if (!isEvidencePack(pack)) {
    return {
      ok: false,
      reason: 'Missing or invalid integrity.canonical_json_sha256',
    }
  }

  const { integrity, signature, ...core } = pack

  if (!isJson(core)) {
    return {
      ok: false,
      reason: 'Evidence Pack core is not valid JSON',
    }
  }

  const { checksum } = sha256HexFromJson(core)

  if (checksum !== integrity.canonical_json_sha256) {
    return {
      ok: false,
      reason: 'Checksum mismatch',
      expected: integrity.canonical_json_sha256,
      actual: checksum,
    }
  }

  if (
    signature?.checksum &&
    signature.checksum !== checksum
  ) {
    return {
      ok: false,
      reason: 'Signature checksum mismatch',
      expected: checksum,
      actual: signature.checksum,
    }
  }

  return { ok: true }
}
