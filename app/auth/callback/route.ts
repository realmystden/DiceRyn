import { getSupabaseServer } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")
  const errorDescription = requestUrl.searchParams.get("error_description")

  if (error) {
    console.error("Auth error:", error, errorDescription)
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(errorDescription || error)}`, requestUrl.origin),
    )
  }

  if (code) {
    try {
      const supabase = getSupabaseServer()
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Error exchanging code for session:", error)
        return NextResponse.redirect(
          new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, requestUrl.origin),
        )
      }
    } catch (err) {
      console.error("Unexpected error in callback:", err)
      return NextResponse.redirect(
        new URL("/auth/login?error=Unexpected+error+during+authentication", requestUrl.origin),
      )
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL("/", requestUrl.origin))
}
