// lib/legal/completeness.ts
import type { CurrentDocument } from './read-documents'

const REQUIRED_DOC_TYPES = [
  'Platform Terms',
  'Privacy Notice',
  'AI Governance Disclosure',
]

export type CompletenessStatus = 'strong' | 'developing' | 'incomplete'

export function computeCompleteness({
  currentDocs,
  hasAISystems,
  hasAccountability,
}: {
  currentDocs: CurrentDocument[]
  hasAISystems: boolean
  hasAccountability: boolean
}) {
  const presentNames = new Set(currentDocs.map(d => d.name))
  const missingDocs = REQUIRED_DOC_TYPES.filter(
    name => !presentNames.has(name)
  )

  let status: CompletenessStatus = 'strong'
  if (missingDocs.length > 0 || !hasAISystems) status = 'developing'
  if (presentNames.size === 0 && !hasAISystems) status = 'incomplete'

  return {
    status,
    breakdown: {
      requiredDocs: REQUIRED_DOC_TYPES.map((n) =>
        n
          .toLowerCase()
          .replace(/\s+/g, '-')
      ),
      missingDocs: missingDocs.map((n) =>
        n
          .toLowerCase()
          .replace(/\s+/g, '-')
      ),
      hasAISystems,
      hasAccountability,
    },
  }
}
