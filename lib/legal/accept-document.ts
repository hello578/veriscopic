// lib/legal/accept-document.ts

import { supabaseServerWrite } from '@/lib/supabase/server-write'

export async function acceptDocument({
  organisationId,
  documentId,
  contentHash,
}: {
  organisationId: string
  documentId: string
  contentHash: string
}) {
  // ✅ await the client
  const supabase = await supabaseServerWrite()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('Unauthenticated')
  }

  const { error } = await supabase
    .from('terms_acceptance')
    .insert({
      organisation_id: organisationId,
      user_id: user.id,
      document_id: documentId,
      content_hash: contentHash,
      accepted_at: new Date().toISOString(),
    })

  if (error) throw error
}
