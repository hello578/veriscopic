// app/verify/page.tsx
import VerifyUploader from '@/components/verify/verify-uploader'

export default function VerifyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Verify a Veriscopic Evidence Pack
        </h1>
        <p className="text-sm text-muted-foreground">
          Upload an Evidence Pack JSON file to compute the canonical SHA-256 hash
          locally in your browser. No file content is transmitted.
        </p>
        <p className="text-sm text-muted-foreground">
          This tool performs independent, client-side verification. No data is uploaded
          or transmitted to Veriscopic servers.
        </p>

      </div>

      <VerifyUploader />

      <p className="text-xs text-muted-foreground">
        Veriscopic does not provide legal advice and does not certify compliance.
        Verification confirms integrity of exported evidence only.
      </p>
    </main>
  )
}
