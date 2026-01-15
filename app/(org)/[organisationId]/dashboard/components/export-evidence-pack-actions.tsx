// dashboard/components/export-evidence-pack-actions.tsx
// dashboard/components/export-evidence-pack-actions.tsx

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileJson, FileText } from 'lucide-react'

type Props = {
  organisationId: string
}

export function ExportEvidencePackActions({ organisationId }: Props) {
  const [downloading, setDownloading] = useState<
    'json' | 'pdf' | null
  >(null)

  async function download(
    format: 'json' | 'pdf',
    path: string,
    filename: string
  ) {
    try {
      setDownloading(format)

      const res = await fetch(
        `${path}?organisationId=${organisationId}`,
        {
          method: 'GET',
          credentials: 'include', // important for auth cookies
        }
      )

      if (!res.ok) {
        throw new Error(`Export failed (${res.status})`)
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('[export-evidence-pack]', err)
      alert(
        'Failed to export evidence pack. Please try again or contact support.'
      )
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button
        variant="outline"
        disabled={downloading !== null}
        onClick={() =>
          download(
            'json',
            '/api/evidence-pack/json',
            `veriscopic-evidence-pack-${organisationId}.json`
          )
        }
      >
        <FileJson className="mr-2 h-4 w-4" />
        {downloading === 'json'
          ? 'Exporting…'
          : 'Export Evidence (JSON)'}
      </Button>

      <Button
        variant="outline"
        disabled={downloading !== null}
        onClick={() =>
          download(
            'pdf',
            '/api/evidence-pack/pdf',
            `veriscopic-evidence-pack-${organisationId}.pdf`
          )
        }
      >
        <FileText className="mr-2 h-4 w-4" />
        {downloading === 'pdf'
          ? 'Exporting…'
          : 'Export Evidence (PDF)'}
      </Button>
    </div>
  )
}

