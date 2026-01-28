
// lib/legal/drift/materiality.ts

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
 *
 * "Material" means:
 * Previously asserted governance assurance may no longer hold without review.
 *
 * "Informational" means:
 * Change detected, but assurances are not weakened.
 */
export function classifySeverity(item: DriftItemCore): DriftSeverity {
  const p = item.path.toLowerCase()

  // Legal acceptance / terms evidence is always high-stakes
  if (p.startsWith('legal_acceptance')) {
    return 'material'
  }

  // Governance snapshot changes
  if (p.startsWith('governance_snapshot')) {
    if (item.change_type === 'removed' || item.change_type === 'modified') {
      return 'material'
    }
    return 'informational'
  }

  // AI systems: risk-relevant fields are material when changed or removed
  if (p.startsWith('ai_systems')) {
    const materialFields = [
      '.data_categories',
      '.lifecycle_status',
      '.system_owner',
      '.purpose',
    ]

    if (materialFields.some((f) => p.includes(f))) {
      if (item.change_type === 'added') return 'informational'
      return 'material'
    }

    return 'informational'
  }

  // Responsibility map
  if (p.startsWith('responsibility_map')) {
    if (item.change_type === 'modified') {
      return 'material'
    }
    return 'informational'
  }

  // Default: informational
  return 'informational'
}

export function severityRank(s: DriftSeverity): number {
  return s === 'material' ? 2 : 1
}
