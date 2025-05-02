"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useProjectIdeasStore, type AchievementLevel } from "@/lib/store"

export function AchievementsList() {
  const [filter, setFilter] = useState<AchievementLevel | "all">("all")
  const { achievements } = useProjectIdeasStore()

  // Filtrar logros por nivel y estado de desbloqueo
  const filteredAchievements = achievements.filter((achievement) => filter === "all" || achievement.level === filter)

  // Ordenar logros: primero los desbloqueados, luego por nivel
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
        <button
          onClick={() => setFilter("Master")}
          className={`px-3 py-1 rounded-full text-sm font-fondamento transition-colors ${
            filter === "Master" ? "bg-amber-500 text-white" : "bg-amber-900/30 text-amber-300 hover:bg-amber-800/50"
          }`}
        >
          Master
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedAchievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 border rounded-lg ${
              achievement.completed ? levelColors[achievement.level] : "bg-gray-800/50 border-gray-700 opacity-60"
            }`}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{achievement.icon}</span>
              <div>
                <h3 className="font-cinzel font-bold text-white">{achievement.title}</h3>
                <p className="text-sm text-gray-300 font-fondamento">{achievement.description}</p>
              </div>
            </div>
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
        ))}
      </div>
    </div>
  )
}
