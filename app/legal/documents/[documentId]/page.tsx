// app/legal/documents/[documentId]/page.tsx


import { notFound } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileDown } from 'lucide-react'
import Link from 'next/link'

export default async function LegalDocumentViewerPage({
  params,
}: {
  params: Promise<{ documentId: string }>
}) {
  const { documentId } = await params

  const supabase = await supabaseServerRead()

  const { data, error } = await supabase
    .from('legal_documents')
    .select(`
      id,
      name,
      version,
      content,
      published_at
    `)
    .eq('id', documentId)
    .single()

  if (error || !data) {
    notFound()
  }

  return (
    <main className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <Link
            href="javascript:history.back()"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <Button variant="outline" size="sm" disabled>
            <FileDown className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <Card className="border-slate-200/60 bg-white shadow-sm">
          <CardHeader className="px-6 pb-6">
            <h1 className="text-xl font-semibold text-slate-900">
              {data.name}
            </h1>
            <p className="text-xs text-slate-500">
              Version {data.version}
              {data.published_at && (
                <> · Published {new Date(data.published_at).toLocaleDateString()}</>
              )}
            </p>
          </CardHeader>

          <CardContent className="px-6 pt-0 pb-6">
            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-800 leading-relaxed">
              {data.content}
            </pre>
          </CardContent>
        </Card>

        <p className="text-xs text-slate-500">
          Read-only view. Acceptance evidence is stored separately and immutably.
        </p>
      </div>
    </main>
  )
}

