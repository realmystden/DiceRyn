"use client"

import { motion } from "framer-motion"
import type { CompletedProject } from "@/lib/services/achievements-service"

interface CompletedProjectsListProps {
  projects: CompletedProject[]
}

export function CompletedProjectsList({ projects }: CompletedProjectsListProps) {
  const levelColors = {
    Student: "bg-green-900/30 border-green-500",
    Trainee: "bg-blue-900/30 border-blue-500",
    Junior: "bg-indigo-900/30 border-indigo-500",
    Senior: "bg-purple-900/30 border-purple-500",
    Master: "bg-amber-900/30 border-amber-500",
  }

  const levelTextColors = {
    Student: "text-green-400",
    Trainee: "text-blue-400",
    Junior: "text-indigo-400",
    Senior: "text-purple-400",
    Master: "text-amber-400",
  }

  return (
    <div className="space-y-4">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`fantasy-card ${levelColors[project.level]} p-4 border-l-4`}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-cinzel text-white">{project.title}</h3>
              <span
                className={`text-xs ${levelTextColors[project.level]} px-2 py-1 rounded-full bg-gray-800/50 font-fondamento`}
              >
                {project.level}
              </span>
            </div>
            <p className="text-sm text-gray-300 mt-1 font-fondamento">{project.description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-gray-800/70 text-blue-300 px-2 py-1 rounded-full font-fondamento"
                >
                  {tech}
                </span>
              ))}
              {project.frameworks.map((framework) => (
                <span
                  key={framework}
                  className="text-xs bg-gray-800/70 text-purple-300 px-2 py-1 rounded-full font-fondamento"
                >
                  {framework}
                </span>
              ))}
              {project.databases.map((db) => (
                <span key={db} className="text-xs bg-gray-800/70 text-green-300 px-2 py-1 rounded-full font-fondamento">
                  {db}
                </span>
              ))}
            </div>

            <div className="mt-2 text-right">
              <span className="text-xs text-gray-400 font-fondamento">
                Completado el {new Date(project.completedAt).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-400 py-4 font-fondamento">
          No has completado ningún proyecto todavía. ¡Comienza a trabajar en proyectos para registrar tu progreso!
        </p>
      )}
    </div>
  )
}
