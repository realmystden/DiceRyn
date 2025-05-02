"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useProjectIdeasStore } from "@/lib/store"

export function CompletedProjectsList() {
  const [filter, setFilter] = useState<string | null>(null)
  const { completedProjects, unmarkProjectAsCompleted } = useProjectIdeasStore()

  // Filtrar proyectos por nivel
  const filteredProjects = filter ? completedProjects.filter((project) => project.level === filter) : completedProjects

  // Ordenar proyectos por fecha de completado (más recientes primero)
  const sortedProjects = [...filteredProjects].sort((a, b) => b.completedAt - a.completedAt)

  const levelColors: Record<string, string> = {
    Student: "bg-green-900/30 border-green-500",
    Trainee: "bg-blue-900/30 border-blue-500",
    Junior: "bg-indigo-900/30 border-indigo-500",
    Senior: "bg-purple-900/30 border-purple-500",
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString()
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1 rounded-full text-sm font-fondamento transition-colors ${
            filter === null ? "bg-white text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
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
      </div>

      {sortedProjects.length === 0 ? (
        <div className="text-center py-8 text-gray-400 font-fondamento">
          No has completado ningún proyecto aún. ¡Comienza a marcar proyectos como completados!
        </div>
      ) : (
        <div className="space-y-4">
          {sortedProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-4 border rounded-lg ${levelColors[project.level]}`}
            >
              <div className="flex justify-between">
                <h3 className="font-cinzel font-bold text-white">{project.title}</h3>
                <button
                  onClick={() => unmarkProjectAsCompleted(project.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Eliminar
                </button>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-3">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    project.level === "Student"
                      ? "bg-green-800/50 text-green-300"
                      : project.level === "Trainee"
                        ? "bg-blue-800/50 text-blue-300"
                        : project.level === "Junior"
                          ? "bg-indigo-800/50 text-indigo-300"
                          : "bg-purple-800/50 text-purple-300"
                  }`}
                >
                  {project.level}
                </span>
                <span className="text-gray-400 text-xs">Completado el {formatDate(project.completedAt)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
