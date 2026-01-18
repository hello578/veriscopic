// app/legal/privacy/page.tsx

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 text-slate-900">
      <h1 className="mb-8 text-3xl font-semibold">Privacy Policy</h1>

      <p className="mb-6 text-slate-600">
        This Privacy Policy explains how Veriscopic Ltd collects, uses, and
        protects personal data when you visit this website.
      </p>

      <h2 className="mt-10 mb-3 text-xl font-semibold">Who we are</h2>
      <p className="text-slate-600">
        Veriscopic Ltd is the data controller for this website.
        <br />
        Email: hello@veriscopic.com
      </p>

      <h2 className="mt-10 mb-3 text-xl font-semibold">Data we collect</h2>
      <ul className="list-disc pl-6 text-slate-600 space-y-2">
        <li>Contact details you voluntarily provide (e.g. via Calendly)</li>
        <li>Basic usage data (pages visited, device type)</li>
        <li>Technical logs required for security and performance</li>
      </ul>

      <h2 className="mt-10 mb-3 text-xl font-semibold">How we use data</h2>
      <ul className="list-disc pl-6 text-slate-600 space-y-2">
        <li>To respond to enquiries</li>
        <li>To operate and secure the website</li>
        <li>To understand aggregate usage patterns</li>
      </ul>

      <h2 className="mt-10 mb-3 text-xl font-semibold">Legal basis</h2>
      <p className="text-slate-600">
        Processing is based on legitimate interest and consent where required
        under UK and EU GDPR.
      </p>

      <h2 className="mt-10 mb-3 text-xl font-semibold">Data sharing</h2>
      <p className="text-slate-600">
        We do not sell personal data. Data may be processed by trusted service
        providers strictly for website operation.
      </p>

      <h2 className="mt-10 mb-3 text-xl font-semibold">Your rights</h2>
      <p className="text-slate-600">
        You have the right to access, correct, or request deletion of your data,
        and to lodge a complaint with a supervisory authority.
      </p>

      <h2 className="mt-10 mb-3 text-xl font-semibold">Contact</h2>
      <p className="text-slate-600">
        Questions about this policy can be sent to hello@veriscopic.com.
      </p>
    </main>
  )
}
