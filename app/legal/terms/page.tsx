
// app/legal/terms/page.tsx

export default function TermsOfServicePage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Terms of Service
      </h1>

      <p className="mt-6 text-sm text-slate-600">
        Last updated: January 2026
      </p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-700">
        <p>
          These Terms of Service govern access to and use of the Veriscopic
          platform, website, and related services.
        </p>

        <h2 className="text-base font-semibold text-slate-900">
          Nature of the service
        </h2>

        <p>
          Veriscopic provides tools to support AI governance, evidence generation,
          and audit readiness. The platform enables customers to document,
          structure, and present governance artefacts.
        </p>

        <p>
          Veriscopic does not provide legal advice, regulatory determinations, or
          certification on behalf of regulators or third parties.
        </p>

        <h2 className="text-base font-semibold text-slate-900">
          Customer responsibilities
        </h2>

        <p>
          Customers are responsible for the accuracy, completeness, and
          appropriateness of information submitted to the platform, as well as
          for meeting their own legal and regulatory obligations.
        </p>

        <h2 className="text-base font-semibold text-slate-900">
          Availability and access
        </h2>

        <p>
          The platform is provided on a subscription or contractual basis.
          Availability, features, and support levels may vary by plan and may be
          updated over time.
        </p>

        <h2 className="text-base font-semibold text-slate-900">
          Contractual terms
        </h2>

        <p>
          Where applicable, additional contractual terms may be provided during
          onboarding, enterprise procurement, or through written agreements.
          Those terms will prevail in the event of any conflict.
        </p>
      </div>
    </>
  )
}
