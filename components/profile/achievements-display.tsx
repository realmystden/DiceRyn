"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { achievementService, type Achievement } from "@/lib/services/achievement-service"

export function AchievementsDisplay() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    async function fetchAchievements() {
      setLoading(true)
      try {
        const { achievements, error } = await achievementService.getUserAchievements()
        if (error) throw error
        setAchievements(achievements)
      } catch (err) {
        console.error("Error fetching achievements:", err)
        setError("Failed to load achievements. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        <span className="ml-2 text-white font-fondamento">Cargando logros...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400 font-fondamento">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md text-white"
        >
          Reintentar
        </button>
      </div>
    )
  }

  // Filter achievements based on selected filter
  const filteredAchievements = achievements.filter((achievement) => {
    if (filter === "all") return true
    if (filter === "completed") return achievement.completed
    if (filter === "incomplete") return !achievement.completed
    return achievement.level === filter || achievement.category === filter
  })

  // Group achievements by level for statistics
  const achievementsByLevel = achievements.reduce(
    (acc, achievement) => {
      const level = achievement.level
      if (!acc[level]) {
        acc[level] = { total: 0, completed: 0 }
      }
      acc[level].total++
      if (achievement.completed) {
        acc[level].completed++
      }
      return acc
    },
    {} as Record<string, { total: number; completed: number }>,
  )

  // Calculate overall completion percentage
  const totalAchievements = achievements.length
  const completedAchievements = achievements.filter((a) => a.completed).length
  const completionPercentage = totalAchievements > 0 ? Math.round((completedAchievements / totalAchievements) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="fantasy-card p-4 bg-gray-800/50 border-gray-700">
        <h2 className="text-xl font-cinzel font-bold text-white mb-4">Progreso de Logros</h2>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span className="font-fondamento">Progreso Total</span>
            <span className="font-fondamento">
              {completedAchievements} / {totalAchievements} ({completionPercentage}%)
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(achievementsByLevel).map(([level, stats]) => {
            const levelPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

            let levelColor = "bg-gray-600"
            if (level === "Student") levelColor = "bg-green-600"
            if (level === "Trainee") levelColor = "bg-blue-600"
            if (level === "Junior") levelColor = "bg-indigo-600"
            if (level === "Senior") levelColor = "bg-purple-600"
            if (level === "Master") levelColor = "bg-amber-600"

            return (
              <div key={level} className="text-center">
                <div className="text-sm text-gray-300 mb-1 font-fondamento">{level}</div>
                <div className="flex justify-center mb-1">
                  <Badge className={levelColor}>
                    {stats.completed} / {stats.total}
                  </Badge>
                </div>
                <Progress value={levelPercentage} className="h-1.5" indicatorClassName={levelColor} />
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4">
            <TabsTrigger value="all" className="font-fondamento">
              Todos
            </TabsTrigger>
            <TabsTrigger value="completed" className="font-fondamento">
              Completados
            </TabsTrigger>
            <TabsTrigger value="incomplete" className="font-fondamento">
              Pendientes
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map((achievement) => {
              // Determine card styling based on level and completion status
              let cardStyle = "bg-gray-800/50 border-gray-700"
              let levelBadgeStyle = "bg-gray-700 text-gray-300"

              if (achievement.completed) {
                if (achievement.level === "Student") cardStyle = "bg-green-900/30 border-green-700"
                if (achievement.level === "Trainee") cardStyle = "bg-blue-900/30 border-blue-700"
                if (achievement.level === "Junior") cardStyle = "bg-indigo-900/30 border-indigo-700"
                if (achievement.level === "Senior") cardStyle = "bg-purple-900/30 border-purple-700"
                if (achievement.level === "Master") cardStyle = "bg-amber-900/30 border-amber-700"
              }

              if (achievement.level === "Student") levelBadgeStyle = "bg-green-800 text-green-200"
              if (achievement.level === "Trainee") levelBadgeStyle = "bg-blue-800 text-blue-200"
              if (achievement.level === "Junior") levelBadgeStyle = "bg-indigo-800 text-indigo-200"
              if (achievement.level === "Senior") levelBadgeStyle = "bg-purple-800 text-purple-200"
              if (achievement.level === "Master") levelBadgeStyle = "bg-amber-800 text-amber-200"

              return (
                <Card
                  key={achievement.id}
                  className={`fantasy-card ${cardStyle} ${!achievement.completed && "opacity-80"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`text-2xl ${!achievement.completed && "grayscale opacity-70"}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-cinzel font-bold text-white">{achievement.title}</h3>
                        <p className="text-sm text-gray-300 font-fondamento">{achievement.description}</p>

                        <div className="mt-3 flex justify-between items-center">
                          <Badge className={levelBadgeStyle}>{achievement.level}</Badge>
                          <Badge
                            className={`${achievement.completed ? "bg-green-700 text-green-100" : "bg-gray-700 text-gray-300"}`}
                          >
                            {achievement.completed ? "Completado" : "Pendiente"}
                          </Badge>
                        </div>

                        {achievement.badge_id && (
                          <div className="mt-2 text-xs text-purple-300">
                            <span className="mr-1">🏅</span>
                            Otorga una insignia
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <div className="col-span-2 text-center py-10 text-gray-400 font-fondamento">
              No se encontraron logros con el filtro seleccionado.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
