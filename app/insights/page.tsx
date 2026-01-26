// app/insights/page.tsx
// app/insights/page.tsx

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
          <ArticleLink
            href="/insights/risk-insurance/ai-risk-underwriting"
            title="What insurers will ask for when underwriting AI risk"
            summary="How AI governance evidence increasingly shapes underwriting, exclusions, and coverage decisions."
          />
          <ArticleLink
            href="/insights/ai-act/procurement-evidence"
            title="What procurement teams actually look for under the EU AI Act"
            summary="Why policies and promises are not enough — and what evidence reviewers expect to see."
          />
          <ArticleLink
            href="/insights/governance/policies-vs-evidence"
            title="Why AI policies fail audits — and evidence doesn’t"
            summary="The structural gap between compliance posture and audit reality."
          />
        </div>
      </section>
    </PublicPage>
  )
}

type ArticleProps = {
  href: string
  title: string
  summary: string
}

function ArticleLink({ href, title, summary }: ArticleProps) {
  return (
    <article>
      <a href={href} className="group">
        <h2 className="text-xl font-semibold group-hover:underline">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{summary}</p>
      </a>
    </article>
  )
}

