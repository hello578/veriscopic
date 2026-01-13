'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = supabaseBrowser()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function signInWithGoogle() {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    setLoading(false)
    if (error) setError(error.message)
  }

  return (
    <main className="p-10 max-w-md">
      <h1 className="text-3xl font-bold">Sign in</h1>

      <button
        onClick={signInWithGoogle}
        disabled={loading}
        className="mt-6 w-full rounded bg-black text-white py-2"
      >
        Continue with Google
      </button>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}
    </main>
  )
}
