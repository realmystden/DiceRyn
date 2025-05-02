"use client"

import { useEffect } from "react"
import { useProjectIdeasStore } from "@/lib/store"
import { achievementService } from "@/lib/services/achievement-service"
import { useToast } from "@/components/ui/use-toast"
import { projectIdeas } from "@/lib/project-ideas"
import { useAuth } from "@/lib/auth/auth-provider"

export function ProjectCompletionHandler() {
  const { completedProjects, markProjectAsCompleted, unmarkProjectAsCompleted } = useProjectIdeasStore()
  const { toast } = useToast()
  const { user, isLoading } = useAuth()

  // Sync local store with database when component mounts and user is authenticated
  useEffect(() => {
    const syncCompletedProjects = async () => {
      // Skip if user is not authenticated or still loading
      if (!user || isLoading) return

      try {
        // Get completed projects from database
        const { projects, error } = await achievementService.getUserCompletedProjects()
        if (error) throw error

        // Get project IDs from database
        const dbProjectIds = projects.map((p) => p.project_id)

        // Get local project IDs
        const localProjectIds = completedProjects.map((p) => p.id)

        // Find projects that are in local store but not in database
        const projectsToSync = completedProjects.filter((p) => !dbProjectIds.includes(p.id))

        // Sync each project to database
        for (const project of projectsToSync) {
          const projectIndex = project.id - 1
          if (projectIndex < 0 || projectIndex >= projectIdeas.length) continue

          const projectData = projectIdeas[projectIndex]

          await achievementService.markProjectAsCompleted({
            project_id: project.id,
            title: projectData.titulo,
            level: projectData.nivel,
            technologies: projectData.tecnologias,
            frameworks: projectData.frameworks || [],
            databases: projectData.basesdedatos || [],
            app_type: projectData.tipo,
          })
        }

        // Find projects that are in database but not in local store
        const projectsToAddLocally = projects.filter((p) => !localProjectIds.includes(p.project_id))

        // Add each project to local store
        for (const project of projectsToAddLocally) {
          markProjectAsCompleted(project.project_id)
        }
      } catch (error) {
        console.error("Error syncing completed projects:", error)
      }
    }

    syncCompletedProjects()
  }, [completedProjects, markProjectAsCompleted, user, isLoading])

  // Override the markProjectAsCompleted function to also update the database
  useEffect(() => {
    // Skip if user is not authenticated
    if (!user) return

    const originalMarkProjectAsCompleted = useProjectIdeasStore.getState().markProjectAsCompleted
    const originalUnmarkProjectAsCompleted = useProjectIdeasStore.getState().unmarkProjectAsCompleted

    // Override mark project as completed
    useProjectIdeasStore.setState({
      markProjectAsCompleted: async (projectId: number) => {
        // First update local state
        originalMarkProjectAsCompleted(projectId)

        // Then update database
        try {
          const projectIndex = projectId - 1
          if (projectIndex < 0 || projectIndex >= projectIdeas.length) return

          const projectData = projectIdeas[projectIndex]

          const { success, project, error } = await achievementService.markProjectAsCompleted({
            project_id: projectId,
            title: projectData.titulo,
            level: projectData.nivel,
            technologies: projectData.tecnologias,
            frameworks: projectData.frameworks || [],
            databases: projectData.basesdedatos || [],
            app_type: projectData.tipo,
          })

          if (error) throw error

          if (success) {
            toast({
              title: "Proyecto completado",
              description: `¡Has completado "${projectData.titulo}"!`,
              variant: "default",
            })
          }
        } catch (error) {
          console.error("Error marking project as completed:", error)
          toast({
            title: "Error",
            description: "No se pudo marcar el proyecto como completado. Inténtalo de nuevo.",
            variant: "destructive",
          })
        }
      },

      // Override unmark project as completed
      unmarkProjectAsCompleted: async (projectId: number) => {
        // First update local state
        originalUnmarkProjectAsCompleted(projectId)

        // Then update database
        try {
          // Find the project in the database
          const { projects } = await achievementService.getUserCompletedProjects()
          const dbProject = projects.find((p) => p.project_id === projectId)

          if (dbProject) {
            const { success, error } = await achievementService.removeCompletedProject(dbProject.id)
            if (error) throw error
          }
        } catch (error) {
          console.error("Error unmarking project as completed:", error)
        }
      },
    })

    // Cleanup
    return () => {
      useProjectIdeasStore.setState({
        markProjectAsCompleted: originalMarkProjectAsCompleted,
        unmarkProjectAsCompleted: originalUnmarkProjectAsCompleted,
      })
    }
  }, [toast, user])

  // Only render for authenticated users
  if (!user) return null

  return null
}
