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

          {/* Actions + Context */}
          <div className="flex items-center gap-6">
            {/* Soft primary action */}

            {/* Org + user context */}
            <div className="text-right leading-tight">
              <p className="text-sm font-medium text-slate-900">
                {organisationName}
              </p>
              {(userEmail || role) && (
                <p className="text-xs text-slate-500">
                  {userEmail}
                  {userEmail && role ? ' • ' : ''}
                  {role}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
