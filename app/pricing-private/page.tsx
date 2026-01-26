
// app/pricing-private/page.tsx

import type { Metadata } from "next"
import { FinalCTA } from "@/components/shared/final-cta"
import { PublicPage } from "@/components/public-page"

export const metadata: Metadata = {
  title: "Engagement & Investment | Veriscopic",
  description:
    "How organisations typically engage with Veriscopic for governance evidence and assurance.",
  robots: "noindex, nofollow",
}

export default function PrivatePricingPage() {
  return (
    <PublicPage variant="soft">
      <main className="space-y-12 sm:space-y-16">
        {/* HERO */}
        <section className="v-hero v-hero-light rounded-2xl border border-slate-200/70 bg-white/90 px-6 py-10 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:px-10 sm:py-12">
          <div className="v-container max-w-none px-0">
            <h1 className="v-h1">How organisations typically engage</h1>
            <p className="v-hero-subtitle">
              Pricing aligned to governance risk, scrutiny, and evidence needs —
              not usage or seat counts.
            </p>
          </div>
        </section>

        {/* ENGAGEMENT MODEL */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>Engagement model</h2>
            <p>
              Veriscopic is not priced per user, seat, or API call.
            </p>
            <p>
              Most organisations begin with a short, scoped{" "}
              <strong>governance evidence pilot</strong>, designed to help boards
              understand what evidence looks like in practice and whether
              ongoing assurance would be valuable.
            </p>
          </div>
        </section>

        {/* TYPICAL RANGES */}
        <section className="v-section v-muted">
          <div className="v-container v-copy">
            <h2>Typical investment ranges</h2>
            <ul className="v-list">
              <li>
                <strong>Governance evidence pilot (30–45 days):</strong>{" "}
                £2,500 – £5,000
              </li>
              <li>
                <strong>Annual governance evidence maintenance:</strong>{" "}
                £5,000 – £15,000+ (size and complexity dependent)
              </li>
            </ul>
            <p>
              Final scope and pricing are always agreed transparently and
              proportionately once organisational context is understood.
            </p>
          </div>
        </section>

        {/* WHAT THIS COVERS */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>What this covers</h2>
            <ul className="v-list">
              <li>Governance Evidence Packs</li>
              <li>Digital & AI systems registers</li>
              <li>Time-stamped audit artefacts</li>
              <li>Governance drift detection</li>
              <li>Evidence continuity over time</li>
            </ul>
            <p>
              The outcome is <strong>defensible governance evidence</strong>,
              suitable for boards and external scrutiny.
            </p>
          </div>
        </section>

        <FinalCTA />
      </main>
    </PublicPage>
  )
}
