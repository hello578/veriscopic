// lib/legal/completeness.ts
import type { CurrentDocument } from './read-documents'

const REQUIRED = [
  'Platform Terms',
  'Privacy Notice',
  'AI Governance Disclosure',
]

export function computeCompleteness({
  currentDocs,
  hasAISystems,
  hasAccountability,
}: {
  currentDocs: (CurrentDocument & { acceptanceStatus?: string })[]
  hasAISystems: boolean
  hasAccountability: boolean
}) {
  const missingDocs: string[] = []
  const outdatedDocs: string[] = []

  for (const name of REQUIRED) {
    const doc = currentDocs.find((d) => d.name === name)
    if (!doc) missingDocs.push(name)
    else if (doc.acceptanceStatus === 'outdated')
      outdatedDocs.push(name)
  }

  let status: 'strong' | 'developing' | 'incomplete' = 'strong'
  if (missingDocs.length || outdatedDocs.length || !hasAISystems)
    status = 'developing'
  if (!currentDocs.length) status = 'incomplete'

  return {
    status,
    breakdown: {
      requiredDocs: REQUIRED.map((n) =>
        n.toLowerCase().replace(/\s+/g, '-')
      ),
      missingDocs: missingDocs.map((n) =>
        n.toLowerCase().replace(/\s+/g, '-')
      ),
      outdatedDocs: outdatedDocs.map((n) =>
        n.toLowerCase().replace(/\s+/g, '-')
      ),
      hasAISystems,
      hasAccountability,
    },
  }
}
