// app/verify/page.tsx

export default function VerifyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">
        Verify a Veriscopic Evidence Pack
      </h1>

      <p className="mt-4 text-sm text-muted-foreground">
        Evidence Packs are cryptographically verifiable exports of governance evidence.
        This page explains how to independently verify integrity.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-medium">What you need</h2>
        <ul className="list-disc pl-5 text-sm">
          <li>The Evidence Pack JSON file (downloaded from Veriscopic).</li>
          <li>The SHA-256 hash printed in the PDF footer.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-medium">How verification works</h2>
        <ol className="list-decimal pl-5 text-sm space-y-2">
          <li>
            The canonical hash is stored in <code>integrity.canonical_json_sha256</code>.
          </li>
          <li>
            Remove <code>integrity</code> and <code>signature</code> fields from the JSON.
          </li>
          <li>
            Canonicalize the remaining JSON (sort all object keys recursively).
          </li>
          <li>
            Compute SHA-256 over the canonical JSON string.
          </li>
          <li>
            If the computed hash matches the value in the PDF footer, the pack has not been altered.
          </li>
        </ol>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-medium">Optional: verify via API</h2>
        <p className="text-sm text-muted-foreground">
          You can also verify an evidence pack by POSTing the JSON to:
        </p>
        <pre className="rounded-lg border p-3 text-xs overflow-auto">
{`POST /api/evidence-pack/verify
Content-Type: application/json

{ ...evidencePackJson }`}
        </pre>
      </section>

      <section className="mt-10">
        <p className="text-xs text-muted-foreground">
          Veriscopic does not provide legal advice and does not certify compliance.
          Verification confirms integrity of exported evidence only.
        </p>
      </section>
    </main>
  )
}
