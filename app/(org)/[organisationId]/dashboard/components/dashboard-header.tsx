// app/(org)/[organisationId]/dashboard/components/dashboard-header.tsx
// app/(org)/[organisationId]/dashboard/components/dashboard-header.tsx
'use client'

import Image from 'next/image'

export function DashboardHeader({
  organisationName,
  userEmail,
  role,
}: {
  organisationName: string
  userEmail?: string
  role?: string
}) {
  function handleScrollToAcceptance() {
    const el = document.getElementById('accept-documents')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/assets/brand/veriscopic-mark-mono.png"
              alt="Veriscopic"
              width={28}
              height={28}
              priority
            />
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              Veriscopic
            </span>
          </div>

          {/* Org + user context */}
          <div className="text-right leading-tight">
            <div className="text-sm font-medium text-slate-900">
              {organisationName}
            </div>

            <div className="text-xs text-slate-500">
              Governance &amp; evidence dashboard
            </div>

            {(userEmail || role) && (
              <div className="mt-0.5 text-xs text-slate-400">
                {userEmail}
                {userEmail && role ? ' • ' : ''}
                {role}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
