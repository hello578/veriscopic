//app/page.tsx

import Link from 'next/link'

export default function RootPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-5xl px-6 pt-28 pb-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Veriscopic
        </p>

        <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          AI governance. <br className="hidden sm:block" />
          Proven. Defensible. Immediate.
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-slate-600">
          Immutable, audit-ready evidence of how your AI is governed —
          accepted, timestamped, and defensible.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-base font-medium text-white hover:bg-slate-800"
          >
            Sign in
          </Link>

          <Link
            href="/evidence"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Evidence Packs
          </Link>
        </div>
      </section>
    </main>
  )
}

