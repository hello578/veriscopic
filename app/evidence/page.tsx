
// app/evidence/page.tsx


import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "AI Governance Evidence Packs for Enterprise Procurement",
  description:
    "Request immutable, audit-ready AI governance evidence packs suitable for enterprise procurement, investors, insurers, and regulatory scrutiny across the UK and EU.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function EvidenceLandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* FAQ SCHEMA */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is an AI Governance Evidence Pack?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "An AI Governance Evidence Pack is a structured, audit-ready record demonstrating how AI systems are governed, including locked documents, immutable acceptance records, and externally shareable evidence suitable for procurement, insurers, investors, and regulators.",
                },
              },
              {
                "@type": "Question",
                name: "Is this suitable for EU AI Act or enterprise procurement reviews?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. Evidence Packs are designed to support governance expectations under emerging AI regulation such as the EU AI Act, as well as enterprise procurement, insurance review, and external audit.",
                },
              },
              {
                "@type": "Question",
                name: "How quickly can an Evidence Pack be delivered?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Most Evidence Packs are delivered within 72 hours once scope and documents are confirmed.",
                },
              },
              {
                "@type": "Question",
                name: "Who typically requests Evidence Packs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Evidence Packs are commonly requested by enterprise customers, procurement teams, insurers, investors, auditors, and regulators assessing AI governance maturity.",
                },
              },
            ],
          }),
        }}
      />

      {/* TOP NAV */}
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
            href="#included"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            What’s included
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
      </section>

      {/* INCLUDED */}
      <section
        id="included"
        className="border-t border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="mb-6 text-2xl font-semibold">
            What’s included in an Evidence Pack
          </h2>

          <p className="mb-10 max-w-3xl text-slate-600">
            Each Evidence Pack is designed to withstand scrutiny from enterprise
            procurement teams, insurers, investors, and regulators.
          </p>

          <ul className="grid gap-6 sm:grid-cols-2">
            {[
              "Hash-locked copies of current legal, privacy, and AI governance documents",
              "Immutable acceptance records showing who accepted what, when, and under which version",
              "Externally shareable PDF evidence pack with clear governance narrative",
              "Machine-readable export suitable for audit, legal review, or insurer assessment",
              "Guidance on how to present the evidence during procurement or due diligence",
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DELIVERY */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="mb-6 text-2xl font-semibold">
            Delivered within 72 hours
          </h2>

          <p className="max-w-3xl text-slate-600">
            Evidence Packs are delivered on a fixed, rapid timeline to support
            live procurement processes, funding rounds, insurance underwriting,
            or regulatory enquiries.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="mb-6 text-2xl font-semibold">
            Pricing
          </h2>

          <p className="max-w-3xl text-slate-600">
            Evidence Packs start from <strong>£750</strong>. Most engagements fall
            between <strong>£1,500 and £2,500</strong>, depending on scope,
            document complexity, and governance depth required.
          </p>

          <p className="mt-4 max-w-3xl text-slate-600">
            Pricing reflects the creation of externally defensible evidence —
            not generic documentation. Capacity is intentionally limited to
            maintain quality.
          </p>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-24 space-y-10">
          <h2 className="text-2xl font-semibold">
            Frequently asked questions
          </h2>

          <div>
            <h3 className="mb-2 font-semibold">
              What is an AI Governance Evidence Pack?
            </h3>
            <p className="text-slate-600">
              A structured, audit-ready record showing how AI systems are
              governed, including locked documents, immutable acceptance
              records, and a narrative suitable for enterprise review.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">
              Is this suitable for EU AI Act reviews?
            </h3>
            <p className="text-slate-600">
              Yes. Evidence Packs are designed to support governance expectations
              under emerging AI regulation and enterprise procurement standards.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">
              How fast is delivery?
            </h3>
            <p className="text-slate-600">
              Most Evidence Packs are delivered within 72 hours once scope is
              confirmed.
            </p>
          </div>
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
