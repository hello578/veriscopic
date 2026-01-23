
// app/security/page.tsx

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security & Data Handling",
  description:
    "How Veriscopic approaches platform security, data protection, authentication, and evidence integrity for AI governance and audit readiness.",
}

export default function SecurityPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Security & Data Handling
      </h1>

      <p className="mt-6 text-slate-600">
        Veriscopic is designed with security, integrity, and auditability as
        first-class concerns.
      </p>

      <div className="mt-12 space-y-8 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-base font-semibold text-slate-900">
            Platform security
          </h2>
          <p>
            Veriscopic applies modern security practices across infrastructure,
            application logic, and data handling. Access controls, authentication,
            and permissions are enforced at the platform level.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">
            Authentication and access control
          </h2>
          <p>
            User authentication is handled using secure, industry-standard
            mechanisms, including third-party identity providers. Access to
            organisational data is restricted by role and scope.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">
            Data protection
          </h2>
          <p>
            Personal and organisational data is processed only as required to
            operate the platform and support governance workflows. Data is not
            sold, shared for advertising purposes, or used to train AI models.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">
            Evidence integrity
          </h2>
          <p>
            Governance records and evidence artefacts are designed to be
            tamper-resistant and verifiable. Where applicable, timestamps,
            versioning, and cryptographic techniques are used to preserve
            integrity.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">
            Ongoing improvement
          </h2>
          <p>
            Security is treated as an ongoing process. Controls and practices are
            reviewed as the platform evolves and as regulatory and industry
            expectations change.
          </p>
        </section>
      </div>
    </main>
  )
}
