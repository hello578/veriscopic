
// app/onboarding/create-organisation/create-organisation-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateOrganisationForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)

      const res = await fetch('/api/onboarding/create-organisation', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        // robust: API might return text or JSON
        const contentType = res.headers.get('content-type') || ''
        if (contentType.includes('application/json')) {
          const j = await res.json().catch(() => null)
          throw new Error(j?.error || 'Failed to create organisation')
        } else {
          const text = await res.text().catch(() => '')
          throw new Error(text || 'Failed to create organisation')
        }
      }

      const data: { organisationId?: string } = await res.json()

      if (!data.organisationId) {
        throw new Error('Organisation created but no ID returned')
      }

      router.push(`/${data.organisationId}/dashboard`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900">
          Organisation name
        </label>
        <input
          name="name"
          type="text"
          required
          placeholder="e.g. Acme Health Ltd"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-slate-500">
          This name appears on evidence exports and acceptance logs.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
      >
        {loading ? 'Creating organisation…' : 'Create organisation'}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}
