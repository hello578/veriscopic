
// components/site-footer.tsx

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-slate-900">Veriscopic</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              AI governance, auditability and compliance infrastructure — designed to
              support enterprise procurement, governance review, and external audit
              expectations across the UK and EU.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Product</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a className="text-slate-600 hover:text-slate-900" href="/evidence">
                  Evidence Packs
                </a>
              </li>
              <li>
                <a className="text-slate-600 hover:text-slate-900" href="/auth/login">
                  Sign in
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Legal</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a className="text-slate-600 hover:text-slate-900" href="/privacy">
                  Privacy
                </a>
              </li>
              <li>
                <a className="text-slate-600 hover:text-slate-900" href="/terms">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Veriscopic. All rights reserved.</p>
          <p>UK & EU focused · Audit-evidence first · External-facing by design</p>
        </div>
      </div>
    </footer>
  )
}
