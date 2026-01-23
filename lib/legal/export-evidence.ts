// lib/legal/export-evidence.ts

import 'server-only'

import { supabaseServerRead } from '@/lib/supabase/server-read'
import { sha256HexFromJson } from './evidence-pack-canonical'

/* -------------------------------------------------------------------------- */
/* Evidence Pack Contract                                                      */
/* -------------------------------------------------------------------------- */

export type EvidencePack = {
  evidence_pack_version: '1.0'

  organisation: {
    id: string
    name: string
  }

  generated_at: string

  governance_snapshot: {
    ownership_model: 'single-owner enforced'
    audit_logging: 'enabled'
    organisation_events: {
      event_type: string
      occurred_at: string
      actor_user_id: string | null
    }[]
  }

  legal_acceptance: {
    document_id: string
    document_name: string
    document_type: string | null
    version: string
    jurisdiction: string | null
    content_hash: string
    accepted_at: string
    accepted_by_user_id: string
  }[]

  ai_systems: {
    name: string
    purpose: string
    system_owner: string | null
    data_categories: string[]
    lifecycle_status: string
    last_updated: string
  }[]

  ai_act_mapping: {
    article: string
    expectation: string
    evidence_refs: string[]
  }[]

  integrity: {
    algorithm: 'SHA-256'
    canonical_json_sha256: string
  }
}

/* -------------------------------------------------------------------------- */
/* Export Evidence Pack                                                        */
/* -------------------------------------------------------------------------- */

export async function exportEvidencePack(
  organisationId: string
): Promise<EvidencePack> {
  const supabase = await supabaseServerRead()

  /* ------------------------------------------------------------------------ */
  /* Organisation                                                             */
  /* ------------------------------------------------------------------------ */

  const { data: organisation } = await supabase
    .from('organisations')
    .select('id, name')
    .eq('id', organisationId)
    .single()

  if (!organisation) {
    throw new Error('Organisation not found')
  }

  /* ------------------------------------------------------------------------ */
  /* Organisation audit events                                                 */
  /* ------------------------------------------------------------------------ */

  const { data: events } = await supabase
    .from('organisation_audit_events')
    .select('event_type, occurred_at, actor_user_id')
    .eq('organisation_id', organisationId)
    .order('occurred_at', { ascending: true })

  /* ------------------------------------------------------------------------ */
  /* Legal acceptance evidence                                                 */
  /* ------------------------------------------------------------------------ */

  const { data: acceptanceRows, error: acceptanceError } =
    await supabase
      .from('terms_acceptance')
      .select(
        `
        document_id,
        accepted_at,
        content_hash,
        user_id,
        legal_documents:legal_documents!terms_acceptance_document_id_fkey (
          id,
          name,
          document_type,
          version,
          jurisdiction
        )
      `
      )
      .eq('organisation_id', organisationId)
      .order('accepted_at', { ascending: true })

  if (acceptanceError) {
    console.error(
      '[exportEvidencePack] acceptance query error:',
      acceptanceError
    )
    throw new Error(acceptanceError.message)
  }

  /* ------------------------------------------------------------------------ */
  /* AI systems registry                                                       */
  /* ------------------------------------------------------------------------ */

  const { data: aiSystems } = await supabase
    .from('ai_systems')
    .select(
      `
      name,
      purpose,
      system_owner,
      data_categories,
      lifecycle_status,
      updated_at
    `
    )
    .eq('organisation_id', organisationId)
    .order('created_at', { ascending: true })

  const generatedAt = new Date().toISOString()

  /* ------------------------------------------------------------------------ */
  /* Canonical pack (PRE-HASH)                                                  */
  /* ------------------------------------------------------------------------ */

  const packCore: Omit<EvidencePack, 'integrity'> = {
    evidence_pack_version: '1.0',

    organisation: {
      id: organisation.id,
      name: organisation.name,
    },

    generated_at: generatedAt,

    governance_snapshot: {
      ownership_model: 'single-owner enforced',
      audit_logging: 'enabled',
      organisation_events: (events ?? []).map((e) => ({
        event_type: e.event_type,
        occurred_at: new Date(e.occurred_at).toISOString(),
        actor_user_id: e.actor_user_id,
      })),
    },

    legal_acceptance: (acceptanceRows ?? []).map((row) => {
      const doc = Array.isArray(row.legal_documents)
        ? row.legal_documents[0]
        : row.legal_documents

      return {
        document_id: row.document_id,
        document_name: doc?.name ?? 'Unknown document',
        document_type: doc?.document_type ?? null,
        version: doc?.version ?? 'unknown',
        jurisdiction: doc?.jurisdiction ?? null,
        content_hash: row.content_hash,
        accepted_at: new Date(row.accepted_at).toISOString(),
        accepted_by_user_id: row.user_id,
      }
    }),

    ai_systems: (aiSystems ?? []).map((s) => ({
      name: s.name,
      purpose: s.purpose,
      system_owner: s.system_owner,
      data_categories: Array.isArray(s.data_categories)
        ? s.data_categories
        : [],
      lifecycle_status: s.lifecycle_status,
      last_updated: s.updated_at
        ? new Date(s.updated_at).toISOString()
        : generatedAt,
    })),

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
  }

  /* ------------------------------------------------------------------------ */
  /* Integrity hash                                                            */
  /* ------------------------------------------------------------------------ */

  const { checksum } = sha256HexFromJson(packCore)

  return {
    ...packCore,
    integrity: {
      algorithm: 'SHA-256',
      canonical_json_sha256: checksum,
    },
  }
}

