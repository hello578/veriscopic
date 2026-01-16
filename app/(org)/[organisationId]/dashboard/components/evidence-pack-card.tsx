// components/dashboard/evidence-pack-card.tsx

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, Download, ShieldCheck } from 'lucide-react'

interface Props {
  organisationId: string
}

export function EvidencePackCard({ organisationId }: Props) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="space-y-1 px-6 pb-4">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-slate-700" />
          <h3 className="text-sm font-semibold text-slate-900">
            Evidence pack
          </h3>
        </div>

        <p className="text-xs text-slate-600">
          Export an immutable, verifiable record of governance artefacts.
        </p>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pb-6 pt-0">
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

        <div className="flex flex-wrap gap-2 pt-2">
          <Button asChild className="gap-2">
            <a
              href={`/api/evidence-pack/json?organisationId=${organisationId}`}
            >
              <Download className="h-4 w-4" />
              Download JSON
            </a>
          </Button>

          <Button asChild variant="outline" className="gap-2">
            <a
              href={`/api/evidence-pack/pdf?organisationId=${organisationId}`}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
        </div>

        <p className="text-xs text-slate-500">
          Each export includes a SHA-256 checksum for independent verification.
        </p>
      </CardContent>
    </Card>
  )
}
