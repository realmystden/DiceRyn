"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from "lucide-react"
import { achievementService, type CompletedProject } from "@/lib/services/achievement-service"
import { useToast } from "@/components/ui/use-toast"

export function ProjectsDisplay() {
  const [projects, setProjects] = useState<CompletedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    setLoading(true)
    try {
      const { projects, error } = await achievementService.getUserCompletedProjects()
      if (error) throw error
      setProjects(projects)
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError("Failed to load completed projects. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteProject(projectId: string) {
    try {
      setDeletingId(projectId)
      const { success, error } = await achievementService.removeCompletedProject(projectId)

      if (error) throw error

      if (success) {
        setProjects(projects.filter((p) => p.id !== projectId))
        toast({
          title: "Proyecto eliminado",
          description: "El proyecto ha sido eliminado de tu lista de completados.",
          variant: "default",
        })
      }
    } catch (err) {
      console.error("Error deleting project:", err)
      toast({
        title: "Error",
        description: "No se pudo eliminar el proyecto. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        <span className="ml-2 text-white font-fondamento">Cargando proyectos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400 font-fondamento">
        <p>{error}</p>
        <button
          onClick={() => fetchProjects()}
          className="mt-4 px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md text-white"
        >
          Reintentar
        </button>
      </div>
    )
  }

  // Filter projects based on selected filter
  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true
    if (filter === project.level) return true
    return false
  })

  // Group projects by level for statistics
  const projectsByLevel = projects.reduce(
    (acc, project) => {
      const level = project.level
      if (!acc[level]) {
        acc[level] = 0
      }
      acc[level]++
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      <div className="fantasy-card p-4 bg-gray-800/50 border-gray-700">
        <h2 className="text-xl font-cinzel font-bold text-white mb-4">Proyectos Completados</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-sm text-gray-300 mb-1 font-fondamento">Total</div>
            <Badge className="bg-purple-600">{projects.length}</Badge>
          </div>

          {Object.entries(projectsByLevel).map(([level, count]) => {
            let levelColor = "bg-gray-600"
            if (level === "Student") levelColor = "bg-green-600"
            if (level === "Trainee") levelColor = "bg-blue-600"
            if (level === "Junior") levelColor = "bg-indigo-600"
            if (level === "Senior") levelColor = "bg-purple-600"

            return (
              <div key={level} className="text-center">
                <div className="text-sm text-gray-300 mb-1 font-fondamento">{level}</div>
                <Badge className={levelColor}>{count}</Badge>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
            <TabsTrigger value="all" className="font-fondamento">
              Todos
            </TabsTrigger>
            <TabsTrigger value="Student" className="font-fondamento">
              Student
            </TabsTrigger>
            <TabsTrigger value="Trainee" className="font-fondamento">
              Trainee
            </TabsTrigger>
            <TabsTrigger value="Junior" className="font-fondamento">
              Junior
            </TabsTrigger>
            <TabsTrigger value="Senior" className="font-fondamento">
              Senior
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => {
              // Determine card styling based on level
              let cardStyle = "bg-gray-800/50 border-gray-700"
              let levelBadgeStyle = "bg-gray-700 text-gray-300"

              if (project.level === "Student") {
                cardStyle = "bg-green-900/20 border-green-800"
                levelBadgeStyle = "bg-green-800 text-green-200"
              } else if (project.level === "Trainee") {
                cardStyle = "bg-blue-900/20 border-blue-800"
                levelBadgeStyle = "bg-blue-800 text-blue-200"
              } else if (project.level === "Junior") {
                cardStyle = "bg-indigo-900/20 border-indigo-800"
                levelBadgeStyle = "bg-indigo-800 text-indigo-200"
              } else if (project.level === "Senior") {
                cardStyle = "bg-purple-900/20 border-purple-800"
                levelBadgeStyle = "bg-purple-800 text-purple-200"
              }

              return (
                <Card key={project.id} className={`fantasy-card ${cardStyle}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-cinzel font-bold text-white">{project.title}</h3>
                      <Badge className={levelBadgeStyle}>{project.level}</Badge>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={`${tech}-${index}`}
                          className="text-xs bg-gray-800/70 text-blue-300 px-2 py-1 rounded-full font-fondamento"
                        >
                          {tech}
                        </span>
                      ))}

                      {project.frameworks.map((framework, index) => (
                        <span
                          key={`${framework}-${index}`}
                          className="text-xs bg-gray-800/70 text-purple-300 px-2 py-1 rounded-full font-fondamento"
                        >
                          {framework}
                        </span>
                      ))}

                      {project.databases.map((db, index) => (
                        <span
                          key={`${db}-${index}`}
                          className="text-xs bg-gray-800/70 text-green-300 px-2 py-1 rounded-full font-fondamento"
                        >
                          {db}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-fondamento">
                        Completado el {new Date(project.completed_at).toLocaleDateString()}
                      </span>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                        onClick={() => handleDeleteProject(project.id)}
                        disabled={deletingId === project.id}
                      >
                        {deletingId === project.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <div className="text-center py-10 text-gray-400 font-fondamento">
              No has completado ningún proyecto de este nivel todavía.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
