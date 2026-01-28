// app/why/page.tsx

import type { Metadata } from "next"
import Link from "next/link"
import { PublicPage } from "@/components/public-page"

export const metadata: Metadata = {
  title: "Why Veriscopic Exists | Evidence-Based AI Governance",
  description:
    "Why governance evidence matters in an age of AI, automated decision-making, and external scrutiny — and why intent alone is no longer enough.",
  openGraph: {
    title: "Why Veriscopic Exists",
    description:
      "Governance is no longer about claims. It is about what can be shown.",
    url: "https://veriscopic.com/why",
    siteName: "Veriscopic",
    locale: "en_GB",
    type: "article",
  },
}

export default function WhyPage() {
  return (
    <PublicPage variant="soft">
      <main className="space-y-16">
        {/* Core narrative */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h1>Why Veriscopic Exists</h1>

            <p>
              Organisations are increasingly judged not only on outcomes, but on
              <strong> how decisions were made</strong>.
            </p>

            <p>
              AI and digital systems now influence funding decisions, access to
              services, communications, eligibility, and operational priorities
              across <strong>charities, housing associations, health-adjacent
              public bodies, and regulated enterprises</strong>.
            </p>

            <p>
              Governance structures usually exist — policies, committees,
              registers, and risk statements — but the <em>evidence</em> of how
              those structures operated in practice is often fragmented,
              informal, or reconstructed after the fact.
            </p>

            <p>
              As scrutiny increases from regulators, auditors, insurers, and
              procurement teams, organisations are being asked a simple question:
            </p>

            <blockquote>
              Can you show how you governed your systems at the time decisions
              were made?
            </blockquote>

            <p>
              Increasingly, the correct answer cannot be a policy, a dashboard,
              or a retrospective assurance statement.
            </p>

            <p>
              <strong>It must be evidence.</strong>
            </p>
          </div>
        </section>

        {/* What’s broken */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>Where governance breaks down</h2>

            <p>
              Most organisations do not fail governance reviews because they did
              nothing. They fail because they cannot demonstrate{" "}
              <strong>what was known, decided, and overseen at a specific
              point in time</strong>.
            </p>

            <p>
              This gap becomes visible during:
            </p>

            <ul>
              <li>Regulatory or thematic reviews</li>
              <li>Procurement under frameworks such as the EU AI Act</li>
              <li>Insurance underwriting and renewal</li>
              <li>Serious incidents, complaints, or external challenge</li>
            </ul>

            <p>
              We explore this shift in depth in our{" "}
              <Link href="/insights/governance-evidence/from-policy-to-proof">
                board-level briefing on moving from policy to proof
              </Link>
              , and across our wider{" "}
              <Link href="/insights">Insights library</Link>.
            </p>
          </div>
        </section>

        {/* What Veriscopic does */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>What Veriscopic exists to do</h2>

            <p>
              Veriscopic exists to make governance{" "}
              <strong>provable, time-aware, and defensible</strong> — without
              turning organisations into compliance machines.
            </p>

            <p>
              We create a living, structured record of governance activity so
              organisations can demonstrate responsibility{" "}
              <em>as it was exercised</em>, not reconstructed later.
            </p>

            <p>
              This includes:
            </p>

            <ul>
              <li>Evidence-ready AI system records</li>
              <li>Immutable governance artefacts</li>
              <li>Decision and oversight timelines</li>
              <li>Clear accountability signals for boards and trustees</li>
            </ul>

            <p>
              These elements come together in our{" "}
              <Link href="/evidence-packs">Evidence Packs</Link>, designed to
              withstand external review, and our{" "}
              <Link href="/drift">Drift detection</Link> capability, which helps
              organisations identify when governance assumptions no longer match
              operational reality.
            </p>
          </div>
        </section>

        {/* Who it’s for */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>Who this is for</h2>

            <p>
              Veriscopic is used by organisations operating under legitimate
              scrutiny, including:
            </p>

            <ul>
              <li>
                <Link href="/insights/housing/evidencing-digital-governance">
                  Housing associations
                </Link>{" "}
                managing regulated digital services
              </li>
              <li>
                <Link href="/insights/health/evidencing-ai-governance">
                  Health-adjacent public bodies
                </Link>{" "}
                subject to clinical and operational assurance
              </li>
              <li>
                <Link href="/insights/charity/trustee-governance-evidence">
                  Charities and trustees
                </Link>{" "}
                responsible for public confidence and funding integrity
              </li>
              <li>
                Organisations facing insurance, audit, or procurement review
              </li>
            </ul>

            <p>
              Across these sectors, the common requirement is the same:
              <strong> credible evidence of governance in practice</strong>.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="v-section">
          <div className="v-container v-copy">
            <h2>What we believe</h2>

            <p>
              We believe governance should be proportionate, intelligible, and
              anchored in reality — not performative, automated, or fear-driven.
            </p>

            <p>
              We are not here to replace judgement with checklists, or to claim
              compliance on anyone’s behalf.
            </p>

            <p>
              <strong>
                We are here to ensure that when organisations are asked to show
                how they governed, they can do so calmly, accurately, and
                credibly.
              </strong>
            </p>
          </div>
        </section>
      </main>
    </PublicPage>
  )
}
