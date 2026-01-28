
// components/verify/verify-uploader.tsx
// components/verify/verify-uploader.tsx

'use client'

import { JSX, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

/* -------------------------------------------------------------------------- */
/* Canonical JSON Types                                                       */
/* -------------------------------------------------------------------------- */

type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json }

type IntegrityBlock = {
  canonical_json_sha256?: string
}

/* -------------------------------------------------------------------------- */
/* Canonicalisation & hashing                                                 */
/* (DO NOT CHANGE — cryptographic invariant)                                  */
/* -------------------------------------------------------------------------- */

function canonicalizeJson(value: Json): Json {
  if (Array.isArray(value)) return value.map(canonicalizeJson)

  if (value && typeof value === 'object') {
    const obj = value as Record<string, Json>
    const keys = Object.keys(obj).sort()
    const out: Record<string, Json> = {}

    for (const k of keys) {
      out[k] = canonicalizeJson(obj[k])
    }

    return out
  }

  return value
}

function stripNonHashedFields(
  v: unknown
): Record<string, unknown> | unknown {
  if (!v || typeof v !== 'object') return v

  const copy = structuredClone(v) as Record<string, unknown>
  delete copy.integrity
  delete copy.signature

  return copy
}

function hasIntegrity(v: unknown): v is { integrity: IntegrityBlock } {
  return (
    typeof v === 'object' &&
    v !== null &&
    'integrity' in v &&
    typeof (v as { integrity?: unknown }).integrity === 'object'
  )
}

async function sha256Hex(input: string): Promise<string> {
  const enc = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', enc)

  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function VerifyUploader(): JSX.Element {
  const [fileName, setFileName] = useState<string | null>(null)
  const [expected, setExpected] = useState<string>('')
  const [computed, setComputed] = useState<string>('')
  const [status, setStatus] = useState<
    'idle' | 'hashing' | 'ok' | 'mismatch' | 'error'
  >('idle')

  async function onFile(file: File): Promise<void> {
    setFileName(file.name)
    setComputed('')
    setStatus('hashing')

    try {
      const text = await file.text()
      const parsed = JSON.parse(text) as unknown

      const expectedFromJson =
        hasIntegrity(parsed) &&
        typeof parsed.integrity.canonical_json_sha256 === 'string'
          ? parsed.integrity.canonical_json_sha256
          : ''

      if (expectedFromJson) {
        setExpected(expectedFromJson)
      }

      const stripped = stripNonHashedFields(parsed)
      const canonical = JSON.stringify(
        canonicalizeJson(stripped as Json)
      )

      const hash = await sha256Hex(canonical)
      setComputed(hash)

      if (expectedFromJson) {
        setStatus(
          expectedFromJson.trim().toLowerCase() === hash
            ? 'ok'
            : 'mismatch'
        )
      } else {
        setStatus('idle')
      }
    } catch {
      setStatus('error')
    }
  }

  function reset(): void {
    setFileName(null)
    setExpected('')
    setComputed('')
    setStatus('idle')
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="text-sm font-semibold">
          Independent verification
        </div>
        <div className="text-xs text-muted-foreground">
          All verification is performed locally in your browser.
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
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
              <strong>Integrity verified.</strong>
            )}
            {status === 'mismatch' && (
              <strong>Integrity mismatch.</strong>
            )}
            {status === 'error' && (
              <strong>Verification error.</strong>
            )}
          </div>
        )}

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

        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Step 2 — Expected hash
          </div>
          <input
            className="w-full rounded-md border px-3 py-2 text-xs"
            value={expected}
            onChange={(e) => setExpected(e.target.value)}
            placeholder="Paste expected SHA-256 here"
          />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Step 3 — Computed hash
          </div>
          <div className="rounded-md border bg-muted px-3 py-2 text-xs break-all">
            {computed || '—'}
          </div>
        </div>

        <Button type="button" variant="outline" onClick={reset}>
          Reset
        </Button>
      </CardContent>
    </Card>
  )
}
