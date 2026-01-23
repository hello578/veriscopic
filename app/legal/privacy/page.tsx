// app/legal/privacy/page.tsx

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Privacy Policy
      </h1>

      <p className="mt-6 text-sm text-slate-600">
        Last updated: January 2026
      </p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-700">
        <p>
          Veriscopic is committed to protecting your privacy and handling personal
          data responsibly in accordance with UK GDPR and EU GDPR.
        </p>

        <p>
          We collect and process only the minimum personal data required to
          provide our services, support compliance workflows, and meet legal
          obligations.
        </p>

        <p>
          Personal data may include account information, organisational details,
          and audit-related metadata. We do not sell personal data and do not use
          customer data to train AI models.
        </p>

        <p>
          For questions regarding this policy, please contact
          <span className="font-medium"> privacy@veriscopic.com</span>.
        </p>
      </div>
    </>
  )
}
