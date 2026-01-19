// app/(org)/[organisationId]/ai-systems/page.tsx

import Link from "next/link"

export default function AISystemsPage() {
  return (
    <main className="py-12">
      <div className="mx-auto max-w-3xl px-6 space-y-10">

        {/* Page purpose */}
        <section className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            AI systems
          </h1>
          <p className="text-sm text-slate-600">
            Declare the AI systems used by your organisation. These declarations
            form a core input to your AI Governance Evidence Pack.
          </p>
        </section>

        {/* Why this matters */}
        <section className="rounded-md border bg-slate-50 p-6 space-y-2">
          <p className="text-sm font-medium text-slate-900">
            Why this is required
          </p>
          <p className="text-sm text-slate-600">
            Enterprise customers, insurers, and regulators increasingly expect
            organisations to document which AI systems are in use, their purpose,
            and who is accountable for them.
          </p>
          <p className="text-xs text-slate-500">
            Veriscopic records declared facts only. No risk scoring or compliance
            judgement is performed.
          </p>
        </section>

        {/* Current state */}
        <section className="space-y-4">
          <p className="text-sm font-medium text-slate-900">
            Declared systems
          </p>

          <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-900">
              No AI systems declared
            </p>
            <p className="text-xs text-amber-700">
              At least one AI system must be recorded to complete governance
              setup and enable full Evidence Pack generation.
            </p>
          </div>
        </section>

        {/* Primary action */}
        <section className="space-y-3">
          <p className="text-sm text-slate-600">
            You’ll be able to register AI systems with purpose, lifecycle status,
            and accountability details.
          </p>

          <button
            disabled
            className="inline-flex cursor-not-allowed items-center justify-center rounded-md bg-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600"
          >
            Add AI system (coming next)
          </button>

          <p className="text-xs text-slate-500">
            This feature is currently in progress. You will be notified when AI
            system registration is available.
          </p>
        </section>

        {/* Navigation hint */}
        <section className="border-t pt-6">
          <p className="text-xs text-slate-500">
            Next: once AI systems are declared, you can generate and export a
            complete Evidence Pack from the{" "}
            <Link href="/evidence" className="underline">
              Evidence
            </Link>{" "}
            section.
          </p>
        </section>

      </div>
    </main>
  )
}
