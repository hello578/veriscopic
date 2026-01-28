
// lib/supabase/server-read.ts


import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { SupabaseClient } from '@supabase/supabase-js'

type ReadOptions = {
  service?: boolean
}

export async function supabaseServerRead(
  opts?: ReadOptions
): Promise<SupabaseClient> {
  // 🚨 SERVICE ROLE: authoritative backend reads
  if (opts?.service) {
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          get() {
            return undefined
          },
        },
      }
    )
  }

  // 👤 USER / ANON: RLS-protected reads
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
