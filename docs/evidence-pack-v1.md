# Veriscopic — Evidence Pack v1.0 (Authoritative)

_Last updated: 2026-01-18_

## Purpose
The Evidence Pack is a cryptographically verifiable export of governance evidence for an organisation.
It is designed for procurement, audit review, insurers, investors, and regulators.

The Evidence Pack does **not**:
- certify compliance
- provide legal advice
- perform risk classification

## Canonical Truth Model
- The Evidence Pack JSON is the **single source of truth** for an export.
- The PDF is a **rendered view** of the Evidence Pack JSON.
- There is no parallel truth stored elsewhere.

## Data Sources (Supabase)
The pack is derived from immutable / append-only governance tables, including:
- organisations
- organisation_events (append-only)
- terms_acceptance (append-only acceptance evidence)
- legal_documents (immutable versions)
- ai_systems (declared systems registry)

## Evidence Pack JSON Schema (v1.0)
The canonical export is shaped as:

- evidence_pack_version: "1.0"
- organisation: { id, name }
- generated_at: ISO-8601 UTC timestamp
- governance_snapshot:
  - ownership_model: "single-owner enforced"
  - audit_logging: "enabled"
  - organisation_events: [{ event_type, occurred_at, actor_user_id }]
- legal_acceptance: [{
  document_id,
  document_name,
  document_type,
  version,
  jurisdiction,
  content_hash,
  accepted_at,
  accepted_by_user_id
}]
- ai_systems: [{
  name,
  purpose,
  system_owner,
  data_categories,
  lifecycle_status,
  last_updated
}]
- ai_act_mapping: [{ article, expectation, evidence_refs }]
- integrity:
  - algorithm: "SHA-256"
  - canonical_json_sha256: string

## Deterministic Hashing Rules (Non-negotiable)
- The integrity hash is computed over the Evidence Pack JSON **excluding**:
  - integrity
  - signature
- Canonicalization:
  - object keys are sorted recursively
  - arrays preserve order
- The SHA-256 is calculated over the canonicalized JSON string.

## Signing
- A `signature` field may be attached for convenience.
- Signature checksum must match the canonical hash.
- Signature is not required for third-party verification.

## Invariants (Hard Rules)
- Acceptance evidence is append-only; rows are never updated or deleted.
- Legal document versions are immutable; content never changes post-publish.
- Exports must be generated server-side; client state is never trusted.
- Emails are not embedded in the canonical pack (use user_id only).
- PDF generation must consume the pack JSON and must not re-query the DB.

## Verification
Third parties can verify integrity by:
1) Remove `integrity` and `signature`
2) Canonicalize the remainder
3) SHA-256 hash
4) Compare to integrity.canonical_json_sha256

If checksums match, the pack content has not been altered since export.

## Versioning Policy
- Any schema change requires bumping evidence_pack_version (e.g., 1.1).
- Old versions remain verifiable under their own canonicalization rules.
