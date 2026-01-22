// lib/legal/actions/accept-platform-documents.ts

'use server'

import { revalidatePath } from 'next/cache'
import { supabaseService } from '@/lib/supabase/server-service'

type CurrentRow = {
  id: string
  legal_document: { content_hash: string } | null
}

export async function acceptCurrentPlatformDocuments(
  organisationId: string,
  userId: string
) {
  if (!organisationId || !userId) {
    throw new Error('Missing organisationId or userId')
  }

  const supabase = supabaseService()

  // Pull active platform documents + their immutable content_hash
  const { data, error } = await supabase
    .from('legal_documents_current')
    .select(
      `
      id,
      legal_document:legal_documents!legal_documents_current_id_fkey (
        content_hash
      )
    `
    )
    .eq('active', true)

  if (error) throw error
  if (!data || data.length === 0) return

  const rows = data as unknown as CurrentRow[]

  for (const row of rows) {
    const contentHash = row.legal_document?.content_hash
    if (!contentHash) continue

    const { error: insertError } = await supabase
      .from('terms_acceptance')
      .insert({
        organisation_id: organisationId,
        user_id: userId,
        document_id: row.id, // current pointer id == immutable legal_documents.id
        content_hash: contentHash,
      })

    // 23505 = unique violation → already accepted → SUCCESS
    if (insertError && insertError.code !== '23505') {
      throw insertError
    }
  }

  revalidatePath(`/${organisationId}/dashboard`)
}
