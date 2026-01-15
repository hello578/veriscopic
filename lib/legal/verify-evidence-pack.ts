// lib/legal/verify-evidence-pack.ts
import crypto from "crypto";
import { sha256HexFromJson } from "./evidence-pack-canonical";
import type { EvidencePack } from "./export-evidence";

export function verifyEvidencePack(pack: EvidencePack): { ok: boolean; expected: string; got: string } {
  const { checksum } = pack;
  if (!checksum || checksum.algorithm !== "SHA-256" || !checksum.canonical_json_sha256) {
    return { ok: false, expected: "", got: "" };
  }

  // Recompute over the pack core ONLY (exclude checksum itself)
  const packCore = {
    organisation_id: pack.organisation_id,
    generated_at: pack.generated_at,
    evidence: pack.evidence,
  };

  const { checksum: expected } = sha256HexFromJson(packCore as any);
  const got = checksum.canonical_json_sha256;

  // Constant-time compare
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(got, "hex");
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);

  return { ok, expected, got };
}
