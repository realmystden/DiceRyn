import { create } from "zustand"
import { persist } from "zustand/middleware"

// Definir tipos
export type AchievementLevel = "Student" | "Trainee" | "Junior" | "Senior" | "Master"

export interface Achievement {
  id: string
  title: string
  description: string
  level: AchievementLevel
  completed: boolean
  icon?: string
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
    period?: number // Para períodos específicos (días, semanas, etc.)
    dayType?: "weekday" | "weekend" // Para días específicos
    timeRange?: "morning" | "afternoon" | "evening" | "night" // Para horarios específicos
  }
}

export interface CompletedProject {
  id: number
  completedAt: number // Timestamp de cuando se completó el proyecto
  title: string
  level: string
  technologies: string[]
  frameworks: string[]
  databases: string[]
}

interface ProjectIdeasStore {
  // Filtros
  appTypeFilter: string | null
  setAppTypeFilter: (filter: string | null) => void

  languageFilter: string | null
  setLanguageFilter: (filter: string | null) => void

  frameworkFilter: string | null
  setFrameworkFilter: (filter: string | null) => void

  databaseFilter: string | null
  setDatabaseFilter: (filter: string | null) => void

  nivelFilter: string | null
  setNivelFilter: (filter: string | null) => void

  sortOption: string
  setSortOption: (option: string) => void

  // Ideas seleccionadas
  selectedIdea: number | null
  setSelectedIdea: (index: number | null) => void

  // Easter Egg
  easterEggActivated: boolean
  setEasterEggActivated: (activated: boolean) => void

  // Sistema de logros
  completedProjects: CompletedProject[]
  markProjectAsCompleted: (projectId: number) => void
  unmarkProjectAsCompleted: (projectId: number) => void
  isProjectCompleted: (projectId: number) => boolean

  // Estadísticas de progreso
  getCompletedProjectsByLevel: (level: string) => number
  getCompletedProjectsByLanguage: (language: string) => number
  getCompletedProjectsByFramework: (framework: string) => number
  getTotalCompletedProjects: () => number
  getCurrentLevel: () => AchievementLevel
  getLevelProgress: () => number

  // Logros
  achievements: Achievement[]
  unlockAchievement: (achievementId: string) => void
  getUnlockedAchievements: () => string[]

  // Estadísticas de progreso adicionales
  getCompletedProjectsByDatabase: (database: string) => number
  getCompletedProjectsByAppType: (appType: string) => number

  // Nuevas funciones para verificar consistencia
  getConsecutiveDaysStreak: () => number
  getWeeklyCompletionCount: (weeks?: number) => number
  getMonthlyCompletionCount: (months?: number) => number
  getProjectsCompletedSameDay: (maxHours?: number) => number
  getProjectsByTimeOfDay: (timeRange: "morning" | "afternoon" | "evening" | "night") => number
  getProjectsByDayType: (dayType: "weekday" | "weekend") => number

  checkAndUnlockAchievements: () => void

  // Add this function to the store to check if all achievements are completed
  checkAllAchievementsCompleted: () => void

  // Add this function to the store to set the data loaded from Supabase
  setCompletedProjects: (projects: CompletedProject[]) => void
  setUnlockedAchievements: (achievements: string[]) => void
  setUnlockedBadges: (badges: string[]) => void
}

export const useProjectIdeasStore = create<ProjectIdeasStore>()(
  persist(
    (set, get) => ({
      // Filtros iniciales
      appTypeFilter: null,
      setAppTypeFilter: (filter) => set({ appTypeFilter: filter }),

      languageFilter: null,
      setLanguageFilter: (filter) => set({ languageFilter: filter }),

      frameworkFilter: null,
      setFrameworkFilter: (filter) => set({ frameworkFilter: filter }),

      databaseFilter: null,
      setDatabaseFilter: (filter) => set({ databaseFilter: filter }),

      nivelFilter: null,
      setNivelFilter: (filter) => set({ nivelFilter: filter }),

      sortOption: "aleatorio",
      setSortOption: (option) => set({ sortOption: option }),

      // Ideas seleccionadas
      selectedIdea: null,
      setSelectedIdea: (index) => set({ selectedIdea: index }),

      // Easter Egg
      easterEggActivated: false,
      setEasterEggActivated: (activated) => set({ easterEggActivated: activated }),

      // Sistema de logros
      completedProjects: [],
      markProjectAsCompleted: (projectId) => {
        set((state) => ({
          completedProjects: [
            ...state.completedProjects,
            {
              id: projectId,
              completedAt: Date.now(),
              title: `Project ${projectId}`,
              level: "Junior",
              technologies: [],
              frameworks: [],
              databases: [],
            },
          ],
        }))
        get().checkAndUnlockAchievements()
      },
      unmarkProjectAsCompleted: (projectId) => {
        set((state) => ({
          completedProjects: state.completedProjects.filter((p) => p.id !== projectId),
        }))
        get().checkAndUnlockAchievements()
      },
      isProjectCompleted: (projectId) => {
        return get().completedProjects.some((p) => p.id === projectId)
      },

      // Estadísticas de progreso
      getCompletedProjectsByLevel: (level) => {
        return get().completedProjects.filter((p) => p.level === level).length
      },
      getCompletedProjectsByLanguage: (language) => {
        return get().completedProjects.filter((p) => p.technologies.includes(language)).length
      },
      getCompletedProjectsByFramework: (framework) => {
        return get().completedProjects.filter((p) => p.frameworks.includes(framework)).length
      },
      getTotalCompletedProjects: () => {
        return get().completedProjects.length
      },
      getCurrentLevel: () => {
        return "Junior"
      },
      getLevelProgress: () => {
        return 0.5
      },

      // Logros
      achievements: [],
      unlockAchievement: (achievementId) => {
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === achievementId ? { ...achievement, completed: true } : achievement,
          ),
        }))
        get().checkAllAchievementsCompleted()
      },
      getUnlockedAchievements: () => {
        return get()
          .achievements.filter((a) => a.completed)
          .map((a) => a.id)
      },

      // Estadísticas de progreso adicionales
      getCompletedProjectsByDatabase: (database: string) => {
        return get().completedProjects.filter((p) => p.databases.includes(database)).length
      },
      getCompletedProjectsByAppType: (appType: string) => {
        return get().completedProjects.filter((p) => p.tipo === appType).length
      },

      // Nuevas funciones para verificar consistencia
      getConsecutiveDaysStreak: () => {
        return 0
      },
      getWeeklyCompletionCount: (weeks = 1) => {
        return 0
      },
      getMonthlyCompletionCount: (months = 1) => {
        return 0
      },
      getProjectsCompletedSameDay: (maxHours = 24) => {
        return 0
      },
      getProjectsByTimeOfDay: (timeRange) => {
        return 0
      },
      getProjectsByDayType: (dayType) => {
        return 0
      },

      checkAndUnlockAchievements: () => {
        // Implementación de la lógica para desbloquear logros
      },

      // Add this function to the store to check if all achievements are completed
      checkAllAchievementsCompleted: () => {
        // Implementación de la lógica para verificar si todos los logros están completados
      },

      setCompletedProjects: (projects) => set({ completedProjects: projects }),
      setUnlockedAchievements: (achievements) => set({ unlockedAchievements: achievements }),
      setUnlockedBadges: (badges) => set({ unlockedBadges: badges }),
    }),
    {
      name: "project-ideas-storage",
      partialize: (state) => ({
        completedProjects: state.completedProjects,
        achievements: state.achievements,
        easterEggActivated: state.easterEggActivated,
      }),
    },
  ),
)

export const useStore = useProjectIdeasStore
