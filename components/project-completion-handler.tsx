"use client"

import { useState, useCallback } from "react"
import { AlertCircle, Trophy, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth/auth-provider"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

type ProjectCompletionHandlerProps = {
  project: {
    id: number
    title: string
    level: string
    technologies?: string[]
    frameworks?: string[]
    databases?: string[]
  }
}

export function ProjectCompletionHandler({ project }: ProjectCompletionHandlerProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newAchievements, setNewAchievements] = useState<any[]>([])
  const { user } = useAuth()
  const router = useRouter()

  const handleMarkCompleted = useCallback(async () => {
    if (!user) {
      toast({
        title: "Iniciar sesión requerido",
        description: "Debes iniciar sesión para marcar un proyecto como completado",
        variant: "destructive",
      })
      router.push("/auth/login?redirect=" + encodeURIComponent(window.location.pathname))
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: project.id,
          title: project.title,
          level: project.level,
          technologies: project.technologies || [],
          frameworks: project.frameworks || [],
          databases: project.databases || [],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || errorData.details || "Error al marcar el proyecto como completado")
      }

      const data = await response.json()

      // Successfully completed project
      setIsCompleted(true)

      // Show toast notification
      toast({
        title: "¡Proyecto completado!",
        description: `Has marcado "${project.title}" como completado.`,
      })

      // Set any newly unlocked achievements
      if (data.achievements && data.achievements.length > 0) {
        setNewAchievements(data.achievements)
      }

      // Trigger statistics update
      try {
        await fetch("/api/statistics/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        // Force router refresh to update the UI if we're on the statistics page
        router.refresh()
      } catch (statsError) {
        console.error("Error refreshing statistics:", statsError)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Error desconocido",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [project, user, router])

  const handleDismiss = () => {
    setIsCompleted(false)
    setNewAchievements([])
  }

  if (!user) {
    return (
      <Card className="bg-gray-800/50 border-amber-700 my-4">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="mr-3 text-amber-400">
              <AlertCircle size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-fondamento text-amber-100">
                Inicia sesión para marcar este proyecto como completado y desbloquear logros.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/20"
              onClick={() => router.push("/auth/login?redirect=" + encodeURIComponent(window.location.pathname))}
            >
              Iniciar sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isCompleted) {
    return (
      <Card className="bg-green-900/30 border-green-700 my-4">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="mr-3 text-green-400">
              <Trophy size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-fondamento text-green-100">
                ¡Has marcado este proyecto como completado!
                {newAchievements.length > 0 && " ¡Has desbloqueado nuevos logros! Visita tu perfil para verlos."}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-green-400 hover:text-green-300 hover:bg-green-900/20"
              onClick={handleDismiss}
            >
              <X size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800/50 border-purple-700 my-4">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-sm font-fondamento text-gray-300">
              ¿Has completado este proyecto? ¡Márcalo para mantener un registro y desbloquear logros!
            </p>
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-purple-400 border-purple-700 hover:text-purple-300 hover:bg-purple-900/20"
            onClick={handleMarkCompleted}
            disabled={isLoading}
          >
            {isLoading ? "Marcando..." : "Marcar como completado"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
