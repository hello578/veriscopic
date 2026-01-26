// app/why/page.tsx

import type { Metadata } from "next"
import { PublicPage } from "@/components/public-page"

export const metadata: Metadata = {
  title: "Why Veriscopic Exists",
  description:
    "Why governance evidence matters in an age of AI and automated decision-making.",
  openGraph: {
    title: "Why Veriscopic Exists",
    description:
      "Governance is no longer about claims. It is about what can be shown.",
    url: "https://veriscopic.com/why",
    siteName: "Veriscopic",
    locale: "en_GB",
    type: "article",
  },
}

export default function WhyPage() {
  return (
    <PublicPage variant="soft">
      <main className="space-y-12 sm:space-y-16">
        <section className="v-section">
          <div className="v-container v-copy">
            <h1>Why Veriscopic Exists</h1>

            <p>
              Organisations are increasingly judged not only on outcomes, but on
              how decisions were made.
            </p>

            <p>
              AI and digital systems now influence funding, access to services,
              communications, and operational priorities across charities,
              enterprises, and public bodies.
            </p>

            <p>
              Governance structures exist — but evidence is often fragmented,
              informal, or reconstructed after the fact.
            </p>

            <p>
              As scrutiny increases, organisations are asked a simple question:
            </p>

            <blockquote>
              Can you show how you governed your systems at the time decisions
              were made?
            </blockquote>

            <p>
              Veriscopic exists to ensure that answer can be given calmly,
              accurately, and credibly.
            </p>

            <p>
              We believe governance should be proportionate, understandable, and
              time-aware — not performative or fear-driven.
            </p>

            <p>
              Veriscopic creates a living record of governance so organisations
              can demonstrate responsibility without disrupting how they work.
            </p>

            <p>
              We are not here to enforce compliance.  
              We are here to make governance provable.
            </p>
          </div>
        </section>
      </main>
    </PublicPage>
  )
}
