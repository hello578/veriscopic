// lib/legal/verify-evidence-pack.ts

// lib/legal/verify-evidence-pack.ts
import { sha256HexFromJson } from './evidence-pack-canonical'

export type VerificationResult =
  | { ok: true }
  | {
      ok: false
      reason: string
      expected?: string
      actual?: string
    }

export function verifyEvidencePack(
  pack: any
): VerificationResult {
  if (!pack?.integrity?.canonical_json_sha256) {
    return {
      ok: false,
      reason: 'Missing integrity.canonical_json_sha256',
    }
  }

  // Remove integrity before recomputing hash
  const { integrity, signature, ...core } = pack

  const { checksum } = sha256HexFromJson(core)

  if (checksum !== integrity.canonical_json_sha256) {
    return {
      ok: false,
      reason: 'Checksum mismatch',
      expected: integrity.canonical_json_sha256,
      actual: checksum,
    }
  }

  // Optional: verify signature checksum too
  if (signature?.checksum && signature.checksum !== checksum) {
    return {
      ok: false,
      reason: 'Signature checksum mismatch',
      expected: checksum,
      actual: signature.checksum,
    }
  }

  return { ok: true }
}
