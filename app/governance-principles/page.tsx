
// app/governance-principles/page.tsx

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Governance Principles",
  description:
    "The principles that guide Veriscopic’s approach to AI governance, evidence, accountability, and audit-ready oversight.",
}

export default function GovernancePrinciplesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        AI Governance Principles
      </h1>

      <p className="mt-6 text-slate-600">
        Veriscopic is built on the belief that effective AI governance requires
        evidence, accountability, and transparency — not assurances alone.
      </p>

      <div className="mt-12 space-y-8 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-base font-semibold text-slate-900">
            Evidence over intention
          </h2>
          <p>
            Governance should be demonstrable. Statements of intent, ethical
            guidelines, and internal policies must be supported by records that
            show how AI systems are actually governed over time.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">
            Clear accountability
          </h2>
          <p>
            Every AI system should have identifiable ownership and responsibility.
            Governance fails when accountability is diffuse or undocumented.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">
            Proportional governance
          </h2>
          <p>
            Governance controls should reflect risk and impact. Higher-risk AI
            systems require stronger oversight, documentation, and review.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">
            Continuous oversight
          </h2>
          <p>
            AI governance is not a one-time exercise. Systems evolve, usage
            changes, and risk profiles shift. Governance must be capable of
            reflecting that change.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">
            External scrutiny by design
          </h2>
          <p>
            Governance artefacts should be understandable and defensible to
            external reviewers, including auditors, regulators, insurers, and
            procurement teams.
          </p>
        </section>
      </div>
    </main>
  )
}
