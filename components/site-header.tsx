
// components/site-header.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

const HEADER_HEIGHT = 80

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[100]",
        "bg-white border-b border-slate-200",
        "transition-shadow",
        scrolled ? "shadow-sm" : "shadow-none",
      ].join(" ")}
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/brand/veriscopic-mark-mono.png"
            alt="Veriscopic"
            width={36}
            height={36}
            priority
          />
          <span className="text-base font-semibold text-slate-900">
            Veriscopic
          </span>
        </Link>

        {/* Sign in CTA */}
        <Link
          href="/auth/login"
          className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Sign in
        </Link>
      </div>
    </header>
  )
}
