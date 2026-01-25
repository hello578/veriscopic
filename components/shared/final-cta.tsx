
// components/shared/final-cta.tsx
// components/shared/final-cta.tsx

import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="v-band">
      <div className="v-container text-center py-24 sm:py-32">
        <h2 className="v-h2 v-h2-invert">
          Request access
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-slate-200">
          Speak to us about evidence packs, procurement readiness,
          or external AI governance assurance.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="https://calendly.com/hello-veriscopic/30min"
            className="v-btn v-btn-primary v-btn-lg"
          >
            Request access
          </Link>

          <Link
            href="/evidence"
            className="v-btn v-btn-ghost v-btn-lg"
          >
            View sample evidence pack
          </Link>

          <Link
            href="/contact"
            className="v-btn v-btn-muted v-btn-lg"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  )
}
