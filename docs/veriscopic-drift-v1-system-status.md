# Veriscopic — Drift v1.0 System Status & Rationale

_Last updated: 2026-01-21_

---

## 1. Executive summary

Veriscopic Drift v1.0 is now a **working, credible AI governance evidence system**.

It produces:
- Deterministic, audit-ready Evidence Packs
- Cryptographically verifiable JSON + PDF artefacts
- Clear separation between **declared facts** and **interpretation**
- A public redacted sample pipeline that cannot leak private data

This milestone locks the **core architecture** and establishes the foundation on which Drift v1 can safely expand.

---

## 2. Product intent (locked, non-negotiable)

Veriscopic is **not** a compliance engine.

It exists to:
- Record governance facts
- Bind them immutably to evidence
- Export regulator-legible artefacts

It explicitly does **not**:
- Score compliance
- Classify AI Act risk
- Provide legal advice
- Certify adequacy

This restraint is deliberate and central to credibility.

---

## 3. What is now COMPLETE and considered GOLD STANDARD

### 3.1 Evidence Pack pipeline (CORE ASSET)

**Status: LOCKED**

- Canonical EvidencePack JSON schema (v1.0)
- Deterministic SHA-256 hash over canonical JSON
- Full PDF renderer (PDFKit, Node runtime)
- Sample PDF renderer with **post-render truncation**
- Sample pack capped at **5 pages**, guaranteed
- Full pack renders complete content (variable length)
- PDF integrity references canonical hash
- Sample vs full mode does **not** affect hash inputs

**Key files**
- `lib/legal/export-evidence.ts`
- `lib/legal/export-evidence-sample.ts`
- `lib/legal/export-evidence-pdf.ts`
- `lib/legal/export-evidence-pdf-core.ts`
- `app/api/evidence-pack/pdf/route.ts`
- `app/api/evidence-pack/pdf-sample/route.ts`
- `app/api/evidence-pack/json/route.ts`

⚠️ **Do not redesign EvidencePack structure**
Extensions may add fields, not reinterpret existing ones.

---

### 3.2 Public sample Evidence Pack (critical trust feature)

**Status: COMPLETE**

- Dedicated API route: `/api/evidence-pack/pdf-sample`
- Accepts `organisationId=sample`
- Does not depend on Supabase organisation records
- Cannot error due to missing org data
- Always renders deterministic 5-page output

This is intentionally **separate** from live org data.

---

### 3.3 Legal document versioning & acceptance

**Status: FUNCTIONAL**

- Platform-issued legal documents
- Versioned
- Content hashed
- Immutable acceptance records
- Acceptance evidence feeds Evidence Pack

**Tables**
- `legal_documents`
- `legal_documents_current`
- `terms_acceptance`

Acceptance is append-only and auditable.

---

### 3.4 AI Systems Registry (Drift v1 extension)

**Status: STRUCTURALLY COMPLETE**

- `ai_systems` table added
- Organisation-scoped
- Declarative only
- No risk classification
- No scoring
- No validation beyond presence

Fields:
- name
- purpose
- lifecycle_status
- system_owner
- data_categories
- timestamps

AI systems now appear in Evidence Packs when declared.

---

### 3.5 Governance completeness indicator

**Status: STABLE**

- Completeness is evidence-based, not judgement-based
- Shows whether artefacts exist
- No scoring language
- No compliance claims

Key file:
- `lib/compliance/get-completeness.ts`
- `dashboard/components/compliance-completeness-card.tsx`

---

## 4. Supabase integrity checks (IMPORTANT)

The following assumptions are now relied upon:

### Required constraints
- `terms_acceptance` unique constraint on:
  - `(organisation_id, document_id, content_hash)`
- `organisation_members` enforces single-owner rule
- `ai_systems.organisation_id` is RLS-scoped

### RLS expectations
- Organisation isolation enforced everywhere
- Evidence export uses **read-only server client**
- Acceptance uses **write-only server client**

Any schema changes must preserve these guarantees.

---

## 5. Key architectural decisions (WHY they were made)

### 5.1 Sample exporter is separate
**Why:**  
Prevents accidental leakage, simplifies demos, avoids edge cases.

### 5.2 No compliance scoring
**Why:**  
Scoring introduces liability, ambiguity, and maintenance burden.

### 5.3 Canonical JSON → PDF (not the reverse)
**Why:**  
Ensures deterministic hashing and independent verification.

### 5.4 Absence is explicit
Empty arrays in JSON are intentional signals, not failures.

---

## 6. What is intentionally OUT OF SCOPE for Drift v1

Do not build:
- AI Act risk tiers
- Model cards
- Safety metrics
- Dataset lineage
- Real-time monitoring
- Legal advice tooling

These are Drift v2+ concerns, if ever.

---

## 7. Known gaps (SAFE to address next)

### 7.1 Legal documents: viewing & navigation

Current state:
- Legal documents are hashed and versioned in Supabase
- Dashboard table lists them
- Links exist but viewing UX is incomplete

Required next steps:
- Ensure **pending** and **accepted** documents are clickable
- Render:
  - Read-only text view (current version)
  - Optional PDF view if stored
- Acceptance button must:
  - Record acceptance
  - Refresh dashboard state
  - Update completeness + Evidence Pack immediately

This is UI + wiring only — **no schema changes required**.

---

## 8. Safe next execution order

1. Finalise legal document viewer UX
2. Wire Accept button → immediate dashboard refresh
3. Verify acceptance flows into Evidence Pack JSON
4. Add one AI system and re-export
5. Final sanity sweep (sample + full)

---

## 9. Operating principle for future work

> If a feature requires interpretation, judgement, or explanation of “what it means” — it does not belong in Drift v1.

Prefer:
- Fewer fields
- Declarative language
- Deterministic outputs
- Explicit disclaimers

---

## 10. Status

Drift v1.0 is:
- Architecturally sound
- Legally restrained
- Demo-ready
- Sellable
- Extensible without rework

This foundation is now locked.
