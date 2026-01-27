
// app/boards/public-bodies/page.tsx

import type { Metadata } from "next"
import Link from "next/link"
import { PublicPage } from "@/components/public-page"
import { FinalCTA } from "@/components/shared/final-cta"

export const metadata: Metadata = {
  title: "Public & Strategic Bodies | Veriscopic",
  description:
    "Governance evidence for boards of public, arm’s-length, and strategic bodies using digital and AI-assisted systems.",
  keywords: [
    "public sector ai governance",
    "arm's length body governance",
    "board oversight public bodies",
    "ai governance public sector",
    "government digital oversight evidence",
    "strategic body governance evidence",
  ],
  openGraph: {
    title: "Governance Evidence for Public & Strategic Bodies",
    description:
      "Defensible evidence showing how digital and AI-assisted systems are governed in public and strategic environments.",
    url: "https://veriscopic.com/boards/public-bodies",
    siteName: "Veriscopic",
    locale: "en_GB",
    type: "website",
  },
}

export default function PublicBodiesBoardsPage() {
  return (
    <PublicPage variant="soft">
      <main className="space-y-16 sm:space-y-20">
        {/* HERO */}
        <section className="v-hero v-hero-light rounded-2xl border border-slate-200/70 bg-white/90 px-6 py-12 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:px-12 sm:py-14">
          <div className="v-container max-w-none px-0">
            <h1 className="v-h1">
              Governance Evidence for Public & Strategic Bodies
            </h1>
            <p className="v-hero-subtitle max-w-3xl">
              Clear, defensible records showing how digital and AI-assisted
              systems are governed — built for public accountability.
            </p>
          </div>
        </section>

        {/* CONTEXT */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>Public accountability demands more than assurance statements</h2>
            <p>
              Public and arm’s-length bodies increasingly rely on digital and
              AI-assisted systems for service delivery, prioritisation,
              eligibility, and operational decision-making.
            </p>
            <p>
              Boards are expected to demonstrate{" "}
              <strong>transparent, proportionate oversight</strong> —
              particularly where systems affect citizens or public funds.
            </p>
            <p>
              Under inquiry or investigation, the central question is:
            </p>
            <p>
              <strong>
                “What evidence shows governance was in place at the time
                decisions were made?”
              </strong>
            </p>

            <p className="mt-6 text-sm text-slate-600">
              Part of Veriscopic’s work on{" "}
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
                systems declared at board level
              </li>
              <li>
                Time-stamped governance evidence showing accountability,
                sponsorship, and oversight structures
              </li>
              <li>
                Board-ready Evidence Packs suitable for audit, inquiry,
                parliamentary, or ministerial review
              </li>
              <li>
                Governance drift snapshots highlighting where oversight no
                longer reflects operational reality
              </li>
            </ul>
            <p>
              The outcome is a <strong>durable public record</strong> of
              governance — not a transient assurance narrative.
            </p>

            <p className="mt-4">
              See how this evidence is captured in{" "}
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
                <Link href="/boards/regulated" className="underline">
                  Governance evidence for regulated & financial services boards
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
