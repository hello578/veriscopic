// lib/legal/evidence-pack-canonical.ts

import crypto from 'crypto'

/**
 * Supabase-compatible JSON type.
 * This MUST match what can safely be stored in jsonb.
 */
export type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json }

/**
 * Recursively sorts object keys for deterministic JSON output.
 * Arrays preserve order (ordering must already be deterministic upstream).
 */
export function canonicalizeJson(value: Json): Json {
  if (Array.isArray(value)) {
    return value.map(canonicalizeJson)
  }

  if (value && typeof value === 'object') {
    const obj = value as Record<string, Json>
    const sortedKeys = Object.keys(obj).sort()

    const out: Record<string, Json> = {}
    for (const key of sortedKeys) {
      out[key] = canonicalizeJson(obj[key])
    }

    return out
  }

  return value
}

export function sha256HexFromString(input: string): string {
  return crypto
    .createHash('sha256')
    .update(input, 'utf8')
    .digest('hex')
}

/**
 * Canonicalises JSON then hashes it.
 * This is the ONLY hashing primitive auditors should rely on.
 */
export function sha256HexFromJson(
  value: Json
): { canonical: string; checksum: string } {
  const canonicalObj = canonicalizeJson(value)
  const canonical = JSON.stringify(canonicalObj)
  const checksum = sha256HexFromString(canonical)

  return { canonical, checksum }
}
