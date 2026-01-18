
// components/site-header.tsx

"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const HEADER_HEIGHT = 80

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "bg-white",
        "transition-shadow",
        scrolled ? "shadow-sm" : "shadow-none",
      ].join(" ")}
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
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

        {/* Right-side CTA */}
        <Button asChild size="lg">
          <Link href="/auth/login">Sign in</Link>
        </Button>
      </div>
    </header>
  )
}
