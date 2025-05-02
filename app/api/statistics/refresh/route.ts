import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// POST: Force refresh of statistics cache
export async function POST() {
  try {
    // Use createRouteHandlerClient which is specifically designed for API routes
    const supabase = createRouteHandlerClient({ cookies })

    console.log("Statistics refresh API route called")

    // Get the current user
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError) {
      console.error("Auth error:", userError)
      return NextResponse.json({ error: "Authentication error" }, { status: 401 })
    }

    if (!userData?.user) {
      console.log("No user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = userData.user
    console.log("Statistics refresh requested for user:", user.id)

    // You could implement a cache invalidation mechanism here
    // For now, we'll just return a success response
    // The statistics endpoint will fetch fresh data on the next request

    return NextResponse.json({
      success: true,
      message: "Statistics refresh triggered",
    })
  } catch (error) {
    console.error("Unhandled error in statistics refresh API route:", error)
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 },
    )
  }
}
