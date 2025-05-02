import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = ["/profile/settings", "/achievements/create", "/projects/create"]

  // Check if the route is protected and user is not authenticated
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Add specific check for profile routes
  const isProfileRoute = req.nextUrl.pathname === "/profile" || req.nextUrl.pathname.startsWith("/profile/")

  if ((isProtectedRoute || isProfileRoute) && !session) {
    const redirectUrl = new URL("/auth/login", req.url)
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/profile/:path*", "/profile/settings/:path*", "/achievements/create/:path*", "/projects/create/:path*"],
}
