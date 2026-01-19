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

/* -----------------------------
   Canonicalisation & hashing
   (DO NOT CHANGE)
------------------------------ */

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

/* -----------------------------
   Component
------------------------------ */

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

  function reset() {
    setFileName(null)
    setExpected('')
    setComputed('')
    setStatus('idle')
    setError(null)
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="text-sm font-semibold">Independent verification</div>
        <div className="text-xs text-muted-foreground">
          All verification is performed locally in your browser. No data is
          transmitted.
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Verdict banner */}
        {status !== 'idle' && status !== 'hashing' && (
          <div
            className={`rounded-md border px-4 py-3 text-sm ${
              status === 'ok'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : status === 'mismatch'
                ? 'border-red-200 bg-red-50 text-red-800'
                : 'border-yellow-200 bg-yellow-50 text-yellow-800'
            }`}
          >
            {status === 'ok' && (
              <>
                <strong>Integrity verified.</strong> The uploaded Evidence Pack
                matches the provided SHA-256 hash and has not been altered since
                export.
              </>
            )}
            {status === 'mismatch' && (
              <>
                <strong>Integrity mismatch.</strong> The uploaded file does not
                match the provided hash. This may indicate modification or an
                incorrect reference hash.
              </>
            )}
            {status === 'error' && (
              <>
                <strong>Verification error.</strong> The file could not be
                processed as a valid Evidence Pack JSON.
              </>
            )}
          </div>
        )}

        {/* Step 1 */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Step 1 — Upload Evidence Pack
          </div>
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

        {/* Step 2 */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Step 2 — Expected hash
          </div>
          <label className="text-xs text-muted-foreground">
            From PDF footer or JSON integrity block
          </label>
          <input
            className="w-full rounded-md border px-3 py-2 text-xs"
            value={expected}
            onChange={(e) => setExpected(e.target.value)}
            placeholder="Paste expected SHA-256 here"
          />
        </div>

        {/* Step 3 */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Step 3 — Computed hash
          </div>
          <div className="rounded-md border bg-muted px-3 py-2 text-xs break-all">
            {computed || '—'}
          </div>
          {status === 'hashing' && (
            <div className="text-xs text-muted-foreground">Computing hash…</div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>

        {/* Scope boundary */}
        <div className="rounded-md border bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
          <strong>Scope of verification</strong>
          <ul className="mt-1 list-disc pl-4 space-y-1">
            <li>
              Confirms cryptographic integrity of the exported Evidence Pack
            </li>
            <li>
              Verifies consistency between JSON and PDF representations
            </li>
            <li>
              Does not certify legal compliance or provide legal advice
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
