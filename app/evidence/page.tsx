
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
        <div className="v-container v-copy">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Evidence Packs · External Assurance · Audit-Ready
          </p>

          <h1 className="v-h1 mb-6">
            AI governance evidence.
            <br />
            Ready to be examined.
          </h1>

          <p className="max-w-2xl text-lg text-slate-600">
            Veriscopic produces immutable, audit-ready evidence of how your AI
            systems are governed — suitable for enterprise procurement, investor
            due diligence, insurance review, and regulatory scrutiny.
          </p>

          {/* CTA GROUP */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="https://calendly.com/hello-veriscopic/30min"
              className="v-btn v-btn-primary"
            >
              Request an Evidence Pack
            </Link>

            <Link href="#included" className="v-btn v-btn-ghost">
              What’s included
            </Link>
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="v-section v-muted">
        <div className="v-container v-copy">
          <div className="rounded-lg border bg-white p-6">
            <p className="font-medium">Evidence for your organisation</p>
            <p className="mt-2 text-slate-600">
              Evidence Packs are generated from declared governance inputs,
              including accepted platform documents and AI system declarations.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Availability depends on governance completeness.
            </p>
          </div>
        </div>
      </section>

      {/* POLICIES */}
      <section className="v-section">
        <div className="v-container v-copy">
          <h2 className="v-h2">Policies are not evidence</h2>

          <p className="max-w-3xl text-slate-600">
            Organisations are increasingly required to demonstrate how AI risks
            are governed, disclosed, and accepted — including which terms apply,
            who accepted them, and whether records are immutable and auditable.
          </p>

          <p className="mt-6 max-w-3xl text-slate-600">
            Editable PDFs, screenshots, and policies without acceptance evidence
            routinely fail enterprise procurement, insurance review, and due
            diligence.
          </p>
        </div>
      </section>

      {/* INCLUDED */}
      <section id="included" className="v-section v-muted">
        <div className="v-container v-copy">
          <h2 className="v-h2">What’s included in an Evidence Pack</h2>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              "Hash-locked legal, privacy, and AI governance documents",
              "Immutable acceptance records with timestamps and document versions",
              "Externally shareable PDF evidence pack (redacted if required)",
              "Machine-readable JSON export for audit and legal review",
              "Clear verification instructions for third parties",
            ].map((item) => (
              <li key={item} className="rounded-lg border bg-white p-6">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VERIFICATION */}
      <section className="v-section">
        <div className="v-container v-copy">
          <h2 className="v-h2">Independent verification</h2>

          <p className="max-w-3xl text-slate-600">
            Every Evidence Pack can be independently verified using cryptographic
            hashing. No login or trust in Veriscopic is required.
          </p>

          <div className="mt-8">
            <Link href="/verify" className="v-btn v-btn-muted">
              Verify an Evidence Pack
            </Link>
          </div>
        </div>
      </section>

      {/* SAMPLE */}
      {hasSample && (
        <section className="v-section v-muted">
          <div className="v-container v-copy">
            <h2 className="v-h2">View a redacted sample Evidence Pack</h2>

            <div className="mt-8">
              <a
                href="/api/evidence-pack/pdf-sample?organisationId=sample"
                target="_blank"
                className="v-btn v-btn-ghost"
              >
                View sample PDF
              </a>
            </div>
          </div>
        </section>
      )}

      {/* EU AI ACT */}
      <section className="v-section">
        <div className="v-container v-copy">
          <h2 className="v-h2">Supporting EU AI Act governance</h2>

          <p className="max-w-3xl text-slate-600">
            Evidence Packs are designed to support transparency, documentation,
            and governance expectations emerging under the EU AI Act.
          </p>

          <p className="mt-6 max-w-3xl text-slate-600">
            Veriscopic does not provide legal advice, certify compliance,
            classify AI risk, or assess system performance. Evidence Packs record
            declared governance facts only.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="v-section v-band">
        <div className="v-container text-center">
          <h2 className="v-h2 v-h2-invert">
            Request an AI Governance Evidence Pack
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-slate-200">
            If you were asked tomorrow to prove how your AI is governed,
            Veriscopic enables you to respond with confidence — not assumptions.
          </p>

          <div className="mt-10">
            <Link
              href="https://calendly.com/hello-veriscopic/30min"
              className="v-btn v-btn-primary v-btn-lg"
            >
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
