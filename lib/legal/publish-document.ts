// lib/legal/publish-document.ts
// lib/legal/publish-document.ts

import crypto from 'crypto'
import { supabaseService } from '@/lib/supabase/server-service'

export async function publishPlatformDocument({
  documentType,
  name,
  content,
  version,
  jurisdiction = 'UK',
}: {
  documentType: 'terms' | 'privacy' | 'ai_disclosure' | 'dpa'
  name: string
  content: string
  version: string
  jurisdiction?: string
}) {
  const supabase = supabaseService()

  const contentHash = crypto
    .createHash('sha256')
    .update(content)
    .digest('hex')

  /**
   * Insert immutable legal document
   */
  const { data: doc, error: docError } = await supabase
    .from('legal_documents')
    .insert({
      document_type: documentType,
      name,
      content,
      version,
      jurisdiction,
      content_hash: contentHash,
    })
    .select('id')
    .single()

  if (docError) {
    console.error('[publishPlatformDocument] insert failed', docError)
    throw docError
  }

  /**
   * Upsert current pointer
   * Only one active per (type, jurisdiction)
   */
  const { error: currentError } = await supabase
    .from('legal_documents_current')
    .upsert(
      {
        id: doc.id,
        name,
        jurisdiction,
        status: 'active',
        active: true,
      },
      {
        onConflict: 'id',
      }
    )

  if (currentError) {
    console.error(
      '[publishPlatformDocument] current upsert failed',
      currentError
    )
    throw currentError
  }
}

