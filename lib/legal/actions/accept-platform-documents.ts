// lib/legal/actions/accept-platform-documents.ts
'use server'

import { revalidatePath } from 'next/cache'
import { supabaseServerWrite } from '@/lib/supabase/server-write'

export async function acceptCurrentPlatformDocuments(
  organisationId: string
) {
  const supabase = await supabaseServerWrite()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('Unauthenticated')
  }

  // Read active documents (FK-backed)
  const { data: currentDocs, error: docsError } = await supabase
    .from('legal_documents_current')
    .select(`
      id,
      legal_documents:legal_documents_current_id_fkey (
        content_hash
      )
    `)
    .eq('active', true)

  if (docsError) throw docsError
  if (!currentDocs || currentDocs.length === 0) return

  // Insert evidence (append-only; DB enforces hash integrity)
  const inserts = currentDocs.map((row: any) => ({
    organisation_id: organisationId,
    user_id: user.id,
    document_id: row.id,
    content_hash: row.legal_documents?.content_hash,
    accepted_at: new Date().toISOString(),
  }))

  const { error: insertError } = await supabase
    .from('terms_acceptance')
    .insert(inserts)

  if (insertError) throw insertError

  // Refresh dashboard data
  revalidatePath(`/${organisationId}/dashboard`)
}
