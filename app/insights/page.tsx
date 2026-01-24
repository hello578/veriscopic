
// /insights/page.tsx


import { PublicPage } from "@/components/public-page"

export default function InsightsPage() {
  return (
    <PublicPage variant="soft">
      {/* Page header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Insights
          </h1>
          <p className="mt-3 text-slate-600">
            Briefings on AI governance, procurement expectations, risk, and
            evidence-based compliance — written for operators, reviewers,
            insurers, and regulators.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="space-y-10">
          <article>
            <a
              href="/insights/risk-insurance/ai-risk-underwriting"
              className="group"
            >
              <h2 className="text-xl font-semibold group-hover:underline">
                What insurers will ask for when underwriting AI risk
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                How AI governance evidence increasingly shapes underwriting,
                exclusions, and coverage decisions.
              </p>
            </a>
          </article>

          <article>
            <a href="/insights/ai-act/procurement-evidence" className="group">
              <h2 className="text-xl font-semibold group-hover:underline">
                What procurement teams actually look for under the EU AI Act
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Why policies and promises are not enough — and what evidence
                reviewers expect to see.
              </p>
            </a>
          </article>

          <article>
            <a
              href="/insights/governance/policies-vs-evidence"
              className="group"
            >
              <h2 className="text-xl font-semibold group-hover:underline">
                Why AI policies fail audits — and evidence doesn’t
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                The structural gap between compliance posture and audit reality.
              </p>
            </a>
          </article>
        </div>
      </section>
    </PublicPage>
  )
}
