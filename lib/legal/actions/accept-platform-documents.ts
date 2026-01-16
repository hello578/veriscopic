// lib/legal/actions/accept-platform-documents.ts

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

  /**
   * Fetch active platform documents
   * FK is explicitly disambiguated
   */
  const { data: currentDocs, error: docsError } = await supabase
    .from('legal_documents_current')
    .select(`
      id,
      legal_documents:legal_documents!legal_documents_current_doc_fk (
        content_hash
      )
    `)
    .eq('active', true)

  if (docsError) {
    console.error('[acceptCurrentPlatformDocuments]', docsError)
    throw docsError
  }

  if (!currentDocs || currentDocs.length === 0) return

  /**
   * Build immutable acceptance records
   */
  const inserts = currentDocs
    .map((row: any) => {
      const contentHash = row.legal_documents?.content_hash
      if (!contentHash) return null

      return {
        organisation_id: organisationId,
        user_id: user.id,
        document_id: row.id,
        content_hash: contentHash,
        accepted_at: new Date().toISOString(),
      }
    })
    .filter(Boolean)

  if (inserts.length === 0) return

  /**
   * Insert immutably
   * Ignore duplicate acceptance (unique constraint)
   */
  const { error } = await supabase
    .from('terms_acceptance')
    .insert(inserts)

  if (error && error.code !== '23505') {
    throw error
  }

  /**
   * Ensure dashboard reflects acceptance immediately
   */
  revalidatePath(`/${organisationId}/dashboard`)
}
