"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projectIdeas } from "@/lib/project-ideas"
import { useProjectIdeasStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

export function ProjectIdeas() {
  const {
    selectedIdea,
    setSelectedIdea,
    appTypeFilter,
    languageFilter,
    frameworkFilter,
    databaseFilter,
    nivelFilter,
    sortOption,
  } = useProjectIdeasStore()

  const [isVisible, setIsVisible] = useState(false)
  const [filteredIdeas, setFilteredIdeas] = useState(projectIdeas)
  const [mounted, setMounted] = useState(false)

  // Marcar cuando el componente está montado
  useEffect(() => {
    setMounted(true)
  }, [])

  // Filtrar y ordenar ideas según los criterios seleccionados
  useEffect(() => {
    if (!mounted) return

    try {
      let result = [...projectIdeas]

      // Filtrar por tipo de aplicación
      if (appTypeFilter) {
        result = result.filter((idea) => idea.tipo === appTypeFilter)
      }

      // Filtrar por lenguaje de programación
      if (languageFilter) {
        result = result.filter((idea) => idea.tecnologias.includes(languageFilter))
      }

      // Filtrar por framework
      if (frameworkFilter) {
        result = result.filter((idea) => idea.frameworks.includes(frameworkFilter))
      }

      // Filtrar por base de datos
      if (databaseFilter) {
        result = result.filter((idea) => idea.basesdedatos.includes(databaseFilter))
      }

      // Filtrar por nivel
      if (nivelFilter) {
        result = result.filter((idea) => idea.nivel === nivelFilter)
      }

      // Ordenar según la opción seleccionada
      if (sortOption === "category") {
        result.sort((a, b) => a.categoria.localeCompare(b.categoria))
      } else if (sortOption === "language") {
        result.sort((a, b) => a.tecnologias[0].localeCompare(b.tecnologias[0]))
      } else if (sortOption === "framework") {
        result.sort((a, b) => {
          const frameworkA = a.frameworks.length > 0 ? a.frameworks[0] : ""
          const frameworkB = b.frameworks.length > 0 ? b.frameworks[0] : ""
          return frameworkA.localeCompare(frameworkB)
        })
      } else if (sortOption === "database") {
        result.sort((a, b) => {
          const databaseA = a.basesdedatos.length > 0 ? a.basesdedatos[0] : ""
          const databaseB = b.basesdedatos.length > 0 ? b.basesdedatos[0] : ""
          return databaseA.localeCompare(databaseB)
        })
      } else if (sortOption === "nivel") {
        const nivelOrder = { Student: 0, Trainee: 1, Junior: 2, Senior: 3 }
        result.sort((a, b) => nivelOrder[a.nivel] - nivelOrder[b.nivel])
      }

      setFilteredIdeas(result)
    } catch (error) {
      console.error("Error al filtrar ideas:", error)
      setFilteredIdeas(projectIdeas)
    }
  }, [appTypeFilter, languageFilter, frameworkFilter, databaseFilter, nivelFilter, sortOption, mounted])

  useEffect(() => {
    if (selectedIdea !== null) {
      setIsVisible(true)
    }
  }, [selectedIdea])

  const handleReset = () => {
    setIsVisible(false)
    setTimeout(() => setSelectedIdea(null), 300)
  }

  if (!mounted) {
    return null
  }

  if (selectedIdea === null || !projectIdeas || projectIdeas.length === 0) {
    return null
  }

  // Asegurar que el índice de la idea seleccionada es válido
  const ideaIndex = selectedIdea !== null ? selectedIdea - 1 : 0
  const idea =
    ideaIndex >= 0 && ideaIndex < projectIdeas.length
      ? projectIdeas[ideaIndex]
      : {
          titulo: "Idea no encontrada",
          descripcion: "Lo sentimos, no pudimos encontrar esta idea. Por favor, intenta lanzar el dado nuevamente.",
          categoria: "Error",
          tecnologias: ["N/A"],
          frameworks: [],
          basesdedatos: [],
          nivel: "Trainee" as const,
          tipo: "Aplicación Web" as const,
        }

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
      return "bg-gold-light/70 text-black font-bold"
    }

    switch (nivel) {
      case "Student":
        return "bg-green-400/70"
      case "Trainee":
        return "bg-green-600/70"
      case "Junior":
        return "bg-blue-600/70"
      case "Senior":
        return "bg-purple-600/70"
      default:
        return "bg-gray-600/70"
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
          className="w-full max-w-2xl fantasy-card p-6 text-white shadow-xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-cinzel font-bold">Idea #{selectedIdea}</h2>
            <div className="flex gap-2">
              <span className="bg-purple-600/70 text-white px-3 py-1 rounded-full text-sm font-fondamento">
                {idea.categoria}
              </span>
              <span
                className={`${
                  shouldHighlightType(idea.tipo)
                    ? "bg-gold-light/70 text-black font-bold"
                    : "bg-indigo-600/70 text-white"
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

          <h3 className="text-xl font-cinzel font-semibold mb-2">{idea.titulo}</h3>
          <p className="text-white/90 mb-4 font-fondamento">{idea.descripcion}</p>

          <div className="mb-4">
            <h4 className="text-sm font-cinzel mb-2">Tecnologías:</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {idea.tecnologias.map((tech, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-xs font-fondamento transition-all duration-300 ${
                    shouldHighlightTech(tech)
                      ? "bg-gold-light text-black font-bold scale-110 shadow-glow"
                      : "bg-indigo-800/50"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {idea.frameworks.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-cinzel mb-2">Frameworks:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {idea.frameworks.map((framework, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-xs font-fondamento transition-all duration-300 ${
                      shouldHighlightFramework(framework)
                        ? "bg-gold-light text-black font-bold scale-110 shadow-glow"
                        : "bg-blue-800/50"
                    }`}
                  >
                    {framework}
                  </span>
                ))}
              </div>
            </div>
          )}

          {idea.basesdedatos.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-cinzel mb-2">Bases de Datos:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {idea.basesdedatos.map((database, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-xs font-fondamento transition-all duration-300 ${
                      shouldHighlightDatabase(database)
                        ? "bg-gold-light text-black font-bold scale-110 shadow-glow"
                        : "bg-green-800/50"
                    }`}
                  >
                    {database}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={handleReset}
              variant="outline"
              className="fantasy-button border-gold-light/30 text-white hover:bg-white/20"
            >
              <span className="font-fondamento">Lanzar de nuevo</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
