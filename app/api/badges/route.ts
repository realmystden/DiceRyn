import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

// GET: Fetch user's badges
export async function GET(request: NextRequest) {
  const supabase = getSupabaseServer()

  try {
    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's badges
    const { data, error } = await supabase
      .from("user_badges")
      .select(`
        id,
        earned_at,
        badges (
          id,
          name,
          description,
          image_url,
          rarity,
          achievement_id
        )
      `)
      .eq("user_id", user.id)

    if (error) throw error

    const badges = data.map((item) => ({
      id: item.id,
      ...item.badges,
      earned_at: item.earned_at,
    }))

    return NextResponse.json({ badges })
  } catch (error: any) {
    console.error("Error fetching badges:", error)
    return NextResponse.json({ error: "Failed to fetch badges", details: error.message }, { status: 500 })
  }
}
