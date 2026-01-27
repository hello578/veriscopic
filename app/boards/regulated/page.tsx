
// app/boards/regulated/page.tsx

import type { Metadata } from "next"
import Link from "next/link"
import { PublicPage } from "@/components/public-page"
import { FinalCTA } from "@/components/shared/final-cta"

export const metadata: Metadata = {
  title: "Regulated & Financial Services Boards | Veriscopic",
  description:
    "Board-level governance evidence for regulated and financial services organisations using digital and AI-assisted systems.",
  keywords: [
    "regulated ai governance",
    "financial services board oversight",
    "audit and risk committee evidence",
    "ai governance banks",
    "regulatory scrutiny ai systems",
    "governance evidence financial services",
  ],
  openGraph: {
    title: "Governance Evidence for Regulated & Financial Services Boards",
    description:
      "Defensible, time-stamped evidence showing how digital and AI-assisted systems are governed in regulated environments.",
    url: "https://veriscopic.com/boards/regulated",
    siteName: "Veriscopic",
    locale: "en_GB",
    type: "website",
  },
}

export default function RegulatedBoardsPage() {
  return (
    <PublicPage variant="soft">
      <main className="space-y-16 sm:space-y-20">
        {/* HERO */}
        <section className="v-hero v-hero-light rounded-2xl border border-slate-200/70 bg-white/90 px-6 py-12 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:px-12 sm:py-14">
          <div className="v-container max-w-none px-0">
            <h1 className="v-h1">
              Governance Evidence for Regulated & Financial Services Boards
            </h1>
            <p className="v-hero-subtitle max-w-3xl">
              Clear, defensible evidence of how digital and AI-assisted systems
              are governed — built for audit, risk, and regulatory scrutiny.
            </p>
          </div>
        </section>

        {/* CONTEXT */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>When regulation intensifies, boards are expected to show proof</h2>
            <p>
              Regulated organisations increasingly rely on complex digital and
              AI-assisted systems across credit, fraud, underwriting, pricing,
              operations, and customer decision-making.
            </p>
            <p>
              Boards are therefore expected to demonstrate{" "}
              <strong>active oversight</strong> — not just policy intent or
              delegated control frameworks.
            </p>
            <p>
              Under supervisory or audit scrutiny, the question becomes:
            </p>
            <p>
              <strong>
                “What evidence shows the board governed these systems at the
                time decisions were made?”
              </strong>
            </p>

            <p className="mt-6 text-sm text-slate-600">
              This page sits within Veriscopic’s work on{" "}
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
                A board-level register of material digital and AI-assisted
                systems, aligned to regulatory exposure
              </li>
              <li>
                Time-stamped governance evidence showing ownership,
                accountability, and escalation structures in force
              </li>
              <li>
                Audit-ready Evidence Packs suitable for regulators,
                supervisors, insurers, or internal audit
              </li>
              <li>
                Governance drift snapshots identifying divergence between
                documentation and system reality
              </li>
            </ul>
            <p>
              The result is a <strong>defensible governance record</strong> —
              independent of operational dashboards.
            </p>

            <p className="mt-4">
              Learn more about{" "}
              <Link href="/evidence" className="underline">
                Veriscopic Evidence Packs
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CROSS NAV */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>Related board contexts</h2>
            <ul className="v-list">
              <li>
                <Link href="/boards/public-bodies" className="underline">
                  Governance evidence for public & strategic bodies
                </Link>
              </li>
              <li>
                <Link href="/charities" className="underline">
                  Trustee-ready governance evidence for charities & non-profits
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <FinalCTA />
      </main>
    </PublicPage>
  )
}

