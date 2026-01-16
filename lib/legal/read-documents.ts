// lib/legal/read-documents.ts

import { supabaseServerRead } from '@/lib/supabase/server-read'

export type CurrentDocument = {
  id: string
  name: string
  jurisdiction: string
  status: string
  active: boolean
  version: string
}

export async function getCurrentPlatformDocuments(documentId: string): Promise<CurrentDocument[]> {
  const supabase = await supabaseServerRead()

  const { data, error } = await supabase
    .from('legal_documents_current')
    .select(`
      id,
      name,
      jurisdiction,
      status,
      active,
      legal_documents:legal_documents!legal_documents_current_doc_fk (
        version
      )
    `)
    .eq('active', true)

  if (error) {
    console.error('[getCurrentPlatformDocuments]', error)
    throw error
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    name: row.name,
    jurisdiction: row.jurisdiction,
    status: row.status,
    active: row.active,
    version: row.legal_documents?.version ?? '—',
  }))
}
