import { supabase } from "@/lib/supabase/client"
import type { AchievementLevel } from "@/lib/store"

export interface Achievement {
  id: string
  title: string
  description: string
  level: AchievementLevel
  icon?: string
  completed: boolean
  completedAt?: string
  requiredProjects?: number
  requiredLanguages?: string[]
  requiredFrameworks?: string[]
  requiredDatabases?: string[]
  requiredAppTypes?: string[]
  requiredLevelProjects?: { level: string; count: number }
  requiredStack?: string[]
  requiredTags?: string[]
  requiredCombination?: {
    languages?: string[]
    frameworks?: string[]
    frameworks2?: string[]
    databases?: string[]
    count: number
  }
  requiredConsistency?: {
    type: "daily" | "weekly" | "monthly" | "streak" | "sameDay" | "timeOfDay" | "dayOfWeek"
    count: number
    period?: number
    dayType?: "weekday" | "weekend"
    timeRange?: "morning" | "afternoon" | "evening" | "night"
  }
}

export interface CompletedProject {
  id: string
  user_id: string
  project_id: number
  title: string
  level: string
  technologies: string[]
  frameworks: string[]
  databases: string[]
  completed_at: string
  completedAt?: number // For compatibility with existing code
}

export interface Badge {
  id: string
  name: string
  description: string
  image_url: string
  earned_at?: string
}

export const achievementsService = {
  // Get user achievements
  async getUserAchievements() {
    try {
      const { data: userAchievements, error: userAchievementsError } = await supabase.from("user_achievements").select(`
          id,
          completed_at,
          achievements (*)
        `)

      if (userAchievementsError) throw userAchievementsError

      // Fetch all achievements
      const { data: allAchievements, error: allAchievementsError } = await supabase.from("achievements").select("*")

      if (allAchievementsError) throw allAchievementsError

      // Mark completed achievements
      const achievements = allAchievements.map((achievement) => {
        const userAchievement = userAchievements.find((ua) => ua.achievements.id === achievement.id)
        return {
          ...achievement,
          completed: !!userAchievement,
          completedAt: userAchievement?.completed_at || null,
        }
      })

      return { achievements, error: null }
    } catch (error) {
      console.error("Error fetching achievements:", error)
      return { achievements: [], error }
    }
  },

  // Get user completed projects
  async getUserCompletedProjects() {
    try {
      const { data, error } = await supabase
        .from("completed_projects")
        .select("*")
        .order("completed_at", { ascending: false })

      if (error) throw error

      // Convert to the format expected by the app
      const projects = data.map((project) => ({
        ...project,
        completedAt: new Date(project.completed_at).getTime(), // For compatibility
      }))

      return { projects, error: null }
    } catch (error) {
      console.error("Error fetching completed projects:", error)
      return { projects: [], error }
    }
  },

  // Mark a project as completed
  async markProjectAsCompleted(projectData: {
    project_id: number
    title: string
    level: string
    technologies: string[]
    frameworks: string[]
    databases: string[]
  }) {
    try {
      const { data, error } = await supabase
        .from("completed_projects")
        .insert({
          project_id: projectData.project_id,
          title: projectData.title,
          level: projectData.level,
          technologies: projectData.technologies,
          frameworks: projectData.frameworks,
          databases: projectData.databases,
          completed_at: new Date().toISOString(),
        })
        .select()

      if (error) throw error

      return { success: true, data, error: null }
    } catch (error) {
      console.error("Error marking project as completed:", error)
      return { success: false, data: null, error }
    }
  },

  // Unmark a project as completed
  async unmarkProjectAsCompleted(projectId: string) {
    try {
      const { error } = await supabase.from("completed_projects").delete().eq("id", projectId)

      if (error) throw error

      return { success: true, error: null }
    } catch (error) {
      console.error("Error unmarking project as completed:", error)
      return { success: false, error }
    }
  },

  // Get user badges
  async getUserBadges() {
    try {
      const { data, error } = await supabase.from("user_badges").select(`
          id,
          earned_at,
          badges (*)
        `)

      if (error) throw error
    } catch (error) {
      console.error("Error fetching user badges:", error)
      return { badges: [], error }
    }
  },
}
