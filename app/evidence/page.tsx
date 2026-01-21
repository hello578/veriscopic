
// app/evidence/page.tsx

// app/evidence/page.tsx

import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { sampleEvidencePdfExists } from '@/lib/legal/sample-pdf-exists'

export const metadata: Metadata = {
  title: 'AI Governance Evidence Packs for Enterprise Procurement',
  description:
    'Immutable, audit-ready AI governance evidence packs suitable for enterprise procurement, insurers, investors, and regulatory scrutiny across the UK and EU.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function EvidenceLandingPage() {
  const hasSample = sampleEvidencePdfExists()

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* FAQ SCHEMA */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is an AI Governance Evidence Pack?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'An AI Governance Evidence Pack is an externally shareable, audit-ready record demonstrating how AI systems are governed, including locked documents, immutable acceptance records, and structured evidence suitable for procurement, insurance, investor, and regulatory review.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is this a compliance or certification product?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'No. Veriscopic records declared governance facts only. It does not provide legal advice, certify compliance, or classify AI systems under regulation.',
                },
              },
            ],
          }),
        }}
      />

      {/* TOP NAV */}
      <div className="mx-auto max-w-5xl px-6 pt-6">
        <Link
          href="/dashboard"
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          ← Back to dashboard
        </Link>
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
          systems are governed — suitable for enterprise procurement, investor
          due diligence, insurance review, and regulatory scrutiny.
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

      {/* POLICIES ≠ EVIDENCE */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="mb-6 text-2xl font-semibold">
            Policies are not evidence
          </h2>

          <p className="max-w-3xl text-slate-600">
            Organisations are increasingly required to demonstrate how AI risks
            are governed, disclosed, and accepted — including which terms apply,
            who accepted them, and whether records are immutable and auditable.
          </p>

          <p className="mt-4 max-w-3xl text-slate-600">
            Editable PDFs, screenshots, and policies without acceptance evidence
            routinely fail enterprise procurement, insurance review, and due
            diligence.
          </p>
        </div>
      </section>

      {/* INCLUDED */}
      <section
        id="included"
        className="mx-auto max-w-5xl px-6 py-24"
      >
        <h2 className="mb-6 text-2xl font-semibold">
          What’s included in an Evidence Pack
        </h2>

        <p className="mb-10 max-w-3xl text-slate-600">
          Each Evidence Pack is structured to withstand scrutiny from enterprise
          procurement teams, insurers, investors, auditors, and regulators.
        </p>

        <ul className="grid gap-6 sm:grid-cols-2">
          {[
            'Hash-locked legal, privacy, and AI governance documents',
            'Immutable acceptance records with timestamps and document versions',
            'Externally shareable PDF evidence pack (redacted if required)',
            'Machine-readable JSON export for audit and legal review',
            'Clear verification instructions for third parties',
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

      {/* VERIFICATION */}
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
      {hasSample && (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-24">
            <h2 className="mb-6 text-2xl font-semibold">
              View a redacted sample Evidence Pack
            </h2>

            <p className="mb-6 max-w-3xl text-slate-600">
              Review a redacted example to understand the structure, depth, and
              verification guarantees provided to third parties.
            </p>

            <a
              href="/api/evidence-pack/pdf-sample?organisationId=sample"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              View sample PDF
            </a>

            <p className="mt-4 max-w-3xl text-xs text-slate-500">
              This is a public, redacted example. Organisation-specific
              identifiers are hidden; structure, integrity guarantees, and
              verification behaviour are unchanged.
            </p>
          </div>
        </section>
      )}

      {/* EU AI ACT */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="mb-6 text-2xl font-semibold">
            Supporting EU AI Act governance
          </h2>

          <p className="max-w-3xl text-slate-600">
            Evidence Packs are designed to support transparency, documentation,
            and governance expectations emerging under the EU AI Act.
          </p>

          <p className="mt-4 max-w-3xl text-slate-600">
            Veriscopic does not provide legal advice, certify compliance, classify
            AI risk, or assess system performance. Evidence Packs record declared
            governance facts only.
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

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-slate-500">
          Built for organisations operating across the UK and EU · Audit-evidence
          first · External-facing by design
        </div>
      </footer>
    </main>
  )
}

