import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"
import type { AchievementCriteria } from "@/lib/services/achievement-service"

// GET: Fetch all achievements with completion status
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

    // Get all achievements
    const { data: allAchievements, error: achievementsError } = await supabase.from("achievements").select("*")

    if (achievementsError) throw achievementsError

    // Get user's completed achievements
    const { data: userAchievements, error: userAchievementsError } = await supabase
      .from("user_achievements")
      .select("achievement_id, completed_at")
      .eq("user_id", user.id)

    if (userAchievementsError) throw userAchievementsError

    // Mark achievements as completed if the user has earned them
    const achievements = allAchievements.map((achievement) => {
      const userAchievement = userAchievements?.find((ua) => ua.achievement_id === achievement.id)
      return {
        ...achievement,
        completed: !!userAchievement,
        completedAt: userAchievement?.completed_at || null,
      }
    })

    return NextResponse.json({ achievements })
  } catch (error: any) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json({ error: "Failed to fetch achievements", details: error.message }, { status: 500 })
  }
}

// POST: Unlock an achievement manually (for testing or admin purposes)
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

    const { achievementId } = await request.json()
    if (!achievementId) {
      return NextResponse.json({ error: "Achievement ID is required" }, { status: 400 })
    }

    // Check if achievement exists
    const { data: achievement, error: achievementError } = await supabase
      .from("achievements")
      .select("*")
      .eq("id", achievementId)
      .single()

    if (achievementError || !achievement) {
      return NextResponse.json({ error: "Achievement not found" }, { status: 404 })
    }

    // Check if user already has this achievement
    const { data: existingAchievement, error: existingError } = await supabase
      .from("user_achievements")
      .select("*")
      .eq("user_id", user.id)
      .eq("achievement_id", achievementId)
      .maybeSingle()

    if (existingAchievement) {
      return NextResponse.json({ error: "Achievement already unlocked" }, { status: 400 })
    }

    // Add achievement to user
    const { data, error } = await supabase
      .from("user_achievements")
      .insert({
        user_id: user.id,
        achievement_id: achievementId,
        completed_at: new Date().toISOString(),
      })
      .select()

    if (error) throw error

    // Check if this achievement has a badge
    if (achievement.badge_id) {
      // Award the badge
      await supabase.from("user_badges").insert({
        user_id: user.id,
        badge_id: achievement.badge_id,
        earned_at: new Date().toISOString(),
      })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error unlocking achievement:", error)
    return NextResponse.json({ error: "Failed to unlock achievement", details: error.message }, { status: 500 })
  }
}

// PUT: Check and update all achievements for the current user
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

    // Get all achievements
    const { data: achievements, error: achievementsError } = await supabase.from("achievements").select("*")

    if (achievementsError) throw achievementsError

    // Get user's completed projects
    const { data: projects, error: projectsError } = await supabase
      .from("completed_projects")
      .select("*")
      .eq("user_id", user.id)

    if (projectsError) throw projectsError

    // Get user's already unlocked achievements
    const { data: userAchievements, error: userAchievementsError } = await supabase
      .from("user_achievements")
      .select("achievement_id")
      .eq("user_id", user.id)

    if (userAchievementsError) throw userAchievementsError

    const unlockedAchievementIds = userAchievements.map((ua) => ua.achievement_id)
    const newlyUnlocked = []

    // Check each achievement to see if it should be unlocked
    for (const achievement of achievements) {
      // Skip if already unlocked
      if (unlockedAchievementIds.includes(achievement.id)) continue

      const criteria = achievement.criteria as AchievementCriteria
      let shouldUnlock = false

      // Implement the same logic as in the achievement service
      // This is a simplified version for brevity
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

        // Add other criteria checks here...
      }

      // If achievement should be unlocked, add it to user_achievements
      if (shouldUnlock) {
        const { data, error } = await supabase
          .from("user_achievements")
          .insert({
            user_id: user.id,
            achievement_id: achievement.id,
            completed_at: new Date().toISOString(),
          })
          .select()

        if (error) throw error

        newlyUnlocked.push({
          achievement,
          unlockData: data[0],
        })

        // Check if this achievement has a badge
        if (achievement.badge_id) {
          // Award the badge
          await supabase.from("user_badges").insert({
            user_id: user.id,
            badge_id: achievement.badge_id,
            earned_at: new Date().toISOString(),
          })
        }
      }
    }

    return NextResponse.json({
      success: true,
      newlyUnlocked,
      totalUnlocked: unlockedAchievementIds.length + newlyUnlocked.length,
    })
  } catch (error: any) {
    console.error("Error checking achievements:", error)
    return NextResponse.json({ error: "Failed to check achievements", details: error.message }, { status: 500 })
  }
}
