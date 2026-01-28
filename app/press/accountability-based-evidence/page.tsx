
// app/press/accountability-based-evidence/page.tsx

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Veriscopic introduces accountability-based evidence for AI governance",
  description:
    "Veriscopic announces an evolution of its governance platform, introducing accountability as verifiable evidence.",
}

export default function AccountabilityPressRelease() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-24">
      <h1>
        Veriscopic introduces accountability-based evidence for AI governance
      </h1>

      <p>
        <strong>London, UK</strong> — Veriscopic today announced a significant
        evolution of its governance platform, introducing accountability-based
        evidence as a first-class component of AI governance.
      </p>

      <p>
        The update enables organisations to record explicit responsibility
        declarations — including who was accountable for key decisions, what
        evidence existed at the time, and when responsibilities must be reviewed
        — as immutable, exportable evidence.
      </p>

      <p>
        “Most governance tools record artefacts,” Veriscopic said. “Veriscopic
        records accountability itself — fixed in time — and tracks how
        governance changes afterwards.”
      </p>

      <p>
        Traditional governance approaches rely heavily on policies, dashboards,
        and retrospective explanations. While useful in the present, these
        artefacts often fail under later scrutiny, when organisations are asked
        to demonstrate how governance was exercised at the time decisions were
        made.
      </p>

      <p>
        Veriscopic’s approach links three elements:
      </p>

      <ul>
        <li>
          <strong>Responsibility:</strong> explicit accountability declarations
        </li>
        <li>
          <strong>Evidence Packs:</strong> sealed, audit-ready snapshots of
          governance artefacts
        </li>
        <li>
          <strong>Drift:</strong> detection and classification of governance
          change over time
        </li>
      </ul>

      <p>
        The platform does not claim regulatory compliance or replace legal
        advice. Instead, it provides durable, verifiable governance evidence to
        support independent assessment by boards, auditors, insurers,
        regulators, and procurement teams.
      </p>

      <p>
        The update reflects a growing expectation that AI governance be
        demonstrated in practice, not only declared in policy.
      </p>
    </article>
  )
}
