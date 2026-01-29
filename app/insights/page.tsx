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
            Board-level briefings on AI governance, procurement expectations,
            risk, and evidence-based oversight — written for boards, trustees,
            insurers, reviewers, and regulators.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="space-y-16">

          {/* Foundations */}
          <Section
            title="Board and regulatory foundations"
            description="Why governance expectations are shifting from intent and policy to defensible, system-level evidence."
          >
            <ArticleLink
              href="/insights/governance-evidence/accountability-as-evidence"
              title="Why accountability is becoming the core unit of AI governance"
              summary="Why boards, regulators, and insurers increasingly expect accountability to be fixed in time as evidence."
            />

            <ArticleLink
              href="/insights/governance-evidence/from-policy-to-proof"
              title="From policy to proof: why boards are being asked to evidence AI governance"
              summary="A board-level briefing on the growing gap between governance intent and defensible, system-level evidence."
            />

            <ArticleLink
              href="/insights/ai-act/procurement-evidence"
              title="What procurement teams actually look for under the EU AI Act"
              summary="Why policies and promises are not enough — and what evidence reviewers expect to see in practice."
            />
          </Section>

          {/* Sector-specific scrutiny */}
          <Section
            title="Sector-specific governance scrutiny"
            description="How evidence expectations differ across regulated and high-accountability environments."
          >
            <ArticleLink
              href="/insights/housing/evidencing-digital-governance"
              title="How housing associations are being asked to evidence digital governance in practice"
              summary="Why boards are increasingly expected to demonstrate system-level oversight — not just policy intent."
            />

            <ArticleLink
              href="/insights/health/evidencing-ai-governance"
              title="How health bodies are expected to evidence AI and digital governance under external review"
              summary="Why clinical assurance and policies alone no longer satisfy regulators, auditors, and procurement teams."
            />

            <ArticleLink
              href="/insights/charity/trustee-governance-evidence"
              title="What trustees are being asked to evidence about AI and digital decision-making"
              summary="Why funders and regulators increasingly expect defensible records of oversight, not just assurance."
            />
          </Section>

          {/* Risk, insurance, and liability */}
          <Section
            title="Risk, insurance, and liability"
            description="How governance evidence increasingly shapes underwriting, claims, lending, and external scrutiny."
          >
            <ArticleLink
              href="/insights/risk-insurance/evidencing-governance-for-underwriting"
              title="What insurers look for when underwriting governance risk in AI and digital systems"
              summary="How governance evidence influences coverage decisions, exclusions, and post-loss review."
            />

            <ArticleLink
              href="/insights/property/conveyancing-governance-evidence"
              title="Why conveyancing firms are being asked to evidence governance, not just follow process"
              summary="How reliance on email and PDFs creates risk in property transactions — and why evidence now matters."
            />

            <ArticleLink
              href="/insights/lending/evidencing-governance-in-credit-decisions"
              title="How lenders are expected to evidence governance in AI-assisted credit decisions"
              summary="Why credit, risk, and investment decisions are increasingly judged on defensible oversight."
            />
          </Section>

          {/* Comparative analysis */}
          <Section
            title="Comparative analysis"
            description="Understanding the limits of compliance automation and the role of evidence under scrutiny."
          >
            <ArticleLink
              href="/compare/evidence-vs-compliance-automation"
              title="Evidence-based AI governance vs compliance automation platforms"
              summary="Why dashboards and checklists fail under external review — and what works instead."
            />

            <ArticleLink
              href="/compare/why-ai-compliance-checklists-fail"
              title="Why AI compliance checklists fail procurement review"
              summary="The structural limitations of self-attestation when defensible evidence is required."
            />
          </Section>

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
      <a href={href} className="group block">
        <h3 className="text-lg font-semibold group-hover:underline">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-600">{summary}</p>
      </a>
    </article>
  )
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  )
}
