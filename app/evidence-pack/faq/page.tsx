// app/evidence-pack/faq/page.tsx

export default function EvidencePackFAQPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14 space-y-12">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Evidence Pack – Procurement & Insurer FAQ
        </h1>
        <p className="text-muted-foreground">
          This FAQ explains what the Veriscopic Evidence Pack is, how it works,
          and how it should be interpreted by procurement teams, insurers,
          auditors, and reviewers.
        </p>
      </header>

      {/* GENERAL */}
      <section className="space-y-6">
        <h2 className="text-xl font-medium">General</h2>

        <div className="space-y-3">
          <p className="font-medium">What is a Veriscopic Evidence Pack?</p>
          <p className="text-sm text-muted-foreground">
            An Evidence Pack is a cryptographically verifiable export of recorded
            governance evidence. It contains immutable records of document
            acceptance, governance events, and declared system information,
            packaged for independent review.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-medium">What problem does it solve?</p>
          <p className="text-sm text-muted-foreground">
            It reduces ambiguity during procurement, insurance underwriting,
            and diligence by providing a deterministic, verifiable snapshot of
            governance evidence rather than informal statements or screenshots.
          </p>
        </div>
      </section>

      {/* INTEGRITY */}
      <section className="space-y-6">
        <h2 className="text-xl font-medium">Integrity & Verification</h2>

        <div className="space-y-3">
          <p className="font-medium">How can the Evidence Pack be verified?</p>
          <p className="text-sm text-muted-foreground">
            Each Evidence Pack includes a SHA-256 hash derived from a canonical
            JSON representation of the evidence. Any party can independently
            recompute this hash to confirm that the data has not been altered.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-medium">
            Do reviewers need access to Veriscopic to verify a pack?
          </p>
          <p className="text-sm text-muted-foreground">
            No. Verification can be performed offline using standard cryptographic
            tooling, or via Veriscopic’s public verification endpoint.
          </p>
        </div>
      </section>

      {/* SCOPE */}
      <section className="space-y-6">
        <h2 className="text-xl font-medium">Scope & Interpretation</h2>

        <div className="space-y-3">
          <p className="font-medium">
            Does an Evidence Pack certify compliance?
          </p>
          <p className="text-sm text-muted-foreground">
            No. Evidence Packs do not constitute legal advice, compliance
            certification, or regulatory approval. They provide verifiable
            evidence that governance actions occurred.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-medium">
            Who is responsible for interpreting the evidence?
          </p>
          <p className="text-sm text-muted-foreground">
            Interpretation remains the responsibility of the organisation,
            its legal advisors, auditors, insurers, or regulators.
          </p>
        </div>
      </section>

      {/* AI ACT */}
      <section className="space-y-6">
        <h2 className="text-xl font-medium">EU AI Act & AI Governance</h2>

        <div className="space-y-3">
          <p className="font-medium">
            How does the Evidence Pack relate to the EU AI Act?
          </p>
          <p className="text-sm text-muted-foreground">
            Evidence Packs may include declarative mappings that reference how
            recorded governance artefacts relate to selected AI Act expectations.
            These mappings are informational and non-binding.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-medium">
            Does Veriscopic classify AI systems by risk?
          </p>
          <p className="text-sm text-muted-foreground">
            No. Veriscopic records declared information and governance actions.
            Risk classification and legal determination remain external.
          </p>
        </div>
      </section>

      {/* INSURANCE */}
      <section className="space-y-6">
        <h2 className="text-xl font-medium">Insurance & Risk Assessment</h2>

        <div className="space-y-3">
          <p className="font-medium">
            How do insurers typically use Evidence Packs?
          </p>
          <p className="text-sm text-muted-foreground">
            Insurers may use Evidence Packs to understand governance maturity,
            document acceptance history, and accountability structures when
            assessing operational or technology-related risk.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-medium">
            Does the Evidence Pack reduce or guarantee insurability?
          </p>
          <p className="text-sm text-muted-foreground">
            No guarantees are implied. Evidence Packs provide factual inputs to
            underwriting decisions but do not replace insurer evaluation.
          </p>
        </div>
      </section>

      {/* DATA */}
      <section className="space-y-6">
        <h2 className="text-xl font-medium">Data & Privacy</h2>

        <div className="space-y-3">
          <p className="font-medium">
            Does the Evidence Pack include personal data?
          </p>
          <p className="text-sm text-muted-foreground">
            Evidence Packs are designed to minimise personal data. Where user
            identifiers appear, they are included solely for audit traceability
            and are limited to what is necessary.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-medium">
            Can Evidence Packs be shared externally?
          </p>
          <p className="text-sm text-muted-foreground">
            Yes. Evidence Packs are exportable artefacts intended for controlled
            external sharing with procurement teams, insurers, and regulators.
          </p>
        </div>
      </section>

      {/* FINAL */}
      <section className="rounded-md border bg-muted/30 p-4 text-sm">
        <p>
          Veriscopic provides governance evidence infrastructure, not legal or
          regulatory conclusions. Evidence Packs are designed to support, not
          replace, professional review.
        </p>
      </section>
    </main>
  )
}
