// components/site-footer.tsx

// components/site-footer.tsx

import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1120px] px-6 py-12 sm:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand / description */}
          <div className="max-w-md pt-1">
            <Image
              src="/assets/brand/veriscopic-mark-mono.png"
              alt="Veriscopic"
              width={32}
              height={32}
              className="mb-6"
            />
            <p className="text-sm leading-relaxed text-slate-700">
              Governance-grade evidence infrastructure for AI systems — providing
              immutable records, audit-ready exports, and independently
              verifiable assurance for procurement, insurers, investors, and
              regulators across the UK and EU.
            </p>
          </div>

          {/* Link columns */}
          <nav
            className="flex w-full flex-col gap-8 text-sm text-slate-700 md:flex-row md:justify-end md:gap-12"
            aria-label="Footer navigation"
          >
            <FooterColumn
              title="Trust & Governance"
              links={[
                ["Why Veriscopic Exists", "/why"], // ✅ NEW
                ["Governance Evidence Model", "/governance-evidence-model"], // ✅ NEW
                ["Evidence Verification", "/verify"],
              ]}
            />

            <FooterColumn
              title="Legal"
              links={[
                ["Privacy Policy", "/legal/privacy"],
                ["Terms of Service", "/legal/terms"],
                ["Cookie Policy", "/legal/cookies"],
              ]}
            />

            <FooterColumn
              title="Company"
              links={[
                ["Insights", "/insights"],
                ["Pricing", "/pricing"],
                ["Press", "/press"],
              ]}
            />
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex sm:items-center sm:justify-between">
          <p>© {year} Veriscopic. All rights reserved.</p>
          <p className="mt-2 font-medium text-slate-600 sm:mt-0">
            Evidence-first · Audit-ready · Designed for external scrutiny
          </p>
        </div>
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string
  links: [label: string, href: string][]
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="min-w-[150px]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-900/90">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:text-slate-900 hover:underline hover:underline-offset-4"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


