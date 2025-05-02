"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface Achievement {
  id: string
  achievement_id: string
  progress: number
  completed_at: string | null
  title: string
  description: string
  category: string
  max_progress: number
}

export function AchievementsList({ userId }: { userId: string }) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const supabase = getSupabaseClient()

  useEffect(() => {
    const fetchAchievements = async () => {
      setIsLoading(true)
      try {
        // This is a placeholder - in a real app, you'd have an achievements table
        // with titles, descriptions, etc. This is simulating that data.
        const { data, error } = await supabase.from("user_achievements").select("*").eq("user_id", userId)

        if (error) throw error

        // Map the achievements with mock data (in a real app, you'd join with an achievements table)
        const achievementData = data.map((item) => ({
          ...item,
          title: getAchievementTitle(item.achievement_id),
          description: getAchievementDescription(item.achievement_id),
          category: getAchievementCategory(item.achievement_id),
          max_progress: getAchievementMaxProgress(item.achievement_id),
        }))

        setAchievements(achievementData)
      } catch (error) {
        console.error("Error fetching achievements:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchAchievements()
    }
  }, [userId, supabase])

  // These functions would normally fetch from a database
  // They're placeholders for demonstration purposes
  const getAchievementTitle = (id: string) => {
    const titles: Record<string, string> = {
      "first-project": "Primer Proyecto",
      "five-projects": "Cinco Proyectos",
      "ten-projects": "Diez Proyectos",
      "first-badge": "Primera Insignia",
      "profile-complete": "Perfil Completo",
      "daily-streak-7": "Racha de 7 Días",
    }
    return titles[id] || "Logro Desconocido"
  }

  const getAchievementDescription = (id: string) => {
    const descriptions: Record<string, string> = {
      "first-project": "Completaste tu primer proyecto",
      "five-projects": "Completaste cinco proyectos",
      "ten-projects": "Completaste diez proyectos",
      "first-badge": "Obtuviste tu primera insignia",
      "profile-complete": "Completaste toda la información de tu perfil",
      "daily-streak-7": "Visitaste la aplicación durante 7 días consecutivos",
    }
    return descriptions[id] || "Descripción no disponible"
  }

  const getAchievementCategory = (id: string) => {
    const categories: Record<string, string> = {
      "first-project": "Proyectos",
      "five-projects": "Proyectos",
      "ten-projects": "Proyectos",
      "first-badge": "Insignias",
      "profile-complete": "Perfil",
      "daily-streak-7": "Actividad",
    }
    return categories[id] || "General"
  }

  const getAchievementMaxProgress = (id: string) => {
    const maxProgress: Record<string, number> = {
      "first-project": 1,
      "five-projects": 5,
      "ten-projects": 10,
      "first-badge": 1,
      "profile-complete": 1,
      "daily-streak-7": 7,
    }
    return maxProgress[id] || 1
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (achievements.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">No hay logros disponibles todavía.</p>
        </CardContent>
      </Card>
    )
  }

  // Group achievements by category
  const achievementsByCategory = achievements.reduce(
    (acc, achievement) => {
      if (!acc[achievement.category]) {
        acc[achievement.category] = []
      }
      acc[achievement.category].push(achievement)
      return acc
    },
    {} as Record<string, Achievement[]>,
  )

  return (
    <div className="space-y-6">
      {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
        <div key={category} className="space-y-3">
          <h3 className="font-medium text-lg">{category}</h3>
          <div className="space-y-3">
            {categoryAchievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">{achievement.title}</CardTitle>
                    {achievement.completed_at && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Completado
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progreso</span>
                      <span>
                        {achievement.progress} / {achievement.max_progress}
                      </span>
                    </div>
                    <Progress
                      value={(achievement.progress / achievement.max_progress) * 100}
                      className={achievement.completed_at ? "bg-green-100" : ""}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
