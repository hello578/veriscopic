
// app/verify/page.tsx
// app/verify/page.tsx

import VerifyUploader from "@/components/verify/verify-uploader"
import { PublicPage } from "@/components/public-page"

export default function VerifyPage() {
  return (
    <PublicPage variant="soft">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-0 sm:py-24 space-y-10">
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

        <div className="rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          Verification confirms integrity only. It does not assess legal
          compliance, risk classification, or regulatory status.
        </div>
      </section>
    </PublicPage>
  )
}
