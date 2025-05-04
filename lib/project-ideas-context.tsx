"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useProjectIdeasStore } from "@/lib/store"
import { projectIdeas as allProjectIdeas, type ProjectIdea } from "@/lib/project-ideas"

// Crear el contexto
const ProjectIdeasContext = createContext<ProjectIdea[]>([])

// Hook para usar el contexto
export const useProjectIdeas = () => useContext(ProjectIdeasContext)

// Proveedor del contexto
export function ProjectIdeasProvider({ children }: { children: ReactNode }) {
  const { easterEggActivated } = useProjectIdeasStore()
  const [filteredIdeas, setFilteredIdeas] = useState<ProjectIdea[]>(allProjectIdeas)

  useEffect(() => {
    // Filtrar las ideas de Brainfuck si el easter egg no está activado
    const ideas = easterEggActivated
      ? allProjectIdeas
      : allProjectIdeas.filter(
          (idea) => !idea.tecnologias.includes("Brainfuck") && idea.tipo !== "Programación Esotérica",
        )

    setFilteredIdeas(ideas)
  }, [easterEggActivated])

  return <ProjectIdeasContext.Provider value={filteredIdeas}>{children}</ProjectIdeasContext.Provider>
}
