// components/site-footer.tsx

import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* Shared shell — MUST match header */}
      <div className="mx-auto max-w-[1120px] px-6 py-16">
        {/* Top grid */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="text-sm font-semibold tracking-tight text-slate-900">
              Veriscopic
            </p>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              Governance-grade evidence infrastructure for AI systems —
              providing immutable records, audit-ready exports, and
              independently verifiable assurance for procurement, insurers,
              investors, and regulators operating across the UK and EU.
            </p>
          </div>

          {/* Trust & Governance */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
              Trust & Governance
            </p>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/security"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
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
              <li>
                <Link
                  href="/verify"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Evidence Verification
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
                <Link
                  href="/legal/privacy"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Veriscopic. All rights reserved.</p>

          <p className="font-medium text-slate-600">
            Evidence-first · Audit-ready · Designed for external scrutiny
          </p>
        </div>
      </div>
    </footer>
  )
}


