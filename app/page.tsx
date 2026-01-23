// app/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "AI Governance Evidence Platform | Veriscopic",
  description:
    "Veriscopic provides immutable, audit-ready AI governance evidence — verifiable records and PDFs for procurement, regulators, insurers, and investors.",
}

const HEADER_HEIGHT = 80

export default function HomePage() {
  return (
    <div style={{ background: "white", color: "#0f172a" }}>
      <SiteHeader />

      {/* HERO */}
      <section
        style={{
          paddingTop: HEADER_HEIGHT,
          minHeight: "85vh",
          position: "relative",
          overflow: "hidden",
          backgroundImage: "url(/images/hero-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.72)",
          }}
        />

        <div className="v-container" style={{ position: "relative" }}>
          <div className="v-hero-inner">
            <h1 className="v-h1">
              AI governance evidence for procurement, audit, and regulation
            </h1>

            <p className="v-lead">
              Immutable, audit-ready evidence of how your AI systems are governed.
            </p>
            <p className="v-sub">
              Designed for UK & EU procurement, insurers, and regulators.
            </p>

            <div className="v-cta-row">
              <Link href="/evidence/request" className="v-btn v-btn-primary">
                [ Request evidence pack ]
              </Link>
              <Link href="/api/evidence-pack/pdf-sample?organisationId=sample" className="v-btn v-btn-ghost">
                [ View sample ]
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="v-section">
        <div className="v-container">
          <h2 className="v-h2">What we actually do</h2>

          <div className="v-card-grid">
            <FeatureCard
              title="Verified"
              description="Produce verifiable evidence you can stand behind."
              imageSrc="/images/fingerprint.png"
              tone="dark"
            />
            <FeatureCard
              title="Credible"
              description="Support audit & procurement expectations."
              imageSrc="/images/audit-docs.png"
              tone="mint"
            />
            <FeatureCard
              title="Undeniable"
              description="Record AI systems immutably."
              imageSrc="/images/fossil.png"
              tone="dark"
            />
          </div>
        </div>
      </section>

      {/* WE THINK DIFFERENTLY */}
      <section className="v-band">
        <div className="v-container v-split">
          <div>
            <h2 className="v-h2 v-h2-invert">We think differently.</h2>
            <div className="v-list">
              <div className="v-list-title">Where most tools fall down:</div>
              <div>Opinions vs Evidence</div>
              <div>Scores vs Records</div>
              <div>Promises vs Proof</div>
            </div>
          </div>

          <div
            className="v-image-panel"
            style={{
              backgroundImage: "url(/images/shattered-glass.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-label="Shattered glass"
          />
        </div>
      </section>

      {/* VERIFIABLE EVIDENCE PACKS */}
      <section className="v-section">
        <div className="v-container text-center">
          <h2 className="v-h2">Verifiable Evidence Packs</h2>

          <div className="v-evidence-row" aria-hidden="true">
            {/* Report 1 */}
            <div className="v-doc v-doc-image">
              <img
                src="/images/pdf-report1.png"
                alt="Sample Veriscopic evidence report"
                className="v-doc-img"
              />
            </div>

            <div className="v-dot" />
            <div className="v-vmark">V</div>
            <div className="v-dot" />

            {/* Report 2 */}
            <div className="v-doc v-doc-image">
              <img
                src="/images/pdf-report2.png"
                alt="Sample Veriscopic cryptographic report"
                className="v-doc-img"
              />
            </div>

            <div className="v-dot" />
            <div className="v-vmark">V</div>
            <div className="v-dot" />
          </div>

          <div className="v-muted mt-6">cryptographic evidence</div>
        </div>
      </section>

      {/* PRICING */}
      <section className="v-band">
        <div className="v-container v-split">
          <div
            className="v-image-panel"
            style={{
              backgroundImage: "url(/images/minimal-sphere.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-label="Minimal sphere"
          />

          <div className="v-pricing">
            <h2 className="v-h2 v-h2-invert">Transparent Pricing.</h2>
            <div className="v-price-lines">
              <div>Core plans: £399–£699/month</div>
              <div>Setup from: £750</div>
              <div>Enterprise from £25k</div>
            </div>
            <div className="v-note">Early access available</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundImage: "url(/images/hero-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.75)" }} />
        <div className="v-container" style={{ position: "relative", padding: "64px 0" }}>
          <div className="v-final">
            <Link href="/evidence" className="v-btn v-btn-primary v-btn-lg">
              Request access
            </Link>
            <Link href="/api/evidence-pack/pdf-sample?organisationId=sample" className="v-btn v-btn-mint v-btn-lg">
              View sample evidence pack
            </Link>
            <Link href="https://calendly.com/hello-veriscopic/30min" className="v-btn v-btn-muted v-btn-lg">
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Minimal CSS so it works even if Tailwind is failing */}
      <style>{`
        .v-container{
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .v-hero-inner{
          padding: 96px 0;
          max-width: 820px;
        }

        .v-h1{
          font-size: 44px;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0;
          font-weight: 800;
        }

        .v-lead{
          margin: 20px 0 0;
          font-size: 20px;
          color: #0f172a;
          font-weight: 500;
        }

        .v-sub{
          margin: 10px 0 0;
          font-size: 16px;
          color: #475569;
        }

        .v-cta-row{
          margin-top: 28px;
          display:flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .v-btn{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          text-decoration:none;
          border-radius: 14px;
          padding: 12px 18px;
          font-weight: 700;
          font-size: 14px;
        }
        .v-btn-lg{ padding: 14px 18px; font-size: 15px; }

        .v-btn-primary{ background:#0f172a; color:white; }
        .v-btn-primary:hover{ background:#111c33; }

        .v-btn-ghost{
          background: rgba(15,23,42,0.06);
          color:#0f172a;
          border: 1px solid rgba(15,23,42,0.10);
        }
        .v-btn-ghost:hover{ background: rgba(15,23,42,0.10); }

        .v-btn-mint{ background:#4fb6a7; color:white; }
        .v-btn-mint:hover{ filter: brightness(0.95); }

        .v-btn-muted{ background:#94a3b8; color:white; }
        .v-btn-muted:hover{ filter: brightness(0.95); }

        .v-section{ padding: 72px 0; }
        .v-h2{
          font-size: 36px;
          letter-spacing: -0.02em;
          margin: 0 0 28px;
          font-weight: 800;
          text-align:center;
        }

        .v-card-grid{
          display:grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .v-band{
          background:#0b1220;
          color:white;
          padding: 72px 0;
        }
        .v-h2-invert{ color:white; text-align:left; margin-bottom: 18px; }

        .v-split{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: center;
        }

        .v-image-panel{
          border-radius: 18px;
          width: 100%;
          min-height: 320px;
          background-color: rgba(255,255,255,0.06);
          overflow:hidden;
        }

        .v-list{
          color: rgba(226,232,240,0.90);
          display:flex;
          flex-direction: column;
          gap: 10px;
          font-size: 16px;
        }
        .v-list-title{ color: rgba(226,232,240,0.70); font-weight: 700; }

        .v-evidence-row{
          display:flex;
          align-items:center;
          justify-content:center;
          gap: 18px;
          margin: 44px 0 10px;
          flex-wrap: wrap;
        }
        .v-doc{
          width: 74px;
          height: 96px;
          border-radius: 10px;
          border: 2px solid #cbd5e1;
          background: #f8fafc;
        }
.v-doc-image {
  background: #ffffff;
  padding: 10px;
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.08),
    0 2px 6px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.v-doc-image:hover {
  transform: translateY(-2px);
  box-shadow:
    0 16px 40px rgba(15, 23, 42, 0.12),
    0 4px 10px rgba(15, 23, 42, 0.08);
}

.v-doc-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

        .v-vmark{
          font-size: 52px;
          font-weight: 900;
          color: #0f172a;
        }
        .v-muted{ color:#64748b; margin-top: 18px; }

        .v-pricing{
          display:flex;
          flex-direction: column;
          justify-content: center;
        }
        .v-price-lines{
          margin-top: 14px;
          color: rgba(226,232,240,0.85);
          display:flex;
          flex-direction: column;
          gap: 8px;
          font-size: 16px;
        }
        .v-note{
          margin-top: 16px;
          color: rgba(226,232,240,0.55);
          font-style: italic;
          font-size: 13px;
        }

        .v-final{
          max-width: 520px;
          margin: 0 auto;
          display:flex;
          flex-direction: column;
          gap: 12px;
          text-align:center;
        }

        @media (max-width: 900px){
          .v-card-grid{ grid-template-columns: 1fr; }
          .v-split{ grid-template-columns: 1fr; }
          .v-h1{ font-size: 38px; }
          .v-h2{ font-size: 30px; }
          .v-hero-inner{ padding: 72px 0; }
        }
      `}</style>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  imageSrc,
  tone,
}: {
  title: string
  description: string
  imageSrc: string
  tone: "dark" | "mint"
}) {
  const bg = tone === "mint" ? "#9ad5cd" : "#606a78"
  const fg = "white"
  const sub = "rgba(255,255,255,0.88)"

  return (
    <div style={{ borderRadius: 22, overflow: "hidden", background: bg, color: fg }}>
      <div
        style={{
          height: 210,
          background: "rgba(255,255,255,0.30)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 22,
        }}
      >
        <img
          src={imageSrc}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 14,
          }}
        />
      </div>

      <div style={{ padding: "18px 18px 20px" }}>
        <div style={{ fontSize: 18, fontWeight: 800 }}>{title}</div>
        <div style={{ marginTop: 8, fontSize: 13, color: sub, lineHeight: 1.4 }}>
          {description}
        </div>
      </div>
    </div>
  )
}

