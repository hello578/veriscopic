// app/legal/cookies/page.tsx

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 text-slate-900">
      <h1 className="mb-8 text-3xl font-semibold">Cookie Policy</h1>

      <p className="text-slate-600">
        Veriscopic uses minimal cookies required for website functionality and
        performance.
      </p>

      <ul className="mt-6 list-disc pl-6 text-slate-600 space-y-2">
        <li>Essential cookies for security and navigation</li>
        <li>Anonymous analytics to understand aggregate usage</li>
      </ul>

      <p className="mt-6 text-slate-600">
        No advertising or cross-site tracking cookies are used.
      </p>
    </main>
  )
}
