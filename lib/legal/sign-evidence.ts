
// lib/legal/sign-evidence.ts

// lib/legal/sign-evidence.ts

import { sha256HexFromJson } from './evidence-pack-canonical'

/**
 * Canonical JSON type (inline, local)
 * Do NOT loosen this.
 */
type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json }

export interface EvidenceSignature {
  algorithm: 'SHA-256'
  checksum: string
  signed_at: string
  signed_by: 'veriscopic'
  note: string
}

/**
 * Signs an evidence object by attaching a Veriscopic signature block.
 *
 * IMPORTANT:
 * - evidencePack MUST already be JSON-serialisable
 * - canonical hashing enforces this invariant
 */
export function signEvidencePack<T extends Record<string, unknown>>(
  evidencePack: T
): T & { signature: EvidenceSignature } {
  /**
   * Intentional boundary cast:
   * - Evidence packs are constructed exclusively from JSON-safe primitives
   * - sha256HexFromJson will throw if this is violated
   */
  const { checksum } = sha256HexFromJson(evidencePack as Json)

  return {
    ...evidencePack,
    signature: {
      algorithm: 'SHA-256',
      checksum,
      signed_at: new Date().toISOString(),
      signed_by: 'veriscopic',
      note:
        'Checksum generated over canonical JSON payload to ensure integrity.',
    },
  }
}
