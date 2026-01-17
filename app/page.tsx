//app/page.tsx// app/page.tsx
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle, Shield, ClipboardCheck } from "lucide-react"

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
        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/veriscopic-hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay — lighter than before */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-24 lg:px-12">
          <div className="mx-auto w-full max-w-5xl text-center">
            {/* HEADLINE */}
            <h1 className="font-bold tracking-tight text-white text-5xl sm:text-6xl lg:text-7xl">
              AI Governance.
              <br />
              <span className="block text-white/90">
                Proven, not promised.
              </span>
            </h1>

            {/* SUBHEAD */}
            <p className="mx-auto mt-6 max-w-4xl text-lg sm:text-xl text-white/85">
              Veriscopic produces{" "}
              <span className="font-semibold text-white">
                immutable, audit-ready evidence
              </span>{" "}
              of how AI systems are governed — suitable for enterprise
              procurement, investors, insurers, and regulators.
            </p>

            {/* CTA ROW */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/evidence"
                className="rounded-md bg-white px-7 py-3 text-base font-semibold text-slate-900 hover:bg-slate-100"
              >
                View Evidence Packs
              </Link>

              <Link
                href="/auth/login"
                className="rounded-md border border-white/40 px-7 py-3 text-base font-semibold text-white hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>

            {/* TRUST STRIP */}
            <div className="mx-auto mt-14 grid max-w-4xl gap-8 border-t border-white/25 pt-10 sm:grid-cols-3">
              <Trust
                icon={<CheckCircle />}
                title="72-hour delivery"
                desc="Evidence pack turnaround"
              />
              <Trust
                icon={<Shield />}
                title="UK & EU focused"
                desc="Procurement-ready framing"
              />
              <Trust
                icon={<ClipboardCheck />}
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
    <div className="flex flex-col items-center text-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
        {icon}
      </div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="text-sm text-white/70">{desc}</p>
    </div>
  )
}
