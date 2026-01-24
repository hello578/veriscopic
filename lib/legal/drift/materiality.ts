
// lib/legal/drift/materiality.ts

import 'server-only'

export type DriftSeverity = 'informational' | 'material'

export type DriftChangeType = 'added' | 'removed' | 'modified'

export type DriftItemCore = {
  path: string
  change_type: DriftChangeType
}

/**
 * Deterministic materiality rules (v1)
 * - "Material" means: previously asserted governance assurance may no longer hold without review.
 * - "Informational" means: change detected, but assurances are not weakened.
 */
export function classifySeverity(item: DriftItemCore): DriftSeverity {
  const p = item.path.toLowerCase()

  // Legal acceptance / terms evidence is always high-stakes
  if (p.startsWith('legal_acceptance')) {
    // Any change to acceptance evidence is material
    return 'material'
  }

  // Governance snapshot changes are material if they remove or alter evidence traceability
  if (p.startsWith('governance_snapshot')) {
    if (item.change_type === 'removed' || item.change_type === 'modified') {
      return 'material'
    }
    return 'informational'
  }

  // AI systems: changes to declared risk-relevant fields are material
  if (p.startsWith('ai_systems')) {
    const materialFields = [
      '.data_categories',
      '.lifecycle_status',
      '.system_owner',
      '.purpose',
    ]
    if (materialFields.some((f) => p.includes(f))) {
      // Adding a system is typically informational (new declaration added),
      // but removing or modifying key fields is material.
      if (item.change_type === 'added') return 'informational'
      return 'material'
    }

    // Other AI-system metadata changes are informational by default
    return 'informational'
  }

  // Default: informational
  return 'informational'
}

export function severityRank(s: DriftSeverity): number {
  return s === 'material' ? 2 : 1
}
