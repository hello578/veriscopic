

// app/page.tsx

// app/page.tsx

import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle, Shield, ClipboardCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Governance Platform for Audit-Ready Compliance",
  description:
    "Veriscopic delivers immutable, audit-ready AI governance evidence for enterprise procurement, regulators, insurers, and investors across the UK and EU.",
}

const HEADER_HEIGHT = 80

export default function HomePage() {
  return (
    <div className="bg-white">
      <SiteHeader />

      {/* HERO */}
      <section
        className="relative isolate overflow-hidden"
        style={{ paddingTop: HEADER_HEIGHT }}
      >
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/veriscopic-hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 pt-32 pb-24 lg:px-12">
          <div className="mx-auto w-full max-w-5xl text-center">
            {/* Headline */}
            <h1 className="font-extrabold tracking-tight text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              AI Governance.
              <br />
              <span className="block text-white/90">
                Proven, not promised.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-6 max-w-4xl text-lg sm:text-xl lg:text-2xl text-white/85">
              Veriscopic produces{" "}
              <span className="font-semibold text-white">
                immutable, audit-ready evidence
              </span>{" "}
              of how AI systems are governed — suitable for enterprise
              procurement, investors, insurers, and regulators.
            </p>

            {/* Internal SEO link */}
            <p className="mt-3 text-sm text-white/70">
              Learn more about our{" "}
              <Link
                href="/evidence"
                className="underline underline-offset-4 hover:text-white"
              >
                AI Governance Evidence Packs
              </Link>
              .
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/evidence"
                className="rounded-md bg-white px-8 py-3.5 text-base font-semibold text-slate-900 hover:bg-slate-100"
              >
                View Evidence Packs
              </Link>
              <Link
                href="/auth/login"
                className="rounded-md border border-white/40 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>

            {/* Credibility strip */}
            <div className="mx-auto mt-16 max-w-4xl rounded-lg border border-white/25 bg-black/30 px-6 py-5 text-sm text-white/90">
              Designed for enterprise procurement, governance review,
              insurer due-diligence, and external audit across the UK & EU.
            </div>

            {/* Trust indicators */}
            <div className="mx-auto mt-14 grid max-w-4xl gap-8 border-t border-white/25 pt-10 sm:grid-cols-3">
              <Trust
                icon={<CheckCircle className="h-5 w-5 text-white" />}
                title="72-hour delivery"
                desc="Evidence pack turnaround"
              />
              <Trust
                icon={<Shield className="h-5 w-5 text-white" />}
                title="UK & EU focused"
                desc="Procurement-ready framing"
              />
              <Trust
                icon={<ClipboardCheck className="h-5 w-5 text-white" />}
                title="External audit ready"
                desc="Immutable evidence record"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

function Trust({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
        {icon}
      </div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="text-sm text-white/70">{desc}</p>
    </div>
  )
}
