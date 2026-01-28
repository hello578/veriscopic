
// app/governance/responsibility-map/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Responsibility Map — Veriscopic',
  description:
    'How accountability becomes evidence: responsibility mapping defines decision accountability, evidence obligations, and review triggers for governance.',
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-8">
      <h2 className="text-sm font-semibold tracking-[0.16em] text-slate-500 uppercase">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  )
}

export default function ResponsibilityMapExplainerPage() {
  return (
    <main className="bg-slate-100/70">
      <div className="mx-auto max-w-[980px] px-4 pb-16 pt-10 sm:px-6 sm:pt-12">
        <div className="space-y-8">
          <header className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
              Governance evidence model
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Responsibility mapping: how accountability becomes evidence
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-700">
              Modern governance usually fails at the moment scrutiny arrives — not because policies
              don’t exist, but because accountability is unclear when decisions were made. The
              Responsibility Map records decision accountability as an organisation-level fact, and
              ties it to evidence that can be exported and verified.
            </p>
          </header>

          <Section title="What the Responsibility Map records">
            <p>
              Responsibility records define <strong>who is accountable</strong> for key governance
              decisions, <strong>what evidence must exist</strong> because of those decisions, and{' '}
              <strong>when responsibilities must be revisited</strong>.
            </p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong>Accountable role</strong> — the role (not an individual) accountable for the
                decision surface
              </li>
              <li>
                <strong>Decision surface</strong> — the decision or oversight area that creates
                governance exposure
              </li>
              <li>
                <strong>Evidence produced</strong> — what must exist to demonstrate the
                responsibility was exercised
              </li>
              <li>
                <strong>Review trigger</strong> — when the responsibility must be reviewed
              </li>
            </ul>
          </Section>

          <Section title="What this is not">
            <p>
              The Responsibility Map is intentionally conservative. It does not assign personal
              liability or make compliance claims.
            </p>
            <ul className="ml-4 list-disc space-y-2">
              <li>It does not certify legal compliance.</li>
              <li>It does not provide legal advice.</li>
              <li>It does not monitor runtime AI behaviour or employee activity.</li>
              <li>It does not score risk classification under the EU AI Act.</li>
            </ul>
          </Section>

          <Section title="How it fits into Evidence Packs and Drift">
            <p>
              Veriscopic’s model is deliberately simple:
            </p>
            <div className="rounded-xl border border-slate-200/70 bg-slate-50 p-4">
              <p className="text-sm text-slate-800">
                <strong>Responsibility</strong> defines what should exist.{' '}
                <strong>Evidence Packs</strong> export what does exist.{' '}
                <strong>Drift</strong> detects when they diverge.
              </p>
            </div>
            <p>
              Responsibility records are included in Evidence Packs so they can be inspected as part
              of audit and procurement review. Drift detection compares sealed governance snapshots
              to identify changes over time.
            </p>
          </Section>

          <Section title="Where to see this in the product">
            <p>
              You can view responsibility mapping inside the organisation dashboard under{' '}
              <strong>Governance inputs</strong>. Evidence Packs include a responsibility summary
              and integrity hash for independent verification.
            </p>
            <p className="pt-2">
              <Link
                href="/"
                className="text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
              >
                Back to dashboard
              </Link>
            </p>
          </Section>
        </div>
      </div>
    </main>
  )
}
