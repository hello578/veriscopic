
// /insights/page.tsx

export default function InsightsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Insights
      </h1>

      <p className="mt-4 text-slate-600">
        Briefings on AI governance, procurement expectations, and evidence-based
        compliance — written for operators, reviewers, and regulators.
      </p>

      <div className="mt-12 space-y-8">
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
          <a href="/insights/governance/policies-vs-evidence" className="group">
            <h2 className="text-xl font-semibold group-hover:underline">
              Why AI policies fail audits — and evidence doesn’t
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              The structural gap between compliance posture and audit reality.
            </p>
          </a>
        </article>
      </div>
    </main>
  )
}
