// lib/supabase/server-write.ts
// lib/supabase/server-write.ts

import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Authoritative server-side Supabase client.
 *
 * IMPORTANT:
 * - Uses SERVICE_ROLE key
 * - Bypasses RLS
 * - MUST ONLY be used in server-only contexts (API routes, server actions)
 * - NEVER import this into client components
 */
export async function supabaseServerWrite(): Promise<SupabaseClient> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_URL'
    )
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
