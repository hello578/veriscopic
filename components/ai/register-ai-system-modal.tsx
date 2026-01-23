// components/ai/register-ai-system-modal.tsx


'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function RegisterAISystemModal({
  organisationId,
  onCreated,
}: {
  organisationId: string
  onCreated: () => void
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')
  const [owner, setOwner] = useState('')

  async function submit() {
    setLoading(true)

    await fetch(`/api/${organisationId}/ai-systems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        purpose,
        system_owner: owner || null,
      }),
    })

    setLoading(false)
    setOpen(false)
    setName('')
    setPurpose('')
    setOwner('')
    onCreated()
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>+ Register AI system</Button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <Card className="w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold">Register AI system</h2>

            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="System name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />

            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="System owner (optional)"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={submit}
                disabled={!name || !purpose || loading}
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

