// lib/legal/verify-evidence.ts

import crypto from 'crypto'

export function verifyEvidencePack(
  unsignedPack: object,
  expectedChecksum: string
): boolean {
  const canonicalJson = JSON.stringify(unsignedPack)

  const computed = crypto
    .createHash('sha256')
    .update(canonicalJson)
    .digest('hex')

  return computed === expectedChecksum
}
