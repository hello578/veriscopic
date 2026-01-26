// app/governance-evidence-model/page.tsx

import type { Metadata } from "next"
import { PublicPage } from "@/components/public-page"

export const metadata: Metadata = {
  title: "Governance Evidence Model v1 | Veriscopic",
  description:
    "A practical model for evidencing AI and digital governance over time.",
  openGraph: {
    title: "Governance Evidence Model v1",
    description:
      "What good governance evidence looks like in practice.",
    url: "https://veriscopic.com/governance-evidence-model",
    siteName: "Veriscopic",
    locale: "en_GB",
    type: "article",
  },
}

export default function GovernanceEvidenceModelPage() {
  return (
    <PublicPage variant="soft">
      <main className="space-y-12 sm:space-y-16">
        <section className="v-section">
          <div className="v-container v-copy">
            <h1>The Governance Evidence Model v1</h1>

            <h2>1. What counts as governance evidence</h2>
            <p>
              Governance evidence is any artefact that shows how an organisation
              understands, oversees, and accounts for its systems.
            </p>
            <ul className="v-list">
              <li>Declared AI and digital systems</li>
              <li>Stated purposes and intended use</li>
              <li>Policies in force at a given time</li>
              <li>Named oversight or accountability</li>
              <li>Recorded changes and explanations</li>
            </ul>

            <h2>2. What governance evidence must show</h2>
            <ul className="v-list">
              <li>What systems existed</li>
              <li>Who was responsible</li>
              <li>When changes occurred</li>
              <li>Why those changes were made</li>
            </ul>

            <h2>3. What “good” looks like</h2>
            <p>
              Good governance evidence is proportionate, time-stamped,
              understandable by non-technical reviewers, and exportable as a
              coherent record.
            </p>

            <h2>4. Why this matters</h2>
            <p>
              Reviews and inquiries rarely ask whether something was perfect.
              They ask whether decisions were reasonable based on what was known
              at the time.
            </p>

            <p>
              Governance evidence exists to answer that question.
            </p>

            <h2>5. How Veriscopic implements this model</h2>
            <p>
              Veriscopic operationalises this model through system registers,
              policy versioning, change logs, and trustee-ready Evidence Packs.
            </p>

            <p>
              Governance is not about claims.  
              It is about what can be shown.
            </p>
          </div>
        </section>
      </main>
    </PublicPage>
  )
}
