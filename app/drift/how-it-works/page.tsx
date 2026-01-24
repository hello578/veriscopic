
// app/drift/how-it-works/page.tsx

// app/drift/how-it-works/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How Drift Detection Works | Veriscopic',
  description:
    'Understand how Veriscopic detects governance drift using immutable evidence snapshots and cryptographic comparison.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function DriftHowItWorksPage() {
  return (
    <main className="py-12">
      <div className="mx-auto max-w-3xl px-6 space-y-10">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-slate-700">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 font-medium">
            How Drift Detection Works
          </span>
        </div>

        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-slate-900">
            How governance drift is detected
          </h1>
          <p className="text-lg text-slate-600">
            Drift detection identifies material changes in governance evidence
            over time — without scoring, judgement, or regulatory interpretation.
          </p>
        </header>

        {/* Core explanation */}
        <section className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <p>
            Veriscopic records immutable snapshots of your organisation’s
            governance evidence at defined points in time. Each snapshot is
            cryptographically hashed and stored as a canonical record.
          </p>

          <p>
            When a new evidence pack is generated, it is compared against the
            most recent prior snapshot. Any changes to declared governance facts
            are identified as <strong>drift events</strong>.
          </p>

          <p>
            Drift detection does <strong>not</strong> assess risk, determine
            compliance, or assign regulatory classifications. It records factual
            changes only.
          </p>
        </section>

        {/* What is detected */}
        <section className="rounded-md border border-slate-200 bg-slate-50 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            What drift detection captures
          </h2>

          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>Addition, removal, or modification of AI system declarations</li>
            <li>Changes to governance-related document acceptance records</li>
            <li>Alterations to accountability or governance metadata</li>
          </ul>
        </section>

        {/* What it does NOT do */}
        <section className="rounded-md border border-slate-200 bg-white p-6 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            What drift detection does not do
          </h2>

          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            <li>No compliance scoring or certification</li>
            <li>No AI Act risk classification</li>
            <li>No legal advice or regulatory interpretation</li>
            <li>No continuous monitoring or surveillance</li>
          </ul>
        </section>

        {/* Auditor positioning */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Why this matters for audits and procurement
          </h2>

          <p className="text-sm text-slate-700">
            Many audits and procurement reviews fail not due to lack of policy,
            but due to lack of evidence showing how governance has changed over
            time.
          </p>

          <p className="text-sm text-slate-700">
            Drift detection provides a factual, timestamped record demonstrating
            whether governance inputs have remained stable or changed — and
            when.
          </p>
        </section>

        {/* Footer hint */}
        <footer className="pt-6 border-t text-xs text-slate-500">
          Drift detection is evidence-based and descriptive only. It is designed
          to support transparency, not replace legal or regulatory judgement.
        </footer>
      </div>
    </main>
  )
}
