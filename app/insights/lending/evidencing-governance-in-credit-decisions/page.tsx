
// app/insights/lending/evidencing-governance-in-credit-decisions/page.tsx

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title:
    "How lenders are expected to evidence governance in AI-assisted credit decisions",
  description:
    "Why lenders are increasingly judged on their ability to evidence oversight of digital and AI-assisted decision-making.",
}

export default function LendingGovernanceEvidencePage() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-24">
      <h1>
        How lenders are expected to evidence governance in AI-assisted credit decisions
      </h1>

      <p>
        Lenders increasingly rely on digital and AI-assisted systems across origination,
        underwriting, and portfolio management. As scrutiny grows, so does the
        expectation that governance of those systems can be evidenced.
      </p>

      <h2>Where governance scrutiny arises in lending</h2>

      <p>
        External review can be triggered by disputes, defaults, regulatory inquiry,
        investor diligence, or insurance review. In each case, reviewers focus on how
        decisions were governed at the time they were made.
      </p>

      <ul>
        <li>Which systems influenced the decision?</li>
        <li>Who was accountable?</li>
        <li>What oversight existed?</li>
        <li>What evidence can be produced?</li>
      </ul>

      <h2>The limits of model documentation and policy</h2>

      <p>
        Lenders often maintain extensive model documentation and policy frameworks.
        However, these do not always translate into evidence that satisfies external
        reviewers.
      </p>

      <p>
        Common gaps include lack of time-stamping, unclear accountability, and difficulty
        demonstrating how governance was exercised in practice.
      </p>

      <h2>What defensible governance evidence looks like</h2>

      <p>
        Proportionate, evidence-based governance in lending typically includes:
      </p>

      <ul>
        <li>Clear system registers</li>
        <li>Named ownership and responsibility</li>
        <li>Recorded governance and risk decisions</li>
        <li>Time-fixed evidence of review and change</li>
      </ul>

      <h2>Why this matters for lenders now</h2>

      <p>
        As AI governance expectations mature, lenders are increasingly assessed on their
        ability to demonstrate oversight rather than assert it.
      </p>

      <h2>About this briefing</h2>

      <p>
        This briefing reflects conversations with credit, risk, and operations leaders
        navigating evolving expectations around AI-assisted decision-making.
      </p>

      <hr />

      <p>
        <em>
          Related reading:{" "}
          <Link href="/insights/governance-evidence/from-policy-to-proof">
            From policy to proof: why boards are being asked to evidence AI governance
          </Link>
        </em>
      </p>
    </article>
  )
}
