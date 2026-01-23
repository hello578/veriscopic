// components/ai/register-ai-system-modal.tsx

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export type CreatedSystem = {
  id: string
  name: string
  purpose: string
  lifecycle_status: string
  system_owner: string | null
  is_operational: boolean
  updated_at: string
}

type Props = {
  organisationId: string
  onCreated: (system: CreatedSystem) => void
}

export function RegisterAISystemModal({
  organisationId,
  onCreated,
}: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')
  const [owner, setOwner] = useState('')

  async function submit() {
    if (loading || !name || !purpose) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `/api/${organisationId}/ai-systems`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            purpose: purpose.trim(),
            system_owner: owner.trim() || null,
          }),
        }
      )

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`)
      }

      const json = await res.json()

      if (!json?.system || !json.system.id) {
        throw new Error('Malformed response from server')
      }

      // 🔹 Optimistic update (safe)
      onCreated(json.system)

      // 🔹 Reset + close
      setOpen(false)
      setName('')
      setPurpose('')
      setOwner('')
    } catch (err) {
      console.error('[RegisterAISystemModal]', err)
      setError('Unable to save AI system. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        + Register AI system
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Card className="w-full max-w-md space-y-4 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Register AI system
            </h2>

            <input
              className="w-full rounded border px-3 py-2 text-sm"
              placeholder="System name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />

            <textarea
              className="w-full rounded border px-3 py-2 text-sm"
              placeholder="Purpose"
              rows={3}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              disabled={loading}
            />

            <input
              className="w-full rounded border px-3 py-2 text-sm"
              placeholder="System owner (optional)"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              disabled={loading}
            />

            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button
                onClick={submit}
                disabled={loading || !name || !purpose}
              >
                {loading ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
