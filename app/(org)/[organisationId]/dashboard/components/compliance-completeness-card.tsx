import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Info } from 'lucide-react'

/**
 * Types
 */
export type CompletenessStatus = 'complete' | 'partial' | 'incomplete'

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

interface ComplianceCompletenessCardProps {
  completeness: CompletenessResult
}

/**
 * Helpers
 */
function badgeVariantForStatus(
  status: CompletenessStatus
): 'default' | 'secondary' | 'destructive' {
  switch (status) {
    case 'complete':
      return 'default'
    case 'partial':
      return 'secondary'
    case 'incomplete':
      return 'destructive'
  }
}

function labelForDoc(doc: string) {
  switch (doc) {
    case 'platform-terms':
      return 'Platform Terms'
    case 'privacy-notice':
      return 'Privacy Notice'
    case 'ai-governance-disclosure':
      return 'AI Governance Disclosure'
    default:
      return doc
  }
}

/**
 * Component
 */
export function ComplianceCompletenessCard({
  completeness,
}: ComplianceCompletenessCardProps) {
  const badgeVariant = badgeVariantForStatus(completeness.status)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">
            Governance Completeness
          </h3>

          {/* Informational AI Act popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground"
                aria-label="AI Act alignment information"
              >
                <Info className="h-4 w-4" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-80 text-sm">
              <p className="font-medium mb-2">
                AI Act Alignment (Informational)
              </p>
              <p className="text-muted-foreground mb-3">
                The following governance artefacts may support
                record-keeping and transparency expectations
                under the EU AI Act:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                <li>AI system descriptions (Articles 11, 13)</li>
                <li>Immutable records (Article 12)</li>
                <li>Declared data categories (Article 10)</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3">
                This platform does not assess legal compliance.
              </p>
            </PopoverContent>
          </Popover>
        </div>

        <Badge variant={badgeVariant}>
          {completeness.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          This reflects whether key governance artefacts have been
          recorded. It does not assess legal compliance.
        </p>

        <ul className="text-sm space-y-1">
          {completeness.breakdown.requiredDocs.map((doc) => {
            const missing =
              completeness.breakdown.missingDocs.includes(doc)

            return (
              <li key={doc}>
                {missing ? '✗' : '✓'} {labelForDoc(doc)}
              </li>
            )
          })}

          <li>
            {completeness.breakdown.hasAISystems ? '✓' : '✗'} AI
            systems recorded
          </li>
          <li>
            {completeness.breakdown.hasAccountability ? '✓' : '✗'}{' '}
            Accountability declared
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

