// app/boards/public/page.tsx

import type { Metadata } from "next"
import { PublicPage } from "@/components/public-page"
import { FinalCTA } from "@/components/shared/final-cta"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Boards | Veriscopic",
  description:
    "Board-level governance evidence showing how digital and AI-assisted systems are governed in practice — not just on paper.",
  keywords: [
    "board governance evidence",
    "non-executive oversight",
    "AI governance boards",
    "audit and risk committee evidence",
    "digital governance accountability",
    "board assurance evidence",
  ],
  openGraph: {
    title: "Governance Evidence for Boards",
    description:
      "Clear, proportionate evidence of how digital and AI-assisted systems are governed — built for boards, not operators.",
    url: "https://veriscopic.com/boards",
    siteName: "Veriscopic",
    locale: "en_GB",
    type: "website",
  },
}

export default function BoardsPage() {
  return (
    <PublicPage variant="soft">
      <main className="space-y-16 sm:space-y-20">
        {/* HERO */}
        <section className="v-hero v-hero-light rounded-2xl border border-slate-200/70 bg-white/90 px-6 py-12 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:px-12 sm:py-14">
          <div className="v-container max-w-none px-0">
            <h1 className="v-h1">Governance Evidence for Boards</h1>
            <p className="v-hero-subtitle max-w-3xl">
              Clear, defensible evidence of how digital and AI-assisted systems
              are governed — in practice, not just in policy.
            </p>
          </div>
        </section>

        {/* CONTEXT */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>When scrutiny increases, intent is no longer enough</h2>
            <p>
              Boards are increasingly asked to demonstrate how oversight of
              digital and AI-assisted systems is exercised in reality — not just
              how it is described.
            </p>
            <p>
              This scrutiny may come from regulators, auditors, funders,
              insurers, procurement teams, or public inquiry. In each case, the
              question is the same:
            </p>
            <p>
              <strong>
                “What evidence shows that the board had oversight at the time
                decisions were made?”
              </strong>
            </p>
            <p>
              Many organisations have responsible governance intentions. What is
              often missing is a <strong>durable evidence record</strong> that
              can be relied upon months or years later.
            </p>
          </div>
        </section>

        {/* WHAT VERISCOPIC DOES */}
        <section className="v-section v-muted">
          <div className="v-container v-copy">
            <h2>What Veriscopic provides</h2>
            <ul className="v-list">
              <li>
                A board-level register of material digital and AI-assisted
                systems, expressed in plain English
              </li>
              <li>
                Time-stamped governance evidence showing ownership,
                accountability, and oversight in force at a point in time
              </li>
              <li>
                Board-ready Evidence Packs (PDF) suitable for scrutiny by
                auditors, regulators, funders, insurers, or reviewers
              </li>
              <li>
                Governance drift snapshots highlighting when documentation or
                oversight no longer reflects operational reality
              </li>
            </ul>
            <p>
              The outcome is not a dashboard, score, or certification, but a 
              <strong>defensible record of governance intent and action</strong>.
            </p>
          </div>
        </section>

        {/* HOW BOARDS USE IT */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>How boards typically engage</h2>
            <p>
              Most boards begin with a short, scoped{" "}
              <strong>governance evidence pilot</strong>.
            </p>
            <p>This allows boards and committees to:</p>
            <ul className="v-list">
              <li>
                See what governance evidence looks like in practice, not theory
              </li>
              <li>
                Identify where oversight is clear, implied, or undocumented
              </li>
              <li>
                Understand whether ongoing evidence continuity would materially
                reduce risk
              </li>
            </ul>
            <p>
              Engagements are always proportionate to organisational scale,
              complexity, and risk exposure.
            </p>
          </div>
        </section>

        {/* WHO THIS IS FOR */}
        <section className="v-section v-muted">
          <div className="v-container v-copy">
            <h2>Who this is designed for</h2>
            <p>
              Veriscopic is used by boards and non-executives across sectors
              where accountability, trust, and scrutiny matter.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <SectorCard
                title="Charities & Non-Profits"
                description="Trustee-ready evidence for digital and AI-assisted systems affecting beneficiaries, donors, and public trust."
                href="/boards/charities"
              />
              <SectorCard
                title="Regulated & Financial Services"
                description="Board-level evidence supporting audit, risk, procurement, and regulatory scrutiny."
                href="/boards/regulated"
              />
              <SectorCard
                title="Public & Strategic Bodies"
                description="Defensible governance records suitable for parliamentary, public, or ministerial review."
                href="/boards/public-bodies"
              />
            </div>
          </div>
        </section>

        {/* REASSURANCE */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>Designed to support boards — not replace judgement</h2>
            <p>
              Veriscopic does not automate decisions, assess compliance, or
              provide legal advice.
            </p>
            <p>
              It preserves evidence of how governance was exercised at the time —
              allowing boards to demonstrate responsible oversight with clarity
              and confidence when asked.
            </p>
          </div>
        </section>

        {/* CTA */}
        <FinalCTA />
      </main>
    </PublicPage>
  )
}

type SectorCardProps = {
  title: string
  description: string
  href: string
}

function SectorCard({ title, description, href }: SectorCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
    >
      <h3 className="text-base font-semibold group-hover:underline">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </Link>
  )
}
