"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useProjectIdeasStore, type AchievementLevel } from "@/lib/store"
import { Progress } from "@/components/ui/progress"

export function AchievementsList() {
  const [filter, setFilter] = useState<AchievementLevel | "all">("all")
  const [mounted, setMounted] = useState(false)
  const {
    achievements,
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
    easterEggActivated,
    checkAndUnlockAchievements,
  } = useProjectIdeasStore()

  useEffect(() => {
    setMounted(true)
    // Check for achievements that might be unlocked
    checkAndUnlockAchievements()
  }, [checkAndUnlockAchievements])

  // Filter achievements by level and unlock status
  const filteredAchievements = achievements.filter((achievement) => {
    // Only show Master level achievements if Easter egg is activated
    if (achievement.level === "Master" && !easterEggActivated) {
      return false
    }

    // Filter by selected level
    return filter === "all" || achievement.level === filter
  })

  // Sort achievements: first unlocked, then by level
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? -1 : 1
    }

    const levelOrder: Record<AchievementLevel, number> = {
      Student: 1,
      Trainee: 2,
      Junior: 3,
      Senior: 4,
      Master: 5,
    }

    return levelOrder[a.level] - levelOrder[b.level]
  })

  const levelColors: Record<AchievementLevel, string> = {
    Student: "bg-green-900/30 border-green-500",
    Trainee: "bg-blue-900/30 border-blue-500",
    Junior: "bg-indigo-900/30 border-indigo-500",
    Senior: "bg-purple-900/30 border-purple-500",
    Master: "bg-amber-900/30 border-amber-500",
  }

  // Calculate progress for an achievement
  const calculateProgress = (achievement: (typeof achievements)[0]): number => {
    if (achievement.completed) return 100

    let current = 0
    let required = 1 // Default to avoid division by zero

    if (achievement.requiredProjects) {
      current = getTotalCompletedProjects()
      required = achievement.requiredProjects
    } else if (achievement.requiredLanguages && achievement.requiredLanguages.length > 0) {
      current = Math.max(...achievement.requiredLanguages.map((lang) => getCompletedProjectsByLanguage(lang)))
      required =
        achievement.id.includes("master") ||
        achievement.id.includes("ninja") ||
        achievement.id.includes("wizard") ||
        achievement.id.includes("guru")
          ? 10
          : 5
    } else if (achievement.requiredFrameworks && achievement.requiredFrameworks.length > 0) {
      current = Math.max(
        ...achievement.requiredFrameworks.map((framework) => getCompletedProjectsByFramework(framework)),
      )
      required =
        achievement.id.includes("architect") || achievement.id.includes("master") || achievement.id.includes("expert")
          ? 10
          : 5
    } else if (achievement.requiredDatabases && achievement.requiredDatabases.length > 0) {
      current = Math.max(...achievement.requiredDatabases.map((db) => getCompletedProjectsByDatabase(db)))
      required = achievement.id.includes("architect") || achievement.id.includes("master") ? 10 : 5
    } else if (achievement.requiredAppTypes && achievement.requiredAppTypes.length > 0) {
      current = Math.max(...achievement.requiredAppTypes.map((type) => getCompletedProjectsByAppType(type)))
      required = achievement.id.includes("architect") || achievement.id.includes("researcher") ? 10 : 5
    } else if (achievement.requiredLevelProjects) {
      current = getCompletedProjectsByLevel(achievement.requiredLevelProjects.level)
      required = achievement.requiredLevelProjects.count
    } else if (achievement.requiredConsistency) {
      const { type, count } = achievement.requiredConsistency

      switch (type) {
        case "streak":
          current = getConsecutiveDaysStreak()
          required = count
          break
        case "weekly":
          current = getWeeklyCompletionCount(achievement.requiredConsistency.period || 1)
          required = count
          break
        case "monthly":
          current = getMonthlyCompletionCount(achievement.requiredConsistency.period || 1)
          required = count
          break
        case "sameDay":
          current = getProjectsCompletedSameDay()
          required = count
          break
        case "timeOfDay":
          if (achievement.requiredConsistency.timeRange) {
            current = getProjectsByTimeOfDay(achievement.requiredConsistency.timeRange)
            required = count
          }
          break
        case "dayOfWeek":
          if (achievement.requiredConsistency.dayType) {
            current = getProjectsByDayType(achievement.requiredConsistency.dayType)
            required = count
          }
          break
      }
    }

    return Math.min(Math.floor((current / required) * 100), 99) // Cap at 99% if not completed
  }

  if (!mounted) return null

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-full text-sm font-fondamento transition-colors ${
            filter === "all" ? "bg-white text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("Student")}
          className={`px-3 py-1 rounded-full text-sm font-fondamento transition-colors ${
            filter === "Student" ? "bg-green-500 text-white" : "bg-green-900/30 text-green-300 hover:bg-green-800/50"
          }`}
        >
          Student
        </button>
        <button
          onClick={() => setFilter("Trainee")}
          className={`px-3 py-1 rounded-full text-sm font-fondamento transition-colors ${
            filter === "Trainee" ? "bg-blue-500 text-white" : "bg-blue-900/30 text-blue-300 hover:bg-blue-800/50"
          }`}
        >
          Trainee
        </button>
        <button
          onClick={() => setFilter("Junior")}
          className={`px-3 py-1 rounded-full text-sm font-fondamento transition-colors ${
            filter === "Junior" ? "bg-indigo-500 text-white" : "bg-indigo-900/30 text-indigo-300 hover:bg-indigo-800/50"
          }`}
        >
          Junior
        </button>
        <button
          onClick={() => setFilter("Senior")}
          className={`px-3 py-1 rounded-full text-sm font-fondamento transition-colors ${
            filter === "Senior" ? "bg-purple-500 text-white" : "bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
          }`}
        >
          Senior
        </button>
        {easterEggActivated && (
          <button
            onClick={() => setFilter("Master")}
            className={`px-3 py-1 rounded-full text-sm font-fondamento transition-colors ${
              filter === "Master" ? "bg-amber-500 text-white" : "bg-amber-900/30 text-amber-300 hover:bg-amber-800/50"
            }`}
          >
            Master
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedAchievements.map((achievement) => {
          const progress = calculateProgress(achievement)

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-4 border rounded-lg ${
                achievement.completed ? levelColors[achievement.level] : "bg-gray-800/50 border-gray-700"
              } ${!achievement.completed && "opacity-80 hover:opacity-100 transition-opacity"}`}
            >
              <div className="flex items-center mb-2">
                <span className={`text-2xl mr-2 ${achievement.completed ? "" : "grayscale opacity-70"}`}>
                  {achievement.icon}
                </span>
                <div>
                  <h3 className="font-cinzel font-bold text-white">{achievement.title}</h3>
                  <p className="text-sm text-gray-300 font-fondamento">{achievement.description}</p>
                </div>
              </div>

              {!achievement.completed && (
                <div className="mt-2 mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progreso</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress
                    value={progress}
                    className="h-2"
                    indicatorClassName={`
                      ${achievement.level === "Student" ? "bg-green-500" : ""}
                      ${achievement.level === "Trainee" ? "bg-blue-500" : ""}
                      ${achievement.level === "Junior" ? "bg-indigo-500" : ""}
                      ${achievement.level === "Senior" ? "bg-purple-500" : ""}
                      ${achievement.level === "Master" ? "bg-amber-500" : ""}
                    `}
                  />
                </div>
              )}

              <div className="flex justify-between items-center">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    achievement.completed ? "bg-white/20 text-white" : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {achievement.level}
                </span>
                {achievement.completed ? (
                  <span className="text-green-400 text-sm">Desbloqueado</span>
                ) : (
                  <span className="text-gray-500 text-sm">Bloqueado</span>
                )}
              </div>
            </motion.div>
          )
        })}

        {sortedAchievements.length === 0 && (
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-400 font-fondamento">No hay logros disponibles para los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </div>
  )
}
