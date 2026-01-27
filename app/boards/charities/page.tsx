
// app/boards/charities/page.tsx

import type { Metadata } from "next"
import Link from "next/link"
import { FinalCTA } from "@/components/shared/final-cta"
import { PublicPage } from "@/components/public-page"

export const metadata: Metadata = {
  title: "Charities & Non-Profits Boards | Veriscopic",
  description:
    "Board-level governance evidence for charities and non-profits using digital and AI-assisted systems. Trustee-ready, proportionate, and defensible.",
  keywords: [
    "charity governance evidence",
    "trustee digital oversight",
    "ai governance charities",
    "non-profit board accountability",
    "charity audit evidence",
    "governance evidence packs",
  ],
  openGraph: {
    title: "Governance Evidence for Charities & Non-Profits Boards",
    description:
      "Trustee-ready evidence showing how digital and AI-assisted systems are governed in practice.",
    url: "https://veriscopic.com/boards/charities",
    siteName: "Veriscopic",
    locale: "en_GB",
    type: "website",
  },
}

export default function CharitiesBoardsPage() {
  return (
    <PublicPage variant="soft">
      <main className="space-y-12 sm:space-y-16">
        {/* HERO */}
        <section className="v-hero v-hero-light rounded-2xl border border-slate-200/70 bg-white/90 px-6 py-10 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:px-10 sm:py-12">
          <div className="v-container max-w-none px-0">
            <h1 className="v-h1">
              Governance Evidence for Charities & Non-Profits
            </h1>
            <p className="v-hero-subtitle max-w-3xl">
              Clear, proportionate evidence of how digital and AI-assisted
              systems are governed — built for trustees and charity boards.
            </p>
          </div>
        </section>

        {/* CONTEXT */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>When scrutiny increases, intent is no longer enough</h2>
            <p>
              Charities increasingly rely on digital platforms and AI-assisted
              systems for fundraising, communications, service delivery, and
              operational decision-making.
            </p>
            <p>
              Trustees are therefore expected to demonstrate{" "}
              <strong>
                oversight, accountability, and proportionate governance
              </strong>{" "}
              — particularly where decisions affect beneficiaries, donors, or
              public trust.
            </p>
            <p>
              Many organisations are acting responsibly. What is often missing is
              a <strong>clear, durable evidence record</strong> showing what was
              in place, when, and under whose oversight.
            </p>

            <p className="mt-6 text-sm text-slate-600">
              This page forms part of Veriscopic’s work on{" "}
              <Link href="/boards" className="underline">
                governance evidence for boards
              </Link>
              .
            </p>
          </div>
        </section>

        {/* WHAT VERISCOPIC PROVIDES */}
        <section className="v-section v-muted">
          <div className="v-container v-copy">
            <h2>What Veriscopic provides</h2>
            <ul className="v-list">
              <li>
                A plain-English register of material digital and AI-assisted
                systems, declared at board level
              </li>
              <li>
                Time-stamped governance evidence showing policies, ownership, and
                accountability in force at a point in time
              </li>
              <li>
                Trustee-ready Evidence Packs (PDF) suitable for boards, funders,
                auditors, or regulators
              </li>
              <li>
                Governance drift snapshots highlighting where documentation or
                oversight has diverged as systems evolve
              </li>
            </ul>
            <p>
              The outcome is not a dashboard, score, or certification — but a{" "}
              <strong>defensible record of governance intent and action</strong>.
            </p>

            <p className="mt-4">
              See how this works in practice via{" "}
              <Link href="/evidence" className="underline">
                Veriscopic Evidence Packs
              </Link>
              .
            </p>
          </div>
        </section>

        {/* HOW ORGANISATIONS ENGAGE */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>How charities typically engage</h2>
            <p>
              Most charities and non-profits begin with a short, scoped{" "}
              <strong>governance evidence pilot</strong>.
            </p>
            <p>This allows trustees and senior leaders to:</p>
            <ul className="v-list">
              <li>See what governance evidence looks like in practice</li>
              <li>Understand where oversight is clear or ambiguous</li>
              <li>Assess whether ongoing evidence maintenance adds value</li>
            </ul>
            <p>
              Engagements are always proportionate to organisational size,
              complexity, and risk exposure.
            </p>
          </div>
        </section>

        {/* CROSS NAV */}
        <section className="v-section v-muted">
          <div className="v-container v-copy">
            <h2>Related board contexts</h2>
            <ul className="v-list">
              <li>
                <Link href="/boards/regulated" className="underline">
                  Governance evidence for regulated & financial services boards
                </Link>
              </li>
              <li>
                <Link href="/boards/public-bodies" className="underline">
                  Governance evidence for public & strategic bodies
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* REASSURANCE */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>Designed to support trustees — not replace judgement</h2>
            <p>
              Veriscopic does not automate decisions, assess compliance, or
              provide legal advice.
            </p>
            <p>
              It preserves evidence of how governance was exercised at the time —
              allowing trustees to demonstrate responsible oversight when asked.
            </p>
          </div>
        </section>

        <FinalCTA />
      </main>
    </PublicPage>
  )
}
