
// /insights/governance/policies-vs-evidence/page.tsx

import type { Metadata } from "next"

export const metadata = {
  title: "Why AI policies fail audits — and evidence-based governance succeeds",
  description:
    "A practical explanation of why AI policies alone fail audits and how evidence-based governance changes procurement and regulatory outcomes.",
}

export default function PoliciesVsEvidencePost() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-24">
      <h1>
        Why AI policies fail audits — and evidence doesn’t
      </h1>

      <p>
        Most AI governance failures do not stem from bad intentions. They stem
        from a mismatch between how governance is documented and how audits work.
      </p>

      <h2>The problem with policy-led governance</h2>

      <p>
        Policies describe what should happen. Audits examine what actually did
        happen.
      </p>

      <p>
        When governance exists only as narrative documents, there is no reliable
        way to prove consistency, enforcement, or change over time.
      </p>

      <h2>Audits are forensic by nature</h2>

      <p>
        External reviewers work backwards from outcomes. They look for:
      </p>

      <ul>
        <li>Decision records</li>
        <li>Versioned documentation</li>
        <li>Immutable timestamps</li>
        <li>Clear ownership</li>
      </ul>

      <h2>Evidence changes the conversation</h2>

      <p>
        When governance is captured as evidence rather than narrative, audits
        become confirmation exercises instead of investigations.
      </p>

      <p>
        This distinction increasingly determines whether AI systems are approved,
        delayed, or rejected.
      </p>
    </article>
  )
}
