// lib/auth/use-session.ts
// lib/auth/use-session.ts
"use client"

import { useEffect, useState } from "react"
import type {
  Session,
  AuthChangeEvent,
} from "@supabase/supabase-js"
import { supabaseBrowser } from "@/lib/supabase/client"

export function useSession() {
  const supabase = supabaseBrowser()

  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let mounted = true

    // Fetch session once on mount
    supabase.auth
      .getSession()
      .then(({ data }: { data: { session: Session | null } }) => {
        if (mounted) {
          setSession(data.session)
          setLoading(false)
        }
      })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  return { session, loading }
}
