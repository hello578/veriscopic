'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type Doc = {
  id: string
  name: string
  version: string
  content: string
  jurisdiction: string
}

export default function AcceptForm({
  docs,
  nextPath,
}: {
  docs: Doc[]
  nextPath: string
}) {
  const router = useRouter()
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const allChecked = useMemo(() => {
    if (!docs.length) return false
    return docs.every((d) => checked[d.id])
  }, [docs, checked])

  async function submit() {
    setLoading(true)
    setError(null)

    const documentIds = docs.map((d) => d.id)

    const res = await fetch('/legal/accept', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ documentIds }),
    })

    setLoading(false)

    if (!res.ok) {
      const txt = await res.text()
      setError(txt || 'Failed to save acceptance.')
      return
    }

    router.push(nextPath)
    router.refresh()
  }

  return (
    <div className="mt-8 space-y-8">
      {docs.map((doc) => (
        <section key={doc.id} className="rounded border p-4">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-semibold">
              {doc.name} <span className="text-sm text-gray-500">({doc.version} • {doc.jurisdiction})</span>
            </h2>
          </div>

          <div className="mt-4 max-h-64 overflow-auto rounded bg-gray-50 p-4 text-sm whitespace-pre-wrap">
            {doc.content}
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!checked[doc.id]}
              onChange={(e) => setChecked((s) => ({ ...s, [doc.id]: e.target.checked }))}
            />
            I agree to the {doc.name}
          </label>
        </section>
      ))}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        onClick={submit}
        disabled={!allChecked || loading}
        className="w-full rounded bg-black py-3 text-white disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Accept & continue'}
      </button>
    </div>
  )
}
