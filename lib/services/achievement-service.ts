import { supabase } from "@/lib/supabase/client"
import type { AchievementLevel } from "@/lib/store"

export interface Achievement {
  id: string
  title: string
  description: string
  level: AchievementLevel
  icon: string
  category: string
  points: number
  criteria: AchievementCriteria
  badge_id?: string | null
  created_at: string
  completed?: boolean
  completedAt?: string | null
  progress?: number // Add progress field
}

export interface AchievementCriteria {
  type:
    | "project_count"
    | "language"
    | "framework"
    | "database"
    | "level"
    | "streak"
    | "combination"
    | "time_of_day"
    | "app_type"
    | "special"
  count?: number
  languages?: string[]
  frameworks?: string[]
  databases?: string[]
  levels?: string[]
  app_types?: string[]
  streak_days?: number
  time_range?: "morning" | "afternoon" | "evening" | "night"
  special_condition?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  image_url: string
  achievement_id?: string | null
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  created_at: string
  earned_at?: string | null
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
  app_type: string
  completed_at: string
  created_at: string
}

export const achievementService = {
  // Get all achievements with completion status for current user
  async getUserAchievements(): Promise<{ achievements: Achievement[]; error: any }> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // If no session, return all achievements but mark them as not completed
      if (!session) {
        const { data: allAchievements, error: achievementsError } = await supabase
          .from("achievements")
          .select("*, badges(*)")

        if (achievementsError) throw achievementsError

        // Mark all achievements as not completed since user is not authenticated
        const achievements = allAchievements.map((achievement) => ({
          ...achievement,
          badge: achievement.badges,
          completed: false,
          completedAt: null,
        }))

        return { achievements, error: null }
      }

      // Get all achievements
      const { data: allAchievements, error: achievementsError } = await supabase
        .from("achievements")
        .select("*, badges(*)")

      if (achievementsError) throw achievementsError

      // Get user's completed achievements
      const { data: userAchievements, error: userAchievementsError } = await supabase
        .from("user_achievements")
        .select("achievement_id, completed_at")
        .eq("user_id", session.user.id)

      if (userAchievementsError) throw userAchievementsError

      // Mark achievements as completed if the user has earned them
      const achievements = allAchievements.map((achievement) => {
        const userAchievement = userAchievements?.find((ua) => ua.achievement_id === achievement.id)
        return {
          ...achievement,
          badge: achievement.badges,
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

  // Get user's earned badges
  async getUserBadges(): Promise<{ badges: Badge[]; error: any }> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        return { badges: [], error: "No authenticated user" }
      }

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
        .eq("user_id", session.user.id)

      if (error) throw error

      const badges = data.map((item) => ({
        id: item.id,
        ...item.badges,
        earned_at: item.earned_at,
      }))

      return { badges, error: null }
    } catch (error) {
      console.error("Error fetching badges:", error)
      return { badges: [], error }
    }
  },

  // Get user's completed projects
  async getUserCompletedProjects(): Promise<{ projects: CompletedProject[]; error: any }> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // Return empty array for unauthenticated users instead of throwing an error
      if (!session) {
        return { projects: [], error: null }
      }

      const { data, error } = await supabase
        .from("completed_projects")
        .select("*")
        .eq("user_id", session.user.id)
        .order("completed_at", { ascending: false })

      if (error) throw error

      return { projects: data, error: null }
    } catch (error) {
      console.error("Error fetching completed projects:", error)
      return { projects: [], error }
    }
  },

  // Mark a project as completed and check for achievements
  async markProjectAsCompleted(projectData: {
    project_id: number
    title: string
    level: string
    technologies: string[]
    frameworks: string[]
    databases: string[]
    app_type: string
  }): Promise<{ success: boolean; project: any; error: any }> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        return { success: false, project: null, error: "No authenticated user" }
      }

      // Insert the completed project
      const { data: project, error: projectError } = await supabase
        .from("completed_projects")
        .insert({
          user_id: session.user.id,
          project_id: projectData.project_id,
          title: projectData.title,
          level: projectData.level,
          technologies: projectData.technologies,
          frameworks: projectData.frameworks,
          databases: projectData.databases,
          app_type: projectData.app_type,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (projectError) throw projectError

      // Check for achievements that should be unlocked
      await this.checkAndUnlockAchievements(session.user.id)

      return { success: true, project, error: null }
    } catch (error) {
      console.error("Error marking project as completed:", error)
      return { success: false, project: null, error }
    }
  },

  // Remove a completed project
  async removeCompletedProject(projectId: string): Promise<{ success: boolean; error: any }> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        return { success: false, error: "No authenticated user" }
      }

      const { error } = await supabase
        .from("completed_projects")
        .delete()
        .eq("id", projectId)
        .eq("user_id", session.user.id)

      if (error) throw error

      // Re-check achievements as some might need to be revoked
      await this.checkAndUnlockAchievements(session.user.id)

      return { success: true, error: null }
    } catch (error) {
      console.error("Error removing completed project:", error)
      return { success: false, error }
    }
  },

  // Check and unlock achievements based on user's progress
  async checkAndUnlockAchievements(userId: string): Promise<void> {
    try {
      // Get all achievements
      const { data: achievements, error: achievementsError } = await supabase.from("achievements").select("*")

      if (achievementsError) throw achievementsError

      // Get user's completed projects
      const { data: projects, error: projectsError } = await supabase
        .from("completed_projects")
        .select("*")
        .eq("user_id", userId)

      if (projectsError) throw projectsError

      // Get user's already unlocked achievements
      const { data: userAchievements, error: userAchievementsError } = await supabase
        .from("user_achievements")
        .select("achievement_id")
        .eq("user_id", userId)

      if (userAchievementsError) throw userAchievementsError

      const unlockedAchievementIds = userAchievements.map((ua) => ua.achievement_id)

      // Check each achievement to see if it should be unlocked
      for (const achievement of achievements) {
        // Skip if already unlocked
        if (unlockedAchievementIds.includes(achievement.id)) continue

        const criteria = achievement.criteria
        let shouldUnlock = false

        switch (criteria.type) {
          case "project_count":
            shouldUnlock = projects.length >= (criteria.count || 0)
            break

          case "language":
            if (criteria.languages && criteria.count) {
              const languageCounts = criteria.languages.map(
                (lang) => projects.filter((p) => p.technologies.includes(lang)).length,
              )
              shouldUnlock = Math.max(...languageCounts) >= criteria.count
            }
            break

          case "framework":
            if (criteria.frameworks && criteria.count) {
              const frameworkCounts = criteria.frameworks.map(
                (framework) => projects.filter((p) => p.frameworks.includes(framework)).length,
              )
              shouldUnlock = Math.max(...frameworkCounts) >= criteria.count
            }
            break

          case "database":
            if (criteria.databases && criteria.count) {
              const databaseCounts = criteria.databases.map(
                (db) => projects.filter((p) => p.databases.includes(db)).length,
              )
              shouldUnlock = Math.max(...databaseCounts) >= criteria.count
            }
            break

          case "level":
            if (criteria.levels && criteria.count) {
              const levelCounts = criteria.levels.map((level) => projects.filter((p) => p.level === level).length)
              shouldUnlock = Math.max(...levelCounts) >= criteria.count
            }
            break

          case "app_type":
            if (criteria.app_types && criteria.count) {
              const appTypeCounts = criteria.app_types.map((type) => projects.filter((p) => p.app_type === type).length)
              shouldUnlock = Math.max(...appTypeCounts) >= criteria.count
            }
            break

          case "streak":
            if (criteria.streak_days) {
              shouldUnlock = this.checkConsecutiveDaysStreak(projects, criteria.streak_days)
            }
            break

          case "combination":
            if (criteria.languages && criteria.frameworks && criteria.count) {
              // Count projects that use both the specified language and framework
              const combinationCount = projects.filter(
                (p) =>
                  criteria.languages!.some((lang) => p.technologies.includes(lang)) &&
                  criteria.frameworks!.some((framework) => p.frameworks.includes(framework)),
              ).length
              shouldUnlock = combinationCount >= criteria.count
            }
            break

          case "time_of_day":
            if (criteria.time_range && criteria.count) {
              shouldUnlock = this.checkTimeOfDayProjects(projects, criteria.time_range, criteria.count)
            }
            break

          case "special":
            // Special conditions would be handled case by case
            if (criteria.special_condition === "easter_egg" && localStorage.getItem("easterEggActivated") === "true") {
              shouldUnlock = true
            }
            break
        }

        // If achievement should be unlocked, add it to user_achievements
        if (shouldUnlock) {
          await this.unlockAchievement(userId, achievement.id)
        }
      }
    } catch (error) {
      console.error("Error checking achievements:", error)
    }
  },

  // Unlock a specific achievement for a user
  async unlockAchievement(userId: string, achievementId: string): Promise<void> {
    try {
      // Add the achievement to user_achievements
      const { error: achievementError } = await supabase.from("user_achievements").insert({
        user_id: userId,
        achievement_id: achievementId,
        completed_at: new Date().toISOString(),
      })

      if (achievementError) throw achievementError

      // Check if this achievement has a badge
      const { data: achievement, error: achievementDataError } = await supabase
        .from("achievements")
        .select("badge_id")
        .eq("id", achievementId)
        .single()

      if (achievementDataError) throw achievementDataError

      // If there's a badge, award it
      if (achievement.badge_id) {
        await this.awardBadge(userId, achievement.badge_id)
      }

      // Trigger any achievement-specific actions
      await this.handleAchievementUnlock(userId, achievementId)
    } catch (error) {
      console.error(`Error unlocking achievement ${achievementId}:`, error)
    }
  },

  // Award a badge to a user
  async awardBadge(userId: string, badgeId: string): Promise<void> {
    try {
      // Check if user already has this badge
      const { data: existingBadge, error: existingBadgeError } = await supabase
        .from("user_badges")
        .select("id")
        .eq("user_id", userId)
        .eq("badge_id", badgeId)
        .maybeSingle()

      if (existingBadgeError) throw existingBadgeError
      if (existingBadge) return // User already has this badge

      // Award the badge
      const { error: badgeError } = await supabase.from("user_badges").insert({
        user_id: userId,
        badge_id: badgeId,
        earned_at: new Date().toISOString(),
      })

      if (badgeError) throw badgeError
    } catch (error) {
      console.error(`Error awarding badge ${badgeId}:`, error)
    }
  },

  // Handle any special actions when an achievement is unlocked
  async handleAchievementUnlock(userId: string, achievementId: string): Promise<void> {
    // This could trigger notifications, update user stats, etc.
    try {
      // For now, just log the achievement unlock
      console.log(`Achievement ${achievementId} unlocked for user ${userId}`)

      // You could add special handling for specific achievements here
    } catch (error) {
      console.error(`Error handling achievement unlock for ${achievementId}:`, error)
    }
  },

  // Check if user has completed projects on consecutive days
  checkConsecutiveDaysStreak(projects: CompletedProject[], requiredDays: number): boolean {
    if (projects.length < requiredDays) return false

    // Sort projects by completion date
    const sortedProjects = [...projects].sort(
      (a, b) => new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime(),
    )

    // Get unique dates (in YYYY-MM-DD format)
    const uniqueDates = new Set<string>()
    sortedProjects.forEach((project) => {
      const date = new Date(project.completed_at)
      const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      uniqueDates.add(dateString)
    })

    const uniqueDatesArray = Array.from(uniqueDates)

    // Check for consecutive days
    let maxStreak = 1
    let currentStreak = 1

    for (let i = 1; i < uniqueDatesArray.length; i++) {
      const prevDate = new Date(uniqueDatesArray[i - 1])
      const currDate = new Date(uniqueDatesArray[i])

      // Check if dates are consecutive
      const diffTime = Math.abs(currDate.getTime() - prevDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
      } else {
        currentStreak = 1
      }
    }

    return maxStreak >= requiredDays
  },

  // Check if user has completed enough projects during a specific time of day
  checkTimeOfDayProjects(projects: CompletedProject[], timeRange: string, requiredCount: number): boolean {
    // Define time ranges
    const timeRanges = {
      morning: { start: 5, end: 11 }, // 5 AM - 11:59 AM
      afternoon: { start: 12, end: 17 }, // 12 PM - 5:59 PM
      evening: { start: 18, end: 21 }, // 6 PM - 9:59 PM
      night: { start: 22, end: 4 }, // 10 PM - 4:59 AM
    }

    const range = timeRanges[timeRange as keyof typeof timeRanges]

    // Count projects completed during the specified time range
    const projectsInTimeRange = projects.filter((project) => {
      const date = new Date(project.completed_at)
      const hour = date.getHours()

      if (timeRange === "night") {
        // Night spans across midnight
        return hour >= range.start || hour <= range.end
      } else {
        return hour >= range.start && hour <= range.end
      }
    })

    return projectsInTimeRange.length >= requiredCount
  },

  // Get achievement statistics for a user
  async getUserAchievementStats(userId: string): Promise<{
    totalAchievements: number
    completedAchievements: number
    achievementsByLevel: Record<string, { total: number; completed: number }>
    error: any
  }> {
    try {
      // Get all achievements
      const { data: allAchievements, error: achievementsError } = await supabase
        .from("achievements")
        .select("id, level")

      if (achievementsError) throw achievementsError

      // Get user's completed achievements
      const { data: userAchievements, error: userAchievementsError } = await supabase
        .from("user_achievements")
        .select("achievement_id")
        .eq("user_id", userId)

      if (userAchievementsError) throw userAchievementsError

      const completedAchievementIds = userAchievements.map((ua) => ua.achievement_id)

      // Calculate statistics
      const totalAchievements = allAchievements.length
      const completedAchievements = completedAchievementIds.length

      // Group by level
      const achievementsByLevel: Record<string, { total: number; completed: number }> = {}

      allAchievements.forEach((achievement) => {
        const level = achievement.level
        if (!achievementsByLevel[level]) {
          achievementsByLevel[level] = { total: 0, completed: 0 }
        }

        achievementsByLevel[level].total++

        if (completedAchievementIds.includes(achievement.id)) {
          achievementsByLevel[level].completed++
        }
      })

      return {
        totalAchievements,
        completedAchievements,
        achievementsByLevel,
        error: null,
      }
    } catch (error) {
      console.error("Error getting achievement stats:", error)
      return {
        totalAchievements: 0,
        completedAchievements: 0,
        achievementsByLevel: {},
        error,
      }
    }
  },

  // Calculate progress for a specific achievement
  calculateAchievementProgress(achievement: Achievement, projects: CompletedProject[]): number {
    if (achievement.completed) return 100

    const criteria = achievement.criteria
    let current = 0
    let required = 1 // Default to avoid division by zero

    switch (criteria.type) {
      case "project_count":
        current = projects.length
        required = criteria.count || 1
        break

      case "language":
        if (criteria.languages && criteria.count) {
          const languageCounts = criteria.languages.map(
            (lang) => projects.filter((p) => p.technologies.includes(lang)).length,
          )
          current = Math.max(...languageCounts)
          required = criteria.count
        }
        break

      case "framework":
        if (criteria.frameworks && criteria.count) {
          const frameworkCounts = criteria.frameworks.map(
            (framework) => projects.filter((p) => p.frameworks.includes(framework)).length,
          )
          current = Math.max(...frameworkCounts)
          required = criteria.count
        }
        break

      case "database":
        if (criteria.databases && criteria.count) {
          const databaseCounts = criteria.databases.map((db) => projects.filter((p) => p.databases.includes(db)).length)
          current = Math.max(...databaseCounts)
          required = criteria.count
        }
        break

      case "level":
        if (criteria.levels && criteria.count) {
          const levelCounts = criteria.levels.map((level) => projects.filter((p) => p.level === level).length)
          current = Math.max(...levelCounts)
          required = criteria.count
        }
        break

      case "app_type":
        if (criteria.app_types && criteria.count) {
          const appTypeCounts = criteria.app_types.map((type) => projects.filter((p) => p.app_type === type).length)
          current = Math.max(...appTypeCounts)
          required = criteria.count
        }
        break

      case "streak":
        if (criteria.streak_days) {
          // Calculate current streak
          const currentStreak = this.calculateCurrentStreak(projects)
          current = currentStreak
          required = criteria.streak_days
        }
        break

      case "combination":
        if (criteria.languages && criteria.frameworks && criteria.count) {
          // Count projects that use both the specified language and framework
          const combinationCount = projects.filter(
            (p) =>
              criteria.languages!.some((lang) => p.technologies.includes(lang)) &&
              criteria.frameworks!.some((framework) => p.frameworks.includes(framework)),
          ).length
          current = combinationCount
          required = criteria.count
        }
        break

      case "time_of_day":
        if (criteria.time_range && criteria.count) {
          // Count projects completed during the specified time range
          const timeRangeProjects = this.getProjectsByTimeOfDay(projects, criteria.time_range)
          current = timeRangeProjects
          required = criteria.count
        }
        break

      case "special":
        // Special conditions would be handled case by case
        if (criteria.special_condition === "easter_egg") {
          current = localStorage.getItem("easterEggActivated") === "true" ? 1 : 0
          required = 1
        }
        break
    }

    // Calculate percentage, cap at 99% if not completed
    return achievement.completed ? 100 : Math.min(Math.floor((current / required) * 100), 99)
  },

  // Calculate current streak of consecutive days
  calculateCurrentStreak(projects: CompletedProject[]): number {
    if (projects.length === 0) return 0

    // Sort projects by completion date
    const sortedProjects = [...projects].sort(
      (a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime(),
    )

    // Get unique dates (in YYYY-MM-DD format)
    const uniqueDates = new Set<string>()
    sortedProjects.forEach((project) => {
      const date = new Date(project.completed_at)
      const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      uniqueDates.add(dateString)
    })

    const uniqueDatesArray = Array.from(uniqueDates).sort()

    // Check for consecutive days
    let currentStreak = 1

    // Check if the most recent date is today or yesterday
    const today = new Date()
    const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    const yesterdayString = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`

    const mostRecentDate = uniqueDatesArray[uniqueDatesArray.length - 1]

    // If the most recent date is not today or yesterday, streak is broken
    if (mostRecentDate !== todayString && mostRecentDate !== yesterdayString) {
      return 0
    }

    // Count consecutive days
    for (let i = uniqueDatesArray.length - 2; i >= 0; i--) {
      const currDate = new Date(uniqueDatesArray[i + 1])
      const prevDate = new Date(uniqueDatesArray[i])

      // Check if dates are consecutive
      const diffTime = Math.abs(currDate.getTime() - prevDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        currentStreak++
      } else {
        break
      }
    }

    return currentStreak
  },

  // Get count of projects completed during a specific time of day
  getProjectsByTimeOfDay(projects: CompletedProject[], timeRange: string): number {
    // Define time ranges
    const timeRanges = {
      morning: { start: 5, end: 11 }, // 5 AM - 11:59 AM
      afternoon: { start: 12, end: 17 }, // 12 PM - 5:59 PM
      evening: { start: 18, end: 21 }, // 6 PM - 9:59 PM
      night: { start: 22, end: 4 }, // 10 PM - 4:59 AM
    }

    const range = timeRanges[timeRange as keyof typeof timeRanges]

    // Count projects completed during the specified time range
    const projectsInTimeRange = projects.filter((project) => {
      const date = new Date(project.completed_at)
      const hour = date.getHours()

      if (timeRange === "night") {
        // Night spans across midnight
        return hour >= range.start || hour <= range.end
      } else {
        return hour >= range.start && hour <= range.end
      }
    })

    return projectsInTimeRange.length
  },

  // Get all achievements with completion status and progress for current user
  async getUserAchievementsWithProgress(): Promise<{ achievements: Achievement[]; error: any }> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // Get all achievements
      const { data: allAchievements, error: achievementsError } = await supabase
        .from("achievements")
        .select("*, badges(*)")

      if (achievementsError) throw achievementsError

      // If no session, return all achievements but mark them as not completed
      if (!session) {
        const achievements = allAchievements.map((achievement) => ({
          ...achievement,
          badge: achievement.badges,
          completed: false,
          completedAt: null,
          progress: 0,
        }))

        return { achievements, error: null }
      }

      // Get user's completed projects
      const { projects, error: projectsError } = await this.getUserCompletedProjects()
      if (projectsError) throw projectsError

      // Get user's completed achievements
      const { data: userAchievements, error: userAchievementsError } = await supabase
        .from("user_achievements")
        .select("achievement_id, completed_at")
        .eq("user_id", session.user.id)

      if (userAchievementsError) throw userAchievementsError

      // Mark achievements as completed and calculate progress
      const achievements = allAchievements.map((achievement) => {
        const userAchievement = userAchievements?.find((ua) => ua.achievement_id === achievement.id)
        const isCompleted = !!userAchievement

        const achievementWithCompletion = {
          ...achievement,
          badge: achievement.badges,
          completed: isCompleted,
          completedAt: userAchievement?.completed_at || null,
        }

        // Calculate progress
        const progress = this.calculateAchievementProgress(achievementWithCompletion, projects)

        return {
          ...achievementWithCompletion,
          progress,
        }
      })

      return { achievements, error: null }
    } catch (error) {
      console.error("Error fetching achievements with progress:", error)
      return { achievements: [], error }
    }
  },
}
