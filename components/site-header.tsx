// components/site-header.tsx

// components/site-header.tsx

"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth/use-session"
import { supabaseBrowser } from "@/lib/supabase/client"
import { Menu, X } from "lucide-react"

const HEADER_HEIGHT = 80

// Public (SEO + trust) — always visible
const PUBLIC_NAV_ITEMS = [
  { label: "Insights", href: "/insights" },
  { label: "Boards", href: "/boards" }, // ✅ NEW
  { label: "Evidence", href: "/evidence" },
  { label: "Verify", href: "/verify" },
  { label: "Pricing", href: "/pricing" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { session, loading } = useSession()
  const supabase = supabaseBrowser()
  const router = useRouter()
  const pathname = usePathname()

  // derive organisationId safely from URL
  const organisationId = useMemo(() => {
    if (!pathname) return null
    const parts = pathname.split("/").filter(Boolean)
    return parts.length > 0 ? parts[0] : null
  }, [pathname])

  // private nav only when org exists
  const PRIVATE_NAV_ITEMS = useMemo(() => {
    if (!organisationId) return []
    return [
      { label: "Dashboard", href: `/${organisationId}/dashboard` },
      { label: "Governance", href: `/${organisationId}/ai-systems` },
    ]
  }, [organisationId])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push("/")
    setMobileMenuOpen(false)
  }

  function isActive(href: string) {
    return pathname === href || pathname?.startsWith(`${href}/`)
  }

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          zIndex: 50,
          background: "white",
          boxShadow: scrolled ? "0 1px 10px rgba(15,23,42,0.08)" : "none",
        }}
      >
        <div className="vh-shell">
          <Link href="/" className="vh-logo" aria-label="Veriscopic Home">
            <Image
              src="/assets/brand/veriscopic-mark-mono.png"
              alt="Veriscopic"
              width={36}
              height={36}
              priority
              unoptimized
            />
            <span className="vh-wordmark">veriscopic</span>
          </Link>

          <div className="vh-spacer" />

          {/* Desktop nav */}
          <nav className="vh-desktop" aria-label="Primary">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`vh-link ${isActive(item.href) ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}

            {!loading &&
              session &&
              PRIVATE_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`vh-link ${isActive(item.href) ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          {/* Desktop auth */}
          <div className="vh-desktop">
            {!loading && !session && (
              <Button asChild className="bg-slate-900 hover:bg-slate-800">
                <Link href="/auth/login">Sign in</Link>
              </Button>
            )}
            {!loading && session && (
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Sign out
              </Button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="vh-mobile-btn"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="vh-overlay"
          style={{ top: HEADER_HEIGHT }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="vh-drawer" onClick={(e) => e.stopPropagation()}>
            <nav className="vh-drawer-nav" aria-label="Mobile">
              {PUBLIC_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`vh-drawer-link ${isActive(item.href) ? "is-active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {!loading && session && PRIVATE_NAV_ITEMS.length > 0 && (
                <>
                  <div className="vh-divider" />
                  {PRIVATE_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`vh-drawer-link ${isActive(item.href) ? "is-active" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </>
              )}

              <div className="vh-divider" />

              {!loading && !session && (
                <Link
                  href="/auth/login"
                  className="vh-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
              )}

              {!loading && session && (
                <button onClick={handleSignOut} className="vh-secondary">
                  Sign out
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .vh-shell{
          max-width: 1120px;
          height: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display:flex;
          align-items:center;
          gap:16px;
        }

        .vh-logo{
          display:flex;
          align-items:center;
          gap:10px;
          text-decoration:none;
          flex: 0 0 auto;
          min-width: 140px;
        }
        .vh-wordmark{
          font-weight:600;
          font-size:14px;
          color:#0f172a;
          letter-spacing:0.2px;
        }

        .vh-spacer{ flex: 1 1 auto; }

        .vh-desktop{
          display:none;
          align-items:center;
          gap:18px;
          flex: 0 0 auto;
        }

        .vh-link{
          text-decoration:none;
          font-size:14px;
          font-weight:500;
          color:#475569;
        }
        .vh-link:hover{ color:#0f172a; }
        .vh-link.is-active{ color:#0f172a; }

        .vh-mobile-btn{
          margin-left:auto;
          display:flex;
          align-items:center;
          justify-content:center;
          width:40px;
          height:40px;
          border-radius:10px;
          background:transparent;
          border:1px solid rgba(15,23,42,0.12);
          color:#334155;
        }

        .vh-overlay{
          position:fixed;
          left:0; right:0; bottom:0;
          z-index:40;
          background:rgba(15,23,42,0.18);
          backdrop-filter: blur(6px);
        }
        .vh-drawer{
          position:absolute;
          right:0;
          top:0;
          width:min(420px, 92vw);
          background:white;
          box-shadow: -10px 0 40px rgba(15,23,42,0.12);
        }
        .vh-drawer-nav{
          padding:20px;
          display:flex;
          flex-direction:column;
          gap:10px;
        }
        .vh-drawer-link{
          padding:12px 14px;
          border-radius:12px;
          text-decoration:none;
          color:#475569;
          font-weight:600;
        }
        .vh-drawer-link:hover{ background:#f8fafc; color:#0f172a; }
        .vh-drawer-link.is-active{ background:#f1f5f9; color:#0f172a; }
        .vh-divider{ height:1px; background:#e2e8f0; margin:10px 0; }

        .vh-primary{
          padding:12px 14px;
          border-radius:12px;
          background:#0f172a;
          color:white;
          text-align:center;
          font-weight:700;
          text-decoration:none;
        }
        .vh-secondary{
          padding:12px 14px;
          border-radius:12px;
          border:1px solid #cbd5e1;
          background:white;
          color:#334155;
          font-weight:700;
          cursor:pointer;
        }

        @media (min-width: 768px){
          .vh-desktop{ display:flex; }
          .vh-mobile-btn{ display:none; }
          .vh-logo{ min-width: 180px; }
        }
      `}</style>
    </>
  )
}
