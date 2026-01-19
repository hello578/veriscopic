# Veriscopic Evidence Pack — v1.0 (Frozen)

Status: **FROZEN**  
This document defines the canonical JSON schema and invariants for Evidence Pack exports.

## Purpose

Evidence Packs provide a cryptographically verifiable export of an organisation’s governance artefacts (not a compliance opinion).

The canonical output is the **Evidence Pack JSON**. The PDF is a rendered view only.

## Canonical JSON Shape (v1.0)

Top-level fields:

- `evidence_pack_version`: `"1.0"`
- `organisation`: `{ id: string, name: string }`
- `generated_at`: ISO-8601 timestamp (UTC)
- `governance_snapshot`: object
- `legal_acceptance`: array
- `ai_systems`: array
- `ai_act_mapping`: array (derived, non-judgemental)
- `integrity`: `{ algorithm: "SHA-256", canonical_json_sha256: string }`

### governance_snapshot

- `ownership_model`: `"single-owner enforced"`
- `audit_logging`: `"enabled"`
- `organisation_events`: `{ event_type, occurred_at, actor_user_id }[]`
  - `occurred_at` MUST be ISO-8601 (UTC)
  - `actor_user_id` MAY be null (system events)

### legal_acceptance

Each item:

- `document_id`: UUID string
- `document_name`: string
- `document_type`: string | null
- `version`: string
- `jurisdiction`: string | null
- `content_hash`: string (sha-256 hex)
- `accepted_at`: ISO-8601 timestamp (UTC)
- `accepted_by_user_id`: UUID string

### ai_systems

Each item:

- `name`: string
- `purpose`: string
- `system_owner`: string | null
- `data_categories`: string[]
- `lifecycle_status`: string
- `last_updated`: ISO-8601 timestamp (UTC)

### ai_act_mapping

Derived mapping objects:

- `article`: string
- `expectation`: string
- `evidence_refs`: string[]

## Cryptographic Integrity (Invariants)

The field `integrity.canonical_json_sha256` MUST equal:

SHA-256 over the canonicalized JSON of the Evidence Pack **excluding**:
- `integrity`
- `signature` (if present in future versions)

Canonicalization rules:
- Recursively sort all object keys lexicographically
- Preserve array order
- Serialize with JSON.stringify (no whitespace formatting)

## Backwards compatibility

v1.0 is frozen. Future versions must:
- Keep `evidence_pack_version` semantic versioning
- Provide deterministic hashing rules
- Avoid breaking field renames; only additive changes where possible
