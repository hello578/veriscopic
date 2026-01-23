// components/site-footer.tsx
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2">
            <p className="text-sm font-semibold tracking-tight text-slate-900">
              Veriscopic
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              AI governance, auditability, and compliance infrastructure — designed
              to support enterprise procurement, governance review, and external
              audit expectations across the UK and EU.
            </p>
          </div>

          {/* Trust & Governance */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
              Trust & Governance
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/security" className="text-sm text-slate-600 hover:text-slate-900">
                  Security & Data Handling
                </Link>
              </li>
              <li>
                <Link
                  href="/governance-principles"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  AI Governance Principles
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
              Legal
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/legal/privacy" className="text-sm text-slate-600 hover:text-slate-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-sm text-slate-600 hover:text-slate-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-sm text-slate-600 hover:text-slate-900">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Veriscopic. All rights reserved.</p>
          <p className="font-medium">
            UK & EU focused · Evidence-first · Designed for scrutiny
          </p>
        </div>
      </div>
    </footer>
  )
}
