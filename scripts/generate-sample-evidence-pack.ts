// scripts/generate-sample-evidence-pack.ts

import fs from 'fs'
import path from 'path'

import { renderEvidencePackPdfCore } from '@/lib/legal/export-evidence-pdf.core'
import { sha256HexFromJson } from '@/lib/legal/evidence-pack-canonical'
import type { EvidencePack } from '@/lib/legal/export-evidence'

async function main() {
  const generatedAt = new Date().toISOString()

  const packCore: Omit<EvidencePack, 'integrity'> = {
    evidence_pack_version: '1.1',

    organisation: {
      id: 'org_sample_redacted',
      name: 'Sample Organisation (Redacted)',
    },

    generated_at: generatedAt,

    governance_snapshot: {
      ownership_model: 'single-owner enforced',
      audit_logging: 'enabled',
      organisation_events: [
        {
          event_type: 'organisation.created',
          occurred_at: generatedAt,
          actor_user_id: null,
        },
        {
          event_type: 'legal_documents.accepted',
          occurred_at: generatedAt,
          actor_user_id: null,
        },
      ],
    },

    legal_acceptance: [
      {
        document_id: 'doc_terms_v1',
        document_name: 'Platform Terms',
        document_type: 'terms',
        version: '1.0',
        jurisdiction: 'UK/EU',
        content_hash: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
        accepted_at: generatedAt,
        accepted_by_user_id: 'user_redacted',
      },
      {
        document_id: 'doc_privacy_v1',
        document_name: 'Privacy Notice',
        document_type: 'privacy',
        version: '1.0',
        jurisdiction: 'UK/EU',
        content_hash: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33',
        accepted_at: generatedAt,
        accepted_by_user_id: 'user_redacted',
      },
      {
        document_id: 'doc_ai_v1',
        document_name: 'AI Governance Disclosure',
        document_type: 'ai-governance',
        version: '1.0',
        jurisdiction: 'UK/EU',
        content_hash: '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12',
        accepted_at: generatedAt,
        accepted_by_user_id: 'user_redacted',
      },
    ],

    ai_systems: [
      {
        name: 'Customer Support Assistant',
        purpose: 'Responding to customer enquiries',
        system_owner: 'Operations Lead',
        data_categories: ['customer messages', 'support metadata'],
        lifecycle_status: 'production',
        is_operational: true,
        last_updated: '2025-01-01T10:00:00Z',
      },
    ],

    ai_act_mapping: [
      {
        article: 'Article 4',
        expectation: 'AI governance awareness',
        evidence_refs: ['ai_systems'],
      },
      {
        article: 'Article 13',
        expectation: 'Transparency obligations',
        evidence_refs: ['legal_acceptance'],
      },
      {
        article: 'Article 17',
        expectation: 'Auditability and governance events',
        evidence_refs: ['governance_snapshot.organisation_events'],
      },
    ],

    responsibility_map: {
      declared_count: 1,
      records: [
        {
          role: 'Board',
          decision_surface: 'Approval of AI system deployment',
          evidence_type: 'AI systems registry entry',
          review_trigger: 'On system lifecycle change',
          status: 'active',
          declared_at: '2025-01-01T10:00:00Z',
        },
      ],
    },
  }

  const { checksum } = sha256HexFromJson(packCore)

  const pack: EvidencePack = {
    ...packCore,
    integrity: {
      algorithm: 'SHA-256',
      canonical_json_sha256: checksum,
    },
  }

  const pdf = await renderEvidencePackPdfCore(pack, { mode: 'sample' })

  const outPath = path.join(
    process.cwd(),
    'public/sample/veriscopic-evidence-pack-sample.pdf'
  )

  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, pdf)

  console.log('✅ Wrote sample PDF:', outPath)
}

main().catch((err) => {
  console.error('❌ Failed generating sample PDF')
  console.error(err)
  process.exit(1)
})
