
// app/evidence/page.tsx
// app/evidence/page.tsx

import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { sampleEvidencePdfExists } from "@/lib/legal/sample-pdf-exists"

export const metadata: Metadata = {
  title: "AI Governance Evidence Packs | Veriscopic",
  description:
    "Immutable, audit-ready AI governance evidence packs for enterprise procurement, insurers, investors, and regulatory scrutiny across the UK and EU.",
  robots: { index: true, follow: true },
}

export default function EvidenceLandingPage() {
  const hasSample = sampleEvidencePdfExists()

  return (
    <main className="text-slate-900">
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
                    "An AI Governance Evidence Pack is an externally shareable, audit-ready record demonstrating how AI systems are governed, including locked documents, immutable acceptance records, and structured evidence suitable for procurement, insurance, investor, and regulatory review.",
                },
              },
              {
                "@type": "Question",
                name: "Is this a compliance or certification product?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "No. Veriscopic records declared governance facts only. It does not provide legal advice, certify compliance, or classify AI systems under regulation.",
                },
              },
            ],
          }),
        }}
      />

      {/* HERO */}
      <section className="v-section">
        <div className="v-container max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Evidence Packs · External Assurance · Audit-Ready
          </p>

          <h1 className="text-4xl font-semibold leading-tight mb-6">
            AI governance evidence.
            <br />
            Ready to be examined.
          </h1>

          <p className="text-lg text-slate-600 mb-10">
            Veriscopic produces immutable, audit-ready evidence of how your AI
            systems are governed — suitable for enterprise procurement, investor
            due diligence, insurance review, and regulatory scrutiny.
          </p>

          {/* PRIMARY CTA ROW */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Link
              href="https://calendly.com/hello-veriscopic/30min"
              className="inline-flex justify-center rounded-lg bg-slate-900 px-6 py-3 text-white font-medium hover:bg-slate-800"
            >
              Request an Evidence Pack
            </Link>

            <Link
              href="#included"
              className="inline-flex justify-center rounded-lg border border-slate-300 px-6 py-3 text-slate-700 font-medium hover:bg-slate-50"
            >
              What’s included
            </Link>
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="v-section bg-slate-50">
        <div className="v-container max-w-3xl">
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <p className="font-medium mb-2">Evidence for your organisation</p>
            <p className="text-slate-600">
              Evidence Packs are generated from declared governance inputs,
              including accepted platform documents and AI system declarations.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Availability depends on governance completeness.
            </p>
          </div>
        </div>
      </section>

      {/* POLICIES */}
      <section className="v-section">
        <div className="v-container max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            Policies are not evidence
          </h2>

          <p className="text-slate-600 mb-4">
            Organisations are increasingly required to demonstrate how AI risks
            are governed, disclosed, and accepted — including which terms apply,
            who accepted them, and whether records are immutable and auditable.
          </p>

          <p className="text-slate-600">
            Editable PDFs, screenshots, and policies without acceptance evidence
            routinely fail enterprise procurement, insurance review, and due
            diligence.
          </p>
        </div>
      </section>

      {/* INCLUDED */}
      <section id="included" className="v-section bg-slate-50">
        <div className="v-container max-w-4xl">
          <h2 className="text-2xl font-semibold mb-8">
            What’s included in an Evidence Pack
          </h2>

          <ul className="grid gap-6 sm:grid-cols-2">
            {[
              "Hash-locked legal, privacy, and AI governance documents",
              "Immutable acceptance records with timestamps and document versions",
              "Externally shareable PDF evidence pack (redacted if required)",
              "Machine-readable JSON export for audit and legal review",
              "Clear verification instructions for third parties",
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-slate-200 bg-white p-6"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VERIFICATION */}
      <section className="v-section">
        <div className="v-container max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            Independent verification
          </h2>

          <p className="text-slate-600 mb-8">
            Every Evidence Pack can be independently verified using cryptographic
            hashing. No login or trust in Veriscopic is required.
          </p>

          <Link
            href="/verify"
            className="inline-flex justify-center rounded-lg border border-slate-300 px-6 py-3 text-slate-700 font-medium hover:bg-slate-50"
          >
            Verify an Evidence Pack
          </Link>
        </div>
      </section>

      {/* SAMPLE */}
      {hasSample && (
        <section className="v-section bg-slate-50">
          <div className="v-container max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">
              View a redacted sample Evidence Pack
            </h2>

            <p className="text-slate-600 mb-8">
              Review a redacted example to understand structure, depth, and
              verification guarantees.
            </p>

            <a
              href="/api/evidence-pack/pdf-sample?organisationId=sample"
              target="_blank"
              className="inline-flex justify-center rounded-lg border border-slate-300 px-6 py-3 text-slate-700 font-medium hover:bg-slate-50"
            >
              View sample PDF
            </a>
          </div>
        </section>
      )}

      {/* EU AI ACT */}
      <section className="v-section">
        <div className="v-container max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            Supporting EU AI Act governance
          </h2>

          <p className="text-slate-600 mb-4">
            Evidence Packs are designed to support transparency, documentation,
            and governance expectations emerging under the EU AI Act.
          </p>

          <p className="text-slate-600">
            Veriscopic does not provide legal advice, certify compliance,
            classify AI risk, or assess system performance. Evidence Packs record
            declared governance facts only.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-900 py-24">
        <div className="v-container max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Request an AI Governance Evidence Pack
          </h2>

          <p className="text-slate-300 mb-10">
            If you were asked tomorrow to prove how your AI is governed,
            Veriscopic enables you to respond with confidence — not assumptions.
          </p>

          <Link
            href="https://calendly.com/hello-veriscopic/30min"
            className="inline-flex justify-center rounded-lg bg-white px-8 py-4 text-slate-900 font-medium hover:bg-slate-100"
          >
            Book a call
          </Link>
        </div>
      </section>

      {/* HARD SPACER BEFORE GLOBAL FOOTER */}
      <div aria-hidden className="h-40" />
    </main>
  )
}
