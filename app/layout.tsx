// app/layout.tsx
// app/layout.tsx

import "./globals.css"
import type { Metadata } from "next"

import { TooltipProvider } from "@/components/ui/tooltip"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: {
    default: "Veriscopic — AI Governance, Proven Not Promised",
    template: "%s — Veriscopic",
  },
  description:
    "Enterprise-grade AI governance platform providing immutable, audit-ready evidence for procurement, regulators, insurers, and investors.",
  metadataBase: new URL("https://veriscopic.com"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased text-slate-900">
        <TooltipProvider delayDuration={150}>
          {/* Ambient field */}
          <div className="min-h-screen bg-slate-50">
            <SiteHeader />

            {/* Paper surface */}
            <div className="relative mx-auto max-w-[1440px] bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]">
              {/* Subtle paper grain overlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  backgroundImage: `
                    radial-gradient(rgba(15,23,42,0.025) 1px, transparent 1px),
                    radial-gradient(rgba(15,23,42,0.02) 1px, transparent 1px)
                  `,
                  backgroundSize: "3px 3px, 6px 6px",
                  backgroundPosition: "0 0, 1px 1px",
                  opacity: 0.35,
                }}
              />

              {/* Global content frame (spacing + rhythm) */}
              <div className="relative z-20">
                <div
                  className="
    mx-auto
    max-w-[1120px]
    px-6
    pt-[96px]
    pb-[160px]      /* ⬅️ GUARANTEED FOOTER BREATHING ROOM */
  "
                >
                  {children}
                </div>

              </div>
            </div>

            <SiteFooter />
          </div>
        </TooltipProvider>

        {/* Vercel tooling */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
