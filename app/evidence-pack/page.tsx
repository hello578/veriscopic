// app/evidence-pack/page.tsx

import Link from 'next/link'

export default function EvidencePackPricingPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14 space-y-14">
      {/* HERO */}
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Veriscopic Evidence Pack
        </h1>
        <p className="text-lg text-muted-foreground">
          A cryptographically verifiable export of governance evidence — built for
          procurement, insurers, and regulators.
        </p>
      </section>

      {/* PRICE */}
      <section className="rounded-xl border bg-background p-6 space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-semibold">£499</span>
          <span className="text-sm text-muted-foreground">per month</span>
        </div>

        <p className="text-sm text-muted-foreground max-w-2xl">
          For organisations that need to demonstrate governance controls,
          document acceptance, and AI system accountability in a form that
          can be independently verified.
        </p>

        <div className="pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Request Evidence Pack access
          </Link>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="space-y-6">
        <h2 className="text-xl font-medium">What’s included</h2>

        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-md border p-4">
            <p className="font-medium">Evidence Pack (JSON)</p>
            <p className="text-sm text-muted-foreground">
              Canonical, hashed export of governance evidence suitable for
              technical review and independent verification.
            </p>
          </li>

          <li className="rounded-md border p-4">
            <p className="font-medium">Evidence Pack (PDF)</p>
            <p className="text-sm text-muted-foreground">
              Human-readable representation of the same evidence, including
              integrity hash and governance snapshot.
            </p>
          </li>

          <li className="rounded-md border p-4">
            <p className="font-medium">Public Verification</p>
            <p className="text-sm text-muted-foreground">
              Any third party can verify Evidence Pack integrity using the
              published verification method.
            </p>
          </li>

          <li className="rounded-md border p-4">
            <p className="font-medium">Immutable Audit Trail</p>
            <p className="text-sm text-muted-foreground">
              Feature enablement, document acceptance, and governance events
              are recorded append-only.
            </p>
          </li>
        </ul>
      </section>

      {/* WHO IT’S FOR */}
      <section className="space-y-6">
        <h2 className="text-xl font-medium">Who this is for</h2>

        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Procurement teams requesting governance evidence</li>
          <li>Insurers assessing operational and AI-related risk</li>
          <li>Legal or compliance reviewers</li>
          <li>Investors conducting technical diligence</li>
          <li>Founders preparing for regulated markets</li>
        </ul>
      </section>

      {/* WHAT IT IS NOT */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium">What this is not</h2>

        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Not a legal opinion</li>
          <li>Not a compliance certification</li>
          <li>Not a risk classification or audit report</li>
          <li>Not automated regulatory approval</li>
        </ul>

        <p className="text-xs text-muted-foreground max-w-2xl">
          Veriscopic records and exports governance evidence. Interpretation
          and compliance conclusions remain the responsibility of the
          organisation and its advisors.
        </p>
      </section>

      {/* AI ACT */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium">AI Act alignment</h2>

        <p className="text-sm text-muted-foreground max-w-3xl">
          Evidence Packs may include declarative mappings to selected EU AI Act
          expectations, referencing recorded governance artefacts.
          These mappings are informational and non-binding.
        </p>
      </section>

      {/* VERIFY */}
      <section className="rounded-md border bg-muted/30 p-4 text-sm">
        <p>
          Anyone can verify an Evidence Pack without access to Veriscopic.
        </p>
        <p className="mt-2">
          <Link href="/verify" className="underline">
            Learn how to verify an Evidence Pack →
          </Link>
        </p>
      </section>
    </main>
  )
}
