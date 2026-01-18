// app/layout.tsx

// app/layout.tsx

import "./globals.css"
import type { Metadata } from "next"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

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
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <TooltipProvider delayDuration={150}>
          {children}
        </TooltipProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}



