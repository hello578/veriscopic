// components/dashboard/evidence-pack-card.tsx

'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Package,
  Download,
  ShieldCheck,
  Lock,
  Eye,
} from 'lucide-react'

interface Props {
  organisationId: string
  enabled?: boolean
}

export function EvidencePackCard({
  organisationId,
  enabled = false,
}: Props) {
  const [requesting, setRequesting] = useState(false)
  const [requested, setRequested] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function requestAccess() {
    setRequesting(true)
    setError(null)

    try {
      const res = await fetch('/api/org/features/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ organisationId }),
      })

      if (!res.ok) {
        throw new Error('Request failed')
      }

      setRequested(true)
    } catch {
      setError('Unable to submit request. Please try again.')
    } finally {
      setRequesting(false)
    }
  }

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="space-y-1 px-6 pb-4">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-slate-700" />
          <h3 className="text-sm font-semibold text-slate-900">
            Evidence Pack
          </h3>
        </div>

        <p className="text-xs text-slate-600">
          Export an immutable, verifiable record of governance artefacts.
        </p>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pb-6 pt-0">
        {/* FEATURES */}
        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" />
            <span>Append-only acceptance evidence</span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" />
            <span>Version-bound legal documents</span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" />
            <span>Audit-ready JSON and PDF exports</span>
          </div>
        </div>

        {/* SAMPLE (always available) */}
        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() =>
              window.open('/api/evidence-pack/pdf-sample', '_blank')
            }
          >
            <Eye className="h-4 w-4" />
            View sample Evidence Pack (PDF)
          </Button>
        </div>

        {/* ORG EXPORTS */}
        {enabled ? (
          <>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild className="gap-2">
                <a
                  href={`/api/evidence-pack/json?organisationId=${organisationId}`}
                  target="_blank"
                >
                  <Download className="h-4 w-4" />
                  Download JSON
                </a>
              </Button>

              <Button asChild variant="outline" className="gap-2">
                <a
                  href={`/api/evidence-pack/pdf?organisationId=${organisationId}`}
                  target="_blank"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </Button>
            </div>

            <p className="text-xs text-slate-500">
              Each export includes a SHA-256 checksum for independent
              verification.
            </p>
          </>
        ) : (
          <>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 flex items-start gap-2">
              <Lock className="mt-0.5 h-4 w-4 text-slate-500" />
              <span>
                Evidence Pack access is not enabled for this organisation.
              </span>
            </div>

            {requested ? (
              <p className="text-xs text-emerald-700">
                Request received. We’ll be in touch shortly.
              </p>
            ) : (
              <Button
                variant="outline"
                onClick={requestAccess}
                disabled={requesting}
              >
                {requesting
                  ? 'Requesting…'
                  : 'Request Evidence Pack access'}
              </Button>
            )}

            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

