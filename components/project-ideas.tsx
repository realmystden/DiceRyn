"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useProjectIdeasStore } from "@/lib/store"
import { getAllProjectIdeas } from "@/lib/project-ideas"
import { Button } from "@/components/ui/button"

interface ProjectIdeasProps {
  selectedIdeaOverride?: number | null
}

export function ProjectIdeas({ selectedIdeaOverride }: ProjectIdeasProps) {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const {
    selectedIdea: storeSelectedIdea,
    setSelectedIdea,
    appTypeFilter,
    languageFilter,
    frameworkFilter,
    databaseFilter,
    nivelFilter,
    markProjectAsCompleted,
    isProjectCompleted,
    easterEggActivated,
  } = useProjectIdeasStore()

  // Usar el override si está disponible, de lo contrario usar el valor del store
  const selectedIdea = selectedIdeaOverride !== undefined ? selectedIdeaOverride : storeSelectedIdea

  useEffect(() => {
    setMounted(true)
  }, [])

  // Cuando cambia la idea seleccionada, hacerla visible
  useEffect(() => {
    if (selectedIdea !== null) {
      setIsVisible(true)
    }
  }, [selectedIdea])

  const handleReset = () => {
    setIsVisible(false)
    setTimeout(() => {
      if (selectedIdeaOverride !== undefined) {
        // Si estamos usando un override, notificar al componente padre
        // Este es un placeholder - el componente padre debe manejar esto
      } else {
        // Si estamos usando el store, resetear el store
        setSelectedIdea(null)
      }
    }, 300)
  }

  const handleMarkAsCompleted = (id: number) => {
    markProjectAsCompleted(id)
  }

  if (!mounted) return null

  // Si no hay idea seleccionada, no mostrar nada
  if (selectedIdea === null) {
    return null
  }

  const allIdeas = getAllProjectIdeas(easterEggActivated)

  // Asegurar que el índice de la idea seleccionada es válido
  const ideaIndex = selectedIdea !== null ? selectedIdea - 1 : 0
  const idea =
    ideaIndex >= 0 && ideaIndex < allIdeas.length
      ? allIdeas[ideaIndex]
      : {
          titulo: "Idea no encontrada",
          descripcion: "Lo sentimos, no pudimos encontrar esta idea. Por favor, intenta lanzar el dado nuevamente.",
          categoria: "Error",
          tecnologias: ["N/A"],
          frameworks: [],
          basesdedatos: [],
          nivel: "Trainee" as const,
          tipo: "Aplicación Web" as const,
          caracteristicas: ["No disponible"],
        }

  // Verificar si el proyecto está completado
  const completed = isProjectCompleted(selectedIdea)

  // Función para determinar si una tecnología debe resaltarse
  const shouldHighlightTech = (tech: string) => {
    if (languageFilter) {
      return tech === languageFilter
    }
    return false
  }

  // Función para determinar si un framework debe resaltarse
  const shouldHighlightFramework = (framework: string) => {
    if (frameworkFilter) {
      return framework === frameworkFilter
    }
    return false
  }

  // Función para determinar si una base de datos debe resaltarse
  const shouldHighlightDatabase = (database: string) => {
    if (databaseFilter) {
      return database === databaseFilter
    }
    return false
  }

  // Función para determinar si el tipo de aplicación debe resaltarse
  const shouldHighlightType = (type: string) => {
    if (appTypeFilter) {
      return type === appTypeFilter
    }
    return false
  }

  // Función para determinar si el nivel debe resaltarse
  const shouldHighlightNivel = (nivel: string) => {
    if (nivelFilter) {
      return nivel === nivelFilter
    }
    return false
  }

  // Obtener el color de fondo para el nivel
  const getNivelBadgeColor = (nivel: string) => {
    if (shouldHighlightNivel(nivel)) {
      return "bg-gray-300 text-gray-900 font-bold"
    }

    switch (nivel) {
      case "Student":
        return "bg-green-400/70 text-white"
      case "Trainee":
        return "bg-green-600/70 text-white"
      case "Junior":
        return "bg-blue-600/70 text-white"
      case "Senior":
        return "bg-purple-600/70 text-white"
      default:
        return "bg-gray-600/70 text-white"
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl fantasy-card p-6 shadow-xl bg-[#121214] border border-gray-700"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-cinzel font-bold text-white">Idea #{selectedIdea}</h2>
            <div className="flex gap-2">
              <span className="bg-purple-600/70 text-white px-3 py-1 rounded-full text-sm font-fondamento">
                {idea.categoria || "General"}
              </span>
              <span
                className={`${
                  shouldHighlightType(idea.tipo) ? "bg-gray-300 text-gray-900 font-bold" : "bg-indigo-600/70 text-white"
                } px-3 py-1 rounded-full text-sm font-fondamento transition-colors duration-300`}
              >
                {idea.tipo || "General"}
              </span>
              <span
                className={`${getNivelBadgeColor(
                  idea.nivel,
                )} px-3 py-1 rounded-full text-sm font-fondamento transition-colors duration-300`}
              >
                {idea.nivel}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-cinzel font-semibold mb-2 text-white">{idea.titulo}</h3>
          <p className="mb-4 font-fondamento text-white">{idea.descripcion}</p>

          <div className="mb-4">
            <h4 className="text-sm font-cinzel mb-2 text-white">Tecnologías:</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {idea.tecnologias.map((tech, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-xs font-fondamento transition-all duration-300 ${
                    shouldHighlightTech(tech)
                      ? "bg-gray-300 text-gray-900 font-bold scale-110"
                      : "bg-indigo-800/50 text-white"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {idea.frameworks && idea.frameworks.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-cinzel mb-2 text-white">Frameworks:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {idea.frameworks.map((framework, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-xs font-fondamento transition-all duration-300 ${
                      shouldHighlightFramework(framework)
                        ? "bg-gray-300 text-gray-900 font-bold scale-110"
                        : "bg-blue-800/50 text-white"
                    }`}
                  >
                    {framework}
                  </span>
                ))}
              </div>
            </div>
          )}

          {idea.basesdedatos && idea.basesdedatos.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-cinzel mb-2 text-white">Bases de Datos:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {idea.basesdedatos.map((database, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-xs font-fondamento transition-all duration-300 ${
                      shouldHighlightDatabase(database)
                        ? "bg-gray-300 text-gray-900 font-bold scale-110"
                        : "bg-green-800/50 text-white"
                    }`}
                  >
                    {database}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              onClick={() => handleMarkAsCompleted(selectedIdea)}
              variant="outline"
              className={`fantasy-button ${
                completed
                  ? "bg-green-700/50 border-green-500 hover:bg-green-700"
                  : "border-purple-600 hover:bg-purple-700"
              } text-white`}
              disabled={completed}
            >
              <span className="font-fondamento">{completed ? "✓ Completado" : "Marcar como completado"}</span>
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              className="fantasy-button border-gray-600 hover:bg-gray-700 text-white"
            >
              <span className="font-fondamento">Lanzar de nuevo</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
