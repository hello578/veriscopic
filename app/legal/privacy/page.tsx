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
          Veriscopic is committed to protecting personal data and processing it
          responsibly, transparently, and in accordance with applicable data
          protection laws, including UK GDPR and EU GDPR.
        </p>

        <h2 className="text-base font-semibold text-slate-900">
          Scope of this policy
        </h2>

        <p>
          This Privacy Policy applies to visitors to our website and users of the
          Veriscopic platform. It explains what personal data we collect, how it
          is used, and the safeguards in place.
        </p>

        <h2 className="text-base font-semibold text-slate-900">
          Personal data we process
        </h2>

        <p>
          Depending on how you interact with Veriscopic, we may process:
        </p>

        <ul className="list-disc pl-6">
          <li>Contact information such as name and email address</li>
          <li>Organisation and role information</li>
          <li>Authentication and access metadata</li>
          <li>Governance and audit-related records submitted by users</li>
        </ul>

        <h2 className="text-base font-semibold text-slate-900">
          Authentication providers
        </h2>

        <p>
          Veriscopic supports third-party authentication providers, including
          Google. When you sign in using Google, we receive your email address and
          basic profile information required to create and secure your account.
        </p>

        <p>
          We do not access contacts, calendars, or other Google services, and we
          do not use authentication data for tracking or advertising.
        </p>

        <h2 className="text-base font-semibold text-slate-900">
          Use of data
        </h2>

        <p>
          Personal data is processed solely to provide and operate the platform,
          support governance workflows, meet legal obligations, and maintain
          platform security.
        </p>

        <p>
          Veriscopic does not sell personal data and does not use customer data to
          train AI models.
        </p>

        <h2 className="text-base font-semibold text-slate-900">
          Contact
        </h2>

        <p>
          For questions regarding this Privacy Policy or data protection matters,
          please contact{" "}
          <span className="font-medium">privacy@veriscopic.com</span>.
        </p>
      </div>
    </>
  )
}
