// lib/legal/sign-evidence.ts

import { sha256HexFromJson } from './evidence-pack-canonical'

export interface EvidenceSignature {
  algorithm: 'SHA-256'
  checksum: string
  signed_at: string
  signed_by: 'veriscopic'
  note: string
}

export function signEvidencePack<T extends object>(
  evidencePack: T
): T & { signature: EvidenceSignature } {
  // IMPORTANT: hash canonical JSON, not raw stringify
  const { checksum } = sha256HexFromJson(evidencePack as any)

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
