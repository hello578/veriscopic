
// app/evidence/page.tsx

import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { sampleEvidencePdfExists } from '@/lib/legal/sample-pdf-exists'

const hasSample = sampleEvidencePdfExists()

{hasSample && (
  <a
    href="/sample/veriscopic-evidence-pack-sample.pdf"
    className="text-sm text-slate-600 underline"
    target="_blank"
  >
    View public sample evidence pack
  </a>
)}


export const metadata: Metadata = {
  title: "AI Governance Evidence Packs for Enterprise Procurement",
  description:
    "Request immutable, audit-ready AI governance evidence packs suitable for enterprise procurement, insurers, investors, and regulatory scrutiny across the UK and EU.",
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
                    "An AI Governance Evidence Pack is an audit-ready, externally shareable record demonstrating how AI systems are governed, including locked documents, immutable acceptance records, and structured evidence suitable for enterprise procurement, insurers, investors, and regulators.",
                },
              },
              {
                "@type": "Question",
                name: "Is this suitable for EU AI Act or enterprise procurement reviews?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. Evidence Packs are designed to support governance, transparency, and documentation expectations under emerging AI regulation such as the EU AI Act, as well as enterprise procurement and insurance due diligence.",
                },
              },
              {
                "@type": "Question",
                name: "How quickly can an Evidence Pack be delivered?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Most Evidence Packs are delivered within 72 hours once governance scope and documentation are confirmed.",
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

      {/* TOP NAV / CONTEXT */}
      <div className="mx-auto max-w-5xl px-6 pt-6">
        <Link href="/dashboard" className="text-sm text-slate-500 hover:text-slate-700">
          ← Back to dashboard
        </Link>
      </div>
      <div className="mb-6 text-xs text-slate-500">
  <Link href="/dashboard" className="hover:text-slate-700">
    Dashboard
  </Link>
  <span className="mx-2">/</span>
  <span className="text-slate-700 font-medium">Evidence</span>
       </div>

      {/* HERO */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Evidence Packs · External Assurance · Audit-Ready
        </p>

        <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          AI governance evidence.
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

      {/* IN-PRODUCT CONTEXT */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-md border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-medium text-slate-900">
            Evidence for your organisation
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Evidence Packs are generated from your declared governance inputs,
            including accepted platform documents and AI system declarations.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Availability depends on governance completeness.
          </p>
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
            are governed, disclosed, and accepted — including which terms apply,
            who accepted them, and whether records are immutable and auditable.
            <br /><br />
            PDFs can be edited. Screenshots lack integrity. Policies without
            acceptance evidence routinely fail procurement, insurance, and
            enterprise due diligence.
          </p>
        </div>
      </section>

      {/* INCLUDED */}
      <section id="included" className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="mb-6 text-2xl font-semibold">
          What’s included in an Evidence Pack
        </h2>

        <p className="mb-10 max-w-3xl text-slate-600">
          Each Evidence Pack is structured to withstand scrutiny from enterprise
          procurement teams, insurers, investors, auditors, and regulators.
        </p>

        <ul className="grid gap-6 sm:grid-cols-2">
          {[
            "Hash-locked legal, privacy, and AI governance documents",
            "Immutable acceptance records with timestamps and document versions",
            "Externally shareable PDF evidence pack (redacted if required)",
            "Machine-readable JSON export suitable for audit and legal review",
            "Clear verification instructions for third parties",
          ].map((item) => (
            <li
              key={item}
              className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-slate-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* VERIFY BRIDGE */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="mb-4 text-2xl font-semibold">
            Independent verification
          </h2>
          <p className="mb-6 max-w-3xl text-slate-600">
            Every Evidence Pack can be independently verified using cryptographic
            hashing. No login or trust in Veriscopic is required.
          </p>
          <Link
            href="/verify"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Verify an Evidence Pack
          </Link>
        </div>
      </section>

      {/* SAMPLE PDF */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="mb-6 text-2xl font-semibold">
            View a redacted sample Evidence Pack
          </h2>

          <p className="mb-6 max-w-3xl text-slate-600">
            Review a redacted example of an AI Governance Evidence Pack to
            understand the structure, depth, and format provided to third
            parties.
          </p>

          <a
            href="/sample/veriscopic-evidence-pack-sample.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            View sample PDF
            “This is a redacted example. Organisation-specific fields are hidden, 
            however structure and integrity guarantees are unchanged.”
          </a>
        </div>
      </section>

      {/* EU AI ACT */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="mb-6 text-2xl font-semibold">
            Supporting EU AI Act governance
          </h2>

          <p className="max-w-3xl text-slate-600">
            Evidence Packs are designed to support transparency, documentation,
            and governance expectations emerging under the EU AI Act.
            <br /><br />
            While Veriscopic does not provide legal advice or certify compliance,
            Evidence Packs help organisations demonstrate responsible governance,
            documented controls, and accountability when responding to external
            reviews.
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
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="border-t border-slate-200 bg-slate-900">
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
          Built for organisations operating across the UK and EU · Audit-evidence
          first · External-facing by design
        </div>
      </footer>
    </main>
  )
}
