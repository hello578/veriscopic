// lib/legal/actions/accept-platform-documents.ts
// lib/legal/actions/accept-platform-documents.ts
'use server'

import { revalidatePath } from 'next/cache'
import { supabaseService } from '@/lib/supabase/server-service'

type CurrentRow = {
  id: string
  legal_document: {
    content_hash: string
  }[]
}

export async function acceptCurrentPlatformDocuments(
  organisationId: string
) {
  if (!organisationId) {
    throw new Error('Missing organisationId')
  }

  const supabase = supabaseService()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('Unauthenticated')
  }

  const { data, error } = await supabase
    .from('legal_documents_current')
    .select(`
      id,
      legal_document:legal_documents!legal_documents_current_id_fkey (
        content_hash
      )
    `)
    .eq('active', true)

  if (error) throw error
  if (!data || data.length === 0) return

  const rows = data as CurrentRow[]

  for (const row of rows) {
    const contentHash = row.legal_document?.[0]?.content_hash
    if (!contentHash) continue

    const { error: insertError } = await supabase
      .from('terms_acceptance')
      .insert({
        organisation_id: organisationId,
        user_id: user.id,
        document_id: row.id,
        content_hash: contentHash,
      })

    if (insertError && insertError.code !== '23505') {
      throw insertError
    }
  }

  revalidatePath(`/${organisationId}/dashboard`)
}

