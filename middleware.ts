
// middleware.ts
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl

  /**
   * Public routes – NEVER block these
   */
  if (
    pathname === '/' ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next()
  }

  const res = NextResponse.next()

  /**
   * Create Supabase SSR client with full cookie support
   */
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  /**
   * Auth check (server-verified)
   */
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(`${origin}/auth/login`)
  }

  return res
}

/**
 * Run middleware on all routes except Next internals & static assets.
 * Route-level exclusions are handled inside middleware.
 */
export const config = {
  matcher: [
    '/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
