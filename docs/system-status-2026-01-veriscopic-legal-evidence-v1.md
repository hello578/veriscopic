# Veriscopic — System Status (Legal & Evidence v1)
**Date:** 2026-01-23  
**Status:** Production-ready (audit-safe baseline)

---

## Executive Summary

Veriscopic now supports a complete, immutable Legal & Evidence workflow suitable for:
- Enterprise procurement
- Insurers
- Regulators
- External audits

This version establishes a **non-negotiable gold standard**:
documents are immutable, acceptance is hash-bound, and evidence exports are verifiable.

This document defines what is DONE, what is LOCKED, and what comes NEXT.

---

## What Is Live & Production-Ready

### 1. Platform Legal Documents (HTML + PDF)

**Route**
/{organisationId}/legal/documents/{documentId}

yaml
Copy code

**Characteristics**
- Documents are platform-issued (global, not org-owned)
- Rendered as read-only HTML
- Immutable content + SHA-256 hash
- No lifecycle mutation at render time
- No derived or inferred state

**Key rule**
> Legal documents have no intrinsic "status".  
> Status is a release concern, not a document property.

---

### 2. Acceptance Model (Immutable & Verifiable)

**Acceptance logic**
- Acceptance is recorded against:
  - `document_id`
  - `content_hash`
- Re-acceptance required if content changes
- No retroactive mutation possible

**Table**
- `terms_acceptance`

This ensures acceptance evidence is cryptographically bound and audit-safe.

---

### 3. Evidence Pack (Core Value Asset)

#### JSON Evidence Pack
GET /api/evidence-pack/json?organisationId=...

graphql
Copy code

#### Full PDF Evidence Pack
GET /api/evidence-pack/pdf?organisationId=...

shell
Copy code

#### Sample PDF (Pre-sales)
GET /api/evidence-pack/pdf-sample?organisationId=sample

yaml
Copy code

**Properties**
- Deterministic JSON
- Canonical hashing
- PDF rendered from canonical source
- Sample pack is redacted + truncated

---

### 4. Dashboard Integration

Dashboard now correctly links to:
- Platform documents (HTML)
- Evidence Pack (JSON + PDF)
- Sample Evidence Pack (PDF)
- Acceptance CTA (when incomplete)

Dashboard reflects:
- Governance completeness
- Acceptance coverage
- Evidence readiness

---

### 5. Routing & Middleware (Stabilised)

- Org-scoped routing fixed
- Dynamic params correctly awaited
- Middleware no longer breaks document rendering
- Public vs protected routes clearly separated

This removes the previous class of silent 404 / redirect failures.

---

## Files Considered GOLD STANDARD (Do Not Change Lightly)

### Legal Documents
app/(org)/[organisationId]/legal/documents/[documentId]/page.tsx

shell
Copy code

### Evidence Pack APIs
app/api/evidence-pack/pdf/route.ts
app/api/evidence-pack/pdf-sample/route.ts
app/api/evidence-pack/json/route.ts

shell
Copy code

### Acceptance Logic
lib/legal/read-acceptance.ts
lib/legal/export-evidence.ts

shell
Copy code

### Dashboard Wiring
app/(org)/[organisationId]/dashboard/page.tsx
components/dashboard/evidence-pack-card.tsx
components/dashboard/legal-status-table.tsx

yaml
Copy code

---

## Explicit Design Decisions (Locked)

1. **No joins on document render**
2. **No status stored on documents**
3. **No inference from acceptance**
4. **Evidence is derived, never stored**
5. **PDFs are render-once, immutable artefacts**

These decisions exist to satisfy:
- Legal scrutiny
- Audit defensibility
- Enterprise trust

---

## What Is NOT Yet Built (By Design)

- AI system registry (next)
- Compliance scoring beyond v1
- Document lifecycle management UI
- External sharing / verification portal

---

## Immediate Next Step

### AI Systems Registry v1
> One page. One table. One operational flip.

Purpose:
- Declare AI systems in use
- Bind them into Evidence Pack
- Support EU AI Act Articles 4, 10, 13

This is the next value unlock.

---

## System Confidence

At this point, Veriscopic can legitimately claim:

> “We provide immutable, verifiable evidence of AI governance actions.”

This is sufficient for:
- Early enterprise sales
- Paid pilots
- Procurement conversations
- Investor demos

3️⃣ What we do tomorrow — make it even more valuable 🚀
👉 AI Systems Registry v1 (exact scope)
Page

bash
Copy code
/{organisationId}/ai-systems
Table

diff
Copy code
ai_systems
- id
- organisation_id
- name
- purpose
- lifecycle_status (draft | operational | retired)
- system_owner
- created_at
Rules

Read-only once marked operational

Included automatically in Evidence Pack

No scoring, no judgement

UI

Simple table

“Operational” toggle (irreversible)

One CTA: Declare AI system