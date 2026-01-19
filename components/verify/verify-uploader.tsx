// components/verify/verify-uploader.tsx
'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json }

function canonicalizeJson(value: Json): Json {
  if (Array.isArray(value)) return value.map(canonicalizeJson)
  if (value && typeof value === 'object') {
    const obj = value as Record<string, Json>
    const keys = Object.keys(obj).sort()
    const out: Record<string, Json> = {}
    for (const k of keys) out[k] = canonicalizeJson(obj[k])
    return out
  }
  return value
}

function stripNonHashedFields(v: any) {
  if (!v || typeof v !== 'object') return v
  const copy = structuredClone(v)
  delete copy.integrity
  delete copy.signature
  return copy
}

async function sha256Hex(input: string): Promise<string> {
  const enc = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', enc)
  const bytes = Array.from(new Uint8Array(digest))
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function VerifyUploader() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [expected, setExpected] = useState<string>('')
  const [computed, setComputed] = useState<string>('')
  const [status, setStatus] = useState<
    'idle' | 'hashing' | 'ok' | 'mismatch' | 'error'
  >('idle')
  const [error, setError] = useState<string | null>(null)

  const matches = useMemo(() => {
    if (!expected || !computed) return null
    return expected.trim().toLowerCase() === computed.trim().toLowerCase()
  }, [expected, computed])

  async function onFile(file: File) {
    setFileName(file.name)
    setComputed('')
    setStatus('hashing')
    setError(null)

    try {
      const text = await file.text()
      const json = JSON.parse(text)

      const expectedFromJson =
        typeof json?.integrity?.canonical_json_sha256 === 'string'
          ? json.integrity.canonical_json_sha256
          : ''

      if (expectedFromJson) setExpected(expectedFromJson)

      const stripped = stripNonHashedFields(json)
      const canonicalObj = canonicalizeJson(stripped as Json)
      const canonical = JSON.stringify(canonicalObj)

      const hash = await sha256Hex(canonical)
      setComputed(hash)

      if (expectedFromJson) {
        setStatus(
          expectedFromJson.trim().toLowerCase() === hash ? 'ok' : 'mismatch'
        )
      } else {
        setStatus('idle')
      }
    } catch (e: any) {
      setStatus('error')
      setError(e?.message ?? 'Invalid JSON')
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="text-sm font-semibold">Verify locally</div>
        <div className="text-xs text-muted-foreground">
          Canonicalizes JSON, removes integrity/signature, then computes SHA-256.
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept="application/json,.json"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) void onFile(f)
            }}
          />
          {fileName && (
            <div className="text-xs text-muted-foreground">
              Loaded: {fileName}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            Expected hash (from JSON integrity or PDF footer)
          </label>
          <input
            className="w-full rounded-md border px-3 py-2 text-xs"
            value={expected}
            onChange={(e) => setExpected(e.target.value)}
            placeholder="Paste expected SHA-256 here"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Computed hash</label>
          <div className="rounded-md border bg-muted px-3 py-2 text-xs break-all">
            {computed || '—'}
          </div>
        </div>

        {status === 'hashing' && (
          <div className="text-xs text-muted-foreground">Hashing…</div>
        )}

        {status === 'ok' && (
          <div className="text-sm text-emerald-700">
            ✅ Verified — hashes match.
          </div>
        )}

        {(status === 'mismatch' || matches === false) && (
          <div className="text-sm text-red-700">
            ❌ Hash mismatch — the pack may be altered, corrupted, or not the
            same pack referenced by the PDF.
          </div>
        )}

        {status === 'error' && (
          <div className="text-sm text-red-700">❌ {error}</div>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFileName(null)
              setExpected('')
              setComputed('')
              setStatus('idle')
              setError(null)
            }}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
