
// components/shared/final-cta.tsx

import Link from "next/link"

export function FinalCTA() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url(/images/hero-background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "96px", // ← breathing room before CTA
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.75)",
        }}
      />

      <div
        className="v-container"
        style={{ position: "relative", padding: "80px 0" }}
      >
        <div className="v-final">
          <Link href="/evidence/request" className="v-btn v-btn-primary v-btn-lg">
            Request access
          </Link>

          <Link
            href="/api/evidence-pack/pdf-sample?organisationId=sample"
            className="v-btn v-btn-mint v-btn-lg"
          >
            View sample evidence pack
          </Link>

          <Link
            href="https://calendly.com/hello-veriscopic/30min"
            className="v-btn v-btn-muted v-btn-lg"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  )
}
