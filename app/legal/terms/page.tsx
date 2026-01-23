
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
          These Terms govern access to and use of the Veriscopic platform and
          services.
        </p>

        <p>
          Veriscopic provides tooling to generate and manage AI governance
          evidence. Customers remain responsible for the accuracy of submitted
          information and for meeting their regulatory obligations.
        </p>

        <p>
          The platform is provided on a subscription basis. Service availability,
          pricing, and support levels may vary by plan.
        </p>

        <p>
          Full contractual terms are provided during onboarding or enterprise
          procurement processes.
        </p>
      </div>
    </>
  )
}
