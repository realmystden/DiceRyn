import { createClient } from "@supabase/supabase-js"
import type { AchievementLevel } from "@/lib/store"

// Types for our data
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  level: AchievementLevel
  completed: boolean
  completedAt?: string
  progress?: number
  requiredProjects?: number
  requiredLanguages?: string[]
  requiredFrameworks?: string[]
  requiredDatabases?: string[]
  requiredAppTypes?: string[]
  requiredLevelProjects?: {
    level: AchievementLevel
    count: number
  }
  requiredConsistency?: {
    type: "streak" | "weekly" | "monthly" | "sameDay" | "timeOfDay" | "dayOfWeek"
    count: number
    period?: number
    timeRange?: string
    dayType?: string
  }
  requiredCombination?: {
    language: string
    framework: string
    database?: string
    count: number
  }
}

export interface CompletedProject {
  id: string
  title: string
  description?: string
  level: string
  technologies: string[]
  frameworks: string[]
  databases: string[]
  completedAt: string
  userId: string
}

// Create a singleton Supabase client
let supabaseClient: ReturnType<typeof createClient> | null = null

const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  }
  return supabaseClient
}

// Service functions
export const achievementsService = {
  // Get all achievements for the current user
  async getUserAchievements() {
    try {
      const supabase = getSupabaseClient()

      // Get the current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        return { achievements: [], error: "User not authenticated" }
      }

      // Get all achievements
      const { data: achievements, error: achievementsError } = await supabase.from("achievements").select("*")

      if (achievementsError) {
        console.error("Error fetching achievements:", achievementsError)
        return { achievements: [], error: achievementsError.message }
      }

      // Get user's completed achievements
      const { data: userAchievements, error: userAchievementsError } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", user.id)

      if (userAchievementsError) {
        console.error("Error fetching user achievements:", userAchievementsError)
        return { achievements: [], error: userAchievementsError.message }
      }

      // Combine the data
      const formattedAchievements: Achievement[] = achievements.map((achievement) => {
        const userAchievement = userAchievements.find((ua) => ua.achievement_id === achievement.id)

        return {
          id: achievement.id,
          title: achievement.title,
          description: achievement.description,
          icon: achievement.icon,
          level: achievement.level as AchievementLevel,
          completed: !!userAchievement,
          completedAt: userAchievement?.completed_at,
          progress: userAchievement?.progress || 0,
          requiredProjects: achievement.required_projects,
          requiredLanguages: achievement.required_languages,
          requiredFrameworks: achievement.required_frameworks,
          requiredDatabases: achievement.required_databases,
          requiredAppTypes: achievement.required_app_types,
          requiredLevelProjects: achievement.required_level_projects,
          requiredConsistency: achievement.required_consistency,
          requiredCombination: achievement.required_combination,
        }
      })

      return { achievements: formattedAchievements, error: null }
    } catch (error) {
      console.error("Error in getUserAchievements:", error)
      return { achievements: [], error: "Failed to fetch achievements" }
    }
  },

  // Get completed projects for the current user
  async getUserCompletedProjects() {
    try {
      const supabase = getSupabaseClient()

      // Get the current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        return { projects: [], error: "User not authenticated" }
      }

      // Get user's completed projects
      const { data: projects, error: projectsError } = await supabase
        .from("completed_projects")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })

      if (projectsError) {
        console.error("Error fetching completed projects:", projectsError)
        return { projects: [], error: projectsError.message }
      }

      // Format the projects
      const formattedProjects: CompletedProject[] = projects.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description || "",
        level: project.level,
        technologies: project.technologies || [],
        frameworks: project.frameworks || [],
        databases: project.databases || [],
        completedAt: project.completed_at,
        userId: project.user_id,
      }))

      return { projects: formattedProjects, error: null }
    } catch (error) {
      console.error("Error in getUserCompletedProjects:", error)
      return { projects: [], error: "Failed to fetch completed projects" }
    }
  },

  // Mark a project as completed
  async markProjectAsCompleted(projectData: Omit<CompletedProject, "id" | "userId" | "completedAt">) {
    try {
      const supabase = getSupabaseClient()

      // Get the current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        return { success: false, error: "User not authenticated" }
      }

      // Add the project to completed_projects
      const { data: project, error: projectError } = await supabase
        .from("completed_projects")
        .insert({
          user_id: user.id,
          title: projectData.title,
          description: projectData.description,
          level: projectData.level,
          technologies: projectData.technologies,
          frameworks: projectData.frameworks,
          databases: projectData.databases,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (projectError) {
        console.error("Error marking project as completed:", projectError)
        return { success: false, error: projectError.message }
      }

      // Check for achievements that should be unlocked
      await this.checkAchievements(user.id)

      return { success: true, project, error: null }
    } catch (error) {
      console.error("Error in markProjectAsCompleted:", error)
      return { success: false, error: "Failed to mark project as completed" }
    }
  },

  // Remove a project from completed projects
  async unmarkProjectAsCompleted(projectId: string) {
    try {
      const supabase = getSupabaseClient()

      // Get the current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        return { success: false, error: "User not authenticated" }
      }

      // Remove the project
      const { error } = await supabase.from("completed_projects").delete().eq("id", projectId).eq("user_id", user.id)

      if (error) {
        console.error("Error unmarking project as completed:", error)
        return { success: false, error: error.message }
      }

      // Re-check achievements
      await this.checkAchievements(user.id)

      return { success: true, error: null }
    } catch (error) {
      console.error("Error in unmarkProjectAsCompleted:", error)
      return { success: false, error: "Failed to unmark project as completed" }
    }
  },

  // Check and update achievements for a user
  async checkAchievements(userId: string) {
    try {
      const supabase = getSupabaseClient()

      // This would typically be a server-side function or a database trigger
      // For simplicity, we're implementing it client-side

      // Get all achievements
      const { data: achievements } = await supabase.from("achievements").select("*")

      // Get user's completed projects
      const { data: projects } = await supabase.from("completed_projects").select("*").eq("user_id", userId)

      // Get user's current achievements
      const { data: userAchievements } = await supabase.from("user_achievements").select("*").eq("user_id", userId)

      if (!achievements || !projects) {
        return { success: false, error: "Failed to fetch data for achievement check" }
      }

      // Process each achievement
      for (const achievement of achievements) {
        // Skip if already completed
        if (userAchievements?.some((ua) => ua.achievement_id === achievement.id)) {
          continue
        }

        let completed = false
        let progress = 0

        // Check different achievement types
        if (achievement.required_projects) {
          progress = Math.min(100, (projects.length / achievement.required_projects) * 100)
          completed = projects.length >= achievement.required_projects
        }

        // More achievement checks would go here...

        // Update or insert user achievement
        if (completed) {
          await supabase.from("user_achievements").insert({
            user_id: userId,
            achievement_id: achievement.id,
            completed_at: new Date().toISOString(),
            progress: 100,
          })
        } else if (progress > 0) {
          await supabase.from("user_achievements").upsert({
            user_id: userId,
            achievement_id: achievement.id,
            progress,
          })
        }
      }

      return { success: true, error: null }
    } catch (error) {
      console.error("Error in checkAchievements:", error)
      return { success: false, error: "Failed to check achievements" }
    }
  },
}
