// app/evidence/page.tsx

export default function EvidenceLandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* TOP NAV HINT */}
      <div className="mx-auto max-w-5xl px-6 pt-6">
        <a
          href="/"
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          ← Back to Veriscopic
        </a>
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Evidence Packs · External Assurance · Audit-Ready
        </p>

        <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          AI Governance Evidence.
          <br className="hidden sm:block" />
          Ready to be examined.
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-slate-600">
          Veriscopic produces immutable, audit-ready evidence of how your AI
          systems are governed — suitable for enterprise procurement,
          investor due diligence, insurance review, and regulatory scrutiny.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-base font-medium text-white hover:bg-slate-800"
          >
            Request an Evidence Pack
          </a>

          <a
            href="#deliverables"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            What you receive in 72 hours
          </a>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="mb-6 text-2xl font-semibold">
            Policies are not evidence
          </h2>

          <p className="max-w-3xl text-slate-600">
            Organisations are increasingly required to demonstrate how AI risks
            are disclosed, which terms apply, who accepted them, and whether
            records are immutable and auditable.
            <br /><br />
            PDFs can be edited. Screenshots lack integrity. Policies without
            acceptance evidence routinely fail procurement, insurance, and
            enterprise due diligence.
          </p>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="mb-6 text-2xl font-semibold">
          The Veriscopic Evidence Pack
        </h2>

        <p className="mb-10 max-w-3xl text-slate-600">
          Veriscopic converts your AI governance posture into verifiable,
          tamper-resistant evidence. Documents are cryptographically locked,
          acceptance is captured immutably, and outputs are structured to
          withstand external review.
        </p>

        <ul className="grid gap-6 sm:grid-cols-2">
          {[
            "Hash-locked legal and governance documents (Terms, Privacy, AI disclosures)",
            "Timestamped acceptance records (who accepted, when, and under which version)",
            "Audit-ready evidence pack (PDF + machine-readable export)",
            "Clear narrative suitable for investors, enterprise buyers, insurers, and regulators",
          ].map((item) => (
            <li
              key={item}
              className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* DELIVERABLES */}
      <section
        id="deliverables"
        className="border-t border-slate-200 bg-slate-50"
      >
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="mb-6 text-2xl font-semibold">
            What you receive in 72 hours
          </h2>

          <p className="mb-10 max-w-3xl text-slate-600">
            Each Evidence Pack is delivered on a fixed, rapid timeline to support
            live deals, procurement cycles, or regulatory requests.
          </p>

          <ol className="grid gap-6 sm:grid-cols-2">
            {[
              "Locked, versioned copies of current platform legal and AI governance documents",
              "Immutable acceptance records linked to document hashes and timestamps",
              "Externally shareable PDF evidence pack with structured explanations",
              "Machine-readable export suitable for audit, legal review, or insurer assessment",
              "Guidance on how to present the evidence to third parties",
            ].map((item, idx) => (
              <li
                key={item}
                className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700"
              >
                <span className="mb-2 block text-sm font-semibold text-slate-500">
                  Deliverable {idx + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="mb-6 text-2xl font-semibold">
          Who Evidence Packs are for
        </h2>

        <p className="max-w-3xl text-slate-600">
          Evidence Packs are designed for organisations that deploy AI and are
          required to demonstrate governance maturity to external parties —
          including enterprise customers, investors, insurers, auditors, and
          regulators.
        </p>
      </section>

      {/* PRICING */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="mb-6 text-2xl font-semibold">
            Pricing
          </h2>

          <p className="max-w-3xl text-slate-600">
            Evidence Packs start from <strong>£750</strong>. Most engagements fall
            between £1,500 and £2,500 depending on scope and complexity.
            Capacity is intentionally limited to ensure quality and defensibility.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="border-t border-slate-200 bg-slate-900"
      >
        <div className="mx-auto max-w-5xl px-6 py-20 text-white">
          <h2 className="mb-4 text-3xl font-semibold">
            Request an AI Governance Evidence Pack
          </h2>

          <p className="mb-8 max-w-2xl text-slate-300">
            If you were asked tomorrow to prove how your AI is governed,
            Veriscopic enables you to respond with confidence — not assumptions.
          </p>

          <a
            href="https://calendly.com/hello-veriscopic/30min"
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-slate-900 hover:bg-slate-100"
          >
            Book a call
          </a>
        </div>
      </section>

      {/* TRUST FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-slate-500">
          <p className="mb-2">
            Built for organisations operating across the UK and EU.
          </p>
          <p>
            Designed to support governance expectations under emerging AI
            regulation, enterprise procurement standards, and external audit
            requirements.
          </p>
        </div>
      </footer>
    </main>
  )
}
