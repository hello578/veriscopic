
// components/home/pricing-band.tsx

export function PricingBand() {
  return (
    <section className="v-band">
      <div className="v-container v-split">
        <div
          className="v-image-panel"
          style={{
            backgroundImage: "url(/images/minimal-sphere.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-label="Abstract sphere representing governance clarity"
        />

        <div className="v-pricing">
          <h2 className="v-h2 v-h2-invert">
            Enterprise-grade, transparent pricing
          </h2>

          <p className="v-pricing-lead">
            Typical customers invest{" "}
            <strong>from the low four figures per month</strong>, with setup based
            on <strong>risk profile, regulatory scope, and system complexity</strong>.
          </p>

          <div className="v-note">
            Designed for regulated and high-trust environments
          </div>
        </div>
      </div>
    </section>
  );
}
