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
        const text = await res.text()
        throw new Error(text || 'Failed to create organisation')
      }

      const data: { organisationId?: string } = await res.json()

      if (!data.organisationId) {
        throw new Error('Organisation created but no ID returned')
      }

      // ✅ deterministic redirect
      router.push(`/${data.organisationId}/dashboard`)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong'
      )
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        type="text"
        required
        placeholder="Organisation name"
        className="w-full rounded-md border p-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? 'Creating…' : 'Create organisation'}
      </button>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  )
}
