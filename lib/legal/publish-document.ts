import crypto from 'crypto'
import { supabaseService } from '@/lib/supabase/server-service'

export async function publishPlatformDocument({
  type,
  title,
  content,
  version,
}: {
  type: string
  title: string
  content: string
  version: string
}) {
  const supabase = supabaseService()

  const hash = crypto
    .createHash('sha256')
    .update(content)
    .digest('hex')

  const { error } = await supabase
    .from('legal_documents')
    .insert({
      type,
      title,
      content,
      version,
      content_hash: hash,
      published_at: new Date().toISOString(),
    })

  if (error) throw error

  const { error: currentError } = await supabase
    .from('legal_documents_current')
    .upsert({
      type,
      version,
      active: true,
    })

  if (currentError) throw currentError
}

