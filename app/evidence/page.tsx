export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Veriscopic
        </p>

        <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          AI Governance. <br className="hidden sm:block" />
          Proven. Defensible. Immediate.
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-slate-600">
          Immutable evidence of AI governance — ready in 72 hours.
          If an investor, enterprise customer, insurer, or regulator asked you
          today to prove how your AI is governed, could you do it confidently?
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-base font-medium text-white hover:bg-slate-800"
          >
            Request an Evidence Pack
          </a>

          <a
            href="#details"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Learn how it works
          </a>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="mb-6 text-2xl font-semibold">
            Documents are not evidence
          </h2>

          <p className="max-w-3xl text-slate-600">
            AI governance is no longer theoretical. Companies are being asked to
            show how AI risks are disclosed, which terms apply, who accepted
            them, and whether records are immutable and auditable.
            <br />
            <br />
            PDFs can be edited. Screenshots don’t hold up. Policies without
            evidence fail procurement.
          </p>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="details" className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="mb-6 text-2xl font-semibold">
          The Veriscopic Evidence Pack
        </h2>

        <p className="mb-10 max-w-3xl text-slate-600">
          Veriscopic turns your AI governance into verifiable, tamper-proof
          evidence. We cryptographically lock your documents, capture acceptance,
          and generate an audit-ready record you can show externally.
        </p>

        <ul className="grid gap-6 sm:grid-cols-2">
          {[
            "Hash-locked legal documents (Terms, Privacy, AI disclosures)",
            "Timestamped acceptance records (who, when, version)",
            "Audit-ready evidence pack (PDF + machine-readable export)",
            "Clear narrative for investors, customers, insurers, and regulators",
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

      {/* WHO IT'S FOR */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="mb-6 text-2xl font-semibold">Who this is for</h2>

          <p className="max-w-3xl text-slate-600">
            Veriscopic Evidence Packs are designed for organisations that use AI,
            sell to enterprise or regulated buyers, are raising capital, or need
            to pass procurement, insurance, or governance reviews.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="mb-6 text-2xl font-semibold">Pricing</h2>

        <p className="mb-10 max-w-3xl text-slate-600">
          Evidence Packs start from <strong>£750</strong>. Most engagements fall
          between £1,500 and £2,500 depending on scope and complexity. Capacity
          is limited to ensure quality.
        </p>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="border-t border-slate-200 bg-slate-900"
      >
        <div className="mx-auto max-w-5xl px-6 py-20 text-white">
          <h2 className="mb-4 text-3xl font-semibold">
            Get your AI Governance Evidence Pack
          </h2>

          <p className="mb-8 max-w-2xl text-slate-300">
            If someone asked you tomorrow to prove your AI governance, don’t
            guess. Create defensible evidence in days, not months.
          </p>

          <a
            href="https://calendly.com/hello-veriscopic/30min"
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-slate-900 hover:bg-slate-100"
          >
            Book a call
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-slate-500">
          © {new Date().getFullYear()} Veriscopic. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
