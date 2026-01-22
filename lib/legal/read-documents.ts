
// lib/legal/read-documents.ts

import { supabaseServerRead } from '@/lib/supabase/server-read'

type CurrentRow = {
  id: string
  legal_document: {
    id: string
    name: string
    version: string
    document_type: string
    content_hash: string
  } | null
}

export async function getCurrentPlatformDocuments() {
  const supabase = await supabaseServerRead()

  const { data, error } = await supabase
    .from('legal_documents_current')
    .select(
      `
      id,
      legal_document:legal_documents!legal_documents_current_id_fkey (
        id,
        name,
        version,
        document_type,
        content_hash
      )
    `
    )
    .eq('active', true)

  if (error) throw error
  if (!data) return []

  const rows = data as unknown as CurrentRow[]

  return rows
    .filter((row) => row.legal_document)
    .map((row) => ({
      id: row.legal_document!.id,
      name: row.legal_document!.name,
      version: row.legal_document!.version,
      document_type: row.legal_document!.document_type,
      content_hash: row.legal_document!.content_hash,
    }))
}
