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

      // Fetch completed projects
      const { data: completedProjects, error: projectsError } = await supabase
        .from("completed_projects")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })

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

      // Get user achievements
      const { data: userAchievements, error: achievementsError } = await supabase
        .from("user_achievements")
        .select("achievement_id")
        .eq("user_id", user.id)

      if (achievementsError) {
        console.error("Achievements fetch error:", achievementsError)
      }

      // Get total number of achievements
      const { count: totalAchievements, error: totalAchievementsError } = await supabase
        .from("achievements")
        .select("*", { count: "exact", head: true })

      if (totalAchievementsError) {
        console.error("Total achievements fetch error:", totalAchievementsError)
      }

      // Calculate statistics
      const projectsByLevel = {
        Student: completedProjects?.filter((p) => p.level === "Student").length || 0,
        Trainee: completedProjects?.filter((p) => p.level === "Trainee").length || 0,
        Junior: completedProjects?.filter((p) => p.level === "Junior").length || 0,
        Senior: completedProjects?.filter((p) => p.level === "Senior").length || 0,
      }

      // Calculate language stats
      const languageCounts: Record<string, number> = {}
      completedProjects?.forEach((project) => {
        project.technologies?.forEach((tech) => {
          languageCounts[tech] = (languageCounts[tech] || 0) + 1
        })
      })

      const languageStats = Object.entries(languageCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      // Calculate framework stats
      const frameworkCounts: Record<string, number> = {}
      completedProjects?.forEach((project) => {
        project.frameworks?.forEach((framework) => {
          frameworkCounts[framework] = (frameworkCounts[framework] || 0) + 1
        })
      })

      const frameworkStats = Object.entries(frameworkCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      // Calculate database stats
      const databaseCounts: Record<string, number> = {}
      completedProjects?.forEach((project) => {
        project.databases?.forEach((db) => {
          databaseCounts[db] = (databaseCounts[db] || 0) + 1
        })
      })

      const databaseStats = Object.entries(databaseCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      // Calculate monthly data (last 6 months)
      const monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ]
      const now = new Date()
      const monthlyData = Array(6)
        .fill(0)
        .map((_, i) => {
          const monthIndex = (now.getMonth() - i + 12) % 12
          const year = now.getFullYear() - (now.getMonth() < monthIndex ? 1 : 0)
          const month = monthNames[monthIndex]

          // Count projects in this month
          const count =
            completedProjects?.filter((p) => {
              const date = new Date(p.completed_at)
              return date.getMonth() === monthIndex && date.getFullYear() === year
            }).length || 0

          return { name: `${month} ${year}`, count }
        })
        .reverse()

      // Calculate projects by day of week
      const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
      const projectsByDay = dayNames.map((name) => {
        const dayIndex = dayNames.indexOf(name)
        const count =
          completedProjects?.filter((p) => {
            const date = new Date(p.completed_at)
            return date.getDay() === dayIndex
          }).length || 0

        return { name, count }
      })

      // Return comprehensive statistics
      return NextResponse.json({
        success: true,
        totalProjects: completedProjects?.length || 0,
        studentProjects: projectsByLevel.Student,
        traineeProjects: projectsByLevel.Trainee,
        juniorProjects: projectsByLevel.Junior,
        seniorProjects: projectsByLevel.Senior,
        languageStats,
        frameworkStats,
        databaseStats,
        monthlyData,
        projectsByDay,
        completedProjects: completedProjects || [],
        unlockedAchievements: userAchievements?.length || 0,
        totalAchievements: totalAchievements || 0,
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
