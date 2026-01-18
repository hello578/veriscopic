// app/legal/terms/page.tsx

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 text-slate-900">
      <h1 className="mb-8 text-3xl font-semibold">Website Terms of Use</h1>

      <p className="mb-6 text-slate-600">
        These terms govern use of the Veriscopic website. By accessing this site,
        you agree to them.
      </p>

      <h2 className="mt-10 mb-3 text-xl font-semibold">Website purpose</h2>
      <p className="text-slate-600">
        This website provides information about Veriscopic and its services. It
        does not constitute legal, regulatory, or professional advice.
      </p>

      <h2 className="mt-10 mb-3 text-xl font-semibold">No warranties</h2>
      <p className="text-slate-600">
        Content is provided “as is”. We make no warranties regarding accuracy or
        completeness.
      </p>

      <h2 className="mt-10 mb-3 text-xl font-semibold">Limitation of liability</h2>
      <p className="text-slate-600">
        To the maximum extent permitted by law, Veriscopic shall not be liable
        for losses arising from use of this website.
      </p>

      <h2 className="mt-10 mb-3 text-xl font-semibold">Governing law</h2>
      <p className="text-slate-600">
        These terms are governed by the laws of England and Wales.
      </p>
    </main>
  )
}
