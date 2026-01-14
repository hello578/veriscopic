export type CompletenessStatus =
  | 'complete'
  | 'partial'
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
