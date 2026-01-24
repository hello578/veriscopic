// app/auth/login/login-form.tsx

"use client"

import { useMemo, useState } from "react"
import { supabaseBrowser } from "@/lib/supabase/client"

type Mode = "idle" | "sending" | "sent"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export default function LoginForm() {
  const supabase = supabaseBrowser()

  const [email, setEmail] = useState("")
  const [mode, setMode] = useState<Mode>("idle")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const emailOk = useMemo(() => isValidEmail(email), [email])

  async function signInWithGoogle() {
    if (loading) return
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    }
    // Success redirects automatically
  }

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return

    const trimmed = email.trim().toLowerCase()
    if (!isValidEmail(trimmed)) {
      setError("Please enter a valid email address.")
      return
    }

    setLoading(true)
    setError(null)
    setMode("sending")

    const { error } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: {
        // 🚨 THIS IS THE CRITICAL FIX
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setMode("idle")
      setLoading(false)
      return
    }

    setMode("sent")
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center">
        <div className="w-full rounded-lg border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            Sign in to Veriscopic
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Sign in using Google, or receive a secure email link. No passwords required.
          </p>

          {/* Google */}
          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="mt-6 w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          >
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-500">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Magic link */}
          {mode !== "sent" ? (
            <form onSubmit={sendMagicLink} className="space-y-3">
              <label className="block text-xs font-medium text-slate-700">
                Email address
              </label>

              <input
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border px-3 py-2 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />

              <button
                type="submit"
                disabled={loading || !emailOk}
                className="w-full rounded-md border border-slate-300 bg-white py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 disabled:opacity-60"
              >
                {mode === "sending" ? "Sending link…" : "Send sign-in link"}
              </button>

              <p className="text-xs text-slate-500">
                New to Veriscopic? Enter your email and we’ll create your account automatically.
              </p>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                <strong>Check your inbox.</strong> We sent a sign-in link to{" "}
                <span className="font-medium">{email.trim()}</span>.
              </div>

              <p className="text-xs text-slate-500">
                If you don’t see it within a minute, check spam or try again.
              </p>

              <button
                type="button"
                onClick={() => {
                  setMode("idle")
                  setError(null)
                }}
                className="w-full rounded-md border border-slate-300 bg-white py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                Use a different email
              </button>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

          <p className="mt-6 text-xs text-slate-500">
            By signing in you agree to the platform terms and privacy notice.
          </p>
        </div>
      </div>
    </main>
  )
}
