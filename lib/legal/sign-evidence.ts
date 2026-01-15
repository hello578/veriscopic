// lib/legal/sign-evidence.ts
// lib/legal/sign-evidence.ts

import crypto from 'crypto'

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
  // Canonical JSON (stable, deterministic)
  const canonicalJson = JSON.stringify(evidencePack)

  const checksum = crypto
    .createHash('sha256')
    .update(canonicalJson)
    .digest('hex')

  return {
    ...evidencePack,
    signature: {
      algorithm: 'SHA-256',
      checksum,
      signed_at: new Date().toISOString(),
      signed_by: 'veriscopic',
      note:
        'Checksum generated over full JSON payload to ensure integrity.',
    },
  }
}

