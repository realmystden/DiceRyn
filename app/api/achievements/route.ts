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
    // Fetch user achievements
    const { data: userAchievements, error: userAchievementsError } = await supabase
      .from("user_achievements")
      .select(`
        id,
        completed_at,
        achievements (*)
      `)
      .eq("user_id", user.id)

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

    return NextResponse.json({ achievements })
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const supabase = getSupabaseServer()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
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

    // Check if this achievement unlocks a badge
    await checkAndAwardBadges(supabase, user.id, achievementId)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error unlocking achievement:", error)
    return NextResponse.json({ error: "Failed to unlock achievement" }, { status: 500 })
  }
}

async function checkAndAwardBadges(supabase: any, userId: string, achievementId: string) {
  // This function would check if the achievement unlocks any badges
  // and award them to the user if needed

  // For example, you might have badge rules like:
  // - Unlock "Beginner" badge when user completes 5 achievements
  // - Unlock "JavaScript Master" badge when user completes all JavaScript-related achievements

  try {
    // Count user's achievements
    const { count, error: countError } = await supabase
      .from("user_achievements")
      .select("*", { count: "exact" })
      .eq("user_id", userId)

    if (countError) throw countError

    // Check for milestone badges
    if (count === 1) {
      // First achievement badge
      await awardBadge(supabase, userId, "first-achievement")
    } else if (count === 5) {
      // 5 achievements badge
      await awardBadge(supabase, userId, "achievement-collector")
    } else if (count === 10) {
      // 10 achievements badge
      await awardBadge(supabase, userId, "achievement-master")
    }

    // Check for specific achievement badges
    // This would depend on your badge system design
  } catch (error) {
    console.error("Error checking badges:", error)
  }
}

async function awardBadge(supabase: any, userId: string, badgeId: string) {
  try {
    // Check if badge exists
    const { data: badge, error: badgeError } = await supabase.from("badges").select("*").eq("id", badgeId).single()

    if (badgeError || !badge) {
      console.error("Badge not found:", badgeId)
      return
    }

    // Check if user already has this badge
    const { data: existingBadge, error: existingError } = await supabase
      .from("user_badges")
      .select("*")
      .eq("user_id", userId)
      .eq("badge_id", badgeId)
      .maybeSingle()

    if (existingBadge) {
      return // User already has this badge
    }

    // Award badge to user
    const { data, error } = await supabase.from("user_badges").insert({
      user_id: userId,
      badge_id: badgeId,
      earned_at: new Date().toISOString(),
    })

    if (error) throw error

    console.log(`Badge ${badgeId} awarded to user ${userId}`)
  } catch (error) {
    console.error("Error awarding badge:", error)
  }
}
