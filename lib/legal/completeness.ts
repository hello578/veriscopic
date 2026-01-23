// lib/legal/completeness.ts
type DocWithStatus = {
  name: string
  acceptanceStatus?: 'accepted' | 'missing'
}

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
  currentDocs: DocWithStatus[]
  hasAISystems: boolean
  hasAccountability: boolean
}) {
  const missingDocs: string[] = []

  for (const name of REQUIRED) {
    const doc = currentDocs.find((d) => d.name === name)
    if (!doc || doc.acceptanceStatus !== 'accepted') {
      missingDocs.push(name)
    }
  }

  let status: 'strong' | 'developing' | 'incomplete' = 'strong'

  if (
    !currentDocs.length ||
    missingDocs.length === REQUIRED.length
  ) {
    status = 'incomplete'
  } else if (
    missingDocs.length > 0 ||
    !hasAISystems ||
    !hasAccountability
  ) {
    status = 'developing'
  }

  return {
    status,
    breakdown: {
      requiredDocs: REQUIRED.map((n) =>
        n.toLowerCase().replace(/\s+/g, '-')
      ),
      missingDocs: missingDocs.map((n) =>
        n.toLowerCase().replace(/\s+/g, '-')
      ),
      hasAISystems,
      hasAccountability,
    },
  }
}
