// lib/legal/completeness.ts

export type DocWithStatus = {
  name: string
  acceptanceStatus?: 'accepted' | 'missing'
}

const REQUIRED = ['Platform Terms', 'Privacy Notice', 'AI Governance Disclosure'] as const

function slugify(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, '-')
}

export function computeCompleteness({
  currentDocs,
  hasAISystems,
  hasAccountability,
}: {
  currentDocs: DocWithStatus[]
  hasAISystems: boolean
  hasAccountability: boolean
}) {
  const docs = Array.isArray(currentDocs) ? currentDocs : []
  const missingDocs: string[] = []

  for (const requiredName of REQUIRED) {
    const doc = docs.find((d) => d.name === requiredName)
    if (!doc || doc.acceptanceStatus !== 'accepted') {
      missingDocs.push(requiredName)
    }
  }

  let status: 'strong' | 'developing' | 'incomplete' = 'strong'

  // Incomplete = no docs, or nothing accepted
  if (!docs.length || missingDocs.length === REQUIRED.length) {
    status = 'incomplete'
  } else if (missingDocs.length > 0 || !hasAISystems || !hasAccountability) {
    status = 'developing'
  }

  return {
    status,
    breakdown: {
      requiredDocs: REQUIRED.map(slugify),
      missingDocs: missingDocs.map(slugify),
      hasAISystems: !!hasAISystems,
      hasAccountability: !!hasAccountability,
    },
  }
}
