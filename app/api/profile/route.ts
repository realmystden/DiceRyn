import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

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

    // Get user's profile
    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile", details: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const supabase = getSupabaseServer()

  try {
    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profileData = await request.json()

    // Update user's profile
    const { data, error } = await supabase
      .from("profiles")
      .update({
        username: profileData.username,
        full_name: profileData.full_name,
        avatar_url: profileData.avatar_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile", details: error.message }, { status: 500 })
  }
}
