import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET() {
  const supabase = getSupabaseServer()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Fetch completed projects
    const { data: completedProjects, error: projectsError } = await supabase
      .from("completed_projects")
      .select("*")
      .eq("user_id", user.id)

    if (projectsError) throw projectsError

    // Fetch achievements
    const { data: userAchievements, error: achievementsError } = await supabase
      .from("user_achievements")
      .select(`
        id,
        completed_at,
        achievements (*)
      `)
      .eq("user_id", user.id)

    if (achievementsError) throw achievementsError

    // Fetch all achievements for total count
    const { data: allAchievements, error: allAchievementsError } = await supabase.from("achievements").select("*")

    if (allAchievementsError) throw allAchievementsError

    // Process the data
    const achievements = userAchievements.map((item) => ({
      ...item.achievements,
      completed: true,
      completedAt: item.completed_at,
    }))

    // Calculate statistics
    const studentProjects = completedProjects.filter((p) => p.level === "Student").length
    const traineeProjects = completedProjects.filter((p) => p.level === "Trainee").length
    const juniorProjects = completedProjects.filter((p) => p.level === "Junior").length
    const seniorProjects = completedProjects.filter((p) => p.level === "Senior").length

    // Calculate language statistics
    const languages = new Set<string>()
    completedProjects.forEach((project) => {
      project.technologies.forEach((tech) => languages.add(tech))
    })

    const languageStats = Array.from(languages)
      .map((lang) => ({
        name: lang,
        count: completedProjects.filter((p) => p.technologies.includes(lang)).length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Calculate framework statistics
    const frameworks = new Set<string>()
    completedProjects.forEach((project) => {
      project.frameworks.forEach((framework) => frameworks.add(framework))
    })

    const frameworkStats = Array.from(frameworks)
      .map((framework) => ({
        name: framework,
        count: completedProjects.filter((p) => p.frameworks.includes(framework)).length,
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Calculate database statistics
    const databases = new Set<string>()
    completedProjects.forEach((project) => {
      project.databases.forEach((db) => databases.add(db))
    })

    const databaseStats = Array.from(databases)
      .map((db) => ({
        name: db,
        count: completedProjects.filter((p) => p.databases.includes(db)).length,
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Calculate monthly data
    const projectsByMonth: Record<string, { name: string; count: number }> = {}

    // Initialize all months in the last year
    const today = new Date()
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
      const monthName = date.toLocaleString("default", { month: "long", year: "numeric" })

      projectsByMonth[monthKey] = {
        name: monthName,
        count: 0,
      }
    }

    // Count projects by month
    completedProjects.forEach((project) => {
      const date = new Date(project.completed_at)
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`

      if (projectsByMonth[monthKey]) {
        projectsByMonth[monthKey].count++
      }
    })

    const monthlyData = Object.values(projectsByMonth)
      .sort((a, b) => {
        // Extract year and month from the name for proper sorting
        const aMatch = a.name.match(/(\w+) (\d{4})/)
        const bMatch = b.name.match(/(\w+) (\d{4})/)

        if (!aMatch || !bMatch) return 0

        const aYear = Number.parseInt(aMatch[2])
        const bYear = Number.parseInt(bMatch[2])

        if (aYear !== bYear) return aYear - bYear

        // Convert month names to numbers for sorting
        const months = [
          "enero",
          "febrero",
          "marzo",
          "abril",
          "mayo",
          "junio",
          "julio",
          "agosto",
          "septiembre",
          "octubre",
          "noviembre",
          "diciembre",
        ]
        const aMonth = months.indexOf(aMatch[1].toLowerCase())
        const bMonth = months.indexOf(bMatch[1].toLowerCase())

        return aMonth - bMonth
      })
      .slice(-6) // Last 6 months

    // Calculate projects by day of week
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const projectsByDay = Array(7)
      .fill(0)
      .map((_, i) => ({
        name: dayNames[i],
        count: 0,
      }))

    completedProjects.forEach((project) => {
      const date = new Date(project.completed_at)
      const dayOfWeek = date.getDay() // 0-6
      projectsByDay[dayOfWeek].count++
    })

    return NextResponse.json({
      completedProjects,
      achievements,
      totalProjects: completedProjects.length,
      unlockedAchievements: achievements.length,
      totalAchievements: allAchievements.length,
      studentProjects,
      traineeProjects,
      juniorProjects,
      seniorProjects,
      languageStats,
      frameworkStats,
      databaseStats,
      monthlyData,
      projectsByDay,
    })
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
