import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET() {
  console.log("Statistics API route called")

  try {
    // Use createRouteHandlerClient which is specifically designed for API routes
    const supabase = createRouteHandlerClient({ cookies })

    console.log("Supabase client created")

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
    console.log("User authenticated:", user.id)

    // Start with a minimal response to test if the basic route works
    try {
      // Check if the completed_projects table exists
      const { count, error: tableCheckError } = await supabase
        .from("completed_projects")
        .select("*", { count: "exact", head: true })

      if (tableCheckError) {
        console.error("Table check error:", tableCheckError)
        return NextResponse.json(
          {
            error: "Database table error",
            details: tableCheckError.message,
          },
          { status: 500 },
        )
      }

      console.log("Table check successful, count:", count)

      // Fetch minimal data for testing
      const { data: completedProjects, error: projectsError } = await supabase
        .from("completed_projects")
        .select("id, level, completed_at")
        .eq("user_id", user.id)
        .limit(10)

      if (projectsError) {
        console.error("Projects fetch error:", projectsError)
        return NextResponse.json(
          {
            error: "Failed to fetch projects",
            details: projectsError.message,
          },
          { status: 500 },
        )
      }

      console.log("Projects fetched successfully:", completedProjects?.length || 0)

      // Return a simplified response for now
      return NextResponse.json({
        success: true,
        totalProjects: completedProjects?.length || 0,
        studentProjects: completedProjects?.filter((p) => p.level === "Student").length || 0,
        traineeProjects: completedProjects?.filter((p) => p.level === "Trainee").length || 0,
        juniorProjects: completedProjects?.filter((p) => p.level === "Junior").length || 0,
        seniorProjects: completedProjects?.filter((p) => p.level === "Senior").length || 0,
        // Provide empty arrays for the charts to render without errors
        languageStats: [],
        frameworkStats: [],
        databaseStats: [],
        monthlyData: [],
        projectsByDay: [
          { name: "Domingo", count: 0 },
          { name: "Lunes", count: 0 },
          { name: "Martes", count: 0 },
          { name: "Miércoles", count: 0 },
          { name: "Jueves", count: 0 },
          { name: "Viernes", count: 0 },
          { name: "Sábado", count: 0 },
        ],
        // Include sample data for testing
        completedProjects: completedProjects || [],
        unlockedAchievements: 0,
        totalAchievements: 0,
        achievements: [],
      })
    } catch (dbError) {
      console.error("Database operation error:", dbError)
      return NextResponse.json(
        {
          error: "Database operation failed",
          details: dbError instanceof Error ? dbError.message : "Unknown database error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Unhandled error in statistics API route:", error)
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 },
    )
  }
}
