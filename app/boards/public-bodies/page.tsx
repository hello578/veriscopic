// app/boards/public-bodies/page.tsx

import type { Metadata } from "next"
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
              <strong>transparent, proportionate oversight</strong> — especially
              where systems affect citizens, public funds, or democratic trust.
            </p>
            <p>
              Under review, inquiry, or investigation, the central question is:
            </p>
            <p>
              <strong>
                “What evidence shows governance was in place at the time
                decisions were made?”
              </strong>
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
                Board-ready Evidence Packs suitable for inquiry, audit,
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
          </div>
        </section>

        {/* HOW BODIES ENGAGE */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>How public and strategic bodies typically engage</h2>
            <p>
              Engagements usually begin with a scoped{" "}
              <strong>governance evidence pilot</strong> aligned to board or
              committee priorities.
            </p>
            <p>This allows boards to:</p>
            <ul className="v-list">
              <li>
                Establish a defensible baseline of governance evidence
              </li>
              <li>
                Prepare for external scrutiny before it occurs
              </li>
              <li>
                Demonstrate proportional oversight without operational burden
              </li>
            </ul>
            <p>
              Evidence continuity can then be maintained as systems, mandates,
              or risks evolve.
            </p>
          </div>
        </section>

        {/* REASSURANCE */}
        <section className="v-section v-muted">
          <div className="v-container v-copy">
            <h2>Built for accountability — not automation</h2>
            <p>
              Veriscopic does not make decisions, assess compliance, or replace
              public accountability mechanisms.
            </p>
            <p>
              It preserves evidence of how governance was exercised — enabling
              boards to demonstrate responsible stewardship when required.
            </p>
          </div>
        </section>

        <FinalCTA />
      </main>
    </PublicPage>
  )
}
