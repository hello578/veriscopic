
// app/verify/page.tsx

import VerifyUploader from "@/components/verify/verify-uploader"
import { PublicPage } from "@/components/public-page"

export default function VerifyPage() {
  return (
    <PublicPage variant="soft">
      <section className="mx-auto max-w-3xl px-6 py-24 space-y-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Verify a Veriscopic Evidence Pack
          </h1>
          <p className="mt-3 text-slate-600">
            Independently verify the integrity of an Evidence Pack using
            cryptographic hashing. No login or data transmission required.
          </p>
        </div>

        <VerifyUploader />

        <div className="rounded-md border bg-white p-6 text-sm text-slate-600">
          Verification confirms integrity only. It does not assess legal
          compliance, risk classification, or regulatory status.
        </div>
      </section>
    </PublicPage>
  )
}

