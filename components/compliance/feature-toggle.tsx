// components/compliance/feature-toggle.tsx

'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Props = {
  organisationId: string
  featureKey: 'evidence_pack'
  enabled: boolean
  canEdit: boolean
}

export function FeatureToggle({
  organisationId,
  featureKey,
  enabled,
  canEdit,
}: Props) {
  const [value, setValue] = useState(enabled)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function toggle(next: boolean) {
    if (!canEdit) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/org/features/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          organisationId,
          featureKey,
          enabled: next,
        }),
      })

      if (!res.ok) {
        throw new Error('Request failed')
      }

      setValue(next)
    } catch {
      setError('Unable to update feature. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <h3 className="text-sm font-medium">Evidence Pack</h3>
          <p className="text-xs text-muted-foreground">
            Enable cryptographically verifiable governance exports
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={value ? 'default' : 'secondary'}>
            {value ? 'Enabled' : 'Disabled'}
          </Badge>

          <Switch
            checked={value}
            disabled={!canEdit || loading}
            onCheckedChange={toggle}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        {!canEdit && (
          <p className="text-xs text-muted-foreground">
            Only organisation owners or admins can change this setting.
          </p>
        )}

        {error && (
          <p className="mt-2 text-xs text-red-600">{error}</p>
        )}
      </CardContent>
    </Card>
  )
}
