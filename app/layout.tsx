// app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import { TooltipProvider } from '@/components/ui/tooltip'

export const metadata: Metadata = {
  title: 'Veriscopic',
  description: 'AI governance, auditability and compliance infrastructure',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <TooltipProvider delayDuration={150}>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}


