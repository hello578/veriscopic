
// app/pricing/page.tsx

import type { Metadata } from "next"
import { FinalCTA } from "@/components/shared/final-cta"
import { PublicPage } from "@/components/public-page"

export const metadata: Metadata = {
  title: "Pricing | Veriscopic",
  description:
    "Transparent, enterprise-grade pricing for AI governance and evidence packs. Designed for regulated and high-trust environments.",
  keywords: [
    "AI governance pricing",
    "EU AI Act compliance cost",
    "AI evidence packs",
    "AI audit readiness",
    "AI governance platform pricing",
    "regulatory AI compliance",
  ],
  openGraph: {
    title: "Veriscopic Pricing",
    description:
      "Enterprise-grade pricing designed for AI governance, audit readiness, and regulatory scrutiny.",
    url: "https://veriscopic.com/pricing",
    siteName: "Veriscopic",
    images: [
      {
        url: "https://veriscopic.com/og/pricing.png",
        width: 1200,
        height: 630,
        alt: "Veriscopic pricing overview",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veriscopic Pricing",
    description:
      "Transparent pricing for enterprise-grade AI governance and evidence packs.",
  },
}

export default function PricingPage() {
  return (
    <PublicPage variant="soft">
      <main className="space-y-12 sm:space-y-16">
        <section className="v-hero v-hero-light rounded-2xl border border-slate-200/70 bg-white/90 px-6 py-10 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:px-10 sm:py-12">
          <div className="v-container max-w-none px-0">
            <h1 className="v-h1">Pricing</h1>
            <p className="v-hero-subtitle">
              Pricing designed for scrutiny — not seat counts.
            </p>
          </div>
        </section>

        <section className="v-section">
          <div className="v-container v-copy">
            <h2>Pricing aligned to risk and accountability</h2>
            <p>
              Veriscopic pricing reflects <strong>regulatory exposure, system
                criticality, and evidence requirements</strong> — not usage volume,
              API calls, or user seats.
            </p>
            <p>
              This ensures pricing remains aligned with{" "}
              <strong>audit, procurement, and regulatory expectations</strong>,
              rather than operational activity.
            </p>
          </div>
        </section>

        <section className="v-section v-muted">
          <div className="v-container v-copy">
            <h2>What customers typically invest</h2>
            <p>
              Most organisations work with Veriscopic on engagements starting{" "}
              <strong>from the low four figures per month</strong>, with an
              initial setup phase tailored to scope.
            </p>
            <p>Pricing varies based on:</p>
            <ul className="v-list">
              <li>Regulatory exposure (e.g. EU AI Act obligations)</li>
              <li>Number and criticality of AI systems</li>
              <li>Depth of evidence required</li>
              <li>Ongoing governance and drift monitoring needs</li>
            </ul>
            <p>
              Exact pricing is always discussed transparently once scope is
              understood.
            </p>
          </div>
        </section>

        <section className="v-section v-muted">
          <div className="v-container v-copy">
            <h2>What pricing includes</h2>
            <ul className="v-list">
              <li>AI system registration and classification</li>
              <li>Governance documentation alignment</li>
              <li>Cryptographically verifiable Evidence Packs</li>
              <li>Time-stamped audit artefacts</li>
              <li>Ongoing drift detection</li>
              <li>Evidence continuity and survivability guarantees</li>
            </ul>
            <p>
              The outcome is <strong>defensible proof</strong> — not dashboards.
            </p>
          </div>
        </section>

        <section className="v-section">
          <div className="v-container v-copy">
            <h2>How this compares</h2>

            <h3>Compared to compliance platforms</h3>
            <ul className="v-list">
              <li>No checkbox scoring</li>
              <li>No opaque automation</li>
              <li>No dependency on platform availability to verify evidence</li>
            </ul>

            <h3>Compared to law firms</h3>
            <ul className="v-list">
              <li>No open-ended advisory billing</li>
              <li>No static opinions that decay immediately</li>
              <li>Evidence updates as systems evolve</li>
            </ul>
          </div>
        </section>

        {/* FINAL CTA */}
        <FinalCTA />
      </main>
    </PublicPage>
  )
}
