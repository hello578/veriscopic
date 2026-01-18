
// components/site-header.tsx

"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth/use-session"
import { supabaseBrowser } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const HEADER_HEIGHT = 80

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const { session, loading } = useSession()
  const supabase = supabaseBrowser()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push("/") // explicit reset
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

        {/* Right-side actions */}
        <div className="flex items-center gap-3">
          {/* Prevent hydration flicker */}
          {loading && null}

          {!loading && !session && (
            <Button asChild size="lg">
              <Link href="/auth/login">Sign in</Link>
            </Button>
          )}

          {!loading && session && (
            <>
              {/* 🚀 ALWAYS route via /dashboard entry */}
              <Button asChild variant="outline" size="lg">
                <Link href="/dashboard">Dashboard</Link>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
