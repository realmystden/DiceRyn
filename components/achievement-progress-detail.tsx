"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { InfoIcon } from "lucide-react"
import { useProjectIdeasStore } from "@/lib/store"

interface AchievementProgressDetailProps {
  achievement: any // Using any here to match the existing code structure
}

export function AchievementProgressDetail({ achievement }: AchievementProgressDetailProps) {
  const [open, setOpen] = useState(false)
  const {
    getCompletedProjectsByLevel,
    getCompletedProjectsByLanguage,
    getCompletedProjectsByFramework,
    getCompletedProjectsByDatabase,
    getCompletedProjectsByAppType,
    getTotalCompletedProjects,
    getConsecutiveDaysStreak,
    getWeeklyCompletionCount,
    getMonthlyCompletionCount,
    getProjectsCompletedSameDay,
    getProjectsByTimeOfDay,
    getProjectsByDayType,
  } = useProjectIdeasStore()

  // Determine progress color based on achievement level
  let progressColor = "bg-gray-600"
  if (achievement.level === "Student") progressColor = "bg-green-500"
  if (achievement.level === "Trainee") progressColor = "bg-blue-500"
  if (achievement.level === "Junior") progressColor = "bg-indigo-500"
  if (achievement.level === "Senior") progressColor = "bg-purple-500"
  if (achievement.level === "Master") progressColor = "bg-amber-500"

  // Get detailed progress information
  const getDetailedProgress = () => {
    if (achievement.requiredProjects) {
      const current = getTotalCompletedProjects()
      const required = achievement.requiredProjects
      return [
        {
          label: "Proyectos completados",
          current,
          required,
          progress: Math.min(Math.floor((current / required) * 100), 100),
        },
      ]
    }

    if (achievement.requiredLanguages && achievement.requiredLanguages.length > 0) {
      return achievement.requiredLanguages.map((lang: string) => {
        const current = getCompletedProjectsByLanguage(lang)
        const required =
          achievement.id.includes("master") ||
          achievement.id.includes("ninja") ||
          achievement.id.includes("wizard") ||
          achievement.id.includes("guru")
            ? 10
            : 5
        return {
          label: `Proyectos en ${lang}`,
          current,
          required,
          progress: Math.min(Math.floor((current / required) * 100), 100),
        }
      })
    }

    if (achievement.requiredFrameworks && achievement.requiredFrameworks.length > 0) {
      return achievement.requiredFrameworks.map((framework: string) => {
        const current = getCompletedProjectsByFramework(framework)
        const required =
          achievement.id.includes("architect") || achievement.id.includes("master") || achievement.id.includes("expert")
            ? 10
            : 5
        return {
          label: `Proyectos con ${framework}`,
          current,
          required,
          progress: Math.min(Math.floor((current / required) * 100), 100),
        }
      })
    }

    if (achievement.requiredDatabases && achievement.requiredDatabases.length > 0) {
      return achievement.requiredDatabases.map((db: string) => {
        const current = getCompletedProjectsByDatabase(db)
        const required = achievement.id.includes("architect") || achievement.id.includes("master") ? 10 : 5
        return {
          label: `Proyectos con ${db}`,
          current,
          required,
          progress: Math.min(Math.floor((current / required) * 100), 100),
        }
      })
    }

    if (achievement.requiredAppTypes && achievement.requiredAppTypes.length > 0) {
      return achievement.requiredAppTypes.map((type: string) => {
        const current = getCompletedProjectsByAppType(type)
        const required = achievement.id.includes("architect") || achievement.id.includes("researcher") ? 10 : 5
        return {
          label: `Proyectos de tipo ${type}`,
          current,
          required,
          progress: Math.min(Math.floor((current / required) * 100), 100),
        }
      })
    }

    if (achievement.requiredLevelProjects) {
      const current = getCompletedProjectsByLevel(achievement.requiredLevelProjects.level)
      const required = achievement.requiredLevelProjects.count
      return [
        {
          label: `Proyectos de nivel ${achievement.requiredLevelProjects.level}`,
          current,
          required,
          progress: Math.min(Math.floor((current / required) * 100), 100),
        },
      ]
    }

    if (achievement.requiredConsistency) {
      const { type, count } = achievement.requiredConsistency
      let current = 0
      let label = ""

      switch (type) {
        case "streak":
          current = getConsecutiveDaysStreak()
          label = "Días consecutivos"
          break
        case "weekly":
          current = getWeeklyCompletionCount(achievement.requiredConsistency.period || 1)
          label = "Proyectos esta semana"
          break
        case "monthly":
          current = getMonthlyCompletionCount(achievement.requiredConsistency.period || 1)
          label = "Proyectos este mes"
          break
        case "sameDay":
          current = getProjectsCompletedSameDay()
          label = "Proyectos en un mismo día"
          break
        case "timeOfDay":
          if (achievement.requiredConsistency.timeRange) {
            current = getProjectsByTimeOfDay(achievement.requiredConsistency.timeRange)
            label = `Proyectos en horario ${achievement.requiredConsistency.timeRange}`
          }
          break
        case "dayOfWeek":
          if (achievement.requiredConsistency.dayType) {
            current = getProjectsByDayType(achievement.requiredConsistency.dayType)
            label = `Proyectos en ${achievement.requiredConsistency.dayType === "weekday" ? "días laborables" : "fin de semana"}`
          }
          break
      }

      return [
        {
          label,
          current,
          required: count,
          progress: Math.min(Math.floor((current / count) * 100), 100),
        },
      ]
    }

    return []
  }

  const detailedProgress = getDetailedProgress()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-gray-400 hover:text-white transition-colors" aria-label="Ver detalles de progreso">
          <InfoIcon className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-white">Detalles de Progreso</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{achievement.icon}</span>
            <h3 className="font-cinzel text-white">{achievement.title}</h3>
          </div>
          <p className="text-sm text-gray-300 font-fondamento">{achievement.description}</p>

          <div className="space-y-3 mt-4">
            {detailedProgress.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span className="font-fondamento">{item.label}</span>
                  <span className="font-fondamento">
                    {item.current} / {item.required}
                  </span>
                </div>
                <Progress value={item.progress} className="h-2" indicatorClassName={progressColor} />
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-400 mt-2 font-fondamento">
            {detailedProgress.length === 0 ? (
              <p>No hay información detallada disponible para este logro.</p>
            ) : (
              <p>Completa los requisitos para desbloquear este logro.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
