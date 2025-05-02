import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

// GET: Fetch user's completed projects
export async function GET(request: NextRequest) {
  const supabase = getSupabaseServer()

  try {
    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Return empty array for unauthenticated users with 200 status
    if (!user) {
      return NextResponse.json({ projects: [] })
    }

    // Get user's completed projects
    const { data, error } = await supabase
      .from("completed_projects")
      .select("*")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ projects: data })
  } catch (error: any) {
    console.error("Error fetching completed projects:", error)
    return NextResponse.json({ error: "Failed to fetch completed projects", details: error.message }, { status: 500 })
  }
}

// POST: Mark a project as completed
export async function POST(request: NextRequest) {
  const supabase = getSupabaseServer()

  try {
    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectData = await request.json()
    if (!projectData.project_id || !projectData.title || !projectData.level) {
      return NextResponse.json({ error: "Missing required project data" }, { status: 400 })
    }

    // Insert the completed project
    const { data: project, error: projectError } = await supabase
      .from("completed_projects")
      .insert({
        user_id: user.id,
        project_id: projectData.project_id,
        title: projectData.title,
        level: projectData.level,
        technologies: projectData.technologies || [],
        frameworks: projectData.frameworks || [],
        databases: projectData.databases || [],
        app_type: projectData.app_type || "Other",
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (projectError) throw projectError

    // Trigger achievement check
    const checkResponse = await fetch("/api/achievements", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const checkResult = await checkResponse.json()

    return NextResponse.json({
      success: true,
      project,
      achievements: checkResult.newlyUnlocked,
    })
  } catch (error: any) {
    console.error("Error marking project as completed:", error)
    return NextResponse.json({ error: "Failed to mark project as completed", details: error.message }, { status: 500 })
  }
}

// DELETE: Remove a completed project
export async function DELETE(request: NextRequest) {
  const supabase = getSupabaseServer()
  const url = new URL(request.url)
  const projectId = url.searchParams.get("id")

  if (!projectId) {
    return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
  }

  try {
    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete the project
    const { error } = await supabase.from("completed_projects").delete().eq("id", projectId).eq("user_id", user.id)

    if (error) throw error

    // Re-check achievements
    await fetch("/api/achievements", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error removing completed project:", error)
    return NextResponse.json({ error: "Failed to remove completed project", details: error.message }, { status: 500 })
  }
}
