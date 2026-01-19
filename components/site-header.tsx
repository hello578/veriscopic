
// components/site-header.tsx

"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth/use-session"
import { supabaseBrowser } from "@/lib/supabase/client"

const HEADER_HEIGHT = 80

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Governance", href: "/ai-systems" },
  { label: "Evidence", href: "/evidence" },
  { label: "Verify", href: "/verify" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const { session, loading } = useSession()
  const supabase = supabaseBrowser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push("/")
  }

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname?.startsWith(href)
  }

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

        {/* Primary navigation (authenticated only) */}
        {!loading && session && (
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-700",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right-side actions */}
        <div className="flex items-center gap-3">
          {loading && null}

          {!loading && !session && (
            <Button asChild size="lg">
              <Link href="/auth/login">Sign in</Link>
            </Button>
          )}

          {!loading && session && (
            <Button variant="ghost" size="lg" onClick={handleSignOut}>
              Sign out
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
