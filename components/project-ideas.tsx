"use client"

import { useState, useEffect } from "react"
import { useProjectIdeasStore } from "@/lib/store"
import { useFilteredProjectIdeas } from "@/components/filtered-project-ideas"
import { NoResultsMessage } from "@/components/no-results-message"
import { StaggeredList } from "@/components/staggered-list"

export function ProjectIdeas() {
  const {
    categoryFilter,
    languageFilter,
    frameworkFilter,
    databaseFilter,
    nivelFilter,
    appTypeFilter,
    sortOption,
    searchTerm,
  } = useProjectIdeasStore()

  // Usar las ideas filtradas por easter egg
  const allProjectIdeas = useFilteredProjectIdeas()
  const [filteredIdeas, setFilteredIdeas] = useState(allProjectIdeas)

  // Filtrar ideas basadas en los filtros seleccionados
  useEffect(() => {
    let filtered = [...allProjectIdeas]

    // Filtrar por categoría
    if (categoryFilter) {
      filtered = filtered.filter((idea) => idea.categoria === categoryFilter)
    }

    // Filtrar por lenguaje
    if (languageFilter) {
      filtered = filtered.filter((idea) => idea.tecnologias.includes(languageFilter))
    }

    // Filtrar por framework
    if (frameworkFilter) {
      filtered = filtered.filter((idea) => idea.frameworks.includes(frameworkFilter))
    }

    // Filtrar por base de datos
    if (databaseFilter) {
      filtered = filtered.filter(
        (idea) =>
          (idea.basesdedatos && idea.basesdedatos.includes(databaseFilter)) ||
          (idea.baseDatos && idea.baseDatos.includes(databaseFilter)),
      )
    }

    // Filtrar por nivel
    if (nivelFilter) {
      filtered = filtered.filter((idea) => idea.nivel === nivelFilter)
    }

    // Filtrar por tipo de aplicación
    if (appTypeFilter) {
      filtered = filtered.filter((idea) => idea.tipo === appTypeFilter)
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (idea) =>
          idea.titulo.toLowerCase().includes(term) ||
          idea.descripcion.toLowerCase().includes(term) ||
          idea.tecnologias.some((tech) => tech.toLowerCase().includes(term)) ||
          idea.frameworks.some((framework) => framework.toLowerCase().includes(term)) ||
          (idea.basesdedatos && idea.basesdedatos.some((db) => db.toLowerCase().includes(term))) ||
          (idea.baseDatos && idea.baseDatos.some((db) => db.toLowerCase().includes(term))),
      )
    }

    // Ordenar ideas
    if (sortOption === "alfabetico") {
      filtered.sort((a, b) => a.titulo.localeCompare(b.titulo))
    } else if (sortOption === "complejidad") {
      filtered.sort((a, b) => {
        const complejidadA = a.complejidad || getNivelComplejidad(a.nivel)
        const complejidadB = b.complejidad || getNivelComplejidad(b.nivel)
        return complejidadA - complejidadB
      })
    } else if (sortOption === "complejidad-desc") {
      filtered.sort((a, b) => {
        const complejidadA = a.complejidad || getNivelComplejidad(a.nivel)
        const complejidadB = b.complejidad || getNivelComplejidad(b.nivel)
        return complejidadB - complejidadA
      })
    }

    setFilteredIdeas(filtered)
  }, [
    allProjectIdeas,
    categoryFilter,
    languageFilter,
    frameworkFilter,
    databaseFilter,
    nivelFilter,
    appTypeFilter,
    sortOption,
    searchTerm,
  ])

  // Función para obtener la complejidad basada en el nivel
  const getNivelComplejidad = (nivel: string): number => {
    switch (nivel) {
      case "Student":
        return 1
      case "Trainee":
        return 2
      case "Junior":
        return 3
      case "Senior":
        return 4
      case "Master":
        return 5
      default:
        return 3
    }
  }

  // Renderizar mensaje de no resultados si no hay ideas filtradas
  if (filteredIdeas.length === 0) {
    return <NoResultsMessage />
  }

  return (
    <div className="mt-8">
      <StaggeredList>
        {filteredIdeas.map((idea, index) => (
          <div
            key={idea.id || index}
            className="p-6 mb-6 rounded-lg fantasy-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold mb-2 font-fondamento">{idea.titulo}</h3>
            <p className="mb-4 text-gray-300">{idea.descripcion}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {idea.tecnologias.map((tech) => (
                <span key={tech} className="px-2 py-1 text-xs rounded-full bg-purple-900 text-purple-100 font-semibold">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {idea.frameworks.map(
                (framework) =>
                  framework && (
                    <span
                      key={framework}
                      className="px-2 py-1 text-xs rounded-full bg-blue-900 text-blue-100 font-semibold"
                    >
                      {framework}
                    </span>
                  ),
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {(idea.basesdedatos || idea.baseDatos || []).map(
                (db) =>
                  db && (
                    <span key={db} className="px-2 py-1 text-xs rounded-full bg-green-900 text-green-100 font-semibold">
                      {db}
                    </span>
                  ),
              )}
            </div>
            <div className="flex justify-between items-center mt-4">
              <span
                className={`px-3 py-1 text-sm rounded-full font-semibold ${
                  idea.nivel === "Student"
                    ? "bg-green-900 text-green-100"
                    : idea.nivel === "Trainee"
                      ? "bg-blue-900 text-blue-100"
                      : idea.nivel === "Junior"
                        ? "bg-yellow-900 text-yellow-100"
                        : "bg-red-900 text-red-100"
                }`}
              >
                {idea.nivel}
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-200 font-semibold">
                {idea.tipo}
              </span>
            </div>
          </div>
        ))}
      </StaggeredList>
    </div>
  )
}
