
//lib/legal/drift/detect-drift.ts

import 'server-only'

import type { EvidencePack } from '@/lib/legal/export-evidence'
import {
  classifySeverity,
  type DriftSeverity,
  type DriftChangeType,
  severityRank,
} from '@/lib/legal/drift/materiality'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export type DriftItem = {
  path: string
  change_type: DriftChangeType
  severity: DriftSeverity
  summary: string
  before?: Json | null
  after?: Json | null
}

export type DriftResult = {
  has_drift: boolean
  highest_severity: DriftSeverity | null
  informational_count: number
  material_count: number
  drift_items: DriftItem[]
}

function toJsonSafe(value: unknown): Json | null {
  if (value === undefined) return null
  try {
    return JSON.parse(JSON.stringify(value)) as Json
  } catch {
    return null
  }
}

function mapBy<T>(arr: T[], keyFn: (t: T) => string) {
  const m = new Map<string, T>()
  for (const t of arr) m.set(keyFn(t), t)
  return m
}

function addItem(
  items: DriftItem[],
  item: Omit<DriftItem, 'severity'>
) {
  const severity = classifySeverity({
    path: item.path,
    change_type: item.change_type,
  })

  items.push({
    ...item,
    severity,
    before: toJsonSafe(item.before),
    after: toJsonSafe(item.after),
  })
}

export function detectDrift(
  previous: EvidencePack,
  current: EvidencePack
): DriftResult {
  const items: DriftItem[] = []

  // ---------------------------------------------------------------------------
  // 1) Legal acceptance drift
  // ---------------------------------------------------------------------------
  const prevLA = previous.legal_acceptance ?? []
  const currLA = current.legal_acceptance ?? []

  const prevByDoc = mapBy(prevLA, (r) => r.document_id)
  const currByDoc = mapBy(currLA, (r) => r.document_id)

  for (const [docId, currRow] of currByDoc.entries()) {
    const prevRow = prevByDoc.get(docId)

    if (!prevRow) {
      addItem(items, {
        path: `legal_acceptance.${docId}`,
        change_type: 'added',
        summary: `New legal document accepted: "${currRow.document_name}" (v${currRow.version}).`,
        after: {
          version: currRow.version,
          content_hash: currRow.content_hash,
          accepted_at: currRow.accepted_at,
        },
      })
      continue
    }

    const changed =
      prevRow.content_hash !== currRow.content_hash ||
      prevRow.version !== currRow.version

    if (changed) {
      addItem(items, {
        path: `legal_acceptance.${docId}`,
        change_type: 'modified',
        summary: `Legal acceptance updated for "${currRow.document_name}" (v${prevRow.version} → v${currRow.version}).`,
        before: {
          version: prevRow.version,
          content_hash: prevRow.content_hash,
          accepted_at: prevRow.accepted_at,
        },
        after: {
          version: currRow.version,
          content_hash: currRow.content_hash,
          accepted_at: currRow.accepted_at,
        },
      })
    }
  }

  for (const [docId, prevRow] of prevByDoc.entries()) {
    if (!currByDoc.has(docId)) {
      addItem(items, {
        path: `legal_acceptance.${docId}`,
        change_type: 'removed',
        summary: `Legal acceptance removed for "${prevRow.document_name}" (v${prevRow.version}).`,
        before: {
          version: prevRow.version,
          content_hash: prevRow.content_hash,
          accepted_at: prevRow.accepted_at,
        },
      })
    }
  }

  // ---------------------------------------------------------------------------
  // 2) AI systems drift
  // ---------------------------------------------------------------------------
  const prevSys = previous.ai_systems ?? []
  const currSys = current.ai_systems ?? []

  const prevByName = mapBy(prevSys, (s) => s.name)
  const currByName = mapBy(currSys, (s) => s.name)

  for (const [name, currS] of currByName.entries()) {
    const prevS = prevByName.get(name)

    if (!prevS) {
      addItem(items, {
        path: `ai_systems.${name}`,
        change_type: 'added',
        summary: `AI system declared: "${name}".`,
        after: currS,
      })
      continue
    }

    const fields: (keyof typeof currS)[] = [
      'purpose',
      'system_owner',
      'data_categories',
      'lifecycle_status',
    ]

    for (const f of fields) {
      const before = prevS[f]
      const after = currS[f]

      if (JSON.stringify(before ?? null) !== JSON.stringify(after ?? null)) {
        addItem(items, {
          path: `ai_systems.${name}.${String(f)}`,
          change_type: 'modified',
          summary: `AI system "${name}" changed: ${String(f)}.`,
          before,
          after,
        })
      }
    }
  }

  for (const [name, prevS] of prevByName.entries()) {
    if (!currByName.has(name)) {
      addItem(items, {
        path: `ai_systems.${name}`,
        change_type: 'removed',
        summary: `AI system removed from registry: "${name}".`,
        before: prevS,
      })
    }
  }

  // ---------------------------------------------------------------------------
  // Summary + highest severity
  // ---------------------------------------------------------------------------
  const material_count = items.filter((i) => i.severity === 'material').length
  const informational_count = items.length - material_count

  let highest: DriftSeverity | null = null
  for (const it of items) {
    if (!highest || severityRank(it.severity) > severityRank(highest)) {
      highest = it.severity
    }
  }

  return {
    has_drift: items.length > 0,
    highest_severity: highest,
    informational_count,
    material_count,
    drift_items: items,
  }
}


