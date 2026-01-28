// lib/legal/export-evidence-sample.ts

import { sha256HexFromJson } from './evidence-pack-canonical'
import type { EvidencePack } from './export-evidence'

export async function exportEvidencePackSample(): Promise<EvidencePack> {
  const generatedAt = new Date().toISOString()

  const packCore: Omit<EvidencePack, 'integrity'> = {
    evidence_pack_version: '1.1',

    organisation: {
      id: 'sample',
      name: 'Example Organisation (Redacted)',
    },

    generated_at: generatedAt,

    governance_snapshot: {
      ownership_model: 'single-owner enforced',
      audit_logging: 'enabled',
      organisation_events: [
        {
          event_type: 'organisation_created',
          occurred_at: '2025-01-01T10:00:00Z',
          actor_user_id: null,
        },
        {
          event_type: 'terms.accepted',
          occurred_at: '2025-01-02T09:15:00Z',
          actor_user_id: null,
        },
      ],
    },

    legal_acceptance: [
      {
        document_id: 'sample-platform-terms',
        document_name: 'Platform Terms',
        document_type: 'terms',
        version: '1.0',
        jurisdiction: 'UK',
        content_hash: 'sample-hash-platform-terms',
        accepted_at: '2025-01-02T09:15:00Z',
        accepted_by_user_id: 'sample-user',
      },
      {
        document_id: 'sample-privacy-notice',
        document_name: 'Privacy Notice',
        document_type: 'privacy',
        version: '1.0',
        jurisdiction: 'UK',
        content_hash: 'sample-hash-privacy',
        accepted_at: '2025-01-02T09:15:00Z',
        accepted_by_user_id: 'sample-user',
      },
      {
        document_id: 'sample-ai-governance',
        document_name: 'AI Governance Disclosure',
        document_type: 'ai_governance',
        version: '1.0',
        jurisdiction: 'EU',
        content_hash: 'sample-hash-ai-governance',
        accepted_at: '2025-01-02T09:15:00Z',
        accepted_by_user_id: 'sample-user',
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
        article: 'Article 10',
        expectation: 'Data governance and data categories',
        evidence_refs: ['ai_systems.data_categories'],
      },
      {
        article: 'Article 13',
        expectation: 'Transparency obligations',
        evidence_refs: ['legal_acceptance'],
      },
      {
        article: 'Article 17',
        expectation: 'Governance controls and auditability',
        evidence_refs: ['governance_snapshot.organisation_events'],
      },
    ],
    responsibility_map: {
      declared_count: 0,
      records: []
    }
  }

  const { checksum } = sha256HexFromJson(packCore)

  return {
    ...packCore,
    integrity: {
      algorithm: 'SHA-256',
      canonical_json_sha256: checksum,
    },
  }
}
