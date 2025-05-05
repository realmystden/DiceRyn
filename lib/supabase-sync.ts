import { createClientSupabaseClient } from "./supabase/client"
import { useProjectIdeasStore } from "./store"

export async function syncDataWithSupabase(userId: string) {
  const supabase = createClientSupabaseClient()
  const store = useProjectIdeasStore.getState()

  try {
    // Sincronizar proyectos completados
    await syncCompletedProjects(userId, store.completedProjects, supabase)

    // Sincronizar logros desbloqueados
    await syncAchievements(
      userId,
      store.achievements.filter((a) => a.completed),
      supabase,
    )

    return true
  } catch (error) {
    console.error("Error syncing data with Supabase:", error)
    return false
  }
}

async function syncCompletedProjects(userId: string, completedProjects: any[], supabase: any) {
  // Obtener proyectos completados de Supabase
  const { data: existingProjects, error } = await supabase
    .from("completed_projects")
    .select("project_id")
    .eq("user_id", userId)

  if (error) throw error

  // Crear un conjunto de IDs de proyectos existentes
  const existingProjectIds = new Set(existingProjects.map((p: any) => p.project_id))

  // Filtrar proyectos que no existen en Supabase
  const projectsToInsert = completedProjects.filter((p) => !existingProjectIds.has(p.id))

  // Insertar nuevos proyectos
  if (projectsToInsert.length > 0) {
    const { error: insertError } = await supabase.from("completed_projects").insert(
      projectsToInsert.map((p) => ({
        user_id: userId,
        project_id: p.id,
        completed_at: new Date(p.completedAt).toISOString(),
        title: p.title,
        level: p.level,
        technologies: p.technologies,
        frameworks: p.frameworks,
        databases: p.databases,
      })),
    )

    if (insertError) throw insertError
  }
}

async function syncAchievements(userId: string, achievements: any[], supabase: any) {
  // Obtener logros desbloqueados de Supabase
  const { data: existingAchievements, error } = await supabase
    .from("achievements")
    .select("achievement_id")
    .eq("user_id", userId)

  if (error) throw error

  // Crear un conjunto de IDs de logros existentes
  const existingAchievementIds = new Set(existingAchievements.map((a: any) => a.achievement_id))

  // Filtrar logros que no existen en Supabase
  const achievementsToInsert = achievements.filter((a) => !existingAchievementIds.has(a.id))

  // Insertar nuevos logros
  if (achievementsToInsert.length > 0) {
    const { error: insertError } = await supabase.from("achievements").insert(
      achievementsToInsert.map((a) => ({
        user_id: userId,
        achievement_id: a.id,
        unlocked_at: new Date().toISOString(),
      })),
    )

    if (insertError) throw insertError
  }
}

export async function loadUserDataFromSupabase(userId: string) {
  const supabase = createClientSupabaseClient()
  const store = useProjectIdeasStore.getState()

  try {
    // Cargar proyectos completados
    const { data: completedProjects, error: projectsError } = await supabase
      .from("completed_projects")
      .select("*")
      .eq("user_id", userId)

    if (projectsError) throw projectsError

    // Cargar logros desbloqueados
    const { data: achievements, error: achievementsError } = await supabase
      .from("achievements")
      .select("*")
      .eq("user_id", userId)

    if (achievementsError) throw achievementsError

    // Actualizar el store con los datos cargados
    if (completedProjects && completedProjects.length > 0) {
      const formattedProjects = completedProjects.map((p) => ({
        id: p.project_id,
        completedAt: new Date(p.completed_at).getTime(),
        title: p.title,
        level: p.level,
        technologies: p.technologies,
        frameworks: p.frameworks,
        databases: p.databases,
      }))

      // Actualizar el store con los proyectos cargados
      store.completedProjects = formattedProjects
    }

    if (achievements && achievements.length > 0) {
      // Actualizar el estado de los logros en el store
      const updatedAchievements = store.achievements.map((a) => {
        const found = achievements.find((sa) => sa.achievement_id === a.id)
        if (found) {
          return { ...a, completed: true }
        }
        return a
      })

      store.achievements = updatedAchievements
    }

    return true
  } catch (error) {
    console.error("Error loading data from Supabase:", error)
    return false
  }
}
