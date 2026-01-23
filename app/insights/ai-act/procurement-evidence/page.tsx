// insights/ai-act/procurement-evidence/page.tsx

import type { Metadata } from "next"

  export const metadata = {
  title: "EU AI Act procurement requirements: what evidence reviewers expect",
  description:
    "What procurement teams look for under the EU AI Act, why policies are insufficient, and what evidence-based AI governance actually passes review.",
}

export default function ProcurementEvidencePost() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-24">
      <h1>
        What procurement teams actually look for under the EU AI Act
      </h1>

      <p>
        As the EU AI Act moves from legislation to enforcement, procurement teams
        are becoming the first line of review for AI governance.
      </p>

      <p>
        What many organisations underestimate is that procurement does not assess
        intent — it assesses evidence.
      </p>

      <h2>Policies are not evidence</h2>

      <p>
        Internal AI policies, ethical statements, and risk frameworks are useful,
        but they are not sufficient. Procurement reviewers increasingly look for
        artefacts that demonstrate how AI systems are governed in practice.
      </p>

      <h2>What reviewers actually expect to see</h2>

      <ul>
        <li>A clear inventory of AI systems in use</li>
        <li>Documented ownership and accountability</li>
        <li>Evidence of risk classification and review</li>
        <li>Records of governance decisions over time</li>
        <li>Externally verifiable documentation</li>
      </ul>

      <h2>Why evidence beats assurance</h2>

      <p>
        The EU AI Act introduces obligations that are ongoing, not one-off. As a
        result, static documentation is quickly treated as stale.
      </p>

      <p>
        Organisations that can produce timestamped, verifiable evidence of
        governance activity are materially easier to approve.
      </p>

      <p>
        This is the shift from compliance posture to compliance proof.
      </p>
    </article>
  )
}
