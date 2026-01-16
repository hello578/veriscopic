// app/(org)/[organisationId]/dashboard/components/legal-status-table.tsx

// app/(org)/[organisationId]/dashboard/components/legal-status-table.tsx

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { labelForDocumentSlug } from '@/lib/legal/document-labels'

type LegalDocumentStatus = {
  id: string
  name: string
  version: string
  accepted: boolean
}

export function LegalStatusTable({
  documents,
}: {
  documents: LegalDocumentStatus[]
}) {
  const allAccepted =
    documents.length > 0 && documents.every((d) => d.accepted)

  return (
    <Card className="border-slate-200/60 bg-white shadow-sm">
      <CardHeader className="pb-4 px-6 pb-6">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900">
            Legal &amp; Consent Status
          </h3>
          <p className="text-xs text-slate-500">
            Platform-issued legal documents and acceptance state
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4 px-6 pt-0 pb-6">
        {allAccepted && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
            All current platform documents have been accepted.
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-50/60 border-b">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600">
                  Document
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-600">
                  Version
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y bg-white">
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="transition-colors hover:bg-slate-50/60"
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/legal/documents/${doc.id}`}
                      className="group inline-flex items-center gap-2"
                      title="View document"
                    >
                      <FileText className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                      <span className="text-sm font-medium text-slate-900 group-hover:underline">
                        {labelForDocumentSlug(doc.name)}
                      </span>
                    </Link>
                  </td>

                  <td className="px-5 py-3 text-right text-sm text-slate-700">
                    {doc.version}
                  </td>

                  <td className="px-5 py-3 text-right">
                    {doc.accepted ? (
                      <Badge className="bg-emerald-100 text-emerald-700">
                        Accepted
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                  </td>
                </tr>
              ))}

              {documents.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No platform documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-500">
          Tip: Click a document to view the exact version that was issued (read-only).
        </p>
      </CardContent>
    </Card>
  )
}
