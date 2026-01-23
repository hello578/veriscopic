
// components/cookie-banner.tsx

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("veriscopic-cookie-consent")
    if (!consent) setVisible(true)
  }, [])

  function accept(analytics: boolean) {
    localStorage.setItem(
      "veriscopic-cookie-consent",
      analytics ? "analytics" : "essential"
    )
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto max-w-5xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-700">
          <p className="font-medium text-slate-900">
            Cookie use at Veriscopic
          </p>
          <p className="mt-1">
            We use essential cookies to operate securely. Optional analytics
            cookies help us understand usage. We do not sell data or use it to
            train AI models.
          </p>
          <p className="mt-1 text-xs">
            <Link href="/legal/cookies" className="underline">
              Cookie policy
            </Link>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => accept(false)}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
          >
            Essential only
          </button>
          <button
            onClick={() => accept(true)}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  )
}
