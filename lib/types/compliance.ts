// lib/types/compliance.ts


export type CompletenessStatus =
  | 'strong'
  | 'developing'
  | 'incomplete'

export interface CompletenessBreakdown {
  requiredDocs: string[]
  missingDocs: string[]
  hasAISystems: boolean
  hasAccountability: boolean
}

export interface CompletenessResult {
  status: CompletenessStatus
  breakdown: CompletenessBreakdown
}
