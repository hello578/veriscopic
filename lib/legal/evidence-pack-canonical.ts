// lib/legal/evidence-pack-canonical.ts
import crypto from "crypto";

type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json };

/**
 * Recursively sorts object keys for deterministic JSON output.
 * Arrays preserve order (your evidence ordering should already be deterministic).
 */
export function canonicalizeJson(value: Json): Json {
  if (Array.isArray(value)) return value.map(canonicalizeJson);
  if (value && typeof value === "object") {
    const obj = value as Record<string, Json>;
    const sortedKeys = Object.keys(obj).sort();
    const out: Record<string, Json> = {};
    for (const k of sortedKeys) out[k] = canonicalizeJson(obj[k]);
    return out;
  }
  return value;
}

export function sha256HexFromString(input: string): string {
  return crypto.createHash("sha256").update(input, "utf8").digest("hex");
}

export function sha256HexFromJson(value: Json): { canonical: string; checksum: string } {
  const canonicalObj = canonicalizeJson(value);
  const canonical = JSON.stringify(canonicalObj);
  return { canonical, checksum: sha256HexFromString(canonical) };
}
