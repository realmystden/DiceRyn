import { createClientSupabaseClient } from "./supabase/client"
import { useStore } from "./store"

// Función para sincronizar datos locales con Supabase
export async function syncDataWithSupabase(userId: string) {
  const supabase = createClientSupabaseClient()
  const store = useStore.getState()

  try {
    // Sincronizar proyectos completados
    const completedProjects = store.completedProjects || []

    for (const project of completedProjects) {
      // Verificar si el proyecto ya existe en Supabase
      const { data: existingProject } = await supabase
        .from("completed_projects")
        .select("*")
        .eq("user_id", userId)
        .eq("project_id", project.id)
        .single()

      if (!existingProject) {
        // Si no existe, insertarlo
        await supabase.from("completed_projects").insert({
          user_id: userId,
          project_id: project.id,
          title: project.title,
          level: project.level,
          technologies: project.technologies || [],
          frameworks: project.frameworks || [],
          databases: project.databases || [],
        })
      }
    }

    // Sincronizar logros
    const achievements = store.unlockedAchievements || []

    for (const achievementId of achievements) {
      // Verificar si el logro ya existe en Supabase
      const { data: existingAchievement } = await supabase
        .from("achievements")
        .select("*")
        .eq("user_id", userId)
        .eq("achievement_id", achievementId)
        .single()

      if (!existingAchievement) {
        // Si no existe, insertarlo
        await supabase.from("achievements").insert({
          user_id: userId,
          achievement_id: achievementId,
        })
      }
    }

    // Sincronizar insignias
    const badges = store.unlockedBadges || []

    for (const badgeId of badges) {
      // Verificar si la insignia ya existe en Supabase
      const { data: existingBadge } = await supabase
        .from("badges")
        .select("*")
        .eq("user_id", userId)
        .eq("badge_id", badgeId)
        .single()

      if (!existingBadge) {
        // Si no existe, insertarla
        await supabase.from("badges").insert({
          user_id: userId,
          badge_id: badgeId,
        })
      }
    }

    console.log("Datos sincronizados con Supabase correctamente")
  } catch (error) {
    console.error("Error al sincronizar datos con Supabase:", error)
  }
}

// Función para cargar datos del usuario desde Supabase
export async function loadUserDataFromSupabase(userId: string) {
  const supabase = createClientSupabaseClient()
  const store = useStore.getState()

  try {
    // Cargar proyectos completados
    const { data: completedProjects } = await supabase.from("completed_projects").select("*").eq("user_id", userId)

    if (completedProjects && completedProjects.length > 0) {
      const formattedProjects = completedProjects.map((project) => ({
        id: project.project_id,
        title: project.title,
        level: project.level,
        technologies: project.technologies,
        frameworks: project.frameworks,
        databases: project.databases,
        completedAt: new Date(project.completed_at),
      }))

      store.setCompletedProjects(formattedProjects)
    }

    // Cargar logros
    const { data: achievements } = await supabase.from("achievements").select("*").eq("user_id", userId)

    if (achievements && achievements.length > 0) {
      const achievementIds = achievements.map((achievement) => achievement.achievement_id)
      store.setUnlockedAchievements(achievementIds)
    }

    // Cargar insignias
    const { data: badges } = await supabase.from("badges").select("*").eq("user_id", userId)

    if (badges && badges.length > 0) {
      const badgeIds = badges.map((badge) => badge.badge_id)
      store.setUnlockedBadges(badgeIds)
    }

    console.log("Datos cargados desde Supabase correctamente")
  } catch (error) {
    console.error("Error al cargar datos desde Supabase:", error)
  }
}
