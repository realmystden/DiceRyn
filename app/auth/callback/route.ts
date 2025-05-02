import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  // If code is not present, redirect to login
  if (!code) {
    return NextResponse.redirect(`${requestUrl.origin}/auth/login`)
  }

  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Get the session to verify it worked
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      console.error("Failed to get session after code exchange")
      return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=session_error`)
    }

    // Redirect to home page on successful authentication
    return NextResponse.redirect(`${requestUrl.origin}/`)
  } catch (error) {
    console.error("Error in auth callback:", error)
    return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=callback_error`)
  }
}
