
// app/legal/cookies/page.tsx
export default function CookiePolicyPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Cookie Policy
      </h1>

      <p className="mt-6 text-sm text-slate-600">
        Last updated: January 2026
      </p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-slate-700">
        <p>
          This Cookie Policy explains how Veriscopic uses cookies and similar
          technologies when you visit our website or use our platform.
        </p>

        <h2 className="text-base font-semibold text-slate-900">
          Essential cookies
        </h2>

        <p>
          Veriscopic uses essential cookies that are strictly necessary for the
          secure operation of the platform. These cookies enable core
          functionality such as authentication, session management, and
          protection against unauthorised access.
        </p>

        <p>
          Essential cookies cannot be disabled, as the platform would not
          function securely without them.
        </p>

        <h2 className="text-base font-semibold text-slate-900">
          Analytics cookies
        </h2>

        <p>
          We may use analytics cookies to understand how the website and platform
          are used, in order to improve performance, reliability, and user
          experience.
        </p>

        <p>
          Analytics cookies do not collect sensitive personal data and are not
          used for advertising, profiling, or cross-site tracking.
        </p>

        <h2 className="text-base font-semibold text-slate-900">
          Consent and control
        </h2>

        <p>
          Where required by law, analytics cookies are used only with your
          consent. You may choose to accept analytics cookies or restrict usage
          to essential cookies only.
        </p>

        <p>
          We do not sell cookie data, share it with advertising networks, or use
          it to train AI models.
        </p>
      </div>
    </>
  )
}
